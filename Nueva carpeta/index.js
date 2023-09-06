
const DISPLAY_ESTADO = document.querySelector('.notificacion'); // Selecciona el elemento HTML con la clase 'notificacion' para mostrar mensajes.

const ESTADO_JUEGO = ["", "", "", "", "", "", "", "", ""]; // Inicializa un arreglo para representar el estado del juego.

const COMBINACIONES_GANADORAS = [ // Define las combinaciones ganadoras en el juego del ta te ti.
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const MENSAJE_VICTORIA = () => `El jugador ${jugadorActual} ha ganado!`; // Define una función para mostrar el mensaje de victoria.

const MENSAJE_EMPATE = () => `El juego ha terminado en empate!`; // Define una función para mostrar el mensaje de empate.

const TURNO_JUGADOR_ACTUAL = () => `Turno del jugador ${jugadorActual}`; // Define una función para mostrar de quién es el turno.

const clicSound = new Audio('Click.mp3'); // Crea un objeto de sonido para reproducir un sonido al hacer clic.

// Variables del juego
let juegoActivo = true; // Indica si el juego está en curso.
let jugadorActual = "O"; // Inicializa el jugador actual, puedes cambiarlo a "X" si prefieres.

// Función principal
function main() {
  mostrarEstadoJuego(TURNO_JUGADOR_ACTUAL()); // Muestra el mensaje de turno del jugador actual.
  establecerEventListeners(); // Establece los manejadores de eventos.
}

// Establece manejadores de eventos para clics en celdas y reinicio del juego.
function establecerEventListeners() {
  document.querySelector('.contenedor-juego').addEventListener('click', manejarClickCelda); // Maneja clics en celdas.
  document.querySelector('.reiniciar').addEventListener('click', reiniciarJuego); // Reinicia el juego.
}

// Muestra un mensaje en la interfaz de usuario.
function mostrarEstadoJuego(mensaje) {
  DISPLAY_ESTADO.innerHTML = mensaje;
}

// Reinicia el juego.
function reiniciarJuego() {
  juegoActivo = true; 
  jugadorActual = "X"; // Cambiar si deseas que el juego empiece con "O" 
  reiniciarEstadoJuego();
  mostrarEstadoJuego(TURNO_JUGADOR_ACTUAL());
  document.querySelectorAll('.celda-juego').forEach(celda => celda.innerHTML = ""); // Limpia el contenido de las celdas.
}

// Maneja el clic en una celda del juego.
function manejarClickCelda(evento) {
  const celdaClickeada = evento.target;
  if (celdaClickeada.classList.contains('celda-juego')) {
    const indiceCeldaClickeada = Array.from(celdaClickeada.parentNode.children).indexOf(celdaClickeada);
    if (ESTADO_JUEGO[indiceCeldaClickeada] !== '' || !juegoActivo) {
      return false;
    }
    marcarCeldaJugada(celdaClickeada, indiceCeldaClickeada);
    validarResultadoPartida();
    clicSound.play(); // Reproduce un sonido al hacer clic.
  }
}

// Marca la celda como jugada.
function marcarCeldaJugada(celdaClickeada, indiceCeldaClickeada) {
  ESTADO_JUEGO[indiceCeldaClickeada] = jugadorActual;
  celdaClickeada.innerHTML = jugadorActual;
}

// Valida el resultado de la partida (ganador o empate).
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

// Cambia el jugador actual.
function cambiarJugadorActual() {
  jugadorActual = jugadorActual === "X" ? "O" : "X";
  mostrarEstadoJuego(TURNO_JUGADOR_ACTUAL());
}

// Reinicia el estado del juego.
function reiniciarEstadoJuego() {
  let i = ESTADO_JUEGO.length;
  while (i--) {
    ESTADO_JUEGO[i] = '';
  }
}

main(); // Inicia el juego cuando se carga la página.
```
