import React, { useState } from 'react';
import { AsyncApiPlugin, PluginAPI, PluginSlot, ComponentSlotProps } from '@asyncapi/react-component';

const HttpExecutionComponent: React.FC<ComponentSlotProps> = ({ context }) => {
  const { schema } = context;
  const { operation, channel } = schema as any;

  const hasHttpBinding = channel?.bindings()?.has('http') || operation?.bindings()?.has('http');
  const isWebhook = typeof operation?.isWebhook === 'function' ? operation.isWebhook() : false;

  if (!hasHttpBinding || isWebhook) {
    return null;
  }

  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExecute = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const servers = typeof channel?.servers === 'function' && channel.servers() ? channel.servers().all() : [];
      const serverUrl = servers.length > 0 ? servers[0].url() : window.location.origin;
      const address = channel?.address() || '';
      
      const baseUrl = serverUrl.replace(/\/$/, '');
      const path = address.startsWith('/') ? address : `/${address}`;
      const fullUrl = `${baseUrl}${path}`;

      const operationBinding = operation?.bindings()?.get('http');
      const channelBinding = channel?.bindings()?.get('http');
      const method = operationBinding?.method || channelBinding?.method || 'GET';

      const res = await fetch(fullUrl, {
        method: method.toUpperCase(),
        headers: {
          'Accept': 'application/json, text/plain, */*',
        },
      });

      const data = await res.text();
      let parsedData: any = data;
      try {
        parsedData = JSON.parse(data);
      } catch (e) {
        // Leave as string if not JSON
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data: parsedData,
      });
    } catch (err: any) {
      setError(err.message || 'Network failure. Ensure CORS is configured correctly and the server is reachable.');
    } finally {
      setLoading(false);
    }
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

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <h5 className="text-sm font-medium text-red-800">Request Failed</h5>
          <p className="mt-1 text-sm text-red-700">{error}</p>
        </div>
      )}

      {response && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              response.status >= 200 && response.status < 300 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {response.status} {response.statusText}
            </span>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b">
              <h5 className="text-sm font-medium text-gray-700">Response Body</h5>
            </div>
            <div className="p-4 bg-gray-900 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono">
                {typeof response.data === 'string' ? response.data : JSON.stringify(response.data, null, 2)}
              </pre>
            </div>
          </div>

          <details className="group">
            <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900 flex items-center">
              <svg className="w-4 h-4 mr-1 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Response Headers
            </summary>
            <div className="mt-2 p-4 bg-gray-50 border rounded-md overflow-x-auto">
              <pre className="text-xs text-gray-600 font-mono">
                {JSON.stringify(response.headers, null, 2)}
              </pre>
            </div>
          </details>
        </div>
      )}
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
