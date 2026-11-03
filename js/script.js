window.addEventListener("load", () => {
  const track = document.querySelector(".ticker-track");
  const velocidad = 30;

  const contenidoOriginal = track.innerHTML;
  const anchoOriginal = track.scrollWidth;

  while (track.scrollWidth < window.innerWidth * 2 + anchoOriginal) {
    track.innerHTML += contenidoOriginal;
  }

  let posicion = 0;
  let ultimoTiempo = null;
  let pausado = false;

  track.addEventListener("mouseenter", () => (pausado = true));
  track.addEventListener("mouseleave", () => (pausado = false));

  function animar(tiempo) {
    if (ultimoTiempo === null) ultimoTiempo = tiempo;
    const delta = (tiempo - ultimoTiempo) / 1000;
    ultimoTiempo = tiempo;

    if (!pausado) {
      posicion -= velocidad * delta;
      if (Math.abs(posicion) >= anchoOriginal) {
        posicion += anchoOriginal;
      }
      track.style.transform = `translateX(${posicion}px)`;
    }

    requestAnimationFrame(animar);
  }

  requestAnimationFrame(animar);
});
