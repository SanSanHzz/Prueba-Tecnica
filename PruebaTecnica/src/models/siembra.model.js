// Archivo hecho con ayuda de ChatGPT
const mongoose = require('mongoose');// <- Importo mongoose
const siembraSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  insumos: [{ nombre: String, cantidad: Number }], 
  ubicacion: { type: String, required: true },
  fotos: [{ type: String }], 
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  },
}, { timestamps: true }); // <- hago el eschema 

module.exports = mongoose.model('Siembra', siembraSchema); // <- Exporto el eschema
