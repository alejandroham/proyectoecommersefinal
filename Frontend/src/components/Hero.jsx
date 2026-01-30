function Hero() {
  return (
    <section className="hero">
      {/* Imagen de fondo */}
      <div className="hero-overlay">
        <h1>Vive Gamer</h1>
        <p>Potencia, velocidad y tecnología a tu alcance</p>

        <a href="/products" className="hero-btn">
          Ver productos
        </a>
      </div>
    </section>
  );
}

export default Hero;
