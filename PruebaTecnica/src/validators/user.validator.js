const { body } = require('express-validator'); // <- Extraemos el método body de express-validator,Este método se usa para validar campos del req.body

exports.createUserValidator = [
  body('identificacion')
    .notEmpty().withMessage('LA identificación es requerido')
    .isInt({ min: 0 }).withMessage('El id debe ser positivo '),

  body('nombre')
    .notEmpty().withMessage('Email is required')
    .isLength({ min: 3 }).withMessage('El nombre debe tener almenos tres caracteres'),

  body('cargo')
    .notEmpty().withMessage('El cargo es requerido')
    .custom(value => {
      if (value !== 'Agricultor') { // <- Fragmento realizado con ayuda de ChatGPT
        throw new Error('El cargo solo puede ser "Agricultor"');
      }
      return true;
    }),
  body('contacto')
    .notEmpty().withMessage('El contacto es requerido')
    .isLength({ min: 9 }).withMessage('El contacto debe tener almenos 9 caracteres'),
]; // <- Estoy exportando un arreglo de validaciones que luego será usado como middleware en rutas.


exports.updateUserValidator = [
  body('identificacion')
    .notEmpty().withMessage('El nombre es requerido')
    .isInt({ min: 0 }).withMessage('El id debe ser positivo '),

  body('nombre')
    .notEmpty().withMessage('Email is required')
    .isLength({ min: 3 }).withMessage('El nombre debe tener almenos tres caracteres'),

  body('cargo')
    .notEmpty().withMessage('El cargo es requerido')
    .custom(value => {
      if (value !== 'Agricultor') { // <- Fragmento realizado con ayuda de ChatGPT
        throw new Error('El cargo solo puede ser "Agricultor"');
      }
      return true;
    }),
  body('contacto')
    .notEmpty().withMessage('El contacto es requerido')
    .isLength({ min: 9 }).withMessage('El contacto debe tener almenos 9 caracteres'),
];// <- <- Estoy exportando un arreglo de validaciones que luego será usado como middleware en rutas.