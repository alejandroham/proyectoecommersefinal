import { describe, test } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../../app.js";

describe("E2E FULL FLOW - ECOMMERCE REAL", () => {
  let buyerToken;
  let adminToken;
  let productId;

  const buyer = {
    email: `buyer_${Date.now()}@test.cl`,
    password: "123456",
    nombres: "Buyer",
    apellido: "E2E"
  };

  const admin = {
    email: "admin@test.cl",
    password: "Admintest123"
  };

  /* =========================
     REGISTRO + LOGIN BUYER
  ========================== */

  test("Registro usuario buyer", async () => {
    const res = await request(app)
      .post("/users")
      .send(buyer);

    assert.strictEqual(res.statusCode, 201);
  });

  test("Login usuario buyer", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: buyer.email,
        password: buyer.password
      });

    assert.strictEqual(res.statusCode, 200);
    assert.ok(res.body.token);
    buyerToken = res.body.token;
  });

  /* =========================
     LOGIN ADMIN
  ========================== */

  test("Login admin", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send(admin);

    assert.strictEqual(res.statusCode, 200);
    adminToken = res.body.token;
  });

  /* =========================
     ADMIN CREA PRODUCTO
  ========================== */

  test("Admin crea producto", async () => {
    const producto = {
      nombre: "Producto E2E",
      descripcion: "Producto creado desde test E2E",
      image_url: "https://test.com/producto.jpg",
      price: 199990,
      stock: 10,
      catego: "Notebook" // 👈 válida
    };

    const res = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(producto);

    assert.strictEqual(res.statusCode, 201);
    assert.ok(res.body.product_id);

    productId = res.body.product_id;
  });

  /* =========================
     BUYER AGREGA PRODUCTO AL CARRITO
  ========================== */

  test("Agregar producto al carrito", async () => {
    const res = await request(app)
      .post("/cart")
      .set("Authorization", `Bearer ${buyerToken}`)
      .send({
        product_id: productId,
        qty: 1
      });

    assert.strictEqual(res.statusCode, 201);
  });

  /* =========================
     OBTENER CARRITO CON ITEMS
  ========================== */

  test("Obtener carrito con items", async () => {
    const res = await request(app)
      .get("/cart")
      .set("Authorization", `Bearer ${buyerToken}`);

    assert.strictEqual(res.statusCode, 200);
    assert.ok(Array.isArray(res.body.items));
    assert.strictEqual(res.body.items.length, 1);
  });
});
