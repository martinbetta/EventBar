// import {  } from './productos';
$( document ).ready(function()
{
console.log( "El DOM esta listo Muñeco!!" );
});

class Pizza {
  constructor(id, nombre, ingredientes, image, precio, cantidad){
		this.id = id;
		this.nombre = nombre;
		this.ingredientes= ingredientes;
		this.image = image;
		this.precio = Number(precio);
    this.cantidad = Number(cantidad);

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

/// Creacion de Pizzas
const pizzas = []
const pizzaMuzzarella = new Pizza(1, 'Muzzarella', 'Queso, oregano y aceituna', 'img/pizza1.jpg', 20,1);
const pizzaCalabreza = new Pizza(2, 'Calabreza', 'Calabreza, Muzzarella y aceituna', 'img/pizza2.jpg', 25,1);
const pizzaVegetal = new Pizza(3, 'Vegetal', 'Queso, champignones, Morron Verde, aceituna', 'img/pizza3.jpg', 28,1);
const pizzaCebolla = new Pizza(4, 'cebolla', 'Mucha Cebolla, Queso, aceituna', 'img/pizza4.jpg', 28,1);
const pizzaAnchoas = new Pizza(5, 'Anchoas', 'Queso, Anchoas y aceituna negra', 'img/pizza5.jpg', 23,1);
const pizzaNapolitana = new Pizza(6, 'Napolitana', 'Queso, Tomate, Cebolla y aceituna', 'img/pizza6.jpg', 20);

pizzaMuzzarella.agregarProducto();
pizzaCalabreza.agregarProducto();
pizzaVegetal.agregarProducto();
pizzaCebolla.agregarProducto();
pizzaAnchoas.agregarProducto();
pizzaNapolitana.agregarProducto();
// const pizzas = "json/pizzas.JSON"
// PIZZAS HTML DOM////

const divProducto = document.getElementById('grid-container');
carrito= JSON.parse(localStorage.getItem("carrito")) || [];// es para que cada vez que inicie buscque el localStorage "carrito"
const divCarrito = document.getElementById("carrito-DOM"); 
const addCarritoModal = document.getElementById('add-carrito');

const addButtoCarrito = () =>{
  if (carrito.length > 0)
  {addCarritoModal.classList.add('visible')}
  else addCarritoModal.classList.remove('visible');
}

// HTML Donde se arma la pagina principal con las pizzas
const inyectarCards = () => {
  pizzas.forEach((pizza) => {
    divProducto.innerHTML += `
    <div class = 'products-items'>
    <div>
    <img  src="${pizza.image}" alt="${pizza.nombre}" class = "grid-item imgProd body-images">
    <h3 class = 'pizzaNom' id="">${pizza.nombre}</h3>
    <p class = 'pizzaIng' id="">${pizza.ingredientes}</p>
    <h4 class = 'pizzaPrec' id="">ARS <span>${pizza.precio}</span></h4>
    <button data-id="${pizza.id}" class ="boton-carrito agregar-carrito">Agregar </button>
    </div>
    </div>
    `;
  });
  let btnBuy = document.querySelectorAll(".agregar-carrito");

  btnBuy.forEach((element) => {
    element.addEventListener("click", (event) => {
      enviarAlCarrito(event.target.parentElement);
    });
  });
};

// Boton enviar al carrito 
const enviarAlCarrito = (datosProductos) => {
  let productoAlCarrito = {
    imagen: datosProductos.querySelector("img").src,
    nombre: datosProductos.querySelector("h3").textContent,
    precioPorUnidad: Number(
      datosProductos.querySelector("h4 span").textContent
    ),
    precioTotal: Number(datosProductos.querySelector("h4 span").textContent),
    cantidad: 1,
    id: Number(datosProductos.querySelector("button").getAttribute("data-id")),
  };
  let existeProducto = carrito.some(
    (element) => element.id === productoAlCarrito.id
  );
  if (existeProducto) { // si existe carrito haga le map para que traiga todo 
    carrito = carrito.map((element) => {
      if (element.id === productoAlCarrito.id) { // cuando coincidio 
        element.cantidad++;// sume de a uno 
        element.precioTotal = element.precioPorUnidad * element.cantidad; // aca genero el precio Total por producto
        return element; // en ambos casos se tiene que devolver ya sea modificado o no
      } else {
        return element; // en ambos casos se tiene que devolver ya sea modificado o no
      }
    });
  } else {
    carrito.push(productoAlCarrito); // si el segundo if es false, agrega el producto por 1era vez 
  }
  localStorage.setItem("carrito",JSON.stringify(carrito))
  renderizarCarrito();
}

//HTML del Carrito, boton Mostrar carrito.
function renderizarCarrito(){
divCarrito.innerHTML = "";
let itemProducto = document.createElement("div"); // Creo el elemento para mostrar
let miCantidad = totalCarritoCant();
let miTotal = totalCarrito();
console.log(miTotal)
// itemProducto.innerHTML = `<p>TOTAL de la compra: ARS ${miTotal}<p>`;
for (let pizza of carrito) {
  //Acá en vez de mostrar solo el nombre, podemos montar la card completa usando plantillas literales
  divCarrito.innerHTML += `<div>
     TOTAL de la compra: ARS ${miTotal} </p>
      Total Productos: ${miCantidad} 
      <hr/>
      <h4 class ="">${pizza.nombre}</h4> 
      <img id="carrito-img" class =""src="${pizza.imagen}" alt="${pizza.nombre}"><br>
      <p>Precio: ARS${pizza.precioPorUnidad}</p>
      <p>Precio Total: ARS${pizza.precioTotal}</p>
      <p>Cantidad : ${pizza.cantidad}</p>
      <button  class="btn-mas" data-id=${pizza.id}> + </button>
      <button  class="btn-menos" data-id=${pizza.id}> - </button>
      <button class="btn btn-warning btnBorrar" data-id=${pizza.id} >Quitar del Carrito</button>
      <hr/>
      </div>
    `
  }
  divCarrito.appendChild(itemProducto);
  addButtoCarrito();
}

//RESTAR PRODUCTO Y BORRAR PRODUCTO.
const sumarProducto = (event) => {
  let idProducto = Number(event.target.getAttribute("data-id"));
  carrito = carrito.map((element) => {
    if (element.id === idProducto) {
      element.cantidad++;
      element.precioTotal = element.precioTotal + element.precioPorUnidad;
      if (element.cantidad === 0) {
        element.cantidad = 1;
        element.precioTotal = element.precioPorUnidad;
      }
      return element;
    } else {
      return element;
    }
  });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
};


const restarProducto = (event) => {
  let idProducto = Number(event.target.getAttribute("data-id"));
  carrito = carrito.map((element) => {
    if (element.id === idProducto) {
      element.cantidad--;
      element.precioTotal = element.precioTotal - element.precioPorUnidad;
      if (element.cantidad === 0) {
        element.cantidad = 1;
        element.precioTotal = element.precioPorUnidad;
      }
      return element;
    } else {
      return element;
    }
  });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
};

const borrarProducto = (event) => {
  let idProducto = Number(event.target.getAttribute("data-id")); 
  carrito = carrito.filter((element) => element.id != idProducto); // filtra todo el carrito que NO sea igual al idProducto y arma otro carrito sin ese producto
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
};

divCarrito.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-menos")){
    restarProducto(event);// lo que reste me lo lleva a 1 
  }
  if (event.target.classList.contains("btnBorrar")){
    borrarProducto(event);
  }
  if (event.target.classList.contains("btn-mas")){
    sumarProducto(event);
  }
  });


//TOTAL PRODUCTO.
const totalCarrito = () => {
  let miTotal = carrito.reduce(
    (acum, iti) => acum + iti.precioTotal,
    0
  );
  return miTotal;
};
const totalCarritoCant = () => {
  let miCantidad = carrito.length
  return miCantidad;
};



//BACKDROP CARRITO, este punto lo tengo que arreglar. 
const addCarritoStore = document.getElementById('backdrop-carrito')
const carritoShow = document.getElementById ('mostrar-carrito')

const  carritoShowHandler = () => {
  backdrop.classList.toggle('visible');
  // toggleBackdropCarrito();
  addCarritoStore.classList.toggle('visible');
}

const  carritoShowHandlerDelete = () => {
  backdrop.classList.remove('visible');
  // toggleBackdropCarrito();
  addCarritoStore.classList.remove('visible');
}
carritoShow.addEventListener('click',carritoShowHandler);
//Esto se ejecuta para armar la pagina principal y el LocalStorage
inyectarCards();
renderizarCarrito();
