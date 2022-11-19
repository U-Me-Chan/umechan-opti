import { TypeSchema, Component } from 'core';
import { getBoardData } from '../api/service';
import { Post } from '../api/types';

class Board implements Component<{ posts: Post[] }> {
  name = 'Board';
  state: { posts: Post[] } = {
    posts: []
  };
  stateLoader: Component<{ posts: Post[] }>['stateLoader'] = async (request) => {
    const { query } = request;
    const { board = 'b', page = '0' } = query as { board: string, page: string };
    const { payload: { posts } } = await getBoardData(board, Number(page));
    this.state = {
      posts: posts || [],
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
            replies: {
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
            }
          },
        },
      },
    },
  };
}

export default Board;
