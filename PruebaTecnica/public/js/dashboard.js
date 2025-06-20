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

function loadCollaborators() {
  const token = localStorage.getItem('token');
  fetch(`${API}/collaborators/my`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al obtener colaboradores");
      return res.json();
    })
    .then(collaborators => {
      collaboratorsList.innerHTML = '';
      collaborators.forEach(col => {
        const div = document.createElement('div');
        div.innerHTML = `
          ${col.nombre} (${col.identificacion}) - ${col.cargo} | Contacto: ${col.contacto}
          <button data-id="${col._id}" class="edit-collab">Editar</button>
          <button data-id="${col._id}" class="delete-collab">Eliminar</button>
        `;
        collaboratorsList.appendChild(div);
      });
    });
}

// DELEGACIÓN DE EVENTOS
collaboratorsList?.addEventListener('click', async (e) => {
  const id = e.target.getAttribute('data-id');
  if (!id) return;

  if (e.target.classList.contains('edit-collab')) {
    const nombre = prompt('Nuevo nombre:');
    const cargo = prompt('Nuevo cargo:');
    const contacto = prompt('Nuevo contacto:');
    const identificacion = prompt('Nueva identificación:');

    const res = await fetch(`${API}/collaborators/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ nombre, cargo, contacto, identificacion })
    });
    const json = await res.json();
    alert(json.message || 'Colaborador actualizado');
    loadCollaborators();
  }

  if (e.target.classList.contains('delete-collab')) {
    if (!confirm('¿Eliminar este colaborador?')) return;

    const res = await fetch(`${API}/collaborators/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
    const json = await res.json();
    alert(json.message || 'Colaborador eliminado');
    loadCollaborators();
  }
});


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

function loadSiembras() {
  const token = localStorage.getItem("token");
  fetch(`${API}/siembras/my`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al obtener siembras");
      return res.json();
    })
    .then(siembras => {
      siembrasList.innerHTML = ""; 
      siembras.forEach((s) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <strong>Fecha:</strong> ${new Date(s.fecha).toLocaleDateString()}<br/>
          <strong>Ubicación:</strong> ${s.ubicacion}<br/>
          <strong>Insumos:</strong> ${s.insumos.map(i => `${i.nombre} (${i.cantidad})`).join(", ")}<br/>
          ${s.fotos.length ? s.fotos.map(f => `<img src="${API}/${f}" alt="foto de siembra" style="max-width:100px;" />`).join('') : ''}
          <br/>
          <button data-id="${s._id}" class="edit-siembra">Editar</button>
          <button data-id="${s._id}" class="delete-siembra">Eliminar</button>
        `;
        siembrasList.appendChild(div);
      });
    });
}

// DELEGACIÓN DE EVENTOS
siembrasList?.addEventListener('click', async (e) => {
  const id = e.target.getAttribute('data-id');
  if (!id) return;

  if (e.target.classList.contains('edit-siembra')) {
    const fecha = prompt('Nueva fecha (YYYY-MM-DD):');
    const ubicacion = prompt('Nueva ubicación:');
    const nombreInsumo = prompt('Nombre del insumo:');
    const cantidadInsumo = prompt('Cantidad:');

    const res = await fetch(`${API}/siembras/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        fecha,
        ubicacion,
        insumos: [{ nombre: nombreInsumo, cantidad: Number(cantidadInsumo) }]
      })
    });
    const json = await res.json();
    alert(json.message || 'Siembra actualizada');
    loadSiembras();
  }

  if (e.target.classList.contains('delete-siembra')) {
    if (!confirm('¿Eliminar esta siembra?')) return;

    const res = await fetch(`${API}/siembras/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
    const json = await res.json();
    alert(json.message || 'Siembra eliminada');
    loadSiembras();
  }
});

// CREAR HERRAMIENTA
const toolForm = document.getElementById('toolForm');
const toolsList = document.getElementById('toolsList');

toolForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  if (!token) {
    alert('No autorizado');
    return;
  }
  const data = {
    referencia: document.getElementById('toolReferencia').value.trim(),
    estado: document.getElementById('toolEstado').value.trim(),
    fechaCompra: document.getElementById('toolFechaCompra').value,
  };
  try {
    const res = await fetch(`${API}/tools`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    alert(json.message || 'Herramienta registrada');
    loadTools();
    toolForm.reset();
  } catch (error) {
    console.error(error);
    alert('Error al crear herramienta');
  }
});

// LISTAR HERRAMIENTAS
async function loadTools() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('No autorizado');
    return;
  }
  try {
    const res = await fetch(`${API}/tools/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const error = await res.json();
      alert(error.message || 'Error al obtener herramientas');
      return;
    }
    const tools = await res.json();
    toolsList.innerHTML = '';
    tools.forEach(tool => {
      const div = document.createElement('div');
      div.innerHTML = `
        <strong>Referencia:</strong> ${tool.referencia}<br/>
        <strong>Estado:</strong> ${tool.estado}<br/>
        <strong>Fecha de compra:</strong> ${new Date(tool.fechaCompra).toLocaleDateString()}<br/>
        <button data-id="${tool._id}" class="edit-tool">Editar</button>
        <button data-id="${tool._id}" class="delete-tool">Eliminar</button>
      `;
      toolsList.appendChild(div);
    });
  } catch (error) {
    console.error(error);
    alert('Error al obtener herramientas');
  }
}

// DELEGACIÓN DE EVENTOS PARA EDITAR Y ELIMINAR
toolsList?.addEventListener('click', async (e) => {
  const id = e.target.getAttribute('data-id');
  if (!id) return;

  const token = localStorage.getItem('token');
  if (e.target.classList.contains('edit-tool')) {
    const referencia = prompt('Nueva referencia:');
    const estado = prompt('Nuevo estado:');
    const fechaCompra = prompt('Nueva fecha de compra (YYYY-MM-DD):');

    const res = await fetch(`${API}/tools/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ referencia, estado, fechaCompra })
    });
    const json = await res.json();
    alert(json.message || 'Herramienta actualizada');
    loadTools();
  }

  if (e.target.classList.contains('delete-tool')) {
    if (!confirm('¿Eliminar esta herramienta?')) return;

    const res = await fetch(`${API}/tools/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const json = await res.json();
    alert(json.message || 'Herramienta eliminada');
    loadTools();
  }
});

// NO OLVIDES LLAMAR loadTools() EN loadUser()
loadUser();

loadSiembras()
// Carga inicial
loadUser();
