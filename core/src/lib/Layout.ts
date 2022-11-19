import { FastifyRequest } from 'fastify';
import { Newable } from './Newable';
import { Component } from "./Component";

export interface LayoutInterface {
  name: string;
  direction: 'row' | 'column';
  content: {
    type: 'component' | 'layout';
    item: Newable<Component<unknown>> | Newable<Layout>;
  }[];
}

export class Layout implements LayoutInterface {
  name = 'defaultLayout';
  direction: 'row' | 'column' = 'row';
  content: LayoutInterface['content'] = [];
  resolved: {
    type: 'component' | 'layout';
    name: string;
    direction: string;
    item: Component<unknown>['state'] | Layout['resolved'];
  }[] = [];

  async resolve(req: FastifyRequest) {
    for (let contentItem of this.content) {
      const { type, item } = contentItem;
      const instance = new item();

      if (instance instanceof Layout) {
        await instance.resolve(req);
        this.resolved.push({ type, name: instance.name, direction: instance.direction, item: instance.resolved });
      } else {
        if (instance.stateLoader) {
          try {
            await instance.stateLoader(req);
          } catch (e) {
            console.log((e as Error).message);
          }
        }

        this.resolved.push({ type, name: instance.name, direction: '', item: instance.state });
      }
    }
  }
}
