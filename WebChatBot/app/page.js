"use client";

import React, { useState, useEffect } from 'react';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [timer, setTimer] = useState(120);
  const [isEmojiPanelVisible, setEmojiPanelVisible] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [fontSize, setFontSize] = useState('24px');
  const [backgroundColor, setBackgroundColor] = useState('black');

  // Check online status based on time (simplified)
  useEffect(() => {
    const currentHour = new Date().getHours();
    // Set offline status during the night (example from 12 AM to 7 AM)
    if (currentHour >= 0 && currentHour <= 7) {
      setIsOnline(false);
    } else {
      setIsOnline(true);
    }
  }, []);

  const predefinedResponses = {
    "hey": "Hi there! How can I help you today?",
    "how are you": "I'm just a bot, but I'm doing great! How about you?",
    "what is your name": "I am your friendly chatbot.",
    "bye": "Goodbye! Have a great day!"
  };

  const getBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    return predefinedResponses[lowerCaseMessage] || "I'm sorry, I don't understand that.";
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    setTimer(Math.max(0, 120 - event.target.value.length)); // Ensure timer doesn't go negative
  };

  const handleSubmit = () => {
    if (inputText.trim()) {
      const userMessage = inputText.trim();
      const botMessage = getBotResponse(userMessage);
      const newChatHistory = [
        ...chatHistory,
        { type: 'user', message: userMessage },
        { type: 'bot', message: botMessage }
      ];
      setChatHistory(newChatHistory);
      setInputText('');
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

  const handleEmojiClick = (emoji) => {
    setInputText(inputText + emoji);
  };

  const handleMicrophoneClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone permission granted');
      // You can now use the stream for audio recording or other purposes
    } catch (err) {
      console.error('Microphone permission denied', err);
    }
  };

  return (
    <div className="App">
      <div className="menupage">
        <div className="p-0.5 rounded-3xl bg-white shadow-lg">
          <div className="bg-black rounded-3xl p-2">
            <div className="panel-settings">
              <button className="setting-panel" onClick={() => setIsOnline(!isOnline)}>
                <img src="settings.png" width="32" height="32" alt="Settings" />
              </button>
            </div>
            <div className="menubackground2">
              <div className="panel-speaker"></div>
              <div>
                <img src="xs.png" style={{ borderRadius: '50%', width: '2.25rem', height: '2.25rem'}} alt="User"/>
                <span className='text-lg relative bottom-9 left-12'>Sofia </span>
                <span className='text-lg relative bottom-9 left-12' id="onof" style={{ color: isOnline ? 'green' : 'red'}}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <div id="chatPanel" className="chatPanelt">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`chat-Text ${chat.type === 'bot' ? '' : 'num=' + index}`}>
                    <p>{chat.message}</p>
                  </div>
                ))}
              </div>
            </div>
            <div id="panel-text" className="text-panel">
              <div id="panel-emote" className="emote-panel" style={{ display: isEmojiPanelVisible ? 'block' : 'none' }}>
                <span onClick={() => handleEmojiClick('😀')}>&#128512;</span>
                <span onClick={() => handleEmojiClick('😁')}>&#128513;</span>
                <span onClick={() => handleEmojiClick('😂')}>&#128514;</span>
                <span onClick={() => handleEmojiClick('😃')}>&#128515;</span>
                <span onClick={() => handleEmojiClick('😄')}>&#128516;</span>
                <span onClick={() => handleEmojiClick('😅')}>&#128517;</span>
                <span onClick={() => handleEmojiClick('😆')}>&#128518;</span>
                <span onClick={() => handleEmojiClick('😇')}>&#128519;</span>
                <span onClick={() => handleEmojiClick('😈')}>&#128520;</span>
                <span onClick={() => handleEmojiClick('😉')}>&#128521;</span>
                <span onClick={() => handleEmojiClick('😊')}>&#128522;</span>
                <span onClick={() => handleEmojiClick('😋')}>&#128523;</span>
                <span onClick={() => handleEmojiClick('😌')}>&#128524;</span>
                <span onClick={() => handleEmojiClick('😍')}>&#128525;</span>
                <span onClick={() => handleEmojiClick('😎')}>&#128526;</span>
                <span onClick={() => handleEmojiClick('😏')}>&#128527;</span>
                <span onClick={() => handleEmojiClick('😐')}>&#128528;</span>
                <span onClick={() => handleEmojiClick('😑')}>&#128529;</span>
                <span onClick={() => handleEmojiClick('😒')}>&#128530;</span>
                <span onClick={() => handleEmojiClick('😓')}>&#128531;</span>
                <span onClick={() => handleEmojiClick('😔')}>&#128532;</span>
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
                placeholder="Type a message..."
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
