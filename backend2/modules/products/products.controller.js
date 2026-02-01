import * as ProductService from "./products.service.js";

export const getProducts = async (req, res) => {
  const products = await ProductService.listarProductos();
  res.json(products);
};

export const getProduct = async (req, res) => {
  const product = await ProductService.obtenerProducto(req.params.id);
  res.json(product);
};

export const createProduct = async (req, res) => {
  try {
    const product = await ProductService.crearProducto(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  await ProductService.actualizarProducto(
    req.params.id,
    req.body,
    req.usuario
  );
  res.sendStatus(204);
};

export const updateStock = async (req, res) => {
  const { stock } = req.body;

  if (!Number.isInteger(stock) || stock < 0) {
    return res.status(400).json({ message: "Stock inválido" });
  }

  await ProductService.actualizarProducto(
    req.params.id,
    { stock },
    req.usuario
  );

  res.sendStatus(204);
};


export const enableProduct = async (req, res) => {
  await ProductService.cambiarEstado(req.params.id, 1);
  res.sendStatus(204);
};

export const disableProduct = async (req, res) => {
  await ProductService.cambiarEstado(req.params.id, 0);
  res.sendStatus(204);
};

export const deleteProduct = async (req, res) => {
  await ProductService.eliminarProducto(req.params.id);
  res.sendStatus(204);
};

export const getCategorias = (req, res) => {
  res.json(["Notebook", "Tablets", "Telefonia"]);
};
