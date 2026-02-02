import * as ProductModel from "./products.model.js";
import { CATEGORIAS_VALIDAS } from "../../utils/categories.js";

/**
 * Validar categoría
 */
const validarCategoria = (catego) => {
  if (!CATEGORIAS_VALIDAS.includes(catego)) {
    throw new Error("Categoría no válida");
  }
};

/**
 * Listado público (solo activos)
 */
export const listarProductos = async () => {
  return ProductModel.findAllActive();
};

/**
 * Listado admin (todos)
 */
export const listarProductosAdmin = async () => {
  return ProductModel.findAll(); // 👉 debes tener esta función en el model
};

/**
 * Obtener producto por ID
 */
export const obtenerProducto = async (id) => {
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new Error("Producto no encontrado");
  }
  return product;
};

/**
 * Crear producto
 */
export const crearProducto = async (data) => {
  validarCategoria(data.catego);

  if (data.price <= 0) {
    throw new Error("Precio inválido");
  }

  if (data.stock < 0) {
    throw new Error("Stock inválido");
  }

  return ProductModel.create({
    nombre: data.nombre,
    descripcion: data.descripcion,
    image_url: data.image_url,
    price: data.price,
    stock: data.stock,
    catego: data.catego,
    is_active: data.is_active ?? true
  });
};

/**
 * Actualizar producto
 */
export const actualizarProducto = async (id, data) => {
  if (data.catego) {
    validarCategoria(data.catego);
  }

  if (data.price !== undefined && data.price <= 0) {
    throw new Error("Precio inválido");
  }

  if (data.stock !== undefined && data.stock < 0) {
    throw new Error("Stock inválido");
  }

  // 🧼 Payload limpio
  const payload = {
    nombre: data.nombre,
    descripcion: data.descripcion,
    image_url: data.image_url,
    price: data.price,
    stock: data.stock,
    catego: data.catego,
    is_active: data.is_active
  };

  return ProductModel.update(id, payload);
};
