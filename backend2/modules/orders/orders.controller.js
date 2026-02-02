// orders.controller.js
import * as OrdersService from "./orders.service.js";

export const addItem = async (req, res) => {
  await OrdersService.addToCart(
    req.usuario.user_id,  
    req.body.product_id
  );
  res.sendStatus(201);
};

export const getCart = async (req, res) => {
  const cart = await OrdersService.getCart(req.usuario.user_id); 
  res.json(cart);
};

export const updateQty = async (req, res) => {
  await OrdersService.updateItemQty(
    req.usuario.id,
    req.params.itemId,
    req.body.qty
  );
  res.sendStatus(204);
};

export const removeItem = async (req, res) => {
  await OrdersService.removeItem(
    req.usuario.id,
    req.params.itemId
  );
  res.sendStatus(204);
};

export const updateOrderStatus = async (req, res) => {
  await OrdersService.changeStatus(
    req.params.orderId,
    req.body.status
  );
  res.sendStatus(204);
};

export const getMyOrders = async (req, res) => {
  const orders = await OrdersService.getMyOrders(req.usuario.id);
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await OrdersService.getAllOrders();
  res.json(orders);
};


export const checkout = async (req, res) => {
  const result = await OrdersService.checkout(
    req.usuario.id,
    req.body
  );

  res.json(result);
};

import * as ordersService from "./orders.service.js";

export const getDashboard = async (req, res) => {
  try {
    const data = await ordersService.getDashboardStats();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener dashboard" });
  }
};
