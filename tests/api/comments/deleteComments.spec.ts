import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { getRandomId } from '@helpers/data';

dotenv.config();

const TOKEN = process.env.GOREST_TOKEN!;
const BASE_URL = process.env.BASE_URL!;

test.describe('GoRest API Comments', () => {
  test('TC-COMMENT-004: DELETE /comments/:id deve deletar um comentário', async ({ request }) => {
    const deleteResponse = await request.delete(`${BASE_URL}/comments/${await getRandomId(request, "comment")}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
    });

    expect(deleteResponse.status()).toBe(204);
  });
});
