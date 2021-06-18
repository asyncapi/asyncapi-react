export const tuple = JSON.stringify({
  asyncapi: '2.0.0',
  info: {
    title: 'Test',
    version: '1.0.0',
    description: 'Test anyOf/oneOf/allOf in array',
  },
  channels: {
    myChannel: {
      subscribe: {
        message: {
          name: 'myMessage',
          payload: {
            type: 'array',
            items: {
              oneOf: [
                {
                  type: 'boolean',
                },
                {
                  type: 'integer',
                },
              ],
            },
          },
        },
      },
    },
  },
});
