//Variables
const carrito = document.querySelector('#carrito');
const listaPizzas = document.querySelector('#lista-pizzas');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    listaPizzas.addEventListener('click',agregarPizza);

    //elimina pizzas de carrito
    carrito.addEventListener('click', eliminarPizza);

    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    //vacio de carrito
    vaciarCarritoBtn.addEventListener('click',() => {
        articulosCarrito = [];//reseteo el arreglo
        limpiarHTML(); //eliminamos todo el html
    })
}

//Funciones
function agregarPizza(e) {
    e.preventDefault();

    if( e.target.classList.contains('btn-primary')) {
        const pizzaSeleccionada = e.target.parentElement.parentElement;
        leerDatosPizza(pizzaSeleccionada);
    }
}

//elimina pizzas de carrito
function eliminarPizza(e){
    if(e.target.classList.contains('borrar-curso')){
        const pizzaId = e.target.getAttribute('data-id');

        //eliminar el articulo del carrito mediante el dataID
        articulosCarrito = articulosCarrito.filter (pizza => pizza.id !== pizzaId);

        carritoHTML(); //iterar sobre el carrito y muestro el HTML
    }
}


//lee el contenido de la card seleccionada del HTML al que le dimos click y extrae la informacion necesaria
function leerDatosPizza(pizza) {
    // console.log(pizza);

// crear un objeto con el contenido del curso actual
const infoPizza = {
    titulo: pizza.querySelector('h5').textContent,
    precio: pizza.querySelector('h4').textContent,
    id: pizza.querySelector('a').getAttribute('data-id'),
    cantidad: 1,

}

//reviso si un elemento ya existe en el carrito
const existe = articulosCarrito.some ( pizza => pizza.id === infoPizza.id);
if (existe){
    //actualizamos la cantidad
    const pizza = articulosCarrito.map ( pizza => {
        if(pizza.id === infoPizza.id){
            pizza.cantidad ++;
            return pizza;
        }else{
            return pizza;
        }
    });
    articulosCarrito = [...pizza];
}else{
  //agregamos elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito,infoPizza];
}
//agregando elementos al articulo de carrito






console.log(articulosCarrito);

carritoHTML();

}

//Muestra el carrito de compras en el carrito HTML

function carritoHTML(){

    //aca limpiamos el HTML
    limpiarHTML();

    //aca generamos el html nuevo en el carrito
    articulosCarrito.forEach( pizza => {
        const row = document.createElement('tr');
        row.innerHTML =  `
        <td>
        ${pizza.titulo}
        </td> 
        <td>
        ${pizza.precio}
        </td> 
        <td>
        ${pizza.cantidad}
        </td> 
        <td>
            <a href="#" class="borrar-curso" data-id="${pizza.id}"> X </a>
        </td> 
        `;
        
        //agregar info al tbody
        contenedorCarrito.appendChild(row);
            

    })

    sincronizarStorage();

}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

