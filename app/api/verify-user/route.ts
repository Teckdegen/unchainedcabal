import { type NextRequest, NextResponse } from "next/server"
import { AUTHORIZED_WALLETS } from "@/lib/config"

export async function POST(request: NextRequest) {
  try {
    const { wallet_address } = await request.json()

    if (!wallet_address) {
      return NextResponse.json({ error: "Wallet address required" }, { status: 400 })
    }

    // Check if wallet is in authorized list
    const isAuthorized = AUTHORIZED_WALLETS.includes(wallet_address.toLowerCase())
    
    // For this simple implementation, we'll assume they haven't joined yet
    // In a real implementation, you might want to track this in a file or database
    const has_joined = false

    return NextResponse.json({
      authorized: isAuthorized,
      has_joined: has_joined,
    })
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
