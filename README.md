# Unchained Cabal Portal

A sleek Web3 access portal built with Next.js, RainbowKit, Wagmi, and Telegram API integration.

## Features

- **Wallet Connection**: Connect via MetaMask, WalletConnect, Coinbase Wallet
- **Authorization Check**: Verify wallet addresses against hardcoded list
- **Telegram Integration**: Generate one-time invite links to private groups
- **Serverless**: Fully deployable on Vercel
- **Black & Green Aesthetic**: Elegant, minimal design with typewriter animations

## Setup

### 1. Configuration

Update the authorized wallets in [lib/config.ts](file:///c%3A/Users/user/OneDrive/Desktop/code/lib/config.ts):

```typescript
export const AUTHORIZED_WALLETS = [
  "0x1234567890123456789012345678901234567890", // Example wallet
  // Add more wallet addresses here
]
```

### 2. Environment Variables

Add to `.env.local`:

```bash
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_GROUP_ID=your_group_id
TELEGRAM_ADMIN_ID=your_admin_id # Optional, defaults to 7087159119
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

## How It Works

1. User connects wallet → verified against hardcoded list
2. If authorized → can generate one-time Telegram invite
3. Telegram link expires in 10 minutes
4. Admin receives notification when user joins
5. Remove user from config file after they join

# Deploy to Vercel
```