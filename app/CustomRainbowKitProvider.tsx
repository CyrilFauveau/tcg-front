'use client';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from 'react';

// Singleton instances to prevent multiple initializations
let configInstance: ReturnType<typeof getDefaultConfig> | null = null;
let queryClientInstance: QueryClient | null = null;

const getConfig = () => {
  if (!configInstance) {
    console.log('Creating WalletConnect config...');
    configInstance = getDefaultConfig({
      appName: 'My RainbowKit App',
      projectId: 'b8a23a63eef373200d80f8f84315e935',
      chains: [sepolia],
      ssr: false, // Disable SSR to prevent multiple initializations
    });
  }
  return configInstance;
};

const getQueryClient = () => {
  if (!queryClientInstance) {
    console.log('Creating QueryClient...');
    queryClientInstance = new QueryClient();
  }
  return queryClientInstance;
};

const CustomRainbowKitProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Don't render anything on server side
  }

  return (
    <WagmiProvider config={getConfig()}>
        <QueryClientProvider client={getQueryClient()}>
            <RainbowKitProvider>
                {children}
            </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
  )
}

export default CustomRainbowKitProvider;