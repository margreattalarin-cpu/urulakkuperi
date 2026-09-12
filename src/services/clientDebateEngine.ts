import type { Character } from '../types';

interface ClientDebateParams {
  character: Character;
  message: string;
  conversationHistory: Array<{ sender: string; text: string }>;
  currentStubbornness: number;
  currentConfidence: number;
  memory: any[];
}

interface DebateResponse {
  claimDetected: string;
  counterargument: string;
  fallacy: string;
  emotionalState: 'CONFIDENT' | 'OFFENDED' | 'ANNOYED' | 'UNHINGED';
  instabilityTriggered: boolean;
  newStubbornness: number;
  newConfidence: number;
  memoryExtracted?: { topic: string; claim: string };
}

// Keyword-based topic and reaction dictionaries
const CHARACTER_ROASTS: Record<string, Array<{ keywords: string[]; replies: string[]; fallacy: string }>> = {
  ammachi: [
    {
      keywords: ['food', 'biriyani', 'biryani', 'eat', 'rice', 'kanji', 'hotel', 'swiggy', 'zomato'],
      replies: [
        'Swiggy-il order cheythu thinnal aaroogyam undaakumo kunjey? Njangalude kaalathu pazhankanji kudichu 5 mile nadanna aalukalaa!',
        'Biriyani-o? Oru thari velichennayil undakkiya thorante ruchi ningalkk ariyamo? Innathe pillere paranjitt kaaryamilla.',
        'Kunjinu choru unnan polum ariyilla, ennit aanu food-ine patti valya samsaaram!'
      ],
      fallacy: 'Nostalgic Dietary Superiority'
    },
    {
      keywords: ['sleep', 'morning', 'wake', 'tired', 'rest', 'night', 'late'],
      replies: [
        'Ucharaykk ezhunettit tired ennu parayan naanam ille? Njangal 4 manikk ezhunettu kinaril ninnu vellam koriyatha.',
        'Raathri full phone nokki irunnitt morning tired ennathaanu ippozhathe trend!',
        'Suryan udayikkunnathinu munpe ezhunelkkatha orutharkkum aayussu undaavilla.'
      ],
      fallacy: 'Early Riser Guilt Trip'
    },
    {
      keywords: ['money', 'salary', 'job', 'work', 'stress', 'office', 'career'],
      replies: [
        'Kure paisa undennu vechu vella kaaryavum undo? Manassamadhanam venam kunjey, athu computeril ninnu kittilla.',
        'Stress-o? Athu ningal city-il poyi undakkiyathaanu. Njangalkku 7 makkale valarthiyappol oru stressum thonniyilla.',
        'Job-ine patti parayan mathram prayam aayo ninakku? Vayassaya enne kooduthal padipikkanda.'
      ],
      fallacy: 'Generational Suffering Bias'
    }
  ],
  uncle: [
    {
      keywords: ['science', 'fact', 'proof', 'research', 'doctor', 'medicine', 'hospital'],
      replies: [
        'Actually scientifically speaking, Western medicine hides the real truth. NASA satellite images showed tulsi water cures everything.',
        'UNESCO officially released a report last Friday confirming this. But mainline media won\'t telecast it!',
        'Source veno? Retired ISRO scientist Dr. Somnath sent this voice note in our family group directly.'
      ],
      fallacy: 'WhatsApp University Citation'
    },
    {
      keywords: ['phone', '5g', 'radiation', 'ai', 'tech', 'computer', 'network'],
      replies: [
        'Do you know the electromagnetic frequency of 5G vibrates at the exact frequency that disturbs human pineal gland?',
        'AI is nothing but an American conspiracy to collect Indian brain data. Read the forward I shared at 6:15 AM!',
        'Silicon Valley scientists themselves don\'t let their children touch screens. Think about that!'
      ],
      fallacy: 'Microwave Resonance Conspiracy'
    },
    {
      keywords: ['politics', 'country', 'tax', 'petrol', 'government', 'money'],
      replies: [
        'Geopolitically analyze cheythal you will understand the deep state game here. It is all connected to Swiss bank reserves.',
        'Common man only sees surface. UNESCO ranked our country #1 in strategic resilience just yesterday!',
        'Before 2014 what was the situation? Just read the unedited history PDFs!'
      ],
      fallacy: 'Geopolitical Grandiosity'
    }
  ],
  aunty: [
    {
      keywords: ['job', 'salary', 'promotion', 'work', 'startup', 'wfh'],
      replies: [
        'Aano... Anil-nte mon Dubai-il 3 promotions kitti company car vare koduthu. Ningalkk pinne WFH-il irunnu pani edukkunath aanallo thalparyam.',
        'Nalla karyam... chilarude kaaryathil bhagyam kuravaanu, athu vidhi aanu. Njan aarodum onnum parayunnilla.',
        'Company nannayi pokunno? Enikku ariyilla, njan angane oru news kettathukondu chodichathaa...'
      ],
      fallacy: 'Dubai Cousin Comparison'
    },
    {
      keywords: ['marriage', 'single', 'wedding', 'age', 'life', 'happy', 'freedom'],
      replies: [
        'Vayassu 28 kazhinjille? Ippozhe alochichillel pinne nalla proposal onnum varilla. Kandum kettum padikkanam.',
        'Freedom-o? Kudumbam aanu valuthu ennu manasilavan kurachu kalam koodi edukkoom.',
        'Njan onnum paranjilla... naattukaar chodikkumbol naanam kedunnath ammayum achanum aanallo.'
      ],
      fallacy: 'Matrimonial Social Pressure'
    }
  ],
  techbro: [
    {
      keywords: ['idea', 'app', 'code', 'startup', 'build', 'money', 'business'],
      replies: [
        'Bro, your premise has zero TAM and crazy high burn rate. You\'re basically optimizing for negative unit economics.',
        'That opinion isn\'t scalable. Where is the moat? What\'s your AI-native defensibility here?',
        'Look, from a first-principles perspective, you\'re carrying too much cognitive technical debt to see the paradigm shift.'
      ],
      fallacy: 'Silicon Valley Jargon Fog'
    },
    {
      keywords: ['life', 'balance', 'chill', 'weekend', 'sleep', 'relax'],
      replies: [
        'Work-life balance is a legacy mental model. 10x performers operate in a 24/7 hyper-iterative sprint state.',
        'Bro if you\'re chilling on a Saturday, you\'re literally losing ground to autonomous agents and YC founders.',
        'Sounds like a mindset skill issue. Have you tried cold plunges and optimizing your circadian workflow?'
      ],
      fallacy: '10x Hustle Delusion'
    }
  ],
  malayali: [
    {
      keywords: ['tea', 'chai', 'coffee', 'hotel', 'shop', 'kerala', 'food'],
      replies: [
        'Enthuvaade ithu! Chayakkadayil irunnu oru meter chaayayum parippuvadayum kazhikkatha oruthannu enthu naattukaryam ariyaam?',
        'Kattan chaayayude koode world politics discuss cheyyunna feel Bangalore cafe-il kittumo? Scene contra aanu bro.',
        'Athinte idaykk kooduthal scene aakkalle. Nammude naattile vibhavam kandal aarum vaa adachirikkum!'
      ],
      fallacy: 'Chayakkada Geopolitics'
    },
    {
      keywords: ['football', 'messi', 'ronaldo', 'argentina', 'brazil', 'match'],
      replies: [
        'Katta Argentina fan-inte munnil ninnu inganathe thallu vendeetto! Keralathile flex kanditundo ningal?',
        'Sevens football-nte chiri ariyatha aalukal World Cup analyse cheyyan varunno? Poyi match kaanu he!',
        'Ningalude team pottiyathukondu vere aarodum theerkaruthu. Final nammal thanne kondupokum!'
      ],
      fallacy: 'Malappuram Sevens Passion'
    }
  ],
  finalboss: [
    {
      keywords: ['logic', 'truth', 'right', 'wrong', 'fact', 'correct'],
      replies: [
        'You speak of "truth" as if reality has not already shifted three times since you started typing.',
        'If your statement were correct, both you and I would cease to exist in this dimension. Therefore, you are wrong.',
        'Moving the goalposts? I did not move them. I dissolved the entire stadium. Next argument, please.'
      ],
      fallacy: 'Ontological Goalpost Annihilation'
    }
  ]
};

/**
 * Direct Gemini API call when user configured a key in browser storage
 */
async function callDirectGemini(apiKey: string, params: ClientDebateParams): Promise<DebateResponse | null> {
  try {
    const prompt = `You are "${params.character.name}" (${params.character.title}) in the satirical Kerala debate app URULAKKUPPERI.
Personality: ${params.character.personality}
Style: ${params.character.languageStyle}
Current Stubbornness: ${params.currentStubbornness}%

The user just said: "${params.message}".

Your mission: Relentlessly disagree and give a witty, hilarious 1-2 sentence clapback (under 25 words) in character Manglish/English!
Output ONLY JSON in this format:
{
  "claimDetected": "short 2-4 word claim",
  "counterargument": "1-2 snappy sentences in character",
  "fallacy": "humorous fallacy name",
  "emotionalState": "${params.currentStubbornness >= 80 ? 'UNHINGED' : params.currentStubbornness >= 55 ? 'ANNOYED' : 'CONFIDENT'}",
  "instabilityTriggered": ${params.currentStubbornness >= 85}
}`;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.85,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!res.ok) return null;
    const json = await res.json();
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;

    const parsed = JSON.parse(text);
    return {
      claimDetected: parsed.claimDetected || 'Dubious assertion',
      counterargument: parsed.counterargument,
      fallacy: parsed.fallacy || 'Logical Incongruity',
      emotionalState: parsed.emotionalState || 'CONFIDENT',
      instabilityTriggered: Boolean(parsed.instabilityTriggered),
      newStubbornness: Math.min(100, params.currentStubbornness + Math.floor(Math.random() * 12) + 10),
      newConfidence: Math.max(20, params.currentConfidence - Math.floor(Math.random() * 8) + 4)
    };
  } catch {
    return null;
  }
}

/**
 * Robust, hilarious offline/static client debate generator
 */
export async function generateClientDebateResponse(params: ClientDebateParams): Promise<DebateResponse> {
  // Check if user entered a custom Gemini key in browser
  const storedKey = localStorage.getItem('urulakkuperi_api_key') || (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (storedKey && storedKey.trim().length > 10) {
    const liveResponse = await callDirectGemini(storedKey.trim(), params);
    if (liveResponse) return liveResponse;
  }

  // Artificial short thinking delay for natural conversational feel
  await new Promise((resolve) => setTimeout(resolve, 450 + Math.random() * 350));

  const { character, message, currentStubbornness, currentConfidence } = params;
  const lowerMsg = message.toLowerCase();

  // Search for topic-specific roasts
  const characterRules = CHARACTER_ROASTS[character.id] || [];
  let matchingReply: string | null = null;
  let detectedFallacy = 'Obstinate Conviction';

  for (const rule of characterRules) {
    if (rule.keywords.some((kw) => lowerMsg.includes(kw))) {
      matchingReply = rule.replies[Math.floor(Math.random() * rule.replies.length)];
      detectedFallacy = rule.fallacy;
      break;
    }
  }

  // Fallback to character catchphrases and sample counters
  if (!matchingReply) {
    const pool = [
      character.sampleCounter,
      ...character.catchphrases.map((c) => `${c} Ithokke aaraanu ningale padipichathu?`),
      `Enthu paranjalum athil oru karyavum illa. ${character.catchphrases[0] || 'Ariyathilla.'}`
    ];
    matchingReply = pool[Math.floor(Math.random() * pool.length)];
    detectedFallacy = character.difficulty || 'Unshakeable Dogma';
  }

  const stubJump = Math.floor(Math.random() * 14) + 10;
  const newStub = Math.min(100, currentStubbornness + stubJump);
  const newConf = Math.max(15, currentConfidence - (Math.random() > 0.4 ? 6 : -3));
  const isInstability = newStub >= 88;

  let state: 'CONFIDENT' | 'OFFENDED' | 'ANNOYED' | 'UNHINGED' = 'CONFIDENT';
  if (newStub >= 90) state = 'UNHINGED';
  else if (newStub >= 70) state = 'ANNOYED';
  else if (newStub >= 50) state = 'OFFENDED';

  return {
    claimDetected: message.length > 30 ? `${message.slice(0, 27)}...` : message,
    counterargument: matchingReply,
    fallacy: detectedFallacy,
    emotionalState: state,
    instabilityTriggered: isInstability,
    newStubbornness: newStub,
    newConfidence: newConf,
    memoryExtracted: {
      topic: 'user_claim',
      claim: message.slice(0, 40)
    }
  };
}
