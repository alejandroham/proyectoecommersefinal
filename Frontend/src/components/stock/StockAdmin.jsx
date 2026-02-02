import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { CATEGORIAS_VALIDAS } from "../../utils/categories";

const API_URL = import.meta.env.VITE_API_URL;

// Normalización defensiva (igual que backend)
const normalize = (str) =>
  str
    ?.trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

function StockAdmin() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState(null);

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

      setProducts(
        data.map(p => ({
          ...p,
          price: Number(p.price),
          stock: Number(p.stock),
        }))
      );
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
  // EDITAR INLINE
  // ======================
  const handleChange = (id, field, value) => {
    setProducts(prev =>
      prev.map(p =>
        p.product_id === id ? { ...p, [field]: value } : p
      )
    );
  };

  // ======================
  // GUARDAR
  // ======================
  const saveProduct = async (product) => {
    const token = localStorage.getItem("token");
    setSavingId(product.product_id);

    try {
      // 🔑 asegurar categoría canónica
      const normalized = normalize(product.catego);
      const index = CATEGORIAS_VALIDAS
        .map(normalize)
        .indexOf(normalized);

      if (index === -1) {
        throw new Error("Categoría no válida");
      }

      const categoriaCanonica = CATEGORIAS_VALIDAS[index];

      const res = await fetch(
        `${API_URL}/products/${product.product_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombre: product.nombre.trim(),
            descripcion: product.descripcion?.trim(),
            image_url: product.image_url?.trim(),
            price: Number(product.price),
            stock: Number(product.stock),
            catego: categoriaCanonica, // 👈 SIEMPRE válida
            is_active: product.is_active,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al guardar");
      }

      const updated = await res.json();

      setProducts(prev =>
        prev.map(p =>
          p.product_id === updated.product_id ? updated : p
        )
      );

      setEditingId(null);
      setOriginalProduct(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setSavingId(null);
    }
  };

  // ======================
  // CANCELAR (RESTABLECE)
  // ======================
  const cancelEdit = () => {
    if (!originalProduct) return;

    setProducts(prev =>
      prev.map(p =>
        p.product_id === originalProduct.product_id
          ? originalProduct
          : p
      )
    );

    setEditingId(null);
    setOriginalProduct(null);
  };

  // ======================
  // FILTRO
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
        onChange={e => setSearch(e.target.value)}
      />

      {loading && <p>Cargando productos...</p>}

      <table className="stock-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map(p => {
            const editing = editingId === p.product_id;

            return (
              <tr key={p.product_id}>
                <td>
                  {editing ? (
                    <div className="image-edit">
                      <input
                        type="text"
                        value={p.image_url || ""}
                        onChange={e =>
                          handleChange(
                            p.product_id,
                            "image_url",
                            e.target.value
                          )
                        }
                      />
                      {p.image_url && (
                        <img
                          src={p.image_url}
                          alt={p.nombre}
                          className="stock-image-preview"
                        />
                      )}
                    </div>
                  ) : p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.nombre}
                      className="stock-image"
                    />
                  ) : (
                    "—"
                  )}
                </td>

                <td>
                  {editing ? (
                    <input
                      value={p.nombre}
                      onChange={e =>
                        handleChange(
                          p.product_id,
                          "nombre",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    p.nombre
                  )}
                </td>

                <td>
                  {editing ? (
                    <input
                      type="number"
                      value={p.price}
                      onChange={e =>
                        handleChange(
                          p.product_id,
                          "price",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    `$${p.price.toLocaleString("es-CL")}`
                  )}
                </td>

                <td>
                  {editing ? (
                    <input
                      type="number"
                      value={p.stock}
                      onChange={e =>
                        handleChange(
                          p.product_id,
                          "stock",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    p.stock
                  )}
                </td>

                <td>
                  {editing ? (
                    <select
                      value={p.catego}
                      onChange={e =>
                        handleChange(
                          p.product_id,
                          "catego",
                          e.target.value
                        )
                      }
                    >
                      {CATEGORIAS_VALIDAS.map(cat => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  ) : (
                    p.catego
                  )}
                </td>

                <td className="center">
                  {editing ? (
                    <input
                      type="checkbox"
                      checked={p.is_active}
                      onChange={e =>
                        handleChange(
                          p.product_id,
                          "is_active",
                          e.target.checked
                        )
                      }
                    />
                  ) : p.is_active ? (
                    "✔"
                  ) : (
                    "✖"
                  )}
                </td>

                <td className="actions">
                  {editing ? (
                    <>
                      <button
                        className="btn btn-save"
                        onClick={() => saveProduct(p)}
                        disabled={savingId === p.product_id}
                      >
                        Guardar
                      </button>
                      <button
                        className="btn btn-cancel"
                        onClick={cancelEdit}
                        disabled={savingId === p.product_id}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-edit"
                      onClick={() => {
                        setOriginalProduct({ ...p });
                        setEditingId(p.product_id);
                      }}
                    >
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StockAdmin;
