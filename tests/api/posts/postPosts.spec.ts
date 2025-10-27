import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import Ajv from "ajv";
import { generateFakePost } from "../../helpers/utils";
import { postSchema } from "../../schemas/postSchema";
import { getRandomId } from "../../helpers/data";

dotenv.config();

const TOKEN = process.env.GOREST_TOKEN!;
const BASE_URL = process.env.BASE_URL!;
const ajv = new Ajv();

test.describe("GoRest API Posts", () => {
  test("TC-POST-002: POST /posts deve criar um post", async ({ request }) => {
    const postData = {
      user_id: await getRandomId(request, "user"),
      ...generateFakePost(),
    };

    const response = await request.post(`${BASE_URL}/posts`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      data: postData,
    });

    expect(response.status()).toBe(201);

    const createdPost = await response.json();

    expect(createdPost).toMatchObject(postData);

    const valid = ajv.validate(postSchema, createdPost);
    expect(valid).toBe(true);
  });
});
