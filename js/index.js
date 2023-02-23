let carrito = [];

const openAndCloseCart = () => {
  const cartModal = document.getElementById("cart-modal");
  const openCartBtn = document.getElementById("cartButton");
  const closeCartBtn = document.getElementById("closeBtnCart")
  
  openCartBtn.addEventListener("click", function() {
    let bodyOverflow = document.getElementById("body");
    bodyOverflow.setAttribute("class", "hideOverflow")
    cartModal.style.display = "block";
  });  

  closeCartBtn.addEventListener("click", function() {
    let bodyOverflow = document.getElementById("body");
    bodyOverflow.classList.remove("hideOverflow");
    cartModal.style.display = "none";  
  });
}

const crearGaleria = async () => {
  const resp = await fetch('../json/products.json');
  const arr =  await resp.json();
  arr.forEach((prod) => {
    let card = document.createElement("div");
    card.setAttribute("class", "col-xs-12 col-lg-3 justify-center");
    card.innerHTML = `<div class="card" style="width: 18rem;">
                      <img src="${prod.img}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${prod.nombre}</h5>
                          <p class="card-text">$${prod.precio}</p>
                          <a id="${prod.id}" class="compra-btn btn btn-success">Agregar al carrito</a>
                        </div>
                      </div>`
    let myMain = document.getElementById("galeria");
    myMain.appendChild(card);
  });
};

const agregarAlCarrito = () => {
  let arrDeBotones =  [...document.getElementsByClassName("compra-btn")];
  arrDeBotones.forEach((e) => {
    e.addEventListener("click", () =>{
      let producto = products.find((ej) => ej.id == e.id);
      carrito.push(producto);
      mostrarCarrito(producto);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      totalCarrito();
      swal({
        title: `Se agrego ${producto.nombre} al carrito!`,
        text: "Entra al carrito para ver todos tus productos!",
        icon: "success",
        button: false,
        timer: 2000,
      });
    });
  });
    
};

const mostrarCarrito = (item) =>{
  let cartContent = document.getElementById("cartContent");
  let nuevoItem = document.createElement("div");
  nuevoItem.setAttribute("class", "cardRemoval col-xs-12 col-lg-3 justify-center mb-4");
  nuevoItem.innerHTML = `<div class="card" style="width: 18rem;">
                          <img src="${item.img}" class="card-img-top" alt="...">
                          <div class="card-body">
                            <h5 class="card-title">${item.nombre}</h5>
                            <p class="card-text">$${item.precio}</p>
                          </div>
                        </div>`;
  cartContent.prepend(nuevoItem);
};

const localStorageDatos = () => {
  let lStorage = JSON.parse(localStorage.getItem("carrito"))
  lStorage ? lStorage.forEach(item=>{
        mostrarCarrito(item)
        carrito.push(item)
        totalCarrito();
      }) : undefined;
};

const totalCarrito = () =>{
  let totalCarrito = document.getElementById("totalCompra");
  totalCarrito.innerText = `Total: $${carrito.reduce((acc,element)=> acc + element.precio,0)}`;
} 

const borrarCarrito = () => {
  let deleteButton = document.getElementById("deleteCart")
  deleteButton.addEventListener("click",()=>{
    localStorage.removeItem("carrito");
    carrito = [];
    let totalCarrito = document.getElementById("totalCompra");
    totalCarrito.innerText = `Total: $0`;
    let removed = [...document.getElementsByClassName("cardRemoval")];
    removed.forEach((e)=>{
      e.remove();
    });
  });
};

const slider = () => {
  $("header").vegas({
    delay: 5000,
    slides: [
      { src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
      { src: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
      { src: "https://images.unsplash.com/photo-1653630795384-fa8a46d8d382?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
    ],
    transition: "zoomOut"
  });
}

const index = () =>{
  slider();
  openAndCloseCart();
  crearGaleria();
  setTimeout(()=>{    
    agregarAlCarrito()
    localStorageDatos()
    borrarCarrito()
  }, 1000)
}

index();

