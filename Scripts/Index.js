    const imagenes = document.querySelectorAll('.carrusel-imagen');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let indiceActual = 0;

    function mostrarImagen(indice) {
      imagenes.forEach((img, i) => {
        if (i === indice) {
          img.classList.add('activo');
          img.style.display = 'block';
        } else {
          img.classList.remove('activo');
          img.style.display = 'none';
        }
      });
    }

    prevBtn.addEventListener('click', () => {
      indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
      mostrarImagen(indiceActual);
    });

    nextBtn.addEventListener('click', () => {
      indiceActual = (indiceActual + 1) % imagenes.length;
      mostrarImagen(indiceActual);
    });

    // Cambio automático cada 5 segundos
    setInterval(() => {
      indiceActual = (indiceActual + 1) % imagenes.length;
      mostrarImagen(indiceActual);
    }, 5000);
  