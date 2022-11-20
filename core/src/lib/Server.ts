import { SchemaToSwagger } from './Swagger/SchemaToSwagger';
import { Newable } from './Newable';
import { SwaggerSchema } from './Swagger/SwaggerSchema';
import { Page } from './Page';
import Fastify, { FastifyInstance } from 'fastify'
import { SwaggerWriter } from './Swagger/SwaggerWriter';
import { Component } from './Component';

export class Server {
  fastify: FastifyInstance;
  pages: Page[] = [];
  swagger = new SwaggerSchema();

  constructor() {
    this.fastify = Fastify({
      logger: true
    });

    this.fastify.get(`/pages`, async () => {
      return this.pages.map(page => `/page/${page.name}`);
    });

    this.fastify.get('/docs/swagger.json', async () => {
      const writer = new SwaggerWriter(this.swagger);
      return writer.generate();
    });

    this.fastify.get('/docs/swagger', async (req, rep) => {
      return rep
        .header('Content-Type', 'text/html; charset=utf-8')
        .send(docsHtml);
    });

    const converter = new SchemaToSwagger(this.swagger);
    converter.writeLayoutRef();
  }

  addPage(pageCls: Newable<Page>) {
    const page = new pageCls();
    this.pages.push(page);
    this.fastify.get(`/page/${page.name}`, async (req) => {
      return await page.getLayout(req);
    });

    const converter = new SchemaToSwagger(this.swagger);
    converter.addPage(page);
    return this;
  }

  addComponent(component: Newable<Component<unknown>>) {
    const converter = new SchemaToSwagger(this.swagger);
    converter.addComponent(component);
    return this;
  }

  async listen(port: number) {
    await this.fastify.listen({ port });
  }
}

const docsHtml = `
<!DOCTYPE html>
<html>
  <head>
    <title>Redoc</title>
    <!-- needed for adaptive design -->
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">

    <!--
    Redoc doesn't change outer page styles
    -->
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <redoc spec-url='/docs/swagger.json'></redoc>
    <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"> </script>
  </body>
</html>
`;