const { validationResult } = require('express-validator'); // <- Importa la función validationResult, que recopila los errores lanzados por validadores anteriores (como body('email')...).

const validateRequest = (req, res, next) => { // Esta función se ejecuta después de las validaciones y antes del controlador principal.

  const errors = validationResult(req);
  console.log('Validation errors:', errors.array()); // Se recogen los errores de la petición
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }

  next(); // Se continúa al siguiente middleware o controlador (por ejemplo, authController.register
};

module.exports = validateRequest;
