/**
 * Footer.jsx
 * - Footer global
 * - Siempre visible abajo
 * - Diseño moderno y limpio
 */
import "../styles/layout/footer.css";


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Marca */}
        <div className="footer-brand">
          <h4>Compumundohipermegared! 🍩</h4>
          <p>Tecnología que impulsa tu futuro</p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <a href="/">Inicio</a>
          <a href="/products">Productos</a>
          <a href="/orders">Mis pedidos</a>
        </div>

        {/* Copy */}
        <div className="footer-copy">
          © 2026 Compumundohipermegared!  
          <br />
          Todos los derechos reservados.
        </div>

      </div>
    </footer>
  );
}

export default Footer;
