import { describe, test } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../app.js";

describe("PRODUCTS", () => {

  test("GET /products → 200", async () => {
    const res = await request(app).get("/products");
    assert.strictEqual(res.statusCode, 200);
    assert.ok(Array.isArray(res.body));
  });

});
