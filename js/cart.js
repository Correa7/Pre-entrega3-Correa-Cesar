
const productos = [ 
    {id: 01, nombre: "La Remera de DIOS" ,categoria: "ROPA", precio: 99999.99 ,stock: 1, img: "./img/rem-6.jpg"  },
    {id: 18, nombre: "Remera Optimus-Boxeo" ,categoria: "ROPA", precio: 2650 ,stock: 10, img: "./img/rem-5.webp"  }, 
    {id: 02, nombre: "Remera Optimus-Grey" ,categoria: "ROPA", precio: 2499.99 ,stock: 10, img: "./img/rem-1.webp"  },
    {id: 03, nombre: "Remera Diablus-Black" ,categoria: "ROPA", precio: 2299.99 ,stock: 10, img: "./img/rem-2.jpg"  },
    {id: 04, nombre: "Remera Diablus-White" ,categoria: "ROPA", precio: 2299.99 ,stock: 10, img: "./img/rem-4.webp"  },
    {id: 05, nombre: "Remera Diablus-Grey" ,categoria: "ROPA", precio: 2299.99 ,stock: 10, img: "./img/rem-3.webp"  },
    {id: 06, nombre: "Adidas Super Star W-Lisa" ,categoria: "CALZADO", precio: 28499.99 ,stock:10, img: "./img/zap-5.jpg"  },
    {id: 07, nombre: "Adidas Super Star W-Colors" ,categoria: "CALZADO", precio: 32499.99 ,stock:10, img: "./img/zap-1.jpg"  },
    {id: 08, nombre: "Adidas Super Star B-Colors " ,categoria: "CALZADO", precio: 32499.99 ,stock:10, img: "./img/zap-2.jpg"  },
    {id: 09, nombre: "Adidas Super Star Black " ,categoria: "CALZADO", precio: 32499.99 ,stock:10, img: "./img/zap-3.jpg"  },
    {id: 10, nombre: "Adidas Super Star Pink " ,categoria: "CALZADO", precio: 30499.99 ,stock:10, img: "./img/zap-4.jpg"  },
    {id: 11, nombre: "Guantes Everlast Box-White " ,categoria: "DEPORTE", precio: 10299.99 ,stock: 3, img: "./img/dep.webp"  },
    {id: 12, nombre: "Guantes Everlast Box-Black" ,categoria: "DEPORTE", precio: 10299.99 ,stock: 3, img: "./img/dep-1.jpg"  },
    {id: 13, nombre: "Pack Everlast Box" ,categoria: "DEPORTE", precio: 30499.99 ,stock: 3, img: "./img/dep-3.webp"  },
    {id: 14, nombre: "Vendas Everlast" ,categoria: "DEPORTE", precio: 1200 ,stock:4, img: "./img/dep-2.webp"  },
    {id: 15, nombre: "Colchoneta Everlast",categoria: "DEPORTE", precio: 2500 ,stock: 5, img: "./img/dep-5.webp"  },
    {id: 16, nombre: "Pack Bandas" ,categoria: "DEPORTE", precio: 5000 ,stock: 3, img: "./img/dep-6.jpg"  },
    {id: 17, nombre: "Pack Pesas" ,categoria: "DEPORTE", precio: 15299.99 ,stock: 3, img: "./img/dep-4.jpg"  }
]
let carritoJSON = ""
let totalCartFinal = ""
let unidadesCart = ""

let carritoRender2 = document.getElementById("cart-render")
let totalCart = document.getElementById("cartTotal")
let navCart = document.getElementById("cart-nav")


let carrito = []
if( localStorage.getItem("Carrito")){
    carrito = JSON.parse(localStorage.getItem("Carrito")) 
    renderizarCarro(carrito)
    totalRender(carrito)  
}else {
    totalRenderVacio(carrito)
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
    totalRender(carrito)      
}
/*                     Renderizar Carrito                     */
function renderizarCarro(array){
    carritoRender2.innerHTML = ""
    for (let producto of array) {
        let cart = document.createElement("div")
        cart.className= "cart-render-2"
        cart.innerHTML= `
        <div class="cart-row">
        <div  style="flex:2"><img class="row-image" src="${producto.img}"></div>
        <div  style="flex:2"><p>${producto.nombre}</p></div>
        <div  style="flex:1"><p>$${producto.precio.toFixed(2)}</p></div>
        <div style="flex:1">
        <p class="quantity">${producto.unidades}</p>
        <div class="quantity">
        <img id="${producto.id}" class="chg-quantity update-cart " src="images/arrow-up.png">
        <img id="${producto.id}" class="chg-quantity-2 update-cart" src="images/arrow-down.png">
        </div>
        </div>
        <div style="flex:1"><p>$${producto.subtotal.toFixed(2)}</p></div>
        </div>
        `
        carritoRender2.append(cart) 
    }
    let add = document.getElementsByClassName("chg-quantity update-cart")
    for(let a of add) {
        a.addEventListener ("click", addItem)
    }
    let remove = document.getElementsByClassName("chg-quantity-2 update-cart")
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
    totalRender(carrito)	
}
/*                   Renderizar Total de Precio y Unidades del Carrito             */
function totalRender (array){

    totalCartFinal= carrito.reduce((a, b ) => a + b.subtotal, 0)
    unidadesCart= carrito.reduce((a, b ) => a + b.unidades, 0)
    
    totalCart.innerHTML=""
    
    let totalResumen = document.createElement("div")
    totalResumen.className= "total"
    totalResumen.innerHTML = `
    <a style="float:right; margin:5px;" type="button" class="btn btn-success" href="index.html">Seguir comprando</a>
    <h5>Items: <strong>${unidadesCart} </strong></h5>
    <h5>Total:<strong> $ ${totalCartFinal.toFixed(2)}</strong></h5>
    <a id="clear" style="float:right; margin:5px;" type="button" class="btn btn-success" href="index.html">Pagar</a>
    `
    totalCart.append (totalResumen)

    navCart.innerHTML=""

    if(array.lenght != 0){
        let parrafo = document.createElement("div")
        parrafo.className = "cart-total"
        parrafo.innerHTML= `<p>${unidadesCart}</p>`    
        navCart.append(parrafo)   
    }else{
        let parrafo = document.createElement("div")
        parrafo.className = "cart-total"
        parrafo.innerHTML= `<p>0</p>`    
        navCart.append(parrafo)   
    }
    let clear = document.getElementById("clear")
    clear.addEventListener("click", borrarStorage )
}
function totalRenderVacio (array){

    totalCart.innerHTML=""
    let totalResumen = document.createElement("div")
    totalResumen.className= "total"
    totalResumen.innerHTML = `
    <h5>Items: <strong>  0 </strong></h5>
    <h5>Total:<strong> $ 0.00 </strong></h5>
    <a id="clear" style="float:right; margin:5px;" type="button" class="btn btn-success" href="index.html">Pagar</a>
    `
    totalCart.append (totalResumen)

    navCart.innerHTML=""
    let parrafo = document.createElement("div")
    parrafo.className = "cart-total"
    parrafo.innerHTML= `<p>0</p>`    
    navCart.append (parrafo)   
}
/*       Eliminar Carrito del LocalStorage  */
function borrarStorage(){
    localStorage.removeItem("Carrito")
}

