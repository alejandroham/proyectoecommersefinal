import { OrdersModel } from "./orders.model.js";
import { OrderItemsModel } from "./orderItems.model.js";
import * as ProductModel from "../products/products.model.js";
import { pool } from "../../config/database.js";

export const getCart = async (user_id) => {
  let cart = await OrdersModel.getActiveCartByUser(user_id);
  if (!cart) cart = await OrdersModel.createCart(user_id);

  const items = await OrderItemsModel.getByOrder(cart.order_id);
  const total = await OrderItemsModel.calcTotal(cart.order_id);

  await OrdersModel.updateTotal(cart.order_id, total);

  return { ...cart, items, total };
};

export const addToCart = async (user_id, product_id) => {
  const product = await ProductModel.findById(product_id);

  if (!product || !product.is_active)
    throw new Error("Producto no disponible");

  if (product.stock <= 0)
    throw new Error("Producto sin stock");

  let cart = await OrdersModel.getActiveCartByUser(user_id);
  if (!cart) cart = await OrdersModel.createCart(user_id);

  await OrderItemsModel.addItem(
    cart.order_id,
    product.product_id,
    1,
    product.price
  );
};

export const checkout = async (user_id, shippingData) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const cart = await OrdersModel.getActiveCartByUser(user_id);
    if (!cart) throw new Error("Carrito inexistente");

    const items = await OrderItemsModel.getByOrder(
      cart.order_id,
      client
    );

    for (const item of items) {
      const product = await ProductModel.findByIdForUpdate(
        item.product_id,
        client
      );

      if (!product.is_active)
        throw new Error(`Producto inactivo: ${product.nombre}`);

      if (product.stock < item.qty)
        throw new Error(`Stock insuficiente: ${product.nombre}`);

      await ProductModel.discountStock(
        product.product_id,
        item.qty,
        client
      );
    }

    await OrdersModel.updateStatus(cart.order_id, "PAGADA", client);
    await OrdersModel.updateShipping(cart.order_id, shippingData, client);

    await client.query("COMMIT");

    return { ok: true, order_id: cart.order_id };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
export const getDashboardStats = async () => {

  const ventasHoy = await pool.query(`
    SELECT COALESCE(SUM(total),0) AS total
    FROM orders
    WHERE DATE(created_at) = CURRENT_DATE
    AND status = 'PAGADA'
  `);

  const ventasSemana = await pool.query(`
    SELECT COALESCE(SUM(total),0) AS total
    FROM orders
    WHERE created_at >= NOW() - INTERVAL '7 days'
    AND status = 'PAGADA'
  `);

  const ventasAnio = await pool.query(`
    SELECT COALESCE(SUM(total),0) AS total
    FROM orders
    WHERE created_at >= NOW() - INTERVAL '1 year'
    AND status = 'PAGADA'
  `);

  const productoMasVendido = await pool.query(`
    SELECT p.nombre, SUM(oi.qty) AS vendidos
    FROM order_items oi
    JOIN products p ON p.product_id = oi.product_id
    GROUP BY p.nombre
    ORDER BY vendidos DESC
    LIMIT 1
  `);

  const productoMenosVendido = await pool.query(`
    SELECT p.nombre, SUM(oi.qty) AS vendidos
    FROM order_items oi
    JOIN products p ON p.product_id = oi.product_id
    GROUP BY p.nombre
    ORDER BY vendidos ASC
    LIMIT 1
  `);

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
