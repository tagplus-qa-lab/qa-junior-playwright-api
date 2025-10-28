import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import Ajv from "ajv";
import { postSchema } from "@schemas/postSchema";

dotenv.config();

const BASE_URL = process.env.BASE_URL!;
const ajv = new Ajv();

test.describe("GoRest API Posts", () => {
  test("TC-POST-001: GET /posts deve retornar uma lista de posts", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`, {
      headers: {
        Accept: "application/json",
      },
    });

    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);

    for (const post of posts) {
      const valid = ajv.validate(postSchema, post);
      expect(valid).toBe(true);
    }
  });
});
