class BindingsHelper {
  private schemaObjectKeys: string[] = [
    'http.query',
    'kafka.groupId',
    'kafka.clientId',
    'kafka.key',
    'ws.headers',
    'ws.query',
  ];

  isSchemaObject(context: string, bindingType: string): boolean {
    return (
      this.schemaObjectKeys.find(e => e === `${bindingType}.${context}`) !==
      undefined
    );
  }

  isObject(value: any): boolean {
    const type = typeof value;
    return type === 'function' || (type === 'object' && !!value);
  }
}
export const bindingsHelper = new BindingsHelper();
