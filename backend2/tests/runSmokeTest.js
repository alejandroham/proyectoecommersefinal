import request from "supertest";
import assert from "node:assert";
import app from "../app.js";

export const runSmokeTest = async () => {
  const results = [];

  try {
    /* =========================
       API VIVA
    ========================= */
    const productsRes = await request(app).get("/products");
    assert.strictEqual(productsRes.statusCode, 200);
    results.push("✔️ /products OK");

    /* =========================
       LOGIN QA
    ========================= */
    const loginRes = await request(app)
      .post("/auth/login")
      .send({
        email: process.env.QA_EMAIL,
        password: process.env.QA_PASSWORD
      });

    assert.strictEqual(loginRes.statusCode, 200);
    const token = loginRes.body.token;
    results.push("✔️ /auth/login OK");

    /* =========================
       RUTA PROTEGIDA
    ========================= */
    const meRes = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`);

    assert.strictEqual(meRes.statusCode, 200);
    results.push("✔️ /auth/me OK");

    /* =========================
       ORDERS
    ========================= */
    const ordersRes = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${token}`);

    assert.ok([200, 403].includes(ordersRes.statusCode));
    results.push("✔️ /orders OK");

    return {
      ok: true,
      results
    };

  } catch (error) {
    return {
      ok: false,
      error: error.message,
      results
    };
  }
};
