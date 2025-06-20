const Siembra = require('../models/siembra.model');

exports.createSiembra = async (req, res) => {
  try {
    const { fecha, insumos,cantidades, ubicacion } = req.body;
    console.log(req.body)
    // Si haces carga de fotos, procesa `req.files`
    const fotos = req.files ? req.files.map(file => file.filename) : [];

    const nuevaSiembra = new Siembra({
      fecha,
      insumos,
      cantidades,
      ubicacion,
      fotos,
      owner: req.user.identificacion,
    });

    const savedSiembra = await nuevaSiembra.save();
    res.status(201).json({ message: 'Siembra registrada exitosamente', siembra: savedSiembra });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la siembra', error });
  }
};

exports.getMySiembras = async (req, res) => {
  try {
    const siembras = await Siembra.find({ owner: req.user.identificacion });
    res.json(siembras);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener siembras', error });
  }
};


// Actualizar siembra
exports.updateSiembra = async (req, res) => {
  const { id } = req.params;
  const { fecha, ubicacion, insumos } = req.body;

  try {
    const updated = await Siembra.findByIdAndUpdate(
      id,
      { fecha, ubicacion, insumos },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Siembra no encontrada" });
    }
    res.json({ message: "Siembra actualizada correctamente", updated });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar siembra", error });
  }
};

// Eliminar siembra
exports.deleteSiembra = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Siembra.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Siembra no encontrada" });
    }
    res.json({ message: "Siembra eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar siembra", error });
  }
};
