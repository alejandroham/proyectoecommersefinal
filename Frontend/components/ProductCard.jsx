import { useCart } from "../context/CartContext"; //se agrega import de carrito global.
import "../styles/ProductsCard.css";


//Se limpia ProductCard utilizando contexto global de carrito.
function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { name, price, description, image} = product;

    return (
        <div className="card">
            <img src={image} alt={name} className="card-img"/>

            <div className="card-body">
                <h3>{name}</h3>
                <p className="description">{description}</p>
                <p className="price">${price}</p>


        <button onClick={() => addToCart(product)}>
             Agregar al carrito
        </button>   
       </div>
     </div>     
    );
}

export default ProductCard;