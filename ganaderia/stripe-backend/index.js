const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_51RhjdkQONMOKCmbZUHVndanJ0P14pvBOb1Nnzy2qyZBScJfMpnx99oDW0cJP5FUF8vSaswE3kterhFTLkHKn5QiF00d3UdXxcK');

admin.initializeApp();

exports.createStripeCheckoutSession = functions.https.onCall(async (data, context) => {
  try {
    // Verifica que el usuario esté autenticado (opcional)
    // if (!context.auth) {
    //   throw new functions.https.HttpsError('unauthenticated', 'Usuario no autenticado');
    // }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: data.priceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${data.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${data.origin}/cancel`,
      customer_email: data.customerEmail,
      metadata: {
        empresaNombre: data.empresaData.nombre,
        empresaTelefono: data.empresaData.telefono,
        empresaDireccion: data.empresaData.direccion
      }
    });

    return { sessionId: session.id };
  } catch (error) {
    console.error('Error al crear sesión de Stripe:', error);
    throw new functions.https.HttpsError('internal', 'Error al procesar el pago');
  }
});

// Webhook para manejar eventos de Stripe
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      'whsec_...' // Tu webhook signing secret de Stripe
    );
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed.`, err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Manejar diferentes tipos de eventos
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await handleCheckoutSession(session);
      break;
    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      await handleInvoicePayment(invoice);
      break;
    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      await handleSubscriptionDeleted(subscription);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

async function handleCheckoutSession(session) {
  // Guardar información de la suscripción en Firestore
  const customer = await stripe.customers.retrieve(session.customer);
  const subscription = await stripe.subscriptions.retrieve(session.subscription);

  await admin.firestore().collection('empresas').doc(session.customer_email).set({
    stripeCustomerId: session.customer,
    stripeSubscriptionId: session.subscription,
    plan: subscription.plan.product,
    status: subscription.status,
    nombreEmpresa: session.metadata.empresaNombre,
    telefono: session.metadata.empresaTelefono,
    direccion: session.metadata.empresaDireccion,
    email: session.customer_email,
    fechaRegistro: admin.firestore.FieldValue.serverTimestamp(),
    paymentMethod: 'Tarjeta de crédito/débito (Stripe)'
  }, { merge: true });
}

async function handleInvoicePayment(invoice) {
  // Actualizar información cuando se realiza un pago recurrente
  await admin.firestore().collection('empresas').doc(invoice.customer_email).update({
    ultimoPago: admin.firestore.FieldValue.serverTimestamp(),
    proximoPago: new Date(invoice.next_payment_attempt * 1000)
  });
}

async function handleSubscriptionDeleted(subscription) {
  // Actualizar estado cuando se cancela una suscripción
  await admin.firestore().collection('empresas').doc(subscription.customer_email).update({
    status: 'cancelado'
  });
}