import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import Ajv from "ajv";
import { fakeUser } from "../../helpers/utils";
import { userSchema } from "../../schemas/userSchema";

dotenv.config();

const TOKEN = process.env.GOREST_TOKEN!;
const BASE_URL = process.env.BASE_URL!;
const ajv = new Ajv();

test.describe("GoRest API Users", () => {
  test("TC-USER-003: PUT /users/:id deve atualizar um usuário", async ({ request }) => {
    const response = await request.put(`${BASE_URL}/users/${8208676}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      data: fakeUser,
    });

    expect(response.status()).toBe(200);

    const updatedUser = await response.json();
    expect(updatedUser).toMatchObject(fakeUser);

    const valid = ajv.validate(userSchema, updatedUser);
    expect(valid).toBe(true);
  });
});
