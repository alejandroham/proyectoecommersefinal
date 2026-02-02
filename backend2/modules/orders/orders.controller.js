import * as ordersService from "./orders.service.js";

/* ============================
   CARRITO
============================ */

// Obtener carrito activo
export const getCart = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const cart = await ordersService.getCart(user_id);
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Agregar producto al carrito
export const addItem = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { product_id } = req.body;

    await ordersService.addToCart(user_id, product_id);
    res.status(201).json({ ok: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar cantidad
export const updateQty = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { itemId } = req.params;
    const { qty } = req.body;

    await ordersService.updateItemQty(user_id, itemId, qty);
    res.json({ ok: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar item
export const removeItem = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { itemId } = req.params;

    await ordersService.removeItem(user_id, itemId);
    res.json({ ok: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Checkout
export const checkout = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const result = await ordersService.checkout(
      user_id,
      req.body // shippingData
    );

    res.status(201).json(result);
  } catch (error) {
    // Errores esperables de negocio → 409
    res.status(409).json({ error: error.message });
  }
};

/* ============================
   ÓRDENES
============================ */

// Órdenes del usuario autenticado
export const getMyOrders = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const orders = await ordersService.getMyOrders(user_id);
    res.json(orders);
  } catch {
    res.status(500).json({ error: "Error al obtener órdenes" });
  }
};

// Todas las órdenes (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await ordersService.getAllOrders();
    res.json(orders);
  } catch {
    res.status(500).json({ error: "Error al obtener órdenes" });
  }
};

// Cambiar estado de orden (admin)
export const changeStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    await ordersService.changeStatus(orderId, status);
    res.json({ ok: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* ============================
   DASHBOARD — ADMIN
============================ */

export const getDashboard = async (req, res) => {
  try {
    const stats = await ordersService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al obtener estadísticas del dashboard"
    });
  }
};
