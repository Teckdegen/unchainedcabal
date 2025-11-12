// Authorized wallets configuration
// Add wallet addresses here that should have access to the portal

export const AUTHORIZED_WALLETS = [
  // Example wallet addresses - replace with actual authorized wallets
  // "0x1234567890123456789012345678901234567890",
  // "0xabcdef1234567890abcdef1234567890abcdef12",
]

// Telegram configuration
export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ""
export const TELEGRAM_GROUP_ID = process.env.TELEGRAM_GROUP_ID || ""
export const TELEGRAM_ADMIN_ID = process.env.TELEGRAM_ADMIN_ID || "7087159119"