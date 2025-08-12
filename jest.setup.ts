import '@testing-library/jest-dom';

// Only run mocks in test environment
if (process.env.NODE_ENV === 'test') {
  // Mock performance.memory if not available (Chrome-specific extension)
  if (typeof performance !== 'undefined' && !('memory' in performance)) {
    Object.defineProperty(performance, 'memory', {
      value: {
        usedJSHeapSize: 1000000,
        totalJSHeapSize: 2000000,
        jsHeapSizeLimit: 10000000,
      },
      writable: true,
      configurable: true,
    });
  }

  // Mock window.matchMedia if not available
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // Mock ResizeObserver if not available
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  // Mock IntersectionObserver if not available
  global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  // Increase timeout for all tests
  jest.setTimeout(10000);

  // Suppress console warnings during tests (optional)
  const originalWarn = console.warn;
  beforeAll(() => {
    console.warn = (...args) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('Warning: ReactDOM.render is no longer supported')
      ) {
        return;
      }
      originalWarn.call(console, ...args);
    };
  });

  afterAll(() => {
    console.warn = originalWarn;
  });
}

