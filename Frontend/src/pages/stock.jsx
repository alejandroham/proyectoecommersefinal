import { useState } from "react";
import "../styles/pages/stock.css";

import StockSidebar from "../components/stock/StockSidebar";
import StockList from "../components/stock/StockList";
import StockDashboard from "../components/stock/StockDashboard";
import StockAdd from "../components/stock/StockAdd";
import StockEdit from "../components/stock/StockEdit";

function Stock() {
  const [activeView, setActiveView] = useState("stock");

  return (
    <div className="stock-layout">
      {/* MENÚ LATERAL */}
      <StockSidebar
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* CONTENIDO */}
      <main className="stock-content">
        {activeView === "dashboard" && <StockDashboard />}
        {activeView === "stock" && <StockList />}
        {activeView === "add" && <StockAdd />}
        {activeView === "edit" && <StockEdit />}
      </main>
    </div>
  );
}

export default Stock;
