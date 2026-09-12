import type { Character, EmotionalState, MemoryItem } from '../types';

export interface ClientDebateParams {
  character: Character;
  message: string;
  conversationHistory: Array<{ sender: 'user' | 'ai'; text: string }>;
  currentStubbornness: number;
  currentConfidence: number;
  memory?: MemoryItem[];
}

export interface DebateResponse {
  claimDetected: string;
  counterargument: string;
  fallacy: string;
  emotionalState: EmotionalState;
  instabilityTriggered: boolean;
  newStubbornness: number;
  newConfidence: number;
  memoryExtracted?: {
    topic: string;
    claim: string;
  };
}

/**
 * Rich Kerala satirical counterargument templates tailored per character.
 * Formatted to deliver authentic Malayalam/Manglish punchlines under 25 words.
 */
const CHARACTER_ROASTS: Record<
  string,
  Array<{ keywords: string[]; replies: string[]; fallacy: string }>
> = {
  ammachi: [
    {
      keywords: ['kanji', 'biryani', 'food', 'cook', 'eating', 'hungry', 'hotel', 'fast food', 'pizza', 'burger'],
      replies: [
        'Ayyo monu, innathe pizza-yum burger-um kazhichu vayaru kedakkum. Pazhankanji-yude amrithu ariyilla ninakku!',
        'Hotel-il poyi kaashu kalayunna kuttikalkk veetile chorinte madhuram ariyilla. Njan undakkiyath kazhikk!',
        'Swantham ammachi undakkiya kanji-ye kuttam parayan matram valarno nee? Vayassaya enne vishamikkaruthu.'
      ],
      fallacy: 'Grandmother Culinary Supremacy'
    },
    {
      keywords: ['phone', 'mobile', 'internet', 'insta', 'screen', 'game', 'reels', 'youtube'],
      replies: [
        'Eppozhum aa neela velichathilekku nokki irunnittaanu ella asukhavum! Oru pathu nimisham thazhe vaykk athu.',
        'Kaalathu thottu rathri vare aa chathukkappetti nokki irunnal kshikkan budhi kaanilla. Nalla oru pusthakam vaayikk!',
        'Phone phone phone! Ithu thanneya ninakku thalavedhana varan karanam. Njan paranjal kettu padikilla.'
      ],
      fallacy: 'Blue Light Scapegoating'
    },
    {
      keywords: ['study', 'job', 'work', 'money', 'exam', 'future', 'career', 'lazy'],
      replies: [
        'Padikkunna kaalathu padikkande? Njangalude kaalath 5 kilometer nadannaanu schoolil poyirunnathu!',
        'Kaashinte vilaya ipo ariyilla, swanthamayi koodi varumbo ariyam. Kunjinu oru budhiyum illallo Daivame.',
        'Madiyan aanu nee! Karyam paranjal deshyam varum. Kaalam pokunna pokk nokkikko.'
      ],
      fallacy: 'Nostalgic Hardship Bias'
    }
  ],
  uncle: [
    {
      keywords: ['whatsapp', 'forward', 'fake', 'news', 'trust', 'source', 'proof', 'fact'],
      replies: [
        'Ithu fake-o? Ex-NASA scientist group-il forward cheythatha! Ningalkk ithellam ariyilla, anubhavichu padikku.',
        'Group Admin verify cheytha message aanu monu. Athil UNESCO seal vare undu, nee poyi padikku.',
        'Adyam WhatsApp check cheyyan padikku he! Keralathile top thinkers group-il vannatha ithu.'
      ],
      fallacy: 'Verified WhatsApp Authority'
    },
    {
      keywords: ['science', 'doctor', 'hospital', 'medicine', 'vaccine', 'health', 'cancer'],
      replies: [
        'Pacha thulasiyum karingali vellavum kudichal theeravunnathe ullu ithokke. Allopathy mafia-kku kaashu kodukkalle!',
        'Nammude purana-granthangalil pande paranjathanu ithokke. Modern science ippozhaanu kandu pidikkunnathu.',
        'Doctor-maar company commission kitteett aanu marunnu ezhuthunnathu. Lemon juice-il salt ittu kudichu nokku.'
      ],
      fallacy: 'Herbal Group-Chat Supremacy'
    },
    {
      keywords: ['politics', 'election', 'party', 'minister', 'modi', 'bjp', 'congress', 'cpim', 'strike'],
      replies: [
        'World bank-nte latest survey kando? India-ye thakarkkanulla foreign conspiracy aanu ithokke!',
        'Ningalkk naattile reality ariyilla. TV news ellam paid channels aanu. Ground report njan tharam.',
        'Ente batchmate DGP aanu. Pulli paranjath kettal ningal njetti tharikkum!'
      ],
      fallacy: 'VIP Insider Delusion'
    }
  ],
  aunty: [
    {
      keywords: ['salary', 'job', 'package', 'lpa', 'promotion', 'engineer', 'dubai', 'gulf'],
      replies: [
        'Athra kuranja salary-kko Bangalore-il nikkunne? Gulf-il ente aniyan-te monu masam 4 laksham undu!',
        'Nalla karyam... chilarude kaaryathil bhagyam kuravaanu, athu vidhi aanu. Njan aarodum onnum parayunnilla.',
        'Company nannayi pokunno? Enikku ariyilla, njan angane oru news kettathukondu chodichathaa...'
      ],
      fallacy: 'Dubai Cousin Comparison'
    },
    {
      keywords: ['marriage', 'single', 'wedding', 'age', 'life', 'happy', 'freedom', 'date'],
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
      keywords: ['idea', 'app', 'code', 'startup', 'build', 'money', 'business', 'ai', 'pitch'],
      replies: [
        'Bro, your premise has zero TAM and crazy high burn rate. You\'re basically optimizing for negative unit economics.',
        'That opinion isn\'t scalable. Where is the moat? What\'s your AI-native defensibility here?',
        'Look, from a first-principles perspective, you\'re carrying too much cognitive technical debt to see the paradigm shift.'
      ],
      fallacy: 'Silicon Valley Jargon Fog'
    },
    {
      keywords: ['life', 'balance', 'chill', 'weekend', 'sleep', 'relax', 'holiday'],
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
      keywords: ['tea', 'chai', 'coffee', 'hotel', 'shop', 'kerala', 'food', 'porotta', 'beef'],
      replies: [
        'Enthuvaade ithu! Chayakkadayil irunnu oru meter chaayayum parippuvadayum kazhikkatha oruthannu enthu naattukaryam ariyaam?',
        'Kattan chaayayude koode world politics discuss cheyyunna feel Bangalore cafe-il kittumo? Scene contra aanu bro.',
        'Athinte idaykk kooduthal scene aakkalle. Nammude naattile vibhavam kandal aarum vaa adachirikkum!'
      ],
      fallacy: 'Chayakkada Geopolitics'
    },
    {
      keywords: ['football', 'messi', 'ronaldo', 'argentina', 'brazil', 'match', 'goal'],
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
      keywords: ['logic', 'truth', 'right', 'wrong', 'fact', 'correct', 'agree', 'science'],
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

YOUR MISSION:
Relentlessly disagree and roast their premise! Give a witty, hilarious 1-2 sentence clapback (strictly under 25 words) in character Manglish/English!
Never say you agree. Always contradict them comically.

Output ONLY JSON in this format:
{
  "claimDetected": "2-4 word user claim",
  "counterargument": "1-2 snappy sentences in character",
  "fallacy": "humorous fallacy name",
  "emotionalState": "${params.currentStubbornness >= 85 ? 'UNHINGED' : params.currentStubbornness >= 65 ? 'ANNOYED' : 'CONFIDENT'}",
  "instabilityTriggered": ${params.currentStubbornness >= 85}
}`;

    const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];
    for (const model of models) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.9,
              responseMimeType: 'application/json'
            }
          })
        });

        if (!res.ok) continue;
        const json = await res.json();
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) continue;

        let parsed: any;
        try {
          parsed = JSON.parse(text);
        } catch {
          const match = text.match(/\{[\s\S]*\}/);
          if (match) parsed = JSON.parse(match[0]);
        }

        if (parsed && parsed.counterargument) {
          const stubJump = Math.floor(Math.random() * 12) + 10;
          const newStub = Math.min(100, params.currentStubbornness + stubJump);
          const newConf = Math.max(15, params.currentConfidence - Math.floor(Math.random() * 8) + 3);

          return {
            claimDetected: parsed.claimDetected || 'Dubious assertion',
            counterargument: parsed.counterargument,
            fallacy: parsed.fallacy || 'Logical Incongruity',
            emotionalState: (parsed.emotionalState as EmotionalState) || 'CONFIDENT',
            instabilityTriggered: Boolean(parsed.instabilityTriggered) || newStub >= 90,
            newStubbornness: newStub,
            newConfidence: newConf,
            memoryExtracted: {
              topic: 'user_opinion',
              claim: params.message.slice(0, 40)
            }
          };
        }
      } catch {
        // try next model
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Robust, hilarious offline/static client debate generator
 */
export async function generateClientDebateResponse(params: ClientDebateParams): Promise<DebateResponse> {
  // 1. Check if user entered a custom Gemini key in browser
  const storedKey =
    localStorage.getItem('urulakkuperi_api_key') ||
    (import.meta as any).env?.VITE_GEMINI_API_KEY;
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
      `Enthu paranjalum athil oru karyavum illa. ${character.catchphrases[0] || 'Ariyathilla.'}`,
      `Nee enthu thallu thalliyalum njan ithil sammathikkan pokunnilla!`
    ];
    matchingReply = pool[Math.floor(Math.random() * pool.length)];
    detectedFallacy = character.difficulty || 'Unshakeable Dogma';
  }

  const stubJump = Math.floor(Math.random() * 14) + 10;
  const newStub = Math.min(100, currentStubbornness + stubJump);
  const newConf = Math.max(15, currentConfidence - (Math.random() > 0.4 ? 6 : -3));
  const isInstability = newStub >= 88;

  let state: EmotionalState = 'CONFIDENT';
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
