import { TypeSchema } from "core";
import { postTypeScheme } from "./post";

export const boardState: TypeSchema = {
  type: 'object',
  properties: {
    posts: {
      type: 'array',
      of: {
        type: 'object',
        properties: {
          ...(postTypeScheme.properties),
          ...({
            replies: {
              type: 'array',
              of: postTypeScheme
            }
          }),
        },
      },
    },
  },
};
