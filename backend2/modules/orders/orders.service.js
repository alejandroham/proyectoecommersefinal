import { OrdersModel } from "./orders.model.js";
import { OrderItemsModel } from "./orderItems.model.js";
import * as ProductModel from "../products/products.model.js";

const ESTADOS_VALIDOS = [
  "CARRITO",
  "CREADA",
  "PAGADA",
  "CANCELADA",
  "ENVIADA",
  "COMPLETADA"
];

export const getCart = async (user_id) => {
  let cart = await OrdersModel.getActiveCartByUser(user_id);

  if (!cart) {
    cart = await OrdersModel.createCart(user_id);
  }

  const items = await OrderItemsModel.getByOrder(cart.orden_id);
  const total = await OrderItemsModel.calcTotal(cart.orden_id);

  await OrdersModel.updateTotal(cart.orden_id, total);

  return { ...cart, items, total };
};

export const addToCart = async (user_id, product_id) => {
  const cart = await OrdersModel.getActiveCartByUser(user_id);

  if (!cart) {
    throw new Error("No existe carrito activo");
  }

  // bloquea la edición si el carrito ya fue enviado a pago
  if (cart.status !== "CARRITO") {
    throw new Error("El pedido ya fue enviado a pago");
  }

  const product = await ProductModel.findById(product_id);

  if (!product || !product.is_active) {
    throw new Error("Producto no disponible");
  }

  await OrderItemsModel.addItem(cart.orden_id, product);
};


export const updateItemQty = async (user_id, item_id, qty) => {
  if (qty <= 0) {
    throw new Error("Cantidad inválida");
  }

  const cart = await OrdersModel.getActiveCartByUser(user_id);

  if (!cart || cart.status !== "CARRITO") {
    throw new Error("El pedido ya fue enviado a pago");
  }

  await OrderItemsModel.updateQty(item_id, qty);
};


export const removeItem = async (user_id, item_id) => {
  const cart = await OrdersModel.getActiveCartByUser(user_id);

  if (!cart || cart.status !== "CARRITO") {
    throw new Error("El pedido ya fue enviado a pago");
  }

  await OrderItemsModel.removeItem(item_id);
};


export const changeStatus = async (orderId, nuevoEstado) => {
  if (!ESTADOS_VALIDOS.includes(nuevoEstado)) {
    throw new Error("Estado no válido");
  }

  await OrdersModel.updateStatus(orderId, nuevoEstado);
};

export const getMyOrders = async (user_id) => {
  return OrdersModel.getByUser(user_id);
};

export const getAllOrders = async () => {
  return OrdersModel.getAll();
};


export const checkout = async (user_id, shippingData) => {
  const cart = await OrdersModel.getActiveCartByUser(user_id);

  if (!cart) {
    throw new Error("No existe carrito activo");
  }

  if (cart.total <= 0) {
    throw new Error("El carrito está vacío");
  }

  // Cambiar estado a PAGADA
  await OrdersModel.updateStatus(cart.orden_id, "PAGADA");

  // Guardar datos de envío (opcional)
  await OrdersModel.updateShipping(cart.orden_id, shippingData);

  return {
    message: "Compra pagada, espere confirmación",
    order_id: cart.orden_id
  };
};
