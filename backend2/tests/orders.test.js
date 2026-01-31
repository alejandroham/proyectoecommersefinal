import { describe, test } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../app.js";

describe("ORDERS", () => {

  test("GET /orders sin token → 401", async () => {
    const res = await request(app).get("/orders");
    assert.strictEqual(res.statusCode, 401);
  });

});
