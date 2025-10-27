import { APIRequestContext } from "@playwright/test";
import dotenv from "dotenv";
import {
  generateFakeComment,
  generateFakePost,
  generateFakeUser,
} from "./utils";

dotenv.config();

const TOKEN = process.env.GOREST_TOKEN!;
const BASE_URL = process.env.BASE_URL!;

export const createUser = async (
  request: APIRequestContext
): Promise<number> => {
  const response = await request.post(`${BASE_URL}/users`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    data: generateFakeUser(),
  });

  const user = await response.json();
  return user.id;
};

export const createPost = async (
  request: APIRequestContext,
  userId: number
): Promise<number> => {
  const response = await request.post(`${BASE_URL}/posts`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    data: {
      user_id: userId,
      ...generateFakePost(),
    },
  });

  const post = await response.json();
  return post.id;
};

export const createComment = async (
  request: APIRequestContext,
  postId: number
): Promise<number> => {
  const response = await request.post(`${BASE_URL}/comments`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    data: {
      post_id: postId,
      ...generateFakeComment(),
    },
  });

  const comment = await response.json();
  return comment.id;
};

export const getRandomId = async (
  request: APIRequestContext,
  type: "user" | "post" | "comment"
): Promise<number> => {
  switch (type) {
    case "user":
      return await createUser(request);
    case "post": {
      const userId = await createUser(request);
      return await createPost(request, userId);
    }
    case "comment": {
      const userId = await createUser(request);
      const postId = await createPost(request, userId);
      return await createComment(request, postId);
    }
  }
};
