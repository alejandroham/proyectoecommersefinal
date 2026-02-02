import { OrdersModel } from "./orders.model.js";
import { OrderItemsModel } from "./orderItems.model.js";
import * as ProductModel from "../products/products.model.js";
import { pool } from "../../config/database.js";

// Estados permitidos para una orden
const ESTADOS_VALIDOS = [
  "CARRITO",
  "CREADA",
  "PAGADA",
  "CANCELADA",
  "ENVIADA",
  "COMPLETADA"
];

/**
 * Obtiene el carrito activo del usuario
 * Si no existe, lo crea automáticamente
 */
export const getCart = async (user_id) => {
  if (!user_id) throw new Error("Usuario no autenticado");

  let cart = await OrdersModel.getActiveCartByUser(user_id);

  // Crear carrito si no existe
  if (!cart) {
    cart = await OrdersModel.createCart(user_id);
  }

  const items = await OrderItemsModel.getByOrder(cart.orden_id);
  const total = await OrderItemsModel.calcTotal(cart.orden_id);

  // Actualiza total del carrito
  await OrdersModel.updateTotal(cart.orden_id, total);

  return {
    ...cart,
    items,
    total
  };
};

/**
 * Agrega un producto al carrito
 */
export const addToCart = async (user_id, product_id) => {
  if (!user_id) throw new Error("Usuario no autenticado");
  if (!product_id) throw new Error("Producto requerido");

  let cart = await OrdersModel.getActiveCartByUser(user_id);

  // Crear carrito si no existe
  if (!cart) {
    cart = await OrdersModel.createCart(user_id);
  }

  if (cart.status !== "CARRITO") {
    throw new Error("El pedido ya fue enviado a pago");
  }

  const product = await ProductModel.findById(product_id);

  // Validar producto activo
  if (!product || !product.is_active) {
    throw new Error("Producto no disponible");
  }

  await OrderItemsModel.addItem(
    cart.orden_id,
    product.product_id,
    1,
    product.price
  );

  return { ok: true };
};

/**
 * Actualiza la cantidad de un ítem
 */
export const updateItemQty = async (user_id, item_id, qty) => {
  if (!user_id) throw new Error("Usuario no autenticado");
  if (qty <= 0) throw new Error("Cantidad inválida");

  const cart = await OrdersModel.getActiveCartByUser(user_id);

  if (!cart || cart.status !== "CARRITO") {
    throw new Error("El pedido ya fue enviado a pago");
  }

  await OrderItemsModel.updateQty(item_id, qty);
};

/**
 * Elimina un ítem del carrito
 */
export const removeItem = async (user_id, item_id) => {
  if (!user_id) throw new Error("Usuario no autenticado");

  const cart = await OrdersModel.getActiveCartByUser(user_id);

  if (!cart || cart.status !== "CARRITO") {
    throw new Error("El pedido ya fue enviado a pago");
  }

  await OrderItemsModel.removeItem(item_id);
};

/**
 * Cambia el estado de una orden (admin)
 */
export const changeStatus = async (orderId, nuevoEstado) => {
  if (!ESTADOS_VALIDOS.includes(nuevoEstado)) {
    throw new Error("Estado no válido");
  }

  await OrdersModel.updateStatus(orderId, nuevoEstado);
};

/**
 * Obtiene las órdenes del usuario autenticado
 */
export const getMyOrders = async (user_id) => {
  if (!user_id) throw new Error("Usuario no autenticado");
  return OrdersModel.getByUser(user_id);
};

/**
 * Obtiene todas las órdenes (admin)
 */
export const getAllOrders = async () => {
  return OrdersModel.getAll();
};

/**
 * Checkout del carrito
 */
export const checkout = async (user_id, shippingData) => {
  if (!user_id) throw new Error("Usuario no autenticado");

  const cart = await OrdersModel.getActiveCartByUser(user_id);

  if (!cart) throw new Error("No existe carrito activo");
  if (cart.total <= 0) throw new Error("El carrito está vacío");

  // Cambia estado a PAGADA
  await OrdersModel.updateStatus(cart.orden_id, "PAGADA");

  // Guarda datos de envío
  await OrdersModel.updateShipping(cart.orden_id, shippingData);

  return {
    message: "Compra pagada correctamente",
    order_id: cart.orden_id
  };
};

/**
 * Estadísticas del dashboard (admin)
 */
export const getDashboardStats = async () => {

  // Ventas del día
  const ventasHoy = await pool.query(`
    SELECT COALESCE(SUM(total),0) AS total
    FROM orders
    WHERE DATE(created_at) = CURRENT_DATE
    AND status = 'PAGADA'
  `);

  // Ventas últimos 7 días
  const ventasSemana = await pool.query(`
    SELECT COALESCE(SUM(total),0) AS total
    FROM orders
    WHERE created_at >= NOW() - INTERVAL '7 days'
    AND status = 'PAGADA'
  `);

  // Ventas último año
  const ventasAnio = await pool.query(`
    SELECT COALESCE(SUM(total),0) AS total
    FROM orders
    WHERE created_at >= NOW() - INTERVAL '1 year'
    AND status = 'PAGADA'
  `);

  // Producto más vendido
  const productoMasVendido = await pool.query(`
    SELECT p.nombre, SUM(oi.qty) AS vendidos
    FROM order_items oi
    JOIN products p ON p.product_id = oi.product_id
    GROUP BY p.nombre
    ORDER BY vendidos DESC
    LIMIT 1
  `);

  // Producto menos vendido
  const productoMenosVendido = await pool.query(`
    SELECT p.nombre, SUM(oi.qty) AS vendidos
    FROM order_items oi
    JOIN products p ON p.product_id = oi.product_id
    GROUP BY p.nombre
    ORDER BY vendidos ASC
    LIMIT 1
  `);

  // Productos sin stock
  const sinStock = await pool.query(`
    SELECT product_id, nombre
    FROM products
    WHERE stock = 0
  `);

  return {
    today: Number(ventasHoy.rows[0].total),
    week: Number(ventasSemana.rows[0].total),
    year: Number(ventasAnio.rows[0].total),
    topProduct: productoMasVendido.rows[0] || null,
    lowProduct: productoMenosVendido.rows[0] || null,
    outOfStock: sinStock.rows
  };
};
