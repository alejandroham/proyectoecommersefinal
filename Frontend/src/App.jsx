// React
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

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
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

// Contextos globales
import { CartProvider } from "./context/CartContext";




function App() {
  // ==========================
  // TEMA GLOBAL (dark / light)
  // ==========================
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <CartProvider>
      {/* HEADER */}
      <Header theme={theme} setTheme={setTheme} />

      <main>
        <Routes>
          {/* ======================
              RUTAS PÚBLICAS
          ====================== */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}/>

          {/* ======================
              RUTAS PROTEGIDAS
          ====================== */}
          <Route
            path="/createUser"
            element={
              <PrivateRoute roles={["admin"]}>
                <CreateUser />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      {/* FOOTER */}
      <Footer />
    </CartProvider>
  );
}

export default App;
