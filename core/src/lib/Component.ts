import { TypeSchema } from "./TypeSchema";

export interface Component<T> {
  name: string;
  state: T;
  stateLoader?: () => Promise<void>;
  stateTypeSchema?: TypeSchema;
}
