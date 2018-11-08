import * as types from '../types';
import { IConfig } from './config';
import { ITheme } from './theme';

export interface IAsyncApiProps {
  asyncApi: types.AsyncApi;
  theme: ITheme;
  config: IConfig;
}

export interface IInfoProps {
  info: types.Info;
}

export interface IServersProps {
  servers?: types.Server[];
}
