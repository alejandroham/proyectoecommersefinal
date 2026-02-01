import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/ProductsCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="product-card">

      {/* Imagen */}
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      {/* Info */}
      <div className="product-info">
        <h5>{product.name}</h5>
        <p className="product-price">
          ${product.price.toLocaleString("es-CL")}
        </p>
      </div>

      {/* Botones */}
      <div className="product-actions">
        <button
          className="btn-add"
          onClick={() => addToCart({ ...product, quantity: 1 })}
        >
          🛒 Agregar
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
