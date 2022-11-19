export type TypeSchema = {
  type: 'object' | 'number' | 'string' | 'boolean' | 'array';
  properties?: Record<string, TypeSchema>;
  of?: TypeSchema;
  required?: boolean;
};
