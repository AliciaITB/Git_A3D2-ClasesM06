//Declaración de variables
let intentos;
let num;

//Obtener un número random
function piensaRandom() {
    num = parseInt(Math.random() * 100);
    console.log("El número es: " + num);
    intentos = 0;
    document.getElementById("mensajeUser").innerHTML="";
}

// Compara si el número del user es mayor, menor o igual.
function comprueba() {
    let numUser = parseInt(document.getElementById("numUser").value);
    let msg = "";
    //console.log(numUser)
    if (numUser < num) {
        msg = "El número es más grande";
    } else {
        if (numUser > num) {
            msg = "El número es más pequeño";
        } else {
            msg = "Has acertado el número: " + num + " en " + intentos + " intentos.";
        }
    }
    intentos++;
    //console.log(msg);
    document.getElementById("mensajeUser").innerHTML=msg;
}