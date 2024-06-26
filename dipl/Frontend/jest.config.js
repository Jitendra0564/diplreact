// jest.config.js
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.jsx"],
  testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/file-mock.js',
    },
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
     
    },
  };
  