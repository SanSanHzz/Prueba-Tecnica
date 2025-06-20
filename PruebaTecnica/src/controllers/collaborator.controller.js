const Collaborator = require('../models/collaborator.model');

exports.createCollaborator = async (req, res) => {
  try {
    const { identificacion, nombre, cargo, contacto } = req.body;
    const newCollab = new Collaborator({
      identificacion,
      nombre,
      cargo,
      contacto,
      owner: req.user.identificacion 
    });

    const savedCollab = await newCollab.save();
    res.status(201).json({ message: 'Colaborador registrado exitosamente', collaborator: savedCollab });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el colaborador', error: error.message });
  }
};

exports.getMyCollaborators = async (req, res) => {
  try {
    const collaborators = await Collaborator.find({ owner: req.user.identificacion });
    res.json(collaborators);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Actualizar colaborador
exports.updateCollaborator = async (req, res) => {
  const { id } = req.params;
  const { identificacion, nombre, cargo, contacto } = req.body;

  try {
    const updated = await Collaborator.findByIdAndUpdate(
      id,
      { identificacion, nombre, cargo, contacto },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Colaborador no encontrado" });
    }
    res.json({ message: "Colaborador actualizado correctamente", updated });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar colaborador", error });
  }
};

// Eliminar colaborador
exports.deleteCollaborator = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Collaborator.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Colaborador no encontrado" });
    }
    res.json({ message: "Colaborador eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar colaborador", error });
  }
};
