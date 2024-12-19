import { addToCart, removeFromCart, isItemInCart } from "./cart.js";
import { renderOverlay, removeOverlay } from "./layout.js";
import { numberToRupiah } from "./helper.js";

let brandList = [];
let carList = [];
let currentCarList = [];
let currentPage = 1;

function initCatalog(brands, cars) {
  brandList = brands;
  carList = cars;
  currentCarList = cars;

  renderBrandList();
  renderCarList();
  renderPageList();
  setupFilter();
}

function renderBrandList() {
  const brandListElement = document.querySelector(".brand-list");
  brandListElement.innerHTML = "";

  if (!Array.isArray(brandList) || brandList.length === 0) return;

  const fragment = document.createDocumentFragment();
  brandList.forEach((brand) => fragment.appendChild(createBrandItem(brand)));
  brandListElement.appendChild(fragment);
}

function renderCarList() {
  const carListElement = document.querySelector(".car-list");
  carListElement.innerHTML = "";

  if (!Array.isArray(currentCarList) || currentCarList.length === 0) {
    carListElement.innerHTML = `<h1 class="car-list-error">Tidak ada mobil</h1>`;
  } else {
    const startIndex = (currentPage - 1) * 6;
    const endIndex = startIndex + 6;

    const fragment = document.createDocumentFragment();
    currentCarList
      .slice(startIndex, endIndex)
      .forEach((car) => fragment.appendChild(createCarItem(car)));
    carListElement.appendChild(fragment);
  }
}

function renderCarDetail(car) {
  const carDetail = document.createElement("div");

  carDetail.classList.add("car-detail");
  carDetail.innerHTML = `
    <button class="car-detail-exit"><i class="fas fa-x"></i></button>
    <img src="https://chs-toys-api.vercel.app/cars/images/${car.id}" alt="car photo of ${
    car.name
  }" class="car-detail-image" />
    <h3 class="car-detail-name">${car.name}</h3>
    <p class="car-detail-model">${car.model} - ${car.brand}</p>
    <p class="car-detail-desc">${car.desc || ""}</p>
    <div class="car-detail-lower">
      <p class="car-detail-price">${numberToRupiah(car.price)}</p>
      <button class="car-detail-add" data-addID="${car.id}"></button>
    </div>
  `;

  setupCarButtons(carDetail, car, "detail");

  renderOverlay(carDetail);
}

function renderPageList() {
  const pageList = document.querySelector(".page-list");
  const fragment = document.createDocumentFragment();
  const totalPage = Math.ceil(currentCarList.length / 6);

  pageList.innerHTML = "";

  for (let i = 0; i < totalPage; i++) {
    const pageButton = document.createElement("button");

    pageButton.innerText = i + 1;
    pageButton.classList.add("page-button");
    pageButton.setAttribute("aria-label", `Move to page ${i + 1}`);

    if (i === 0) pageButton.classList.add("active");

    pageButton.addEventListener("click", pageChangeHandler);

    fragment.appendChild(pageButton);
  }

  pageList.appendChild(fragment);
}

function pageChangeHandler(event) {
  const activePage = document.querySelector(".page-button.active");
  activePage.classList.remove("active");

  currentPage = parseInt(event.target.innerText, 10);
  event.target.classList.add("active");

  renderCarList();
}

function createBrandItem(brand) {
  const brandItem = document.createElement("label");

  brandItem.classList.add("brand-item");
  brandItem.setAttribute("tabindex", "0");
  brandItem.setAttribute("role", "button");
  brandItem.setAttribute("aria-label", `Filter by ${brand.name} activated`);

  brandItem.innerHTML = `
    <input
      type="checkbox"
      name="brand-filter"
      class="brand-checkbox"
      value="${brand.name}"
      checked
    />
    <img
      src="${brand.image}"
      alt="${brand.name} logo"
      class="brand-image"
    />
  `;

  brandItem.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const checkbox = event.target.querySelector(".brand-checkbox");
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });

  return brandItem;
}

function createCarItem(car) {
  const carItem = document.createElement("div");

  carItem.setAttribute("data-carID", car.id);
  carItem.classList.add("car-item");
  carItem.innerHTML = `
      <img src="https://chs-toys-api.vercel.app/cars/images/${car.id}" alt="Car image of ${
    car.name
  }" class="car-image" loading="lazy" />
      <div class="car-upper">
        <h3 class="car-name">${car.name}</h3>
        <p class="car-model">${car.model} - ${car.brand}</p>
      </div>
      <div class="car-lower">
        <p class="car-price">${numberToRupiah(car.price)}</p>
          <button class="car-action-add" data-addID="${
            car.id
          }"><i class="plus fas fa-plus"></i></button>
      </div>
  `;

  setupCarButtons(carItem, car, "item");

  return carItem;
}

function setupCarButtons(container, car, type) {
  const addButton = container.querySelector(
    type === "item" ? ".car-action-add" : ".car-detail-add"
  );

  addButton.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleAddButtonState(car.id);
  });
  if (isItemInCart(car.id)) updateAddButtonAppearance(addButton, true);
  else updateAddButtonAppearance(addButton, false);

  if (type === "item") {
    container.setAttribute("aria-label", "View details");
    container.addEventListener("click", () => renderCarDetail(car));
  } else if (type === "detail") {
    const exitButton = container.querySelector(".car-detail-exit");

    exitButton.setAttribute("aria-label", "Close car's detail");
    exitButton.addEventListener("click", removeOverlay);
  }
}

function setupFilter() {
  const searchInput = document.querySelector(".search-input");
  const brandCheckboxes = document.querySelectorAll(".brand-checkbox");

  searchInput.addEventListener("input", filterCarList);
  brandCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", filterCarList);
  });
}

function toggleAddButtonState(carID) {
  const addButtons = document.querySelectorAll(`[data-addID="${carID}"]`);
  const isAdded = addButtons[0].classList.contains("added");

  if (isAdded) removeFromCart(carID);
  else addToCart(carID);

  addButtons.forEach((button) => updateAddButtonAppearance(button, !isAdded));
}

function updateAddButtonAppearance(button, isAdded) {
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

function filterCarList() {
  const searchValue = document.querySelector(".search-input").value.trim().toLowerCase();
  const checkedBrandsFilter = document.querySelectorAll("input[name='brand-filter']:checked");
  const checkedBrandsValue = [];

  checkedBrandsFilter.forEach((checked) => {
    checkedBrandsValue.push(checked.value);
  });

  currentCarList = carList.filter(
    (car) => checkedBrandsValue.includes(car.brand) && car.name.toLowerCase().includes(searchValue)
  );

  currentPage = 1;
  renderPageList();
  renderCarList();
}

export { initCatalog, updateAddButtonAppearance };
