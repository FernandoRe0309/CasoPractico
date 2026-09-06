import { comunicados } from "./data.js";
import { renderizarLista } from "./render.js";

const inputBuscar = document.getElementById("input-buscar");
const selectOrden = document.getElementById("select-orden");

export function aplicarFiltros() {
  const textoBusqueda = inputBuscar.value.trim().toLowerCase();
  const orden = selectOrden.value; //ascendente (asc) o descendente (desc)

  //Filtrar por titulo
  let resultado = comunicados.filter((c) =>
    c.titulo.toLowerCase().includes(textoBusqueda)
  );

  //Filtrar por fecha
  resultado.sort((a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    return orden === "asc" ? fechaA - fechaB : fechaB - fechaA;
  });

  //Mostrar en pantalla
  renderizarLista(resultado);
}

// Cada vez que el usuario escribe o cambia el orden, recalculamos
inputBuscar.addEventListener("input", aplicarFiltros);
selectOrden.addEventListener("change", aplicarFiltros);