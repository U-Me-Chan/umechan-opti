import { Newable } from './Newable';
import { Layout } from './Layout';

export class Page {
  name: string;
  layout: Newable<Layout>;

  constructor(name: string, layout: Newable<Layout>) {
    this.name = name;
    this.layout = layout;
  }

  async getLayout() {
    const instance = new this.layout();
    await instance.resolve();
    return instance.resolved;
  }
}
