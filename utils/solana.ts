import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, TOKEN_PROGRAM_ID } from '@solana/spl-token'

// Solana connection
export const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

// NFT Metadata structure
export interface NFTMetadata {
  name: string
  description: string
  image: string
  attributes: Array<{
    trait_type: string
    value: string
  }>
}

// Token creation parameters
export interface TokenParams {
  name: string
  symbol: string
  description: string
  supply: number
  decimals: number
  mintable: boolean
  freezable: boolean
}

// Create SPL Token
export async function createToken(
  wallet: any,
  params: TokenParams
): Promise<{ mintAddress: string; signature: string }> {
  try {
    if (!wallet.publicKey) {
      throw new Error('Wallet not connected')
    }

    // Create mint account
    const mint = await createMint(
      connection,
      wallet, // payer
      wallet.publicKey, // mint authority
      params.freezable ? wallet.publicKey : null, // freeze authority
      params.decimals // decimals
    )

    // Get or create associated token account
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      mint,
      wallet.publicKey
    )

    // Mint tokens to the token account
    const signature = await mintTo(
      connection,
      wallet,
      mint,
      tokenAccount.address,
      wallet.publicKey,
      params.supply * Math.pow(10, params.decimals)
    )

    return {
      mintAddress: mint.toBase58(),
      signature
    }
  } catch (error) {
    console.error('Error creating token:', error)
    throw error
  }
}

// Mock NFT minting (simplified for demo)
export async function mintNFT(
  wallet: any,
  metadata: NFTMetadata
): Promise<{ mintAddress: string; signature: string }> {
  try {
    if (!wallet.publicKey) {
      throw new Error('Wallet not connected')
    }

    // In a real implementation, you would:
    // 1. Upload metadata to IPFS or Arweave
    // 2. Create mint account with 0 decimals and supply of 1
    // 3. Create metadata account using Metaplex
    // 4. Mint the NFT to user's account

    // For demo purposes, we'll create a simple token with supply of 1
    const mint = await createMint(
      connection,
      wallet,
      wallet.publicKey,
      null, // no freeze authority for NFTs
      0 // 0 decimals for NFTs
    )

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      mint,
      wallet.publicKey
    )

    const signature = await mintTo(
      connection,
      wallet,
      mint,
      tokenAccount.address,
      wallet.publicKey,
      1 // mint exactly 1 NFT
    )

    return {
      mintAddress: mint.toBase58(),
      signature
    }
  } catch (error) {
    console.error('Error minting NFT:', error)
    throw error
  }
}

// Get wallet balance
export async function getWalletBalance(publicKey: PublicKey): Promise<number> {
  try {
    const balance = await connection.getBalance(publicKey)
    return balance / LAMPORTS_PER_SOL
  } catch (error) {
    console.error('Error getting wallet balance:', error)
    return 0
  }
}

// Get token accounts for a wallet
export async function getTokenAccounts(publicKey: PublicKey) {
  try {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      { programId: TOKEN_PROGRAM_ID }
    )

    return tokenAccounts.value.map(account => ({
      mint: account.account.data.parsed.info.mint,
      amount: account.account.data.parsed.info.tokenAmount.uiAmount,
      decimals: account.account.data.parsed.info.tokenAmount.decimals
    }))
  } catch (error) {
    console.error('Error getting token accounts:', error)
    return []
  }
}

// Validate Solana address
export function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address)
    return true
  } catch {
    return false
  }
}

// Format Solana address for display
export function formatAddress(address: string, chars = 4): string {
  if (!address) return ''
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}