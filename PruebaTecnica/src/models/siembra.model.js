// Archivo hecho con ayuda de ChatGPT
const mongoose = require('mongoose');

const siembraSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  insumos: [{ nombre: String, cantidad: Number }], // array de objetos
  ubicacion: { type: String, required: true },
  fotos: [{ type: String }], // array de URLs o nombres de archivos
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  },
}, { timestamps: true }); // para guardar fecha de creación y actualización

module.exports = mongoose.model('Siembra', siembraSchema);
