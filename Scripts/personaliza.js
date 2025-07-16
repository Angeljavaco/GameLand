        document.addEventListener('DOMContentLoaded', function() {
            const tipoProductoSelect = document.getElementById('tipo_producto');
            const opcionesJugueteDiv = document.getElementById('opciones_juguete');
            const opcionesConsolaDiv = document.getElementById('opciones_consola');

            tipoProductoSelect.addEventListener('change', function() {
                // Oculta ambos divs primero
                opcionesJugueteDiv.style.display = 'none';
                opcionesConsolaDiv.style.display = 'none';

                // Muestra el div correspondiente según la selección
                if (this.value === 'juguete') {
                    opcionesJugueteDiv.style.display = 'block';
                } else if (this.value === 'consola') {
                    opcionesConsolaDiv.style.display = 'block';
                }
            });
        });