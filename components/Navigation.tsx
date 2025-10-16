'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Compass, Menu, X } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { connected } = useWallet()

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/create-nft', label: 'Create NFT' },
    { href: '/create-token', label: 'Create Token' },
    { href: '/chat', label: 'Chat' },
    { href: '/profile', label: 'Profile' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Society of Explorers</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <WalletMultiButton className="!bg-gradient-to-r !from-blue-500 !to-purple-600 !rounded-lg" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <WalletMultiButton className="!bg-gradient-to-r !from-blue-500 !to-purple-600 !rounded-lg !w-full" />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}