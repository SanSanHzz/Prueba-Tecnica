const API = 'http://localhost:3000/api';
const userInfo = document.getElementById('userInfo');
const collaboratorForm = document.getElementById('collaboratorForm');
const collaboratorsList = document.getElementById('collaboratorsList');
const siembraForm = document.getElementById('siembraForm');
async function loadUser() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('No autorizado');
    window.location.href = 'index.html';
    return;
  }

  try {
    const res = await fetch(`${API}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await res.json();
    userInfo.textContent = `ID: ${user.identificacion}, Nombre: ${user.nombre}, Cargo: ${user.cargo}`;
    loadCollaborators();
  } catch (err) {
    console.error(err);
    alert('Error al cargar usuario');
  }
}

async function loadCollaborators() {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API}/collaborators/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const error = await res.json();
      alert(error.message || 'Error al obtener colaboradores');
      return;
    }
    const collaborators = await res.json();
    collaboratorsList.innerHTML = '';
    collaborators.forEach(col => {
      const div = document.createElement('div');
      div.textContent = `${col.nombre} (${col.identificacion}) - ${col.cargo} | Contacto: ${col.contacto}`;
      collaboratorsList.appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
}

// Crear colaborador
collaboratorForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  const data = {
    identificacion: document.getElementById('identificacion').value.trim(),
    nombre: document.getElementById('nombre').value.trim(),
    cargo: document.getElementById('cargo').value.trim(),
    contacto: document.getElementById('contacto').value.trim(),
  };
  
  try {
    const res = await fetch(`${API}/collaborators`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      alert(json.message || 'Colaborador registrado exitosamente');
      collaboratorForm.reset();
      loadCollaborators();
    } else {
      alert(json.message || 'Error al crear colaborador');
    }
  } catch (error) {
    console.error(error);
    alert('Error al crear colaborador');
  }
});


// Cerrar sesión
document.getElementById('logout')?.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
});
// Bloque de siembra hecho con ayuda de chatGPTconst siembraForm = document.getElementById("siembraForm");
const siembrasList = document.getElementById("siembrasList"); // Asegúrate de que existe en tu HTML



// Ahora adaptamos el envío
siembraForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (!token) {
    alert("No autorizado");
    return;
  }

  const formData = new FormData(siembraForm);

  try {
    const res = await fetch(`${API}/siembras`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    const json = await res.json();
    if (res.ok) {
      alert(json.message || "Siembra registrada exitosamente");
      siembraForm.reset();
      loadSiembras();
    } else {
      alert(json.message || "Error al crear siembra");
    }
  } catch (error) {
    console.error(error);
    alert("Error al crear siembra");
  }
});

// Ahora carga todas las siembras

async function loadSiembras() {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API}/siembras/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const error = await res.json();
      alert(error.message || "Error al obtener siembras");
      return;
    }

    const siembras = await res.json();
    siembrasList.innerHTML = ""; 

    siembras.forEach(s => {
      const div = document.createElement("div");
      const fecha = new Date(s.fecha).toLocaleDateString();
      const insumos = s.insumos.map(i => `${i.nombre} (${i.cantidad})`).join(", ");
      const fotosHTML = s.fotos && s.fotos.length
        ? s.fotos.map(f => `<img src="${API}/updloads/${s.fotos}" alt="foto de siembra" style="max-width:100px;" />`).join("")
        : ""; 

      div.innerHTML = `
        <strong>Fecha:</strong> ${fecha}<br/>
        <strong>Ubicación:</strong> ${s.ubicacion}<br/>
        <strong>Insumos:</strong> ${insumos}<br/>
        ${fotosHTML}
      `;
      siembrasList.appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
}

loadSiembras()
// Carga inicial
loadUser();
