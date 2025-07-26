const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const ResetToken = require('../models/ResetToken');
const emailjs = require('@emailjs/nodejs');

const router = express.Router();

// Configuración de EmailJS para restablecimiento de contraseña
const EMAILJS_SERVICE_ID_RESET = process.env.EMAILJS_SERVICE_ID_RESET || 'service_gy8bhls';
const EMAILJS_TEMPLATE_ID_RESET = process.env.EMAILJS_TEMPLATE_ID_RESET || 'template_grd6nuc';
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || 'laFJfaapD13hdIcTJ';
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY || 'CTYG9aZclfFVroUJc-IH_';

// Registro
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isSubscribed: false,
    });

    await user.save();

    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isSubscribed: user.isSubscribed,
      },
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isSubscribed: user.isSubscribed,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    console.log('Solicitando restablecimiento para:', email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Usuario no encontrado:', email);
      return res.status(404).json({ message: 'No se encontró un usuario con ese correo' });
    }

    console.log('Usuario encontrado:', user._id);
    // Generar token de restablecimiento
    const token = crypto.randomBytes(32).toString('hex');
    const resetToken = new ResetToken({
      userId: user._id,
      token,
    });

    await resetToken.save();
    console.log('Token de restablecimiento guardado:', token);

    // Enviar correo con EmailJS
    const resetUrl = `http://localhost:3000/reset-password/${token}`;
    const templateParams = {
      email: user.email,
      link: resetUrl,
    };

    console.log('Enviando correo con EmailJS:', templateParams);
    const emailResponse = await emailjs.send(EMAILJS_SERVICE_ID_RESET, EMAILJS_TEMPLATE_ID_RESET, templateParams, {
      publicKey: EMAILJS_PUBLIC_KEY,
      privateKey: EMAILJS_PRIVATE_KEY,
    });
    console.log('Correo enviado correctamente:', emailResponse);

    res.json({ message: 'Se ha enviado un enlace de restablecimiento a tu correo' });
  } catch (error) {
    console.error('Error detallado en /forgot-password:', error.message, error.stack);
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});

// Restablecer contraseña
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const resetToken = await ResetToken.findOne({ token });
    if (!resetToken) {
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    const user = await User.findById(resetToken.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Validar nueva contraseña
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    if (!hasMinLength || !hasNumber || !hasUpperCase || !hasLowerCase) {
      return res.status(400).json({ message: 'La contraseña no cumple con los requisitos de seguridad' });
    }

    // Actualizar contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Eliminar token usado
    await ResetToken.deleteOne({ token });

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
});

module.exports = router;