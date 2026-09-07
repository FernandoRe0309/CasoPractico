import { comunicados } from "./data.js";
import { renderizarLista } from "./render.js";

const selectArea = document.getElementById("select-area"); 
const inputBuscar = document.getElementById("input-buscar");
const selectOrden = document.getElementById("select-orden");

export function aplicarFiltros() {
    const textoBusqueda = inputBuscar.value.trim().toLowerCase();
    const orden = selectOrden.value; //ascendente (asc) o descendente (desc)
    const areaSeleccionada = selectArea.value; 

  //Filtrar por titulo
  let resultado = comunicados.filter((c) =>
    c.titulo.toLowerCase().includes(textoBusqueda)
  );

  //Filtrar por area solo si el usuario eligio un area en especifico
    if (areaSeleccionada !== "") {
        resultado = resultado.filter((c) => c.area === areaSeleccionada);
    }

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
selectArea.addEventListener("change", aplicarFiltros);