


// Catálogo en HTML

const mostrarProductos = () => {
    const contenedor = document.getElementById('catalogue-container');

    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('card');                                                 
        div.classList.add(`${producto.tipo}`);
        

        //Resto del template
        
        div.innerHTML +=
        `<div class="card-image" data-product="${producto.tipo}">
        <span class="card-title">${producto.nombre}</span>
        <img src="${producto.img}">
        <p>$${producto.precio}</p>
        <button class="add-btn sumar" id=${producto.id}>Add to the cart!</button>
        </div>`


    contenedor.appendChild(div)
    })
}



//////////////////////////////////////////////////////////////////////////////////////////////

// Formulario de la sección 'contact'

const formulario = document.getElementById('form');
const nombreFormulario = document.getElementById('name');
const emailFormulario = document.getElementById('email');
const comentarioFormulario = document.getElementById('comments');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    vaciarFormulario()
})

vaciarFormulario = () =>{
    nombreFormulario.value = '';
    emailFormulario.value = '';
    comentarioFormulario.value = '';
}



//////////////////////////////////////////////////////////////////////////////////////////////

//Filtrado de stock

const zonaBusqueda = document.getElementById('search');
const botonData = document.querySelectorAll('search-btn');

zonaBusqueda.addEventListener('click', (e) =>{                             
    e.preventDefault();

    const filtro = e.target.dataset.filter;                     //Conseguimos la data sobre que boton se presiono
    filtrarProductos(filtro);
})




function filtrarProductos(filtro){
    let nombreProducto = document.getElementsByClassName('card');

    for(let i=0; i< nombreProducto.length; i++){
        removeClass(nombreProducto[i], 'hide');
        if (nombreProducto[i].className.indexOf(filtro) > -1){
            addClass(nombreProducto[i], 'hide');
        } 
    }
}


//Se le adiere la etiqueta hide a los que no sean el filtro

function addClass(nombreProducto, clase){
    let arr1 = nombreProducto.className.split(' ');
    let arr2 = clase.split(' ');
    for(let i = 0; i< arr2.length; i++){
        if(arr1.indexOf(arr2[i]) == -1) {
            nombreProducto.className += ' ' + arr2[i];
        }
    }
}

//Se le quita la etiqueta hide a los que no sean el filtro

function removeClass(nombreProducto, clase){
    let arr1 = nombreProducto.className.split(' ');
    let arr2 = clase.split(' ');
    for(let i = 0; i< arr2.length; i++){
        while(arr1.indexOf(arr2[i]) > -1){
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    nombreProducto.className = arr1.join(' ');
}


//////////////////////////////////////////////////////////////////////////////////////////////





