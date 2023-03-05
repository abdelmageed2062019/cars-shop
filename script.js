let appContainer = document.getElementById("app-container");
let dropDownIcon = document.getElementById("btn-dropdown");
let dropdownCart = document.getElementById("cart-dropdown");
let productsContainer = document.getElementById("products-container");
let ShoppingCart = document.getElementById("shoping-cart");
let modalContainer = document.getElementById("modal-container");
let modal = document.getElementById("modal");
let modalContent = document.getElementById("modal-content");

let basket = JSON.parse(localStorage.getItem("data")) || [];

//SHOW AND HIDE CART DROPDOWN

dropDownIcon.addEventListener("click", () => {
  dropdownCart.classList.toggle("show");
});

//GENERATE SHOP

let generateShop = () => {
  return (productsContainer.innerHTML = products
    .map((x) => {
      let { id, product_name, product_price, product_image } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
         <div class="product" id=product-id-${id}>
                    <div class="image">
                         <img src=${product_image} alt="car">
                    </div>
                    <div class="namePrice">
                         <h3>${product_name}</h3>
                         <span>${product_price} EGP</span>
                    </div>
                    <div class="buy">
                    <button class="quick" onclick="showModal(${id})"> quick view </button>
                    ${
                      search.item === undefined
                        ? `<button onclick="addToCart(${id})"> add to cart </button>`
                        : `<button onclick="removeFromCart(${id})"> remove from cart </button>`
                    }
                    </div>
               </div>
               `;
    })
    .join(""));
};

generateShop();

//ADD ITEM TO CART

let addToCart = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  if (search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    });
  }

  generateShop();
  showModal();
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

//REMOVE ITEM FROM CART

let removeFromCart = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item = 0;
  }

  basket = basket.filter((x) => x.item !== 0);
  generateShop();
  showModal();
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

//GENERATE THE CART

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = products.find((y) => y.id === id) || [];
        return `
        <div class="cart-container">
         <div class="cart-item">
          <img src=${search.product_image} alt=${search.product_name} />
          <div class="item-details">
               <span class="name">${search.product_name}</span>
               <span>${search.product_price}</span>
          </div>
         </div>
         <div class="quantity">
         <h2 onclick="decrement(${id})" class="inc">-</h2>
         <h2>${item}</h2>
         <h2 onclick="increment(${id})" class="dec">+</h2>
         </div>
         </div>
         
         `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = `
       <h2>Cart is Empty</h2>
       `;
  }
};

generateCartItems();

//INCREASE NUMBER OF ITEMS IN CART

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  if (search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

//DECREASE NUMBER OF ITEMS IN CART

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  basket = basket.filter((x) => x.item !== 0);
  generateShop();
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

//MODAL FUNCTIONS GENERATOR

let generateModal = (id) => {
  let search = products.filter((x) => x.id === id);
  let res = search[0];
  if (res === undefined) return;
  let { product_name, product_price, product_image } = res;
  modalContant.innerHTML = `
        <img src=${product_image} alt="car" />
        <div class="modal-details">
             <span class="name">${product_name}</span></span>
             <span>${product_price} EGP</span>
        </div>
        `;
};

//SHOW MODAL FUNCTION

let showModal = (id) => {
  let quickShow = document.querySelectorAll(".quick");
  quickShow.forEach((btn) => {
    btn.addEventListener("click", () => {
      appContainer.classList.add("blur");
      modal.style.display = "flex";
    });
  });
  let search = products.filter((x) => x.id === id);
  let res = search[0];
  if (res === undefined) return;
  let { product_name, product_price, product_image } = res;
  modalContent.innerHTML = `
        <img src=${product_image} alt="car" />
        <div class="modal-details">
             <span class="name">${product_name}</span></span>
             <span>${product_price} EGP</span>
        </div>
        `;
};

showModal();

//CLOSE MODAL FUNCTION

let closeModal = (e) => {
  let close = document.getElementById("close");
  close.addEventListener("click", () => {
    appContainer.classList.remove("blur");
    modal.style.display = "none";
  });
};

closeModal();
