"use client"

import type { ReactNode } from "react"
import { WagmiProvider, http } from "wagmi"
import { mainnet } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"

const config = getDefaultConfig({
  appName: "Unchained Cabal Portal",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID",
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
