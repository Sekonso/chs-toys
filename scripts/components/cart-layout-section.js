class CartLayoutSection extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <section class="cart-layout hidden">
            <div class="cart-header">
            <div></div>
                <h1 class="cart-header">Keranjang</h1>
                <button class="cart-exit"><i class="fas fa-x"></i></button>
            </div>

            <form class="cart-form">
                <div class="cart-item-list"></div>
                <button type="submit" class="cart-submit">Beli</button>
            </form>
      </section>
        `;
    }
}

customElements.define("cart-layout-section", CartLayoutSection);
