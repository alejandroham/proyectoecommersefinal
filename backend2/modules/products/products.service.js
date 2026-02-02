import * as ProductModel from "./products.model.js";
import { CATEGORIAS_VALIDAS } from "../../utils/categories.js";

// Validar categoría
const validarCategoria = (catego) => {
  if (!CATEGORIAS_VALIDAS.includes(catego)) {
    throw new Error("Categoría no válida");
  }
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
  if (!product) throw new Error("Producto no encontrado");
  return product;
};

/**
 * Crear producto
 */
export const crearProducto = async (data) => {
  validarCategoria(data.catego);

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
  if (data.catego) validarCategoria(data.catego);

  const product = await ProductModel.update(id, data);
  if (!product) throw new Error("Producto no encontrado");

  return product;
};

/**
 * Activar / desactivar
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
