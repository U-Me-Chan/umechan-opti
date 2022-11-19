import { Page } from './../Page';
import { SwaggerDefinition } from './types';
import { TypeSchema } from './../TypeSchema';
import { Component } from '../Component';
import { Newable } from './../Newable';
import { SwaggerSchema } from './SwaggerSchema';

const convertTypeSchemaToSwaggerDefinition = (typeSchema: TypeSchema): SwaggerDefinition => {
  if (typeSchema.type === 'object') {
    return {
      type: 'object',
      properties: Object.fromEntries(
        Object.entries(typeSchema.properties || {})
          .map(([key, prop]) => [key, convertTypeSchemaToSwaggerDefinition(prop)])
      ),
    };
  }

  if (typeSchema.type === 'array') {
    return {
      type: 'array',
      items: convertTypeSchemaToSwaggerDefinition(typeSchema.of || { type: 'string' })
    };
  }

  if (typeSchema.type === 'string') {
    return {
      type: 'string'
    };
  }

  if (typeSchema.type === 'boolean') {
    return {
      type: 'boolean'
    };
  }

  if (typeSchema.type === 'number') {
    return {
      type: 'integer',
      format: 'int32'
    };
  }

  return {
    type: 'string',
  };
}

export class SchemaToSwagger {
  constructor(private swagger: SwaggerSchema) {}

  addComponent(component: Newable<Component<unknown>>) {
    const instance = new component();
    const { name, stateTypeSchema } = instance;

    this.swagger.definition(
      `Component${name}State`,
      convertTypeSchemaToSwaggerDefinition(stateTypeSchema || { type: 'string' }),
    );

    // TODO: fix typings
    // @ts-ignore
    this.swagger._definitions['LayoutRef'].items.properties.item.anyOf.push({
      '$ref': `#/components/schemas/Component${name}State`
    });
  }

  addPage(page: Page) {
    this.swagger.path(`/page/${page.name}`, 'get', {
      tags: ['common'],
      summary: `Returns layout and components for page ${page.name}`,
      description: `Returns layout and components for page ${page.name}`,
      operationId: `getlistof_${page.name.toLowerCase()}`,
      parameters: [],
      responses: {
        200: {
          description: `List of ${page.name}Entity`,
          content: {
            'application/json': {
              schema: {
                // type: 'string'
                $ref: `#/components/schemas/LayoutRef`,
              },
            },
          },
        },
      },
    });
  }
}
