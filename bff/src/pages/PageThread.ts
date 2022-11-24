import PageThreadLayout from '../layouts/PageThreadLayout';
import { Page } from 'core';

class PageThread extends Page {
  constructor() {
    super(
      'PageThread',
      PageThreadLayout,
      [
        ['threadId', { type: 'string' }],
      ],
    );
  }
}

export default PageThread;
