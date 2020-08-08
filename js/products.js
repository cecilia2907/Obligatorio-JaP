
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function() {
    traerProductos();
})

//Realizar una petición web a una URL donde se encuentra una 
//colección de productos en formato JSON, 
//con la información básica (precio, nombre, breve descripción) 
//respectiva a cada producto, y mostrar el listado en HTML.

var contenido = document.getElementById("lista-de-productos")

function traerProductos () {
    fetch(PRODUCTS_URL)
        .then(response => response.json())
        .then(productos => {
            //console.log(productos);
            showProductos(productos);
        })
}

function showProductos(productos) {
    console.log(productos);

    contenido.innerHTML = " "

    for(let i of productos) {

    contenido.innerHTML += `
    <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="${productos[0].imgSrc}" alt="${productos[0].description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${productos[0].name}</h4>
                    <small class="text-muted">${productos[0].currency} + ${productos[0].price}</small>
                </div>
                <p class="mb-1">${productos[0].description}</p>
            </div>
        </div>
    </div>
    `
    }
}