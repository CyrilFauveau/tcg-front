module.exports = {
  WagmiConfig: ({ children }) => children,
  createConfig: () => ({}),
  configureChains: () => ({
    chains: [],
    publicClient: {},
    webSocketPublicClient: {},
  }),
  useAccount: () => ({
    address: '0x123...',
    isConnected: true,
    isConnecting: false,
  }),
  useBalance: () => ({
    data: { formatted: '1.0', symbol: 'ETH' },
    isLoading: false,
  }),
  useContractRead: () => ({
    data: null,
    isLoading: false,
    error: null,
  }),
  useReadContract: () => ({
    data: null,
    isLoading: false,
    error: null,
  }),
  useContractWrite: () => ({
    write: jest.fn(),
    isLoading: false,
    error: null,
  }),
  useNetwork: () => ({
    chain: { id: 1, name: 'Ethereum' },
  }),
  useSwitchNetwork: () => ({
    switchNetwork: jest.fn(),
  }),
  useDisconnect: () => ({
    disconnect: jest.fn(),
  }),
};

