import { useCart } from "../context/CartContext";
import "../styles/cart.css";

//Se modifica funcion Cart por uso global de CartContext.
function Cart(){ 
    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    } = useCart();

    const total = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );


    return (
  <div className="cart-page">
    {/* COLUMNA IZQUIERDA */}
    <div className="cart-products">
      <h2>Tus Productos</h2>

      {cart.length === 0 && <p>El carrito está vacío</p>}

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-image">
            <div className="cart-item-image">
              <img
                  src={item.image}
                  alt={item.name}
                  className="cart-product-img"
                />
              </div>
            </div>
          <div className="cart-item-info">
            <strong>{item.name}</strong>
            <small>Size: id</small>
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

    {/* COLUMNA DERECHA */}
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

      <button className="checkout-btn">
        Comprar
      </button>
    </div>
  </div>
);
}


export default Cart;