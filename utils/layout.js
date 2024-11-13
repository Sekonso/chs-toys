function toggleLayout(layout) {
  if (layout === "home") {
    document.querySelector(".home-layout").classList.remove("hidden");
    document.querySelector(".cart-layout").classList.add("hidden");
  } else if (layout === "cart") {
    document.querySelector(".home-layout").classList.add("hidden");
    document.querySelector(".cart-layout").classList.remove("hidden");
  }
}

function renderOverlay(element) {
  const body = document.body;

  const existingOverlay = document.querySelector(".overlay");
  if (existingOverlay) existingOverlay.remove();

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  overlay.appendChild(element);
  body.appendChild(overlay);
}

function removeOverlay() {
  document.querySelector(".overlay").remove();
}

export { toggleLayout, renderOverlay, removeOverlay };
