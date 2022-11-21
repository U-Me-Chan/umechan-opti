import { LayoutInterface, Layout } from 'core';
import Children from '../components/Children';
import Feed from '../components/Feed';

class PageMainInnerLayout extends Layout implements LayoutInterface {
  name = 'PageMainInnerLayout';
  direction: "row" | "column" = 'column';
  content: LayoutInterface['content'] = [
    { type: 'component', item: Children },
    { type: 'component', item: Feed },
  ];
}

class PageMainLayout extends Layout implements LayoutInterface {
  name = 'PageMainLayout';
  direction: "row" | "column" = 'row';
  content: LayoutInterface['content'] = [
    { type: 'layout', item: PageMainInnerLayout },
  ];
}

export default PageMainLayout;
