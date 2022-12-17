
/*                               INDEX.HTML                              */



const productos = [ 
    {id: 1, nombre: "Remera" ,categoria: "ROPA", precio: 2499.99 ,stock: 10, img: "./img/t-shirt.jpg"  }, 
    {id: 2, nombre: "Pelota Futbol",categoria: "DEPORTE", precio: 4499.99 ,stock: 5, img: "./img/pelota-futbol.jpg"  },
    {id: 3, nombre: "Pelota Tenis" ,categoria: "DEPORTE", precio: 1200 ,stock:4, img: "./img/pelota-tenis.jpg"  },
    {id: 4, nombre: "Zapatilla" ,categoria: "CALZADO", precio: 25499.99 ,stock:10, img: "./img/shoes.jpg"  },
    {id: 5, nombre: "Short" ,categoria: "ROPA", precio: 2999.99 ,stock:5, img: "./img/short.jpg"  },
    {id: 6, nombre: "Raqueta Paddle" ,categoria: "DEPORTE", precio: 10299.99 ,stock: 3, img: "./img/raqueta-paddle.jpg"  }
]



let contenedor = document.getElementById("contenedor")







function renderizar (array) {
    
    contenedor.innerHTML = ""
    
    for (const producto of array) {
        
        let tarjetaBody = document.createElement("div")
        tarjetaBody.className= "col-lg-4"
        
        
        tarjetaBody.innerHTML= `
        
        <img class="thumbnail" src="${producto.img}">
        
        <div class="box-element product">
        <h6><strong>${ producto.nombre }</strong></h6>
        <hr>
        
        <button data-product="${producto.id}" data-action="add" class="btn btn-outline-secondary add-btn update-cart">Add to Cart</button>
        
        <a class="btn btn-outline-success" href="#">View</a>
        
        <h5 class= "precio" style="float: right;" ><strong>${ producto.precio.toFixed(2)}</strong></h5>
        
        </div>
        
        `
        
        
        contenedor.append(tarjetaBody)
    }
    
}

renderizar(productos)

let input = document.getElementById("input")

let boton = document.getElementById("buscador")

boton.addEventListener("click", buscar)

// input.addEventListener("input", buscar)

function buscar () {

    console.log ("Funciona")
    console.log (input.value)

    let productofiltrado = productos.filter (producto => producto.nombre.includes (input.value))

    // let productofiltrado = productos.filter (producto => producto.nombre.toLowerCase().includes (input.value.toLowerCase()) || producto.categoria.toLowerCase().includes (input.value.toLowerCase()) )
    
    renderizar(productofiltrado)

}





/*                                  CART.HTML                                     */


let carrito = document.getElementById("cart-row")





