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
        const productoSeleccionado = productos.find(producto => producto.id === productoId);

        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const itemsCarrito = document.getElementById('items-carrito');
        const totalCarrito = document.getElementById('total-carrito');

        carrito.push(productoSeleccionado);

        localStorage.setItem('carrito', JSON.stringify(carrito));
        updateCartDOM(itemsCarrito, totalCarrito);
    };

    function updateCartDOM(itemsCarrito, totalCarrito) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        itemsCarrito.innerHTML = '';

        let total = 0;

        carrito.forEach(producto => {
            const li = document.createElement('li');
            li.innerHTML = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
            itemsCarrito.appendChild(li);

            total += producto.precio;
        });

        totalCarrito.textContent = total.toFixed(2);
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
    console.log(productos)
});
