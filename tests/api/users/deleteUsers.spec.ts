import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { getRandomId } from "@helpers/data";

dotenv.config();

const TOKEN = process.env.GOREST_TOKEN!;
const BASE_URL = process.env.BASE_URL!;

test.describe("GoRest API Users", () => {
  test("TC-USER-004: DELETE /users/:id deve deletar um usuário", async ({ request }) => {
    const deleteResponse = await request.delete(`${BASE_URL}/users/${await getRandomId(request, "user")}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    expect(deleteResponse.status()).toBe(204);
  });
});
