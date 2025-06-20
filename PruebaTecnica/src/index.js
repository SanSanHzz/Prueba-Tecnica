const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());

connectDB();

// Importa y usa rutas
app.use('/', require('./'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
