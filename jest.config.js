// jest.config.js

module.exports = {
    // The test environment that will be used for testing
    testEnvironment: 'node',
    
    // The glob patterns Jest uses to detect test files
    testMatch: [
      '**/__tests__/**/*.js',
      '**/?(*.)+(spec|test).js'
    ],
    
    // An array of regexp pattern strings that are matched against all test paths
    // matched tests are skipped
    testPathIgnorePatterns: [
      '/node_modules/'
    ],
    
    // Indicates whether each individual test should be reported during the run
    verbose: true,
    
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
    
    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',
    
    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '/__tests__/'
    ],
    
    // The glob patterns Jest uses to detect coverage files
    coverageReporters: [
      'json',
      'text',
      'lcov',
      'clover'
    ],
    
    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: ['text', 'lcov'],
    
    // An object that configures minimum threshold enforcement for coverage results
    coverageThreshold: {
      global: {
        branches: 70,
        functions: 80,
        lines: 80,
        statements: 80
      }
    },
    
    // Setup files after environment is set up
    setupFilesAfterEnv: [],
    
    // The maximum amount of workers used to run your tests (defaults to # of CPUs - 1)
    maxWorkers: '50%'
  };