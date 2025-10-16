'use client'

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { motion } from 'framer-motion'
import { Coins, Settings, Zap } from 'lucide-react'

export default function CreateTokenPage() {
  const { connected } = useWallet()
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    supply: '',
    decimals: '9',
    mintable: true,
    freezable: false
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = async () => {
    if (!connected) {
      alert('Please connect your wallet first')
      return
    }

    setIsLoading(true)
    // Mock token creation
    setTimeout(() => {
      alert('Token created successfully! (This is a demo)')
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl font-bold gradient-text mb-8 text-center">Create Your Token</h1>

          <div className="glass-card p-8">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Token Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Explorer Coin"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Symbol</label>
                  <input
                    type="text"
                    value={formData.symbol}
                    onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., EXP"
                    maxLength={10}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your token's purpose"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Total Supply</label>
                  <input
                    type="number"
                    value={formData.supply}
                    onChange={(e) => setFormData({ ...formData, supply: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Decimals</label>
                  <select
                    value={formData.decimals}
                    onChange={(e) => setFormData({ ...formData, decimals: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[0, 2, 6, 8, 9].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Token Settings
                </h3>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-medium">Mintable</h4>
                    <p className="text-sm text-gray-400">Allow creating more tokens later</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.mintable}
                      onChange={(e) => setFormData({ ...formData, mintable: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-medium">Freezable</h4>
                    <p className="text-sm text-gray-400">Allow freezing token accounts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.freezable}
                      onChange={(e) => setFormData({ ...formData, freezable: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-400 mb-2">Token Preview</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-400">Name:</span> {formData.name || 'Token Name'}</p>
                  <p><span className="text-gray-400">Symbol:</span> {formData.symbol || 'SYMBOL'}</p>
                  <p><span className="text-gray-400">Supply:</span> {formData.supply ? Number(formData.supply).toLocaleString() : '0'}</p>
                  <p><span className="text-gray-400">Decimals:</span> {formData.decimals}</p>
                </div>
              </div>

              <button
                onClick={handleCreate}
                disabled={!connected || isLoading || !formData.name || !formData.symbol || !formData.supply}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Token...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Coins className="w-5 h-5 mr-2" />
                    Create Token
                  </div>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}