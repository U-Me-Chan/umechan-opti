import Banner from '../components/Banner';
import Navbar from '../components/Navbar';
import { Layout, LayoutInterface } from 'core';

class LeftSidebar extends Layout implements LayoutInterface {
  name = 'LeftSidebar';
  direction: 'row' | 'column' = 'column';
  content: LayoutInterface['content'] = [
    { type: 'component', item: Navbar },
    { type: 'component', item: Banner },
  ];
}

export default LeftSidebar;
