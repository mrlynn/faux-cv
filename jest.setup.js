// Simple test setup with minimal console interference
const originalConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn
};

// Only mock console methods during test execution
global.beforeEach(() => {
  // Store the current test name
  const testName = expect.getState().currentTestName;
  
  // Only log errors if they're not from expected test cases
  console.error = (...args) => {
    // Skip logging validation errors from expected test cases
    if (testName && (
      testName.includes('should handle errors') ||
      testName.includes('should throw error') ||
      testName.includes('should reject')
    )) {
      return;
    }
    originalConsole.error(...args);
  };
  
  console.log = (...args) => originalConsole.log(...args);
  console.warn = (...args) => originalConsole.warn(...args);
});

global.afterEach(() => {
  // Restore original console methods
  console.log = originalConsole.log;
  console.error = originalConsole.error;
  console.warn = originalConsole.warn;
});

// Simple test summary at the end
global.afterAll(() => {
  const state = expect.getState();
  if (state.numFailingTests > 0) {
    console.log('\nTest Summary:');
    console.log(`Failed: ${state.numFailingTests}`);
    console.log(`Passed: ${state.numPassingTests}`);
  }
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