/**
 * ProductCard.jsx
 * - Representa UN producto
 * - Se reutiliza en el grid
 */

import { Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/ProductsCard.css";


function ProductCard({ product }) {

  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="product-card">

      {/* Imagen */}
      <img src={product.image} alt={product.name} />

      {/* Info */}
      <h5>{product.name}</h5>
      <p>${product.price}</p>

      {/* Botones */}
      <Button
        size="sm"
        onClick={() => addToCart({ ...product, quantity: 1 })}
      >
        Agregar
      </Button>

      <Button
        size="sm"
        variant="primary"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        Comprar
      </Button>
    </div>
  );
}

export default ProductCard;
