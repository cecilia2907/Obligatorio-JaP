const CART = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

let CartArticles = [];
let subTotalArticulo =0;
let subtotal = 0;
let total = 0;
let envio = 0;

let input = document.getElementsByClassName("articleCount");


let mostrarSubtotal = document.getElementsByClassName("subtotalArticulo");


/* Función que muestra el carrito. Esto incluye: los artículos traídos del json, los subtotales por artículo, el subtotal y total de la compra */

function showCart(array) {
    
    let htmlContentToAppend = "";

    for(let i=0; i<array.length; i++){
    
        htmlContentToAppend += `

        <tr>
            <td>
                <img class="img" src="${CartArticles[i].src}" width="100px">
            </td>
            <td>${CartArticles[i].name}</td>
            <td class="unitCost">${CartArticles[i].currency} ${CartArticles[i].unitCost}</td>
            <td><input class="form-control articleCount" style="width:60px;" type="number" value=${CartArticles[i].count} min="1"></td>
            <td>UYU <span class="subtotalArticulo">${calcularSubtotal(CartArticles[i].count, i)}</span></td>
            
        </tr>`

    }    
    

    //Se muestran los artículos con sus datos
    document.getElementById("mostrarArticulosAca").innerHTML = htmlContentToAppend;
    
    actualizarSubtotalArticulo();
    subtotalCompra();
    totalCompra();
}

/* Función que calcula el subtotal por artículo y lo expresa en pesos, según: cantidad de artículos y precio unitario */
function calcularSubtotal (cantidad, indice) {

    if (CartArticles[indice].currency === "UYU") {
        subTotalArticulo = cantidad * CartArticles[indice].unitCost
    }

    if (CartArticles[indice].currency === "USD") {
        subTotalArticulo = cantidad * CartArticles[indice].unitCost * 40;
    }
    return subTotalArticulo;
}

/* Función que actualiza los subtotales por artículo, el subtotal de compra y el total, al aumentar o disminuir la cantidad por artículo */

function actualizarSubtotalArticulo() {

    for (let i=0; i<CartArticles.length; i++) {

        input[i].addEventListener("change", function(){

            mostrarSubtotal[i].innerHTML = calcularSubtotal(input[i].value, i);
            
            subtotalCompra();
            
            totalCompra();
        })
    }
};

/*Función que suma los subtotales por artículo y actualiza la variable "subtotal"*/ 
function subtotalCompra() {

    subtotal=0;

    for(let i=0; i<CartArticles.length; i++) {
        
        subtotal += calcularSubtotal(input[i].value, i);
        //console.log(subtotal);
    }

    document.getElementById("subtotal").innerHTML = "UYU"+ " " + subtotal;
}



/* Sin terminar - Función que calcular el costo de envío

let inputEnvio = document.getElementsByClassName("blabla");

function costoEnvio() {

    console.log(envio);

    for(let i=0; i<3; i++) {

        inputEnvio[i].addEventListener("click", function() {

            if(inputEnvio[i].value === "1") {
                envio = subtotal*0.15;
                
            }
            if(inputEnvio[i].value === "2") {
                envio = subtotal*0.07;
            }
            if(inputEnvio[i].value === "3") {
                envio = subtotal*0.05;
            }

            document.getElementById("costoDeEnvio").innerHTML = "UYU" + " " + envio;
        })
    }
}*/

/* Función que calcula el total de la compra, teniendo en cuenta el subtotal de la compra y el costo de envío, y actualiza la variable "total" */
function totalCompra() {

    total = envio + subtotal;

    document.getElementById("costoDeEnvio").innerHTML = "UYU" + " " + envio;

    document.getElementById("total").innerHTML = "UYU"+ " " + total;
}

/*Función que se ejecuta una vez que se haya lanzado el evento de que el documento se encuentra cargado, es decir, se encuentran todos los elementos HTML presentes.*/
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART).then(function(resultObj){
        if (resultObj.status === "ok"){
                
            CartArticles = resultObj.data.articles;

            showCart(CartArticles);
               
        }
    })
});