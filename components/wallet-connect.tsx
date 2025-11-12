"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function WalletConnect() {
  return (
    <div className="w-full">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== "loading"
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated")

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      className="w-full px-6 py-4 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all duration-300 text-sm uppercase tracking-widest border border-green-400/30 hover:border-green-300/50 shadow-lg hover:shadow-green-500/20"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>Connect Wallet</span>
                        <span className="text-black/70">→</span>
                      </div>
                    </button>
                  )
                }

                return (
                  <div className="space-y-4">
                    <button
                      onClick={openAccountModal}
                      className="w-full px-4 py-3 bg-black/50 hover:bg-black/70 border border-green-500/30 hover:border-green-500/50 text-green-400 rounded-lg transition-all duration-200 text-sm font-mono"
                    >
                      <div className="flex items-center justify-between">
                        <span>{account.displayName}</span>
                        <span>{account.displayBalance ? ` (${account.displayBalance})` : ""}</span>
                      </div>
                    </button>
                  </div>
                )
              })()}
            </div>
          )
        }}
      </ConnectButton.Custom>
    </div>
  )
}