import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { getRandomId } from '@helpers/data';

dotenv.config();

const TOKEN = process.env.GOREST_TOKEN!;
const BASE_URL = process.env.BASE_URL!;

test.describe('GoRest API Posts', () => {
  test('TC-POST-004: DELETE /posts/:id deve deletar um post', async ({ request }) => {
    const deleteResponse = await request.delete(`${BASE_URL}/posts/${await getRandomId(request, "post")}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
    });

    expect(deleteResponse.status()).toBe(204);
  });
});
