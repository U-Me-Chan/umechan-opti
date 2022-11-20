import { TypeSchema, Component } from 'core';
import { getAllBoards } from '../api/service';
import { navbarState } from '../schemes/navbar';

type Link = {
  title: string;
  href: string;
};

type T = Component<{ links: Link[] }>;

class Navbar implements T {
  name = 'Navbar';
  state: T['state'] = { links: [] };
  stateLoader = async () => {
    const { payload: { boards } } = await getAllBoards();
    this.state = {
      links: [
        { title: 'Main', href: '/' },
        ...(boards.map(board => ({ title: board.name, href: `/${board.tag}` })))
      ],
    };
  };
  stateTypeSchema: TypeSchema = navbarState;
}

export default Navbar;
