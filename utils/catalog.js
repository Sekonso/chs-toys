import { numberToRupiah } from "./helper.js";
import { addToCart, removeFromCart, isItemInCart } from "./cart.js";
import { renderOverlay, removeOverlay } from "./layout.js";

// Rendering a car list
function renderCarList(cars) {
  const carList = document.querySelector(".car-list");
  carList.innerHTML = "";

  if (!Array.isArray(cars) || cars.length === 0) {
    carList.innerHTML = `
      <h1 class="car-list-error">Tidak ada mobil</h1>
    `;

    return;
  }

  const fragment = document.createDocumentFragment();
  cars.map((car) => fragment.appendChild(createCarItem(car)));
  carList.appendChild(fragment);
}

// Render a car detail inside an overlay
function renderCarDetail(car) {
  const carDetail = document.createElement("div");
  carDetail.classList.add("car-detail");

  carDetail.innerHTML = `
    <button class="car-detail-exit"><i class="fas fa-x"></i></button>
    <img src="${car.image}" alt="car photo of ${car.name}" class="car-detail-image" />
    <h3 class="car-detail-name">${car.name}</h3>
    <p class="car-detail-model">${car.model} - ${car.brand}</p>
    <div class="car-detail-specs"></div>
    <p class="car-detail-desc">${car.desc || ""}</p>
    <div class="car-detail-lower">
      <p class="car-detail-price">${numberToRupiah(car.price)}</p>
      <button class="car-detail-add" data-addID="${car.id}"></button>
    </div>
  `;

  const carDetailSpecs = carDetail.querySelector(".car-detail-specs");
  const specsFragment = document.createDocumentFragment();
  car.specs.forEach((spec) => {
    const specElement = document.createElement("div");
    specElement.classList.add("spec");
    specElement.innerText = spec;
    specsFragment.appendChild(specElement);
  });
  carDetailSpecs.appendChild(specsFragment);

  setupCarDetailButtons(carDetail, car.id);

  renderOverlay(carDetail);
}

// Create car-item node
function createCarItem(car) {
  const carItem = document.createElement("div");

  carItem.setAttribute("data-carID", car.id);
  carItem.classList.add("car-item");
  carItem.innerHTML = `
      <img 
        src="${car.image}"
        alt="Car image of ${car.name}"
        class="car-image"
      />
      <div class="car-upper">
        <h3 class="car-name">${car.name}</h3>
        <p class="car-model">${car.model} - ${car.brand}</p>
      </div>
      <div class="car-lower">
        <p class="car-price">${numberToRupiah(car.price)}</p>
        <div class="car-actions">
          <button class="car-action-detail"><i class="check fas fa-ellipsis"></i></button>
          <button class="car-action-add" data-addID="${
            car.id
          }"><i class="plus fas fa-plus"></i></button>
        </div>
      </div>
  `;

  setupCarItemButtons(carItem, car);

  return carItem;
}

// Setting up car-item buttons accesibility and event
function setupCarItemButtons(carItem, car) {
  const detailButton = carItem.querySelector(".car-action-detail");
  const addButton = carItem.querySelector(".car-action-add");

  detailButton.setAttribute("aria-label", "View details");
  addButton.setAttribute("aria-label", "Add to cart");
  if (isItemInCart(car.id)) updateButtonAppearance(addButton, true)
  else updateButtonAppearance(addButton, false)

  detailButton.addEventListener("click", () => renderCarDetail(car));
  addButton.addEventListener("click", () => toggleAddButtonState(car.id));
}

// Setting up car-detail buttons accesibility and event
function setupCarDetailButtons(carDetail, carID) {
  const exitButton = carDetail.querySelector(".car-detail-exit");
  const addButton = carDetail.querySelector(".car-detail-add");

  exitButton.setAttribute("aria-label", "Close car's detail");
  if (isItemInCart(carID)) updateButtonAppearance(addButton, true)
  else updateButtonAppearance(addButton, false)

  exitButton.addEventListener("click", removeOverlay);
  addButton.addEventListener("click", () => toggleAddButtonState(carID));
}

// Toggling add button's state
function toggleAddButtonState(carID) {
  const addButtons = document.querySelectorAll(`[data-addID="${carID}"]`);
  const isAdded = addButtons[0].classList.contains("added");

  addButtons.forEach((button) => {
    updateButtonAppearance(button, !isAdded);
  });

  if (isAdded) {
    removeFromCart(carID);
  } else {
    addToCart(carID);
  }
}

// Toggle add button's appearance
function updateButtonAppearance(button, isAdded) {
  if (isAdded) {
    button.classList.add("added");
    button.setAttribute("aria-label", "Remove from cart");
    button.innerHTML = `<i class="fas fa-check"></i>`;
  } else {
    button.classList.remove("added");
    button.setAttribute("aria-label", "Add to cart");
    button.innerHTML = `<i class="fas fa-plus"></i>`;
  }
}


export { renderCarList, updateButtonAppearance };
