function toggleLayout(layout) {
  if (layout === "home") {
    document.querySelector(".home-layout").classList.remove("hidden");
    document.querySelector(".cart-layout").classList.add("hidden");
    document.querySelector(".navbar").classList.remove("hidden");
  } else if (layout === "cart") {
    document.querySelector(".home-layout").classList.add("hidden");
    document.querySelector(".cart-layout").classList.remove("hidden");
    document.querySelector(".navbar").classList.add("hidden");
  }
}

function renderOverlay(element) {
  const body = document.body;
  const content = document.querySelector(".content")

  const existingOverlay = document.querySelector(".overlay");
  if (existingOverlay) existingOverlay.remove();

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  content.classList.add("blur")
  overlay.appendChild(element);
  body.appendChild(overlay);

  setTimeout(() => {
    element.classList.add("show");
  }, 0);
}

function removeOverlay() {
  document.querySelector(".overlay").remove();
  document.querySelector(".content").classList.remove("blur")
  document.body.style.overflow = "auto";
  document.body.style.overflowX = "hidden"
}

export { toggleLayout, renderOverlay, removeOverlay };
