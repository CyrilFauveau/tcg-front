import type {Config} from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const config: Config = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@rainbow-me/rainbowkit$": "<rootDir>/__mocks__/rainbowkit.js",
    "^wagmi$": "<rootDir>/__mocks__/wagmi.js",
    "^@tanstack/react-query$": "<rootDir>/__mocks__/react-query.js",
    "^viem/chains$": "<rootDir>/__mocks__/viem-chains.js",
    "^motion/react$": "<rootDir>/__mocks__/motion-react.js",
    "^next/image$": "<rootDir>/__mocks__/next-image.js"
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched tests will skip transformation
  transformIgnorePatterns: [
    "\\\\node_modules\\\\",
    "\\.pnp\\.[^\\\\]+$"
  ],

  // Test timeout in milliseconds
  testTimeout: 10000,

  // Maximum number of workers used to run tests
  maxWorkers: 1,

  // Clear mocks between tests
  clearMocks: true,

  // Reset modules between tests
  resetModules: true,

  // Restore mocks between tests
  restoreMocks: true,

  // Setup files to run before tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Verbose output for debugging
  verbose: true,

  // Force exit after tests complete
  forceExit: true,

  // Detect open handles
  detectOpenHandles: true,
};

export default createJestConfig(config);