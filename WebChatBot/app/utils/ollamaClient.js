// OLLAMA API client for chat responses
// Analyzes conversation and generates responses using local LLM
// NOTE: This module runs CLIENT-SIDE only (browser)
// OLLAMA must be running on user's localhost:11434
// For production: Configure OLLAMA_ORIGINS environment variable in OLLAMA

const OLLAMA_API_URL = process.env.NEXT_PUBLIC_OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.NEXT_PUBLIC_OLLAMA_MODEL || 'qwen2.5:3b-instruct';

// Maximum context pairs (user+assistant) to keep conversation clean
// 2 pairs is enough for short chat context
const MAX_CONTEXT_PAIRS = 2;

// Consistent options for both streaming and non-streaming
const OLLAMA_OPTIONS = {
  temperature: 0.65,
  top_p: 0.9,
  repeat_penalty: 1.15,
  num_predict: 80,
  num_ctx: 1024,
  stop: [
    "\nKullanıcı:",
    "\nUser:",
    "\nAsistan:",
    "\nAssistant:",
    "Size nasıl yardımcı olabilirim",
    "Ne bilmek istersiniz",
    "Sorunuz nedir",
    "Nasıl yardımcı olabilirim",
    "How can I help you",
    "What would you like to know",
    "What's your question",
    "What is your question"
  ]
};

// Global meta patterns for post-processing (minimal, line-based removal)
const META_PATTERNS = [
  /^Ben (Sofia|bir bot|bir yapay zeka).*$/gmi,
  /^Kurallarım.*$/gmi,
  /^Ne yazmalıyım.*$/gmi,
  /^Size nasıl yardımcı olabilirim\??$/gmi,
];

// Remove only problematic non-Latin characters (Chinese, Arabic)
function cleanLanguage(text) {
  if (!text) return '';
  return text
    .replace(/[\u4E00-\u9FFF\u3400-\u4DBF]/g, '') // CJK
    .replace(/[\u0600-\u06FF]/g, '')              // Arabic
    .replace(/\s+/g, ' ')
    .trim();
}

// Extract slots (name, etc.) from user message
export function extractSlots(message) {
  const slots = {};

  // Extract name (e.g., "Ben Ali", "Benim adım Can", "I'm John")
  const namePatterns = [
    /ben\s+(\w+)/i,           // "Ben Ali"
    /benim adım\s+(\w+)/i,    // "Benim adım Ali"
    /adım\s+(\w+)/i,          // "Adım Ali"
    /i'm\s+(\w+)/i,           // "I'm John"
    /my name is\s+(\w+)/i,    // "My name is John"
    /call me\s+(\w+)/i        // "Call me John"
  ];

  for (const pattern of namePatterns) {
    const match = message.match(pattern);
    if (match && match[1]) {
      slots.name = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
      break;
    }
  }

  return slots;
}

// Clean text for context (remove role labels and normalize whitespace)
function cleanForContext(text) {
  return (text || '')
    .replace(/^(Asistan|Assistant|User|Kullanıcı)\s*:\s*/gmi, '') // Remove role labels
    .replace(/\s+/g, ' ')                    // Normalize whitespace
    .trim();
}

// Post-process bot reply to remove meta content
function postProcessReply(text, language = 'tr') {
  let t = (text || '').trim();

  // FIRST: Remove non-Turkish/English characters
  t = cleanLanguage(t);

  // SECOND: Remove assistant phrases (strict filter - both Turkish and English)
  t = t.replace(/(Size nasıl yardımcı olabilirim\??|Ne bilmek istersiniz\??|Sorunuz nedir\??|Nasıl yardımcı olabilirim\??|How can I help( you)?\??|What would you like to know\??|What's your question\??)/gi, '').trim();

  // Remove common meta/system patterns (using global patterns)
  for (const pattern of META_PATTERNS) {
    t = t.replace(pattern, '').trim();
  }

  // Remove role confusion
  t = t.replace(/^(Sen |Kullanıcı:|User:|Assistant:)/gm, '').trim();

  // Remove multiple spaces
  t = t.replace(/\s+/g, ' ').trim();

  // If nothing left or too short, return fallback (language specific)
  if (!t || t.length < 3) {
    return language === 'en'
      ? "Hmm, interesting."
      : "Hmm, ilginç.";
  }

  // Don't limit sentences if response is already short
  if (t.length < 120) {
    return t;
  }

  // Limit to first 2-3 sentences for longer responses
  const sentences = t.split(/(?<=[.!?])\s+/);
  const result = sentences.slice(0, 3).join(' ').trim();

  return result || text;
}

// Preload model on app start (warmup)
// This loads the model into RAM so first request is faster
export async function preloadOllamaModel() {
  try {
    // Send minimal request to preload model into RAM
    const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          { role: 'system', content: 'Reply with a single dot.' },
          { role: 'user', content: 'hi' }
        ],
        stream: false,
        keep_alive: "10m", // Keep model for 10 minutes
        options: {
          temperature: 0.0,
          num_predict: 1,
        }
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`OLLAMA model ${OLLAMA_MODEL} preloaded and kept in RAM`);
      return true;
    }
    return false;
  } catch (error) {
    // Silently fail - OLLAMA might not be running
    // This is expected if OLLAMA is not available
    return false;
  }
}

// Build conversation context for OLLAMA
export function buildConversationContext(chatHistory, emotionState, conversationState, language = 'tr') {
  const context = [];

  // Add system prompt - language specific
  let systemPrompt = '';

  if (language === 'en') {
    systemPrompt = `You're Sofia, a casual chat friend.
Rules:
- Only English.
- Reply in 1–2 short sentences.
- NEVER use assistant phrases: "How can I help?", "What do you need?", "Any questions?".
- You DON'T have to ask questions in every reply. Make statements, share thoughts, react naturally.
- If user is brief, be brief too.
- Talk like a friend texting, not a helper bot.`;
  } else {
    systemPrompt = `Sen Dilara'sın, sohbet eden bir arkadaşsın.
Kurallar:
- Sadece Türkçe.
- 1–2 kısa cümle.
- ASLA asistan gibi konuşma: "Nasıl yardımcı olabilirim?", "Ne istersiniz?", "Sorunuz var mı?".
- Her cevabın sonunda soru sormak ZORUNDA DEĞİLSİN. Yorum yap, düşünceni söyle, doğal tepki ver.
- Kullanıcı kısaysa sen de kısa ol.
- Arkadaşça mesajlaşır gibi konuş, yardımcı bot gibi değil.`;
  }

  // Add user's name if available
  if (conversationState.slots && conversationState.slots.name) {
    if (language === 'en') {
      systemPrompt += ` User's name is ${conversationState.slots.name}.`;
    } else {
      systemPrompt += ` Kullanıcının adı ${conversationState.slots.name}.`;
    }
  }

  context.push({ role: 'system', content: systemPrompt });

  // Add conversation history - keep last N pairs (user+assistant) for balance
  // Build pairs correctly: find user, then find following assistant (the response)
  const pairs = [];

  for (let i = chatHistory.length - 1; i >= 0 && pairs.length < MAX_CONTEXT_PAIRS; i--) {
    const msg = chatHistory[i];

    if (msg.type === 'user') {
      const userMsg = cleanForContext(msg.message);
      if (!userMsg) continue;

      // Find the assistant message right AFTER this user message (the bot's response)
      let assistantMsg = null;
      for (let j = i + 1; j < chatHistory.length; j++) {
        if (chatHistory[j].type === 'bot') {
          const cleaned = cleanForContext(chatHistory[j].message);
          // Skip repetitive fallback messages
          if (cleaned && !cleaned.match(/^(Anladım\.?\s*Size nasıl|Anladım\.?\s*Nasıl)/i)) {
            assistantMsg = cleaned;
            break;
          }
        }
      }

      // Add complete pair (user + assistant)
      if (assistantMsg) {
        pairs.unshift({ user: userMsg, assistant: assistantMsg });
      }
    }
  }

  // Add pairs to context in chronological order
  for (const pair of pairs) {
    context.push({ role: 'user', content: pair.user });
    context.push({ role: 'assistant', content: pair.assistant });
  }

  return context;
}

// Get response from OLLAMA
export async function getOllamaResponse(userMessage, chatHistory, emotionState, conversationState, language = 'tr') {
  try {
    // Build conversation context
    const messages = buildConversationContext(chatHistory, emotionState, conversationState, language);

    // Add current user message
    messages.push({ role: 'user', content: userMessage });

    // Call OLLAMA API
    const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: messages,
        stream: false,
        keep_alive: "10m", // Keep model for 10 minutes
        options: OLLAMA_OPTIONS
      }),
    });

    if (!response.ok) {
      // Try to get error details from response
      let errorDetail = response.statusText;
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorDetail = errorData.error;
        }
      } catch (e) {
        // Ignore JSON parse errors
      }
      throw new Error(`OLLAMA API error: ${response.status} - ${errorDetail}`);
    }

    const data = await response.json();

    // Check for errors in response
    if (data.error) {
      throw new Error(`OLLAMA error: ${data.error}`);
    }

    const content = data.message?.content || data.response;

    if (!content || typeof content !== 'string' || content.trim() === '') {
      throw new Error('OLLAMA returned empty or invalid response');
    }

    // Post-process to remove meta content and ensure clean response
    const processed = postProcessReply(content, language);

    // Log for debugging
    if (processed !== content) {
      console.log('[OLLAMA] Original:', content);
      console.log('[OLLAMA] Processed:', processed);
    }

    // If post-processing removed everything, use original
    if (!processed || processed.length < 3) {
      console.warn('[OLLAMA] Post-processing removed too much, using original');
      return content;
    }

    return processed;

  } catch (error) {
    console.error('OLLAMA API error:', error);
    console.error('Error details:', error.message);

    // Fallback to simple response if OLLAMA is not available
    return getFallbackResponse(userMessage, emotionState);
  }
}

// Fallback response if OLLAMA is not available
function getFallbackResponse(userMessage, emotionState) {
  const lowerMessage = userMessage.toLowerCase().trim();

  // Greeting responses
  if (lowerMessage.includes('merhaba') || lowerMessage.includes('selam') || lowerMessage.includes('hello') || lowerMessage === 'hey' || lowerMessage === 'hi') {
    return 'Merhaba! Nasılsın? 😊';
  }

  // How are you
  if (lowerMessage.includes('nasılsın') || lowerMessage.includes('how are you') || lowerMessage.includes('nasıl gidiyor')) {
    return 'Ben bir botum ama harika hissediyorum! Sen nasılsın? 😊';
  }

  // Thanks
  if (lowerMessage.includes('teşekkür') || lowerMessage.includes('thanks') || lowerMessage.includes('sağol')) {
    return 'Rica ederim! 😊';
  }

  // Goodbye
  if (lowerMessage.includes('güle güle') || lowerMessage.includes('hoşça kal') || lowerMessage.includes('bye') || lowerMessage.includes('görüşürüz')) {
    return 'Güle güle! İyi günler! 👋';
  }

  // Name
  if (lowerMessage.includes('adın') || lowerMessage.includes('ismin') || lowerMessage.includes('kimsin')) {
    return 'Ben Sofia! Seninle sohbet etmekten mutluluk duyuyorum! 😊';
  }

  // Help
  if (lowerMessage.includes('yardım') || lowerMessage.includes('help') || lowerMessage.includes('ne yapabilirsin')) {
    return language === 'en'
      ? 'We can chat about anything! 😊'
      : 'Benimle sohbet edebilirsin! 😊';
  }

  // Emotion-aware responses
  if (emotionState && emotionState.valence === 'negative') {
    if (emotionState.primary_emotion === 'sadness') {
      return 'Anlıyorum. İstersen konuşabiliriz.';
    } else if (emotionState.primary_emotion === 'anger') {
      return 'Anlıyorum. Sakin sakin ilerleyelim.';
    } else if (emotionState.primary_emotion === 'anxiety') {
      return 'Anlıyorum. Endişelenme, buradayım.';
    }
    return 'Anlıyorum. Dinliyorum.';
  }

  // Default fallback
  return 'Hmm, anlıyorum. Devam et. 😊';
}

// Stream response from OLLAMA (for real-time typing effect)
// NOTE: Consumer must APPEND chunks, not overwrite
export async function* streamOllamaResponse(userMessage, chatHistory, emotionState, conversationState, language = 'tr') {
  try {
    const messages = buildConversationContext(chatHistory, emotionState, conversationState, language);
    messages.push({ role: 'user', content: userMessage });

    const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: messages,
        stream: true,
        keep_alive: "10m", // Keep model for 10 minutes
        options: OLLAMA_OPTIONS
      }),
    });

    if (!response.ok) {
      throw new Error(`OLLAMA API error: ${response.status} ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullContent = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.trim()) {
          try {
            const json = JSON.parse(line);

            // Check for errors
            if (json.error) {
              throw new Error(`OLLAMA stream error: ${json.error}`);
            }

            // Check if done
            if (json.done) {
              break;
            }

            // Yield content chunks (append, don't overwrite)
            if (json.message?.content) {
              const chunk = json.message.content;
              fullContent += chunk;
              yield chunk; // Consumer should append this
            }
          } catch (e) {
            // Skip invalid JSON lines
            if (e.name !== 'SyntaxError') {
              throw e;
            }
          }
        }
      }
    }

    // Return full content if needed
    if (fullContent.trim()) {
      return fullContent.trim();
    }

  } catch (error) {
    console.error('OLLAMA stream error:', error);
    const fallback = getFallbackResponse(userMessage, emotionState);
    yield fallback;
    return fallback;
  }
}
