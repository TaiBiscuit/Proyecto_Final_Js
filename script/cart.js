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
    <img class="mini" src="${producto.front}">
    <p>${producto.nombre}</p>
    <p>Price: $${producto.precio}</p>
    <p id=cantidad${producto.id}>Amount: ${producto.cantidad} </p>
    <button class="del-btn eliminar" value="${producto.id}">X</button>

    `

    contenedorDelCarro.appendChild(div);

    //Notificacion de item agregado al carrito

    Toastify({
        text: 'The item has been added to the cart',
        duration: 1500,
        position: 'right',
       gravity: 'bottom',
        style:{
            background: '#36aa63'
        }
    }).showToast();
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
    const filtroAzulCheck = document.getElementById('blueF');
    
    let filtroPrecio = 0

    filtroAzulCheck.addEventListener('change', () =>{

        if(filtroAzulCheck.checked){
            filtroPrecio = 200

        } else {
            filtroPrecio = 0
        }

        ticketFinal(cantidadTotal, compraTotal, filtroPrecio);
    })


    burbuja.style.display = 'block'
    burbuja.innerText = cantidadTotal;
    precioTotal.innerText = compraTotal;

    if(burbuja.innerText == 0){
        burbuja.style.display ='none'
    }

    burbujaBtn.addEventListener('click', () => {
        modeloDeCarro.style.display = 'block';                                                      //Cambia display del contenedor del carrito de 'none' a 'block'
    })

    ticketFinal(cantidadTotal, compraTotal, filtroPrecio);                                                       
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
    carro[productoIndex].cantidad = 0
    carro.splice(productoIndex, 1);



//Notificacion de eliminado del carrito

Toastify({
    text: 'The item has been removed to the cart',
    duration: 1500,
    position: 'right',
    gravity: 'bottom',
    style:{
        background: '#af3737'
        }
}).showToast();

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
        <img class="mini" src="${producto.front}">
        <p>${producto.nombre}</p>
        <p>Price: $${producto.precio}</p>
        <p id=cantidad${producto.id}>Amount: ${producto.cantidad} </p>

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


// Guardar carrito

const guardarCarroStorage = (carro) =>{
    localStorage.setItem('carro', JSON.stringify(carro));
};


// Recuperar el carrito

const obtenerCarro = () =>{
    const carroStorage = JSON.parse(localStorage.getItem('carro'));
    return carroStorage;
};



//////////////////////////////////////////////////////////////////////////////////////////////

// Contenidos pasados al Ticket Final

const ticketFinal = (cantidadTotal, compraTotal, filtroPrecio) => {
    const ticketFinalCaja = document.getElementById('ticket-container');
    ticketFinalCaja.innerHTML  = '';
    const totalConTodo = compraTotal + filtroPrecio;

    const div = document.createElement('div');
        div.classList.add('item-on-ticket');    

        div.innerHTML +=
        `
        <div class="ticket-names">
        <p>Amount of Items:</p>
        <p>Item's Price:</p>
        <p>Filter's Price:</p>
        <br>
        <p>Total:</p>
        </div>

        <div class="ticket-prices">
        <p>- ${cantidadTotal}</p>
        <p>$ ${compraTotal}</p>
        <p>$ ${filtroPrecio}</p>
        <br>
        <p>$ ${totalConTodo}</p>
        </div>
        `
        ticketFinalCaja.appendChild(div);
}




// Activar la pantalla de ticket

const btnIrTicket = document.getElementById('btn-go-ticket');
const contenedorDeTicket  = document.getElementById('final-ticket');

btnIrTicket.addEventListener('click', (e) =>{
    e.stopPropagation;
    contenedorDeTicket.style.display = 'block';
    modeloDeCarro.style.display = 'none';
})



// Comprar vacia el carrito

const btnComprar = document.getElementById('btn-buy');

btnComprar.addEventListener('click', (e) =>{
    e.stopPropagation;
    if(carro.length === 0){
        Toastify({
            text: "Please select something to buy",
            className: "info",
            position: 'center',
            duration: 2000,
            style: {
              background: '#af3737',
            }
          }).showToast();
    } else if(carro.length != 0){
        carro.length = 0;
        actualizarTotalCarro(carro);
        carroActualizado(carro);
        Toastify({
            text: "Thank you for your buy",
            className: "info",
            position: 'center',
            duration: 2000,
            style: {
              background: '#36aa63',
            }
          }).showToast();
    }

})





//////////////////////////////////////////////////////////////////////////////////////////////

// Cerrar el carrito

const btnCerrarTicket = document.getElementById('btn-close-ticket');

btnCerrarTicket.addEventListener('click', (e) =>{
    e.stopPropagation;
    contenedorDeTicket.style.display = 'none';
})