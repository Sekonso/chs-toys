import Cars from "./data/cars.js";
import Brands from "./data/brands.js";
import { renderCarList } from "./utils/catalog.js";
import { addFilterListener, renderBrandList } from "./utils/filter.js";
import { addCartEvent, updateCartButtonAmount } from "./utils/cart.js";
import { addHeroImageEvent } from "./utils/helper.js";

init();

function init() {
  renderCarList(Cars);
  renderBrandList(Brands);
  addFilterListener();
  updateCartButtonAmount();
  addCartEvent();
  addHeroImageEvent();
}
