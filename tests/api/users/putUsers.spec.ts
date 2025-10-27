import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import Ajv from "ajv";
import { generateFakeUser } from "../../helpers/utils";
import { userSchema } from "../../schemas/userSchema";
import { getRandomId } from "../../helpers/data";

dotenv.config();

const TOKEN = process.env.GOREST_TOKEN!;
const BASE_URL = process.env.BASE_URL!;
const ajv = new Ajv();

test.describe("GoRest API Users", () => {
  test("TC-USER-003: PUT /users/:id deve atualizar um usuário", async ({ request }) => {
    const userId = await getRandomId(request, "user");
    const userData = generateFakeUser();

    const response = await request.put(`${BASE_URL}/users/${userId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      data: userData,
    });

    expect(response.status()).toBe(200);

    const updatedUser = await response.json();

    expect(updatedUser).toMatchObject({
      id: userId,
      ...userData,
    });

    const valid = ajv.validate(userSchema, updatedUser);
    expect(valid, ajv.errorsText(ajv.errors)).toBe(true);
  });
});
