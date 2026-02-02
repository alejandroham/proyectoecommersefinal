import { useState } from "react";
import ProductForm from "../components/ProductForm";

function StockAdd() {
  const [showForm, setShowForm] = useState(true);

  return (
    <div className="stock-add">
      <h2>➕ Añadir producto</h2>

      {showForm && (
        <ProductForm
          product={null}               // 👈 CLAVE
          onClose={() => setShowForm(false)}
          onSaved={() => {
            alert("Producto creado correctamente");
          }}
        />
      )}
    </div>
  );
}

export default StockAdd;
