const User = require('../models/user.model'); // <- Necesito el modelo de usuario

// GET all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find(); // <- Busca todos los documentos de la colección users
    res.json(users); 
  } catch (err) {
    next(err);
  }
};

// POST new user
exports.createUser = async (req, res, next) => {
 try {
    const newUser = new User(req.body); // <- Crea una instancia con los datos recibidos.
    await newUser.save(); // <- Guarda el usuario en la base de datos.

    res.status(201).json(newUser);
  } catch (error) {
    // Si es un error de validación de Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    // Si no, pasa el error al middleware general
    next(error);
  }
};

// PUT update user
exports.updateUser = async (req, res, next) => {
   try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { // <-  Actualiza el documento con los datos nuevos
      new: true // <- Hace que devuelva el usuario actualizado, no el viejo
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

// DELETE user
exports.deleteUser = async (req, res, next) => {
 try {
    const deletedUser = await User.findByIdAndDelete(req.params.id); // <- Busca el usuario y lo elimina
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};
