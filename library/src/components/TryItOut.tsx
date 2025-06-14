import React, { useState, useCallback, useMemo } from 'react';
import Form from '@rjsf/antd';
import validator from '@rjsf/validator-ajv8';

interface TryItOutFormProps {
  schemaPayload: any;
  channelName: string;
  backendUrl: string;
}

interface FormState {
  formData: any;
  rawText: string;
  sent: boolean;
  error: string | null;
  isLoading: boolean;
  showRaw: boolean;
  sendToRealBroker: boolean;
  endpointUrl: string;
  showUrlInput: boolean;
  responseData: any | null;
}

export const TryItOutForm: React.FC<TryItOutFormProps> = ({
  backendUrl,
  channelName,
  schemaPayload,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<FormState>({
    formData: {},
    rawText: '{}',
    sent: false,
    error: null,
    isLoading: false,
    showRaw: false,
    sendToRealBroker: false,
    endpointUrl: `${window.origin}/${backendUrl}`,
    showUrlInput: false,
    responseData: null,
  });

  const normalizeSchema = useCallback((schema: any): any => {
    if (!schema || typeof schema !== 'object') return schema;

    const clean = { ...schema };

    const fieldsToRemove = [
      'x-parser-schema-id',
      'anySchema',
      'cannotBeDefined',
      'maximum',
      'minimum',
      'oneOf',
      'readOnly',
      'writeOnly',
      'description',
    ];

    fieldsToRemove.forEach((field) => delete clean[field]);

    if (clean.properties) {
      clean.properties = Object.entries(clean.properties).reduce(
        (acc, [key, prop]) => {
          if (prop === false || (prop as any)?.cannotBeDefined === false)
            return acc;
          return { ...acc, [key]: normalizeSchema(prop) };
        },
        {},
      );
    }

    if (clean.dependencies) {
      clean.dependencies = Object.entries(clean.dependencies).reduce(
        (acc, [key, dep]) => ({ ...acc, [key]: normalizeSchema(dep) }),
        {},
      );
    }

    ['if', 'then', 'else'].forEach((field) => {
      if (clean[field]) clean[field] = normalizeSchema(clean[field]);
    });

    if (Array.isArray(clean.oneOf)) {
      clean.oneOf = clean.oneOf.map(normalizeSchema);
    }

    return clean;
  }, []);

  const sanitizeSchema = useCallback((schema: any) => {
    if (schema === true) return {};
    if (typeof schema !== 'object' || schema === null) return schema;

    const cleaned = { ...schema };

    if (cleaned.properties) {
      cleaned.properties = Object.entries(cleaned.properties).reduce(
        (acc, [key, prop]) => ({ ...acc, [key]: sanitizeSchema(prop) }),
        {},
      );
    }

    const problematicFields = [
      'additionalProperties',
      'dependencies',
      'patternProperties',
      'definitions',
    ];

    problematicFields.forEach((field) => {
      if (cleaned[field] === true) {
        cleaned[field] = {};
      }
    });

    return cleaned;
  }, []);

  const cleanedSchema = useMemo(
    () => sanitizeSchema(normalizeSchema(schemaPayload)),
    [schemaPayload, normalizeSchema, sanitizeSchema],
  );

  const handleSubmit = useCallback(
    async (data: any) => {
      setState((prev) => ({
        ...prev,
        responseData: null,
        isLoading: true,
        error: null,
      }));

      try {
        const payload = {
          channelName,
          message: data,
          options: {
            sendToRealBroker: state.sendToRealBroker,
            timestamp: new Date().toISOString(),
          },
        };

        const response = await fetch(state.endpointUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const responseJson = await response.json();

        if (!response.ok) {
          throw new Error(
            responseJson.message || `HTTP error! status: ${response.status}`,
          );
        }

        setState((prev) => ({
          ...prev,
          responseData: responseJson,
          sent: true,
          isLoading: false,
        }));

        setTimeout(() => setState((prev) => ({ ...prev, sent: false })), 3000);
      } catch (e: any) {
        setState((prev) => ({
          ...prev,
          error: e.message,
          isLoading: false,
        }));
      }
    },
    [channelName, state.sendToRealBroker, state.endpointUrl],
  );

  const handleRawSend = useCallback(() => {
    try {
      const parsed = JSON.parse(state.rawText);
      handleSubmit(parsed);
    } catch (e: any) {
      setState((prev) => ({ ...prev, error: 'Invalid JSON: ' + e.message }));
    }
  }, [state.rawText, handleSubmit]);

  const updateState = useCallback((updates: Partial<FormState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const EndpointIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      style={{ marginRight: '5px' }}
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  );

  const LoadingSpinner = () => (
    <svg
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        marginRight: '8px',
        animation: 'spin 1s linear infinite',
      }}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
    </svg>
  );

  if (!isOpen) {
    return (
      <div className='mt-5'>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: '#61affe',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.2s',
          }}
        >
          Try it out
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        margin: '20px 0',
        fontFamily: '"Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          marginTop: '15px',
          border: '1px solid #e1e4e8',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <div style={{ display: 'flex', gap: '5px' }}>
            <button
              onClick={() => updateState({ showRaw: false })}
              style={{
                background: state.showRaw ? 'none' : '#f0f0f0',
                border: 'none',
                padding: '8px 16px',
                cursor: 'pointer',
                borderTopLeftRadius: '6px',
                borderBottomLeftRadius: '6px',
                fontWeight: state.showRaw ? 'normal' : '600',
                color: state.showRaw ? '#666' : '#333',
                transition: 'all 0.2s',
              }}
            >
              Form
            </button>
            <button
              onClick={() => updateState({ showRaw: true })}
              style={{
                background: state.showRaw ? '#f0f0f0' : 'none',
                border: 'none',
                padding: '8px 16px',
                cursor: 'pointer',
                borderTopRightRadius: '6px',
                borderBottomRightRadius: '6px',
                fontWeight: state.showRaw ? '600' : 'normal',
                color: state.showRaw ? '#333' : '#666',
                transition: 'all 0.2s',
              }}
            >
              Raw JSON
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button
              onClick={() => updateState({ showUrlInput: !state.showUrlInput })}
              style={{
                background: 'none',
                border: 'none',
                color: '#666',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <EndpointIcon />
              Endpoint URL
            </button>
          </div>
        </div>

        {state.showUrlInput && (
          <div
            style={{
              marginBottom: '20px',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              border: '1px solid #e1e4e8',
            }}
          >
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                color: '#333',
                fontSize: '14px',
              }}
            >
              API Endpoint URL
            </label>
            <input
              type="text"
              value={state.endpointUrl}
              onChange={(e) => updateState({ endpointUrl: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
              placeholder="Enter API endpoint URL"
            />
          </div>
        )}

        {state.showRaw ? (
          <div>
            <textarea
              value={state.rawText}
              onChange={(e) => updateState({ rawText: e.target.value })}
              style={{
                width: '100%',
                height: '200px',
                fontFamily: '"Fira Code", monospace',
                padding: '15px',
                borderRadius: '6px',
                border: '1px solid #e1e4e8',
                backgroundColor: '#f8f9fa',
                fontSize: '14px',
                lineHeight: '1.5',
                resize: 'vertical',
                minHeight: '150px',
              }}
              spellCheck="false"
            />
            <div
              style={{
                marginTop: '15px',
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #e1e4e8',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={state.sendToRealBroker}
                  onChange={(e) =>
                    updateState({ sendToRealBroker: e.target.checked })
                  }
                  style={{
                    marginRight: '10px',
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                  }}
                />
                <span style={{ fontWeight: 500 }}>
                  Send to real message broker
                </span>
              </label>
              <p
                style={{
                  marginTop: '8px',
                  color: '#666',
                  fontSize: '13px',
                  lineHeight: '1.4',
                }}
              >
                When enabled, the message will be published to the actual broker
                instead of test environment.
              </p>
            </div>
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
              }}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  backgroundColor: 'transparent',
                  color: '#666',
                  padding: '10px 20px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRawSend}
                style={{
                  backgroundColor: '#61affe',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                }}
                disabled={state.isLoading}
              >
                {state.isLoading ? (
                  <>
                    <LoadingSpinner />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <Form
              schema={cleanedSchema}
              formData={state.formData}
              onChange={({ formData }: any) => {
                // any
                updateState({ formData });
                updateState({ rawText: JSON.stringify(formData, null, 2) });
              }}
              onSubmit={({ formData }: any) => handleSubmit(formData)} // any
              validator={validator}
              liveValidate
              className="rjsf-custom"
              templates={{}}
            >
              <div
                style={{
                  marginTop: '15px',
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px',
                  border: '1px solid #e1e4e8',
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={state.sendToRealBroker}
                    onChange={(e) =>
                      updateState({ sendToRealBroker: e.target.checked })
                    }
                    style={{
                      marginRight: '10px',
                      width: '16px',
                      height: '16px',
                      cursor: 'pointer',
                    }}
                  />
                  <span style={{ fontWeight: 500 }}>
                    Send to real message broker
                  </span>
                </label>
                <p
                  style={{
                    marginTop: '8px',
                    color: '#666',
                    fontSize: '13px',
                    lineHeight: '1.4',
                  }}
                >
                  When enabled, the message will be published to the actual
                  broker instead of test environment.
                </p>
              </div>
              <div
                style={{
                  marginTop: '20px',
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'flex-end',
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#666',
                    padding: '10px 20px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#61affe',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                  disabled={state.isLoading}
                >
                  {state.isLoading ? (
                    <>
                      <LoadingSpinner />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </Form>
          </div>
        )}

        {state.sent && (
          <div
            style={{
              marginTop: '20px',
              padding: '15px',
              backgroundColor: '#edf7ed',
              color: '#4caf50',
              borderRadius: '6px',
              border: '1px solid #c8e6c9',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4caf50"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Message sent successfully to {state.endpointUrl}
          </div>
        )}

        {state.responseData && (
          <div
            style={{
              marginTop: '20px',
              padding: '15px',
              backgroundColor: '#f0f4f8',
              borderRadius: '6px',
              border: '1px solid #cfd8dc',
            }}
          >
            <div
              style={{
                fontWeight: 600,
                marginBottom: '10px',
                color: '#333',
              }}
            >
              Response
            </div>
            <pre
              style={{
                backgroundColor: '#ffffff',
                padding: '12px',
                borderRadius: '4px',
                fontSize: '13px',
                lineHeight: '1.5',
                color: '#444',
                whiteSpace: 'pre-wrap',
                overflowX: 'auto',
                border: '1px solid #e0e0e0',
              }}
            >
              {JSON.stringify(state.responseData, null, 2)}
            </pre>
          </div>
        )}

        {state.error && (
          <div
            style={{
              marginTop: '20px',
              padding: '15px',
              backgroundColor: '#fdecea',
              color: '#f44336',
              borderRadius: '6px',
              border: '1px solid #ffcdd2',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f44336"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            Error: {state.error}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
