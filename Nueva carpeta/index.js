const DISPLAY_ESTADO = document.querySelector('.notificacion'); // Cambiar la clase del selector
const ESTADO_JUEGO = ["", "", "", "", "", "", "", "", ""];
const COMBINACIONES_GANADORAS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const MENSAJE_VICTORIA = () => `El jugador ${jugadorActual} ha ganado!`;
const MENSAJE_EMPATE = () => `El juego ha terminado en empate!`;
const TURNO_JUGADOR_ACTUAL = () => `Turno del jugador ${jugadorActual}`;
const clicSound = new Audio('Click.mp3');

// ==================== VARIABLES ==================== //
let juegoActivo = true;
let jugadorActual = "O"; // Cambiar si deseas que el juego empiece con "X"

// ==================== FUNCIONES ==================== //

function main() {
  mostrarEstadoJuego(TURNO_JUGADOR_ACTUAL());
  establecerEventListeners();
}

function establecerEventListeners() {
  document.querySelector('.contenedor-juego').addEventListener('click', manejarClickCelda);
  document.querySelector('.reiniciar').addEventListener('click', reiniciarJuego); // Cambiar la clase del selector
}

function mostrarEstadoJuego(mensaje) {
  DISPLAY_ESTADO.innerHTML = mensaje;
}

function reiniciarJuego() {
  juegoActivo = true;
  jugadorActual = "X"; // Cambiar si deseas que el juego empiece con "O"
  reiniciarEstadoJuego();
  mostrarEstadoJuego(TURNO_JUGADOR_ACTUAL());
  document.querySelectorAll('.celda-juego').forEach(celda => celda.innerHTML = ""); // Cambiar la clase del selector
}

function manejarClickCelda(evento) {
  const celdaClickeada = evento.target;
  if (celdaClickeada.classList.contains('celda-juego')) { // Cambiar la clase del selector
    const indiceCeldaClickeada = Array.from(celdaClickeada.parentNode.children).indexOf(celdaClickeada);
    if (ESTADO_JUEGO[indiceCeldaClickeada] !== '' || !juegoActivo) {
      return false;
    }

    marcarCeldaJugada(celdaClickeada, indiceCeldaClickeada);
    validarResultadoPartida();
    clicSound.play();
  }
}

function marcarCeldaJugada(celdaClickeada, indiceCeldaClickeada) {
  ESTADO_JUEGO[indiceCeldaClickeada] = jugadorActual;
  celdaClickeada.innerHTML = jugadorActual;
}

function validarResultadoPartida() {
  let rondaGanada = false;
  for (let i = 0; i < COMBINACIONES_GANADORAS.length; i++) {
    const combinacionGanadora = COMBINACIONES_GANADORAS[i];
    let posicion1 = ESTADO_JUEGO[combinacionGanadora[0]];
    let posicion2 = ESTADO_JUEGO[combinacionGanadora[1]];
    let posicion3 = ESTADO_JUEGO[combinacionGanadora[2]];

    if (posicion1 === '' || posicion2 === '' || posicion3 === '') {
      continue;
    }
    if (posicion1 === posicion2 && posicion2 === posicion3) {
      rondaGanada = true;
      break;
    }
  }

  if (rondaGanada) {
    mostrarEstadoJuego(MENSAJE_VICTORIA());
    juegoActivo = false;
    return;
  }

  let rondaEmpate = !ESTADO_JUEGO.includes("");
  if (rondaEmpate) {
    mostrarEstadoJuego(MENSAJE_EMPATE());
    juegoActivo = false;
    return;
  }

  cambiarJugadorActual();
}

function cambiarJugadorActual() {
  jugadorActual = jugadorActual === "X" ? "O" : "X";
  mostrarEstadoJuego(TURNO_JUGADOR_ACTUAL());
}

function reiniciarEstadoJuego() {
  let i = ESTADO_JUEGO.length;
  while (i--) {
    ESTADO_JUEGO[i] = '';
  }
}

main();