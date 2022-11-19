import { TypeSchema, Component } from 'core';
import { getAllBoards } from '../api/service';

type Link = {
  title: string;
  href: string;
};

class Navbar implements Component<{ links: Link[] }> {
  name = 'Navbar';
  state: { links: Link[] } = { links: [] };
  stateLoader = async () => {
    const { payload: { boards } } = await getAllBoards();
    this.state = {
      links: [
        { title: 'Main', href: '/' },
        ...(boards.map(board => ({ title: board.name, href: `/${board.tag}` })))
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
