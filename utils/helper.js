const numberToRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: "0"
  }).format(number);
};

// Add and remove notifications
function showNotification(message, type) {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.classList.add("notification", type);
  notification.textContent = message;

  if (type === "kameo") {
    notification.innerHTML = `
      <img src='./assets/kameo.jpeg' alt='pram pram' style="width: 240px;" />
    `
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 0);

  setTimeout(() => {
    notification.classList.add("hide");

    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 1300);
}

function addHeroImageEvent() {
  const heroImage = document.querySelector(".hero-img");
  const engineSound = new Audio("./assets/engine.mp3");
  const kameoSound = new Audio("./assets/kameo.mp3");
  let counter = 0;

  heroImage.addEventListener("click", () => {
    engineSound.currentTime = 2;

    if (counter === 10) {
      showNotification("You unlocked kameo", "kameo")
      kameoSound.play().catch((error) => console.error("Error playing the audio:", error));

      counter = 0;
      return;
    }

    engineSound.play().catch((error) => console.error("Error playing the audio:", error));
    counter++;
  });
}

export { numberToRupiah, showNotification, addHeroImageEvent };
