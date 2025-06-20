const express = require('express');
const router = express.Router();
const collaboratorController = require('../controllers/collaborator.controller');
const auth = require('../middlewares/auth');

router.post('/', auth, collaboratorController.createCollaborator);
router.get('/my', auth, collaboratorController.getMyCollaborators);
router.put('/:id', auth, updateCollaborator);
router.delete('/:id', auth, deleteCollaborator);
module.exports = router;
