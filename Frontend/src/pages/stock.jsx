import { useState } from "react";
import "../styles/pages/stock.css";
import StockSidebar from "../components/stock/StockSidebar";
import StockList from "../components/stock/StockList";
import StockDashboard from "../components/stock/StockDashboard";
import StockAdd from "../components/stock/StockAdd";
import StockEdit from "../components/stock/StockEdit";
import StockAdmin from "../components/stock/StockAdmin";

function Stock() {
  const [activeView, setActiveView] = useState("stock");

  return (
    <div className="stock-layout">

      <StockSidebar setActiveView={setActiveView} />

      <main className="stock-content">

        {activeView === "dashboard" && <StockDashboard />}

        {activeView === "stock" && <StockList />}

        {activeView === "add" && <StockAdd />}

        {activeView === "edit" && <StockEdit />}

        {activeView === "admin" && <StockAdmin />}

      </main>
    </div>
  );
}

export default Stock;
