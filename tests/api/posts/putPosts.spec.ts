import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import Ajv from "ajv";
import { fakePost } from "../../helpers/utils";
import { postSchema } from "../../schemas/postSchema";

dotenv.config();

const TOKEN = process.env.GOREST_TOKEN!;
const BASE_URL = process.env.BASE_URL!;
const ajv = new Ajv();

test.describe("GoRest API Posts", () => {
  test("TC-POST-003: PUT /posts/:id deve atualizar um post", async ({ request }) => {
    const response = await request.put(`${BASE_URL}/posts/${253389}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      data: fakePost,
    });

    expect(response.status()).toBe(200);

    const updatedPost = await response.json();
    expect(updatedPost).toMatchObject(fakePost);

    const valid = ajv.validate(postSchema, updatedPost);
    expect(valid).toBe(true);
  });
});
