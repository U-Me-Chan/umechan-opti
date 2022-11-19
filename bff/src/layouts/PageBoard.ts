import { LayoutInterface, Layout } from 'core';
import Board from '../components/Board';
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

class PageBoardLayout extends Layout implements LayoutInterface {
  name = 'PageBoard';
  direction: "row" | "column" = 'row';
  content: LayoutInterface['content'] = [
    { type: 'layout', item: LeftSidebar },
    { type: 'component', item: Board },
    { type: 'layout', item: RightSidebar }
  ];
}

export default PageBoardLayout;
