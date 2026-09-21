const productos = [
  { id: 1, nombre: "Audífonos inalámbricos", precio: 120000, categoria: "circulo" },
  { id: 2, nombre: "Teclado mecánico", precio: 250000, categoria: "cuadrado" },
  { id: 3, nombre: "Mouse ergonómico", precio: 85000, categoria: "triangulo" },
  { id: 4, nombre: "Monitor 24 pulgadas", precio: 650000, categoria: "estrella" }
];

let carrito = [];

const listaProductos = document.getElementById("listaProductos");
const itemsCarrito = document.getElementById("itemsCarrito");
const totalCarritoEl = document.getElementById("totalCarrito");
const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");
const btnCheckout = document.getElementById("btnCheckout");
const mensajeCheckout = document.getElementById("mensajeCheckout");

// script.js

function crearSvgIcono(categoria) {
  if (categoria === "circulo") {
    return "<svg viewBox='0 0 40 40' width='40' height='40'><circle cx='20' cy='20' r='16' fill='#2451c4'></circle>";
  }
  if (categoria === "cuadrado") {
    return "<svg viewBox='0 0 40 40' width='40' height='40'><rect x='6' y='6' width='28' height='28' fill='#17a673'";
  }
  if (categoria === "triangulo") {
    return "<svg viewBox='0 0 40 40' width='40' height='40'><polygon points='20,6 34,34 6,34' fill='#d9782d'></polygon></svg>";
  }
  return "<svg viewBox='0 0 40 40' width='40' height='40'><polygon points='20,4 24,16 37,16 26,24 30,36 20,28 10,36 14,24 3,16 16,16' fill='#d1435b'></polygon></svg>";
}