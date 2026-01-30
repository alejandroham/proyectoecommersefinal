/**
 * Filters.jsx
 * - Maneja los filtros del catálogo
 * - No filtra directamente: solo informa al padre
 */

function Filters({ filters, setFilters }) {

  // Actualiza cualquier filtro dinámicamente
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <aside className="filters">
      <h4>Filtros</h4>

      {/* PRECIO */}
      <select name="price" onChange={handleChange}>
        <option value="">Precio</option>
        <option value="low">Menor a $500.000</option>
        <option value="mid">$500.000 - $800.000</option>
        <option value="high">Mayor a $800.000</option>
      </select>

      {/* MARCA */}
      <select name="brand" onChange={handleChange}>
        <option value="">Marca</option>
        <option value="Lenovo">Lenovo</option>
        <option value="HP">HP</option>
        <option value="Apple">Apple</option>
      </select>

      {/* MEMORIA */}
      <select name="memory" onChange={handleChange}>
        <option value="">Memoria</option>
        <option value="8GB">8GB</option>
        <option value="16GB">16GB</option>
      </select>

      {/* ALMACENAMIENTO */}
      <select name="storage" onChange={handleChange}>
        <option value="">Almacenamiento</option>
        <option value="256GB">256GB</option>
        <option value="512GB">512GB</option>
      </select>
    </aside>
  );
}

export default Filters;
