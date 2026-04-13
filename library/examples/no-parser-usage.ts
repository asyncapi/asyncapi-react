/**
 * Example: Using @asyncapi/react-component without the parser runtime
 *
 * This demonstrates how to use pre-parsed AsyncAPI documents
 * with the React component, avoiding bundling the parser.
 *
 * Run: npx tsx example-no-parser.ts
 */

import type { AsyncAPIDocumentInterface } from '@asyncapi/parser';

// ─── Example 1: Basic usage with a pre-parsed document ──────────────

const myAsyncAPIDoc: AsyncAPIDocumentInterface = {
  asyncapi: '3.0.0',
  info: {
    title: 'Example Service',
    version: '1.0.0',
  },
  channels: {
    'user/signedup': {
      address: 'user/signedup',
      messages: {
        UserSignedUp: {
          $ref: '#/components/messages/UserSignedUp',
        },
      },
    },
  },
  operations: {
    'user/signedupSubscribe': {
      action: 'receive',
      channel: {
        $ref: '#/channels/user/signedup',
      },
    },
  },
  components: {
    messages: {
      UserSignedUp: {
        payload: {
          type: 'object',
          properties: {
            fullName: { type: 'string' },
            email: { type: 'string' },
          },
        },
      },
    },
  },
};

// In a real app, you would pass this to the component:
// import AsyncApiComponent from '@asyncapi/react-component/lib/without-parser';
//
// function App() {
//   return <AsyncApiComponent schema={myAsyncAPIDoc} />;
// }

console.log('✅ No-parser example loaded successfully');
console.log(`   Document: ${myAsyncAPIDoc.info.title} v${myAsyncAPIDoc.info.version}`);
console.log(`   Channels: ${Object.keys(myAsyncAPIDoc.channels).length}`);
console.log(`   Messages: ${Object.keys(myAsyncAPIDoc.components.messages).length}`);

// ─── Example 2: Type-only imports (zero runtime cost) ───────────────

import type { BaseModel } from '@asyncapi/parser';

function inspectModel(model: BaseModel): string {
  return model.id() || 'unknown';
}

// Type imports are fully erased at compile time — no parser code in bundle!
export type { AsyncAPIDocumentInterface, BaseModel };
