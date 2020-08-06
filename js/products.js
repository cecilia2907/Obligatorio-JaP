//Realizar una petición web a una URL donde se encuentra una 
//colección de productos en formato JSON, 
//con la información básica (precio, nombre, breve descripción) 
//respectiva a cada producto.

function LoadJSONProductos () {
    const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
    fetch(PRODUCTS_URL)
        .then(response => response.json())
        .then(json => Productos(json))
        .catch(err => {
            alert(err)
        })
}

LoadJSONProductos();


function Productos(data) {

    for (var i=0; i<data.lenght; i++) {
        
        productos += '<div class="producos">' + data.name + data.description + data.cost;
    }

    document.getElementsByClassName("container p-5").innerHTML = `${productos}`;
};



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    LoadJSONProductos ();
});