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
      tsconfig: 'tsconfig.esm.json',
    },
  },
};
