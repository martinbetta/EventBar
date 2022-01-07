//CARRITO/////

/// INICIO QUE PRENDA Y APAGUE EL BOTON DEL MOSTRAR CARRITO ESTANDO FULL O VACIO
const addCarritoModal = document.getElementById('add-carrito');
function agregarCarro(id) {
  const pizza = pizzas.find( prod => prod.id == id); // Busco el producto por su id
  const arrayDelStorage = JSON.parse(localStorage.getItem('carrito')) || [];// Traigo del Storage, si no encuentra devuelve []
  arrayDelStorage.push(pizza);
  console.log(arrayDelStorage)
  localStorage.setItem('carrito', JSON.stringify(arrayDelStorage));// Luego de agregar, actualizo Storage

  // esto es para el carro aparezca y se borre.
  if (carrito.length >= 0)
    {addCarritoModal.classList.add('visible')}
    else addCarritoModal.classList.remove('visible');

}


const carritoShow = document.getElementById ('mostrar-carrito')
const addCarritoStore = document.getElementById('backdrop-carrito')
const  carritoShowHandler = () => {
  backdrop.classList.add('visible');
  addCarritoStore.classList.add('visible');
}

const  carritoShowHandlerDelete = () => {
  backdrop.classList.remove('visible');
  addCarritoStore.classList.remove('visible');
}



carritoShow.addEventListener('click',carritoShowHandler);



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

const divCarrito = document.getElementById('carrito-DOM'); /// ACA ARRANCAN LOS CAMBIOS 

function renderizarCarrito(){
const carritoDelStorage = JSON.parse(localStorage.getItem('carrito'));
divCarrito.innerHTML = '';
for (let pizza of carritoDelStorage) {
  let itemProducto = document.createElement('div') // Creo el elemento para mostrar
  //Acá en vez de mostrar solo el nombre, podemos montar la card completa usando plantillas literales
  itemProducto.innerHTML = `
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
    divCarrito.appendChild(itemProducto);
  }
  const arrayBotonesBorrar = document.getElementsByClassName("btnBorrar");
  //boton comprar, itero el array de botones y le pongo el evento al botón
  for (const boton of arrayBotonesBorrar) {
    boton.addEventListener('click', (event) => {// aca no usamos submit, usamos click, submit es para los form
      const idProd = event.target.id; //usamos el event.target.id para acceder al id del elemento
      // aca ejecutamos una función para agregar al carrito
      console.log("borraste producto con id", idProd);
      borrarDelCarrito(idProd);
      renderizarCarrito();
      console.log(arrayBotonesBorrar);
      console.log(arrayBotonesBorrar.length);
      if (arrayBotonesBorrar.length == 0)
      {deleteHandlerPizza()}

    })
  }  
}

function deleteHandlerPizza () {
  addCarritoModal.classList.remove('visible')
  backdrop.classList.remove('visible');
  addCarritoStore.classList.remove('visible');
}

const hayCarritoEnStorage = JSON.parse(localStorage.getItem('carrito'));

if (hayCarritoEnStorage) { //Si hay carrito guardado, que lo muestre por primera vez
  renderizarCarrito()
}
//----------------------------------------------------------------------------Eventos del DOM

const arrayBotonesComprar = document.getElementsByClassName("agregar-carrito");
for (const boton of arrayBotonesComprar) {
  boton.addEventListener('click', (event) => {// aca no usamos submit, usamos click, submit es para los form
    console.log(boton)

    const idProd = event.target.id; //usamos el event.target.id para acceder al id del elemento
    console.log(idProd)
    // aca ejecutamos una función para agregar al carrito
    console.log("agregaste producto con id", idProd);
    agregarCarro(idProd);
    renderizarCarrito()
  })
}




//   // Contenedor Carrito


// /// FIN QUE PRENDA Y APAGUE EL BOTON DEL MOSTRAR CARRITO ESTANDO FULL O VACIO 



// // carro de compras 
// const contenedorCarrito = document.querySelector("carrito");
// const mostrarCarrito = document.querySelector("mostrar-carrito");

// if (mostrarCarrito){
//     mostrarCarrito.addEventListener('click', mostrarElCarrito)
// }
// function mostrarElCarrito(){
//   if (localStorage.length === 0){
//     const msgInicial= document.createElement("h2")
//     msgInicial.innerHTML= "EL CARRITO ESTA VACIO"
//     contenedorCarrito.appendChild(msgInicial);
//   } else {
//     renderizarCarrito()
//   }
// }