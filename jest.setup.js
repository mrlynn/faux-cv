// Add detailed logging for test execution
global.beforeAll(() => {
  console.log('\n=== Starting Test Suite ===\n');
  // Log available industries at the start of the test suite
  try {
    const industries = require('./lib/data/industries');
    console.log('Available industries for testing:', Object.keys(industries));
  } catch (error) {
    console.error('Error loading industries:', error.message);
  }
});

global.afterAll(() => {
  const testState = expect.getState();
  console.log('\n=== Test Suite Summary ===');
  console.log('Total Tests:', testState.numPassingTests + testState.numFailingTests);
  console.log('Passed:', testState.numPassingTests);
  console.log('Failed:', testState.numFailingTests);
  console.log('=== Test Suite Completed ===\n');
});

global.beforeEach(() => {
  console.log('\n--- Starting Test ---');
  const testState = expect.getState();
  const testName = testState.currentTestName;
  console.log('Test Name:', testName);
  
  // Log test context
  if (testName.includes('industry')) {
    console.log('Running industry-related test case');
  } else if (testName.includes('format')) {
    console.log('Running format-related test case');
  } else if (testName.includes('cli')) {
    console.log('Running CLI-related test case');
  }
});

global.afterEach(() => {
  const testState = expect.getState();
  const testName = testState.currentTestName;
  const testStatus = testState.numPassingTests > 0 ? 'PASSED' : 'FAILED';
  console.log('Test Status:', testStatus);
  
  if (testStatus === 'FAILED') {
    // Safely access test results with optional chaining
    const failedTest = testState.testResults?.[0]?.testResults?.find(r => r.status === 'failed');
    const failureMessages = failedTest?.failureMessages || ['No failure messages available'];
    
    console.log('\nFailed Test Details:');
    console.log('Name:', testName);
    console.log('Error Messages:', failureMessages);
    
    // Log additional context if available
    if (failedTest) {
      console.log('Test Location:', failedTest.location?.line || 'Unknown');
      console.log('Test Duration:', failedTest.duration || 'Unknown');
    }
    
    // Log the current test state
    console.log('\nTest State:', {
      numPassingTests: testState.numPassingTests,
      numFailingTests: testState.numFailingTests,
      isExpectingAssertions: testState.isExpectingAssertions,
      currentTestName: testState.currentTestName
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