import { SecuritySchemeInterface } from '@asyncapi/parser';

export class ServerHelpers {
  static securityType(value: string) {
    switch (value) {
      case 'apiKey':
        return 'API key';
      case 'oauth2':
        return 'OAuth2';
      case 'openIdConnect':
        return 'Open ID';
      case 'http':
        return 'HTTP';
      case 'userPassword':
        return 'User/Password';
      case 'X509':
        return 'X509:';
      case 'symmetricEncryption':
        return 'Symmetric Encription';
      case 'asymmetricEncryption':
        return 'Asymmetric Encription';
      case 'httpApiKey':
        return 'HTTP API key';
      case 'scramSha256':
        return 'ScramSha256';
      case 'scramSha512':
        return 'ScramSha512';
      case 'gssapi':
        return 'GSSAPI';
      default:
        return 'API key';
    }
  }

  static flowName(value: string) {
    switch (value) {
      case 'implicit':
        return 'Implicit';
      case 'password':
        return 'Password';
      case 'clientCredentials':
        return 'Client credentials';
      case 'authorizationCode':
        return 'Authorization Code';
      default:
        return 'Implicit';
    }
  }

  static getKafkaSecurity(
    protocol: string,
    securitySchema: SecuritySchemeInterface | null,
  ) {
    let securityProtocol;
    let saslMechanism;
    if (protocol === 'kafka') {
      if (securitySchema) {
        securityProtocol = 'SASL_PLAINTEXT';
      } else {
        securityProtocol = 'PLAINTEXT';
      }
    } else if (securitySchema) {
      securityProtocol = 'SASL_SSL';
    } else {
      securityProtocol = 'SSL';
    }

    if (securitySchema) {
      switch (securitySchema.type()) {
        case 'plain':
          saslMechanism = 'PLAIN';
          break;
        case 'scramSha256':
          saslMechanism = 'SCRAM-SHA-256';
          break;
        case 'scramSha512':
          saslMechanism = 'SCRAM-SHA-512';
          break;
        case 'oauth2':
          saslMechanism = 'OAUTHBEARER';
          break;
        case 'gssapi':
          saslMechanism = 'GSSAPI';
          break;
        case 'X509':
          securityProtocol = 'SSL';
          break;
      }
    }

    return { securityProtocol, saslMechanism };
  }
}
