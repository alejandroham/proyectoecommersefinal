import { useEffect, useState } from "react";
import "../../styles/components/stockDashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

function StockDashboard() {
  const [stats, setStats] = useState({
    todaySales: 0,
    weekSales: 0,
    yearSales: 0,
    totalOrders: 0,
    topProduct: null,
    lowProduct: null,
    outOfStock: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        // 🔹 Productos (para stock / sin stock)
        const productsRes = await fetch(`${API_URL}/products`);
        const products = await productsRes.json();

        const outOfStock = products.filter(p => p.stock === 0);

        // 🔹 Ventas (si aún no existe la API, fallback)
        let salesData = {
          today: 0,
          week: 0,
          year: 0,
          orders: 0,
          top: null,
          low: null,
        };

        try {
          const salesRes = await fetch(`${API_URL}/orders/stats`);
          if (salesRes.ok) {
            salesData = await salesRes.json();
          }
        } catch {
          // fallback silencioso
        }

        setStats({
          todaySales: salesData.today,
          weekSales: salesData.week,
          yearSales: salesData.year,
          totalOrders: salesData.orders,
          topProduct: salesData.top,
          lowProduct: salesData.low,
          outOfStock,
        });

      } catch (error) {
        console.error("Error cargando dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <p>Cargando dashboard...</p>;
  }

  return (
    <div className="dashboard">

      <h2>📊 Dashboard de Ventas</h2>

      {/* ================= KPIs ================= */}
      <div className="dashboard-cards">
        <div className="card">
          <span>Ventas Hoy</span>
          <strong>${stats.todaySales.toLocaleString()}</strong>
        </div>

        <div className="card">
          <span>Ventas Semana</span>
          <strong>${stats.weekSales.toLocaleString()}</strong>
        </div>

        <div className="card">
          <span>Ventas Año</span>
          <strong>${stats.yearSales.toLocaleString()}</strong>
        </div>

        <div className="card">
          <span>Órdenes</span>
          <strong>{stats.totalOrders}</strong>
        </div>
      </div>

      {/* ================= PRODUCTOS ================= */}
      <div className="dashboard-grid">

        <div className="panel">
          <h4>🔥 Producto más vendido</h4>
          {stats.topProduct ? (
            <p>{stats.topProduct.nombre}</p>
          ) : (
            <p className="muted">Sin datos</p>
          )}
        </div>

        <div className="panel">
          <h4>🐢 Producto menos vendido</h4>
          {stats.lowProduct ? (
            <p>{stats.lowProduct.nombre}</p>
          ) : (
            <p className="muted">Sin datos</p>
          )}
        </div>

        <div className="panel">
          <h4>🚨 Productos sin stock</h4>

          {stats.outOfStock.length === 0 ? (
            <p className="ok">Todos con stock</p>
          ) : (
            <ul>
              {stats.outOfStock.map(p => (
                <li key={p.product_id}>
                  {p.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}

export default StockDashboard;
