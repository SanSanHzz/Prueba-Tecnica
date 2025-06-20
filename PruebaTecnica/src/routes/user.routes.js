/*Archio realizado basandose en repositorio ESTUDIANDO-NODEJS*/ 

const express = require('express'); // <- Para crear mi servidor web y definir rutas
const router = express.Router(); // <- para  modular rutas y mostralas en index.js

const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth'); // <- Importamos el archivo del controlador, donde están las funciones que responden a cada ruta (lógica de negocio).

const { createUserValidator,updateUserValidator  } = require('../validators/user.validator'); // <-  comprueba que los datos del usuario sean correctos (nombre, email, etc.)

const validateRequest = require('../middlewares/validateRequest'); // <-  ejecuta los errores si alguna validación falla
// Ruta protegida
router.get('/private', auth, (req, res) => {
  res.json({
    message: 'Ruta protegida 🔐',
    userData: req.user // contiene el userId desde el token
  });
});

router.get('/', userController.getUsers); // <- Lista todos los usuarios.
router.post('/', createUserValidator, validateRequest, userController.createUser); // <- Crea un nuevo usuario, pasando primero por validaciones
router.put('/:id', updateUserValidator, validateRequest, userController.updateUser); // <-  Actualiza un usuario con base en su ID
router.delete('/:id', userController.deleteUser); // <-  Elimina un usuario por su ID.


module.exports = router;