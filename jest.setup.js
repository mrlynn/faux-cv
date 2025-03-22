// Add detailed logging for test execution
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

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
  // Restore original console methods before each test
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
  
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
  
  // Use console.error for failed tests to ensure visibility
  if (testStatus === 'FAILED') {
    console.error('\n❌ Test Failed:', testName);
    
    // Safely access test results with optional chaining
    const failedTest = testState.testResults?.[0]?.testResults?.find(r => r.status === 'failed');
    const failureMessages = failedTest?.failureMessages || ['No failure messages available'];
    
    console.error('\nFailed Test Details:');
    console.error('Name:', testName);
    console.error('Error Messages:', failureMessages);
    
    // Log additional context if available
    if (failedTest) {
      console.error('Test Location:', failedTest.location?.line || 'Unknown');
      console.error('Test Duration:', failedTest.duration || 'Unknown');
    }
    
    // Log the current test state
    console.error('\nTest State:', {
      numPassingTests: testState.numPassingTests,
      numFailingTests: testState.numFailingTests,
      isExpectingAssertions: testState.isExpectingAssertions,
      currentTestName: testState.currentTestName
    });
  } else {
    console.log('Test Status:', testStatus);
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