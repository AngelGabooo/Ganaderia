// controllers/paymentController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createPaymentIntent(req, res) {
  try {
    const { amount, currency, planId, customerEmail } = req.body;

    // Validar los datos de entrada
    if (!amount || !currency || !planId) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Crear el Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convertir a centavos
      currency: currency.toLowerCase(),
      metadata: { 
        planId,
        customerEmail: customerEmail || 'no-email-provided'
      },
      // Habilitar el guardado del método de pago para pagos recurrentes
      setup_future_usage: 'off_session',
    });

    res.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (err) {
    console.error('Error al crear Payment Intent:', err);
    res.status(500).json({ error: err.message });
  }
}