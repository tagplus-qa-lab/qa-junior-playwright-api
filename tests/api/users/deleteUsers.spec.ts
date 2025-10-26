import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { fakeUser } from "../../helpers/utils";

dotenv.config();

const TOKEN = process.env.GOREST_TOKEN!;
const BASE_URL = process.env.BASE_URL!;

test.describe("GoRest API Users", () => {
  test("TC-USER-004: DELETE /users/:id deve deletar um usuário", async ({ request }) => {
    const createResponse = await request.post(`${BASE_URL}/users`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      data: fakeUser,
    });

    expect(createResponse.ok()).toBeTruthy();

    const createdUser = await createResponse.json();

    const deleteResponse = await request.delete(`${BASE_URL}/users/${createdUser.id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    expect(deleteResponse.status()).toBe(204);
  });
});
