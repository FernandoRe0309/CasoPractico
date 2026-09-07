const listaResultados = document.getElementById("lista-resultados");
const mensajeVacio = document.getElementById("mensaje-vacio");
const contadorResultados = document.getElementById("contador-resultados"); 

//Genera el ícono según el tipo de comunicado
function iconoSegunTipo(tipo) {
  const colores = {
    PDF: "#dc2626",
    Excel: "#16a34a",
    Word: "#2563eb"
  };
  const color = colores[tipo] || "#6b7280";

  return `
    <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2h14l6 6v24a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
            fill="${color}" opacity="0.15"/>
      <path d="M8 2h14l6 6v24a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
            fill="none" stroke="${color}" stroke-width="2"/>
      <path d="M22 2v6h6" fill="none" stroke="${color}" stroke-width="2"/>
      <text x="18" y="24" font-size="8" font-weight="700" text-anchor="middle" fill="${color}">
        ${tipo === "Excel" ? "XLS" : tipo === "Word" ? "DOC" : "PDF"}
      </text>
    </svg>
  `;
}

export function renderizarLista(lista) {
  // Limpiamos el contenedor antes de volver a pintar
  listaResultados.innerHTML = "";

  // Si no hay resultados, mostramos el mensaje y salimos
  if (lista.length === 0) {
    mensajeVacio.hidden = false;
    return;
  }
  mensajeVacio.hidden = true;

  // Texto en singular o plural según la cantidad encontrada
    contadorResultados.textContent = lista.length === 1
    ? "1 comunicado encontrado"
    : `${lista.length} comunicados encontrados`;
    if (lista.length === 0) {
        mensajeVacio.hidden = false;
        contadorResultados.textContent = "";
        return; 
    }   

  lista.forEach((comunicado) => {
    const fechaLegible = new Date(comunicado.fecha + "T00:00:00") //forzamos a nuestra fecha y hora local
      .toLocaleDateString("es-MX");

    const card = document.createElement("div");
    card.className = "comunicado-card";
    card.innerHTML = `
    <div class="comunicado-icono">
        ${iconoSegunTipo(comunicado.tipo)}
    </div>
    <div class="comunicado-info">
        <h3>${comunicado.titulo}</h3>
        <div class="comunicado-meta">${fechaLegible} · ${comunicado.archivo}</div>
    </div>
    <span class="badge-tipo badge-${comunicado.tipo.toLowerCase()}">${comunicado.tipo}</span>
    `;

    listaResultados.appendChild(card);
  });
}