import * as ProductModel from "./products.model.js";
import { CATEGORIAS_VALIDAS } from "../../utils/categories.js";

/**
 * Normalizar categoría
 */
const normalizarCategoria = (catego) => {
  if (!catego) return null;
  return catego.trim();
};

/**
 * Validar categoría
 */
const validarCategoria = (catego) => {
  const categoria = normalizarCategoria(catego);

  if (!categoria || !CATEGORIAS_VALIDAS.includes(categoria)) {
    const error = new Error("Categoría no válida");
    error.code = "CATEGORIA_INVALIDA";
    throw error;
  }

  return categoria;
};

/**
 * Listar productos
 */
export const listarProductos = async () => {
  return ProductModel.findAll();
};

/**
 * Obtener producto
 */
export const obtenerProducto = async (id) => {
  const product = await ProductModel.findById(id);
  if (!product) {
    const error = new Error("Producto no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }
  return product;
};

/**
 * Crear producto
 */
export const crearProducto = async (data) => {
  const categoria = validarCategoria(data.catego);

  return ProductModel.create({
    nombre: data.nombre?.trim(),
    descripcion: data.descripcion?.trim(),
    image_url: data.image_url?.trim(),
    price: Number(data.price),
    stock: Number(data.stock),
    catego: categoria,
    is_active: data.is_active ?? true
  });
};

/**
 * Actualizar producto
 */
export const actualizarProducto = async (id, data) => {
  if (data.catego) {
    data.catego = validarCategoria(data.catego);
  }

  const product = await ProductModel.update(id, data);
  if (!product) {
    const error = new Error("Producto no encontrado");
    error.code = "NOT_FOUND";
    throw error;
  }

  return product;
};

/**
 * Activar / desactivar producto
 */
export const cambiarEstado = async (id, estado) => {
  await ProductModel.setActive(id, estado);
};

/**
 * Eliminar producto
 */
export const eliminarProducto = async (id) => {
  await ProductModel.remove(id);
};
