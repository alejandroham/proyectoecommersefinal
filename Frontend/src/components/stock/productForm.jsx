import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function ProductForm({ product, onClose, onSaved }) {
  const { token } = useAuth();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    price: "",
    stock: "",
    image_url: "",
    catego: ""
  });

  const [error, setError] = useState("");


  // Cargar producto al editar
  
  useEffect(() => {
    if (product) {
      setForm({
        nombre: product.name || "",
        descripcion: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        image_url: product.image || "",
        catego: product.category || ""
      });
    }
  }, [product]);

  
  // Limpiar cuando el usuario corrige
  
  const handleChange = (e) => {
  setError("");
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
};


  
  // Validaciones
  
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
      !form.image_url.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i)
    )
      return "Imagen debe ser una URL válida (jpg, png, webp)";

    if (!form.catego) return "Seleccione una categoría";

    return null;
  };

  
  // submit
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const method = product ? "PUT" : "POST";
    const url = product
      ? `${API_URL}/products/${product.id}`
      : `${API_URL}/products`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
})

    });

    if (!res.ok) {
      setError("Error al guardar producto");
      return;
    }

    onSaved();
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">

        <h2>
          {product ? "Editar producto" : "Nuevo producto"}
        </h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>

          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
          />

          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Precio"
            value={form.price}
            onChange={handleChange}
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
          />

          <input
            name="image_url"
            placeholder="URL de imagen"
            value={form.image_url}
            onChange={handleChange}
          />

          <select
            name="catego"
            value={form.catego}
            onChange={handleChange}
          >
            <option value="">Seleccione categoría</option>
            <option value="Gaming">Gaming</option>
            <option value="computación">computación</option>
            <option value="componentes">componentes</option>
            <option value="redes">redes</option>
            <option value="Hogar">Hogar</option>
          </select>

          <div className="modal-actions">
            <button type="submit">
              {product ? "Guardar cambios" : "Crear producto"}
            </button>

            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
