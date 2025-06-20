const API = 'http://localhost:3000/api';

document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    identificacion: document.getElementById('regIdentificacion').value,
    nombre: document.getElementById('regNombre').value,
    cargo: document.getElementById('regCargo').value,
    contacto: document.getElementById('regContacto').value,
    contrasena: document.getElementById('regContrasena').value,
  };
  try {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    alert(json.message || 'Usuario registrado');
  } catch (err) {
    console.error(err);
    alert('Error en registro');
  }
});

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    identificacion: document.getElementById('loginIdentificacion').value,
    contrasena: document.getElementById('loginContrasena').value,
  };
  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      localStorage.setItem('token', json.token);
      alert('Login correcto');
      window.location.href = 'dashboard.html';
    } else {
      alert(json.message || 'Error en login');
    }
  } catch (err) {
    console.error(err);
    alert('Error en login');
  }
});
