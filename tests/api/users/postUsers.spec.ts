import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import Ajv from "ajv";
import { generateFakeUser } from "../../helpers/utils";
import { userSchema } from "../../schemas/userSchema";

dotenv.config();

const TOKEN = process.env.GOREST_TOKEN!;
const BASE_URL = process.env.BASE_URL!;
const ajv = new Ajv();

test.describe("GoRest API Users", () => {
  test("TC-USER-002: POST /users deve criar um usuário", async ({
    request,
  }) => {
    const userData = generateFakeUser();

    const response = await request.post(`${BASE_URL}/users`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      data: userData,
    });

    expect(response.status()).toBe(201);

    const createdUser = await response.json();

    expect(createdUser).toMatchObject(userData);

    const valid = ajv.validate(userSchema, createdUser);
    expect(valid).toBe(true);
  });
});
