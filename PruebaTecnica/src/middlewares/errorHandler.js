const jwt = require('jsonwebtoken'); // <- Importa el módulo JWT para verificar los tokens.
const SECRET = 'clavejwt';

const auth = (req, res, next) => { // <- Declaras tu función middleware que será usada para proteger rutas
  const token = req.header('Authorization')?.replace('Bearer ', ''); // <- busca el header con la clave Authorization,si existe, le remueve el texto "Bearer " para quedarse solo con el token JWT.
  if (!token) return res.status(401).json({ message: 'No token, access denied' }); // <- Si el token no está presente, se responde con error 401 Unauthorized

  try {
    const decoded = jwt.verify(token, SECRET); // <-  comprueba que el token fue generado con el mismo secreto.
    req.user = decoded; // <- Guarda este objeto en req.user para usarlo luego en la ruta protegida.
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' }); // <- Si el token fue modificado o expiró, jwt.verify lanza una excepción.
  }
};

module.exports = auth;
