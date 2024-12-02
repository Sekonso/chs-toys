import { numberToRupiah } from "./helper.js";
import { addToCart, removeFromCart, isItemInCart } from "./cart.js";
import { renderOverlay, removeOverlay } from "./layout.js";

class Catalog {
  constructor(brandList, carList) {
    this.brandList = brandList;
    this.carList = carList;
    this.currentCarList = carList;
    this.currentPage = 1;

    this.filterCarList = this.filterCarList.bind(this);
    this.pageChangeHandler = this.pageChangeHandler.bind(this);
  }

  init() {
    this.renderBrandList();
    this.renderCarList();
    this.renderPageList();
    this.setupFilter();
  }

  renderBrandList() {
    const brandListElement = document.querySelector(".brand-list");
    brandListElement.innerHTML = "";

    if (!Array.isArray(this.brandList) || this.brandList.length === 0) return;

    const fragment = document.createDocumentFragment();
    this.brandList.forEach((brand) => fragment.appendChild(this.createBrandItem(brand)));
    brandListElement.appendChild(fragment);
  }

  renderCarList() {
    const carListElement = document.querySelector(".car-list");
    carListElement.innerHTML = "";

    if (!Array.isArray(this.currentCarList) || this.currentCarList.length === 0) {
      carListElement.innerHTML = `
        <h1 class="car-list-error">Tidak ada mobil</h1>
      `;
    } else {
      const startIndex = (this.currentPage - 1) * 6;
      const endIndex = startIndex + 6;

      const fragment = document.createDocumentFragment();
      this.currentCarList.slice(startIndex, endIndex).map((car) => fragment.appendChild(this.createCarItem(car)));
      carListElement.appendChild(fragment);
    }
  }

  renderCarDetail(car) {
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

    this.setupCarButtons(carDetail, car, "detail");

    renderOverlay(carDetail);
  }

  renderPageList() {
    const pageList = document.querySelector(".page-list");
    const fragment = document.createDocumentFragment();
    const totalPage = Math.ceil(this.currentCarList.length / 6);

    pageList.innerHTML = "";

    for (let i = 0; i < totalPage; i++) {
      const pageButton = document.createElement("button");

      pageButton.innerText = i + 1;
      pageButton.classList.add("page-button");
      pageButton.setAttribute("aria-label", `Move to page ${i + 1}`);

      if (i === 0) pageButton.classList.add("active");

      pageButton.addEventListener("click", this.pageChangeHandler);

      fragment.appendChild(pageButton);
    }

    pageList.appendChild(fragment);
  }

  pageChangeHandler(event) {
    const activePage = document.querySelector(".page-button.active");
    activePage.classList.remove("active");

    this.currentPage = event.target.innerText;
    event.target.classList.add("active");

    this.renderCarList();
  }

  createBrandItem(brand) {
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

  createCarItem(car) {
    const carItem = document.createElement("div");

    carItem.setAttribute("data-carID", car.id);
    carItem.classList.add("car-item");
    carItem.innerHTML = `
        <img src="${car.image}" alt="Car image of ${car.name}" class="car-image" />
        <div class="car-upper">
          <h3 class="car-name">${car.name}</h3>
          <p class="car-model">${car.model} - ${car.brand}</p>
        </div>
        <div class="car-lower">
          <p class="car-price">${numberToRupiah(car.price)}</p>
          <div class="car-actions">
            <button class="car-action-detail"><i class="fas fa-ellipsis"></i></button>
            <button class="car-action-add" data-addID="${car.id}"><i class="plus fas fa-plus"></i></button>
          </div>
        </div>
    `;

    this.setupCarButtons(carItem, car, "item");

    return carItem;
  }

  setupCarButtons(container, car, type) {
    const addButton = container.querySelector(type === "item" ? ".car-action-add" : ".car-detail-add");

    addButton.addEventListener("click", () => this.toggleAddButtonState(car.id));
    if (isItemInCart(car.id)) this.updateAddButtonAppearance(addButton, true);
    else this.updateAddButtonAppearance(addButton, false);

    if (type === "item") {
      const detailButton = container.querySelector(".car-action-detail");

      detailButton.setAttribute("aria-label", "View details");
      detailButton.addEventListener("click", () => this.renderCarDetail(car));
    } else if (type === "detail") {
      const exitButton = container.querySelector(".car-detail-exit");

      exitButton.setAttribute("aria-label", "Close car's detail");
      exitButton.addEventListener("click", removeOverlay);
    }
  }

  setupFilter() {
    const searchInput = document.querySelector(".search-input");
    const brandCheckboxes = document.querySelectorAll(".brand-checkbox");

    searchInput.addEventListener("input", this.filterCarList);
    brandCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", this.filterCarList);
    });
  }

  toggleAddButtonState(carID) {
    const addButtons = document.querySelectorAll(`[data-addID="${carID}"]`);
    const isAdded = addButtons[0].classList.contains("added");

    if (isAdded) removeFromCart(carID);
    else addToCart(carID);

    addButtons.forEach((button) => updateAddButtonAppearance(button, !isAdded));
  }

  updateAddButtonAppearance(button, isAdded) {
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

  filterCarList() {
    const searchValue = document.querySelector(".search-input").value.trim().toLowerCase();
    const checkedBrandsFilter = document.querySelectorAll("input[name='brand-filter']:checked");
    const checkedBrandsValue = [];

    checkedBrandsFilter.forEach((checked) => {
      checkedBrandsValue.push(checked.value);
    });

    this.currentCarList = this.carList.filter((car) => checkedBrandsValue.includes(car.brand) && car.name.toLowerCase().includes(searchValue));

    this.currentPage = 1;
    this.renderPageList();
    this.renderCarList();
  }
}

export default Catalog;
