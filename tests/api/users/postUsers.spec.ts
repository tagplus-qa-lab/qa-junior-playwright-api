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
  test("TC-USER-002: POST /users deve criar um usuário", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      data: fakeUser,
    });

    expect(response.status()).toBe(201);

    const createdUser = await response.json();
    expect(createdUser).toMatchObject(fakeUser);

    const valid = ajv.validate(userSchema, createdUser);
    expect(valid).toBe(true);
  });
});
