document.addEventListener('DOMContentLoaded', function () {
    const listaProductos = document.getElementById('lista-productos');
    const itemsCarrito = document.getElementById('items-carrito');
    const totalCarrito = document.getElementById('total-carrito');


    function cargarCarritoDesdeJSON() {
        return fetch('carrito.json')
            .then(response => response.json())
            .catch(error => {
                console.error('Error al cargar el carrito desde el JSON:', error);
                throw error;
            });
    }

    let productos;

    cargarCarritoDesdeJSON()
        .then(data => {
            productos = data;
            productos.forEach(producto => {
                const li = document.createElement('li');
                li.innerHTML = `${producto.nombre} - $${producto.precio.toFixed(2)} <button onclick="addToCart(${producto.id})">Agregar al carrito</button>`;
                listaProductos.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al cargar el carrito desde el JSON:', error);
        });

    window.addToCart = function (productoId) {
        obtenerProductoPorId(productoId, productos)
            .then(productoSeleccionado => {
                const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

                carrito.push(productoSeleccionado);

                localStorage.setItem('carrito', JSON.stringify(carrito));
                updateCartDOM(itemsCarrito, totalCarrito);
            })
            .catch(error => {
                console.error('Error al agregar al carrito:', error);
            });
    };

    function obtenerProductoPorId(productoId, productos) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const producto = productos.find(p => p.id === productoId);
                if (producto) {
                    resolve(producto);
                } else {
                    reject(new Error('Producto no encontrado'));
                }
            }, 1000);
        });
    }

    function updateCartDOM(itemsCarrito, totalCarrito) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        itemsCarrito.innerHTML = '';

        let total = 0;

        carrito.forEach(producto => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${producto.nombre} - $${producto.precio.toFixed(2)}
                <button onclick="removeFromCart(${producto.id})">Eliminar</button>`;
            itemsCarrito.appendChild(li);

            total += producto.precio;
        });

        totalCarrito.textContent = total.toFixed(2);
    }

    window.removeFromCart = function (productoId) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(producto => producto && producto.id && producto.id !== productoId);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        updateCartDOM(document.getElementById('items-carrito'), document.getElementById('total-carrito'));
    };

    updateCartDOM(document.getElementById('items-carrito'), document.getElementById('total-carrito'));

    document.getElementById('mostrarAlerta').addEventListener('click', function () {
        if (localStorage.getItem('carrito') && JSON.parse(localStorage.getItem('carrito')).length > 0) {
            mostrarSweetAlert();
            clearCart();
            updateCartDOM(document.getElementById('items-carrito'), document.getElementById('total-carrito'));
        } else {
            mostrarErrorAlert();
        }
    });

    function mostrarSweetAlert() {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tu compra se realizó correctamente!',
            showConfirmButton: false,
            timer: 1500
        });
    }

    function mostrarErrorAlert() {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No hay productos en el carrito.',
        });
    }

    function clearCart() {
        localStorage.removeItem('carrito');
    }
});