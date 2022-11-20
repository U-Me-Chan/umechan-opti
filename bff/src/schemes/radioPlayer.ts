import { TypeSchema } from "core";

export const radioPlayerState: TypeSchema = {
  type: 'object',
  properties: {
    status: {
      type: 'array',
      of: {
        type: 'object',
        properties: {
          mount: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              link: { type: 'string' },
              apiBasePath: { type: 'string' },
            },
          },
          status: {
            type: 'object',
            properties: {
              scheduling: { type: 'boolean' },
              playing: { type: 'boolean' },
              syncing: { type: 'boolean' },
              streaming: { type: 'boolean' },
              currentFile: { type: 'string' },
              thumbnailPath: { type: 'string' },
              fileData: {
                type: 'object',
                properties: {
                  filehash: { type: 'string' },
                  path: { type: 'string' },
                  name: { type: 'string' },
                  id3Artist: { type: 'string' },
                  id3Title: { type: 'string' },
                },
              },
              playlistData: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  type: { type: 'string' },
                }
              },
            },
          },
        },
      },
    },
  },
};