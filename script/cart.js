let carro = []

    

// Agregar al carrito

const zonaProductos = document.getElementById('main-product');


zonaProductos.addEventListener('click', (e) =>{
    if(e.target.classList.contains('sumar')){
        validarProducto(e.target.id)
    }
})



//////////////////////////////////////////////////////////////////////////////////////////////

//Validar si el producto esta repetido o no y sumarlo al carrito

const validarProducto = (idDelProducto) =>{
    const productoRepetido = carro.find(producto => producto.id == idDelProducto);

    
    if(!productoRepetido){
        const producto = productos.find(producto => producto.id == idDelProducto);
        producto.cantidad++                                                                         //Asi la cantidad empieza en 1
        carro.push(producto); 
        modificarElCarro(producto);
        actualizarTotalCarro(carro);

    } else {
        productoRepetido.cantidad++
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`)
        cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`;
        actualizarTotalCarro(carro);
    }    
}



//////////////////////////////////////////////////////////////////////////////////////////////

//Cambiamos el carrito 

const modificarElCarro = (producto) =>{
    const contenedorDelCarro = document.getElementById('carrito-cont');
    const div = document.createElement('div');
    div.classList.add('productoDelCarro');

    //Resto del template de los items del carrito

    div.innerHTML +=
    `
    <p>${producto.nombre}</p>
    <p>Precio: $${producto.precio}</p>
    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad} </p>
    <button class="del-btn eliminar" value="${producto.id}">X</button>

    `

    contenedorDelCarro.appendChild(div);
};



//////////////////////////////////////////////////////////////////////////////////////////////

//Actualizamos el total del carrito y el precio total

const burbuja = document.getElementById('notify-bubble');
const modeloDeCarro = document.getElementById('cart-model');

const actualizarTotalCarro = (carro) =>{
    const cantidadTotal = carro.reduce((acc, item) => acc + item.cantidad, 0);
    const compraTotal = carro.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    mostrarTotalCarro(cantidadTotal, compraTotal);  
    guardarCarroStorage(carro);  

}



// Mostramos la burbuja con el total del carrito y modificamos el precio total

const mostrarTotalCarro = (cantidadTotal, compraTotal) => {
    const burbujaBtn = document.getElementById('cart-btn');
    const precioTotal = document.getElementById('precioTotal');


    burbuja.style.display = 'block'
    burbuja.innerText = cantidadTotal;
    precioTotal.innerText = compraTotal;

    if(burbuja.innerText == 0){
        burbuja.style.display ='none'
    }

    burbujaBtn.addEventListener('click', () => {
        modeloDeCarro.style.display = 'block';                                                      //Cambia display del contenedor del carrito de 'none' a 'block'
    })
}



//////////////////////////////////////////////////////////////////////////////////////////////

// Eliminar productos del carrito

modeloDeCarro.addEventListener('click', (e) => {
    e.stopPropagation
    if(e.target.classList.contains('eliminar')){
        eliminarProducto(e.target.value);
    }

})

const eliminarProducto = (productoId) => {
    const productoIndex = carro.findIndex(producto => producto.id == productoId);               //Conseguimos la posicion de el producto a eliminar en el array
    carro.splice(productoIndex, 1); 
    carroActualizado(carro);
    actualizarTotalCarro(carro);

}




//////////////////////////////////////////////////////////////////////////////////////////////

// Actualizamos el carrito en el DOM

const carroActualizado = (carro) => {

    const contenedorDelCarro = document.getElementById('carrito-cont');
    contenedorDelCarro.innerHTML = '';

    carro.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productoDelCarro');    
        div.innerHTML +=
        `
        <p>${producto.nombre}</p>
        <p>Precio: $${producto.precio}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad} </p>
        <button class="del-btn eliminar" value="${producto.id}">X</button>
    
        `
        contenedorDelCarro.appendChild(div);
    });
} 



//////////////////////////////////////////////////////////////////////////////////////////////

// Cerrar el carrito

const btnCerrarCarrito = document.getElementById('btn-close-cart');

btnCerrarCarrito.addEventListener('click', (e) =>{
    e.stopPropagation;
    modeloDeCarro.style.display = 'none';
})



//////////////////////////////////////////////////////////////////////////////////////////////

// Guardar carrito

const guardarCarroStorage = (carro) =>{
    localStorage.setItem('carro', JSON.stringify(carro));
};

// Recuperar el carrito

const obtenerCarro = () =>{
    const carroStorage = JSON.parse(localStorage.getItem('carro'));
    return carroStorage;
};


