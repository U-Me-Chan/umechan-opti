import RadioPlayer from '../components/RadioPlayer';
import { Layout, LayoutInterface } from 'core';

class RightSidebar extends Layout implements LayoutInterface {
  name = 'RightSidebar';
  direction: 'row' | 'column' = 'column';
  content: LayoutInterface['content'] = [
    { type: 'component', item: RadioPlayer },
  ];
}

export default RightSidebar;
