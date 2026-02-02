import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function StockDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/orders/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error("No se pudo cargar el dashboard");
        }

        const data = await res.json();
        setStats(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Cargando dashboard...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="dashboard-grid">

      {/* Ventas */}
      <div className="dashboard-card">
        <h4>💰 Ventas Hoy</h4>
        <p>${stats.today.toLocaleString()}</p>
      </div>

      <div className="dashboard-card">
        <h4>📅 Últimos 7 días</h4>
        <p>${stats.week.toLocaleString()}</p>
      </div>

      <div className="dashboard-card">
        <h4>📈 Último año</h4>
        <p>${stats.year.toLocaleString()}</p>
      </div>

      {/* Productos */}
      <div className="dashboard-card">
        <h4>🔥 Más vendido</h4>
        {stats.topProduct ? (
          <p>
            {stats.topProduct.nombre} ({stats.topProduct.vendidos})
          </p>
        ) : (
          <p>Sin datos</p>
        )}
      </div>

      <div className="dashboard-card">
        <h4>🐢 Menos vendido</h4>
        {stats.lowProduct ? (
          <p>
            {stats.lowProduct.nombre} ({stats.lowProduct.vendidos})
          </p>
        ) : (
          <p>Sin datos</p>
        )}
      </div>

      <div className="dashboard-card">
        <h4>❌ Sin stock</h4>
        {stats.outOfStock.length === 0 ? (
          <p>Todos con stock</p>
        ) : (
          <ul>
            {stats.outOfStock.map(p => (
              <li key={p.product_id}>{p.nombre}</li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

export default StockDashboard;
