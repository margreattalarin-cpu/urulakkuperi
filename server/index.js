import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { CHARACTERS } from './characters.js';
import { generateAIResponse } from './aiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Check system health and active provider
app.get('/api/health', (req, res) => {
  const hasGemini = Boolean(process.env.GEMINI_API_KEY?.trim());
  const hasGroq = Boolean(process.env.GROQ_API_KEY?.trim());
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY?.trim());
  const hasOpenRouter = Boolean(process.env.OPENROUTER_API_KEY?.trim());

  let activeProvider = 'None (Configuration Required)';
  if (hasGemini) activeProvider = 'Google Gemini API';
  else if (hasGroq) activeProvider = 'Groq LLaMA 3.3';
  else if (hasOpenAI) activeProvider = 'OpenAI API';
  else if (hasOpenRouter) activeProvider = 'OpenRouter API';

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    aiProvider: activeProvider,
    hasRealApiKey: hasGemini || hasGroq || hasOpenAI || hasOpenRouter,
    availableProviders: {
      gemini: hasGemini,
      groq: hasGroq,
      openai: hasOpenAI,
      openrouter: hasOpenRouter
    }
  });
});

// Get character catalog
app.get('/api/characters', (req, res) => {
  res.json({
    characters: Object.values(CHARACTERS)
  });
});

// Process dynamic debate exchange
app.post('/api/argument', async (req, res) => {
  try {
    const {
      characterId = 'ammachi',
      message = '',
      conversationHistory = [],
      currentStubbornness = 25,
      currentConfidence = 90,
      memory = []
    } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message cannot be empty.' });
    }

    const result = await generateAIResponse({
      characterId,
      message: message.trim(),
      conversationHistory,
      currentStubbornness: Number(currentStubbornness) || 25,
      currentConfidence: Number(currentConfidence) || 90,
      memory
    });

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('[API /api/argument Error]:', error.message);

    if (error.code === 'MISSING_API_KEY') {
      return res.status(400).json({
        success: false,
        error: 'MISSING_API_KEY',
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      error: 'LLM_GENERATION_FAILED',
      message: error.message
    });
  }
});

// Save and persist API key to .env and process.env
app.post('/api/config/key', (req, res) => {
  const { apiKey, provider = 'gemini' } = req.body;
  if (!apiKey || !apiKey.trim()) {
    return res.status(400).json({ success: false, error: 'No API key provided.' });
  }

  const trimmedKey = apiKey.trim();
  const envVar =
    provider === 'groq'
      ? 'GROQ_API_KEY'
      : provider === 'openai'
      ? 'OPENAI_API_KEY'
      : provider === 'openrouter'
      ? 'OPENROUTER_API_KEY'
      : 'GEMINI_API_KEY';

  process.env[envVar] = trimmedKey;

  // Persist into .env file
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }
    const regex = new RegExp(`^${envVar}=.*$`, 'm');
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `${envVar}=${trimmedKey}`);
    } else {
      envContent += `\n${envVar}=${trimmedKey}\n`;
    }
    fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf8');
    console.log(`[SHERIKKUM Backend] Saved ${envVar} to .env and active process memory.`);
  } catch (err) {
    console.warn('[SHERIKKUM Backend] Failed to write to .env:', err.message);
  }

  res.json({
    success: true,
    message: `Active ${provider.toUpperCase()} key saved and activated!`,
    activeProvider: provider
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    const hasKey = Boolean(process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY);
    console.log(`[SHERIKKUM Backend] Server running on http://localhost:${PORT}`);
    console.log(`[SHERIKKUM Backend] LLM Status: ${hasKey ? 'API Key Configured' : 'NO API KEY SET (Needs GEMINI_API_KEY, GROQ_API_KEY, or OPENAI_API_KEY)'}`);
  });
}

export default app;
