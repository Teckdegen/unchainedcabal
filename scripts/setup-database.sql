-- Create authorized_users table for Unchained Cabal Portal
CREATE TABLE IF NOT EXISTS authorized_users (
  id BIGSERIAL PRIMARY KEY,
  wallet_address TEXT UNIQUE NOT NULL,
  has_joined BOOLEAN DEFAULT FALSE,
  invite_link TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster wallet lookups
CREATE INDEX IF NOT EXISTS idx_wallet_address ON authorized_users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_has_joined ON authorized_users(has_joined);
