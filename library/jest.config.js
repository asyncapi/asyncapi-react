module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  rootDir: 'src',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleNameMapper: {
    '^nimma/legacy$':
      '<rootDir>/../node_modules/nimma/dist/legacy/cjs/index.js',
    '^nimma/(.*)': '<rootDir>/../node_modules/nimma/dist/cjs/$1',
  },
};
