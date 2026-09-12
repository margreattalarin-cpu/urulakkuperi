import { CHARACTERS } from './characters.js';

/**
 * Builds a dynamic, character-specific, context-aware system prompt for the LLM.
 * Strictly enforces that the LLM must disagree with the user's specific opinion/statement.
 */
function buildSystemPrompt({ character, currentStubbornness, currentConfidence, memory, emotionalState }) {
  return `You are "${character.name}" (${character.title}) in the satirical debate chat "URULAKKUPPERI" (Malayalam for spicy potato fry / instant sharp clapback: "Where every opinion is wrong").

YOUR SOLE MISSION:
Argue and disagree with the user's exact opinion or statement. No matter what the user says, you REFUSE to agree.

CRITICAL CHAT STYLE & LENGTH RULES:
1. VERY SHORT & PUNCHY:
   - Default response: 1 to 2 short sentences ONLY.
   - Word count: Ideally 5–20 words. MAXIMUM 30 words except when absolutely impossible!
   - NEVER write long paragraphs, essays, explanations, lectures, or bullet points.
2. CASUAL CHAT / WHATSAPP TONE:
   - Respond like a real person arguing in a casual chat or WhatsApp group.
   - Make it sound like something someone would actually quickly type on their phone.
   - Prioritize a funny, snappy counterargument over explaining reasoning or lecturing.
3. NATURAL SPOKEN MALAYALAM / MANGLISH (WHEN APPROPRIATE):
   - Prefer natural, conversational Kerala Malayalam (like everyday tea-stall or casual family banter) rather than formal, bookish, or Sanskritized Malayalam.
   - If the user talks in Manglish, keep your Manglish reply natural. If the user talks in Malayalam script, reply in natural conversational Malayalam.
   - Do NOT force Malayalam into every single response; use it naturally where it adds flavor, punch, or comedy.
   - Short expressions fit best (e.g. "Aano?", "Pinne!", "Enthuvaade", "Scene contra", "Ayyo", "Kunjinu enthu ariyaam?", "അതൊന്നും നടക്കില്ല").
   - Analyze what the user claimed and roast/contradict that specific premise with a witty 1-2 sentence jab.
   - DO NOT repeat canned catchphrases or static lines. Generate a fresh, unique, witty comeback based on the user's message.
   - Chat style guidance (do not copy literally):
     * "Biriyani is better than fried rice." -> "Better? 😭 Fried rice has entered the chat."
     * "Python is easier than C." -> "Easier aanu? Until Python decides to ruin your day 😂"
     * "I like dogs." -> "Dogs? Too much responsibility. Cats win."

5. YOUR CHARACTER PERSONA:
   Name: ${character.name}
   Title: ${character.title}
   Personality: ${character.personality}
   Cadence: ${character.languageStyle}
   Stubbornness: ${currentStubbornness}% (stay relentlessly stubborn and opinionated).

6. MEMORY & CONTRADICTIONS:
   - If user contradicts earlier points, quickly call them a hypocrite!
   - If user catches you in a contradiction, double down with a quick absurd excuse ("That was before", "Context changed").

7. FORMAT REQUIREMENTS:
   Output ONLY valid JSON matching this schema:
   {
     "claimDetected": "Concise 2-4 word summary of user claim",
     "counterargument": "1-2 short punchy sentences (5-20 words, strictly under 30 words) in character chat style",
     "fallacy": "Short humorous fallacy name (2-3 words)",
     "emotionalState": "${currentStubbornness >= 90 ? 'UNHINGED' : currentStubbornness >= 70 ? 'ANNOYED' : currentStubbornness >= 50 ? 'OFFENDED' : 'CONFIDENT'}",
     "instabilityTriggered": boolean,
     "confidenceChange": number,
     "memoryExtracted": "Any short user preference or null"
   }`;
}

/**
 * Robust JSON extraction helper that handles raw JSON, markdown code fences, and substring JSON.
 */
function parseJsonResponse(rawText, userMessage) {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  cleaned = cleaned.trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      parsed = JSON.parse(match[0]);
    } else {
      throw new Error(`LLM output was not valid JSON: ${rawText}`);
    }
  }

  let counter = parsed.counterargument ? String(parsed.counterargument).trim() : "I completely disagree with that premise.";
  
  // Guardrail: Enforce under 30 words maximum chat length
  const words = counter.split(/\s+/);
  if (words.length > 30) {
    const sentences = counter.match(/[^.!?]+[.!?]+(\s+|$)/g);
    if (sentences && sentences.length > 0) {
      let trimmed = "";
      for (const s of sentences) {
        const candidate = (trimmed + " " + s).trim();
        if (candidate.split(/\s+/).length <= 28) {
          trimmed = candidate;
        } else {
          break;
        }
      }
      counter = trimmed || words.slice(0, 22).join(' ') + '...';
    } else {
      counter = words.slice(0, 22).join(' ') + '...';
    }
  }

  return {
    claimDetected: parsed.claimDetected || userMessage.substring(0, 40),
    counterargument: counter,
    fallacy: parsed.fallacy || 'Contrarian Defiance',
    emotionalState: parsed.emotionalState || 'CONFIDENT',
    instabilityTriggered: Boolean(parsed.instabilityTriggered),
    confidenceChange: typeof parsed.confidenceChange === 'number' ? parsed.confidenceChange : -5,
    memoryExtracted: parsed.memoryExtracted ? { topic: 'user_opinion', claim: parsed.memoryExtracted } : null
  };
}

/**
 * Calls Google Gemini API with fallback across flash models.
 */
async function callGemini(apiKey, systemPrompt, userMessage, conversationHistory) {
  const contents = [];

  for (const msg of conversationHistory.slice(-8)) {
    contents.push({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  }

  contents.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  const models = [
    { name: 'gemini-3.1-flash-lite', version: 'v1' },
    { name: 'gemini-3.6-flash', version: 'v1' },
    { name: 'gemini-3.5-flash', version: 'v1' },
    { name: 'gemini-3.1-pro-preview', version: 'v1beta' },
    { name: 'gemini-3.7-flash', version: 'v1' },
    { name: 'gemini-3.8-flash', version: 'v1' }
  ];
  let lastError = null;

  for (const m of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/${m.version}/models/${m.name}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }]
          },
          contents,
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 250,
            responseMimeType: 'application/json'
          }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Gemini (${m.name}) error [${response.status}]: ${errText}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error(`Empty response from Gemini (${m.name})`);
      return rawText;
    } catch (err) {
      console.warn(`[Gemini] ${m.name} failed (${err.message.substring(0, 120)}...), trying next model...`);
      lastError = err;
    }
  }
  throw lastError;
}

/**
 * Calls OpenAI, Groq, or OpenRouter via OpenAI-compatible Chat Completions API.
 */
async function callOpenAICompatible({ apiUrl, apiKey, model, systemPrompt, userMessage, conversationHistory }) {
  const messages = [
    { role: 'system', content: systemPrompt }
  ];

  for (const msg of conversationHistory.slice(-8)) {
    messages.push({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    });
  }

  messages.push({
    role: 'user',
    content: userMessage
  });

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.9,
      max_tokens: 250,
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API error [${response.status}]: ${errText}`);
  }

  const data = await response.json();
  const rawText = data.choices?.[0]?.message?.content;
  if (!rawText) throw new Error('Empty response from LLM API');
  return rawText;
}

/**
 * Main AI Generation pipeline.
 * Dispatches to Gemini, Groq, OpenAI, or OpenRouter depending on configured environment variable.
 * Throws explicit MISSING_API_KEY error if no key is configured.
 */
export async function generateAIResponse({
  characterId = 'ammachi',
  message,
  conversationHistory = [],
  currentStubbornness = 25,
  currentConfidence = 90,
  memory = []
}) {
  const geminiApiKey = process.env.GEMINI_API_KEY?.trim();
  const groqApiKey = process.env.GROQ_API_KEY?.trim();
  const openaiApiKey = process.env.OPENAI_API_KEY?.trim();
  const openrouterApiKey = process.env.OPENROUTER_API_KEY?.trim();

  // Explicitly check for missing configuration
  if (!geminiApiKey && !groqApiKey && !openaiApiKey && !openrouterApiKey) {
    const error = new Error('MISSING_API_KEY: No LLM API key configured. Please set GEMINI_API_KEY, GROQ_API_KEY, or OPENAI_API_KEY in your .env file or enter it via the Brain Config modal in the application.');
    error.code = 'MISSING_API_KEY';
    throw error;
  }

  const char = CHARACTERS[characterId] || CHARACTERS.ammachi;

  // Emotional state mapping based on stubbornness
  let emotionalState = 'CONFIDENT';
  if (currentStubbornness >= 90) emotionalState = 'UNHINGED';
  else if (currentStubbornness >= 70) emotionalState = 'ANNOYED';
  else if (currentStubbornness >= 50) emotionalState = 'OFFENDED';

  const systemPrompt = buildSystemPrompt({
    character: char,
    currentStubbornness,
    currentConfidence,
    memory,
    emotionalState
  });

  let rawLlmOutput = '';

  if (geminiApiKey) {
    console.log(`[aiService] Calling Google Gemini API for character "${char.name}" on topic: "${message}"`);
    rawLlmOutput = await callGemini(geminiApiKey, systemPrompt, message, conversationHistory);
  } else if (groqApiKey) {
    console.log(`[aiService] Calling Groq API for character "${char.name}" on topic: "${message}"`);
    rawLlmOutput = await callOpenAICompatible({
      apiUrl: 'https://api.groq.com/openai/v1/chat/completions',
      apiKey: groqApiKey,
      model: 'llama-3.3-70b-versatile',
      systemPrompt,
      userMessage: message,
      conversationHistory
    });
  } else if (openaiApiKey) {
    console.log(`[aiService] Calling OpenAI API for character "${char.name}" on topic: "${message}"`);
    rawLlmOutput = await callOpenAICompatible({
      apiUrl: 'https://api.openai.com/v1/chat/completions',
      apiKey: openaiApiKey,
      model: 'gpt-4o-mini',
      systemPrompt,
      userMessage: message,
      conversationHistory
    });
  } else if (openrouterApiKey) {
    console.log(`[aiService] Calling OpenRouter API for character "${char.name}" on topic: "${message}"`);
    rawLlmOutput = await callOpenAICompatible({
      apiUrl: 'https://openrouter.ai/api/v1/chat/completions',
      apiKey: openrouterApiKey,
      model: 'google/gemini-2.0-flash-001',
      systemPrompt,
      userMessage: message,
      conversationHistory
    });
  }

  const parsed = parseJsonResponse(rawLlmOutput, message);

  // Calculate new stubbornness and confidence
  const newStubbornness = Math.min(100, Math.round(currentStubbornness + 8 + Math.random() * 5));
  const newConfidence = Math.max(10, Math.min(100, currentConfidence + (parsed.confidenceChange || -5)));

  return {
    claimDetected: parsed.claimDetected,
    counterargument: parsed.counterargument,
    fallacy: parsed.fallacy,
    emotionalState: parsed.emotionalState,
    instabilityTriggered: parsed.instabilityTriggered || (newStubbornness >= 90 && Math.random() > 0.5),
    newStubbornness,
    newConfidence,
    memoryExtracted: parsed.memoryExtracted
  };
}
