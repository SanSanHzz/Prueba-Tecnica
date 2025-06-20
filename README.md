# Prueba-Tecnica
Este repositorio fue preparado para estar listo con estructura MVC en el momento de presentar una prueba tecnica
1️⃣ Nombre del Proyecto
Comienza con el título claro del proyecto.

md
Copiar
Editar
# Proyecto de Gestión de Usuarios y Mascotas
2️⃣ Descripción Breve
Una o dos frases que expliquen para qué sirve la app.

Aplicación RESTful para la creación, edición y consulta de usuarios y mascotas, con autorización basada en JWT.

3️⃣ Tecnologías Utilizadas
Lista todas las herramientas y librerías principales:

Node.js

Express.js

MongoDB / Mongoose

JWT

Bcrypt

...

4️⃣ Requisitos Previos
Qué necesitas para correrla:

Node.js >= v18

MongoDB activo

Variables de entorno (.env)

5️⃣ Instalación
Cómo levantarla rápidamente:

bash
Copiar
Editar
git clone https://url-de-tu-repositorio.git
cd nombre-repo
npm install
6️⃣ Variables de Entorno
Ejemplo de .env requerido:

bash
Copiar
Editar
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/nombre_bd
JWT_SECRET=tu_clave_secreta
7️⃣ Cómo Ejecutarla
bash
Copiar
Editar
npm run dev
8️⃣ Rutas principales
Breve tabla de endpoints para que tu interviewer pueda guiarse rápidamente:

Método	Ruta	Descripción
POST	/api/auth/register	Registrar usuario
POST	/api/auth/login	Iniciar sesión
GET	/api/auth/me	Ver usuario logueado
POST	/api/pets	Crear mascota
GET	/api/pets/my	Listar mascotas del usuario
GET	/api/pets	Listar todas las mascotas
PUT	/api/pets/:id	Editar mascota
DELETE	/api/pets/:id	Eliminar mascota

9️⃣ Estructura de Archivos
Explícale al interviewer cómo organizaste tu app:

java
Copiar
Editar
├─ src/
│  ├─ models/
│  ├─ controllers/
│  └─ routes/
├─ public/
├─ services/
├─ middlewares/
├─ .env
├─ .gitignore
├─ package.json
├─ README.md
🔟 Autor / Contacto (opcional)
Si quieres darle un toque personal.