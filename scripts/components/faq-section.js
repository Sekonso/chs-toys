class FaqSection extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
          <div class="faq" id="faq">
            <h2>FAQ</h2>
            <div class="faq-list"></div>
          </div>
        `;
    }
}

customElements.define("faq-section", FaqSection);
