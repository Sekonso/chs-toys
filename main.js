import Cars from "./data/cars.js";
import Brands from "./data/brands.js";
import { initCatalog } from "./utils/catalog.js";
import { initCart } from "./utils/cart.js";

init();

function init() {
  setupNavbarToggle();
  setupFAQ();
  setupConnect();
  initCatalog(Brands, Cars);
  initCart();
}

function setupNavbarToggle() {
  const navbarToggle = document.querySelector(".navbar-toggle");
  const navList = document.querySelector(".nav-list");

  navbarToggle.addEventListener("click", () => {
    if (navList.classList.contains("active")) navList.classList.remove("active");
    else navList.classList.add("active");
  });
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
      answer: "Kami menerima pembayaran melalui BCA dan QRIS. Untuk jasa pengiriman, kami hanya menggunakan ekspedisi JNT"
    },
    {
      question: "Apakah ada pengembalian barang jika tidak sesuai",
      answer: "kami menyediakan pengembalian barang sesuai syarat dan ketentuan yang berlaku, hubungi customer service untuk detail lebih lanjut"
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
