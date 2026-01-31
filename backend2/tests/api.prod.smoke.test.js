import { describe, test } from "node:test";
import assert from "node:assert";
import request from "supertest";

const API = process.env.API_BASE_URL;

describe("PRODUCTION SMOKE TEST", () => {

  let token;

  test("API responde", async () => {
    const res = await request(API).get("/products");
    assert.ok([200, 304].includes(res.statusCode));
  });

  test("Login QA", async () => {
    const res = await request(API)
      .post("/auth/login")
      .send({
        email: process.env.QA_EMAIL,
        password: process.env.QA_PASSWORD
      });

    assert.strictEqual(res.statusCode, 200);
    assert.ok(res.body.token);

    token = res.body.token;
  });

  test("Ruta protegida /auth/me", async () => {
    const res = await request(API)
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`);

    assert.strictEqual(res.statusCode, 200);
  });

  test("GET /orders (con token)", async () => {
    const res = await request(API)
      .get("/orders")
      .set("Authorization", `Bearer ${token}`);

    assert.ok([200, 403].includes(res.statusCode));
  });

});
