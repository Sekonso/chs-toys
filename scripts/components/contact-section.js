class ContactSection extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
          <div class="contact" id="contact">
            <div class="connect">
              <h2>Hubungi Kami</h2>
              <form class="connect-form" action="mailto:chstoys30@gmail.com" method="post" enctype="text/plain">
                <input type="text" class="connect-input" id="connect-name" placeholder="Nama lengkap" name="name" required />
                <textarea class="connect-input" id="connect-message" placeholder="Pesan" name="message" required></textarea>
                <button type="submit" class="connect-submit">Kirim</button>
              </form>
            </div>
            <div class="social">
              <h2>Kontak Kami</h2>
              <a class="social-link" href="https://wa.me/81211737329" target="_blank">
                <div class="icon-container"><i class="fa-brands fa-whatsapp"></i></div>
                62+ 812 1173 7329
              </a>
              <a class="social-link" href="mailto:chstoys30@gmail.com" target="_blank">
                <div class="icon-container"><i class="fa-solid fa-at"></i></div>
                chstoys30@gmail.com
              </a>
              <a class="social-link" href="https://www.tokopedia.com/chstoys" target="_blank">
                <div class="icon-container"><i class="fa-solid fa-bag-shopping"></i></div>
                CHS Toys (Tokopedia)
              </a>
            </div>
          </div>
        `;
    }
}

customElements.define("contact-section", ContactSection);
