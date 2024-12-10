class TokopediaSection extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
          <a class="tokopedia-link" href="https://www.tokopedia.com/chstoys" target="_blank">
            <div class="tokopedia-promo">
              <img src="./assets/tokopedia.png" alt="Gambar tokopedia" />
              <p>
                Kunjungi juga toko kami di
                <span class="tokopedia-text">Tokopedia</span>
              </p>
            </div>
          </a>
        `;
    }
}

customElements.define("tokopedia-section", TokopediaSection);
