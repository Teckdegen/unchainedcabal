import { type NextRequest, NextResponse } from "next/server"
import { AUTHORIZED_WALLETS, TELEGRAM_BOT_TOKEN, TELEGRAM_ADMIN_ID } from "@/lib/config"

export async function POST(request: NextRequest) {
  try {
    const { wallet_address } = await request.json()

    if (!wallet_address || !TELEGRAM_BOT_TOKEN) {
      return NextResponse.json({ error: "Missing required credentials" }, { status: 400 })
    }

    // Check if wallet is authorized
    const isAuthorized = AUTHORIZED_WALLETS.includes(wallet_address.toLowerCase())
    if (!isAuthorized) {
      return NextResponse.json({ error: "Wallet not authorized" }, { status: 403 })
    }

    // Generate new Telegram invite link
    const expireTime = Math.floor(Date.now() / 1000) + 600 // 10 minutes
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/createChatInviteLink`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_GROUP_ID,
        member_limit: 1,
        expire_date: expireTime,
      }),
    })

    const telegramData = await response.json()

    if (!telegramData.ok) {
      throw new Error("Failed to create Telegram invite")
    }

    const inviteLink = telegramData.result.invite_link

    // Send notification to admin
    const adminMessage = `
🔑 New User Joined

Wallet: \`${wallet_address}\`
Time: ${new Date().toLocaleString()}
`

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_ADMIN_ID,
        text: adminMessage,
        parse_mode: "Markdown",
      }),
    })

    return NextResponse.json({ invite_link: inviteLink })
  } catch (error) {
    console.error("Invite generation error:", error)
    return NextResponse.json({ error: "Failed to generate invite" }, { status: 500 })
  }
}