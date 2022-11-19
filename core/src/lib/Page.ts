import { Newable } from './Newable';
import { Layout } from './Layout';
import { FastifyRequest } from 'fastify';

export class Page {
  name: string;
  layout: Newable<Layout>;

  constructor(name: string, layout: Newable<Layout>) {
    this.name = name;
    this.layout = layout;
  }

  async getLayout(req: FastifyRequest) {
    const instance = new this.layout();
    await instance.resolve(req);
    return instance.resolved;
  }
}
