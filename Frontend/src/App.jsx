import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import CreateUser from "./pages/CreateUser";
import Stock from "./pages/Stock";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import { CartProvider } from "./context/CartContext";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <CartProvider>

      {/* 🔹 CONTENEDOR GLOBAL PARA QUE EL FOOTER Y EL FONDO FUNCIONEN BIEN */}
      <div className="app-container">

        {/* HEADER */}
        <Header theme={theme} setTheme={setTheme} />

        {/* CONTENIDO PRINCIPAL */}
        <main className="main-container">
          <Routes>

            {/* ===== RUTAS PÚBLICAS ===== */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            {/* ===== RUTAS PROTEGIDAS ===== */}
            <Route
              path="/createUser"
              element={
                <PrivateRoute roles={["admin"]}>
                  <CreateUser />
                </PrivateRoute>
              }
            />

            <Route
              path="/stock"
              element={
                <PrivateRoute roles={["admin"]}>
                  <Stock />
                </PrivateRoute>
              }
            />

          </Routes>
        </main>

        {/* FOOTER */}
        <Footer />

      </div>

    </CartProvider>
  );
}

export default App;
