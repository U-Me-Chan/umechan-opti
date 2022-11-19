export type SwaggerInfo = {
  description: string;
  version: string;
  title: string;
};

export type SwaggerTag = {
  name: string;
  description: string;
  externalDocs?: SwaggerExternalDocs;
};

export type SwaggerExternalDocs = {
  description: string;
  url: string;
};

export type SwaggerDefinition = SwaggerDefinitionString 
| SwaggerDefinitionInteger 
| SwaggerDefinitionRef 
| SwaggerDefinitionEnum 
| SwaggerDefinitionArray 
| SwaggerDefinitionObject
| SwaggerDefinitionBoolean
| SwaggerAnyOfOneOfDefinition;

export type SwaggerDefinitionBoolean = {
  type: 'boolean';
};

export type SwaggerDefinitionString = {
  type: 'string';
};

export type SwaggerDefinitionInteger = {
  type: 'integer';
  format?: 'int32' | 'int64' | 'float' | 'double';
};

export type SwaggerDefinitionRef = {
  $ref: string;
};

export type SwaggerDefinitionEnum = {
  type: 'string';
  enum: string[];
};

export type SwaggerAnyOfOneOfDefinition = {
  anyOf?: (SwaggerDefinitionRef | SwaggerDefinition)[],
  oneOf?: (SwaggerDefinitionRef | SwaggerDefinition)[],
};

export type SwaggerDefinitionArray = {
  type: 'array';
  xml?: { wrapper: boolean };
  items: SwaggerDefinition;
};

export type SwaggerDefinitionObject = {
  type: 'object';
  required?: string[];
  xml?: { wrapper: boolean };
  properties: Record<string, SwaggerDefinition>;
};

export type SwaggerMimeTypes = 'multipart/form-data' | 'application/json';

export type SwaggerInTarget = 'query' | 'path';

export type SwaggerMethod = 'post' | 'put' | 'patch' | 'get' | 'delete';

export type SwaggerParameter = {
  name: string;
  in: SwaggerInTarget;
  description: string;
  required: boolean;
  schema: SwaggerDefinition;
};

export type SwaggerResponse = {
  description?: string;
  content: Partial<Record<SwaggerMimeTypes, { schema: SwaggerDefinition }>>;
}

export type SwaggerPath = {
  tags: string[];
  summary: string;
  description: string;
  operationId: string;
  parameters?: SwaggerParameter[];
  requestBody?: SwaggerResponse;
  responses: Record<string, SwaggerResponse>;
};
