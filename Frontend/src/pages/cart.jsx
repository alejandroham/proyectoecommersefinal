import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Cart() {
  // CONTEXTOS
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  // ESTADOS POPUPS
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // TOTAL
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // COMPRAR
  const handlePurchase = () => {
  // Si no hay usuario
  if (!user) {
    setShowLoginPopup(true);
    return;
  }

  // Si carrito vacío
  if (cart.length === 0) return;

  // 🔑 Clave única por usuario
  const storageKey = `orders_user_${user.id}`;

  const newOrder = {
    id: Date.now(),
    items: cart,
    total,
    created_at: new Date().toISOString(),
  };

  const existingOrders =
    JSON.parse(localStorage.getItem(storageKey)) || [];

  localStorage.setItem(
    storageKey,
    JSON.stringify([...existingOrders, newOrder])
  );

  clearCart();
  setShowSuccess(true);
};


  return (
    <div className="cart-page">
      {/* ======================
          COLUMNA IZQUIERDA
      ====================== */}
      <div className="cart-products">
        <h2>Tus Productos</h2>

        {cart.length === 0 && <p>El carrito está vacío</p>}

        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img
                src={item.image}
                alt={item.name}
                className="cart-product-img"
              />
            </div>

            <div className="cart-item-info">
              <strong>{item.name}</strong>
            </div>

            <div className="cart-item-price">
              ${item.price}
            </div>

            <div className="cart-item-qty">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>

            <div className="cart-item-remove">
              <button onClick={() => removeFromCart(item.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}

        <div className="cart-subtotal">
          Subtotal: <strong>${total}</strong>
        </div>
      </div>

      {/* ======================
          COLUMNA DERECHA
      ====================== */}
      <div className="cart-summary">
        <h3>Summary ({cart.length} item)</h3>

        <div className="summary-row">
          <span>Subtotal</span>
          <span>${total}</span>
        </div>

        <div className="summary-row">
          <span>Shipping</span>
          <span>-</span>
        </div>

        <div className="summary-row">
          <span>Est. Taxes</span>
          <span>-</span>
        </div>

        <hr />

        <div className="summary-total">
          <span>Total</span>
          <span>${total}</span>
        </div>

        <button className="checkout-btn" onClick={handlePurchase}>
          Comprar
        </button>
      </div>

      {/* ======================
          POPUP COMPRA EXITOSA
      ====================== */}
      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup success">
            <h3>🎉 Compra exitosa</h3>
            <p>Gracias por tu compra</p>

            <button
              onClick={() => {
                setShowSuccess(false);
                navigate("/orders");
              }}
            >
              Ver mis pedidos
            </button>
          </div>
        </div>
      )}

      {/* ======================
          POPUP LOGIN
      ====================== */}
      {showLoginPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Debes iniciar sesión</h3>
            <p>Para continuar con la compra</p>

            <button onClick={() => navigate("/login")}>
              Iniciar sesión
            </button>

            <button
              className="secondary"
              onClick={() => setShowLoginPopup(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
