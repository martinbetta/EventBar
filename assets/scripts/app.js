// import {  } from './productos';
$( document ).ready(function()
{
console.log( "El DOM esta listo Muñeco!!" );
});


const pizzas= []; 
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
class Evento {
  constructor(nombre, pizza, maza, cantidadPizza, detalle, envio) {
    this.nombre = nombre;
    this.pizza = pizza;
    this.maza = maza;
    this.cantidadPizza = cantidadPizza
    this.detalle = detalle;
    this.envio = envio;
    this.id = Math.random().toString();
  }

}
class Pizza {
  constructor(id, nombre, ingredientes, image, precio){

		this.id = id;
		this.nombre = nombre;
		this.ingredientes= ingredientes;
		this.image = image;
		this.precio = Number(precio);
}
agregarProducto() {
  pizzas.push(this);
}
borrarProducto() {
  const indiceProducto = pizzas.findIndex(e => e.id == this.id);// Busco el indice
  if (indiceProducto >= 0) { // como findIndex devuelve -1 cuando no encuentra, verifico
    pizzas.splice(indiceProducto, 1);// uso el indice para borrar un lugar
    return `producto ${this.nombre} borrado de la lista`
  } else {
    return "Error al borrar producto"
  }
}

}


/// Variables CUADRO ARMA TU PROPIA PIZZA ///////
const addEventModal = document.getElementById('add-modal');

const startAddEventButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddEventButton = addEventModal.querySelector('.btn--passive');
const confirmAddEventButton = cancelAddEventButton.nextElementSibling;
const userInputs = addEventModal.querySelectorAll('input, textarea, select');

const entryTextSection = document.getElementById('entry-text')
const deleteEventModal = document.getElementById('delete-modal');





/////CARRITO CON JQUERY/////////
// const addCarritoStore = document.getElementById('backdrop-carrito')
// const addCarritoModal = $('add-carrito');

// if (carrito.length > 0)
// {$('addCarritoModal').addClass('visible');

// }else $('addCarritoModal').removeClass('visible');

/////CARRITO CON JS/////////

const addCarritoModal = document.getElementById('add-carrito');

if (carrito.length > 0)
{ addCarritoModal.classList.add('visible');

}else addCarritoModal.classList.remove('visible');


const carritoShow = document.getElementById ('mostrar-carrito')
const addCarritoStore = document.getElementById('backdrop-carrito')
const  carritoShowHandler = () => {
  backdrop.classList.toggle('visible');
  addCarritoStore.classList.toggle('visible');
} 
carritoShow.addEventListener('click',carritoShowHandler);





/// Creacion de Pizzas

  const pizzaMuzzarella = new Pizza(1, 'Muzzarella', 'Queso, oregano y aceituna', 'img/pizza1.jpg', 20);
  const pizzaCalabreza = new Pizza(2, 'Calabreza', 'Calabreza, Muzzarella y aceituna', 'img/pizza2.jpg', 25);
  const pizzaVegetal = new Pizza(3, 'Vegetal', 'Queso, champignones, Morron Verde, aceituna', 'img/pizza3.jpg', 28);
  const pizzaCebolla = new Pizza(4, 'cebolla', 'Mucha Cebolla, Queso, aceituna', 'img/pizza4.jpg', 28);
  const pizzaAnchoas = new Pizza(5, 'Anchoas', 'Queso, Anchoas y aceituna negra', 'img/pizza5.jpg', 23);
  const pizzaNapolitana = new Pizza(6, 'Napolitana', 'Queso, Tomate, Cebolla y aceituna', 'img/pizza6.jpg', 20);

  pizzaMuzzarella.agregarProducto();
  pizzaCalabreza.agregarProducto();
  pizzaVegetal.agregarProducto();
  pizzaCebolla.agregarProducto();
  pizzaAnchoas.agregarProducto();
  pizzaNapolitana.agregarProducto();



  // const pizzas= [pizzaMuzzarella, pizzaCalabreza, pizzaVegetal, pizzaCebolla, pizzaAnchoas, pizzaNapolitana];
  //Creo Carrito



/// QUE PRENDA Y APAGUE EL BOTON DEL MOSTRAR CARRITO ESTANDO FULL O VACIO



/////////////////////////////////////////////////////////////////////////////   

  const gallery =document.getElementById('gallery');
  const gridContainer = document.getElementById('grid-container');
  // const selectedImages = document.getElementById('selectedImage');
  const imageIndexes = [1,2,3,4,5,6];
  const selectedIndex = null;

let acumulador = '';
// Pizzas en el HTML
for (let i = 0; i <pizzas.length;i++){
  const pizza=pizzas[i]
  acumulador += `
  <div class = 'products-items'>
  <div>
  <img class = "grid-item imgProd" src="${pizza.image}" alt="${pizza.nombre}">
  <div class = 'body-images' >
  <p class = 'pizzaNom' id="">${pizza.nombre}</p>
  <p class = 'pizzaIng' id="">${pizza.ingredientes}</p>
  <p class = 'pizzaPrec' id="">ARS ${pizza.precio}</p>
  <button data-id="${pizza.id}" class = "boton-carrito agregar-carrito">Agregar </button>
  </div>
  </div>
  </div>
  `
}
gridContainer.innerHTML = acumulador;

if (gridContainer) {gridContainer.addEventListener('click', agregarCarro);}

// function agregarCarro(e) {
//   e.preventDefault();
//   if (e.target.classList.contains('agregar-carrito')){
//     const pizzaSeleccionada = e.target.parentNode; //  para que seleccione el Boton y agarre el nodo completo
//     console.log(pizzaSeleccionada)
//     seleccion(pizzaSeleccionada)
//   }
// }

function agregarCarro(e) {
  e.preventDefault();
  let id = e.target.getAttribute("data-id");
  let pizzaSeleccionada = pizzas.find((pizza) => {return pizza.id == id})
  console.log(pizzaSeleccionada)
  carrito.push(pizzaSeleccionada);
  localStorage.setItem('carrito' , JSON.stringify(carrito));
}

// ACA ES DONDE INTENTO ENCAPSULAR LOS DATOS DEL ARTICULO EN EL BOTON. 
function seleccion (pizzaSelect) {
    const datosPizza = {
    nombre: pizzaSelect.querySelector(".pizzaNom").textContent,
    precio: pizzaSelect.querySelector(".pizzaPrec").textContent,
    ingredientes: pizzaSelect.querySelector(".pizzaIng").textContent,
    img: pizzaSelect.parentNode.querySelector('.imgProd').src
  };
  console.log(datosPizza);
  carrito.push(datosPizza);
  saveStorage();
  console.log(carrito) // TODO OK HASTA ACA.. 
}

function saveStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito));
}


// carro de compras 
const contenedorCarrito = document.querySelector("#carrito");
const mostrarCarrito = document.querySelector("#mostrar-carrito");

if (mostrarCarrito){
    mostrarCarrito.addEventListener('click', mostrarElCarrito)
}
function mostrarElCarrito(){
  if (localStorage.length === 0){
    const msgInicial= document.createElement("h2")
    msgInicial.innerHTML= "EL CARRITO ESTA VACIO"
    contenedorCarrito.appendChild(msgInicial);
  } else {
    renderizarCarrito()
  }

}
function renderizarCarrito(){
  limpiarCarrito()
  carrito.forEach(pizza => {
    const row = document.createElement('div');
    row.classList.add('row')
    row.innerHTML+= `
      <div class= 'col-sm'>
   
        </div>
        <div class = "col-sm">
          <h4 class ="">${pizza.nombre}</h4> 
          <img id="carrito-img" class =""src="${pizza.image}" alt="${pizza.nombre}"><br>
          <p>Precio: ARS${pizza.precio}</p>
          <button id="${pizza.id}" class="btn btn-warning btnBorrar">Quitar del Carrito</button>
          </div>
          <hr/>
        `
        contenedorCarrito.appendChild(row)
       console.log(carrito);
        // contenedorCarrito.addEventListener('click', deletePizzaCarrito.bind(null,pizza.id))
    
    // Creo o actualizo los eventos del carrito   
    const arrayBotonesBorrar = document.getElementsByClassName("btnBorrar");

    //boton comprar, itero el array de botones y le pongo el evento al botón
    for (const boton of arrayBotonesBorrar) {
      boton.addEventListener('click', (event) => {// aca no usamos submit, usamos click, submit es para los form
        const idProd = event.target.id; //usamos el event.target.id para acceder al id del elemento
        // aca ejecutamos una función para agregar al carrito
        console.log("borraste producto con id", idProd);
        borrarDelCarrito(idProd);
        renderizarCarrito()
      })
    }
  
  })
}

function limpiarCarrito(){
  while (contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}

function borrarDelCarrito(id) {
  const arrayDelStorage = JSON.parse(localStorage.getItem('carrito'));
  const indiceProducto = arrayDelStorage.findIndex(e => e.id == id);
  console.log(indiceProducto)
  if (indiceProducto >= 0) {
    arrayDelStorage.splice(indiceProducto, 1);
    localStorage.setItem('carrito', JSON.stringify(arrayDelStorage));
    return `producto con id ${id} borrado del carrito`
  } else {
    return "Error al borrar, no coincide el id"
  }
}

const hayCarritoEnStorage = JSON.parse(localStorage.getItem('carrito'));

if (hayCarritoEnStorage) { //Si hay carrito guardado, que lo muestre por primera vez
  renderizarCarrito()
}

console.log(carrito.length)





/// Funciones ///////
const updateListEvent = () => {
  if (Evento.titulo = '') {
    entryTextSection.style.display = 'block';
  }else 
    entryTextSection.style.display = 'none';
};

const toggleBackdrop = () =>{
  backdrop.classList.toggle('visible');
  addCarritoStore.classList.toggle('visible');

};


closeEventModal = () =>{
  addEventModal.classList.remove('visible');
};


const showEventModal = () => { // function() {}
  addEventModal.classList.add('visible');
  toggleBackdrop();// llamo para que ademas de hacer visible haga el efecto sombra.
};

const cancelAddEventHandler = () =>{
   closeEventModal();
   clearEventInputs();
   toggleBackdrop();

};

// Vaciar el Form luego de Usar para que no quede la ultima carga
const clearEventInputs = () =>{
  for (const usrInput of userInputs){ 
    usrInput.value = '';
  }
}
/// VALIDADOR DE LOS INPUT y Creacion del Objeto/////////////

const addEventHandler = () => {
  const nombreValue = userInputs[0].value;
  let pizzaValue = userInputs[1];  // Le saque el value para que nos traiga todo el array
  const mazaValue = userInputs[2].value;
  const cantidadPizzaValue = userInputs[3].value;
  const detalleValue = userInputs[4].value;
  const envio = userInputs[5].value;
  const id = this.id;
  let datosSelect = "" // Una variable de acumulacion de valores
  for (let i = 0; i < pizzaValue.options.length; i++) { // Iteramos las opciones del select para saber cuales son los que el usuario eligio
    const options = pizzaValue.options[i];
    if (options.selected == true) {
      datosSelect += `${options.value} `
    }
    console.log(datosSelect); 
  }
  
  if (nombreValue.trim() === '' ||
    datosSelect.trim() === '' ||
    +cantidadPizzaValue.trim() < 0 ||
    +envio.trim()  ==='' ||
    detalleValue.trim() === ''
    ) {
    alert('Por favor ingresa valores validos');
  return;
  }
  

  const cargEvent = new Evento(nombreValue, datosSelect, mazaValue, cantidadPizzaValue, detalleValue, envio, id);
  console.log(cargEvent);
  create(cargEvent)
  closeEventModal();
  clearEventInputs();
  renderNewEventElem();
  updateListEvent();
  toggleBackdrop();
};

const backdropClickHandler =() => {
  closeEventModal();
  cancelEventDelete();
};

//// TOMAR ELEMENTOS DEL localStorage Mediante JSON y pasarlo a String//// 

let eventos = JSON.parse(localStorage.getItem('eventos')) || []

const getAll = () => {
  return eventos;
}
const create = (evento) => {
  eventos.push(evento)
  localStorage.setItem('eventos', JSON.stringify(eventos))
}
//// CREO ELEMNTOS EN EL NAVEGADOR///////////

const cancelEventDelete =() =>{
  toggleBackdrop();
  deleteEventModal.classList.remove('visible');
};

const deleteEvent = (eventId) =>{

  let identifyId = 0;
  for (let event of eventos){
    if (event.id ===eventId){
      break;
  
    }
    identifyId++;
  }
  eventos.splice(identifyId, 1);
  localStorage.setItem('eventos', JSON.stringify(eventos));
  const listEvents = document.getElementById('event-list');
  // console.log(identifyId);
  listEvents.children[identifyId].remove();
  cancelEventDelete();

}

const deleteEventHandler = (eventId) =>{
  deleteEventModal.classList.add('visible');
  toggleBackdrop();
  const cancelDeleteButton = deleteEventModal.querySelector('.btn--passive');
  
  // pase de const a Let porque sino no cambiara el DOM con el cloneNode
  let confirmDeleteButton = deleteEventModal.querySelector('.btn--danger');
// crea un nuevo donde el listener es Eliminado, para que detenga el proceso, el nuevo elemeno es mediante cloneNode, sino el texto dentro del parentesis
//no se clona. 
  confirmDeleteButton.replaceWith(confirmDeleteButton.cloneNode(true)); 
  confirmDeleteButton = deleteEventModal.querySelector('.btn--danger');
  
  cancelDeleteButton.removeEventListener('click', cancelEventDelete);
  cancelDeleteButton.addEventListener('click', cancelEventDelete);
  confirmDeleteButton.addEventListener('click', deleteEvent.bind(null, eventId));
//  deleteEvent (eventId);
};

/////////ACA ES DONDE INGRESO EN EL DOM///////////////////////////
const renderNewEventElem = () =>{
  for (let event of eventos) {
  // console.log(event)

  
  const newEventElement = document.createElement('li');
  newEventElement.className = 'event-element';
  newEventElement.innerHTML = `
  <div class="event-element__info">
   
    <h2>Nombre de la Pizza: ${event.nombre} </h2> 
    <p>Pidio ${event.cantidadPizza} pizza/s de ${event.pizza}</p>
    <p>La maza elegida es: ${event.maza}</p><br>
    <p>Pedido extra :  ${event.detalle}</p>
    
    <p>El detalle del pedido es:  ${event.envio}</p>
    </div>`;
    // console.log(newEventElement)
  
    // newEventElement.addEventListener('click', printId.bind(null,eventos)) // PRUEBA PARA VER SI ME TRAE ID..
    
    
    const listEvents =document.getElementById('event-list');
    listEvents.append(newEventElement);
    newEventElement.addEventListener('click', deleteEventHandler.bind(null,event.id)) //Agrego Bind Porque es un elemento que AUN NO EXISTE. 
 }
};
//<p>Costo Evento ${evento.costoInv(evento.calidad,evento.consumiciones,evento.invitados)}; No se como meter dentro del la Funcion es
//metodo de la Class Evento...


/// Eventos ///////
startAddEventButton.addEventListener('click', showEventModal);
backdrop.addEventListener('click',backdropClickHandler); // Este listener sirve para que cuando haga click en el fondo gris s cierre el form
cancelAddEventButton.addEventListener('click',cancelAddEventHandler);
confirmAddEventButton.addEventListener('click',addEventHandler);



