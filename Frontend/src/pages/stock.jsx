import { useState } from "react";
import "../styles/pages/stock.css";
import StockSidebar from "../components/stock/StockSidebar";
import StockList from "../components/stock/StockList";
import StockDashboard from "../components/stock/StockDashboard";

function Stock() {
  const [activeView, setActiveView] = useState("stock");

  return (
    <div className="stock-layout">

      <StockSidebar setActiveView={setActiveView} />

      <main className="stock-content">

        {activeView === "dashboard" && <StockDashboard />}

        {activeView === "stock" && <StockList />}

        {activeView === "add" && (
          <h2>Añadir producto (pendiente)</h2>
        )}

        {activeView === "edit" && (
          <h2>Editar producto (pendiente)</h2>
        )}

      </main>
    </div>
  );
}

export default Stock;
