import { useEffect, useState } from "react";
import ProductForm from "../components/productForm";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function AdminProducts() {
  const { token } = useAuth();

  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  
  // Cargar productos
  
  const loadProducts = async () => {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();

    const list = Array.isArray(data) ? data : data.products;

    setProducts(
      list.map(p => ({
        id: p.product_id,
        name: p.nombre,
        description: p.descripcion,
        image: p.image_url,
        price: Number(p.price),
        stock: p.stock,
        category: p.catego,
        active: p.estado === 1 // desactivado y no eliminacion directa
      }))
    );
  };

  useEffect(() => {
    loadProducts();
  }, []);

  
  //Crear / Editar
  
  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = product => {
    setEditing(product);
    setShowForm(true);
  };

  
  // Manejo de activar/desactivar para no eliminar directo en la BD
  
  const disableProduct = async (id) => {
    if (!confirm("¿Desactivar este producto?")) return;

    await fetch(`${API_URL}/products/${id}/disable`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    loadProducts();
  };

  const enableProduct = async (id) => {
    await fetch(`${API_URL}/products/${id}/enable`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    loadProducts();
  };

  return (
    <div className="admin-products">
      <h1>Administrar Productos</h1>

      <button onClick={openCreate}>➕ Agregar producto</button>

      {showForm && (
        <ProductForm
          product={editing}
          onClose={() => setShowForm(false)}
          onSaved={loadProducts}
        />
      )}

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>${p.price.toLocaleString("es-CL")}</td>
              <td>{p.stock}</td>
              <td>{p.active ? "Activo" : "Inactivo"}</td>

              <td>
                <button onClick={() => openEdit(p)}>
                  ✏️ Editar
                </button>

                {p.active ? (
                  <button
                    onClick={() => disableProduct(p.id)}
                    style={{ color: "red", marginLeft: 8 }}
                  >
                    🚫 Desactivar
                  </button>
                ) : (
                  <button
                    onClick={() => enableProduct(p.id)}
                    style={{ color: "green", marginLeft: 8 }}
                  >
                    ✅ Activar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
