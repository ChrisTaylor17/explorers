'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, X, Send, Coins } from 'lucide-react'

interface TokenAllocation {
  user: string
  tokens_awarded: number
  reason: string
  solana_tx_mock: string
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '⚡ Explorer Nexus online. Ready to chart new territories and reward your contributions. What expedition are you embarking on today?' }
  ])
  const [input, setInput] = useState('')
  const [sessionTokens, setSessionTokens] = useState(0)

  const analyzeContribution = (message: string): TokenAllocation => {
    const words = message.toLowerCase()
    let tokens = 5 // base
    let reason = 'Base contribution'

    // Innovation detection
    if (words.includes('idea') || words.includes('solution') || words.includes('build')) {
      tokens += 15
      reason = 'Innovative thinking detected'
    }
    
    // Collaboration
    if (words.includes('help') || words.includes('team') || words.includes('together')) {
      tokens += 10
      reason = 'Collaborative spirit'
    }
    
    // Technical depth
    if (words.includes('blockchain') || words.includes('solana') || words.includes('ai')) {
      tokens += 12
      reason = 'Technical contribution'
    }
    
    // Task completion
    if (words.includes('completed') || words.includes('done') || words.includes('finished')) {
      tokens += 20
      reason = 'Task completion'
    }

    return {
      user: 'Explorer',
      tokens_awarded: Math.min(tokens, 50),
      reason,
      solana_tx_mock: `TX_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Analyze and allocate tokens
    const allocation = analyzeContribution(input)
    const newTotal = Math.min(sessionTokens + allocation.tokens_awarded, 100)
    setSessionTokens(newTotal)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          allocation,
          sessionTokens: newTotal
        })
      })

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '⚠️ Connection lost. Check your expedition logs and try again.' 
      }])
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-orange-600 to-red-700 rounded-lg shadow-2xl z-50 border border-orange-500/50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Compass className="w-6 h-6 text-white" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 w-[420px] h-[500px] bg-slate-900 border-2 border-orange-500/50 rounded-lg shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-orange-500/30 bg-gradient-to-r from-slate-800 to-slate-900">
              <div className="flex items-center space-x-3">
                <Compass className="w-6 h-6 text-orange-500" />
                <div>
                  <div className="font-bold text-orange-500">EXPLORER NEXUS</div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Coins className="w-3 h-3" />
                    {sessionTokens}/100 tokens
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-orange-500/20 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black/40">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg font-medium ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-orange-600 to-red-700 text-white'
                        : 'bg-slate-800 text-gray-100 border border-orange-500/30'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-orange-500/30 bg-slate-900">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Share your expedition progress..."
                  className="flex-1 bg-slate-800 border border-orange-500/30 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-100"
                />
                <button
                  onClick={handleSend}
                  className="p-2 bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}