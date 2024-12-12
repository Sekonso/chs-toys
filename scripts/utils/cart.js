import Cars from "../data/cars.js";
import { updateAddButtonAppearance } from "./catalog.js";
import { toggleLayout, renderOverlay, removeOverlay } from "./layout.js";
import { numberToRupiah, showNotification } from "./helper.js";

function initCart() {
  document.querySelector(".cart-button").addEventListener("click", renderCartForm);
  document.querySelector(".cart-exit").addEventListener("click", () => toggleLayout("home"));
  document.querySelector(".cart-form").addEventListener("submit", (e) => {
    e.preventDefault();
    renderBuyForm();
  });

  updateCartButtonAmount();
}

function getCart() {
  const storedCart = JSON.parse(sessionStorage.getItem("cart"));
  if (!Array.isArray(storedCart) || storedCart.length === 0) return [];
  return storedCart;
}

function isItemInCart(carID) {
  const cart = getCart();

  if (cart.length === 0) return false;

  return cart.includes(carID);
}

function addToCart(carID) {
  const cart = getCart();

  if (!cart.includes(carID)) {
    cart.push(carID);
    showNotification("Barang telah ditambahkan ke keranjang", "added");
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));
  updateCartButtonAmount();
}

function removeFromCart(carID) {
  let cart = getCart();

  if (cart.length === 0) {
    console.error("Error menghapus item: Cart kosong");
    return;
  }

  cart = cart.filter((item) => item !== carID);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  updateCartButtonAmount();
  showNotification("Barang telah dihapus dari keranjang", "removed");
}

function updateCartButtonAmount() {
  const cartAmount = document.querySelector(".cart-button-amount");
  const cart = getCart();

  if (cart.length === 0) cartAmount.innerText = "0";
  else cartAmount.innerText = cart.length;
}

function renderCartForm() {
  const cartItemList = document.querySelector(".cart-item-list");
  const cartSubmit = document.querySelector(".cart-submit");

  cartItemList.innerHTML = "";

  const cart = getCart();

  if (cart.length === 0) {
    cartItemList.innerHTML = `<h2 class="cart-empty">Belum ada item di keranjang</h2>`;
    cartSubmit.classList.add("hidden");
  } else {
    const fragment = document.createDocumentFragment();

    cart.forEach((itemID) => {
      const car = Cars.find((car) => car.id === itemID);
      if (car) {
        fragment.appendChild(createCartItem(car));
      }
    });

    if (fragment.children.length > 0) cartItemList.appendChild(fragment);
    cartSubmit.classList.remove("hidden");
  }

  toggleLayout("cart");
}

function renderBuyForm() {
  const buyForm = document.createElement("form");

  buyForm.classList.add("buy-form");
  buyForm.innerHTML = `
    <form class="buy-form">
      <div class="buy-form-header">
        <div></div>  
        <h1>Konfirmasi</h1>
        <button type="button" class="buy-exit"><i class="fas fa-x"></i></button>
      </div>
      <label for="name">Nama</label>
      <input type="text" id="customer-name" placeholder="Masukan nama anda" required/>
      <label for="name">Alamat</label>
      <input type="text" id="customer-address" placeholder="Masukan alamat anda" required/>
      <button type="submit" class="buy-submit">Kirim</button>
    </form>
  `;

  buyForm.querySelector(".buy-exit").addEventListener("click", removeOverlay);
  buyForm.addEventListener("submit", buyHandler);

  renderOverlay(buyForm);
}

function createCartItem(item) {
  const cartItem = document.createElement("div");

  cartItem.classList.add("cart-item");
  cartItem.innerHTML = `
    <img class="cart-item-img" src="${item.image}" alt="${item.name} image" />
    <div class="cart-item-info">
      <div class="cart-item-info-upper">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-price">${numberToRupiah(item.price)}</p>
      </div>
      <div class="cart-item-info-lower">
        <input
          type="number"
          name="${item.name}"
          class="cart-item-amount"
          value="1"
          min="1"
          required
        />
        <button class="cart-item-delete" type="button">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `;

  cartItem.querySelector(".cart-item-delete").addEventListener("click", () => {
    removeFromCart(item.id);
    cartItem.remove();

    const addButtons = document.querySelector(`[data-addID="${item.id}"]`);
    updateAddButtonAppearance(addButtons, false)

    renderCartForm();
  });

  return cartItem;
}

function buyHandler(e) {
  e.preventDefault();

  const cartItemsInput = document.querySelectorAll(".cart-item-amount");
  const customerName = document.querySelector("#customer-name");
  const customerAddress = document.querySelector("#customer-address");

  const items = Array.from(cartItemsInput).map((item) => {
    const itemQuantity = item.value;
    return `- ${item.getAttribute("name")}: ${itemQuantity}`;
  });

  const waMessage =
    "CHS TOYS ORDER\n\n" +
    `Nama: ${customerName.value}\n` +
    `Alamat: ${customerAddress.value}\n\n` +
    `Item (${items.length}):\n` +
    items.join(`\n`);

  const whatsappURL = `https://wa.me/81211737329?text=${encodeURIComponent(waMessage)}`;
  window.open(whatsappURL, "_blank");
}

// Export necessary functions
export {
  initCart,
  isItemInCart,
  addToCart,
  removeFromCart,
};
