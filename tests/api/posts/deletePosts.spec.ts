import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { fakePost } from '../../helpers/utils';

dotenv.config();

const TOKEN = process.env.GOREST_TOKEN!;
const BASE_URL = process.env.BASE_URL!;

test.describe('GoRest API Posts', () => {
  test('TC-POST-004: DELETE /posts/:id deve deletar um post', async ({ request }) => {
    const createResponse = await request.post(`${BASE_URL}/posts`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
      data: fakePost,
    });

    expect(createResponse.ok()).toBeTruthy();
    const post = await createResponse.json();

    const deleteResponse = await request.delete(`${BASE_URL}/posts/${post.id}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
      },
    });

    expect(deleteResponse.status()).toBe(204);
  });
});
