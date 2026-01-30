// React Router
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

// Páginas protegidas
import CreateUser from "./pages/CreateUser";

// Protección de rutas
import PrivateRoute from "./components/PrivateRoute";

// Contexto global del carrito
import { CartProvider } from "./context/CartContext";

// Estilos globales
import "./App.css";

function App() {
  return (
    // 🔹 Proveedor global del carrito
    // Todo lo que esté dentro puede usar useCart()
    <CartProvider>

      {/* HEADER visible en toda la app */}
      <Header />

      {/* DEFINICIÓN DE RUTAS */}
      <Routes>

        {/* ===== RUTAS PÚBLICAS ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

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
        <Route
          path="/products"
          element={
            <PrivateRoute roles={["admin", "sales", "buyer"]}>
              <Products />
            </PrivateRoute>
          }
        />

      </Routes>

      {/* FOOTER visible en toda la app */}
      <Footer />

    </CartProvider>
  );
}

export default App;
