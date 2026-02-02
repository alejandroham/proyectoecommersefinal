/**
 * Filters.jsx
 * Filtros:
 * - Categoría (URL)
 * - Precio
 * - Stock
 */

import { useSearchParams } from "react-router-dom";
import "../styles/components/filters.css";

function Filters({ filters, setFilters }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get("cat") || "";

  // ======================
  // CATEGORÍA (URL)
  // ======================
  const handleCategoryChange = (e) => {
    const value = e.target.value;

    if (!value) {
      searchParams.delete("cat");
    } else {
      searchParams.set("cat", value);
    }

    setSearchParams(searchParams);
  };

  // ======================
  // PRECIO
  // ======================
  const handlePriceChange = (e) => {
    setFilters({
      ...filters,
      price: e.target.value,
    });
  };

  // ======================
  // STOCK
  // ======================
  const handleStockChange = (e) => {
    setFilters({
      ...filters,
      stock: e.target.value,
    });
  };

  return (
    <aside className="filters">
      <h4>Filtros</h4>

      {/* CATEGORÍA */}
      <select value={currentCategory} onChange={handleCategoryChange}>
        <option value="">Todas las categorías</option>
        <option value="gaming">Gaming</option>
        <option value="computación">Computación</option>
        <option value="componentes">Componentes</option>
        <option value="redes">Redes</option>
        <option value="hogar">Hogar</option>
      </select>

      {/* PRECIO */}
      <select value={filters.price} onChange={handlePriceChange}>
        <option value="">Precio</option>
        <option value="low">Menos de $500.000</option>
        <option value="mid">$500.000 - $800.000</option>
        <option value="high">Más de $800.000</option>
      </select>

      {/* STOCK */}
      <select value={filters.stock || ""} onChange={handleStockChange}>
        <option value="">Stock</option>
        <option value="in_stock">Con stock</option>
        <option value="out_stock">Sin stock</option>
      </select>
    </aside>
  );
}

export default Filters;
