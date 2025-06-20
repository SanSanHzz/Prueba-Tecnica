const express = require('express');
const {
  createTool,
  getToolsByOwner,
  updateTool,
  deleteTool,
} = require('../controllers/tool.controller');
const auth = require('../middlewares/auth');

const router = express.Router();


router.post('/', auth, createTool);


router.get('/my', auth, getToolsByOwner);


router.put('/:id', auth, updateTool);


router.delete('/:id', auth, deleteTool);

module.exports = router;
