import PageBoardLayout from '../layouts/PageBoardLayout';
import { Page } from 'core';

class PageBoard extends Page {
  constructor() {
    super('pageBoard', PageBoardLayout);
  }
}

export default PageBoard;
