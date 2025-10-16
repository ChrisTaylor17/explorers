'use client'

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { motion } from 'framer-motion'
import { Upload, Eye, Zap } from 'lucide-react'

export default function CreateNFTPage() {
  const { connected, publicKey } = useWallet()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null as File | null,
    attributes: [{ trait_type: '', value: '' }]
  })
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const addAttribute = () => {
    setFormData({
      ...formData,
      attributes: [...formData.attributes, { trait_type: '', value: '' }]
    })
  }

  const updateAttribute = (index: number, field: string, value: string) => {
    const newAttributes = [...formData.attributes]
    newAttributes[index] = { ...newAttributes[index], [field]: value }
    setFormData({ ...formData, attributes: newAttributes })
  }

  const handleMint = async () => {
    if (!connected) {
      alert('Please connect your wallet first')
      return
    }

    setIsLoading(true)
    // Mock minting process
    setTimeout(() => {
      alert('NFT minted successfully! (This is a demo)')
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold gradient-text mb-8 text-center">Create Your NFT</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="glass-card p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">NFT Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter NFT name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your NFT"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Upload Image</label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">Click to upload image</p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Attributes</label>
                  {formData.attributes.map((attr, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        placeholder="Trait type"
                        value={attr.trait_type}
                        onChange={(e) => updateAttribute(index, 'trait_type', e.target.value)}
                        className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={attr.value}
                        onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                        className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                  <button
                    onClick={addAttribute}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    + Add Attribute
                  </button>
                </div>

                <button
                  onClick={handleMint}
                  disabled={!connected || isLoading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Minting...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Mint NFT
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Preview
              </h3>
              
              <div className="bg-white/5 rounded-lg p-6">
                {preview ? (
                  <img
                    src={preview}
                    alt="NFT Preview"
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-64 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                    <p className="text-gray-400">No image uploaded</p>
                  </div>
                )}
                
                <h4 className="text-lg font-semibold mb-2">
                  {formData.name || 'Untitled NFT'}
                </h4>
                
                <p className="text-gray-300 text-sm mb-4">
                  {formData.description || 'No description provided'}
                </p>
                
                {formData.attributes.some(attr => attr.trait_type && attr.value) && (
                  <div>
                    <h5 className="text-sm font-medium mb-2">Attributes</h5>
                    <div className="space-y-1">
                      {formData.attributes
                        .filter(attr => attr.trait_type && attr.value)
                        .map((attr, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-400">{attr.trait_type}:</span>
                            <span>{attr.value}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}