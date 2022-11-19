import { TypeSchema, Component } from 'core';
import { getThread } from '../api/service';
import { Post } from '../api/types';
import { FEED_THREAD } from '../constants';

class Feed implements Component<{ posts: Post[] }> {
  name = 'Feed';
  state: { posts: Post[] } = {
    posts: []
  };
  stateLoader = async () => {
    const { payload: { thread_data: { replies } } } = await getThread(FEED_THREAD.threadId);
    this.state = {
      posts: replies.filter(_ => FEED_THREAD.whitelist.includes(Number(_.id).toString())).reverse(),
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

export default Feed;
