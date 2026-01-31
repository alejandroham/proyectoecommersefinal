import { describe, test } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../app.js";

describe("USERS", () => {

  test("GET /users sin token → 401", async () => {
    const res = await request(app).get("/users");
    assert.strictEqual(res.statusCode, 401);
  });

});
