const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const siembraController = require('../controllers/siembra.controller');
// Si quieres subir fotos:
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 


router.post('/', auth, upload.array('fotos'), siembraController.createSiembra);
router.get('/my', auth, siembraController.getMySiembras);
router.put('/:id', auth, siembraController.updateSiembra);
router.delete('/:id', auth, siembraController.deleteSiembra);
module.exports = router;
