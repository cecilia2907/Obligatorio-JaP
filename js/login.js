//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//document.addEventListener("DOMContentLoaded", function(e){
    
//});

// Función que se ejecuta una vez que se hace click en el botón
document.getElementById("boton").addEventListener("click", function() {
    validar();
});

let usuario = document.getElementById("usuario");
let contrasena = document.getElementById("contrasena");

// Función que valida si se ingresó usuario y contraseña al hacer click en el botón
function validar() {

    if (!usuario.value) { //== null || usuario.value == "") {
        alert("Introduzca su Usuario");
        return false;
    }
    if (!contrasena.value) { //== null || contrasena.value == "") {
        alert("Introduzca su contraseña");
        return false;
    }
    else {  
        alert("Ingreso Correcto");
        guardar(usuario.value);
        redirigir();
    }
}

//Función que guarda el nombre de usuario
function guardar(user) {  
    localStorage.setItem("Usuario", user);
}

// Función que direcciona a la homepage luego de haber validado y guardado usuario
function redirigir() {
    window.location.href = "home.html";
}

