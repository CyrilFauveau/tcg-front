module.exports = {
  QueryClient: class QueryClient {
    constructor() {}
    mount() {}
    unmount() {}
  },
  QueryClientProvider: ({ children }) => children,
  useQuery: () => ({
    data: null,
    isLoading: false,
    error: null,
  }),
  useMutation: () => ({
    mutate: jest.fn(),
    isLoading: false,
    error: null,
  }),
};









