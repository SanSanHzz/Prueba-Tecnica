const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

// 🔐 Clave secreta (luego guárdala en .env)
const SECRET = process.env.JWT_SECRET || 'clavejwt';
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.identificacion).select('-contrasena'); // 👈 omitimos el contrasena

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: err.message });
  }
});

// Registro
router.post('/register', async (req, res) => {
  try {
    const { identificacion, nombre, cargo, contacto, contrasena } = req.body;

    // Validar si ya existe el usuario
    const exists = await User.findOne({ identificacion });
    if (exists) return res.status(400).json({ message: 'La identificación ya esta registrada y debe ser unica' });

    const user = new User({ identificacion, nombre, cargo, contacto, contrasena  });
    await user.save();

    res.status(201).json({ message: 'Agricultor registrado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { identificacion, contrasena } = req.body;

    const user = await User.findOne({ identificacion });
    if (!user) return res.status(400).json({ message: 'Credenciales incorrectas' });

    const isMatch = await user.compareContrasena( contrasena );
    if (!isMatch) return res.status(400).json({ message: 'Credenciales incorrectas' });

    // Generar token
    const token = jwt.sign({ identificacion: user._id }, SECRET, { expiresIn: '2h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
