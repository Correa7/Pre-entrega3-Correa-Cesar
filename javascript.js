
// const productos = [

//     { id: 25, nombre: "Set femenino Diabulus", categoria: "DEPORTE", precio: 6000, stock: 10, img: "./img/l7.jpg" },
//     { id: 18, nombre: "Remera Optimus-Boxeo", categoria: "ROPA", precio: 2650, stock: 10, img: "./img/rem-5.webp" },
//     { id: 09, nombre: "Adidas Super Star Black ", categoria: "CALZADO", precio: 32500, stock: 10, img: "./img/zap-3.jpg" },
//     { id: 21, nombre: "Short y Remera Deep-Black", categoria: "ROPA", precio: 4600, stock: 10, img: "./img/p1.webp" },
//     { id: 18, nombre: "Remera light-Grey Men", categoria: "ROPA", precio: 3500, stock: 10, img: "./img/l2.jpg" },
//     { id: 12, nombre: "Guantes Everlast Box-Black", categoria: "DEPORTE", precio: 10300, stock: 3, img: "./img/dep-1.jpg" },
//     { id: 02, nombre: "Remera Optimus-Grey", categoria: "ROPA", precio: 2500, stock: 10, img: "./img/rem-1.webp" },
//     { id: 22, nombre: "Conjunto Termico Hombre", categoria: "ROPA", precio: 5500, stock: 10, img: "./img/p3.jpg" },
//     { id: 23, nombre: "Conjunto Termico Mujer", categoria: "ROPA", precio: 5500, stock: 10, img: "./img/p4.webp" },
//     { id: 03, nombre: "Remera Diablus-Black", categoria: "ROPA", precio: 2300, stock: 10, img: "./img/rem-2.jpg" },
//     { id: 08, nombre: "Adidas Super Star B-Colors ", categoria: "CALZADO", precio: 32500, stock: 10, img: "./img/zap-2.jpg" },
//     { id: 04, nombre: "Remera Diablus-White", categoria: "ROPA", precio: 2300, stock: 10, img: "./img/rem-4.webp" },
//     { id: 05, nombre: "Remera Diablus-Grey", categoria: "ROPA", precio: 2300, stock: 10, img: "./img/rem-3.webp" },
//     { id: 19, nombre: "Faja Hombre", categoria: "DEPORTE", precio: 2000, stock: 3, img: "./img/k1.jpg" },
//     { id: 26, nombre: "Calzas Gimnasia Mujer", categoria: "DEPORTE", precio: 3000, stock: 3, img: "./img/p10.jpg" },
//     { id: 24, nombre: "Top Deportivo Optimus", categoria: "DEPORTE", precio: 2500, stock: 10, img: "./img/l6.jpg" },
//     { id: 06, nombre: "Adidas Super Star W-Lisa", categoria: "CALZADO", precio: 28500, stock: 10, img: "./img/zap-5.jpg" },
//     { id: 07, nombre: "Adidas Super Star W-Colors", categoria: "CALZADO", precio: 32500, stock: 10, img: "./img/zap-1.jpg" },
//     { id: 15, nombre: "Colchoneta Everlast", categoria: "DEPORTE", precio: 2500, stock: 5, img: "./img/dep-5.webp" },
//     { id: 10, nombre: "Adidas Super Star Pink ", categoria: "CALZADO", precio: 30000, stock: 10, img: "./img/zap-4.jpg" },
//     { id: 11, nombre: "Guantes Everlast Box-White ", categoria: "DEPORTE", precio: 10300, stock: 3, img: "./img/dep.webp" },
//     { id: 13, nombre: "Pack Everlast Box", categoria: "DEPORTE", precio: 30500, stock: 3, img: "./img/dep-3.webp" },
//     { id: 14, nombre: "Vendas Everlast", categoria: "DEPORTE", precio: 1200, stock: 4, img: "./img/dep-2.webp" },
//     { id: 16, nombre: "Pack Bandas", categoria: "DEPORTE", precio: 5000, stock: 3, img: "./img/dep-6.jpg" },
//     { id: 17, nombre: "Pack Pesas", categoria: "DEPORTE", precio: 15300, stock: 3, img: "./img/dep-4.jpg" },
//     { id: 20, nombre: "Faja Mujer", categoria: "DEPORTE", precio: 2000, stock: 3, img: "./img/l9.jpg" },
// ]

// pageWeb(productos)


let url = './data.json'
fetch(url)

    .then((res) => res.json())
    .then((data) => pageWeb(data))
    .catch((error) => console.log(error))


function pageWeb(productos) {



    let carrito = []
    let carritoJSON = ""
    let totalFinal = ""
    let unidades = ""
    let contenedor = document.getElementById("contenedor")
    let contenedorCarritoTotal = document.getElementById("contenedorCarritoTotal")
    let carritoRender = document.getElementById("cart-row")
    let total = document.getElementById("total")
    let cartNav = document.getElementById("cart-nav")
    let botonCarrito = document.getElementById("cart-button")
    let ropa = document.getElementById("ropa")
    let calzado = document.getElementById("calzado")
    let deportes = document.getElementById("deporte")
    let input = document.getElementById("input")
    let button = document.getElementById("buscador")

    botonCarrito.addEventListener("click", esconder)
    ropa.addEventListener("click", filtroCategoria)
    calzado.addEventListener("click", filtroCategoria)
    deportes.addEventListener("click", filtroCategoria)
    button.addEventListener("click", buscar)

    renderizar(productos)
    comprobar(carrito)

    function comprobar() {

        if (localStorage.getItem("Carrito")) {
            carrito = JSON.parse(localStorage.getItem("Carrito"))
            renderizarCarro(carrito)
            totalRender(carrito)
        } else {
            totalRenderVacio(carrito)
        }
    }
    /*                       Buscador       Filtros                        */
    function filtroCategoria(e) {
        e.preventDefault()
        let categoriafiltrado = productos.filter(producto => producto.categoria.toLowerCase() == e.target.id)
        renderizar(categoriafiltrado)

    }
    function buscar(e) {
        e.preventDefault()
        let productoFiltrado = productos.filter(producto => producto.nombre.toLowerCase().includes(input.value.toLowerCase()) || producto.categoria.toLowerCase().includes(input.value.toLowerCase()))
        renderizar(productoFiltrado)
    }
    /*                           Renderizar productos                  */
    function renderizar(array) {
        contenedor.className = "contenedor"
        contenedorCarritoTotal.className = "hidden"
        contenedor.innerHTML = ""

        for (const producto of array) {

            let tarjetaBody = document.createElement("div")
            // tarjetaBody.className = "col-lg-4"
            tarjetaBody.className = "tarjetabody"
            tarjetaBody.innerHTML = `
                <div class="div-img" ><img class="thumbnail" src="${producto.img}"></div>
                <div class="box-element product">
                    <h6><strong>${producto.nombre}</strong></h6>
                    <h6 class= "precio"><strong>Price: $ ${producto.precio.toFixed(2)}</strong></h6><hr>
                    <button id ="${producto.id}" class="btn btn-outline-secondary add-btn update-cart">Add to Cart</button>
                    <a id ="view" class="btn btn-outline-success" href="#">View</a>
                </div>
                `
            contenedor.append(tarjetaBody)
        }

        let view = document.getElementsByClassName("btn btn-outline-success")
        for (btn of view) {
            btn.addEventListener("click", cartel)
        }

        let agregarCarrito = document.getElementsByClassName('btn btn-outline-secondary add-btn update-cart')
        for (boton of agregarCarrito) {
            boton.addEventListener("click", addItem)

        }
    }
    /*                         Agregar Productos al Carrito                   */
    function addItem(e) {

        let productoBuscado = productos.find(producto => producto.id == e.target.id)
        let indexProduct = carrito.findIndex(producto => producto.id == productoBuscado.id)

        if (indexProduct != -1) {
            carrito[indexProduct].unidades++
            carrito[indexProduct].subtotal = carrito[indexProduct].precio * carrito[indexProduct].unidades

            carritoJSON = JSON.stringify(carrito)
            localStorage.setItem("Carrito", carritoJSON)
        }
        else {
            carrito.push({ id: productoBuscado.id, nombre: productoBuscado.nombre, categoria: productoBuscado.categoria, precio: productoBuscado.precio, subtotal: productoBuscado.precio, unidades: 1, img: productoBuscado.img })

            carritoJSON = JSON.stringify(carrito)
            localStorage.setItem("Carrito", carritoJSON)
        }
        totalFinal = carrito.reduce((a, b) => a + b.subtotal, 0)
        unidades = carrito.reduce((a, b) => a + b.unidades, 0)
        renderizarCarro(carrito)
        totalRender(carrito)
        tostada("Producto agregado al carrito", {
            background: "linear-gradient(to right,#047b89, #6fa5ab)",
        })


    }
    /*                     Renderizar Carrito                     */
    function renderizarCarro(array) {
        carritoRender.innerHTML = ""
        for (let producto of array) {
            let cart = document.createElement("div")
            cart.className = "cart-render"
            cart.innerHTML = `
                <div class="cart-row">
                <div  style="flex:2"><img class="row-image" src="${producto.img}"></div>
                <div  style="flex:2"><p class="cart-p">${producto.nombre}</p></div>
                <div  style="flex:1"><p class="cart-p">$${producto.precio.toFixed(2)}</p></div>
                <div style="flex:1">
                <p class="quantity">${producto.unidades}</p>
                <div class="quantity">
                <img id="${producto.id}" class="chg-quantity update-cart " src="images/arrow-up.png">
                <img id="${producto.id}" class="chg-quantity-2 update-cart" src="images/arrow-down.png">
                </div>
                </div>
                <div style="flex:1"><p class="cart-p">$${producto.subtotal.toFixed(2)}</p></div>
                </div>
                `
            carritoRender.append(cart)
        }
        let add = document.getElementsByClassName("chg-quantity update-cart")
        for (let a of add) {
            a.addEventListener("click", addItem)
        }
        let remove = document.getElementsByClassName("chg-quantity-2 update-cart")
        for (let b of remove) {
            b.addEventListener("click", removeItem)
        }
    }
    /*               Eliminar Items del Carrito            */
    function removeItem(e) {

        let productoBuscado = productos.find(producto => producto.id == e.target.id)
        let indexProduct = carrito.findIndex(producto => producto.id == productoBuscado.id)
        if (indexProduct != -1) {
            if (carrito[indexProduct].unidades >= 2) {
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
        totalFinal = carrito.reduce((a, b) => a + b.subtotal, 0)
        unidades = carrito.reduce((a, b) => a + b.unidades, 0)

        renderizarCarro(carrito)
        totalRender(carrito)
        tostada("Producto eliminado del carrito", {
            background: "linear-gradient(to right,  #e92424,  #da5353)",
        })

    }
    /*                   Renderizar Total de Precio y Unidades del Carrito             */
    function totalRender(array) {
        totalFinal = carrito.reduce((a, b) => a + b.subtotal, 0)
        unidades = carrito.reduce((a, b) => a + b.unidades, 0)
        total.innerHTML = ""
        let totalResumen = document.createElement("div")
        totalResumen.className = "total"
        totalResumen.innerHTML = `
            <a  style="margin:5px" id="seguirComprando" type="button" class="btn btn-outline-dark" href="#">Store</a>
            <h5 class="totalh5" >Items: <strong>${unidades} </strong></h5>
            <h5 class="totalh5" >Total:<strong> $ ${totalFinal.toFixed(2)}</strong></h5>
            <a id="clear" style="float:right; margin:5px;" type="button" class="btn btn-outline-success" href="#">Pagar</a>
            `
        total.append(totalResumen)

        let seguirComprando = document.getElementById("seguirComprando")
        seguirComprando.addEventListener("click", mostrarRender)

        cartNav.innerHTML = ""
        if (array.lenght != 0) {
            let parrafo = document.createElement("div")
            parrafo.className = "cart-total"
            parrafo.innerHTML = `<p>${unidades}</p>`
            cartNav.append(parrafo)
        } else {
            let parrafo = document.createElement("div")
            parrafo.className = "cart-total"
            parrafo.innerHTML = `<p>0</p>`
            cartNav.append(parrafo)
        }

        let clear = document.getElementById("clear")
        clear.addEventListener("click", borrarStorage)
    }
    function totalRenderVacio(array) {
        total.innerHTML = ""
        let totalResumen = document.createElement("div")
        totalResumen.className = "total"
        totalResumen.innerHTML = `
                <a style="margin:5px"  id="seguirComprando" type="button" class="btn btn-outline-dark" href="#">Store</a>
                <h5 class="totalh5">Items: <strong>  0 </strong></h5>
                <h5 class="totalh5">Total:<strong> $ 0.00 </strong></h5>
                `
        total.append(totalResumen)
        let seguirComprando = document.getElementById("seguirComprando")
        seguirComprando.addEventListener("click", mostrarRender)
        cartNav.innerHTML = ""
        let parrafo = document.createElement("div")
        parrafo.className = "cart-total"
        parrafo.innerHTML = `<p>0</p>`
        cartNav.append(parrafo)

    }
    function esconder(e) {
        contenedorCarritoTotal.className = "container"
        contenedor.className = "hidden"
    }
    function mostrarRender() {
        renderizar(productos)
        contenedorCarritoTotal.className = "hidden"
    }
    /*       Eliminar Carrito del LocalStorage  */

    function borrarStorage() {
        localStorage.removeItem("Carrito")
        Swal.fire({
            title: 'Gracias por su compra!',
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
        carrito = []
        totalRenderVacio(carrito)
        renderizarCarro(carrito)
        renderizar(productos)
    }

    /*                    Alerts / Librerias                  */
    function cartel() {
        Swal.fire({
            title: "Proximamente!",
            showConfirmButton: false,
            timer: 1000,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }

    function tostada(text, style) {
        Toastify({
            text: text,
            style: style,
            duration: 1000,
            gravity: "bottom",
            position: "right",
        }).showToast();
    }

}



