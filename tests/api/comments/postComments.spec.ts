import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import Ajv from 'ajv';
import { fakeComment } from '../../helpers/utils';
import { commentSchema } from '../../schemas/commentSchema';

dotenv.config();

const TOKEN = process.env.GOREST_TOKEN!;
const BASE_URL = process.env.BASE_URL!;
const ajv = new Ajv();

test.describe('GoRest API Comments', () => {
  test('TC-POST-002: POST /comments deve criar um comentário', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/comments`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      data: fakeComment,
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody).toMatchObject(fakeComment);

    const valid = ajv.validate(commentSchema, responseBody);
    expect(valid).toBe(true);
  });
});
