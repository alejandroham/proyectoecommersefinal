/**
 * Products.jsx
 * - Vista principal del catálogo
 * - Conecta con backend (Render / Local vía ENV)
 * - Aplica filtros
 * - Renderiza productos
 */

import { useEffect, useState } from "react";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";


const API_URL = import.meta.env.VITE_API_URL;

function Products() {
  // Productos originales desde backend
  const [products, setProducts] = useState([]);

  // Productos filtrados
  const [filtered, setFiltered] = useState([]);

  // Estado de filtros
  const [filters, setFilters] = useState({
    price: "",
    brand: "",
    memory: "",
    storage: ""
  });

  // ======================
  // OBTENER PRODUCTOS
  // ======================
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);

        if (!res.ok) {
          throw new Error("Error al obtener productos");
        }

        const data = await res.json();

        // 🛡️ Protección por si el backend cambia el formato
        const list = Array.isArray(data) ? data : data.products;

        if (!Array.isArray(list)) {
          console.error("Formato inesperado de productos:", data);
          return;
        }

        // Adaptamos al formato del frontend
        const adaptedProducts = list.map(p => ({
          id: p.product_id,
          name: p.nombre,
          image: p.image_url,
          price: Number(p.price),
          stock: p.stock,
          category: p.catego
        }));

        setProducts(adaptedProducts);
        setFiltered(adaptedProducts);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    loadProducts();
  }, []);

  // ======================
  // APLICAR FILTROS
  // ======================
  useEffect(() => {
    let result = [...products];

    if (filters.brand)
      result = result.filter(p => p.brand === filters.brand);

    if (filters.memory)
      result = result.filter(p => p.memory === filters.memory);

    if (filters.storage)
      result = result.filter(p => p.storage === filters.storage);

    if (filters.price === "low")
      result = result.filter(p => p.price < 500000);

    if (filters.price === "mid")
      result = result.filter(
        p => p.price >= 500000 && p.price <= 800000
      );

    if (filters.price === "high")
      result = result.filter(p => p.price > 800000);

    setFiltered(result);
  }, [filters, products]);

  return (
    <div className="products-layout">
      {/* FILTROS LATERALES */}
      <Filters filters={filters} setFilters={setFilters} />

      {/* GRID DE PRODUCTOS */}
      <div className="products-grid">
        {filtered.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
