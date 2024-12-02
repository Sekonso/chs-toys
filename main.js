import Cars from "./data/cars.js";
import Brands from "./data/brands.js";
import Catalog from "./utils/catalog.js";
import { addCartEvent, updateCartButtonAmount } from "./utils/cart.js";

init();

function init() {
  const catalog = new Catalog(Brands, Cars);
  catalog.init();
  // renderBrandList(Brands);
  // addFilterListener();
  // updateCartButtonAmount();
  // addCartEvent();
}
