/*Archio realizado basandose en repositorio ESTUDIANDO-NODEJS*/ 
const mongoose = require('mongoose'); // <- Importo mongoose
const collaboratorSchema = new mongoose.Schema({
  identificacion: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  cargo: { type: String, required: true },
  contacto: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}); // <- hago el eschema 

module.exports = mongoose.model('Collaborator', collaboratorSchema); // <- Exporto el eschema
