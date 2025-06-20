// Aquí irían los métodos básicos de register, login, getProfile
// src/controllers/auth.controller.js

const User = require('../models/user.model'); // <- modelo de Mongoose para interactuar con usuarios.
const jwt = require('jsonwebtoken'); // <-  se usa para generar y verificar tokens JWT. 

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: savedUser
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { identificacion, contrasena } = req.body;
    const user = await User.findOne({ identificacion }); // <- Busca el usuario por identificacion.

    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    } // <- Si no lo encuentra, responde con error.

    const isMatch = await user.compareContrasena(contrasena);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    } // <- Compara la contraseña que ingresó el usuario (compareContrasena ya lo encripta y compara).

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d' //<- El token dura 1 día (1d).
    }); // <- Genera un token JWT, firmando el id del usuario.

    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        identificacion: user.identificacion
      } // <- Devuelve, el token, Un resumen del usuario, Un mensaje
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

// Ruta protegida para obtener información del usuario autenticado
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-contrasena'); // <- Usa el ID que se extrae del token en el middleware auth.js, ademas que  excluye el campo password
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user); // <- Devuelve el perfil del usuario autenticado.
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener perfil', error });
  }
};
