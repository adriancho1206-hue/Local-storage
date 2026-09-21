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
function renderProductos() {
  listaProductos.innerHTML = "";

  productos.forEach(function (producto) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjetaProducto";

    const icono = document.createElement("div");
    icono.className = "iconoProducto";
    icono.innerHTML = crearSvgIcono(producto.categoria);

    const nombre = document.createElement("p");
    nombre.className = "nombreProducto";
    nombre.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.className = "precioProducto";
    precio.textContent = "$" + producto.precio.toLocaleString("es-CO");

    const boton = document.createElement("button");
    boton.className = "btnAgregar";
    boton.textContent = "Agregar al carrito";
    boton.dataset.id = producto.id;

    tarjeta.appendChild(icono);
    tarjeta.appendChild(nombre);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(boton);

    listaProductos.appendChild(tarjeta);
  })
}
function guardarCarrito() {
  localStorage.setItem("carritoTienda", JSON.stringify(carrito));
}

function guardarCarrito() {
  localStorage.setItem("carritoTienda", JSON.stringify(carrito));
}
function cargarCarrito() {
const datosGuardados = localStorage.getItem("carritoTienda");
carrito = datosGuardados ? JSON.parse(datosGuardados) : []
}


function calcularTotal() {
  return carrito.reduce(function (acumulado, itemCarrito) {
    const producto = productos.find(function (p) {
      return p.id === itemCarrito.id;
    });

    if (!producto) {
      return acumulado;
    }

    return acumulado + producto.precio * itemCarrito.cantidad;
  }, 0);
function renderCarrito() {
  itemsCarrito.innerHTML = "";

  if (carrito.length === 0) {
    itemsCarrito.innerHTML = "<p class='carritoVacio'>Tu carrito está vacío.</p>";
  }

  carrito.forEach(function (itemCarrito) {
    const producto = productos.find(function (p) {
      return p.id === itemCarrito.id;
    });

    if (!producto) {
      return;
    }

    const subtotal = producto.precio * itemCarrito.cantidad;

    const fila = document.createElement("div");
    fila.className = "itemCarritoFila";
    fila.innerHTML =
      "<span class='nombreItem'>" + producto.nombre + "</span>" +
      "<div class='controlesCantidad'>" +
      "<button class='btnRestar' data-id='" + producto.id + "'>-</button>" +
        "<span class='cantidadItem'>" + itemCarrito.cantidad + "</span>" +
        "<button class='btnSumar' data-id='" + producto.id + "'>+</button>" +
        "</div>" +
        "<span class='subtotalItem'>$" + subtotal.toLocaleString("es-CO") + "</span>" +
        "<button class='btnEliminarItem' data-id='" + producto.id + "'>Eliminar</button>";

    itemsCarrito.appendChild(fila);
  });

  totalCarritoEl.textContent = "$" + calcularTotal().toLocaleString("es-CO");
  guardarCarrito();
}}
function agregarAlCarrito(idProducto) {
  const itemExistente = carrito.find(function (itemCarrito) {
    return itemCarrito.id === idProducto;
  });

  if (itemExistente) {
    itemExistente.cantidad = itemExistente.cantidad + 1;
  } else {
    carrito.push({ id: idProducto, cantidad: 1 });
  }

  renderCarrito();
}

listaProductos.addEventListener("click", function (evento) {
  const boton = evento.target.closest(".btnAgregar");

  if (!boton) {
    return;
  }

  const idProducto = Number(boton.dataset.id);
  agregarAlCarrito(idProducto);
})
itemsCarrito.addEventListener("click", function (evento) {
  const boton = evento.target.closest("button");

  if (!boton) {
    return;
  }

  const idProducto = Number(boton.dataset.id);
  const itemCarrito = carrito.find(function (i) {
    return i.id === idProducto;
  });

  if (!itemCarrito) {
    return;
  }

  if (boton.classList.contains("btnSumar")) {
    itemCarrito.cantidad = itemCarrito.cantidad + 1;
  } else if (boton.classList.contains("btnRestar")) {
    itemCarrito.cantidad = itemCarrito.cantidad - 1;

    if (itemCarrito.cantidad <= 0) {
      carrito = carrito.filter(function (i) {
        return i.id !== idProducto;
    });
  }
} else if (boton.classList.contains("btnEliminarItem")) {
  carrito = carrito.filter(function (i) {
    return i.id !== idProducto;
  });
}

renderCarrito();
});
btnVaciarCarrito.addEventListener("click", function () {
  carrito = [];
  mensajeCheckout.textContent = "";
  renderCarrito();
});

// Paso 11: el checkout que limpia el carrito

btnCheckout.addEventListener("click", function () {
  if (carrito.length === 0) {
    mensajeCheckout.textContent = "Agrega productos al carrito antes de finalizar la compra.";
    mensajeCheckout.className = "mensajeCheckout error";
    return;
  }

  const totalPagado = calcularTotal();

  mensajeCheckout.textContent = "Compra confirmada por $" + totalPagado.toLocaleString("es-CO") + ". Gracias por tu compra "
  mensajeCheckout.className = "mensajeCheckout exito";

  carrito = []
  renderCarrito();
})
cargarCarrito();
renderProductos();
renderCarrito();