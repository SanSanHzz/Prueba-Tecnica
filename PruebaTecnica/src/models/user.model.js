/*Archio realizado basandose en repositorio ESTUDIANDO-NODEJS*/ 

const mongoose = require('mongoose'); // Importo el modelo de moongose
const bcrypt = require('bcryptjs'); // <-  Se usa para encriptar y comparar contraseñas de forma segura.


const userSchema = new mongoose.Schema({
  identificacion: { type: Number, required: true, unique: true}, //identificacion: debe ser Number y obligatorio.
  nombre: { type: String, required: true }, // nombre: obligatorio y tipo String
  cargo: { type: String, required: true },  // cargo: obligatorio.
  contacto: { type: Number, required: true }, //age: debe ser número y obligatorio.
  contrasena: { type: String, required: true },  // contrasena: obligatorio.
}); //<- Cada propiedad define un campo en la colección users

userSchema.pre('save', async function (next) {
  if (!this.isModified('contrasena')) return next();

  const salt = await bcrypt.genSalt(10); // <- Se genera un salt (valor aleatorio) con 10 rondas, ademas que se encrypta
  this.contrasena = await bcrypt.hash(this.contrasena, salt); // <- Tomo la contraseña original y al mezclo con el sal generado, genero un hash unico y guardo ese nuevo hash en vez de la contraseña original
  next();
});

userSchema.methods.compareContrasena = function (password) {
  return bcrypt.compare(password, this.contrasena);// <- Compara la contraseña que ingresa con la que está en la base de datos (ya encriptada).
};
module.exports = mongoose.model('User', userSchema); // <- Creamos el modelo llamado User basado en userSchema
