import { TypeSchema } from "core";
import { postTypeScheme } from "./post";

export const threadState: TypeSchema = {
  type: 'object',
  properties: {
    posts: {
      type: 'array',
      of: postTypeScheme
    },
  },
};
