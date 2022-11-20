import { TypeSchema } from "core";

export const navbarState: TypeSchema = {
  type: 'object',
  properties: {
    links: {
      type: 'array',
      of: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          href: { type: 'string' },
        },
      },
    },
  },
};
