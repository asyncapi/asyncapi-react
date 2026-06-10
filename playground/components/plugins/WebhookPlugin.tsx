import React, { useState } from 'react';
import { AsyncApiPlugin, PluginAPI, PluginSlot, PluginContext } from '@asyncapi/react-component';

const WebhookExecutionComponent: React.FC<{ context: PluginContext }> = ({ context }) => {
  const { schema } = context;
  const operation = (schema as any)?.operation;

  const [endpoint, setEndpoint] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isWebhook = typeof operation?.isWebhook === 'function' ? operation.isWebhook() : false;

  if (!isWebhook) {
    return null;
  }

  // Extract expected payload from the first message
  const messages = operation.messages ? operation.messages().all() : [];
  const firstMessage = messages.length > 0 ? messages[0] : null;
  const payloadSchema = firstMessage?.payload ? firstMessage.payload().json() : null;
  
  // A simple placeholder payload generation based on type
  const generateMockPayload = (schema: any) => {
    if (!schema) return {};
    if (schema.example) return schema.example;
    if (schema.examples && schema.examples.length > 0) return schema.examples[0];
    if (schema.type === 'object' && schema.properties) {
      const obj: any = {};
      Object.keys(schema.properties).forEach(k => {
        const propType = schema.properties[k].type;
        if (propType === 'string') {
          obj[k] = 'string';
        } else if (propType === 'integer') {
          obj[k] = 1;
        } else if (propType === 'boolean') {
          obj[k] = true;
        } else {
          obj[k] = null;
        }
      });
      return obj;
    }
    return { mock: "payload" };
  };

  const expectedPayload = generateMockPayload(payloadSchema);
  const payloadString = JSON.stringify(expectedPayload, null, 2);

  const handleSimulate = async () => {
    if (!endpoint) {
       setError("Please provide an endpoint URL to simulate delivery.");
       return;
    }
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: payloadString,
      });

      const data = await res.text();
      let parsedData: any = data;
      try {
        parsedData = JSON.parse(data);
      } catch (e) {
        console.debug('Failed to parse webhook response as JSON', e);
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data: parsedData,
      });
    } catch (err: any) {
      setError(err.message || 'Simulation failed. Ensure the endpoint is reachable and configured for CORS.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-6 border rounded-lg bg-white shadow-sm border-purple-100">
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-purple-800 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Webhook Simulation
        </h4>
        <p className="text-sm text-gray-500">Simulate delivery of the expected incoming payload to a configured endpoint.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="webhook-endpoint" className="block text-sm font-medium text-gray-700 mb-1">Target Endpoint</label>
          <input 
            id="webhook-endpoint"
            type="url" 
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://your-server.com/webhook"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="expected-payload" className="block text-sm font-medium text-gray-700 mb-1">Expected Payload</label>
          <pre id="expected-payload" className="p-3 bg-gray-50 border rounded-md text-xs font-mono text-gray-800 overflow-x-auto">
            {payloadString}
          </pre>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={handleSimulate}
            disabled={loading || !endpoint}
            className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded shadow hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Simulating...' : 'Simulate Delivery'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <h5 className="text-sm font-medium text-red-800">Simulation Failed</h5>
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
        </div>
      )}
    </div>
  );
};

export const webhookPlugin: AsyncApiPlugin = {
  name: 'default-webhook-plugin',
  version: '1.0.0',
  description: 'Playground default plugin for Webhook simulation',
  install(api: PluginAPI) {
    api.registerComponent(PluginSlot.OPERATION, WebhookExecutionComponent);
  }
};
