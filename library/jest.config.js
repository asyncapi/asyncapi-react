module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
};
