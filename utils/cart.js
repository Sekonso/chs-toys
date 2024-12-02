import Cars from "../data/cars.js";
import { toggleLayout, renderOverlay, removeOverlay } from "./layout.js";
import { numberToRupiah, showNotification } from "./helper.js";

// Add car (by id) to cart session storage
function getCart() {
  let cart = JSON.parse(sessionStorage.getItem("cart"));

  if (!Array.isArray(cart) || cart.length === 0) return [];

  return cart;
}

// Function to add a car to the cart
function addToCart(carID) {
  const cart = getCart();

  if (!cart.includes(carID)) {
    cart.push(carID);
    showNotification("Barang telah ditambahkan ke keranjang", "added");
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));
  updateCartButtonAmount();
}

// Function to remove a car from the cart
function removeFromCart(carID) {
  const cart = getCart();

  if (cart.length === 0) {
    console.error("Error removing cart");
    return;
  }

  sessionStorage.setItem("cart", JSON.stringify(cart.filter((item) => item !== carID)));
  updateCartButtonAmount();
  showNotification("Barang telah dihapus dari keranjang", "removed");
}

// Re-render amount of item in cart button
function updateCartButtonAmount() {
  const cartAmount = document.querySelector(".cart-button-amount");
  const cart = getCart();

  if (cart.length === 0) cartAmount.innerHTML = "0";
  else cartAmount.innerHTML = cart.length;
}

// Check if the car id is in the cart session storage
function isItemInCart(carID) {
  const cart = getCart();

  if (cart.length === 0) return false;

  return cart.includes(carID);
}

// Render cart form
function renderCart() {
  const cart = getCart();
  const cartItemList = document.querySelector(".cart-item-list");
  const cartSubmit = document.querySelector(".cart-submit");
  const fragment = document.createDocumentFragment();

  cartItemList.innerHTML = "";

  if (cart.length === 0) {
    cartItemList.innerHTML = `
      <h2 class="cart-empty">Belum ada item di keranjang</h2>
    `;

    cartSubmit.style.display = "none";
  } else {
    cart.forEach((item) => {
      const car = Cars.find((car) => car.id === item);

      if (car) {
        fragment.appendChild(createCartItem(car));
      }
    });

    if (fragment.children.length > 0) {
      cartItemList.appendChild(fragment);
    }

    cartSubmit.style.display = "block";
  }

  toggleLayout("cart");
}

// Create items for cart form
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

    const addButtons = document.querySelectorAll(`[data-addID="${item.id}"]`);

    addButtons.forEach((button) => {
      updateButtonAppearance(button, false);
    });
    renderCart();
  });

  return cartItem;
}

// Add event to element in cart
function addCartEvent() {
  document.querySelector(".cart-button").addEventListener("click", renderCart);
  document.querySelector(".cart-exit").addEventListener("click", () => toggleLayout("home"));
  document.querySelector(".cart-form").addEventListener("submit", (e) => {
    e.preventDefault();
    renderBuyForm();
  });
}

// Render buy form
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
  buyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const cartItemsInput = document.querySelectorAll(".cart-item-amount");
    const customerName = document.querySelector("#customer-name");
    const customerAddress = document.querySelector("#customer-address");

    const items = Array.from(cartItemsInput).map((item) => {
      const itemQuantity = item.value;
      return `- ${item.getAttribute("name")}: ${itemQuantity}`;
    });

    const waMessage =
      'CHS TOYS ORDER\n\n' +
      `Nama: ${customerName.value}\n` +
      `Alamat: ${customerAddress.value}\n\n` +
      `Item (${items.length}):\n` +
      items.join(`\n`);

    const whatsappURL = `https://wa.me/81211737329?text=${encodeURIComponent(waMessage)}`;
    window.open(whatsappURL, "_blank");
  });

  renderOverlay(buyForm);
}

export { addToCart, removeFromCart, isItemInCart, addCartEvent, updateCartButtonAmount };
