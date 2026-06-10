import React from 'react';

interface ExecutionResultProps {
  error: string | null;
  response: any;
  title?: string;
  errorMessage?: string;
}

export const ExecutionResult: React.FC<ExecutionResultProps> = ({ error, response, errorMessage = 'Request Failed' }) => {
  return (
    <>
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <h5 className="text-sm font-medium text-red-800">{errorMessage}</h5>
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

          {response.headers && (
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
          )}
        </div>
      )}
    </>
  );
};
