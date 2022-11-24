import { Newable } from './Newable';
import { Layout } from './Layout';
import { FastifyRequest } from 'fastify';
import { TypeSchema } from "./TypeSchema";

export class Page {
  name: string;
  layout: Newable<Layout>;
  queryParams?: [string, TypeSchema][];

  constructor(name: string, layout: Newable<Layout>, queryParams?: [string, TypeSchema][]) {
    this.name = name;
    this.layout = layout;
    this.queryParams = queryParams;
  }

  async getLayout(req: FastifyRequest) {
    const instance = new this.layout();
    await instance.resolve(req);
    return instance.resolved;
  }
}
