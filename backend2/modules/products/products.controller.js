import * as ProductService from "./products.service.js";

/**
 * GET /products
 */
export const getProducts = async (req, res) => {
  const products = await ProductService.listarProductos();
  res.json(products);
};

/**
 * GET /products/:id
 */
export const getProduct = async (req, res) => {
  try {
    const product = await ProductService.obtenerProducto(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/**
 * POST /products
 */
export const createProduct = async (req, res) => {
  try {
    const product = await ProductService.crearProducto(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * PUT /products/:id
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await ProductService.actualizarProducto(
      req.params.id,
      req.body
    );
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * PUT /products/:id/enable
 */
export const enableProduct = async (req, res) => {
  await ProductService.cambiarEstado(req.params.id, true);
  res.sendStatus(204);
};

/**
 * PUT /products/:id/disable
 */
export const disableProduct = async (req, res) => {
  await ProductService.cambiarEstado(req.params.id, false);
  res.sendStatus(204);
};

/**
 * DELETE /products/:id
 */
export const deleteProduct = async (req, res) => {
  await ProductService.eliminarProducto(req.params.id);
  res.sendStatus(204);
};

/**
 * GET /products/meta/categories
 */
export const getCategorias = (req, res) => {
  res.json(CATEGORIAS_VALIDAS);
};
