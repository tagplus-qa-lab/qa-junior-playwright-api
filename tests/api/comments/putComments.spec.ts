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
  test('TC-COMMENT-003: PUT /comments/:id deve atualizar um comentário', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/comments/${172529}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      data: fakeComment,
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toMatchObject(fakeComment);

    const valid = ajv.validate(commentSchema, responseBody);
    expect(valid).toBe(true);
  });
});
