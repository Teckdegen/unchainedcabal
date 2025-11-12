import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { wallet_address } = await request.json()

    if (!wallet_address) {
      return NextResponse.json({ error: "Wallet address required" }, { status: 400 })
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

    const { data, error } = await supabase
      .from("authorized_users")
      .select("wallet_address, has_joined")
      .eq("wallet_address", wallet_address.toLowerCase())
      .single()

    if (error) {
      return NextResponse.json({ authorized: false, has_joined: false }, { status: 200 })
    }

    return NextResponse.json({
      authorized: !!data,
      has_joined: data?.has_joined || false,
    })
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
