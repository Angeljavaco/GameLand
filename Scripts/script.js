// Scripts/script.js - VERSIÓN CORREGIDA Y DEFINITIVA

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const carritoLista = document.getElementById('carrito-lista');
    const totalCarritoSpan = document.getElementById('total-carrito');
    const botonesAgregar = document.querySelectorAll('.agregar-producto-btn');
    const btnLimpiarCarrito = document.getElementById('btn-limpiar-carrito');
    const btnRealizarPago = document.getElementById('btn-realizar-pago');

    // Cargar carrito desde localStorage o inicializarlo como un array vacío
    let carrito = JSON.parse(localStorage.getItem('carritoGameLand')) || [];

    // --- FUNCIÓN PRINCIPAL PARA ACTUALIZAR LA VISTA DEL CARRITO (UI) ---
    function actualizarCarritoUI() {
        carritoLista.innerHTML = ''; // Limpiar la lista para volver a dibujarla con los datos actualizados

        if (carrito.length === 0) {
            carritoLista.innerHTML = '<li>El carrito está vacío.</li>';
        } else {
            carrito.forEach(item => {
                const li = document.createElement('li');
                // Se crea la estructura HTML para cada item en el carrito
                li.innerHTML = `
                    <span>${item.nombre} (S/ ${item.precio.toFixed(2)})</span>
                    <div class="item-controles">
                        <label for="cant-${item.id}">Cant:</label>
                        <input type="number" id="cant-${item.id}" class="item-cantidad" value="${item.cantidad}" min="1" data-id="${item.id}">
                        <button class="btn-eliminar-item" data-id="${item.id}" aria-label="Eliminar ${item.nombre}">×</button>
                    </div>
                `;
                carritoLista.appendChild(li);
            });
        }
        
        // --- LLAMADAS CRÍTICAS DESPUÉS DE REDIBUJAR ---
        recalcularTotal(); // Vuelve a calcular el total general.
        guardarCarritoEnLocalStorage(); // Guarda el nuevo estado del carrito.
        agregarListenersDeItems(); // Vuelve a asignar los eventos a los botones e inputs.
    }

    // --- FUNCIONES CRUD (Create, Read, Update, Delete) ---

    // CREATE / UPDATE: Añadir producto o actualizar su cantidad
    function agregarProducto(id, nombre, precio) {
        const productoExistente = carrito.find(item => item.id === id);

        if (productoExistente) {
            productoExistente.cantidad++; // UPDATE (actualiza cantidad)
        } else {
            carrito.push({ id, nombre, precio, cantidad: 1 }); // CREATE (crea nuevo item)
        }
        alert(`"${nombre}" ha sido agregado/actualizado en el carrito.`);
        actualizarCarritoUI(); // Actualiza la vista
    }

    // UPDATE: Actualizar la cantidad desde el input numérico
    function actualizarCantidad(id, cantidad) {
        // Asegurarse de que la cantidad no sea menor a 1
        const cant = Math.max(1, parseInt(cantidad, 10)); 
        const producto = carrito.find(item => item.id === id);
        
        if (producto) {
            producto.cantidad = cant;
            // No es necesario llamar a actualizarCarritoUI() aquí, porque eso recargaría
            // todo. Es más eficiente solo recalcular el total y guardar.
            recalcularTotal();
            guardarCarritoEnLocalStorage();
        }
    }
    
    // DELETE: Eliminar un solo producto del carrito
    function eliminarProducto(id) {
        carrito = carrito.filter(item => item.id !== id);
        alert(`Producto eliminado del carrito.`);
        actualizarCarritoUI(); // Actualiza la vista para que el item desaparezca
    }

    // --- FUNCIONES AUXILIARES ---

    function recalcularTotal() {
        // Recorre el array 'carrito' y suma el (precio * cantidad) de cada item
        const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        totalCarritoSpan.textContent = total.toFixed(2);
    }

    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carritoGameLand', JSON.stringify(carrito));
    }

    function limpiarCarrito() {
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            carrito = [];
            actualizarCarritoUI();
            alert('El carrito ha sido vaciado.');
        }
    }

    // --- MANEJO DE EVENTOS ---
    
    // Asigna los eventos a los botones e inputs que se crean dinámicamente
    function agregarListenersDeItems() {
        document.querySelectorAll('.btn-eliminar-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const idProducto = event.target.dataset.id;
                eliminarProducto(idProducto);
            });
        });

        document.querySelectorAll('.item-cantidad').forEach(input => {
            input.addEventListener('change', (event) => {
                const idProducto = event.target.dataset.id;
                const nuevaCantidad = event.target.value;
                actualizarCantidad(idProducto, nuevaCantidad);
            });
        });
    }

    // Listeners para los botones "Agregar"
    botonesAgregar.forEach(button => {
        button.addEventListener('click', (event) => {
            const nombreProducto = event.target.dataset.nombre;
            const idProducto = nombreProducto; // Usamos el nombre como ID único
            const precioProducto = parseFloat(event.target.dataset.precio);
            agregarProducto(idProducto, nombreProducto, precioProducto);
        });
    });

    // Listeners para los botones generales del carrito
    btnLimpiarCarrito.addEventListener('click', limpiarCarrito);

    btnRealizarPago.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('Tu carrito está vacío. Agrega productos antes de realizar el pago.');
            return;
        }
        // Guardamos el estado final antes de ir a la página de pago
        const totalFinal = parseFloat(totalCarritoSpan.textContent);
        localStorage.setItem('totalGameLand', totalFinal.toFixed(2));
        localStorage.setItem('carritoGameLand', JSON.stringify(carrito));
        window.location.href = 'pago.html';
    });

    // --- INICIALIZACIÓN ---
    // Cargar y mostrar el carrito por primera vez al cargar la página
    actualizarCarritoUI();
});