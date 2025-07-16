// pago.js

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const resumenCarritoUl = document.getElementById('resumen-carrito');
    const totalPagoSpan = document.getElementById('total-pago');
    const metodoPagoSelect = document.getElementById('metodo-pago');
    const formPago = document.getElementById('form-pago');
    const btnConfirmarPago = formPago.querySelector('button[type="submit"]');

    // Contenedores específicos para cada método de pago
    const camposTarjetaDiv = document.getElementById('campos-tarjeta');
    const camposPaypalDiv = document.getElementById('campos-paypal');
    const camposYapeDiv = document.getElementById('campos-yape');

    // Campos de tarjeta específicos para hacerlos requeridos/no requeridos
    const inputNombreTitular = document.getElementById('nombre-titular');
    const inputNumeroTarjeta = document.getElementById('numero-tarjeta');
    const inputFechaVencimiento = document.getElementById('fecha-vencimiento');
    const inputCvv = document.getElementById('cvv');

    // Campos comunes a todos los métodos
    const inputCorreoElectronico = document.getElementById('correo-electronico');
    const inputDireccionFacturacion = document.getElementById('direccion-facturacion');

    // Elemento para mostrar el monto de Yape
    const yapeMontoSpan = document.getElementById('yape-monto');

    let carrito = [];
    let total = 0;
    let numeroTarjetaReal = ''; // Variable para almacenar el número de tarjeta real

    // --- Funciones para cargar y mostrar el carrito ---

    // Carga los datos del carrito y el total desde localStorage
    function cargarDatosCarrito() {
        const carritoGuardado = localStorage.getItem('carritoGameLand');
        const totalGuardado = localStorage.getItem('totalGameLand');

        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
        }
        if (totalGuardado) {
            total = parseFloat(totalGuardado);
        }
    }

    // Muestra los productos en el resumen del pedido
    function mostrarResumenCarrito() {
        resumenCarritoUl.innerHTML = ''; // Limpiar la lista actual del carrito

        if (carrito.length === 0) {
            resumenCarritoUl.innerHTML = '<li>No hay productos en el pedido.</li>';
            btnConfirmarPago.disabled = true; // Deshabilitar el botón de pago si no hay productos
        } else {
            carrito.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.nombre} - S/ ${item.precio.toFixed(2)}`;
                resumenCarritoUl.appendChild(li);
            });
            btnConfirmarPago.disabled = false; // Habilitar el botón de pago si hay productos
        }
        totalPagoSpan.textContent = total.toFixed(2);
        yapeMontoSpan.textContent = total.toFixed(2); // Actualiza también el monto para Yape
    }

    // --- Lógica para mostrar/ocultar campos según el método de pago ---

    function mostrarCamposMetodoPago(metodo) {
        // Ocultar todos los contenedores de campos de pago específicos
        camposTarjetaDiv.style.display = 'none';
        camposPaypalDiv.style.display = 'none';
        camposYapeDiv.style.display = 'none';

        // Remover 'required' de todos los campos específicos de tarjeta
        inputNombreTitular.removeAttribute('required');
        inputNumeroTarjeta.removeAttribute('required');
        inputFechaVencimiento.removeAttribute('required');
        inputCvv.removeAttribute('required');

        // Limpiar los valores de los campos de tarjeta al cambiar el método
        inputNombreTitular.value = '';
        inputNumeroTarjeta.value = '';
        inputFechaVencimiento.value = '';
        inputCvv.value = '';
        numeroTarjetaReal = ''; // Limpiar el número de tarjeta real al cambiar de método


        // Mostrar el contenedor y hacer campos requeridos según el método seleccionado
        switch (metodo) {
            case 'tarjeta':
                camposTarjetaDiv.style.display = 'block';
                inputNombreTitular.setAttribute('required', 'required');
                inputNumeroTarjeta.setAttribute('required', 'required');
                inputFechaVencimiento.setAttribute('required', 'required');
                inputCvv.setAttribute('required', 'required');
                break;
            case 'paypal':
                camposPaypalDiv.style.display = 'block';
                break;
            case 'yape':
                camposYapeDiv.style.display = 'block';
                break;
            default:
                // Si no se selecciona ningún método, no se muestra nada extra
                break;
        }
    }

    // --- Lógica para ocultar el número de tarjeta mientras se escribe ---

    inputNumeroTarjeta.addEventListener('input', (event) => {
        const input = event.target;
        const valorActual = input.value.replace(/\D/g, ''); // Remover caracteres no numéricos
        
        // Guardar el número de tarjeta real
        numeroTarjetaReal = valorActual;

        // Formatear para mostrar solo los últimos 4 dígitos y el resto como asteriscos
        if (valorActual.length > 17) {
            input.value = '*'.repeat(valorActual.length - 4) + valorActual.slice(-4);
        } else {
            input.value = valorActual;
        }
    });

    // --- Manejo del formulario de pago ---

    // Listener para el cambio en el selector de método de pago
    metodoPagoSelect.addEventListener('change', () => {
        mostrarCamposMetodoPago(metodoPagoSelect.value);
    });

    // Maneja el envío del formulario de pago
    formPago.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el envío por defecto del formulario

        const metodoSeleccionado = metodoPagoSelect.value;
        const correoElectronico = inputCorreoElectronico.value.trim();
        const direccionFacturacion = inputDireccionFacturacion.value.trim();

        // Validaciones de campos comunes
        if (!metodoSeleccionado) {
            alert('Por favor, selecciona un método de pago.');
            return;
        }

        if (!correoElectronico || !inputCorreoElectronico.checkValidity()) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        if (!direccionFacturacion) {
            alert('Por favor, ingresa tu dirección de facturación.');
            return;
        }

        // Simulación de procesamiento de pago basado en el método
        let mensajeConfirmacion = '';
        let pagoExitoso = true; // Variable para controlar si el pago fue "exitoso"

        switch (metodoSeleccionado) {
            case 'tarjeta':
                // Los campos ya son requeridos por el HTML y el JavaScript dinámico.
                // Podrías añadir aquí validaciones extra para formato de tarjeta, CVV, etc.
                // Para la fecha de vencimiento:
                const [mes, anio] = inputFechaVencimiento.value.split('/');
                const fechaActual = new Date();
                const mesActual = fechaActual.getMonth() + 1; // getMonth() es 0-11
                const anioActual = fechaActual.getFullYear() % 100; // Últimos dos dígitos del año

                if (parseInt(anio) < anioActual || (parseInt(anio) === anioActual && parseInt(mes) < mesActual)) {
                    alert('La fecha de vencimiento de la tarjeta no es válida.');
                    pagoExitoso = false;
                    return;
                }
                
                // Aquí usamos `numeroTarjetaReal` para el procesamiento, no el valor oculto del input
                console.log('Número de tarjeta real a enviar:', numeroTarjetaReal); 
                // En una aplicación real, este `numeroTarjetaReal` se enviaría a tu backend de pago.

                mensajeConfirmacion = 'Procesando pago con Tarjeta de Crédito/Débito...';
                break;
            case 'paypal':
                mensajeConfirmacion = 'Redirigiendo a PayPal para completar tu pago. Por favor, no cierres esta ventana.';
                // En una aplicación real, aquí harías una redirección a la API de PayPal.
                break;
            case 'yape':
                mensajeConfirmacion = 'Recibido: Tu pedido está pendiente de verificación de pago con Yape. Por favor, asegúrate de haber Yapeado el monto exacto.';
                // En un caso real, esto implicaría una verificación manual o integración con API de Yape.
                break;
            default:
                alert('Método de pago no válido.');
                pagoExitoso = false;
                break;
        }

        if (pagoExitoso) {
            // Mostrar un mensaje inicial y luego simular el proceso
            alert(mensajeConfirmacion);

            // Simular un pequeño retraso para el procesamiento del pago
            setTimeout(() => {
                alert('¡Tu pago ha sido procesado exitosamente! Gracias por tu compra en GameLand.');

                // Limpiar el carrito de localStorage después de un pago "exitoso"
                localStorage.removeItem('carritoGameLand');
                localStorage.removeItem('totalGameLand');

                // Redirigir a una página de confirmación de pedido o al inicio
                window.location.href = 'confirmacion_pago.html'; // Puedes cambiar a 'confirmacion.html' si la creas
            }, 2000); // Retraso de 2 segundos para simular el procesamiento
        }
    });

    // --- Inicialización al cargar la página ---
    cargarDatosCarrito();
    mostrarResumenCarrito();
    // Asegurarse de que no se muestran campos de pago al inicio hasta que se seleccione un método
    mostrarCamposMetodoPago('');
});