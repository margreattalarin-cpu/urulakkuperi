export type EmotionalState =
  | 'CALM'
  | 'CURIOUS'
  | 'CONFIDENT'
  | 'ANNOYED'
  | 'OFFENDED'
  | 'UNHINGED'
  | 'EXISTENTIAL_CRISIS';

export interface Character {
  id: string;
  name: string;
  title: string;
  avatar: string;
  tagline: string;
  personality: string;
  languageStyle: string;
  defaultStubbornness: number;
  accent: string;
  speechConfig: {
    pitch: number;
    rate: number;
    voiceFilter: string;
  };
  sampleCounter: string;
  catchphrases: string[];
  difficulty: string;
  color: string;
  accentBg: string;
  borderGlow: string;
  isBoss?: boolean;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  claimDetected?: string;
  fallacy?: string;
  emotionalState?: EmotionalState;
  stubbornness?: number;
  confidence?: number;
  instability?: boolean;
}

export interface MemoryItem {
  topic: string;
  claim: string;
}

export interface ArgumentStats {
  userArguments: number;
  aiCounterarguments: number;
  whatsappForwardsCited: number;
  timesGoalpostsMoved: number;
  userContradictions: number;
  aiContradictions: number;
  unnecessaryArguments: number;
  userPatience: number;
  aiStubbornness: number;
  aiConfidence: number;
  topic: string;
  startTime: number;
}
