//constructor para los productos

class producto {
    constructor (id, categoria, img, nombre, color, precio) {
    this.id = id;
    this.categoria = categoria;
    this.img = img;
    this.nombre = nombre;
    this.color = color;
    this.precio = precio; 
    
    }
}

//array productos para aromas
const productos = [
    new producto(1, 'aromas', 'imgs/aromas/aroma1.jpg', 'Difusor tapa madera', 'madera', 1200),
    new producto(2, 'aromas', 'imgs/aromas/aroma2.jpg' , 'Dispenser para jabon', 'clear', 800),
    new producto(3, 'aromas', 'imgs/aromas/aroma3.jpg', 'Perfumina Tilo', 'vino', 600),
    new producto(4, 'aromas', 'imgs/aromas/aroma4.jpg' ,'Vela aromatica', 'Blanco', 300),
    new producto(5, 'aromas', 'imgs/aromas/aroma5.jpg' ,'Repuesto Difusor', 'Surtido', 600),
    new producto(6, 'aromas', 'imgs/aromas/aroma6.jpg' ,'Difusor Vidrio', 'Clear', 500),
    new producto(7,  'aromas','imgs/aromas/aroma7.jpg' ,'Frasco con Vela', 'Blanco', 300),
    new producto(8, 'aromas', 'imgs/deco/deco1.jpg', 'Envase Cookies', 'Estampado', 600),
    new producto(9, 'deco','imgs/deco/deco2.jpg', 'Portacubiertos Marmol', 'Marmol', 550),
    new producto(10, 'deco', 'imgs/deco/deco3.jpg', 'Bandeja Marmol', 'Marmol', 880),
    new producto(11, 'deco', 'imgs/deco/deco4.jpg', 'Mate Simil Cuero', 'Beige', 600),
    new producto(12, 'deco', 'imgs/deco/deco5.jpg', 'Portarretratos Metal', 'Plata', 700),
    new producto(13, 'deco', 'imgs/deco/deco6.jpg', 'Portarretratos Madera', 'Madera', 500),
    new producto(14, 'deco', 'imgs/deco/deco7.jpg', 'Caja de Te ISABEL', 'Blanco', 900),
    new producto(15, 'deco', 'imgs/deco/deco8.jpg', 'Mantel Rosario', 'Manteca', 600),
    new producto(16, 'deco', 'imgs/deco/deco9.jpg', 'Fanal Luciernaga', 'Dorado', 500),
    new producto(17, 'deco', 'imgs/deco/deco10.jpg', 'Combo baño', 'Vison', 1100),
    new producto(18, 'espejos', 'imgs/espejos/espejo1.jpg', 'Espejo Flor', 'Beige', 1800),
    new producto(19, 'espejos', 'imgs/espejos/espejo2.jpg', 'Espejo Metal', 'Plata', 1900),
    new producto(20, 'espejos', 'imgs/espejos/espejo3.jpg', 'Espejo Alaska', 'Blanco', 2500),
    new producto(21, 'espejos', 'imgs/espejos/espejo4.jpg', 'Espejo Mimbre', 'Beige', 1900),
    new producto(22, 'espejos', 'imgs/espejos/espejo5.jpg', 'Espejo Carla', 'Bronce', 1300),
    new producto(23, 'sale', 'imgs/sale/sale1.jpg', 'Reloj Grand Hotel', 'Madera', 500),
    new producto(24, 'sale', 'imgs/sale/sale2.jpg', 'Cesto Uganda', 'Mimbre', 700),
    new producto(25, 'sale', 'imgs/sale/sale3.jpg', 'Pie de Maceta Hierro', 'Negro', 900),
    new producto(26, 'sale', 'imgs/sale/sale4.jpg', 'Fanal Metalico', 'Plata', 600),
    new producto(27, 'sale', 'imgs/sale/sale5.jpg', 'Combo maceta + fanal', 'Rose Gold', 800),
]

// creo las imagenes
const contenedor = document.getElementById("contenedorAromas");


const mostrarProductos = (array) => {

    contenedor.innerHTML = ''

            array.forEach( (producto) => {
                const div = document.createElement('div');
                div.className = "card"
                div.style = "width: 15rem"

                div.innerHTML = `
                                <img src=${producto.img} class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title"> ${producto.nombre} </h5>
                                    <p class="card-text"> Precio: $ ${producto.precio} </p>
                                    
                                </div>
                                
                                `
                const comprar = document.createElement('button');
                comprar.classList.add('btn', 'btn-primary');
                comprar.textContent = 'Comprar';
                comprar.setAttribute('marcador', producto.id);
                comprar.addEventListener('click', addToCart);
                div.appendChild(comprar);
                contenedor.appendChild(div);
            });
}


mostrarProductos(productos);


let carrito = [];
let total = 0;
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const localStorage = window.localStorage;


//funcion agregar al carrito
function addToCart(agregar) {
    carrito.push(agregar.target.getAttribute('marcador'))

    calcularTotal();
    renderizarCarrito();
    guardarEnLocalStorage();

}

// funcion para armar el carrito
const renderizarCarrito = () => {
    
    DOMcarrito.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {
        const miItem = productos.filter((itemAromas) => {
            return itemAromas.id === parseInt(item);
        });
    
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        
        const cartItem = document.createElement('li');
        cartItem.classList.add('list-group-item', 'cartList');
        cartItem.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - $${miItem[0].precio}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-close', 'mx-5');
        deleteBtn.dataset.item = item;
        deleteBtn.addEventListener('click', deleteItemCarrito);
        
        cartItem.appendChild(deleteBtn);
        DOMcarrito.appendChild(cartItem);
    });
}

// funcion para borrar item del carrito
const deleteItemCarrito = (evento) => {
    
    const id = evento.target.dataset.item;
    
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    
    renderizarCarrito();
    calcularTotal();
    guardarEnLocalStorage();
}


// calcular precio total
const calcularTotal = () => {
    total = 0;
    
    carrito.forEach((item) => {
        
        const miItem = productos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        total = total + miItem[0].precio;
    });
    
    DOMtotal.textContent = total.toFixed(2);
}

const guardarEnLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoLocalStorage() {
    if (localStorage.getItem('carrito') !== null) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
    }
}

cargarCarritoLocalStorage();

window.onload = renderizarCarrito();
window.onload = calcularTotal();

/////////////// filtrar por categoria ////////


const filtroAromas = productos.filter(function(element){
    return element.categoria == 'aromas';
  });

const filtroDeco = productos.filter(function(element){
    return element.categoria == 'deco';
  });

const filtroEspejos = productos.filter(function(element){
    return element.categoria == 'espejos';
  });

const filtroSale = productos.filter(function(element){
    return element.categoria == 'sale';
  });






