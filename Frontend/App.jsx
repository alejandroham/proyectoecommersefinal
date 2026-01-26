import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Products from './pages/products'
import Cart from "./pages/Cart";
import CreateUser from "./pages/CreateUser";
import PrivateRoute from "./components/PrivateRoute";
import { CartProvider } from "./context/CartContext"; //Se importa context de carrito para uso global
import "./App.css";

function App() {
  return (
    <CartProvider> 
      <Header />

      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        {/* REGISTRO SOLO ADMIN */}
        <Route
          path="/createUser"
          element={
            <PrivateRoute roles={["admin"]}>
              <CreateUser />
            </PrivateRoute>
          }
        />

        {/* PRODUCTOS (ADMIN / SALES / BUYER) */}
        <Route
          path="/products"
          element={
            <PrivateRoute roles={["admin", "sales", "buyer"]}>
              <Products />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
      </CartProvider>   
  );
}

export default App;
