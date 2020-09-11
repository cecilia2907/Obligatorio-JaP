var product = {};

//Función que muestra las imágenes dentro del subtítulos imágenes
function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que muestra los productos relacionados del array Productos de acuerdo al array del product-info

function showRelatedProducts(array1, array2) {

    let relatedProducts = document.getElementById("relatedProductContainer");
    let htmlContentToAppend = "";
        
    for (let relacionado of array1) {
        
        //console.log(array);
        //console.log(relacionado);
        //console.log(productList);

        htmlContentToAppend += `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="` + array2[relacionado].imgSrc +` " alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title"> ` + array2[relacionado].name +`</h5>
                <p class="card-text">`+ array2[relacionado].description+`</p>
                <a href="product-info.html" class="btn btn-primary">Ver producto</a>
            </div>
        </div>
        `
        relatedProducts.innerHTML = htmlContentToAppend;
    }
};

//Función que muestra los comentarios

function showComments(array) {
    
    let htmlContentToAppend = "";

    for(let i=0; i<array.length; i++) {

        let comentario = array[i];

        let pintadas = `<span class="fa fa-star checked"></span>`.repeat(comentario.score);
        let nopintadas = `<span class="fa fa-star"></span>`.repeat(5-comentario.score);

        htmlContentToAppend += `
        <div>
             <div class="d-flex flex-row comment-row m-t-0">
                <div class="comment-text w-100">
                    <h6 class="font-weight-bold">${comentario.user}</h6> 
                    <div class="rating">${pintadas}${nopintadas}</div>
                    <span class="m-b-15 d-block">${comentario.description}</span>
                <div class="comment-footer"> 
                    <span class="text-muted float-right">${comentario.dateTime}</span> 
                </div>
            </div>
        </div>
        <br>
        `
        document.getElementById("listaDeComentarios").innerHTML = htmlContentToAppend;
    }
}

//Función que agrega un nuevo comentario

function newComment () {

    let inputComment = document.getElementById("inputComment").value;
    //console.log(inputComment);
    
    let usuarioComment = localStorage.getItem("Usuario");
    //console.log(usuarioComment);

    let inputScore = document.getElementById("inputScore").value;
    //console.log(inputScore);

    let pintadas = `<span class="fa fa-star checked"></span>`.repeat(inputScore);
    let nopintadas = `<span class="fa fa-star"></span>`.repeat(5 - inputScore);

    let fechaLargaComment = new Date();
    let fecha = fechaLargaComment.getFullYear()+ `-` +(fechaLargaComment.getMonth() + 1)+ `-` +(fechaLargaComment.getDay() + 1);
    let hora = fechaLargaComment.getHours()+`:`+fechaLargaComment.getMinutes()+`:`+fechaLargaComment.getSeconds();
    //console.log(fechaLargaComment);
    
    htmlContentToAppend = "";

    htmlContentToAppend = `
    <div>
         <div class="d-flex flex-row comment-row m-t-0">
            <div class="comment-text w-100">
                <h6 class="font-weight-bold">${usuarioComment}</h6> 
                <div class="rating">${pintadas}${nopintadas}</div>
                <span class="m-b-15 d-block">${inputComment}</span>
            <div class="comment-footer"> 
                <span class="text-muted float-right">${fecha} ${hora}</span> 
            </div>
        </div>
    </div>
    <br>
    `

    document.getElementById("listaDeComentarios").innerHTML += htmlContentToAppend;
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostHTML = document.getElementById("productCost");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = '<a href="category-info.html">' + product.category + '</a>';
            productCostHTML.innerHTML = product.currency +` `+ product.cost;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);

            //Muestro los productos relacionados
            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok") {
                    productList = resultObj.data;

                    showRelatedProducts(product.relatedProducts, productList); 
                }
            })

            //Muestro los comentarios
            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
                if (resultObj.status === "ok") {
                    comentario = resultObj.data;
                    
                    showComments(comentario);  
                                   
                }
            });

            //Muestro el nuevo comentario al submit el formulario
            document.getElementById("newComment").addEventListener("submit", function(event) {
                event.preventDefault();
                newComment();
            });
            
        }
    
    })
   
});



