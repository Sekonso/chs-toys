import Brands from "./data/brands.js";
//Components
import "./components/navbar-section.js";
import "./components/cart-layout-section.js";
import "./components/catalog-section.js";
import "./components/footer-section.js";

import { initCatalog } from "./utils/catalog.js";
import { initCart } from "./utils/cart.js";

init();

async function init() {
  const cars = await fetchCarData();
  setupNavbarToggle();
  setupTestimony();
  setupFAQ();
  setupConnect();
  setupLinkScroll();
  if (cars) {
    initCatalog(Brands, cars);
    initCart(cars);
  }
}

function setupNavbarToggle() {
  const navbarToggle = document.querySelector(".navbar-toggle");
  const navList = document.querySelector(".nav-list");

  navbarToggle.addEventListener("click", () => {
    if (navList.classList.contains("active")) navList.classList.remove("active");
    else navList.classList.add("active");
  });
}

function createWave(color, viewBox, shape) {
  let path = "";
  let viewBoxValue = viewBox || "0 0 1440 1200";

  if (shape === "shape1") {
    path = `M 0,1440 L 0,750 C 760,400 980,1000 1440,750 L 1440,1440 L 0,1440 Z`;
    viewBoxValue = "0 0 1440 1230";
  } else if (shape === "shape2") {
    path = `M 0,1440 L 0,750 C 760,400 1000,1000 2040,750 L 1440,1440 L 0,1440 Z`;
    viewBoxValue = "0 0 1440 1310";
  } else {
    path = `M 0,750 L 0,750 C 760,820 780,300 1840,900 L 1440,1440 L 0,1440 Z`;
    viewBoxValue = "0 0 1440 1230";
  }

  return `
    <svg class="wave" width="100%" height="100%" viewBox="${viewBoxValue}" xmlns="http://www.w3.org/2000/svg">
      <path d="${path}" stroke="none" stroke-width="0" fill="${color}" fill-opacity="1"></path>
    </svg>
  `;
}

function setupTestimony() {
  const testimony = [
    {
      name: "Frengki",
      comment: "Barang yg diterima sesuai gambar! Kualitas bahan bagus",
      color: "#22c199",
      shape: "shape1",
      image: "https://www.svgrepo.com/show/75578/avatar.svg"
    },
    {
      name: "S***y",
      comment: "Kualitas bahan bagus tanpa cacat packing baik barang yg diterima sesuai gambar!",
      color: "#8a5fbb",
      shape: "shape2",
      image: "https://www.svgrepo.com/show/17344/avatar.svg"
    },
    {
      name: "Muhammad",
      comment: "Sesuaii mantap cihuyy",
      color: "#57a3f1",
      shape: "shape3",
      image: "https://www.svgrepo.com/show/16907/avatar.svg"
    }
  ];

  const testimonyList = document.querySelector(".testimony-list");
  const fragment = document.createDocumentFragment();

  testimony.forEach((item) => {
    const testimonyItem = document.createElement("div");
    testimonyItem.classList.add("testimony-item");

    testimonyItem.innerHTML = `
      <div class="comment-area">
        <p class="comment">${item.comment}</p>
      </div>
      <div class="profile-area">
        <div class="profile">
          <img src="${item.image}" alt="${item.name}'s Profile Picture">
        </div>
        <div class="name-area">
          <p class="name">${item.name}</p>
        </div>
      </div>
      ${createWave(item.color, 690, item.shape)}
    `;
    fragment.appendChild(testimonyItem);
  });

  testimonyList.appendChild(fragment);
}

function setupFAQ() {
  const faq = [
    {
      question: "Bagaimana proses pembeliannya?",
      answer: `
        - Pergi ke menu katalog dan pilih item yang ingin dibeli<br>
        - Klik tombol tambah "+" untuk memasukkan item ke keranjang<br>
        - Klik tombol keranjang yang tersedia di pojok kanan atas<br>
        - Sesuaikan jumlah yang ingin dibeli<br>
        - Konfirmasi data diri dan proses pembelian akan dilanjutkan ke Whatsapp admin<br>
      `
    },
    {
      question: "Apakah barang original?",
      answer: "Kami menjamin semua barang yang kami jual adalah original"
    },
    {
      question: "Metode pembayaran dan jasa pengirima apa saja yang tersedia?",
      answer:
        "Kami menerima pembayaran melalui BCA dan QRIS. Untuk jasa pengiriman, kami hanya menggunakan ekspedisi JNT"
    },
    {
      question: "Apakah ada pengembalian barang jika tidak sesuai",
      answer:
        "kami menyediakan pengembalian barang sesuai syarat dan ketentuan yang berlaku, hubungi customer service untuk detail lebih lanjut"
    },
    {
      question: "Bagaimana cara menghubungi customer service?",
      answer: `
        Anda dapat menghubungi kami melalui:<br><br>
        Email: chstoys30@gmail.com<br>
        WhatsApp: +62 821 1173 7329
      `.trim()
    }
  ];

  const faqList = document.querySelector(".faq-list");
  const fragment = document.createDocumentFragment();

  faq.forEach((item) => {
    const faqItem = document.createElement("div");

    faqItem.classList.add("faq-item");

    faqItem.innerHTML = `
      <button class="faq-question">
        <p>${item.question}</p>
        <div class="chevron"><i class="fas fa-chevron-down"></i></div>
      </button>
      <p class="faq-answer">${item.answer}</p>
    `;

    faqItem.querySelector(".faq-question").addEventListener("click", () => {
      if (faqItem.classList.contains("active")) faqItem.classList.remove("active");
      else faqItem.classList.add("active");
    });

    fragment.appendChild(faqItem);
  });

  faqList.appendChild(fragment);
}

function setupConnect() {
  const connectForm = document.querySelector(".connect-form");

  connectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("connect-name").value;
    const message = document.getElementById("connect-message").value;

    const waMessage = "CHS TOYS CUSTOMER SERVICE\n\n" + `Nama: ${name}\n` + `Message: \n${message}`;

    const whatsappURL = `https://wa.me/81211737329?text=${encodeURIComponent(waMessage)}`;
    window.open(whatsappURL, "_blank");
  });
}

function setupLinkScroll() {
  document.querySelectorAll(".link-scroll").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const yOffset = -80;
        const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  });
}

async function fetchCarData() {
  const carList = document.querySelector(".car-list");

  try {
    carList.innerHTML = "<h1>Loading</h1>";

    const response = await fetch("https://chs-toys-api.vercel.app/cars");
    const responseJSON = await response.json();

    return responseJSON.data;
  } catch (error) {
    console.error(error);
    carList.innerHTML = "<h1>Gagal mengambil data</h1>";
  }
}
