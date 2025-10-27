import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import Ajv from "ajv";
import { generateFakeComment } from "../../helpers/utils";
import { commentSchema } from "../../schemas/commentSchema";
import { getRandomId } from "../../helpers/data";

dotenv.config();

const TOKEN = process.env.GOREST_TOKEN!;
const BASE_URL = process.env.BASE_URL!;
const ajv = new Ajv();

test.describe("GoRest API Comments", () => {
  test("TC-POST-002: POST /comments deve criar um comentário", async ({
    request,
  }) => {
    const commentData = {
      post_id: await getRandomId(request, "post"),
      ...generateFakeComment(),
    };

    const response = await request.post(`${BASE_URL}/comments`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      data: commentData
    });

    expect(response.status()).toBe(201);

    const createdComment = await response.json();

    expect(createdComment).toMatchObject(commentData);

    const valid = ajv.validate(commentSchema, createdComment);
    expect(valid).toBe(true);
  });
});
