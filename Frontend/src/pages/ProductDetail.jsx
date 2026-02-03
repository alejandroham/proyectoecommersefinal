import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Control del popup
  const [showPopup, setShowPopup] = useState(false);

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

  // ===== LÓGICA DEL BOTÓN =====
  const handleAddToCart = () => {
    if (!user) {
      setShowPopup(true);
      return;
    }

    addToCart({ ...product, quantity: 1 });
  };

  if (loading) return <p className="center">Cargando producto...</p>;
  if (!product) return <p>No encontrado</p>;

  return (
    <div className="product-detail-page theme-aware">

      <div className="product-detail-main theme-aware-card">

        {/* IMAGEN */}
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* INFO */}
        <div className="product-detail-info theme-aware-text">
          <h1 className="theme-title">{product.name}</h1>

          <div className="product-price theme-price">
            ${product.price.toLocaleString()}
          </div>

          <p className="product-stock theme-muted">
            Stock disponible:{" "}
            <strong
              style={{
                color: product.stock > 0 ? "green" : "red",
              }}
            >
              {product.stock > 0 ? product.stock : "Sin stock"}
            </strong>
          </p>

          <p className="product-description theme-muted">
            {product.description}
          </p>

          {/* BOTÓN ÚNICO */}
          <div className="product-actions">
            <button
              className="btn-primary"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              🛒 Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      {/* ===== POPUP SI NO ESTÁ LOGUEADO ===== */}
      {showPopup && (
        <div className="popup-overlay theme-popup-overlay">
          <div className="popup theme-popup">
            <h3>Debes iniciar sesión</h3>
            <p>Para agregar productos al carrito</p>

            <button
              onClick={() => navigate("/login")}
              className="btn-primary"
            >
              Ir a iniciar sesión
            </button>

            <button
              className="btn-secondary"
              onClick={() => setShowPopup(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductDetail;