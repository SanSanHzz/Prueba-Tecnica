/*Archio realizado basandose en repositorio ESTUDIANDO-NODEJS*/ 
const mongoose = require('mongoose'); // <- Importo mongoose
const toolSchema = new mongoose.Schema({
  referencia: { type: String, required: true },
  estado: { type: String, required: true }, // Por ejemplo: 'nuevo', 'usado', 'averiado'
  fechaCompra: { type: Date, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });  // <- hago el eschema 

module.exports = mongoose.model('Tool', toolSchema); // <- Exporto el eschema
