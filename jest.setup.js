// Simple test setup with minimal console interference
const originalConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn
};

// Only mock console methods during test execution
global.beforeEach(() => {
  console.log = (...args) => originalConsole.log(...args);
  console.error = (...args) => originalConsole.error(...args);
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