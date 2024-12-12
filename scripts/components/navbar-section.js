class NavbarSection extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <nav class="navbar">
        <h1 class="navbar-brand">CHS TOYS</h1>
        <div class="nav-list">
            <a href="#catalog" class="link-scroll">Katalog</a>
            <a href="#faq" class="link-scroll">FAQ</a>
            <a href="#contact" class="link-scroll">Kontak</a>
            <div class="cart-button-container">
            <button class="cart-button"><i class="fas fa-cart-shopping"></i></button>
            <div class="cart-button-amount">0</div>
            </div>
        </div>
        <button class="navbar-toggle"><i class="fas fa-bars"></i></button>
        </nav>
        `;
    }
}

customElements.define("navbar-section", NavbarSection);
