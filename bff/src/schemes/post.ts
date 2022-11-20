import { TypeSchema } from "core";

export const postTypeScheme: TypeSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    poster: { type: 'string' },
    subject: { type: 'string' },
    message: { type: 'string' },
    truncated_message: { type: 'string' },
    timestamp: { type: 'number' },
    board_id: { type: 'number' },
    parent_id: { type: 'number' },
    updated_at: { type: 'number' },
    estimate: { type: 'number' },
    is_verify: { type: 'boolean' },
    media: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          of: {
            type: 'object',
            properties: {
              link: { type: 'string' },
              preview: { type: 'string' },
            },
          },
        },
        youtubes: {
          type: 'array',
          of: {
            type: 'object',
            properties: {
              link: { type: 'string' },
              preview: { type: 'string' },
            },
          },
        },
      },
    },
  },
};
