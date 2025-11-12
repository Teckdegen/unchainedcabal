import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_ADMIN_ID = "7087159119" // Admin chat ID

export async function POST(request: NextRequest) {
  try {
    const { wallet_address } = await request.json()

    if (!wallet_address || !TELEGRAM_BOT_TOKEN) {
      return NextResponse.json({ error: "Missing required credentials" }, { status: 400 })
    }

    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {}
        },
      },
    })

    // Check if user already has a valid invite
    const { data: existing } = await supabase
      .from("authorized_users")
      .select("invite_link, has_joined")
      .eq("wallet_address", wallet_address.toLowerCase())
      .single()

    if (existing?.has_joined && existing?.invite_link) {
      return NextResponse.json({
        invite_link: existing.invite_link,
      })
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

    // Update database
    await supabase
      .from("authorized_users")
      .update({
        has_joined: true,
        invite_link: inviteLink,
        updated_at: new Date().toISOString(),
      })
      .eq("wallet_address", wallet_address.toLowerCase())

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
