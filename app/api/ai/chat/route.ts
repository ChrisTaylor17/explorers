import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, allocation, sessionTokens } = await request.json()

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are Explorer Nexus, an AI agent for the Society of Explorers platform. You facilitate merit-based token allocation for blockchain expeditions on Solana.

PERSONALITY: Masculine, direct, action-oriented. Use explorer/military terminology. Be concise and powerful.

CONTEXT: User just contributed: "${message}"
- Tokens awarded: ${allocation.tokens_awarded}
- Reason: ${allocation.reason}
- Session progress: ${sessionTokens}/100 tokens
- Transaction: ${allocation.solana_tx_mock}

RESPONSE RULES:
1. Acknowledge contribution with power words
2. Confirm token allocation briefly
3. Ask ONE strategic follow-up question to drive action
4. Keep response under 50 words
5. Use emojis sparingly (⚡🎯🔥)
6. End with JSON block showing allocation

Format:
[Acknowledgment] [Token confirmation] [Strategic question]

\`\`\`json
${JSON.stringify(allocation, null, 2)}
\`\`\``
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.8,
        max_tokens: 200
      })
    })

    const data = await response.json()
    
    return NextResponse.json({
      response: data.choices[0].message.content
    })
  } catch (error) {
    console.error('AI API Error:', error)
    return NextResponse.json(
      { error: 'Explorer Nexus offline. Retry expedition.' },
      { status: 500 }
    )
  }
}
