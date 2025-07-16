// Scripts/login.js (ESTE ES UN EJEMPLO DE CÓMO SERÍA LA LÓGICA)
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginLink = document.getElementById('login-link'); // Referencia al enlace de login en la navegación

    // Usuarios de ejemplo (en una aplicación real, esto vendría de un servidor)
    const usuariosPermitidos = [
        { username: 'admin', password: 'password123' },
        { username: 'usuario1', password: 'miclave' },
        { username: 'test', password: '12345' }
    ];

    // Función para manejar el envío del formulario de login
    if (loginForm) { // Asegúrate de que el formulario de login exista en la página
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

            const username = usernameInput.value;
            const password = passwordInput.value;

            // Buscar si las credenciales coinciden con algún usuario permitido
            const usuarioEncontrado = usuariosPermitidos.find(user => 
                user.username === username && user.password === password
            );

            if (usuarioEncontrado) {
                alert(`¡Bienvenido, ${username}! Has iniciado sesión.`);
                // Aquí podrías guardar el estado de login en localStorage/sessionStorage
                localStorage.setItem('loggedInUser', username); 
                // Y redirigir al usuario a la página principal o a un panel
                window.location.href = 'index.html'; 
            } else {
                alert('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
                usernameInput.value = ''; // Limpiar campos
                passwordInput.value = '';
                usernameInput.focus(); // Poner el foco en el campo de usuario
            }
        });
    }

    // Opcional: Cambiar el texto del enlace de "Iniciar Sesión" a "Cerrar Sesión" si el usuario ya está logueado
    if (loginLink) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            loginLink.textContent = `Cerrar Sesión (${loggedInUser})`;
            loginLink.href = '#'; // O puedes apuntar a una función de logout
            loginLink.addEventListener('click', (event) => {
                event.preventDefault();
                if (confirm('¿Estás seguro que quieres cerrar sesión?')) {
                    localStorage.removeItem('loggedInUser'); // Eliminar el usuario logueado
                    alert('Sesión cerrada.');
                    window.location.href = 'login.html'; // Redirigir de nuevo a la página de login
                }
            });
        }
    }
});