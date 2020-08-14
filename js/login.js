//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//document.addEventListener("DOMContentLoaded", function(e){
    
//});

// Funcioón que se ejecuta una vez que se hace click en el botón
document.getElementById("boton").addEventListener("click", function() {
    validar();
});

// Funcioón que valida si se ingresoó usuario y contraseña
function validar() {
    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contrasena").value;

    if (usuario == null || usuario == "") {
        alert("Introduzca su Correo Electrónico");
        return false;
    }
    if (contrasena == null || contrasena == "") {
        alert("Introduzca su contraseña");
        return false;
    }
    else {  
        alert("Ingreso Correcto")
        redirigir();
    }
}

// Función que direcciona a la homepage 
function redirigir() {
    window.location.href = "index.html";
}

