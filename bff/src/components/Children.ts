import { TypeSchema, Component } from 'core';

type T = Component<{}>;

class Children implements T {
  name = 'Children';
  state: T['state'] = {};
  stateLoader: T['stateLoader'] = async () => {};
  stateTypeSchema: TypeSchema = { type: 'string' };
}

export default Children;
