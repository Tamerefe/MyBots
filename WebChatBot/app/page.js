"use client";

import React, { useEffect, useRef, useState } from 'react';
import { intentsData } from './data/intents';
import {
  detectEmotionFromMessage,
  updateEmotionState
} from './utils/emotionDetection';
import { getOllamaResponse, preloadOllamaModel, extractSlots } from './utils/ollamaClient';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [timer, setTimer] = useState(120);
  const [isEmojiPanelVisible, setEmojiPanelVisible] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isEmojiPickerReady, setIsEmojiPickerReady] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('tr'); // 'tr' or 'en'
  const [conversationState, setConversationState] = useState({
    slots: {},
    emotionState: null,
    messageCount: 0
  });
  const emojiPickerRef = useRef(null);
  const chatPanelRef = useRef(null);


  useEffect(() => {
    // Register the <emoji-picker> web component on the client only
    let cancelled = false;
    import('emoji-picker-element')
      .then(() => {
        if (!cancelled) setIsEmojiPickerReady(true);
      })
      .catch(() => {
        // If it fails, we just won't show the picker
        if (!cancelled) setIsEmojiPickerReady(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Preload OLLAMA model on app start (warmup)
  useEffect(() => {
    preloadOllamaModel().catch(() => {
      // Silently fail if OLLAMA is not available
    });
  }, []);

  useEffect(() => {
    const el = emojiPickerRef.current;
    if (!isEmojiPickerReady || !el) return;

    const onEmojiClick = (event) => {
      const emoji = event?.detail?.unicode;
      if (!emoji) return;
      setInputText((t) => t + emoji);
    };

    el.addEventListener('emoji-click', onEmojiClick);
    return () => el.removeEventListener('emoji-click', onEmojiClick);
  }, [isEmojiPickerReady]);

  // Scroll to bottom when new message is added
  useEffect(() => {
    if (chatPanelRef.current) {
      chatPanelRef.current.scrollTop = chatPanelRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const getBotResponse = async (userMessage, currentLanguage) => {
    const emotionModel = intentsData.emotionModel;

    // 1. Emotion Detection - ANALYZE USER'S EMOTION FROM MESSAGE
    const detectedEmotion = detectEmotionFromMessage(userMessage, emotionModel);

    // 2. Update emotion state with EWMA (rolling average for smooth emotion tracking)
    const smoothing = emotionModel?.smoothing || 0.3;
    setConversationState(prev => {
      const newEmotionState = updateEmotionState(prev.emotionState, detectedEmotion, smoothing);
      const newMessageCount = prev.messageCount + 1;

      return {
        ...prev,
        emotionState: newEmotionState,
        messageCount: newMessageCount
      };
    });

    // Get updated emotion state for response generation (used by OLLAMA)
    const currentEmotionState = conversationState.emotionState
      ? updateEmotionState(conversationState.emotionState, detectedEmotion, smoothing)
      : { primary_emotion: 'neutral', intensity: 0.3, confidence: 0.3, valence: 'neutral', arousal: 'medium', message_count: 1, trend: 'stable', stable_count: 0 };

    // Log emotion detection for debugging (can be removed in production)
    if (currentEmotionState.primary_emotion !== 'neutral' && currentEmotionState.confidence > 0.4) {
      console.log(`[Emotion Detection] ${currentEmotionState.primary_emotion} (${Math.round(currentEmotionState.intensity * 100)}% intensity, ${Math.round(currentEmotionState.confidence * 100)}% confidence)`);
    }

    // Extract slots from message
    const slots = extractSlots(userMessage);

    // Update conversation state with new slots
    setConversationState(prev => ({
      ...prev,
      slots: { ...prev.slots, ...slots }
    }));

    // Get response from OLLAMA
    let response = '';
    {
      try {
        // Get response from OLLAMA with emotion context
        response = await getOllamaResponse(
          userMessage,
          chatHistory,
          currentEmotionState,
          conversationState,
          currentLanguage
        );

        // Ensure response is not empty
        if (!response || response.trim() === '') {
          throw new Error('OLLAMA returned empty response');
        }
      } catch (error) {
        console.error('OLLAMA error:', error);
        // Fallback to varied natural responses (language specific)
        const naturalFallbacks = currentLanguage === 'en' ? [
          "Hmm, interesting. Go on, I'm listening.",
          "I see. What do you think about it?",
          "Wow! Tell me more.",
          "So, how's it going?",
          "Interesting... tell me more?",
          "Hmm okay. What do you think?",
          "Got it. So what are you up to?",
          "Hah, I see. Continue!",
        ] : [
          "Hmm, ilginç. Devam et, dinliyorum.",
          "Anlıyorum. Ne düşünüyorsun bunun hakkında?",
          "Vay be! Daha fazla anlat bakalım.",
          "E, nasıl gidiyor?",
          "İlginç... söyle bakalım daha?",
          "Hmm okay. Sen ne dersin?",
          "Anladım anladım. Peki sen ne yapıyorsun?",
          "Hah, anlıyorum. Devam et!",
        ];
        response = naturalFallbacks[Math.floor(Math.random() * naturalFallbacks.length)];
      }
    }

    // Final safety check: ensure response is not empty
    if (!response || response.trim() === '') {
      const emergencyFallbacks = currentLanguage === 'en' ? [
        "Hmm?",
        "Tell me?",
        "Yes?",
        "Go on...",
        "So?"
      ] : [
        "Hmm?",
        "Söyle bakalım?",
        "Evet?",
        "Devam et...",
        "E?"
      ];
      response = emergencyFallbacks[Math.floor(Math.random() * emergencyFallbacks.length)];
    }

    return response;
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    setTimer(Math.max(0, 120 - event.target.value.length)); // Ensure timer doesn't go negative
  };

  const handleSubmit = async () => {
    if (inputText.trim() && !isTyping) {
      const userMessage = inputText.trim();

      // Add user message immediately
      setChatHistory(prev => [
        ...prev,
        { type: 'user', message: userMessage }
      ]);
      setInputText('');

      // Show typing indicator
      setIsTyping(true);

      // Get bot response
      const botMessage = await getBotResponse(userMessage, language);

      // Add bot message
      setChatHistory(prev => [
        ...prev,
        { type: 'bot', message: botMessage }
      ]);

      setIsTyping(false);
    }
  };

  const toggleEmojiPanel = () => {
    setEmojiPanelVisible(!isEmojiPanelVisible);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  // Emoji selection is handled via emoji-picker-element's `emoji-click` event

  const handleMicrophoneClick = () => {
    // Placeholder for future voice input feature
    console.log('Microphone feature - coming soon');
  };

  const handleLanguageToggle = () => {
    // Toggle between Turkish and English
    setLanguage(prev => prev === 'tr' ? 'en' : 'tr');

    // Clear chat history when switching languages (clean slate for new character)
    setChatHistory([]);

    // Reset conversation state
    setConversationState({
      slots: {},
      emotionState: null,
      messageCount: 0
    });

    // Clear input
    setInputText('');

    // Hide emoji panel
    setEmojiPanelVisible(false);
  };

  // Get emotion bar width based on emotion state
  const getEmotionBarWidth = (emotionState) => {
    if (!emotionState || emotionState.intensity === undefined) {
      return 5; // Minimal bar when neutral/starting
    }

    // Map intensity (0-1) to bar width (5-100%)
    // Higher intensity = fuller bar
    const width = Math.max(5, Math.min(100, emotionState.intensity * 100));

    return width;
  };

  // Get emotion bar color based on emotion state
  const getEmotionBarColor = (emotionState) => {
    if (!emotionState || !emotionState.primary_emotion) {
      return '#6b7280'; // Neutral gray
    }

    const emotionColors = {
      'joy': '#10b981',        // Green (positive)
      'gratitude': '#10b981',  // Green (positive)
      'calm': '#06b6d4',       // Cyan (positive)
      'sadness': '#3b82f6',    // Blue (negative)
      'anger': '#ef4444',      // Red (negative)
      'anxiety': '#f59e0b',    // Orange (negative)
      'stress': '#f59e0b',     // Orange (negative)
      'frustration': '#ef4444', // Red (negative)
      'tired': '#6366f1',      // Indigo (neutral-negative)
      'confusion': '#8b5cf6',  // Purple (neutral)
      'neutral': '#6b7280'     // Gray (neutral)
    };

    return emotionColors[emotionState.primary_emotion] || emotionColors['neutral'];
  };

  return (
    <div className="App">
      <div className="menupage">
        <div className="p-0.5 rounded-3xl bg-white shadow-lg">
          <div className="bg-black rounded-3xl p-2">
            <div className="menubackground2">
              <div className="panel-speaker"></div>
              <div className="chat-header">
                <img src="xs.png" style={{ borderRadius: '50%', width: '2.25rem', height: '2.25rem' }} alt="User" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className='text-lg'>{language === 'en' ? 'Sofia' : 'Dilara'}</span>
                    <div className="emotion-bar-container">
                      <div
                        className="emotion-bar"
                        style={{
                          width: `${getEmotionBarWidth(conversationState.emotionState)}%`,
                          backgroundColor: getEmotionBarColor(conversationState.emotionState)
                        }}
                      ></div>
                    </div>
                  </div>
                  <span className='text-sm' style={{ color: 'green' }}>
                    Online
                  </span>
                </div>
                <div className="panel-settings">
                  <button className="setting-panel" onClick={handleLanguageToggle} title={language === 'tr' ? 'Switch to English' : 'Türkçe\'ye Geç'}>
                    <span style={{ fontSize: '1.5rem' }}>{language === 'tr' ? '🇹🇷' : '🇺🇸'}</span>
                  </button>
                </div>
              </div>
              <div id="chatPanel" ref={chatPanelRef} className="chatPanelt">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`chat-Text ${chat.type === 'bot' ? 'chat-bot' : 'chat-user'}`}>
                    <p>{chat.message}</p>
                  </div>
                ))}
                {isTyping && (
                  <div className="chat-Text chat-bot">
                    <p className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div id="panel-text" className="text-panel">
              <div id="panel-emote" className="emote-panel" style={{ display: isEmojiPanelVisible ? 'block' : 'none' }}>
                {isEmojiPickerReady ? (
                  <emoji-picker ref={emojiPickerRef}></emoji-picker>
                ) : (
                  <div style={{ padding: '0.75rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                    Emoji paneli yükleniyor...
                  </div>
                )}
              </div>

              <button onClick={toggleEmojiPanel} id="pop-up">🤔</button>
              <input
                id="input-text"
                className="text-input pl-2"
                type="text"
                maxLength="120"
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Mesajınızı yazın..."
              />
              <button onClick={handleMicrophoneClick} id="clicktButton" className="text-button">🎙️</button>
              <span id="timerGlock" className="glockTimer">{timer}</span>
              <div className="panel-touch"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
