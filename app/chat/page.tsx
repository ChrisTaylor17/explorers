'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Users, Hash } from 'lucide-react'

interface Message {
  id: string
  user: string
  content: string
  timestamp: Date
  room: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', user: 'Explorer_Alice', content: 'Just minted my first NFT! 🚀', timestamp: new Date(), room: 'general' },
    { id: '2', user: 'CryptoVoyager', content: 'Welcome to the society! What did you create?', timestamp: new Date(), room: 'general' },
    { id: '3', user: 'Explorer_Alice', content: 'A digital compass that points to new opportunities!', timestamp: new Date(), room: 'general' }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [activeRoom, setActiveRoom] = useState('general')
  const [onlineUsers] = useState(['Explorer_Alice', 'CryptoVoyager', 'BlockchainBob', 'NFTNinja'])

  const rooms = [
    { id: 'general', name: 'General', icon: Hash },
    { id: 'nft-showcase', name: 'NFT Showcase', icon: Hash },
    { id: 'token-talk', name: 'Token Talk', icon: Hash },
    { id: 'help', name: 'Help & Support', icon: Hash }
  ]

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      user: 'You',
      content: newMessage,
      timestamp: new Date(),
      room: activeRoom
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Mock response
    setTimeout(() => {
      const responses = [
        'That sounds amazing!',
        'Great work on your project!',
        'I\'d love to see that!',
        'The community is growing fast!'
      ]
      const response: Message = {
        id: (Date.now() + 1).toString(),
        user: 'Explorer_' + Math.floor(Math.random() * 100),
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        room: activeRoom
      }
      setMessages(prev => [...prev, response])
    }, 1000)
  }

  const filteredMessages = messages.filter(msg => msg.room === activeRoom)

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-6 h-[calc(100vh-5rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-full flex"
        >
          {/* Sidebar */}
          <div className="w-64 glass-card mr-6 p-4 flex flex-col">
            <h2 className="text-xl font-bold gradient-text mb-6">Chat Rooms</h2>
            
            <div className="space-y-2 mb-6">
              {rooms.map(room => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    activeRoom === room.id 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-white/10 text-gray-300'
                  }`}
                >
                  <room.icon className="w-4 h-4" />
                  <span className="text-sm">{room.name}</span>
                </button>
              ))}
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Online ({onlineUsers.length})
              </h3>
              <div className="space-y-2">
                {onlineUsers.map(user => (
                  <div key={user} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">{user}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 glass-card flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <h2 className="text-xl font-semibold">
                #{rooms.find(r => r.id === activeRoom)?.name}
              </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filteredMessages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex space-x-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {message.user[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{message.user}</span>
                      <span className="text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-gray-100">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={`Message #${rooms.find(r => r.id === activeRoom)?.name}`}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  className="btn-primary px-4"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}