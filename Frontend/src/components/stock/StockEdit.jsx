import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

const API_URL = import.meta.env.VITE_API_URL;

function StockEdit() {
  const { id } = useParams();         //ID del producto (lo trae desde la ruta), carga desde el backend, se adapta a ProductForm, se pasa como product
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      const res = await fetch(`${API_URL}/products/${id}`);
      const data = await res.json();

      setProduct({
        id: data.product_id,
        name: data.nombre,
        description: data.descripcion,
        price: data.price,
        stock: data.stock,
        image: data.image_url,
        category: data.catego
      });

      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;

  return (
    <div className="stock-edit">
      <h2>✏️ Editar producto</h2>

      <ProductForm
        product={product}          //ProductForm recibe el producto, se rellena el formulario, cambia method a PUT, apunta a /product/:id
        onClose={() => navigate(-1)}
        onSaved={() => {
          alert("Producto actualizado");
          navigate(-1);
        }}
      />
    </div>
  );
}

export default StockEdit;
