const mongoose = require('mongoose');

const collaboratorSchema = new mongoose.Schema({
  identificacion: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  cargo: { type: String, required: true },
  contacto: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Collaborator', collaboratorSchema);
