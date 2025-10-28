import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import Ajv from "ajv";
import { commentSchema } from "@schemas/commentSchema";
import { getRandomId } from "@helpers/data";
import { generateFakeComment } from "@helpers/utils";

dotenv.config();

const TOKEN = process.env.GOREST_TOKEN!;
const BASE_URL = process.env.BASE_URL!;
const ajv = new Ajv();

test.describe("GoRest API Comments", () => {
  test("TC-COMMENT-003: PUT /comments/:id deve atualizar um comentário", async ({
    request,
  }) => {
    const commentId = await getRandomId(request, "comment");
    const commentData = generateFakeComment();

    const response = await request.put(
      `${BASE_URL}/comments/${commentId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        data: commentData,
      }
    );

    expect(response.status()).toBe(200);

    const updatedComment = await response.json();

    expect(updatedComment).toMatchObject({
      id: commentId,
      ...commentData,
    });

    const valid = ajv.validate(commentSchema, updatedComment);
    expect(valid).toBe(true);
  });
});
