import "dotenv/config";
import { describe, test } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../app.js";

describe("API SMOKE TEST", () => {

  let token;
  let orderId;

  const user = {
    email: "qa@test.cl",
    password: "123456",
    nombres: "Smoke",
    apellido: "Test"
  };

  test("Registro usuario", async () => {
    const res = await request(app).post("/users").send(user);
    assert.ok([201, 409].includes(res.statusCode));
  });

  test("Login", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: user.email, password: user.password });

    assert.strictEqual(res.statusCode, 200);
    token = res.body.token;
  });

  test("Ruta protegida /auth/me", async () => {
    const res = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`);

    assert.strictEqual(res.statusCode, 200);
  });

  test("Crear orden", async () => {
    const res = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`);

    assert.strictEqual(res.statusCode, 201);
    orderId = res.body.orden_id;
  });

});
