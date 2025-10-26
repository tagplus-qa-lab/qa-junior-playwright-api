import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';
import { fakeComment } from '../../helpers/utils';

dotenv.config();

const TOKEN = process.env.GOREST_TOKEN!;
const BASE_URL = process.env.BASE_URL!;

test.describe('GoRest API Comments', () => {
  test('TC-COMMENT-004: DELETE /comments/:id deve deletar um comentário', async ({ request }) => {
    const createResponse = await request.post(`${BASE_URL}/comments`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      data: fakeComment,
    });

    expect(createResponse.ok()).toBeTruthy();
    const comment = await createResponse.json();

    const deleteResponse = await request.delete(`${BASE_URL}/comments/${comment.id}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
    });

    expect(deleteResponse.status()).toBe(204);
  });
});
