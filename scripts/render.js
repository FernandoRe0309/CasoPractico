const listaResultados = document.getElementById("lista-resultados");
const mensajeVacio = document.getElementById("mensaje-vacio");

export function renderizarLista(lista) {
  // Limpiamos el contenedor antes de volver a pintar
  listaResultados.innerHTML = "";

  // Si no hay resultados, mostramos el mensaje y salimos
  if (lista.length === 0) {
    mensajeVacio.hidden = false;
    return;
  }
  mensajeVacio.hidden = true;

  lista.forEach((comunicado) => {
    const fechaLegible = new Date(comunicado.fecha + "T00:00:00") //forzamos a nuestra fecha y hora local
      .toLocaleDateString("es-MX");

    const card = document.createElement("div");
    card.className = "comunicado-card";
    card.innerHTML = `
      <div class="comunicado-info">
        <h3>${comunicado.titulo}</h3>
        <div class="comunicado-meta">
          ${fechaLegible} · ${comunicado.archivo}
        </div>
      </div>
      <span class="badge-tipo">${comunicado.tipo}</span>
    `;

    listaResultados.appendChild(card);
  });
}