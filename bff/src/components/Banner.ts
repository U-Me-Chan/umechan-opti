import { TypeSchema, Component } from 'core';

class Banner implements Component<{ bannersUrls: string[], current: number }> {
  name = 'Banner';
  state = {
    bannersUrls: [
      '/images/1.gif',
      '/images/1.png',
      '/images/2.png',
      '/images/3.png',
      '/images/4.png',
      '/images/5.png',
      '/images/6.jpg',
      '/images/7.jpg',
      '/images/8.jpg',
      '/images/9.jpg',
      '/images/10.jpg',
      '/images/11.jpg',
      '/images/12.jpg',
      '/images/13.jpg',
      '/images/14.jpg',
      '/images/15.jpg',
      '/images/16.jpg',
      '/images/17.jpg',
      '/images/18.jpg',
      '/images/19.jpg',
      '/images/20.jpg',
      '/images/21.png',
      '/images/22.jpg',
    ],
    current: 0,
  };
  stateLoader = async () => {};
  stateTypeSchema: TypeSchema = {
    type: 'object',
    properties: {
      bannersUrls: {
        type: 'array',
        of: { type: 'string' },
      },
      current: {
        type: 'number'
      }
    },
  };
}

export default Banner;
