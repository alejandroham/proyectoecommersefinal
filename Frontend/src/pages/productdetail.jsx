import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";


function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://proyectoecommersefinal.onrender.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct({
          id: data.product_id,
          name: data.nombre,
          description: data.descripcion,
          image: data.image_url,
          price: Number(data.price),
          stock: data.stock,
        });
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="center">Cargando producto...</p>;
  if (!product) return <p>No encontrado</p>;

  return (
    <div className="product-detail-page">

      {/* ===== SECCIÓN PRINCIPAL ===== */}
      <div className="product-detail-main">

        {/* IMAGEN */}
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* INFO */}
        <div className="product-detail-info">
          <h1>{product.name}</h1>

          <div className="product-price">
            ${product.price.toLocaleString()}
          </div>

          <p className="product-stock">
            Stock disponible:{" "}
            <strong
              style={{
                color: product.stock > 0 ? "green" : "red",
              }}
            >
              {product.stock > 0 ? product.stock : "Sin stock"}
            </strong>
          </p>

          <p className="product-description">
            {product.description}
          </p>

          {/* BOTONES */}
          <div className="product-actions">
            <button
              className="btn-primary"
              onClick={() => addToCart({ ...product, quantity: 1 })}
            >
              🛒 Agregar al carrito
            </button>

            <button className="btn-secondary">
              ⚡ Comprar ahora
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ProductDetail;
