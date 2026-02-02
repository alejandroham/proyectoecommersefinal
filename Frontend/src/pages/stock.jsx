import { useEffect, useState } from "react";
import "../styles/pages/stock.css";

function Stock() {

  // Controla qué vista se muestra
  const [activeView, setActiveView] = useState("stock");

  // Estados usados SOLO para ver stock
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ===============================
  // FETCH STOCK (YA FUNCIONAL)
  // ===============================
  useEffect(() => {
    if (activeView !== "stock") return;

    const fetchStock = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://proyectoecommersefinal.onrender.com/products"
        );

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

      } catch (err) {
        setError("No se pudo cargar el stock");
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, [activeView]);

  return (
    <div className="stock-layout">

      {/* ===============================
          MENÚ LATERAL
      =============================== */}
      <aside className="stock-sidebar">
        <h4>Panel</h4>

        <button onClick={() => setActiveView("dashboard")}>
          📊 Dashboard
        </button>

        <button onClick={() => setActiveView("stock")}>
          📦 Ver stock
        </button>

        <button onClick={() => setActiveView("add")}>
          ➕ Añadir producto
        </button>

        <button onClick={() => setActiveView("edit")}>
          ✏️ Editar producto
        </button>
      </aside>

      {/* ===============================
          CONTENIDO PRINCIPAL
      =============================== */}
      <main className="stock-content">

        {activeView === "dashboard" && (
          <>
            {/* ZONA PARA EL DASHBOARD
                PEGAR AQUÍ el código del Dashboard
                NO modificar el condicional
                SI ROMPES ALGO TE MATO
            */}
            <h2>Dashboard (en construcción)</h2>
          </>
        )}

        {activeView === "stock" && (
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
        )}

        {activeView === "add" && (
          <>
            {/* ZONA PARA AÑADIR PRODUCTO
                PEGAR AQUÍ el formulario de añadir producto
                 NO borrar el condicional
                 SI ROMPES ALGO TE MATO
            */}
            <h2>Añadir producto (solo vista)</h2>
          </>
        )}

        {activeView === "edit" && (
          <>
            {/* ZONA PARA EDITAR PRODUCTOS
                PEGAR AQUÍ el formulario de edición
                NO borrar el condicional
                SI ROMPES ALGO TE MATO
            */}
            <h2>Editar producto (solo vista)</h2>
          </>
        )}

      </main>
    </div>
  );
}

export default Stock;