class CatalogSection extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
          <div class="catalog" id="catalog">
            <h1 class="catalog-title">Katalog</h1>

            <!-- FILTER -->
            <div class="filter">
              <!-- Brand categories list -->
              <div class="brand-list"></div>

              <!-- Seach bar -->
              <div class="search-bar">
                <i class="fas fa-search"></i>
                <input type="search" class="search-input" placeholder="Cari produk disini..." aria-label="search" />
              </div>
            </div>

            <!-- CAR LIST -->
            <div class="car-list"></div>

            <div class="page-list"></div>
          </div>
        `;
    }
}

customElements.define("catalog-section", CatalogSection);
