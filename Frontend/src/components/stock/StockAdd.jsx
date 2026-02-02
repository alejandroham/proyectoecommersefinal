import ProductForm from "./ProductForm";

function StockAdd() {
  return (
    <div className="stock-add">
      <h2>➕ Añadir producto</h2>

      <ProductForm
        product={null}
        onSaved={() => {
          alert("Producto creado correctamente");
        }}
      />
    </div>
  );
}

export default StockAdd;
