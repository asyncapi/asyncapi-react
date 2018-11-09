export interface Theme {
  show: {
    info: boolean;
    servers: boolean;
    topics: boolean;
    stream: boolean;
    events: boolean;
  }
}

export const defaultTheme: Theme = {
  show: {
    info: true,
    servers: true,
    topics: true,
    stream: true,
    events: true,
  }
}