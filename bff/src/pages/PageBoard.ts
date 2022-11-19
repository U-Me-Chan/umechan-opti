import PageBoardLayout from '../layouts/PageBoard';
import { Page } from 'core';

class PageBoard extends Page {
  constructor() {
    super('pageBoard', PageBoardLayout);
  }
}

export default PageBoard;
