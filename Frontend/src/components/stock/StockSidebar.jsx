function StockSidebar({ activeView, setActiveView }) {
  return (
    <aside className="stock-sidebar">
      <h4>Panel</h4>

      <button
        className={activeView === "dashboard" ? "active" : ""}
        onClick={() => setActiveView("dashboard")}
      >
        📊 Dashboard
      </button>

      <button
        className={activeView === "stock" ? "active" : ""}
        onClick={() => setActiveView("stock")}
      >
        📦 Ver stock
      </button>

      <button
        className={activeView === "add" ? "active" : ""}
        onClick={() => setActiveView("add")}
      >
        ➕ Añadir producto
      </button>

      <button
        className={activeView === "edit" ? "active" : ""}
        onClick={() => setActiveView("edit")}
      >
        ✏️ Editar producto
      </button>
    </aside>
  );
}

export default StockSidebar;
