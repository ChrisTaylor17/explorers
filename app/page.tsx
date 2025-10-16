'use client'

import { motion } from 'framer-motion'
import { Compass, Zap, Users, Bot } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex justify-center mb-8">
            <div className="glass-card p-4 rounded-full">
              <Compass className="w-16 h-16 text-blue-400 animate-float" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold mb-6">
            <span className="gradient-text">Society of Explorers</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Navigate the Web3 frontier. Create NFTs and tokens on Solana, connect with fellow explorers, 
            and let our AI guide your blockchain journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create-nft" className="btn-primary">
              Start Creating
            </Link>
            <Link href="/chat" className="btn-secondary">
              Join Community
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8 text-center"
          >
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Create NFTs & Tokens</h3>
            <p className="text-gray-300">
              Mint unique NFTs and create custom tokens on Solana with our intuitive interface.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card p-8 text-center"
          >
            <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Connect & Chat</h3>
            <p className="text-gray-300">
              Join real-time conversations with other Web3 explorers and share your discoveries.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-card p-8 text-center"
          >
            <Bot className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">AI Guidance</h3>
            <p className="text-gray-300">
              Get personalized assistance from our AI explorer to navigate blockchain complexities.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}