import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import Ajv from "ajv";
import { userSchema } from "@schemas/userSchema";

dotenv.config();

const BASE_URL = process.env.BASE_URL!;
const ajv = new Ajv();

test.describe("GoRest API Users", () => {
  test("TC-USER-001: GET /users deve retornar uma lista de usuários", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`, {
      headers: {
        Accept: "application/json",
      },
    });

    expect(response.status()).toBe(200);

    const users = await response.json();
    expect(Array.isArray(users)).toBe(true);

    for (const user of users) {
      const valid = ajv.validate(userSchema, user);
      expect(valid).toBe(true);
    }
  });
});
