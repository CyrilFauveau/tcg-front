// Mock for @rainbow-me/rainbowkit
export const ConnectButton = () => {
  return <button data-testid="connect-button" type="button">Connect Wallet</button>;
};

export const RainbowKitProvider = ({ children }) => {
  return <div data-testid="rainbowkit-provider">{children}</div>;
};

export const getDefaultWallets = () => [];
export const getDefaultConfig = () => ({}); 