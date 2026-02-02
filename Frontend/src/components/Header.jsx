/**
 * Header.jsx
 * - Menú público si NO hay sesión
 * - Menú buyer si buyer logueado
 * - Menú admin si admin logueado
 * - Nombre del usuario SIEMPRE visible cuando hay sesión
 * - Rol admin visible solo para admin
 */

import {
  Navbar,
  Nav,
  Container,
  Form,
  Badge,
} from "react-bootstrap";
import {
  Cart,
  Person,
  BoxArrowRight,
  ClockHistory,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { MENUS } from "../data/menus";


const Header = ({ theme, setTheme }) => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const cartCount = cart.length;

  // 🔑 Rol efectivo
  const role = user?.role || "public";

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div className={`top-bar ${theme}`}>
        <span>¡Retira GRATIS tus compras en nuestra tienda! 🤙</span>

        <button
          className="theme-toggle"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
          title="Cambiar tema"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      {/* ================= HEADER ================= */}
      <header className={`header-wrapper ${theme}`}>
        <div className="header-inner">

          {/* LOGO */}
          <Link to="/" className="logo">
            Compumundo<strong>hipermegared!</strong> 🍩
          </Link>

          {/* SEARCH (placeholder futuro) */}
          <Form className="search-bar desktop-only" />

          {/* ================= DERECHA ================= */}
          <div className="header-right">

            {/* ===== USUARIO LOGUEADO ===== */}
            {user ? (
              <>
                {/* BUYER: carrito + pedidos */}
                {role === "buyer" && (
                  <>
                    <Link
                      to="/cart"
                      className="header-action position-relative"
                      title="Carrito"
                    >
                      <Cart size={24} />
                      {cartCount > 0 && (
                        <Badge pill bg="danger" className="cart-badge">
                          {cartCount}
                        </Badge>
                      )}
                    </Link>

                    <Link
                      to="/orders"
                      className="header-action"
                      title="Mis pedidos"
                    >
                      <ClockHistory size={22} />
                    </Link>
                  </>
                )}

                {/* INFO USUARIO */}
                <Link to="/profile" className="header-action user-info">
                  <Person size={26} />
                  <div className="user-text">
                    <span className="user-name">
                      Hola, <strong>{user.nombres}</strong>
                    </span>

                    {role === "admin" && (
                      <span className="user-role">
                        Administrador
                      </span>
                    )}
                  </div>
                </Link>

                {/* LOGOUT */}
                <button
                  className="logout-btn header-action"
                  onClick={() => {
                    if (confirm("¿Deseas cerrar sesión?")) {
                      logout();
                    }
                  }}
                >
                  <BoxArrowRight size={26} />
                  <span className="desktop-only">Salir</span>
                </button>
              </>
            ) : (
              /* ===== NO LOGUEADO ===== */
              <>
                <Link to="/login" className="header-action user-info">
                  <Person size={26} />
                  <div className="user-text">
                    <span className="user-name">Hola</span>
                    <strong>Inicia sesión</strong>
                  </div>
                </Link>

                <Link to="/register" className="header-action">
                  Crear cuenta
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ================= MENÚ ================= */}
      <Navbar className="category-menu navbar-expand-md">
        <Container fluid>
          <Nav className="w-100 justify-content-around text-center">
            {(MENUS[role] || MENUS.public).map((item, index) => (
              <Nav.Link
                key={index}
                as={Link}
                to={item.path}
                className="category-item"
              >
                {item.icon}
                <span className="d-none d-md-inline">
                  {" "}{item.label}
                </span>
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
