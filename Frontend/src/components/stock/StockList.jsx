import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function StockList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error("Error al cargar stock");

        const data = await res.json();

        const adaptedProducts = data.map(p => ({
          id: p.product_id,
          name: p.nombre,
          price: Number(p.price),
          stock: p.stock,
          active: p.is_active
        }));

        setProducts(adaptedProducts);
      } catch {
        setError("No se pudo cargar el stock");
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, []);

  return (
    <>
      <h2>📦 Stock de productos</h2>

      {loading && <p>Cargando stock...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <table className="stock-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price.toLocaleString()}</td>
                <td>{product.stock}</td>
                <td>
                  {product.active ? (
                    <span className="status active">Activo</span>
                  ) : (
                    <span className="status inactive">Inactivo</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default StockList;
