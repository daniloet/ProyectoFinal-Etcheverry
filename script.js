document.addEventListener('DOMContentLoaded', function () {

    const productos = [
        { id: 1, nombre: 'Pelota', precio: 20.00 },
        { id: 2, nombre: 'Botines', precio: 50.00 },
        { id: 3, nombre: 'Camiseta', precio: 30.00 },
        { id: 4, nombre: 'Medias', precio: 10.00 }
    ];

    const listaProductos = document.getElementById('lista-productos');

    productos.forEach(producto => {
        const li = document.createElement('li');
        li.innerHTML = `${producto.nombre} - $${producto.precio.toFixed(2)} <button onclick="addToCart(${producto.id})">Agregar al carrito</button>`;
        listaProductos.appendChild(li);
    });

    window.addToCart = function (productoId) {
        obtenerProductoPorId(productoId)
            .then(productoSeleccionado => {
                const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
                const itemsCarrito = document.getElementById('items-carrito');
                const totalCarrito = document.getElementById('total-carrito');

                carrito.push(productoSeleccionado);

                localStorage.setItem('carrito', JSON.stringify(carrito));
                updateCartDOM(itemsCarrito, totalCarrito);
            })
            .catch(error => {
                console.error('Error al agregar al carrito:', error);
            });
    };

    function obtenerProductoPorId(productoId) {
        // Simulamos una llamada a una API usando una promesa
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
        mostrarSweetAlert();
        clearCart();
        updateCartDOM(document.getElementById('items-carrito'), document.getElementById('total-carrito'));
    });

    function mostrarSweetAlert() {
        setTimeout(function () {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Tu compra se realizó correctamente!',
                showConfirmButton: false,
                timer: 1500
            });
        }, 1000);
    }

    function clearCart() {
        localStorage.removeItem('carrito');
    }
});
