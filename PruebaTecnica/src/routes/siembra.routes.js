const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const siembraController = require('../controllers/siembra.controller');
// Si quieres subir fotos:
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

// Crear siembra
router.post('/', auth, upload.array('fotos'), siembraController.createSiembra);

// Listar todas las siembras del usuario
router.get('/my', auth, siembraController.getMySiembras);

module.exports = router;
