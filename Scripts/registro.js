// js/registro.js

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const usernameInput = document.getElementById('reg-username');
    const emailInput = document.getElementById('reg-email');
    const passwordInput = document.getElementById('reg-password');
    const confirmPasswordInput = document.getElementById('reg-confirm-password');

    // Elementos para mostrar errores
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');

    function validateForm(event) {
        event.preventDefault(); // Evitar que el formulario se envíe por defecto

        // Reiniciar mensajes de error
        usernameError.style.display = 'none';
        passwordError.style.display = 'none';
        confirmPasswordError.style.display = 'none';

        let isValid = true; // Variable para rastrear la validez del formulario

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Validación de campos vacíos
        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            alert('Por favor, completa todos los campos.');
            isValid = false;
        }

        // Validación de longitud de usuario
        if (username.length < 3 && isValid) { // Usamos isValid para encadenar validaciones
            usernameError.textContent = 'El nombre de usuario debe tener al menos 3 caracteres.';
            usernameError.style.display = 'block';
            isValid = false;
        }

        // Validación de formato de email (básica)
        if (!emailInput.checkValidity() && isValid) {
            alert('Por favor, ingresa un correo electrónico válido.');
            isValid = false;
        }

        // Validación de longitud de contraseña
        if (password.length < 6 && isValid) {
            passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
            passwordError.style.display = 'block';
            isValid = false;
        }

        // Validación de coincidencia de contraseñas
        if (password !== confirmPassword && isValid) {
            confirmPasswordError.textContent = 'Las contraseñas no coinciden.';
            confirmPasswordError.style.display = 'block';
            isValid = false;
        }

        // Si todas las validaciones son exitosas
        if (isValid) {
            // **Simulación de registro exitoso**
            alert(`¡Registro exitoso para ${username}! Ahora puedes iniciar sesión.`);
            
            // Opcional: Podrías guardar el usuario y contraseña simulados en localStorage
            // para que el login.js pueda "autenticarlos".
            // Para fines de este proyecto, se considerará que "se ha registrado".
            
            // Simular un prompt para una pregunta adicional post-registro
            const additionalInfo = prompt('¡Felicidades por tu registro! ¿Cuál es tu producto GameLand favorito? (Opcional)');
            if (additionalInfo) {
                alert(`¡Gracias por compartir! Tu favorito es: ${additionalInfo}`);
            }

            // Redirigir al usuario a la página de login
            window.location.href = 'login.html';

        } else {
            // Si hay errores, alertar al usuario (además de los mensajes en línea)
            alert('Por favor, corrige los errores en el formulario.');
        }
    }

    // Añadir el Event Listener al formulario
    if (registerForm) {
        registerForm.addEventListener('submit', validateForm);
    }

    console.log('Script de registro cargado. Listo para la validación.');
});