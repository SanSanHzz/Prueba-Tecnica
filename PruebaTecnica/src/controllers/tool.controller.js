const Tool = require('../models/tool.model');

exports.createTool = async (req, res) => {
  try {
    const { referencia, estado, fechaCompra } = req.body;

    const newTool = new Tool({
      referencia,
      estado,
      fechaCompra,
      owner: req.user.identificacion,
    });
    await newTool.save();

    res.json({ message: 'Herramienta registrada exitosamente', tool: newTool });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la herramienta', error: error.message });
  }
};

exports.getToolsByOwner = async (req, res) => {
  try {
    const tools = await Tool.find({ owner: req.user.identificacion });
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener herramientas', error: error.message });
  }
};

exports.updateTool = async (req, res) => {
  try {
    const { id } = req.params;
    const tool = await Tool.findOneAndUpdate(
      { _id: id, owner: req.user.identificacion },
      req.body,
      { new: true }
    );
    if (!tool) {
      return res.status(404).json({ message: 'Herramienta no encontrada' });
    }
    res.json({ message: 'Herramienta actualizada exitosamente', tool });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar herramienta', error: error.message });
  }
};

exports.deleteTool = async (req, res) => {
  try {
    const { id } = req.params;
    const tool = await Tool.findOneAndDelete({ _id: id, owner: req.user.identificacion });
    if (!tool) {
      return res.status(404).json({ message: 'Herramienta no encontrada' });
    }
    res.json({ message: 'Herramienta eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar herramienta', error: error.message });
  }
};
