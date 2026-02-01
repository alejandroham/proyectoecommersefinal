import "../styles/home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">Vive la Tecnología</h1>
          <p className="hero-subtitle">
            Potencia, innovación y rendimiento a tu alcance
          </p>

          <Link to="/products" className="hero-btn">
            Ver productos
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h3>Alto Rendimiento</h3>
          <p>Equipos diseñados para máxima velocidad y eficiencia.</p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">🛡️</span>
          <h3>Calidad Garantizada</h3>
          <p>Productos certificados y soporte confiable.</p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">🚀</span>
          <h3>Innovación Constante</h3>
          <p>Tecnología actualizada para ir un paso adelante.</p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">⏱️</span>
          <h3>Entrega Rápida</h3>
          <p>Compra fácil, segura y sin esperas innecesarias.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
