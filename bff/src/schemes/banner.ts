import { TypeSchema } from "core";

export const bannerState: TypeSchema = {
  type: 'object',
  properties: {
    bannersUrls: {
      type: 'array',
      of: { type: 'string' },
    },
    current: {
      type: 'number'
    }
  },
};
