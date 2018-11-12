import { AsyncApi } from './types';

export type PrimitiveType = number | boolean | string | null;
export type Map<K extends string, V = any> = { [key in K]: V }
export type PropsWithDefaults<T, D> = T & D;
export type TypeWithKey<T, V> = { key: T, content: V };
