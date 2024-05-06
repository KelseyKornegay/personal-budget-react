
const jestConfig = {
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    moduleNameMapper: {
      '^.*\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
    },
    testEnvironment: 'node',
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    extensionsToTreatAsEsm: ['.js'],
  };
  
  export default jestConfig;
  
  