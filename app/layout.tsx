import './globals.css'
import { WalletProvider } from '@/components/WalletProvider'
import { Navigation } from '@/components/Navigation'
import { AIAssistant } from '@/components/AIAssistant'

export const metadata = {
  title: 'Society of Explorers',
  description: 'Explore the Web3 frontier with NFTs, tokens, and community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <AIAssistant />
        </WalletProvider>
      </body>
    </html>
  )
}