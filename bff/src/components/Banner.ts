import { TypeSchema, Component } from 'core';

class Banner implements Component<{ bannersUrls: string[], current: number }> {
  name = 'Banner';
  state = {
    bannersUrls: ['test0', 'test2'],
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
