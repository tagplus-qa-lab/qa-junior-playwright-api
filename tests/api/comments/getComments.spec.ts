import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import Ajv from 'ajv';
import { commentSchema } from '@schemas/commentSchema';

dotenv.config();

const BASE_URL = process.env.BASE_URL!;
const ajv = new Ajv();

test.describe('GoRest API Comments', () => {
  test('TC-COMMENT-001: GET /comments deve retornar uma lista de comentários', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/comments`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    expect(response.status()).toBe(200);

    const comments = await response.json();
    expect(Array.isArray(comments)).toBe(true);

    comments.forEach((comment: any) => {
      const valid = ajv.validate(commentSchema, comment);
      expect(valid).toBe(true);
    });
  });
});
