require('dotenv').config(); // Asegúrate de que esté al inicio
const emailjs = require('@emailjs/nodejs');

const testEmail = async () => {
  try {
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID_RESET,
      process.env.EMAILJS_TEMPLATE_ID_RESET,
      {
        email: 'a20624646@gmail.com',
        link: 'http://localhost:3000/reset-password/test',
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );
    console.log('Correo enviado:', response);
  } catch (error) {
    console.error('Error al enviar correo:', error.message, error.stack);
  }
};

testEmail();