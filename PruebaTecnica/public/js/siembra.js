
  const addInsumoButton = document.getElementById("addInsumo");
  const insumosContainer = document.getElementById("insumosContainer");

  let insumoIndex = 1;

  addInsumoButton.addEventListener("click", () => {
    const div = document.createElement("div");
    div.classList.add("insumo");
    div.innerHTML = `
      <input type="text" name="insumos[${insumoIndex}][nombre]" placeholder="Nombre del insumo" required />
      <input type="number" name="insumos[${insumoIndex}][cantidad]" placeholder="Cantidad" required />
    `;
    insumosContainer.appendChild(div);
    insumoIndex++;
  });