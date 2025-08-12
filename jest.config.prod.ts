import type {Config} from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  // Disable coverage collection in production builds
  collectCoverage: false,

  // Use jsdom for testing
  testEnvironment: "jsdom",

  // Module name mapping
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@rainbow-me/rainbowkit$": "<rootDir>/__mocks__/rainbowkit.js",
    "^wagmi$": "<rootDir>/__mocks__/wagmi.js",
    "^@tanstack/react-query$": "<rootDir>/__mocks__/react-query.js",
    "^viem/chains$": "<rootDir>/__mocks__/viem-chains.js",
    "^motion/react$": "<rootDir>/__mocks__/motion-react.js",
    "^next/image$": "<rootDir>/__mocks__/next-image.js"
  },

  // Transform ignore patterns
  transformIgnorePatterns: [
    "\\\\node_modules\\\\",
    "\\.pnp\\.[^\\\\]+$"
  ],

  // Reasonable timeout
  testTimeout: 5000,

  // Allow multiple workers for faster builds
  maxWorkers: '50%',

  // Clear mocks between tests
  clearMocks: true,

  // Reset modules between tests
  resetModules: true,

  // Restore mocks between tests
  restoreMocks: true,

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Less verbose for production
  verbose: false,
};

export default createJestConfig(config);
