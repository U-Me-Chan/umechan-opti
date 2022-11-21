import { LayoutInterface, Layout } from 'core';
import Thread from '../components/Thread';

class PageThreadLayout extends Layout implements LayoutInterface {
  name = 'PageThread';
  direction: "row" | "column" = 'row';
  content: LayoutInterface['content'] = [
    { type: 'component', item: Thread },
  ];
}

export default PageThreadLayout;
