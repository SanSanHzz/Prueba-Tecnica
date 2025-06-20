const mongoose = require('mongoose'); // <- Importa mongoose, una librería ODM (Object Data Modeling) para trabajar con MongoDB de forma orientada a objetos.

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/farm');
    console.log('🟢 MongoDB connected');
  } catch (err) {
    console.error('🔴 MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
