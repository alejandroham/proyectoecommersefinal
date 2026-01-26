import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export function CartProvider({ children}) {
  const [cart, setCart] = useState(() =>{ //estado que contiene los productos del carrito + funcion para modificar el estado

    const savedCart = localStorage.getItem("cart"); //busca en el navegador un valor guardado con la clave "cart", devuelve string o null
    return savedCart ? JSON.parse(savedCart) : []; //si existe se guarda carro, si no, carro vacio
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); //guarda los datos en el navegador, localstorage solo cepta strings
  }, [cart]);

  //agregar producto al carrito
  const addToCart = (product) => {
    const productInCart = cart.find(item => item.id === product.id); //find recorre el array cart y devuelve el elemento que cumpla la condición.

    if (productInCart){ 
      setCart(
        cart.map(item =>  //se ocupa map para recorrer el array y devolver un array nuevo del mismo tamaño, se pueden modificar elementos.
        item.id === product.id
      ? { ...item, quantity: item.quantity +1}
      : item
        )
      );
    } else {
      setCart([... cart, { ...product, quantity: 1}]);
    }
  };

  //eliminar un producto
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id)); //Se ocupa filter dado que busca solo los elementos que se quieren eliminar devolviendo un array mas pequeño o igual
  };

  //incrementar cantidad productos en carro
  const increaseQuantity =(id) => {
  setCart(
    cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1}
        : item
    )
  );
};

//decrementar cantidad productos en carro
const decreaseQuantity = (id) => {
  setCart(
    cart
      .map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1}
          : item
      )
      .filter(item => item.quantity > 0) //si la cantidad baja a 0 el producto se elimina
  );
};

return (
    <CartContext.Provider
    value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
       }}
    >
      
      {children}
      </CartContext.Provider>    
  );
}

export const useCart = () => useContext(CartContext);