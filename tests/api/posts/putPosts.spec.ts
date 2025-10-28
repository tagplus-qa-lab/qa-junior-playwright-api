import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import Ajv from "ajv";
import { generateFakePost } from "@helpers/utils";
import { postSchema } from "@schemas/postSchema";
import { getRandomId } from "@helpers/data";

dotenv.config();

const TOKEN = process.env.GOREST_TOKEN!;
const BASE_URL = process.env.BASE_URL!;
const ajv = new Ajv();

test.describe("GoRest API Posts", () => {
  test("TC-POST-003: PUT /posts/:id deve atualizar um post", async ({
    request,
  }) => {
    const postId = await getRandomId(request, "post");
    const postData = generateFakePost();

    const response = await request.put(`${BASE_URL}/posts/${postId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      data: postData,
    });

    expect(response.status()).toBe(200);

    const updatedPost = await response.json();

    expect(updatedPost).toMatchObject({
      id: postId,
      ...postData,
    });

    const valid = ajv.validate(postSchema, updatedPost);
    expect(valid).toBe(true);
  });
});
