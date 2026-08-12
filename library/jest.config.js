module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Jest >=28 resolves packages under the `browser` export condition in the
  // jsdom environment, which hands us ESM-only browser builds (jsonpath-plus,
  // via @stoplight/spectral-core). Keep the Node conditions everywhere so the
  // CJS builds are used, as they were before the Jest 26 -> 30 upgrade.
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },

  setupFiles: ['<rootDir>/../jest.setup.js'],

  rootDir: 'src',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleNameMapper: {
    '^nimma/legacy$':
      '<rootDir>/../../node_modules/nimma/dist/legacy/cjs/index.js',
    '^nimma/(.*)': '<rootDir>/../../node_modules/nimma/dist/cjs/$1',
  },
};
