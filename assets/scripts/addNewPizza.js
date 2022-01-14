//// CUADRO DONDE AGREGO UN NUEVA PIZZA
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
/// Variables CUADRO ARMA TU PROPIA PIZZA ///////
const addEventModal = document.getElementById('add-modal');
const startAddEventButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddEventButton = addEventModal.querySelector('.btn--passive');
const confirmAddEventButton = cancelAddEventButton.nextElementSibling;
const userInputs = addEventModal.querySelectorAll('input, textarea, select');
const entryTextSection = document.getElementById('entry-text')
const deleteEventModal = document.getElementById('delete-modal');

const updateListEvent = () => {
  if (Evento.titulo = '') {
    entryTextSection.style.display = 'block';
  }else 
    entryTextSection.style.display = 'none';
};
  
const toggleBackdrop = () =>{
  backdrop.classList.toggle('visible');
  addCarritoStore.classList.toggle('visible'); /// LO TENGO QUE REEMPLAZAR

};

closeEventModal = () =>{
  addEventModal.classList.remove('visible');
};
  
const showEventModal = () => { // function() {}
  addEventModal.classList.add('visible');
  toggleBackdrop();// llamo para que ademas de hacer visible haga el efecto sombra.
  // addCarritoModal.classList.remove('visible') // Para que no aparezca el boton de "mostrar carrito"
  // backdrop.classList.toggle('visible');
  // addCarritoStore.classList.toggle('visible');
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
  // addCarritoStore.classList.toggle('visible');// para que no aparezca el carrito de fondo. 
//  deleteEvent (eventId);
};

/////////ACA ES DONDE INGRESO EN EL DOM///////////////////////////
const renderNewEventElem = () =>{
  for (let event of eventos) {
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
  const listEvents =document.getElementById('event-list');
  listEvents.append(newEventElement);
  newEventElement.addEventListener('click', deleteEventHandler.bind(null,event.id)) //Agrego Bind Porque es un elemento que AUN NO EXISTE. 
}
};
  
startAddEventButton.addEventListener('click', showEventModal);
backdrop.addEventListener('click',backdropClickHandler); // Este listener sirve para que cuando haga click en el fondo gris s cierre el form
cancelAddEventButton.addEventListener('click',cancelAddEventHandler);
confirmAddEventButton.addEventListener('click',addEventHandler);
