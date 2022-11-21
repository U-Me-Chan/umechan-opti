export const isServer = () => typeof window === 'undefined';
export type UnwrapArray<T> = T extends Array<infer U> ? U : T;
