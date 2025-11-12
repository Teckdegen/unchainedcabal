import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Unchained Cabal Portal",
  description: "Access the Unchained Cabal - Verify your wallet to join.",
  icons: {
    icon: "https://pbs.twimg.com/profile_images/1968214669945925632/YSM6ktHy_400x400.jpg",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          body {
            background-image: url('https://pbs.twimg.com/profile_images/1968214669945925632/YSM6ktHy_400x400.jpg');
            background-attachment: fixed;
            background-size: cover;
            background-position: center;
          }
        `}</style>
      </head>
      <body className={`${jetbrainsMono.className} bg-black text-white overflow-x-hidden`}>
        <div className="fixed inset-0 bg-black/90 pointer-events-none" />
        <div className="fixed inset-0 scanline"></div>
        <div className="relative z-10">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  )
}