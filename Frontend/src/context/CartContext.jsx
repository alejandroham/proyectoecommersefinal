import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {

  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  const cartKey = user ? `cart_user_${user.id}` : "cart_guest";

  // Cargar carrito del usuario
  useEffect(() => {
    if (user) {
      const storedCart = localStorage.getItem(cartKey);
      setCart(storedCart ? JSON.parse(storedCart) : []);
    } else {
      setCart([]);
    }
  }, [user]);

  // Guardar carrito por usuario
  useEffect(() => {
    if (user) {
      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }, [cart, user]);

  // FUNCIONES
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart(prev =>
      prev.map(p =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(prev =>
      prev.map(p =>
        p.id === id && p.quantity > 1
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
