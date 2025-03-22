// Add detailed logging for test execution
global.beforeAll(() => {
  console.log('\n=== Starting Test Suite ===\n');
  // Log available industries at the start of the test suite
  const industries = require('./lib/data/industries');
  console.log('Available industries for testing:', Object.keys(industries));
});

global.afterAll(() => {
  console.log('\n=== Test Suite Completed ===\n');
});

global.beforeEach(() => {
  console.log('\n--- Starting Test ---');
  const testName = expect.getState().currentTestName;
  console.log('Test Name:', testName);
  
  // Validate test data based on test name
  if (testName.includes('industry')) {
    console.log('Running industry-related test case');
  }
});

global.afterEach(() => {
  const testState = expect.getState();
  const testName = expect.getState().currentTestName;
  console.log('Test Status:', testState.numPassingTests > 0 ? 'PASSED' : 'FAILED');
  if (!testState.numPassingTests) {
    console.log('Failed test details:', {
      name: testName,
      error: testState.testResults[0].testResults.find(r => r.status === 'failed')?.failureMessages
    });
  }
  console.log('--- Test Completed ---\n');
});

// Add custom matcher for better error messages
expect.extend({
  toHaveProperty(received, property, value) {
    const hasProperty = received.hasOwnProperty(property);
    const matchesValue = value === undefined || received[property] === value;
    
    return {
      message: () =>
        `expected ${received} to ${hasProperty ? 'not ' : ''}have property ${property}${
          value === undefined ? '' : ` with value ${value}`
        }`,
      pass: hasProperty && matchesValue,
    };
  }
}); 