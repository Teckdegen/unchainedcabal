"use client"

interface AccessStatusProps {
  status: "initial" | "verified" | "denied" | "claimed"
  address?: string
  inviteLink?: string | null
  isLoading?: boolean
  onGenerateInvite?: () => void
}

export default function AccessStatus({ status, address, inviteLink, isLoading, onGenerateInvite }: AccessStatusProps) {
  if (status === "denied") {
    return (
      <div className="bg-red-500/5 border border-red-500/30 rounded-xl p-6 text-center space-y-4 backdrop-blur-sm">
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse delay-100"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse delay-200"></div>
        </div>
        <div className="space-y-2">
          <p className="text-red-500 text-lg font-light tracking-wider">ACCESS DENIED</p>
          <p className="text-gray-400 text-sm font-mono">UNAUTHORIZED WALLET DETECTED</p>
        </div>
        <div className="pt-4 border-t border-red-500/20">
          <p className="text-gray-500 text-xs">
            This wallet is not authorized. Visit{" "}
            <a
              href="https://unchainedlab.xyz/card"
              className="text-green-500 hover:text-green-400 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              unchainedlab.xyz/card
            </a>{" "}
            to request access.
          </p>
        </div>
      </div>
    )
  }

  if (status === "verified") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-green-500 text-lg font-light tracking-wider">ACCESS GRANTED</p>
          <p className="text-gray-400 text-sm font-mono">AUTHORIZED USER DETECTED</p>
        </div>
        <button
          onClick={onGenerateInvite}
          disabled={isLoading}
          className="w-full px-6 py-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 text-black font-semibold rounded-lg transition-all duration-300 text-sm uppercase tracking-widest border border-green-400/30 hover:border-green-300/50 shadow-lg hover:shadow-green-500/20"
        >
          <div className="flex items-center justify-center space-x-2">
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>Generating Secure Link...</span>
              </>
            ) : (
              <>
                <span>Generate Invite</span>
                <span className="text-black/70">→</span>
              </>
            )}
          </div>
        </button>
        <div className="text-center">
          <p className="text-gray-500 text-xs font-mono">One-time access link will expire in 10 minutes</p>
        </div>
      </div>
    )
  }

  if (status === "claimed" && inviteLink) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-emerald-500 text-lg font-light tracking-wider">ACCESS COMPLETE</p>
          <p className="text-gray-400 text-sm font-mono">WELCOME TO THE NETWORK</p>
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/30 rounded-xl p-5 backdrop-blur-sm">
          <p className="text-emerald-500/80 text-xs mb-3 tracking-widest">YOUR SECURE INVITE LINK</p>
          <div className="bg-black/30 rounded-lg p-3 mb-3">
            <a
              href={inviteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 break-all text-sm font-mono underline"
            >
              {inviteLink}
            </a>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(inviteLink)
                // Could add toast notification here
              }}
              className="flex-1 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400 rounded-lg transition-colors duration-200 text-sm"
            >
              Copy Link
            </button>
            <button
              onClick={() => {
                window.open(inviteLink, '_blank')
              }}
              className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-black rounded-lg transition-colors duration-200 text-sm font-semibold"
            >
              Open Link
            </button>
          </div>
        </div>
        <div className="text-center pt-4 border-t border-emerald-500/20">
          <p className="text-gray-500 text-xs font-mono">Link expires in 10 minutes // Single use only</p>
        </div>
      </div>
    )
  }

  return null
}