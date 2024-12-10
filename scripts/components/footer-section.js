class FooterSection extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
           <div class="footer">
            <h2>CHS <span>TOYS</span></h2>
            <ul class="footer-contact">
              <li class="header">Kontak</li>
              <li><i class="fa-brands fa-whatsapp"></i> +62 81211737329</li>
              <li><i class="fa-solid fa-at"></i> chstoys30@gmail.com</li>
            </ul>
            <ul class="footer-devs">
              <li class="header">Developer</li>
              <li class="dev">Adriansyah</li>
              <li class="dev">Badi Amnu Pramuditya</li>
              <li class="dev">Dandy Daffa raihan</li>
              <li class="dev">Fajri Mahda Aulia</li>
              <li class="dev">Rafi Aria Sarosa</li>
            </ul>
          </div>
        `;
    }
}

customElements.define("footer-section", FooterSection);
