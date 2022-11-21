import { LayoutInterface, Layout } from 'core';
import Board from '../components/Board';

class PageBoardLayout extends Layout implements LayoutInterface {
  name = 'PageBoard';
  direction: "row" | "column" = 'row';
  content: LayoutInterface['content'] = [
    { type: 'component', item: Board },
  ];
}

export default PageBoardLayout;
