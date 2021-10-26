// import {  } from './productos';

class Evento {
  constructor(titulo,calidad,consumiciones,invitados) {
    this.titulo = titulo;
    this.invitados = invitados;
    this.consumiciones = consumiciones;
    this.calidad = calidad;
    this.id = Math.random().toString();
    // this.opciones = opciones; 
  }

}

class Pedido {
  constructor(bebida,  cantidad,  precio, total){
    this.id =id 
    this.bebida =bebida;
    this.calidad = cantidad;
    this.precio = precio;
    this.total = total;
  }
}

/// Variables///////
const addEventModal = document.getElementById('add-modal');

const startAddEventButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddEventButton = addEventModal.querySelector('.btn--passive');
const confirmAddEventButton = cancelAddEventButton.nextElementSibling;
const userInputs = addEventModal.querySelectorAll('input');
const userSelector = addEventModal.querySelectorAll('selector');

const entryTextSection = document.getElementById('entry-text')





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

const toggleEventModal = () => { // function() {}
  addEventModal.classList.toggle('visible');
  toggleBackdrop();// llamo para que ademas de hacer visible haga el efecto sombra.
};

const cancelAddEventHandler = () =>{
   toggleEventModal();
   clearEventInputs();
};

// Vaciar el Form luego de Usar para que no quede la ultima carga
const clearEventInputs = () =>{
  for (const usrInput of userInputs){ 
    usrInput.value = '';
  }
}
/// VALIDADOR DE LOS INPUT y Creacion del Objeto/////////////
const addEventHandler = () =>{
  const titleValue = userInputs[0].value;
  const calidadValue = userInputs[1].value;
  const cantBebValue = userInputs[2].value;
  const cantInvValue = userInputs[3].value;
  const id = this.id;

  if (titleValue.trim() ==='' || 
    +calidadValue.trim() ==='' || 
    +calidadValue.trim() <1  || 
    +calidadValue.trim() >11  || 
    +cantBebValue.trim() ==='' ||
    +cantBebValue.trim() <1 ||
    +cantInvValue.trim() ===''||
    +cantInvValue.trim() <1
    ){
    alert('Por favor ingresa valores validos')
  return;
  }
  const cargEvent = new Evento(titleValue, calidadValue, cantBebValue, cantInvValue, id);
  console.log(cargEvent);
  create(cargEvent)
  toggleEventModal();
  clearEventInputs();
  renderNewEventElem();
  updateListEvent();
};

const backdropClickHandler =() => {
  toggleEventModal();
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

const deleteEventHandler = (eventId) =>{
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
  console.log(identifyId);
  listEvents.children[identifyId].remove();

};
const renderNewEventElem = () =>{
  for (let event of eventos) {
  console.log(event)
  const newEventElement = document.createElement('li');
  newEventElement.className = 'event-element';
  newEventElement.innerHTML = `
  <div class="event-element__info">
   
    <h2>El titulo del evento es: ${event.titulo}  <button id='delete-Button'> Eliminar </button> </h2> 
    <p>La calidad seleccionada es ${event.calidad}</p> <br>
    <p> Cantidad de consumiciones ${event.consumiciones}</p> <br>
    <p>Total invitados ${event.invitados}</p> <br>
    <p>Total consumiciones ${event.consumiciones*event.invitados}
    </div>`;
  
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
startAddEventButton.addEventListener('click', toggleEventModal);
backdrop.addEventListener('click',backdropClickHandler); // Este listener sirve para que cuando haga click en el fondo gris s cierre el form
cancelAddEventButton.addEventListener('click',cancelAddEventHandler);
confirmAddEventButton.addEventListener('click',addEventHandler);
