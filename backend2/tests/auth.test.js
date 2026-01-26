import "dotenv/config";
import { describe, test } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../app.js";

describe("AUTH API", () => {

  const testUser = {
    email: "test_supertest@test.cl",
    password: "123456",
    nombres: "Test",
    apellido: "Supertest"
  };

  let token;

  //  Registro → 201
  test("POST /users → 201", async () => {
    const res = await request(app)
      .post("/users")
      .send(testUser);

    assert.strictEqual(res.statusCode, 201);
    assert.ok(res.body.email);
  });

  //  Login correcto → 200
  test("POST /auth/login → 200", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password
      });

    assert.strictEqual(res.statusCode, 200);
    assert.ok(res.body.token);

    token = res.body.token;
  });

  // Login incorrecto → 401
  test("POST /auth/login → 401", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: testUser.email,
        password: "password_malo"
      });

    assert.strictEqual(res.statusCode, 401);
  });

  // uta protegida sin token → 401
  test("GET /auth/me → 401", async () => {
    const res = await request(app)
      .get("/auth/me");

    assert.strictEqual(res.statusCode, 401);
  });

});