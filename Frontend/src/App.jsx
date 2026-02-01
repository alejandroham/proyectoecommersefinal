// React Router
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// Layout
import Header from "./components/Header";
import Footer from "./components/Footer";

// Páginas públicas
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Products from "./pages/products";
import ProductDetail from "./pages/productdetail";
import Cart from "./pages/cart";
import Orders from "./pages/orders";

// Páginas protegidas
import CreateUser from "./pages/CreateUser";

// Protección de rutas
import PrivateRoute from "./components/PrivateRoute";

// Contexto global del carrito
import { CartProvider } from "./context/CartContext";

// Estilos globales
import "./App.css";

function App() {
  // ===== TEMA GLOBAL (dark / light) =====
const [theme, setTheme] = useState(
  localStorage.getItem("theme") || "dark"
);

useEffect(() => {
  document.body.classList.remove("dark", "light");
  document.body.classList.add(theme);
  localStorage.setItem("theme", theme);
}, [theme]);
  return (
    // 🔹 Proveedor global del carrito
    <CartProvider>

      {/* HEADER visible en toda la app */}
      <Header theme={theme} setTheme={setTheme}/>
      
      <main>
        <Routes>

          {/* ===== RUTAS PÚBLICAS ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/orders" element={<Orders />} />

          {/* Detalle de producto dinámico */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* ===== RUTAS PROTEGIDAS ===== */}

          {/* Solo ADMIN puede crear usuarios */}
          <Route
            path="/createUser"
            element={
              <PrivateRoute roles={["admin"]}>
                <CreateUser />
              </PrivateRoute>
            }
          />

          {/* Productos (admin / sales / buyer) */}
          <Route path="/products" element={<Products />} />

        </Routes>
      </main>

      {/* FOOTER visible en toda la app */}
      <Footer />

    </CartProvider>
  );
}

export default App;
