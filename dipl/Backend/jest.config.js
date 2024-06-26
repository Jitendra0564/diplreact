// jest.config.js

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js"],
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/backend/_mocks_/fileMock.js',
  },
};

