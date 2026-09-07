// Este módulo escucha el envío del formulario, arma un nuevo
// comunicado (detectando el tipo por la extensión del archivo)
// y lo agrega a los datos

import { comunicados } from "./data.js";
import { aplicarFiltros } from "./filtros.js";

const formComunicado = document.getElementById("form-comunicado");
const inputTitulo = document.getElementById("input-titulo");
const inputFecha = document.getElementById("input-fecha");
const inputFormato = document.getElementById("input-formato");
const toast = document.getElementById("toast-confirmacion");
const inputArea = document.getElementById("input-area"); 
let toastTimeout;

//Detecta el tipo de comunicación según la extensión del archivo
function detectarTipoPorArchivo(nombreArchivo) {
  const extension = nombreArchivo.split(".").pop().toLowerCase();//convierte el nombre del archivo en un array por cada punto
    //.pop agarra el ultimop elemento de ese array osea la extension
  if (extension === "pdf") return "PDF";
  if (extension === "xls" || extension === "xlsx") return "Excel";
  if (extension === "doc" || extension === "docx") return "Word";

  return "Desconocido";
}
//guarda un nuevo comunicado
formComunicado.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const archivo = inputFormato.files[0];
  const nombreArchivo = archivo ? archivo.name : "sin_archivo";

  const nuevoComunicado = {
    titulo: inputTitulo.value.trim(),
    fecha: inputFecha.value,
    tipo: detectarTipoPorArchivo(nombreArchivo),
    archivo: nombreArchivo,
    area: inputArea.value 
  };

  comunicados.push(nuevoComunicado);

  formComunicado.reset();
  aplicarFiltros();
  mostrarConfirmacion(); 
});

function mostrarConfirmacion() {
  toast.hidden = false;
  // requestAnimationFrame asegura que el navegador "registre" el estado
  // inicial antes de animar, si no, la transición no se ve
  requestAnimationFrame(() => toast.classList.add("mostrar"));

  clearTimeout(toastTimeout); // por si se agrega otro comunicado antes de que termine
  toastTimeout = setTimeout(() => {
    toast.classList.remove("mostrar");
    setTimeout(() => { toast.hidden = true; }, 300);
  }, 2500);
}