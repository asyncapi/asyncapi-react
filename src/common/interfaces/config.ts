export interface Config {
  show: {
    info: boolean;
    servers: boolean;
  }
}

export const defaultConfig: Config = {
  show: {
    info: true,
    servers: true
  }
}