import Cars from "../data/cars.js";
import { renderCarList } from "./catalog.js";

// Add event listener to brands checkboxed and search bar
function addFilterListener() {
  const searchInput = document.querySelector(".search-input");
  const brandCheckboxes = document.querySelectorAll(".brand-checkbox");

  searchInput.addEventListener("input", filterCarList);
  brandCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", filterCarList);
  });
}

// Filtering car-list
function filterCarList() {
  const searchValue = document.querySelector(".search-input").value.trim().toLowerCase();
  const checkedBrandsFilter = document.querySelectorAll("input[name='brand-filter']:checked");
  const checkedBrandsValue = [];

  checkedBrandsFilter.forEach((checked) => {
    checkedBrandsValue.push(checked.value);
  });

  const filteredCars = Cars.filter(
    (car) => checkedBrandsValue.includes(car.brand) && car.name.toLowerCase().includes(searchValue)
  );

  renderCarList(filteredCars);
}

// Render brand list as filter
function renderBrandList(brands) {
  const brandList = document.querySelector(".brand-list");
  brandList.innerHTML = "";

  if (!Array.isArray(brands) || brands.length === 0) return;

  const fragment = document.createDocumentFragment();
  brands.forEach((brand) => fragment.appendChild(createBrandItem(brand)));
  brandList.appendChild(fragment);
}

// Create brand item (checkbox)
function createBrandItem(brand) {
  const brandCheckbox = document.createElement("label");

  brandCheckbox.classList.add("brand-item");
  brandCheckbox.innerHTML = `
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

  return brandCheckbox;
}

export { addFilterListener, renderBrandList };
