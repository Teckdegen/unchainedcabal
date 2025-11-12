# Unchained Cabal Portal

A sleek Web3 access portal built with Next.js, RainbowKit, Wagmi, Supabase, and Telegram API integration.

## Features

- **Wallet Connection**: Connect via MetaMask, WalletConnect, Coinbase Wallet
- **Supabase Verification**: Check authorized wallet addresses
- **Telegram Integration**: Generate one-time invite links to private groups
- **Serverless**: Fully deployable on Vercel
- **Black & Green Aesthetic**: Elegant, minimal design with typewriter animations

## Setup

### 1. Database Setup

Run the SQL migration in Supabase:

\`\`\`sql
CREATE TABLE authorized_users (
  id BIGSERIAL PRIMARY KEY,
  wallet_address TEXT UNIQUE NOT NULL,
  has_joined BOOLEAN DEFAULT FALSE,
  invite_link TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### 2. Environment Variables

Add to `.env.local`:

\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=your_url
SUPABASE_SERVICE_ROLE_KEY=your_key
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_GROUP_ID=your_group_id
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
\`\`\`

### 3. Deployment

\`\`\`bash
npm install
npm run dev
# Deploy to Vercel
\`\`\`

## How It Works

1. User connects wallet → verified in Supabase
2. If authorized → can generate one-time Telegram invite
3. Telegram link expires in 10 minutes
4. Wallet marked as `has_joined` to prevent repeat access
