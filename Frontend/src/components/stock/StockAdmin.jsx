import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function StockAdmin() {
  const { user } = useAuth();

  // ======================
  // ESTADOS
  // ======================
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // ======================
  // SEGURIDAD
  // ======================
  if (!user || user.role !== "admin") {
    return <p>No autorizado</p>;
  }

  // ======================
  // CARGAR PRODUCTOS
  // ======================
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();

      const adapted = data.map(p => ({
        id: p.product_id,
        nombre: p.nombre,
        descripcion: p.descripcion || "",
        image_url: p.image_url || "",
        price: Number(p.price),
        stock: Number(p.stock),
        catego: p.catego,
        is_active: p.is_active
      }));

      setProducts(adapted);
    } catch {
      alert("Error cargando productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ======================
  // GUARDAR CAMBIOS
  // ======================
  const saveProduct = async () => {
    const token = localStorage.getItem("token");

    try {
      setSaving(true);

      const res = await fetch(`${API_URL}/products/${editing.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: editing.nombre,
          descripcion: editing.descripcion,
          image_url: editing.image_url,
          price: Number(editing.price),
          stock: Number(editing.stock),
          catego: editing.catego,
          is_active: editing.is_active
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al guardar");
      }

      setEditing(null);
      loadProducts();

    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // ======================
  // FILTRO BÚSQUEDA
  // ======================
  const filteredProducts = products.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // ======================
  // UI
  // ======================
  return (
    <div className="stock-admin">
      <h2>📦 Administración de Stock</h2>

      <input
        className="stock-search"
        placeholder="Buscar producto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Cargando productos...</p>}

      <table className="stock-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>${p.price.toLocaleString("es-CL")}</td>
              <td>{p.stock}</td>
              <td>{p.catego}</td>
              <td>{p.is_active ? "Activo" : "Inactivo"}</td>
              <td>
                <button onClick={() => setEditing({ ...p })}>
                  ✏️ Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ======================
          MODAL EDICIÓN
      ====================== */}
      {editing && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Editar producto</h3>

            <input
              placeholder="Nombre"
              value={editing.nombre}
              onChange={e =>
                setEditing({ ...editing, nombre: e.target.value })
              }
            />

            <textarea
              placeholder="Descripción"
              value={editing.descripcion}
              onChange={e =>
                setEditing({ ...editing, descripcion: e.target.value })
              }
            />

            <input
              placeholder="URL de imagen"
              value={editing.image_url}
              onChange={e =>
                setEditing({ ...editing, image_url: e.target.value })
              }
            />

            {editing.image_url && (
              <img
                src={editing.image_url}
                alt="preview"
                style={{ width: "100%", marginBottom: 10 }}
              />
            )}

            <input
              type="number"
              placeholder="Precio"
              value={editing.price}
              onChange={e =>
                setEditing({ ...editing, price: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Stock"
              value={editing.stock}
              onChange={e =>
                setEditing({ ...editing, stock: e.target.value })
              }
            />

            {/* 👇 CATEGORÍAS CORRECTAS */}
            <select
              value={editing.catego}
              onChange={e =>
                setEditing({ ...editing, catego: e.target.value })
              }
            >
              
              <option value="Gaming">Gaming</option>
              <option value="Computación">Computación</option>
              <option value="Componentes">Componentes</option>
              <option value="Redes">Redes</option>
              <option value="Hogar">Hogar</option>
            </select>

            <label>
              <input
                type="checkbox"
                checked={editing.is_active}
                onChange={e =>
                  setEditing({ ...editing, is_active: e.target.checked })
                }
              />
              Producto activo
            </label>

            <div className="modal-actions">
              <button onClick={saveProduct} disabled={saving}>
                {saving ? "Guardando..." : "💾 Guardar"}
              </button>
              <button onClick={() => setEditing(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockAdmin;
