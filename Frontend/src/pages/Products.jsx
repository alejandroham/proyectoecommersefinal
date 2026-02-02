/**
 * Products.jsx
 * - Catálogo principal
 * - Filtro por categoría (?cat)
 * - Filtro por precio
 * - Filtro por stock
 */

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";

const API_URL = import.meta.env.VITE_API_URL;

function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [filters, setFilters] = useState({
    price: "",
    stock: "",
  });

  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("cat");

  // ======================
  // OBTENER PRODUCTOS
  // ======================
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error("Error al obtener productos");

        const data = await res.json();
        const list = Array.isArray(data) ? data : data.products;
        if (!Array.isArray(list)) return;

        const adaptedProducts = list.map((p) => ({
          id: p.product_id,
          name: p.nombre,
          image: p.image_url,
          price: Number(p.price),
          stock: Number(p.stock),
          category: p.catego,
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

    // CATEGORÍA
    if (categoryFromUrl) {
      result = result.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase() === categoryFromUrl.toLowerCase()
      );
    }

    // PRECIO
    if (filters.price === "low") {
      result = result.filter((p) => p.price < 500000);
    }

    if (filters.price === "mid") {
      result = result.filter(
        (p) => p.price >= 500000 && p.price <= 800000
      );
    }

    if (filters.price === "high") {
      result = result.filter((p) => p.price > 800000);
    }

    // STOCK
    if (filters.stock === "in_stock") {
      result = result.filter((p) => p.stock > 0);
    }

    if (filters.stock === "out_stock") {
      result = result.filter((p) => p.stock === 0);
    }

    setFiltered(result);
  }, [filters, products, categoryFromUrl]);

  return (
    <div className="products-layout">
      <Filters filters={filters} setFilters={setFilters} />

      <div className="products-grid">
        {filtered.length === 0 ? (
          <p>No hay productos que coincidan con los filtros</p>
        ) : (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
