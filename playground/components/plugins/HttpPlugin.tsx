import React from 'react';
import { AsyncApiPlugin, PluginAPI, PluginSlot, PluginContext } from '@asyncapi/react-component';
import { ExecutionResult, useExecution } from './ExecutionResult';

const HttpExecutionComponent: React.FC<{ context: PluginContext }> = ({ context }) => {
  const { schema } = context;
  const schemaObj = schema as Record<string, any>;
  const operation = schemaObj?.operation;
  const channel = schemaObj?.channel;

  const { response, error, loading, executeRequest } = useExecution();

  const hasHttpBinding = channel?.bindings()?.has('http') || operation?.bindings()?.has('http');
  const isWebhook = typeof operation?.isWebhook === 'function' ? operation.isWebhook() : false;

  if (!hasHttpBinding || isWebhook) {
    return null;
  }

  const handleExecute = async () => {
    const servers = typeof channel?.servers === 'function' && channel.servers() ? channel.servers().all() : [];
    const serverUrl = servers.length > 0 ? servers[0].url() : globalThis.location.origin;
    const address = channel?.address() || '';
    
    const baseUrl = serverUrl.replace(/\/$/, '');
    const path = address.startsWith('/') ? address : `/${address}`;
    const fullUrl = `${baseUrl}${path}`;

    const operationBinding = operation?.bindings()?.get('http');
    const channelBinding = channel?.bindings()?.get('http');
    const method = operationBinding?.method || channelBinding?.method || 'GET';

    await executeRequest(
      fetch(fullUrl, {
        method: method.toUpperCase(),
        headers: {
          'Accept': 'application/json, text/plain, */*',
        },
      }),
      'Network failure. Ensure CORS is configured correctly and the server is reachable.'
    );
  };

  return (
    <div className="mt-4 p-6 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">HTTP Execution</h4>
          <p className="text-sm text-gray-500">Fire a real HTTP request using the operation's server bindings.</p>
        </div>
        <button 
          onClick={handleExecute}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Executing...' : 'Send Request'}
        </button>
      </div>

      <ExecutionResult error={error} response={response} errorMessage="Request Failed" />
    </div>
  );
};

export const httpPlugin: AsyncApiPlugin = {
  name: 'default-http-plugin',
  version: '1.0.0',
  description: 'Playground default plugin for HTTP execution',
  install(api: PluginAPI) {
    api.registerComponent(PluginSlot.OPERATION, HttpExecutionComponent);
  }
};
