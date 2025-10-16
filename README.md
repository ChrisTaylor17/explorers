# Society of Explorers

A professional Web3 platform for creating NFTs and tokens on Solana, connecting with fellow explorers, and receiving AI-powered guidance for blockchain interactions.

## 🚀 Features

- **NFT Creation**: Mint unique NFTs on Solana with metadata and attributes
- **Token Creation**: Create custom SPL tokens with configurable parameters
- **Real-time Chat**: Connect with other Web3 explorers in themed chat rooms
- **AI Assistant**: Get personalized guidance for blockchain operations
- **Wallet Integration**: Seamless Phantom wallet connectivity
- **Responsive Design**: Beautiful UI with glassmorphism effects and animations

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Blockchain**: Solana Web3.js, SPL Token
- **Backend**: Node.js, Express, Socket.IO
- **Database**: MongoDB with Mongoose
- **Wallet**: Solana Wallet Adapter (Phantom)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SocietyofExplorers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration values.

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Run the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev:full
   
   # Or run separately:
   npm run dev      # Frontend only
   npm run server   # Backend only
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 VS Code Setup

This project is optimized for VS Code with recommended extensions:

- Prettier - Code formatter
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ESLint
- Auto Rename Tag
- Path Intellisense

Extensions will be automatically suggested when you open the project.

## 🌐 Solana Configuration

The application is configured to use Solana Devnet by default. To get started:

1. **Install Phantom Wallet** browser extension
2. **Switch to Devnet** in Phantom settings
3. **Get Devnet SOL** from the [Solana Faucet](https://faucet.solana.com/)
4. **Connect your wallet** using the connect button

## 📱 Pages & Features

### Home Page
- Hero section with animated compass logo
- Feature cards highlighting main capabilities
- Responsive design with gradient backgrounds

### Create NFT
- Upload image with preview
- Add metadata and attributes
- Mint NFTs directly to your wallet
- Real-time form validation

### Create Token
- Configure token parameters (name, symbol, supply, decimals)
- Toggle mintable and freezable options
- Preview token details before creation
- Integrated with Solana SPL Token program

### Chat
- Multiple themed chat rooms
- Real-time messaging with Socket.IO
- Online user list
- Message history

### Profile
- Wallet connection status
- NFT and token portfolio
- Activity history
- Account settings

### AI Assistant
- Floating chat widget
- Context-aware responses
- Blockchain guidance
- Transaction assistance

## 🔗 API Endpoints

### Users
- `POST /api/users` - Create user profile
- `GET /api/users/:walletAddress` - Get user profile

### NFTs
- `POST /api/nfts` - Save NFT metadata
- `GET /api/nfts/:owner` - Get user's NFTs

### Tokens
- `POST /api/tokens` - Save token metadata
- `GET /api/tokens/:creator` - Get user's tokens

### AI Assistant
- `POST /api/ai/chat` - Chat with AI assistant

## 🎨 Design System

### Colors
- Primary: Blue gradient (#3b82f6 to #2563eb)
- Secondary: Purple (#8b5cf6)
- Accent: Cyan (#06b6d4)
- Background: Dark gradient with purple accents

### Components
- Glass cards with backdrop blur
- Gradient text effects
- Smooth hover animations
- Responsive grid layouts

## 🔐 Security Features

- Wallet-based authentication
- Input validation and sanitization
- Secure transaction signing
- Environment variable protection
- CORS configuration

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (AWS/Railway/Heroku)
1. Set up MongoDB Atlas for production database
2. Configure environment variables
3. Deploy using your preferred platform

### Environment Variables for Production
```bash
MONGODB_URI=mongodb+srv://...
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

## 🧪 Testing

The application includes mock data and simulated blockchain interactions for development. For production:

1. Replace mock functions with real Solana operations
2. Implement proper error handling
3. Add comprehensive testing suite
4. Set up monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Join our Discord community
- Use the AI assistant in the app

## 🔮 Future Enhancements

- [ ] Metaplex integration for advanced NFT features
- [ ] Cross-chain support
- [ ] Advanced trading features
- [ ] Mobile app development
- [ ] Enhanced AI capabilities with real LLM integration
- [ ] Social features and user profiles
- [ ] Marketplace functionality

---

**Happy Exploring! 🧭**