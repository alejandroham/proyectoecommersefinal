import * as ProductService from "./products.service.js";

/**
 * Catálogo público (solo activos)
 */
export const getProducts = async (req, res) => {
  try {
    const products = await ProductService.listarProductos();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtener producto por ID
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
 * Crear producto (admin)
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
 * Actualizar producto (admin)
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await ProductService.actualizarProducto(
      req.params.id,
      req.body
    );

    res.json(product); // 🔥 IMPORTANTE: devolver el producto
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Actualizar solo stock (admin)
 */
export const updateStock = async (req, res) => {
  try {
    const { stock } = req.body;

    if (!Number.isInteger(stock) || stock < 0) {
      return res.status(400).json({ error: "Stock inválido" });
    }

    const product = await ProductService.actualizarProducto(
      req.params.id,
      { stock }
    );

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Activar producto (admin)
 */
export const enableProduct = async (req, res) => {
  try {
    const product = await ProductService.actualizarProducto(
      req.params.id,
      { is_active: true }
    );

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Desactivar producto (admin)
 */
export const disableProduct = async (req, res) => {
  try {
    const product = await ProductService.actualizarProducto(
      req.params.id,
      { is_active: false }
    );

    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Categorías válidas
 */
export const getCategorias = (req, res) => {
  res.json([
    "Gaming",
    "Computación",
    "Componentes",
    "Redes",
    "Hogar"
  ]);
};
