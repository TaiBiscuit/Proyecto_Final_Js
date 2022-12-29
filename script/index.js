document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    filtrarProductos('all');            //Comienza el filtrado mostrando todo

    if (localStorage.getItem('carro')) {
        carro = obtenerCarro();
        carroActualizado(carro);
        actualizarTotalCarro(carro);
    }
})