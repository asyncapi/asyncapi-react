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
}
