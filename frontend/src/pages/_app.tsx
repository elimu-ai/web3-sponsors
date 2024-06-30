import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiProvider, createConfig, http } from "wagmi";
import { base, baseSepolia } from 'wagmi/chains'
// import { wagmiConfig } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig, darkTheme, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, coinbaseWallet } from "@rainbow-me/rainbowkit/wallets";

// Rainbowkit 🌈
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [coinbaseWallet, metaMaskWallet]
    }
  ],
  {
    appName: "Sponsors 🫶🏽",
    projectId: "YOUR_PROJECT_ID",
  }
);

// wagmi
const queryClient = new QueryClient();
export const wagmiConfig = createConfig({
  connectors: connectors,
  chains: [base, baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={baseSepolia} theme={darkTheme()}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
