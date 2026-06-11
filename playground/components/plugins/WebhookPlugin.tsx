import React, { useState } from 'react';
import { AsyncApiPlugin, PluginAPI, PluginSlot, PluginContext } from '@asyncapi/react-component';
import { ExecutionResult, useExecution } from './ExecutionResult';

const WebhookExecutionComponent: React.FC<{ context: PluginContext }> = ({ context }) => {
  const { schema } = context;
  const schemaObj = schema as Record<string, any>;
  const operation = schemaObj?.operation;

  const [endpoint, setEndpoint] = useState('');
  const { response, error, loading, executeRequest, setError } = useExecution();

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
    await executeRequest(
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: payloadString,
      }),
      'Simulation failed. Ensure the endpoint is reachable and configured for CORS.'
    );
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

      <ExecutionResult error={error} response={response} errorMessage="Simulation Failed" />
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
