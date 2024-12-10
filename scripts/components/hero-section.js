class HeroSection extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <section class="home-layout">
            <header class="hero">
            <div class="hero-img-container">
                <img src="./assets/hero-img.png" alt="Gambar mobil" class="hero-img" />
            </div>
            <div class="hero-caption">
                <h2 class="hero-caption-header">CHS <span>TOYS</span></h2>
                <p class="hero-caption-content">Menjual koleksi mainan mobil diecast dengan kualitas dan harga terbaik. <br><br> "We Wheels"</p>
                <a href="#catalog" class="link-scroll">Jelajah</a>
            </div>
        `;
    }
}

customElements.define("hero-section", HeroSection);
