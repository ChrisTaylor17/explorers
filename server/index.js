const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
})

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}))
app.use(express.json())

// MongoDB connection (mock for demo)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/society-of-explorers'

// User Schema
const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  username: String,
  createdAt: { type: Date, default: Date.now }
})

// Message Schema
const messageSchema = new mongoose.Schema({
  user: String,
  content: String,
  room: String,
  timestamp: { type: Date, default: Date.now }
})

// NFT Schema
const nftSchema = new mongoose.Schema({
  owner: String,
  name: String,
  description: String,
  image: String,
  attributes: [{ trait_type: String, value: String }],
  mintAddress: String,
  createdAt: { type: Date, default: Date.now }
})

// Token Schema
const tokenSchema = new mongoose.Schema({
  creator: String,
  name: String,
  symbol: String,
  description: String,
  supply: Number,
  decimals: Number,
  mintAddress: String,
  createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)
const Message = mongoose.model('Message', messageSchema)
const NFT = mongoose.model('NFT', nftSchema)
const Token = mongoose.model('Token', tokenSchema)

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join-room', (room) => {
    socket.join(room)
    console.log(`User ${socket.id} joined room: ${room}`)
  })

  socket.on('send-message', async (data) => {
    try {
      const message = new Message(data)
      await message.save()
      io.to(data.room).emit('receive-message', data)
    } catch (error) {
      console.error('Error saving message:', error)
    }
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Society of Explorers API is running' })
})

// User routes
app.post('/api/users', async (req, res) => {
  try {
    const { walletAddress, username } = req.body
    const user = new User({ walletAddress, username })
    await user.save()
    res.json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.get('/api/users/:walletAddress', async (req, res) => {
  try {
    const user = await User.findOne({ walletAddress: req.params.walletAddress })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// NFT routes
app.post('/api/nfts', async (req, res) => {
  try {
    const nft = new NFT(req.body)
    await nft.save()
    res.json(nft)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.get('/api/nfts/:owner', async (req, res) => {
  try {
    const nfts = await NFT.find({ owner: req.params.owner })
    res.json(nfts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Token routes
app.post('/api/tokens', async (req, res) => {
  try {
    const token = new Token(req.body)
    await token.save()
    res.json(token)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.get('/api/tokens/:creator', async (req, res) => {
  try {
    const tokens = await Token.find({ creator: req.params.creator })
    res.json(tokens)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// AI Assistant mock endpoint
app.post('/api/ai/chat', (req, res) => {
  const { message } = req.body
  
  // Mock AI responses
  const responses = [
    "I can help you create NFTs on Solana! Would you like me to guide you through the process?",
    "For token creation, you'll need to specify the supply and decimals. Let me walk you through it.",
    "The Solana devnet is perfect for testing. I can help you connect your wallet and make transactions.",
    "Great question! Let me explain how blockchain transactions work in simple terms.",
    "I recommend starting with a small supply for your first token. You can always create more later if it's mintable."
  ]
  
  const response = responses[Math.floor(Math.random() * responses.length)]
  
  setTimeout(() => {
    res.json({ response })
  }, 1000)
})

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log('MongoDB connection failed, starting server without database')
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (without database)`)
    })
  })