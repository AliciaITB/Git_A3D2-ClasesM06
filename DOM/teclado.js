const qwertyAscii = [
  // Primera fila (Superior)
  81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 32, 
  // Segunda fila (Media)
  65, 83, 68, 70, 71, 72, 74, 75, 76, 32, 
  // Tercera fila (Inferior)
  90, 88, 67, 86, 66, 78, 77
];



function crearTeclado() {
    //Cojo el div del teclado, para luego ir añadiendo
    let teclado = document.getElementById("teclado");

    for (let i = 65; i < 90; i++) {
        //Creo la tecla
        let tecla = document.createElement("div");
        tecla.innerHTML = "<p>" + String.fromCharCode(i) + "</p>";
        tecla.className = "tecla";

        //tecla = cambiarFondoTecla(i,tecla);

        //Añadir evento.
        // tecla.addEventListener('click',escribeTecla)
        tecla.setAttribute('onclick', "escribeTecla('" + String.fromCharCode(i) + "')");

        //Añado la tecla al teclado
        teclado.appendChild(tecla);
    }

    palabraSecreta();
}
let palabra = "";
function palabraSecreta() {
    fetch('https://random-word-api.herokuapp.com/word?lang=es&length=5')
        .then(response => response.json())
        .then(data => {
            palabra = data[0]; // La API devuelve un array, ej: ["perro"]
            //Pasamos la palabra a mayusculas
            palabra=palabra.toUpperCase();
            console.log("Tu palabra secreta es:", palabra);
        });
}
function escribeTecla(letra) {
    //  console.log(letra);
    let miTexto = document.getElementById("miTexto");
    console.log("En miTexto hay: " + miTexto.textContent)
    if (miTexto.textContent.length < 5) {
        miTexto.textContent += letra
        console.log("En miTexto he añadido " + letra + " y ahora hay: " + miTexto.textContent)
    } else {
        miTexto.style.backgroundColor = "red";
        console.log("demasiado largo")
    }
}

function borrarLetra() {
    let miTexto = document.getElementById("miTexto");
    if (miTexto.textContent.length > 0) {
        miTexto.style.backgroundColor = 'purple'
        miTexto.textContent = miTexto.textContent.substring(0, miTexto.textContent.length - 1);
    }
}

function comprobar() {
    let miTexto = document.getElementById("miTexto");
    if (miTexto.textContent == palabra) {
        miTexto.style.backgroundColor = "green";
        alert("You win perfect!");
    } else {
        alert("You lost");
    }
}


/***TECLADO NUMERICO */
function esPrimo(num) {
    if (num < 2) return false;        // 0 y 1 no son primos
    let limite = Math.sqrt(num);      // optimización

    for (let i = 2; i <= limite; i++) {
        if (num % i === 0) {
            return false;             // si es divisible, no es primo
        }
    }
    return true;                       // si no tuvo divisores, es primo
}

function cambiarFondoTecla(i, tecla) {
    if ((i % 2) == 0) {
        //poner fondo azul
        tecla.style.background = "blue";
        tecla.style.color = "white";
    }
    if ((i % 5) == 0) {
        //poner fondo azul
        tecla.style.background = "yellow";

    }
    if ((i % 3) == 0) {
        //poner fondo azul
        tecla.style.background = "red";
        tecla.style.color = "white";
    }
    if ((i % 10) == 0) {
        //poner fondo azul
        tecla.style.background = "orange";

    }
    if (esPrimo(i)) {
        //poner fondo azul
        tecla.style.background = "green";
        tecla.style.color = "white";
    }

    return tecla;
}

crearTeclado();