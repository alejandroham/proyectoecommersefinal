import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function ProductDetail() {
  const { id } = useParams(); // id del producto
  const navigate = useNavigate();

  const { addToCart, clearCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // 🔹 Obtener producto desde backend
  useEffect(() => {
    fetch(`http://localhost:5432/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Cargando producto...</p>;

  // 🛒 Agregar al carrito
  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: qty,
    });
  };

  // 💳 Comprar ahora
  const handleBuyNow = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    clearCart();
    setShowSuccess(true);
  };

  return (
    <div className="product-detail-container">
      <div className="product-left">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-right">
        <h2>{product.name}</h2>
        <p>${product.price}</p>

        <label>Cantidad</label>
        <select value={qty} onChange={e => setQty(Number(e.target.value))}>
          {[1,2,3,4,5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <Button className="w-100 mt-3" onClick={handleAddToCart}>
          AGREGAR AL CARRITO
        </Button>

        <Button
          variant="primary"
          className="w-100 mt-2"
          onClick={handleBuyNow}
        >
          COMPRAR AHORA
        </Button>
      </div>

      {/* ✅ POPUP COMPRA EXITOSA */}
      <Modal show={showSuccess} centered>
        <Modal.Header>
          <Modal.Title>🎉 Compra exitosa</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Tu compra se realizó correctamente.</p>
          <p>¡Gracias por confiar en nosotros!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowSuccess(false)}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 🔐 POPUP LOGIN */}
      <Modal show={showLogin} centered>
        <Modal.Header>
          <Modal.Title>Inicia sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Debes iniciar sesión para continuar</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => navigate("/login")}>
            Iniciar sesión
          </Button>
          <Button variant="secondary" onClick={() => navigate("/register")}>
            Crear cuenta
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductDetail;
