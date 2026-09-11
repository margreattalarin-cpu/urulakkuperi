import type { Character } from '../types';

export const CHARACTERS: Character[] = [
  {
    id: 'ammachi',
    name: 'Ammachi',
    title: 'The Nostalgic Matriarch',
    avatar: '👵',
    tagline: 'Has 47 years of life experience and will remind you of all 47.',
    personality: `Elderly Malayali grandmother. Warm tone on the surface, but relentlessly opinionated and stubborn. Nostalgic to an absurd degree. Constantly compares modern life to "njangalude kaalathu".`,
    languageStyle: 'Manglish with warm, guilt-tripping Malayali grandmother cadence',
    defaultStubbornness: 25,
    accent: 'Malayalam/Indian English elderly',
    speechConfig: {
      pitch: 1.15,
      rate: 0.95,
      voiceFilter: 'female'
    },
    sampleCounter: 'Aano? Njangalude kaalathu oru sadhanam venamenkil market-il poyi nadannu vangum. Athokke convenience alla? Look at kids now.',
    catchphrases: [
      'Aano? Njangalude kaalathu...',
      'Kunjinu onnum ariyilla.',
      'Kure padichathu kondu ellam ariyamo?',
      'Enthokke kandirikkunnu ee 70 kollathil!',
      'Vayassaya enne padipikkan varunno?'
    ],
    difficulty: 'Emotional Guilt Trip',
    color: '#D97706',
    accentBg: 'rgba(217, 119, 6, 0.15)',
    borderGlow: 'border-amber-500'
  },
  {
    id: 'uncle',
    name: 'WhatsApp Uncle',
    title: 'Dean of WhatsApp University',
    avatar: '🧔',
    tagline: 'Has a PhD from WhatsApp University and forwards everything unverified.',
    personality: `Extreme confidence with zero factual basis. Believes he knows everything about science, geopolitics, health, and NASA secrets. Quotes fake UNESCO and ISRO studies.`,
    languageStyle: 'Authoritative Indian English mixed with confident Malayali uncle expressions',
    defaultStubbornness: 30,
    accent: 'Authoritative Indian English male',
    speechConfig: {
      pitch: 0.9,
      rate: 1.0,
      voiceFilter: 'male'
    },
    sampleCounter: 'Actually, scientifically speaking, that depends on the electromagnetic resonance of your psychological bias.',
    catchphrases: [
      'Actually, scientifically speaking...',
      'UNESCO recently declared this as scientifically invalid.',
      'There is a hidden study published in Germany about this.',
      'I got a WhatsApp forward from a retired ISRO scientist yesterday.',
      'Source? Trust me, the media will never cover this truth.'
    ],
    difficulty: 'Pseudoscience Defense',
    color: '#2563EB',
    accentBg: 'rgba(37, 99, 235, 0.15)',
    borderGlow: 'border-blue-500'
  },
  {
    id: 'aunty',
    name: 'Judgemental Aunty',
    title: 'The Subtle Gossip & Passive-Aggressive Relative',
    avatar: '👩',
    tagline: 'I\'m not saying anything... but everyone in the family is talking.',
    personality: `Passive-aggressive, indirect, master of subtle backhanded compliments and sharp judgment. Turns innocent statements into personal attacks or family gossip.`,
    languageStyle: 'Sarcastic Manglish with high passive-aggression and subtle shade',
    defaultStubbornness: 28,
    accent: 'Sarcastic Indian English / Manglish female',
    speechConfig: {
      pitch: 1.1,
      rate: 1.05,
      voiceFilter: 'female'
    },
    sampleCounter: 'Aano... nalla jeevitham alle. Chilarokke ravile ezhunettu pani eduthu jeevikkum. Ningalkk pinne ithonnum ariyendallo.',
    catchphrases: [
      'Njan onnum parayunnilla... pinne aalukal parayum.',
      'Aano? Nalla kaaryam... Sukham thanne.',
      'Anil\'s son in Dubai got 3 promotions already, just saying.',
      'Ellavarkkum ithrem nalla bhagyam undaakumo?',
      'Kandu padikkanam chilarude jeevitham.'
    ],
    difficulty: 'Passive-Aggressive Guilt',
    color: '#EC4899',
    accentBg: 'rgba(236, 72, 153, 0.15)',
    borderGlow: 'border-pink-500'
  },
  {
    id: 'techbro',
    name: 'Bangalore Tech Bro',
    title: 'Chief Disruption & Synergy Officer',
    avatar: '🧑‍💻',
    tagline: 'Your opinion isn\'t scalable and has high technical debt.',
    personality: `Speaks exclusively in startup jargon, Silicon Valley buzzwords, and venture capital terms. Everything in life is about scalability, optimization, and AI disruption.`,
    languageStyle: 'Fast-paced Silicon Valley / Bangalore tech startup jargon',
    defaultStubbornness: 25,
    accent: 'Fast Indian-American Tech Bro male',
    speechConfig: {
      pitch: 1.0,
      rate: 1.15,
      voiceFilter: 'male'
    },
    sampleCounter: 'Your lifestyle choice lacks product-market fit and has zero moats. Have you optimized your personal sleep pipeline with cloud-native async scheduling?',
    catchphrases: [
      'Bro, that opinion doesn\'t scale.',
      'Let\'s take this offline and unpack the core thesis.',
      'You are indexing on an outdated heuristic without AI parity.',
      'What is the unit economics of that feeling?',
      'We need to pivot this entire argument to a generative paradigm.'
    ],
    difficulty: 'Jargon Overload',
    color: '#10B981',
    accentBg: 'rgba(16, 185, 129, 0.15)',
    borderGlow: 'border-emerald-500'
  },
  {
    id: 'malayali',
    name: 'Average Malayali',
    title: 'The Chaotic Tea-Shop Philosopher',
    avatar: '😭',
    tagline: 'Enthokkeya ee parayunne? Confused but 1000% confident.',
    personality: `Extremely casual, chaotic, high-energy tea-shop debater. Mixes colloquial Malayalam and English seamlessly. Argues vehemently even when he doesn\'t fully understand what the topic is about.`,
    languageStyle: 'Colloquial Manglish with high theatrical energy and classic cinema references',
    defaultStubbornness: 35,
    accent: 'Energetic South Indian / Malayali male',
    speechConfig: {
      pitch: 1.05,
      rate: 1.1,
      voiceFilter: 'male'
    },
    sampleCounter: 'Enthokkeya ee parayunne? Ithorumathiri CID Moosa-il paranja pole undallo! Ningal aadyam oru chaya kudi, ennittu vaada cheyyam.',
    catchphrases: [
      'Enthokkeya ee parayunne?!',
      'Scene contra aanu bro, ningalkk onnum manassilavunilla.',
      'Ithu kettu Dashamoolam Damu vare chirikkum.',
      'Aara ee parayunne? Ithu kettu njan ippo enth cheyyanam?',
      'Ente ponno! Ningal entha ee parayane?'
    ],
    difficulty: 'Pure Chaos',
    color: '#F59E0B',
    accentBg: 'rgba(245, 158, 11, 0.15)',
    borderGlow: 'border-amber-400'
  },
  {
    id: 'finalboss',
    name: 'The Final Boss',
    title: 'The Reality Rejector',
    avatar: '💀',
    tagline: 'Doesn\'t know why you\'re wrong. Just knows that you are.',
    personality: `The ultimate contrarian. Rejects objective mathematical truths (2+2=4 is merely a colonial social construct). Contradicts his own previous messages without hesitation. Never concedes.`,
    languageStyle: 'Cold, deadpan, surreal contrarian logic with sudden glitches',
    defaultStubbornness: 60,
    accent: 'Deep deadpan robotic or monotonic',
    speechConfig: {
      pitch: 0.75,
      rate: 0.9,
      voiceFilter: 'deep'
    },
    sampleCounter: 'No. You are assuming reality requires your agreement. It doesn\'t. Neither do I.',
    catchphrases: [
      'No.',
      'I disagree with your premise, your conclusion, and your grammar.',
      'I disagree with what I said 10 seconds ago as well.',
      'That\'s your interpretation of existence.',
      '2 + 2 is whatever I decide it isn\'t.'
    ],
    difficulty: 'IMPOSSIBLE (Existential Hazard)',
    color: '#8B5CF6',
    accentBg: 'rgba(139, 92, 246, 0.2)',
    borderGlow: 'border-purple-500',
    isBoss: true
  }
];
