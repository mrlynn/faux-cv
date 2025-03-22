// Add detailed logging for test execution
global.beforeAll(() => {
  console.log('\n=== Starting Test Suite ===\n');
});

global.afterAll(() => {
  console.log('\n=== Test Suite Completed ===\n');
});

global.beforeEach(() => {
  console.log('\n--- Starting Test ---');
  console.log('Test Name:', expect.getState().currentTestName);
});

global.afterEach(() => {
  const testState = expect.getState();
  console.log('Test Status:', testState.numPassingTests > 0 ? 'PASSED' : 'FAILED');
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