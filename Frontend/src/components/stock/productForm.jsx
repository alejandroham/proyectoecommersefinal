import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const CATEGORIAS_VALIDAS = [
  "Gaming",
  "Computación",
  "Componentes",
  "Redes",
  "Hogar"
];

function ProductForm({ product, onSaved }) {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    price: "",
    stock: "",
    image_url: "",
    catego: ""
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // ======================
  // CARGAR PRODUCTO (si se reutiliza)
  // ======================
  useEffect(() => {
    if (product) {
      setForm({
        nombre: product.nombre || "",
        descripcion: product.descripcion || "",
        price: product.price || "",
        stock: product.stock || "",
        image_url: product.image_url || "",
        catego: product.catego || ""
      });
    }
  }, [product]);

  // ======================
  // HANDLE CHANGE
  // ======================
  const handleChange = (e) => {
    setError("");
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ======================
  // VALIDACIONES
  // ======================
  const validate = () => {
    if (!form.nombre.trim()) return "El nombre es obligatorio";
    if (form.nombre.length < 3) return "Nombre muy corto";

    if (!form.descripcion.trim())
      return "La descripción es obligatoria";

    if (!form.price || Number(form.price) <= 0)
      return "Precio inválido";

    if (!Number.isInteger(Number(form.stock)) || Number(form.stock) < 0)
      return "Stock inválido";

    if (
      !form.image_url ||
      !form.image_url.match(
        /^https?:\/\/.+\.(jpg|jpeg|png|webp)(\?.*)?$/i
      )
    )
      return "Imagen debe ser una URL válida (jpg, png, webp)";

    if (!CATEGORIAS_VALIDAS.includes(form.catego))
      return "Categoría no válida";

    return null;
  };

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!token) {
      setError("No autorizado. Inicie sesión nuevamente.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          descripcion: form.descripcion.trim(),
          price: Number(form.price),
          stock: Number(form.stock),
          image_url: form.image_url.trim(),
          catego: form.catego
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error backend");
      }

      onSaved();

      setForm({
        nombre: "",
        descripcion: "",
        price: "",
        stock: "",
        image_url: "",
        catego: ""
      });
    } catch (err) {
      setError(err.message || "Error al crear producto");
    } finally {
      setSaving(false);
    }
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="product-form">
      <h3>Nuevo producto</h3>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
        </label>

        <label>
          Descripción
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
          />
        </label>

        <label>
          Precio
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </label>

        <label>
          Stock
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
          />
        </label>

        <label>
          URL Imagen
          <input
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
          />
        </label>

        {form.image_url && (
          <img
            src={form.image_url}
            alt="preview"
            className="stock-image-preview"
          />
        )}

        <label>
          Categoría
          <select
            name="catego"
            value={form.catego}
            onChange={handleChange}
          >
            <option value="">Seleccione categoría</option>
            {CATEGORIAS_VALIDAS.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-save"
            disabled={saving}
          >
            {saving ? "Guardando..." : "Crear producto"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
