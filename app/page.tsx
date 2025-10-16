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
            <div className="glass-card p-6 rounded-lg border-2 border-orange-500">
              <Compass className="w-20 h-20 text-orange-500 animate-float" />
            </div>
          </div>
          
          <h1 className="text-7xl font-black mb-6 tracking-tight">
            <span className="gradient-text">SOCIETY OF EXPLORERS</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto font-semibold">
            Forge your path through the blockchain frontier. Build, earn, and conquer with AI-powered expeditions. 
            Merit-based token rewards for every contribution.
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
            className="glass-card p-8 text-center hover:border-orange-500 transition-all"
          >
            <Zap className="w-14 h-14 text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-orange-400">FORGE ASSETS</h3>
            <p className="text-gray-400 font-medium">
              Mint battle-tested NFTs and tokens on Solana. Build your arsenal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card p-8 text-center hover:border-orange-500 transition-all"
          >
            <Users className="w-14 h-14 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-red-400">UNITE FORCES</h3>
            <p className="text-gray-400 font-medium">
              Join expeditions with elite explorers. Collaborate, conquer, earn.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-card p-8 text-center hover:border-orange-500 transition-all"
          >
            <Compass className="w-14 h-14 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">EXPLORER NEXUS</h3>
            <p className="text-gray-400 font-medium">
              AI-powered merit system. Earn tokens for every contribution. Dominate the leaderboard.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}