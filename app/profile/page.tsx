'use client'

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { motion } from 'framer-motion'
import { User, Wallet, Image, Coins, Settings } from 'lucide-react'

export default function ProfilePage() {
  const { connected, publicKey } = useWallet()
  const [activeTab, setActiveTab] = useState('overview')

  const mockNFTs = [
    { id: 1, name: 'Digital Compass', image: '/api/placeholder/200/200' },
    { id: 2, name: 'Explorer Badge', image: '/api/placeholder/200/200' },
    { id: 3, name: 'Treasure Map', image: '/api/placeholder/200/200' }
  ]

  const mockTokens = [
    { symbol: 'EXP', name: 'Explorer Coin', balance: '1,000,000', value: '$2,500' },
    { symbol: 'ADV', name: 'Adventure Token', balance: '500,000', value: '$1,200' }
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'nfts', label: 'NFTs', icon: Image },
    { id: 'tokens', label: 'Tokens', icon: Coins },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  if (!connected) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-400">Please connect your wallet to view your profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Profile Header */}
          <div className="glass-card p-8 mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text mb-2">Explorer Profile</h1>
                <p className="text-gray-400 font-mono text-sm">
                  {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
                </p>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">3</div>
                    <div className="text-sm text-gray-400">NFTs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">2</div>
                    <div className="text-sm text-gray-400">Tokens</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">$3,700</div>
                    <div className="text-sm text-gray-400">Portfolio</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="glass-card p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Account Overview</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Minted &quot;Digital Compass&quot;</span>
                        <span className="text-xs text-gray-400">2 hours ago</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Created EXP Token</span>
                        <span className="text-xs text-gray-400">1 day ago</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Joined chat room</span>
                        <span className="text-xs text-gray-400">3 days ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Wallet Info</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Network:</span>
                        <span className="text-sm">Solana Devnet</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">SOL Balance:</span>
                        <span className="text-sm">2.5 SOL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Status:</span>
                        <span className="text-sm text-green-400">Connected</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nfts' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">My NFTs</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {mockNFTs.map(nft => (
                    <div key={nft.id} className="bg-white/5 rounded-lg p-4">
                      <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                        <Image className="w-16 h-16 text-white/50" aria-label="NFT placeholder" />
                      </div>
                      <h3 className="font-semibold">{nft.name}</h3>
                      <p className="text-sm text-gray-400">Owned by you</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tokens' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">My Tokens</h2>
                <div className="space-y-4">
                  {mockTokens.map(token => (
                    <div key={token.symbol} className="bg-white/5 rounded-lg p-6 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="font-bold text-sm">{token.symbol}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{token.name}</h3>
                          <p className="text-sm text-gray-400">{token.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{token.balance}</div>
                        <div className="text-sm text-gray-400">{token.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Settings</h2>
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Email Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Dark Mode</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}