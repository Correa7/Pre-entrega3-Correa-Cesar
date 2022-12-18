
/*                               INDEX.HTML                              */



const productos = [ 
    {id: 1, nombre: "Remera" ,categoria: "ROPA", precio: 2499.99 ,stock: 10, img: "./img/t-shirt.jpg"  }, 
    {id: 2, nombre: "Pelota Futbol",categoria: "DEPORTE", precio: 4499.99 ,stock: 5, img: "./img/pelota-futbol.jpg"  },
    {id: 3, nombre: "Pelota Tenis" ,categoria: "DEPORTE", precio: 1200 ,stock:4, img: "./img/pelota-tenis.jpg"  },
    {id: 4, nombre: "Zapatilla" ,categoria: "CALZADO", precio: 25499.99 ,stock:10, img: "./img/shoes.jpg"  },
    {id: 5, nombre: "Short" ,categoria: "ROPA", precio: 2999.99 ,stock:5, img: "./img/short.jpg"  },
    {id: 6, nombre: "Raqueta Paddle" ,categoria: "DEPORTE", precio: 10299.99 ,stock: 3, img: "./img/raqueta-paddle.jpg"  }
]



let carritoJSON = ""
let totalFinal = ""
let unidades = ""
let contenedor = document.getElementById("contenedor")
let input = document.getElementById("input")
let boton = document.getElementById("buscador")
let carritoRender = document.getElementById("cart-row")
let carritoRender2 = document.getElementById("cart-row-2")
let total = document.getElementById("total")
let cartNav = document.getElementById("cart-nav")
renderizar(productos)

let carrito = []
if( localStorage.getItem("Carrito")){
    carrito = JSON.parse(localStorage.getItem("Carrito")) 
    renderizarCarro(carrito)
    totalRender(carrito)  
}


/*                       Buscador       Filtros                        */
boton.addEventListener("click", buscar)

function buscar (e) {
    e.preventDefault()
    let productofiltrado = productos.filter (producto => producto.nombre.toLowerCase().includes (input.value.toLowerCase()) || producto.categoria.toLowerCase().includes (input.value.toLowerCase()) )
    renderizar(productofiltrado)
}

/*                           Renderizar productos                  */
function renderizar (array) {
    
    contenedor.innerHTML = ""
    
    for (const producto of array) {
        
        let tarjetaBody = document.createElement("div")
        tarjetaBody.className= "col-lg-4"
        tarjetaBody.innerHTML= `
        <img class="thumbnail" src="${producto.img}">
        <div class="box-element product">
            <h6><strong>${ producto.nombre }</strong></h6><hr>
            <button id ="${producto.id}" class="btn btn-outline-secondary add-btn update-cart">Add to Cart</button>
            <a class="btn btn-outline-success" href="#">View</a>
            <h5 class= "precio" style="float: right;" ><strong>${ producto.precio.toFixed(2)}</strong></h5>
        </div>
        `
        contenedor.append(tarjetaBody)
    }
    let agregarCarrito = document.getElementsByClassName ('btn btn-outline-secondary add-btn update-cart')
    for (boton of agregarCarrito) {
        boton.addEventListener("click", addItem)
    }
}
    
/*                         Agregar Productos al Carrito                   */
function addItem (e) { 

    let productoBuscado = productos.find (producto => producto.id == e.target.id)
    let indexProduct = carrito.findIndex(producto => producto.id == productoBuscado.id)

    if(indexProduct != -1){
        carrito[indexProduct].unidades++
        carrito[indexProduct].subtotal = carrito[indexProduct].precio * carrito[indexProduct].unidades
        carritoJSON = JSON.stringify(carrito)
        localStorage.setItem("Carrito", carritoJSON)
    }
    else{
        carrito.push ({id: productoBuscado.id, nombre: productoBuscado.nombre, categoria: productoBuscado.categoria, precio: productoBuscado.precio, subtotal: productoBuscado.precio, unidades: 1, img: productoBuscado.img})
        
        carritoJSON = JSON.stringify(carrito)
        localStorage.setItem("Carrito", carritoJSON)
    }

    totalFinal= carrito.reduce((a, b ) => a + b.subtotal, 0)
    unidades= carrito.reduce((a, b ) => a + b.unidades, 0)

    renderizarCarro(carrito) 
    // renderizarCartNav(carrito)
    renderizarTotal(carrito)      
}

/*                     Renderizar Carrito                     */

function renderizarCarro(array){
    
    carritoRender.innerHTML = ""
    
    for (let producto of array) {
        
        let cart = document.createElement("div")
        cart.className= "cart-render"
        cart.innerHTML= `
        
        
        <div class="cart-row-2">
        <div  style="flex:2"><img class="row-image" src="${producto.img}"></div>
        <div  style="flex:2"><p>${producto.nombre}</p></div>
        <div  style="flex:1"><p>$${producto.precio.toFixed(2)}</p></div>
        <div style="flex:1">
        <p class="quantity">${producto.unidades}</p>
        <div class="quantity">
        <img id="${producto.id}" class="chg-quantity update-cart add" src="images/arrow-up.png">
      
        
        <img id="${producto.id}" class="chg-quantity update-cart" src="images/arrow-down.png">
        </div>
        </div>
        <div style="flex:1"><p>$${producto.subtotal.toFixed(2)}</p></div>
        </div>
        `
        
        carritoRender.append(cart) 
    }
    // let add = document.getElementsByClassName("chg-quantity update-cart add")
    // for(let a of add) {
    //     a.addEventListener ("click", addItem)
    // }
    
    let remove = document.getElementsByClassName("chg-quantity update-cart")
    for(let b of remove) {
        b.addEventListener ("click", removeItem )
    }  
}

/*               Eliminar Items del Carrito            */
function removeItem (e){
    
    let productoBuscado = productos.find (producto => producto.id == e.target.id)
    let indexProduct = carrito.findIndex(producto => producto.id == productoBuscado.id)
    if (indexProduct != -1) {
        if (carrito[indexProduct].unidades >= 2){
            carrito[indexProduct].unidades--
            carrito[indexProduct].subtotal = carrito[indexProduct].subtotal - carrito[indexProduct].precio 
            carritoJSON = JSON.stringify(carrito)
            localStorage.setItem("Carrito", carritoJSON)
        }
        else {
            carrito.splice(indexProduct, 1)
            carritoJSON = JSON.stringify(carrito)
            localStorage.setItem("Carrito", carritoJSON)
        }
    }
    totalFinal= carrito.reduce((a, b ) => a + b.subtotal, 0)
    unidades= carrito.reduce((a, b ) => a + b.unidades, 0)
    
    renderizarCarro(carrito) 
    renderizarTotal(carrito)	
}
/*                   Renderizar Total de Precio y Unidades del Carrito             */
function totalRender (array){
    totalFinal= carrito.reduce((a, b ) => a + b.subtotal, 0)
    unidades= carrito.reduce((a, b ) => a + b.unidades, 0)
    total.innerHTML=""
    let totalResumen = document.createElement("div")
    totalResumen.className= "total"
    totalResumen.innerHTML = `
    <th><h5>Items: <strong>${unidades}</strong></h5></th>
    <th><h5>Total:<strong> $ ${totalFinal.toFixed(2)}</strong></h5></th>
    <th><a id="clear" style="float:right; margin:5px;" type="button" class="btn btn-success" href="index.html">Pagar</a></th> 
    `
    total.append (totalResumen)

    cartNav.innerHTML=""
    if(array.lenght != 0){
        let parrafo = document.createElement("div")
        parrafo.className = "cart-total"
        parrafo.innerHTML= `<p>${unidades}</p>`    
        cartNav.append (parrafo)   
    }else{
        let parrafo = document.createElement("div")
        parrafo.className = "cart-total"
        parrafo.innerHTML= `<p>0</p>`    
        cartNav.append (parrafo)   
    }
    let clear = document.getElementById("clear")
    clear.addEventListener("click", borrarStorage )
}

function renderizarTotal (array) {
    total.innerHTML=""
    let totalResumen = document.createElement("div")
    totalResumen.className= "total"
    totalResumen.innerHTML = `
    <th><h5>Items: <strong>${unidades}</strong></h5></th>
    <th><h5>Total:<strong> $ ${totalFinal.toFixed(2)}</strong></h5></th>
    <th><a id="clear" style="float:right; margin:5px;" type="button" class="btn btn-success" href="index.html">Pagar</a></th> 
    `
    total.append (totalResumen)
    cartNav.innerHTML=""
    if(array.lenght != 0){
        let parrafo = document.createElement("div")
        parrafo.className = "cart-total"
        parrafo.innerHTML= `<p>${unidades}</p>`    
        cartNav.append (parrafo)   
    }else{
        let parrafo = document.createElement("div")
        parrafo.className = "cart-total"
        parrafo.innerHTML= `<p>0</p>`    
        cartNav.append (parrafo)   
    }
    let clear = document.getElementById("clear")        
    clear.addEventListener("click", borrarStorage )
}

/*       Eliminar Carrito del LocalStorage  */
function borrarStorage(){
    localStorage.removeItem("Carrito")
}

