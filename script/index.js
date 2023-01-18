document.addEventListener('DOMContentLoaded', () => {
    conseguirData();
    filtrarProductos('all');            //Comienza el filtrado mostrando todo

    if (localStorage.getItem('carro')) {
        carro = obtenerCarro();
        carroActualizado(carro);
        actualizarTotalCarro(carro);
    }
})