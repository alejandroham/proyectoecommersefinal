import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const hasStock = product.stock > 0;

  return (
    <div className={`product-card ${!hasStock ? "out-stock" : ""}`}>

      {/* Imagen */}
      <div
        className="product-image"
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: "pointer" }}
      >
        <img src={product.image} alt={product.name} />
      </div>

      {/* Info */}
      <div className="product-info">
        <h5>{product.name}</h5>

        <p className="product-price">
          ${product.price.toLocaleString("es-CL")}
        </p>

        {/* Stock */}
        <p className={`product-stock ${hasStock ? "ok" : "no"}`}>
          {hasStock ? `Stock disponible (${product.stock})` : "Sin stock"}
        </p>
      </div>

      {/* Botones */}
      <div className="product-actions">
        <button
          className="btn-add"
          disabled={!hasStock}
          onClick={() =>
            hasStock && addToCart({ ...product, quantity: 1 })
          }
        >
          {hasStock ? "🛒 Agregar" : "❌ Sin stock"}
        </button>

        <button
          className="btn-detail"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          👁 Ver detalle
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
