import { TypeSchema, Component } from 'core';

type Link = {
  title: string;
  href: string;
};

class Navbar implements Component<{ links: Link[] }> {
  name = 'Navbar';
  state: { links: Link[] } = { links: [] };
  stateLoader = async () => {
    this.state = {
      links: [
        { title: 'Main', href: '/' },
        { title: 'Test', href: '/test' },
        { title: 'About', href: '/about' },
      ],
    };
  };
  stateTypeSchema: TypeSchema = {
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
}

export default Navbar;
