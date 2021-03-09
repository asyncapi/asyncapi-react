class BindingsHelper {
  /**
   *
   * Since we do not have a reliable way to identify schema objects via a spec, schema or similar - using a list of known
   * binding properties of type SchemaObject
   * Change it when AsyncAPI will support JSON Schema specification (definition) for bindings
   */
  private schemaObjectKeys: string[] = [
    'http.query',
    'kafka.groupId',
    'kafka.clientId',
    'kafka.key',
    'ws.headers',
    'ws.query',
  ];

  isSchemaObject(context: string, bindingType: string): boolean {
    return this.schemaObjectKeys.includes(`${bindingType}.${context}`);
  }

  isObject(value: any): boolean {
    const type = typeof value;
    return type === 'function' || (type === 'object' && !!value);
  }
}
export const bindingsHelper = new BindingsHelper();
