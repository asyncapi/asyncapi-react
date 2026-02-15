import { ServerHelpers } from '../server';

describe('ServerHelpers', () => {
  describe('.securityType', () => {
    test('should map known security types', () => {
      expect(ServerHelpers.securityType('apiKey')).toBe('API key');
      expect(ServerHelpers.securityType('oauth2')).toBe('OAuth2');
      expect(ServerHelpers.securityType('scramSha256')).toBe('ScramSha256');
    });

    test('should fallback to default', () => {
      expect(ServerHelpers.securityType('unknown')).toBe('API key');
    });
  });

  describe('.flowName', () => {
    test('should map known flow names', () => {
      expect(ServerHelpers.flowName('implicit')).toBe('Implicit');
      expect(ServerHelpers.flowName('password')).toBe('Password');
      expect(ServerHelpers.flowName('authorizationCode')).toBe(
        'Authorization Code',
      );
    });

    test('should fallback to default', () => {
      expect(ServerHelpers.flowName('unknown')).toBe('Implicit');
    });
  });

  describe('.getKafkaSecurity', () => {
    const mockSecurity = (type: string) =>
      ({
        type: () => type,
      } as any);

    test('kafka protocol without security', () => {
      const result = ServerHelpers.getKafkaSecurity('kafka', null);
      expect(result).toEqual({
        securityProtocol: 'PLAINTEXT',
        saslMechanism: undefined,
      });
    });

    test('kafka protocol with security', () => {
      const result = ServerHelpers.getKafkaSecurity(
        'kafka',
        mockSecurity('plain'),
      );

      expect(result).toEqual({
        securityProtocol: 'SASL_PLAINTEXT',
        saslMechanism: 'PLAIN',
      });
    });

    test('non-kafka protocol without security', () => {
      const result = ServerHelpers.getKafkaSecurity('amqp', null);
      expect(result).toEqual({
        securityProtocol: 'SSL',
        saslMechanism: undefined,
      });
    });

    test('non-kafka protocol with security', () => {
      const result = ServerHelpers.getKafkaSecurity(
        'amqp',
        mockSecurity('scramSha256'),
      );

      expect(result).toEqual({
        securityProtocol: 'SASL_SSL',
        saslMechanism: 'SCRAM-SHA-256',
      });
    });

    test('scramSha512 mechanism', () => {
      const result = ServerHelpers.getKafkaSecurity(
        'kafka',
        mockSecurity('scramSha512'),
      );

      expect(result.saslMechanism).toBe('SCRAM-SHA-512');
    });

    test('oauth2 mechanism', () => {
      const result = ServerHelpers.getKafkaSecurity(
        'kafka',
        mockSecurity('oauth2'),
      );

      expect(result.saslMechanism).toBe('OAUTHBEARER');
    });

    test('gssapi mechanism', () => {
      const result = ServerHelpers.getKafkaSecurity(
        'kafka',
        mockSecurity('gssapi'),
      );

      expect(result.saslMechanism).toBe('GSSAPI');
    });

    test('X509 forces SSL protocol', () => {
      const result = ServerHelpers.getKafkaSecurity(
        'kafka',
        mockSecurity('X509'),
      );

      expect(result.securityProtocol).toBe('SSL');
    });
  });
});
