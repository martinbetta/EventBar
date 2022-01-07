// import {  } from './productos';
$( document ).ready(function()
{
console.log( "El DOM esta listo Muñeco!!" );
});

const pizzas= []; 
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

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

// PIZZAS HTML DOM////
const divProducto = document.getElementById('grid-container');

for (let pizza of pizzas){
  let itemProducto = document.createElement('div')
  itemProducto.innerHTML= `
  <div class = 'products-items'>
  <div>
  <img class = "grid-item imgProd" src="${pizza.image}" alt="${pizza.nombre}">
  <div class = 'body-images' >
  <p class = 'pizzaNom' id="">${pizza.nombre}</p>
  <p class = 'pizzaIng' id="">${pizza.ingredientes}</p>
  <p class = 'pizzaPrec' id="">ARS ${pizza.precio}</p>
  <button id="${pizza.id}" class = "boton-carrito agregar-carrito">Agregar </button>
  </div>
  </div>
  </div>
  `
  divProducto.appendChild(itemProducto); 
};