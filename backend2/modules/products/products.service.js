import * as ProductModel from "./products.model.js";
import { CATEGORIAS_VALIDAS } from "../../utils/categories.js";

const validarCategoria = (catego) => {
  if (!CATEGORIAS_VALIDAS.includes(catego)) {
    throw new Error("Categoría no válida");
  }
};

export const listarProductos = async () => {
  return ProductModel.findAllActive();
};

export const obtenerProducto = async (id) => {
  const product = await ProductModel.findById(id);
  if (!product) throw new Error("Producto no encontrado");
  return product;
};

export const crearProducto = async (data) => {
  validarCategoria(data.catego);

  return ProductModel.create({
    nombre: data.nombre,
    descripcion: data.descripcion,
    image_url: data.image_url,
    price: data.price,
    stock: data.stock,
    catego: data.catego
  });
};

export const actualizarProducto = async (id, data) => {
  if (data.catego) {
    validarCategoria(data.catego);
  }

  return ProductModel.update(id, {
    ...data,
    updated_at: new Date()
  });
};
