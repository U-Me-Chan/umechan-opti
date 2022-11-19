import { FastifyRequest } from 'fastify';
import { TypeSchema } from "./TypeSchema";

export interface Component<T> {
  name: string;
  state: T;
  stateLoader?: (req: FastifyRequest) => Promise<void>;
  stateTypeSchema?: TypeSchema;
}
