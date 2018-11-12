export interface ConfigInterface {
    show: {
      info: boolean;
      security: boolean;
      servers: boolean;
      topics: boolean;
      stream: boolean;
      events: boolean;
      messages: boolean;
      schemas: boolean;
    }
  }
  
  export type PartialConfigInterface = Partial<ConfigInterface>;
  