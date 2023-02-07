const carrito = [];
const openCartBtn = document.getElementById("cartButton");
const cartModal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("closeBtnCart")

openCartBtn.addEventListener("click", function() {
  let bodyOverflow = document.getElementById("body");
  bodyOverflow.setAttribute("class", "hidOverflow")
  cartModal.style.display = "block";
});

closeCartBtn.addEventListener("click", function() {
  let bodyOverflow = document.getElementById("body");
  bodyOverflow.classList.remove("hidOverflow");
  cartModal.style.display = "none";  
});


const crearGaleria = (arr) => {
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
    });
  });
    
};

const mostrarCarrito = (item) =>{
  let cartContent = document.getElementById("cartContent");
  let nuevoItem = document.createElement("div");
  nuevoItem.setAttribute("class", "col-xs-12 col-lg-3 justify-center mb-4 removal");
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
  if(lStorage){
    lStorage.forEach(item=>{
      mostrarCarrito(item)
      carrito.push(item)
      totalCarrito();
    });
  }
};

const totalCarrito = () =>{
  let totalCarrito = document.getElementById("totalCompra");
  totalCarrito.innerText = `Total: $${carrito.reduce((acc,element)=> acc + element.precio,0)}`;
} 

const borrarCarrito = () => {
  let deleteButton = document.getElementById("deleteCart")
  let cartElements = document.getElementsByClassName("removal");
  deleteButton.addEventListener("click",()=>{
    localStorage.removeItem("carrito");
    carrito = [];
    cartElements.remove();
  });
};

const index = () =>{
  crearGaleria(products);
  agregarAlCarrito();
  localStorageDatos();
  borrarCarrito();
}

index();

