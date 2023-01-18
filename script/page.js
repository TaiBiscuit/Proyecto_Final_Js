// Conseguir la data

const conseguirData = async () =>{
    const data = await stockController() 
    mostrarProductos(data)
}



// Catálogo en HTML

const mostrarProductos = (data) => {
    const contenedor = document.getElementById('catalogue-container');
    
    contenedor.innerHTML = '';                                              // Para que al ordenar por valor no se repita

    data.forEach(producto => {
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



// Orden segun la etiqueta Select 

    const sortSel = document.getElementById('sorting');
    let sortTexto = 'Auto';

    sortSel.addEventListener('change', function() {
        sortTexto = sortSel.options[sortSel.selectedIndex].text;

        cambiarSort(data, sortTexto)

        
    })
}



//////////////////////////////////////////////////////////////////////////////////////////////

// Filtrado por precio

function cambiarSort (data, sortTexto){

    let dataSort = []

    switch(sortTexto){
        case 'Cheapest':
            dataSort = data.sort((a, b) => a.precio - b.precio)
            mostrarProductos(dataSort)
        break;
        case 'Expensive':
            dataSort = data.sort((a, b) => b.precio - a.precio)
            mostrarProductos(dataSort)
        break;
        case 'Auto':
            dataSort = data.sort((a, b) => a.id - b.id)
            mostrarProductos(dataSort)
        break;
    }
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


const vaciarFormulario = () =>{
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





