import { LayoutInterface, Layout } from 'core';
import Thread from '../components/Thread';
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

class PageThreadLayout extends Layout implements LayoutInterface {
  name = 'PageThread';
  direction: "row" | "column" = 'row';
  content: LayoutInterface['content'] = [
    { type: 'layout', item: LeftSidebar },
    { type: 'component', item: Thread },
    { type: 'layout', item: RightSidebar }
  ];
}

export default PageThreadLayout;
