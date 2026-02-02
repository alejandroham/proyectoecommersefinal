import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";


function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const storageKey = `orders_user_${user.id}`;
    const storedOrders =
      JSON.parse(localStorage.getItem(storageKey)) || [];

    setOrders(storedOrders);
  }, [user]);

  if (!user) {
    return <p className="center">Debes iniciar sesión</p>;
  }

  return (
    <div className="orders-page">
      <h2>📦 Mis pedidos</h2>

      {orders.length === 0 ? (
        <p>No tienes pedidos aún</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span>
                <strong>Pedido #{order.id}</strong>
              </span>
              <span>
                {new Date(order.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} × ${item.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="order-total">
              Total: <strong>${order.total}</strong>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
