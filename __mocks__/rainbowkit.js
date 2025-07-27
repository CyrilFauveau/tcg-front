// Mock for @rainbow-me/rainbowkit
export const ConnectButton = () => {
  return <div data-testid="connect-button">Connect Wallet</div>;
};

export const RainbowKitProvider = ({ children }) => {
  return <div data-testid="rainbowkit-provider">{children}</div>;
};

export const getDefaultWallets = () => [];
export const getDefaultConfig = () => ({}); 