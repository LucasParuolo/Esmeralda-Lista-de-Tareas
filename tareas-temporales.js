const tareas = {
  "2025-01-10": ["Juntar informes", "Reunión con equipo"],
  "2025-01-25": ["Presentación parcial"],
  "2025-02-14": ["Entrega de reporte final"]
};

function marcarFechasConTareas() {
  document.querySelectorAll("[data-fecha]").forEach(dia => {
    const fecha = dia.getAttribute("data-fecha");

    if (tareas[fecha]) {
      dia.classList.add("fecha-con-tarea");
      dia.addEventListener("click", () => abrirModal(fecha));
    }
  });
}

const modal = document.getElementById("modalTareas");
const cerrar = document.getElementById("cerrarModal");

function abrirModal(fecha) {
  const lista = document.getElementById("modalListaTareas");
  const titulo = document.getElementById("modalFecha");

  titulo.textContent = "Tareas del " + fecha;

  lista.innerHTML = "";  

  if (tareas[fecha]) {
    tareas[fecha].forEach(t => {
      const li = document.createElement("li");
      li.textContent = t;
      lista.appendChild(li);
    });
  }

  modal.style.display = "block";
}

cerrar.onclick = () => modal.style.display = "none";

// cerrar al click fuera
window.onclick = event => {
  if (event.target === modal) modal.style.display = "none";
}

marcarFechasConTareas();