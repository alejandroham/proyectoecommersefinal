import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // ======================
  // CÁLCULOS (CHILE)
  // ======================
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const IVA_RATE = 0.19;
  const SHIPPING_COST = cart.length > 0 ? 5000 : 0;

  const iva = Math.round(subtotal * IVA_RATE);
  const total = subtotal + iva + SHIPPING_COST;

  // ======================
  // COMPRAR
  // ======================
  const handlePurchase = () => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    if (cart.length === 0) return;

    const storageKey = `orders_user_${user.id}`;

    const newOrder = {
      id: Date.now(),
      items: cart,
      subtotal,
      iva,
      shipping: SHIPPING_COST,
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
          PRODUCTOS
      ====================== */}
      <div className="cart-products">
        <h2>Tus productos</h2>

        {cart.length === 0 && <p>El carrito está vacío</p>}

        {cart.map(item => (
          <div key={item.id} className="cart-item">

            {/* IMAGEN CLICKEABLE */}
            <div
              className="cart-item-image clickable"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <img src={item.image} alt={item.name} />
            </div>

            {/* NOMBRE CLICKEABLE */}
            <strong
              className="clickable"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              {item.name}
            </strong>

            <span>
              ${item.price.toLocaleString("es-CL")}
            </span>

            {/* CONTADOR MEJORADO */}
            <div className="cart-item-qty">
              <button
                className="qty-btn minus"
                onClick={() => decreaseQuantity(item.id)}
              >
                −
              </button>

              <span className="qty-number">{item.quantity}</span>

              <button
                className="qty-btn plus"
                onClick={() => increaseQuantity(item.id)}
              >
                +
              </button>
            </div>

            {/* BOTÓN ELIMINAR */}
            <button
              className="delete-btn"
              onClick={() => removeFromCart(item.id)}
            >
              🗑 Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* ======================
          RESUMEN
      ====================== */}
      <div className="cart-summary">
        <h3>Resumen de compra</h3>

        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString("es-CL")}</span>
        </div>

        <div className="summary-row">
          <span>IVA (19%)</span>
          <span>${iva.toLocaleString("es-CL")}</span>
        </div>

        <div className="summary-row">
          <span>Envío</span>
          <span>${SHIPPING_COST.toLocaleString("es-CL")}</span>
        </div>

        <hr />

        <div className="summary-total">
          <strong>Total</strong>
          <strong>${total.toLocaleString("es-CL")}</strong>
        </div>

        <button
          className="checkout-btn"
          onClick={handlePurchase}
          disabled={cart.length === 0}
        >
          Comprar
        </button>
      </div>

      {/* ======================
          POPUPS
      ====================== */}
      {showSuccess && (
        <div className="popup-overlay">
          <div className="popup success">
            <h3>🎉 Compra realizada</h3>
            <p>Gracias por tu compra</p>

            <button onClick={() => navigate("/orders")}>
              Ver mis pedidos
            </button>
          </div>
        </div>
      )}

      {showLoginPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Debes iniciar sesión</h3>
            <p>Para continuar con la compra</p>

            <button onClick={() => navigate("/login")}>
              Iniciar sesión
            </button>

            <button onClick={() => setShowLoginPopup(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
