import { TypeSchema, Component } from 'core';
import { getThread } from '../api/service';
import { Post } from '../api/types';

class Thread implements Component<{ posts: Post[] }> {
  name = 'Thread';
  state: { posts: Post[] } = {
    posts: []
  };
  stateLoader: Component<{ posts: Post[] }>['stateLoader'] = async (request) => {
    const { query } = request;
    const { threadId = '0' } = query as { threadId: string };
    const { payload: { thread_data: { replies } } } = await getThread(threadId);
    this.state = {
      posts: replies,
    };
  };
  stateTypeSchema: TypeSchema = {
    type: 'object',
    properties: {
      posts: {
        type: 'array',
        of: {
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
        },
      },
    },
  };
}

export default Thread;
