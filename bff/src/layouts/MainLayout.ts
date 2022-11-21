import { LayoutInterface, Layout } from 'core';
import Children from '../components/Children';
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

class MainLayout extends Layout implements LayoutInterface {
  name = 'MainLayout';
  direction: "row" | "column" = 'row';
  content: LayoutInterface['content'] = [
    { type: 'layout', item: LeftSidebar },
    { type: 'component', item: Children },
    { type: 'layout', item: RightSidebar }
  ];
}

export default MainLayout;
