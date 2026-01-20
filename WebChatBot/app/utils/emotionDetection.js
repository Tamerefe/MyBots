// Advanced emotion detection with signal + score system
// Uses emotionModel from intents data

// Text preprocessing for emotion detection (Unicode-aware for Turkish)
function preprocessForEmotion(text) {
  if (!text) return '';
  return text
    .toLocaleLowerCase('tr-TR')  // Turkish lowercase (ı → ı, İ → i)
    .replace(/[^\p{L}\p{N}\s]/gu, ' ') // Keep Unicode letters + numbers + spaces
    .replace(/\s+/g, ' ')
    .trim();
}

// Check for negation words before emotion pattern (window-based)
function hasNegationWindow(processed, startIndex) {
  // Check ~3-5 words before the pattern (approximately 40 chars)
  const left = processed.slice(Math.max(0, startIndex - 40), startIndex);
  return /\b(değil|yok|hiç|asla|not|no|never|hayır)\b/i.test(left);
}

// Check if a word exists as a whole word (word boundary)
function containsWord(processed, word) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`, 'i').test(processed);
}

// Detect repeated characters (e.g., "çoooook", "aaaaaaa")
function detectRepeatedChars(text) {
  const repeatedPattern = /(.)\1{2,}/g;
  const matches = text.match(repeatedPattern);
  return matches ? matches.length * 0.1 : 0; // Each repetition adds intensity
}

// Detect question density (multiple questions might indicate anxiety)
function detectQuestionDensity(text) {
  const questionMarks = (text.match(/\?/g) || []).length;
  const sentences = text.split(/[.!?]+/).length;
  return questionMarks > 1 ? questionMarks * 0.08 : 0;
}

// Detect exclamation density (multiple exclamations might indicate strong emotion)
function detectExclamationDensity(text) {
  const exclamationMarks = (text.match(/!/g) || []).length;
  return exclamationMarks > 1 ? exclamationMarks * 0.10 : 0;
}

// Detect emotion from a single message using signal + score system
export function detectEmotionFromMessage(message, emotionModel) {
  if (!emotionModel) {
    // Fallback if emotionModel not provided
    return {
      primary_emotion: 'neutral',
      intensity: 0.3,
      confidence: 0.3,
      valence: 'neutral',
      arousal: 'medium',
      all_emotions: {}
    };
  }

  const processed = preprocessForEmotion(message);
  const originalMessage = message;
  const emotionScores = {};
  
  // Initialize scores for all emotion labels
  for (const label of emotionModel.labels) {
    emotionScores[label] = 0;
  }
  
  // 1. Check lexicon patterns (with negation detection and word boundaries)
  let pendingBoost = 0; // Collect intensity boosts to apply later
  
  for (const entry of emotionModel.lexicon) {
    const pattern = entry.pattern.toLowerCase();
    
    // Use word boundary check for better accuracy
    const isMatch = containsWord(processed, pattern) || containsWord(originalMessage.toLowerCase(), pattern);
    
    if (isMatch) {
      // Check for negation before the pattern
      const patternIndex = processed.indexOf(pattern);
      const hasNegation = patternIndex !== -1 && hasNegationWindow(processed, patternIndex);
      
      if (entry.scores.intensity_boost) {
        // Collect boost for later application
        pendingBoost += entry.scores.intensity_boost;
      } else {
        // Add scores for specific emotions
        for (const [emotion, score] of Object.entries(entry.scores)) {
          if (emotionModel.labels.includes(emotion)) {
            if (hasNegation) {
              // Negate or reduce score significantly
              emotionScores[emotion] = Math.max(emotionScores[emotion] || 0, score * 0.1);
            } else {
              emotionScores[emotion] = Math.max(emotionScores[emotion] || 0, score);
            }
          }
        }
      }
    }
  }
  
  // Apply pending boost to all emotions that have a score
  if (pendingBoost > 0) {
    for (const label of emotionModel.labels) {
      if (emotionScores[label] > 0) {
        emotionScores[label] += pendingBoost;
      }
    }
  }
  
  // 2. Check punctuation signals
  const punctuationBoost = emotionModel.signals.punctuationBoost || {};
  for (const [punctuation, boost] of Object.entries(punctuationBoost)) {
    if (originalMessage.includes(punctuation)) {
      // Boost negative emotions for multiple punctuation
      if (punctuation.includes('!')) {
        emotionScores.anger = (emotionScores.anger || 0) + boost;
        emotionScores.frustration = (emotionScores.frustration || 0) + boost * 0.7;
      }
      if (punctuation.includes('?')) {
        emotionScores.anxiety = (emotionScores.anxiety || 0) + boost;
      }
    }
  }
  
  // 3. Check CAPS (all caps words)
  const capsWords = originalMessage.match(/\b[A-Z]{3,}\b/g);
  if (capsWords && capsWords.length > 0) {
    const capsBoost = emotionModel.signals.capsBoost || 0.12;
    emotionScores.anger = (emotionScores.anger || 0) + capsBoost;
    emotionScores.frustration = (emotionScores.frustration || 0) + capsBoost * 0.8;
  }
  
  // 4. Check emoji signals
  const emojiMap = emotionModel.signals.emojiMap || {};
  for (const [emoji, scores] of Object.entries(emojiMap)) {
    if (originalMessage.includes(emoji)) {
      for (const [emotion, score] of Object.entries(scores)) {
        if (emotionModel.labels.includes(emotion)) {
          emotionScores[emotion] = Math.max(emotionScores[emotion] || 0, score);
        }
      }
    }
  }
  
  // 5. Check for short replies (trend indicator)
  const words = processed.split(' ').filter(w => w.length > 0);
  if (words.length <= 2 && ['ok', 'tm', 'he', 'evet', 'hayır', 'tamam', 'hmm', 'hm'].includes(processed)) {
    // Short replies might indicate frustration or disengagement
    emotionScores.frustration = (emotionScores.frustration || 0) + 0.15;
  }
  
  // 6. NEW: Check for repeated characters (intensity indicator)
  const repeatedBoost = detectRepeatedChars(originalMessage);
  if (repeatedBoost > 0) {
    // Boost all existing emotions
    for (const label of emotionModel.labels) {
      if (emotionScores[label] > 0) {
        emotionScores[label] = (emotionScores[label] || 0) + repeatedBoost;
      }
    }
  }
  
  // 7. NEW: Check question density (anxiety indicator)
  const questionDensityBoost = detectQuestionDensity(originalMessage);
  if (questionDensityBoost > 0) {
    emotionScores.anxiety = (emotionScores.anxiety || 0) + questionDensityBoost;
    emotionScores.stress = (emotionScores.stress || 0) + questionDensityBoost * 0.6;
  }
  
  // 8. NEW: Check exclamation density (strong emotion indicator)
  const exclamationBoost = detectExclamationDensity(originalMessage);
  if (exclamationBoost > 0) {
    // Boost strongest emotion
    let maxEmotion = 'neutral';
    let maxScore = 0;
    for (const [emotion, score] of Object.entries(emotionScores)) {
      if (score > maxScore) {
        maxScore = score;
        maxEmotion = emotion;
      }
    }
    if (maxEmotion !== 'neutral' && emotionScores[maxEmotion] > 0) {
      emotionScores[maxEmotion] = (emotionScores[maxEmotion] || 0) + exclamationBoost;
    }
  }
  
  // 9. NEW: Check for all caps message (strong emotion)
  const allCapsRatio = (originalMessage.match(/[A-Z]/g) || []).length / Math.max(1, originalMessage.length);
  if (allCapsRatio > 0.5 && originalMessage.length > 5) {
    // Strong emotion - boost all emotions
    for (const label of emotionModel.labels) {
      if (emotionScores[label] > 0) {
        emotionScores[label] = (emotionScores[label] || 0) + 0.20;
      }
    }
  }
  
  // 10. Normalize scores (cap at 1.0)
  for (const label of emotionModel.labels) {
    emotionScores[label] = Math.min(1.0, emotionScores[label] || 0);
  }
  
  // Find primary emotion
  let primaryEmotion = 'neutral';
  let maxScore = 0;
  let totalScore = 0;
  
  for (const [emotion, score] of Object.entries(emotionScores)) {
    totalScore += score;
    if (score > maxScore) {
      maxScore = score;
      primaryEmotion = emotion;
    }
  }
  
  // Calculate confidence
  const confidence = maxScore > 0 
    ? Math.min(1.0, maxScore / Math.max(0.1, totalScore / Math.max(1, Object.keys(emotionScores).length))) 
    : 0.3;
  
  // Determine valence (positive/negative)
  const positiveEmotions = ['joy', 'gratitude'];
  const negativeEmotions = ['sadness', 'anger', 'anxiety', 'stress', 'frustration'];
  
  let valence = 'neutral';
  if (positiveEmotions.includes(primaryEmotion)) {
    valence = 'positive';
  } else if (negativeEmotions.includes(primaryEmotion)) {
    valence = 'negative';
  }
  
  // Determine arousal (high/low)
  const highArousalEmotions = ['anger', 'anxiety', 'stress', 'frustration'];
  const lowArousalEmotions = ['sadness', 'tired'];
  
  let arousal = 'medium';
  if (highArousalEmotions.includes(primaryEmotion)) {
    arousal = 'high';
  } else if (lowArousalEmotions.includes(primaryEmotion)) {
    arousal = 'low';
  }
  
  return {
    primary_emotion: primaryEmotion,
    intensity: Math.min(1.0, maxScore),
    confidence: confidence,
    valence: valence,
    arousal: arousal,
    all_emotions: emotionScores
  };
}

// EWMA (Exponentially Weighted Moving Average) for emotion smoothing
export function updateEmotionState(currentState, newEmotion, smoothing = 0.3) {
  // smoothing: weight of new emotion (0.3 = new emotion 30%, old state 70%)
  
  if (!currentState || !currentState.primary_emotion) {
    return {
      primary_emotion: newEmotion.primary_emotion,
      intensity: newEmotion.intensity,
      confidence: newEmotion.confidence,
      valence: newEmotion.valence,
      arousal: newEmotion.arousal,
      message_count: 1,
      trend: 'stable',
      stable_count: 0
    };
  }
  
  // Update emotion if confidence is high enough
  let primaryEmotion = currentState.primary_emotion;
  if (newEmotion.confidence > 0.6 && newEmotion.intensity > currentState.intensity * 0.7) {
    primaryEmotion = newEmotion.primary_emotion;
  }
  
  // EWMA for intensity and confidence
  const newIntensity = smoothing * newEmotion.intensity + (1 - smoothing) * currentState.intensity;
  const newConfidence = smoothing * newEmotion.confidence + (1 - smoothing) * currentState.confidence;
  
  // Update valence and arousal (weighted)
  let valence = currentState.valence;
  if (newEmotion.confidence > 0.5) {
    valence = newEmotion.valence;
  }
  
  let arousal = currentState.arousal;
  if (newEmotion.confidence > 0.5) {
    arousal = newEmotion.arousal;
  }
  
  // Calculate trend
  const intensityDiff = newEmotion.intensity - currentState.intensity;
  let trend = 'stable';
  let stableCount = currentState.stable_count || 0;
  
  if (intensityDiff > 0.2) {
    trend = 'increasing';
    stableCount = 0;
  } else if (intensityDiff < -0.2) {
    trend = 'decreasing';
    stableCount = 0;
  } else {
    trend = 'stable';
    stableCount += 1;
  }
  
  return {
    primary_emotion: primaryEmotion,
    intensity: newIntensity,
    confidence: newConfidence,
    valence: valence,
    arousal: arousal,
    message_count: currentState.message_count + 1,
    trend: trend,
    stable_count: stableCount
  };
}

// Generate check-in question based on emotion state
export function generateCheckInQuestion(emotionState, emotionModel) {
  if (!emotionState || !emotionModel) return null;
  
  const { primary_emotion, confidence, intensity } = emotionState;
  const thresholds = emotionModel.thresholds || {};
  const minConfidence = thresholds.minConfidenceToUse || 0.5;
  
  if (confidence < minConfidence) {
    return null; // Don't ask if confidence is low
  }
  
  const questions = {
    sadness: [
      "İstersen biraz anlat.",
      "Şu an en çok zorlayan kısım hangisi?",
      "Biraz daha açmak ister misin?",
      "Ne oldu, merak ettim."
    ],
    anger: [
      "Bunu kısa adımlarla mı ilerleyelim?",
      "Şu an en çok ne rahatsız ediyor?",
      "Biraz sakinleşmek ister misin?",
      "Ne oldu peki?"
    ],
    anxiety: [
      "Bunu adım adım mı çözelim?",
      "En çok endişelendiğin şey ne?",
      "Biraz daha açmak ister misin?",
      "İstersen konuşalım."
    ],
    stress: [
      "Bunu adım adım mı çözelim?",
      "En çok hangi kısım sıkıştırıyor?",
      "Biraz daha açmak ister misin?",
      "İstersen biraz anlat."
    ],
    tired: [
      "Yorulmuş görünüyorsun. Biraz dinlenmek ister misin?",
      "Ne oldu bugün?",
      "Biraz ara vermek ister misin?"
    ],
    confusion: [
      "Biraz daha açıklayabilir misin?",
      "Hangi kısım kafanı karıştırdı?",
      "Ne anlamadın, açıklayabilir miyim?"
    ],
    frustration: [
      "Bunu birlikte çözelim. En çok ne zorlayıcı?",
      "Şu an en çok ne rahatsız ediyor?",
      "Ne oldu, anlat bakalım."
    ]
  };
  
  const questionList = questions[primary_emotion] || questions.confusion;
  return questionList[Math.floor(Math.random() * questionList.length)];
}

// Generate emotion summary (soft, impression-like)
export function generateEmotionSummary(emotionState, emotionModel) {
  if (!emotionState || !emotionModel) return null;
  
  const { primary_emotion, intensity, confidence, message_count, stable_count } = emotionState;
  const thresholds = emotionModel.thresholds || {};
  const emotionSummary = emotionModel.emotionSummary || {};
  
  if (!emotionSummary.enabled) return null;
  
  const minIntensity = thresholds.minIntensityToSummarize || 0.65;
  const minConfidence = thresholds.minConfidenceToUse || 0.55;
  
  // Check if conditions are met
  if (confidence < minConfidence || intensity < minIntensity || message_count < 5) {
    return null;
  }
  
  // Check if trend is stable (3+ messages)
  if (stable_count < 3) {
    return null;
  }
  
  const templates = emotionSummary.templates || {};
  const summaryList = templates[primary_emotion];
  
  if (!summaryList || summaryList.length === 0) return null;
  
  return summaryList[Math.floor(Math.random() * summaryList.length)];
}

// Get suggested tone for bot response
export function getSuggestedTone(emotionState, emotionModel) {
  if (!emotionState || !emotionModel) return 'neutral';
  
  const { primary_emotion, intensity, valence } = emotionState;
  const thresholds = emotionModel.thresholds || {};
  const minIntensity = thresholds.minIntensityToAdaptTone || 0.35;
  
  if (intensity < minIntensity) {
    return 'neutral';
  }
  
  const toneMap = {
    sadness: 'empathetic',
    anger: 'calm',
    anxiety: 'calm',
    stress: 'calm',
    frustration: 'calm',
    tired: 'empathetic',
    confusion: 'calm',
    joy: 'energetic',
    gratitude: 'energetic',
    neutral: 'neutral'
  };
  
  return toneMap[primary_emotion] || 'neutral';
}
