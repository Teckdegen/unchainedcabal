"use client"

import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import WalletConnect from "@/components/wallet-connect"
import AccessStatus from "@/components/access-status"

export function ClientPortal() {
  const { address, isConnected } = useAccount()
  const [isLoading, setIsLoading] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState("initial")
  const [inviteLink, setInviteLink] = useState(null)
  const [glitchText, setGlitchText] = useState("")

  // Glitch effect for the title
  useEffect(() => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?~`"
    let interval
    
    if (verificationStatus === "denied") {
      interval = setInterval(() => {
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]
        setGlitchText(randomChar)
        setTimeout(() => setGlitchText(""), 100)
      }, 3000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [verificationStatus])

  useEffect(() => {
    if (isConnected && address) {
      verifyUser(address)
    } else {
      setVerificationStatus("initial")
      setInviteLink(null)
    }
  }, [isConnected, address])

  const verifyUser = async (walletAddress) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/verify-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet_address: walletAddress.toLowerCase() }),
      })

      const data = await response.json()

      if (data.authorized) {
        if (data.has_joined) {
          setVerificationStatus("claimed")
        } else {
          setVerificationStatus("verified")
        }
      } else {
        setVerificationStatus("denied")
      }
    } catch (error) {
      console.error("Verification error:", error)
      setVerificationStatus("denied")
    } finally {
      setIsLoading(false)
    }
  }

  const generateInvite = async () => {
    if (!address) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/get-invite-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet_address: address.toLowerCase() }),
      })

      const data = await response.json()

      if (data.invite_link) {
        setInviteLink(data.invite_link)
        setVerificationStatus("claimed")
      }
    } catch (error) {
      console.error("Error generating invite:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-green-500/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/5 via-black to-black"></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="max-w-2xl w-full space-y-12 relative z-10">
        {/* Header with enhanced styling */}
        <div className="space-y-8 text-center fade-in">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
              UNCHAINED
              <span className="text-green-500 animate-pulse">{glitchText}</span>
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
            <span className="text-green-500/80 text-sm font-light tracking-widest px-2">ACCESS PORTAL // CABAL LABS</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
          </div>
          
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Status Messages with enhanced styling */}
        <div className="space-y-6 text-center min-h-16">
          {!isConnected ? (
            <div className="space-y-2">
              <p className="text-gray-400 text-sm font-light tracking-wider">SYSTEM STATUS: <span className="text-red-500">AWAITING AUTHENTICATION</span></p>
              <p className="text-gray-500 text-xs font-mono">Connect your wallet to gain entry to the Unchained Network</p>
            </div>
          ) : verificationStatus === "verified" ? (
            <div className="space-y-2">
              <p className="text-green-500 text-sm font-light tracking-wider">ACCESS GRANTED // AUTHORIZED USER DETECTED</p>
              <p className="text-gray-400 text-xs font-mono">Generate your secure invite link to proceed</p>
            </div>
          ) : verificationStatus === "claimed" ? (
            <div className="space-y-2">
              <p className="text-emerald-500 text-sm font-light tracking-wider">ACCESS COMPLETE // WELCOME TO THE NETWORK</p>
              <p className="text-gray-400 text-xs font-mono">Your credentials have been verified and access granted</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-red-500/80 text-sm font-light tracking-wider">ACCESS DENIED // UNAUTHORIZED WALLET</p>
              <p className="text-gray-500 text-xs font-mono">This wallet is not authorized for network access</p>
            </div>
          )}
        </div>

        {/* Main Action Area with enhanced styling */}
        <div className="space-y-6">
          {!isConnected ? (
            <div className="bg-black/30 border border-green-500/20 rounded-xl p-8 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-green-500 text-lg font-light tracking-wider mb-2">IDENTITY VERIFICATION REQUIRED</h2>
                  <p className="text-gray-400 text-sm">Connect your wallet to authenticate with the Unchained Network</p>
                </div>
                <WalletConnect />
              </div>
            </div>
          ) : (
            <div className="bg-black/30 border border-green-500/20 rounded-xl p-8 backdrop-blur-sm">
              <AccessStatus
                status={verificationStatus}
                address={address}
                inviteLink={inviteLink}
                isLoading={isLoading}
                onGenerateInvite={generateInvite}
              />
            </div>
          )}
        </div>

        {/* Enhanced Wallet Info */}
        {isConnected && address && (
          <div className="text-center pt-6 border-t border-green-500/20">
            <p className="text-gray-500 text-xs tracking-widest mb-2">CONNECTED WALLET // AUTHENTICATED</p>
            <div className="inline-flex items-center space-x-2 bg-black/50 px-4 py-2 rounded-lg border border-green-500/10">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-green-400 text-sm font-mono">
                {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}