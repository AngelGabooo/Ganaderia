// controllers/webhookController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody || req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Error de verificación de webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`Evento de webhook recibido: ${event.type}`);

  // Manejar diferentes tipos de eventos
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentIntentSucceeded(event.data.object);
      break;
      
    case 'payment_intent.payment_failed':
      await handlePaymentIntentFailed(event.data.object);
      break;
      
    case 'invoice.payment_succeeded':
      await handleInvoicePaymentSucceeded(event.data.object);
      break;
      
    case 'customer.subscription.created':
      await handleSubscriptionCreated(event.data.object);
      break;
      
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object);
      break;
      
    default:
      console.log(`Evento no manejado: ${event.type}`);
  }

  res.json({ received: true });
}

// Funciones manejadoras de eventos
async function handlePaymentIntentSucceeded(paymentIntent) {
  console.log(`Pago exitoso para el intento: ${paymentIntent.id}`);
  // Aquí puedes actualizar tu base de datos con el pago exitoso
  // Ejemplo: marcar la suscripción como activa en tu DB
}

async function handlePaymentIntentFailed(paymentIntent) {
  console.log(`Pago fallido para el intento: ${paymentIntent.id}`);
  // Aquí puedes notificar al usuario o registrar el fallo
}

async function handleInvoicePaymentSucceeded(invoice) {
  console.log(`Pago de factura exitoso: ${invoice.id}`);
  // Manejar renovaciones de suscripción exitosas
}

async function handleSubscriptionCreated(subscription) {
  console.log(`Nueva suscripción creada: ${subscription.id}`);
  // Registrar la nueva suscripción en tu base de datos
}

async function handleSubscriptionDeleted(subscription) {
  console.log(`Suscripción cancelada: ${subscription.id}`);
  // Actualizar el estado en tu base de datos
}