//CARRITO/////

/////CARRITO CON JQUERY/////////
// const addCarritoStore = document.getElementById('backdrop-carrito')
// const addCarritoModal = $('add-carrito');

// if (carrito.length > 0)
// {$('addCarritoModal').addClass('visible');

// }else $('addCarritoModal').removeClass('visible');

/////CARRITO CON JS/////////

/// INICIO QUE PRENDA Y APAGUE EL BOTON DEL MOSTRAR CARRITO ESTANDO FULL O VACIO
const addCarritoModal = document.getElementById('add-carrito');
if (carrito.length > 0)
  {addCarritoModal.classList.add('visible')};


const carritoShow = document.getElementById ('mostrar-carrito')
const addCarritoStore = document.getElementById('backdrop-carrito')
const  carritoShowHandler = () => {
  backdrop.classList.toggle('visible');
  addCarritoStore.classList.toggle('visible');
} 
carritoShow.addEventListener('click',carritoShowHandler);
/// FIN QUE PRENDA Y APAGUE EL BOTON DEL MOSTRAR CARRITO ESTANDO FULL O VACIO 


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
  renderizarCarrito()
  
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


const divCarrito = document.getElementById('carrito-DOM'); /// ACA ARRANCAN LOS CAMBIOS 

function renderizarCarrito(){
  limpiarCarrito()
  carrito.forEach(pizza => {
    const row = document.createElement('div');
    // row.classList.add('row')
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
        renderizarCarrito();
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
  renderizarCarrito()
  limpiarCarrito()
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

// console.log(carrito.length);