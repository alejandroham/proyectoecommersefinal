/**
 * Header.jsx
 * COMPORTAMIENTO GENERAL:
 * - El menú de categorías (productos) SIEMPRE es visible.
 * - Si NO hay usuario logueado:
 *    - Se muestra el menú buyer.
 *    - Se muestra el botón "Inicia sesión".
 *    - No se permite acceder a perfil, carrito ni historial.
 *
 */

import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
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
import { MENUS } from "../data/menus";
import { useCart } from "../context/CartContext";
import "../styles/Header.css";
import { useEffect } from "react";


const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.length;    
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") !== "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.body.classList.remove("light", "dark");
    document.body.classList.add(darkMode ? "dark" : "light");
  }, [darkMode]);

  const role = user?.role || "buyer";

  return (
    <>
      {/* TOP BAR */}
      <div className={`top-bar ${darkMode ? "dark" : "light"}`}>
        <span>¡Retira GRATIS tus compras en nuestra tienda!</span>

        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* HEADER PRINCIPAL */}
      <header className={`header-wrapper ${darkMode ? "dark" : "light"}`}>
        <div className="header-inner">
          {/* LOGO */}
          <Link to="/" className="logo">
            Compumundo<strong>hipermegared! </strong> 🍩
          </Link>

          {/* SEARCH (SE RESPETA TU COMENTARIO) */}
          <Form className="search-bar desktop-only">
            {/*
            <FormControl
              type="search"
              placeholder="Busca los mejores productos y marcas :)"
            />
            <Button variant="primary">
              <Search />
            </Button>
            */}
          </Form>

          {/* ACTIONS */}
          <Nav className="header-actions">

            {/* CARRITO*/}
            {user && (
              <Nav.Link
                as={Link}
                to="/cart"
                className="header-action position-relative"
                title="Ver carrito"
              >
                <Cart size={26} />
                {cartCount > 0 && (
                  <Badge pill bg="danger" className="cart-badge">
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>
            )}

            {/* LOGIN / MI CUENTA */}
            <Nav.Link
    as={Link}
    to={user ? "/profile" : "/login"}
    className="header-action user-block"
  >
    <Person size={28} />

    <div className="user-text desktop-only">
      <small className="user-greeting">Hola{user && ","}</small>

      {user && (
        <span className="user-name">{user.nombres}</span>
      )}

      <strong className="account-text">
        {user ? "Mi cuenta" : "Inicia sesión"}
      </strong>
    </div>
  </Nav.Link>
            {/* HISTORIAL (SOLO LOGUEADO) */}
            {user  && (
              <Nav.Link
                as={Link}
                to="/orders"
                className="header-action desktop-only"
              >
                <ClockHistory size={22} />
              </Nav.Link>
            )}

            {/* LOGOUT (SOLO LOGUEADO) */}
            {user && (
              <button
                className="logout-btn header-action"
                onClick={() => {
                  if (confirm("¿Deseas cerrar sesión?")) logout();
                }}
              >
                <BoxArrowRight size={30} />
                <span className="desktop-only">Salir</span>
              </button>
            )}
          </Nav>
        </div>
      </header>

      {/* CATEGORY MENU (SIEMPRE VISIBLE) */}
      <Navbar className="category-menu navbar-expand-md navbar-light">
        <Container fluid>
          <Nav className="w-100 justify-content-around text-center">
            {MENUS[role].map((item, index) => (
              <Nav.Link
                key={index}
                as={Link}
                to={item.path}
                className="category-item"
              >
                {item.icon}
                <span className="d-none d-md-inline"> {item.label}</span>
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
