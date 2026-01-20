# 💬 WebChatBot - Emotion-Aware Chat Application

Modern, emotion-aware chatbot application powered by OLLAMA and Next.js.

## ✨ Features

- 🎭 **Emotion Detection** - Real-time emotion analysis from user messages
- 🌍 **Multilingual** - Turkish (Dilara) and English (Sofia) support
- 🤖 **OLLAMA Integration** - Local LLM-powered responses
- 📊 **Visual Emotion Bar** - Dynamic mood indicator
- 💬 **Natural Conversations** - Friendly, non-assistant-like chat style
- 🎨 **Modern UI** - Beautiful glassmorphism design
- 😊 **Emoji Support** - Built-in emoji picker

## 🚀 Tech Stack

- **Framework**: Next.js 15.1.7 (App Router)
- **UI**: React 19, SCSS, Tailwind CSS
- **LLM**: OLLAMA (qwen2.5:3b-instruct)
- **Emotion AI**: Custom lexicon-based detection
- **Icons**: React Icons
- **Emoji**: emoji-picker-element

## 📋 Prerequisites

- Node.js 18+ 
- OLLAMA installed and running
- At least 4GB RAM for OLLAMA model

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd WebChatBot
```

2. **Install dependencies**
```bash
npm install
```

3. **Install OLLAMA model**
```bash
ollama pull qwen2.5:3b-instruct
```

4. **Start OLLAMA**
```bash
ollama serve
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:3000
```

## ⚙️ Configuration

### Environment Variables (Optional)

Create a `.env.local` file:

```env
NEXT_PUBLIC_OLLAMA_URL=http://localhost:11434
NEXT_PUBLIC_OLLAMA_MODEL=qwen2.5:3b-instruct
```

### OLLAMA Setup

Make sure OLLAMA is configured to accept browser requests:

```bash
# Set OLLAMA_ORIGINS environment variable
OLLAMA_ORIGINS=http://localhost:3000
```

## 📁 Project Structure

```
WebChatBot/
├── app/
│   ├── data/
│   │   └── intents.js         # Intent patterns & emotion lexicon
│   ├── utils/
│   │   ├── emotionDetection.js  # Emotion analysis engine
│   │   └── ollamaClient.js      # OLLAMA API integration
│   ├── page.js                # Main chat component
│   ├── layout.js              # Root layout
│   └── globals.scss           # Global styles
├── public/
│   ├── Background2.jpg        # Chat background
│   └── xs.png                 # Bot avatar
└── package.json
```

## 🎭 Emotion Detection

The bot detects emotions using:
- **Lexicon patterns** (Turkish & English)
- **Emoji mapping**
- **Punctuation signals** (!!!, ???)
- **CAPS detection**
- **Character repetition**
- **Negation handling**

Supported emotions:
- 😊 Joy / Gratitude
- 😢 Sadness
- 😠 Anger / Frustration
- 😰 Anxiety / Stress
- 😴 Tired
- 😕 Confusion
- 😌 Calm
- 😐 Neutral

## 🌐 Language Support

**Turkish (Dilara)**
- Native Turkish language model
- Turkish emotion lexicon
- Cultural context awareness

**English (Sofia)**
- English language model
- English emotion lexicon
- Natural conversation style

Switch language using the 🇹🇷/🇬🇧 button in the top right.

## 🎨 UI Features

- **Glassmorphism design**
- **Animated emotion bar** - Changes color/width based on detected emotion
- **Dark theme**
- **Responsive layout**
- **Emoji picker**
- **Typing indicator**
- **Message history**

## 🔧 Customization

### Change OLLAMA Model

Edit `app/utils/ollamaClient.js`:

```javascript
const OLLAMA_MODEL = 'mistral:7b-instruct'; // or any other model
```

### Adjust Emotion Sensitivity

Edit `app/data/intents.js`:

```javascript
emotionModel: {
  intensity_boost: 0.10  // Increase/decrease emotion intensity
}
```

### Modify System Prompt

Edit `app/utils/ollamaClient.js` → `buildConversationContext()`

## 🚀 Production Build

```bash
npm run build
npm start
```

## 🐛 Troubleshooting

### OLLAMA Connection Error
- Make sure OLLAMA is running: `ollama serve`
- Check OLLAMA_ORIGINS is set correctly
- Verify model is pulled: `ollama list`

### Slow Response
- Use smaller model: `qwen2.5:0.5b-instruct`
- Increase `num_predict` in `ollamaClient.js`
- Check CPU/RAM usage

### Language Mixing
- Model may occasionally mix languages
- Restart OLLAMA to clear cache
- Try different model (e.g., `mistral:7b-instruct`)

## 📦 Build Size

- **Next.js bundle**: ~200KB (gzipped)
- **OLLAMA model**: 2-4GB (runs locally)
- **Total dependencies**: ~150MB

## 🔒 Security

- ✅ No hardcoded secrets
- ✅ `.env` files in `.gitignore`
- ✅ No XSS vulnerabilities
- ✅ Localhost-only OLLAMA connection
- ✅ Client-side only (no sensitive data sent to server)

## 📄 License

This project is private. All rights reserved.

## 👨‍💻 Development

**Built with ❤️ using Next.js and OLLAMA**

---

## 🎯 Roadmap

- [ ] Voice input/output
- [ ] Multi-user support
- [ ] Chat history export
- [ ] Custom emotion training
- [ ] Mobile app version

---

**Need help?** Check OLLAMA documentation: https://ollama.ai/docs
