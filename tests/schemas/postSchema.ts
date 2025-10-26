export const postSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    user_id: { type: 'number' },
    title: { type: 'string' },
    body: { type: 'string' }
  },
  required: ['id', 'user_id', 'title', 'body'],
  additionalProperties: false
};
