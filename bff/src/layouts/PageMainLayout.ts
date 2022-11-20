import { LayoutInterface, Layout } from 'core';
import Feed from '../components/Feed';
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

class PageMainLayout extends Layout implements LayoutInterface {
  name = 'PageMainLayout';
  direction: "row" | "column" = 'row';
  content: LayoutInterface['content'] = [
    { type: 'layout', item: LeftSidebar },
    { type: 'component', item: Feed },
    { type: 'layout', item: RightSidebar }
  ];
}

export default PageMainLayout;
