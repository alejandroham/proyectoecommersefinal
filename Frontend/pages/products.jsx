import products from "../data/products";
import ProductCard from "../components/ProductCard";
import Cart from "./cart";
import "../styles/Products.css";
import { useCart } from "../context/CartContext";


//Se limpia código de products debido a que ya no maneja estados por acceso global al contexto de CartContext
function Products(){
  const { addToCart } = useCart();
  return (
    <div className="products-grid">
  {products.map((product) => (
    <div className="product-card" key={product.id}>
      
      {/* Favorito */}
      <button className="fav-btn">♡</button>

      {/* Imagen */}
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      {/* Info */}
      <h4 className="product-title">{product.name}</h4>
      <p className="product-attr">Atributos</p>

      <div className="product-footer">
        <span className="product-price">${product.price}</span>

        <div className="product-actions">
          <button
            className="btn-add"
            onClick={() => addToCart(product)}
          >
            Agregar
          </button>
          <button className="btn-buy">Comprar</button>
        </div>
      </div>
    </div>
  ))}
</div>

  );
}

export default Products;
