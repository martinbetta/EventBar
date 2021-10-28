// import {  } from './productos';

class Evento {
  constructor(nombre, pizza, cantidadPizza, bebida, cantidadBebida, precioTotal, detallePedido) {
    this.nombre = nombre;
    this.pizza = pizza;
    this.cantidadPizza = cantidadPizza
    this.bebida = bebida;
    this.cantidadBebida = cantidadBebida;
    this.precioTotal = precioTotal;
    this.detallePedido = detallePedido;
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
}

/// Creacion de Pizzas

  const pizzaMuzzarella = new Pizza(1, 'Muzzarella', 'Queso, oregano y aceituna', 'img/pizza1.jpg', 20);
  const pizzaCalabreza = new Pizza(2, 'Calabreza', 'Calabreza, Muzzarella y aceituna', 'img/pizza2.jpg', 25);
  const pizzaVegetal = new Pizza(3, 'Vegetal', 'Queso, champignones, Morron Verde, aceituna', 'img/pizza3.jpg', 28);
  const pizzaCebolla = new Pizza(4, 'cebolla', 'Mucha Cebolla, Queso, aceituna', 'img/pizza4.jpg', 28);
  const pizzaAnchoas = new Pizza(5, 'Anchoas', 'Queso, Anchoas y aceituna negra', 'img/pizza5.jpg', 23);
  const pizzaNapolitana = new Pizza(6, 'Napolitana', 'Queso, Tomate, Cebolla y aceituna', 'img/pizza6.jpg', 20);

  console.log(pizzaMuzzarella.image);


  const gallery =document.getElementById('gallery');
  const gridContainer = document.getElementById('grid-container');
  // const selectedImages = document.getElementById('selectedImage');
  const imageIndexes = [1,2,3,4,5,6];
  const selectedIndex = null;

  // imageIndexes.forEach((i) =>{
  //   const image = document.createElement('img');
  //   image.classList.add('grid-item');
  //   // image.src = `img/pizza${i}.jpg`
  //   image.src = `img/pizza${i}.jpg`
  //   gridContainer.appendChild(image);
  // });
/// 

  const imageMussa = document.createElement('img');
  imageMussa.classList.add('grid-item');
  imageMussa.src = `${pizzaMuzzarella.image}`
  imageMussa.alt = `${pizzaMuzzarella.nombre}`
  gridContainer.appendChild(imageMussa);


  const imageCalabreza = document.createElement('img');
  imageCalabreza.classList.add('grid-item');
  imageCalabreza.src = `${pizzaCalabreza.image}`
  imageCalabreza.alt = `${pizzaCalabreza.nombre}`
  gridContainer.appendChild(imageCalabreza);

  const imageVegetal = document.createElement('img');
  imageVegetal.classList.add('grid-item');
  imageVegetal.src = `${pizzaVegetal.image}`
  imageVegetal.alt = `${pizzaVegetal.nombre}`
  gridContainer.appendChild(imageVegetal);

  const imageCebolla = document.createElement('img');
  imageCebolla.classList.add('grid-item');
  imageCebolla.src = `${pizzaCebolla.image}`
  imageCebolla.alt = `${pizzaCebolla.nombre}`
  gridContainer.appendChild(imageCebolla);

  const imageAnchoas = document.createElement('img');
  imageAnchoas.classList.add('grid-item');
  imageAnchoas.src = `${pizzaAnchoas.image}`
  imageAnchoas.alt = `${pizzaAnchoas.nombre}`
  gridContainer.appendChild(imageAnchoas);

  const imageNapo = document.createElement('img');
  imageNapo.classList.add('grid-item');
  imageNapo.src = `${pizzaNapolitana.image}`
  imageNapo.alt = `${pizzaNapolitana.nombre}`
  gridContainer.appendChild(imageNapo);


/// Variables///////
const addEventModal = document.getElementById('add-modal');

const startAddEventButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddEventButton = addEventModal.querySelector('.btn--passive');
const confirmAddEventButton = cancelAddEventButton.nextElementSibling;
const userInputs = addEventModal.querySelectorAll('input, select');
// console.log(userInputs);

const entryTextSection = document.getElementById('entry-text')
const deleteEventModal = document.getElementById('delete-modal');


/// Funciones ///////
const updateListEvent = () => {
  if (Evento.titulo = '') {
    entryTextSection.style.display = 'block';
  }else 
    entryTextSection.style.display = 'none';
};

const toggleBackdrop = () =>{
  backdrop.classList.toggle('visible');
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
  let pizzaValue = userInputs[1].value;
  const cantidadPizzaValue = userInputs[2].value;
  const bebidaValue = userInputs[3].value;
  const cantidadBebValue = userInputs[4].value;
  const precioTotalValue = 0
  const detalleValue = userInputs[5].value;
  const id = this.id;
  
  if (nombreValue.trim() === '' ||
    pizzaValue.trim() === '' ||
    +cantidadPizzaValue.trim() < 0 ||
    bebidaValue.trim() === '' ||
    +cantidadBebValue.trim() < 0 ||
    // +precioTotalValue.trim() < 0 ||
    detalleValue.trim() === ''
    ) {
    alert('Por favor ingresa valores validos');
  return;
  }
  


  const cargEvent = new Evento(nombreValue, pizzaValue, cantidadPizzaValue, bebidaValue, cantidadBebValue, precioTotalValue ,detalleValue, id);
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

// const printId = (id) =>{
//   console.log( id)
// }

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
  console.log(event)
  const newEventElement = document.createElement('li');
  newEventElement.className = 'event-element';
  newEventElement.innerHTML = `
  <div class="event-element__info">
   
    <h2>El pedido a Nombre de: ${event.nombre}  <button id='delete-Button'> Eliminar </button> </h2> 
    <p>Pidio ${event.cantidadPizza} de ${event.pizza}</p> <br>
    <p> Para tomar ${event.cantidadBebida} ${event.bebida}</p> <br>
    <p>El precio total es de ${event.precioTotal}</p> <br>
    <p>El detalle del pedido es:  ${event.detallePedido}
    </div>`;
    console.log(newEventElement)
  
    // newEventElement.addEventListener('click', printId.bind(null,eventos)) // PRUEBA PARA VER SI ME TRAE ID..
    
    
    const listEvents =document.getElementById('event-list');
    listEvents.append(newEventElement);
    newEventElement.addEventListener('click', deleteEventHandler.bind(null,event.id)) //Agrego Bind Porque es un elemento que AUN NO EXISTE. 
    // const elementInfo= document.getElementsByClassName('event-element__info')
    // const deleteEvent = document.elementInfo.children
    // deleteEvent.addEventListener('click', deleteEventHandler.bind(null,event.id)) //Agrego Bind Porque es un elemento que AUN NO EXISTE. 
 }
};
//<p>Costo Evento ${evento.costoInv(evento.calidad,evento.consumiciones,evento.invitados)}; No se como meter dentro del la Funcion es
//metodo de la Class Evento...


/// Eventos ///////
startAddEventButton.addEventListener('click', showEventModal);
backdrop.addEventListener('click',backdropClickHandler); // Este listener sirve para que cuando haga click en el fondo gris s cierre el form
cancelAddEventButton.addEventListener('click',cancelAddEventHandler);
confirmAddEventButton.addEventListener('click',addEventHandler);

 