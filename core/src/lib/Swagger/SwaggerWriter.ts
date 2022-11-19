import { writeFile } from "fs/promises";
import { SwaggerSchema } from "./SwaggerSchema";

export class SwaggerWriter {
  constructor(private schema: SwaggerSchema) {}

  generate() {
    const schema: Record<string, unknown> = {
      openapi: this.schema._openapi,
      info: this.schema._info,
      tags: this.schema._tags,
      paths: this.schema._paths,
      components: { schemas: this.schema._definitions },
      servers: this.schema._servers,
    };

    if (this.schema._externalDocs) {
      schema.externalDocs = this.schema._externalDocs;
    }

    return schema;
  }

  getJson() {
    const schema = this.generate();
    return JSON.stringify(schema, null, 2);
  }

  async writeJson(path: string) {
    await writeFile(path, this.getJson());
  }
}
