import { useState, useEffect, useRef, useCallback } from 'react';
import type { Character, Message, ArgumentStats as StatsType, EmotionalState } from '../types';
import { AvatarDisplay } from './AvatarDisplay';
import { SpeechControls } from './SpeechControls';
import { ArgumentStats } from './ArgumentStats';
import { DemoModeBar } from './DemoModeBar';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { soundEffects } from '../utils/soundEffects';
import { generateClientDebateResponse } from '../services/clientDebateEngine';
import { LogOut, Volume2, VolumeX } from 'lucide-react';

interface ConversationProps {
  character: Character;
  onEndConversation: (stats: StatsType) => void;
  isDemoMode: boolean;
  onExitDemo: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenKeyModal?: () => void;
}

const QUICK_PROMPTS = [
  '2 + 2 equals 4.',
  'Biriyani is better than fried rice.',
  'Tea is better than coffee.',
  'You contradicted yourself earlier!',
  'I am always right.'
];

export const Conversation: React.FC<ConversationProps> = ({
  character,
  onEndConversation,
  isDemoMode,
  onExitDemo,
  isMuted,
  onToggleMute,
  onOpenKeyModal
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [emotionalState, setEmotionalState] = useState<EmotionalState>('CONFIDENT');
  const [stubbornness, setStubbornness] = useState<number>(character.defaultStubbornness);
  const [aiConfidence, setAiConfidence] = useState<number>(92);
  const [instability, setInstability] = useState<boolean>(false);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [isVoiceMode, setIsVoiceMode] = useState<boolean>(true);
  const [demoStep, setDemoStep] = useState<number>(0);
  const [memory, setMemory] = useState<{ topic: string; claim: string }[]>([]);
  const [keyMissingError, setKeyMissingError] = useState<string | null>(null);

  // Statistics tracker
  const [stats, setStats] = useState<StatsType>({
    userArguments: 0,
    aiCounterarguments: 0,
    whatsappForwardsCited: character.id === 'uncle' ? 2 : 0,
    timesGoalpostsMoved: 0,
    userContradictions: 0,
    aiContradictions: 0,
    unnecessaryArguments: 0,
    userPatience: 100,
    aiStubbornness: character.defaultStubbornness,
    aiConfidence: 92,
    topic: '',
    startTime: Date.now()
  });

  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  const { speak, stop: stopSpeaking, isSpeaking } = useSpeechSynthesis();
  const sendMessageRef = useRef<(text: string) => Promise<void>>(async () => {});

  // Handle incoming final speech transcript
  const handleFinalSpeech = useCallback((transcriptText: string) => {
    if (!transcriptText || isThinking) return;
    sendMessageRef.current(transcriptText);
  }, [isThinking]);

  const {
    isListening,
    transcript,
    error: speechError,
    isSupported,
    audioLevel,
    stopListening,
    toggleListening
  } = useSpeechRecognition({
    onFinalTranscript: handleFinalSpeech
  });

  const handleToggleVoice = useCallback(() => {
    stopSpeaking();
    toggleListening();
  }, [stopSpeaking, toggleListening]);

  // Initial character greeting on mount
  useEffect(() => {
    const greeting = `I am ${character.name}. Whatever opinion you hold, you are categorically wrong. State your argument and prepare to be enlightened.`;
    const initMessage: Message = {
      id: 'greeting',
      sender: 'ai',
      text: greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fallacy: 'Unsolicited Preemptive Strike',
      emotionalState: 'CONFIDENT',
      stubbornness: character.defaultStubbornness,
      confidence: 95
    };
    setMessages([initMessage]);

    // Speak initial greeting after a short delay
    const timer = setTimeout(() => {
      if (!isMuted) {
        speak(greeting, character);
      }
    }, 600);

    return () => {
      clearTimeout(timer);
      stopSpeaking();
    };
  }, [character]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  // Send message and get AI rebuttal from real LLM backend
  const sendMessage = async (userText: string) => {
    if (!userText.trim() || isThinking) return;

    soundEffects.playClick();
    stopSpeaking();
    if (isListening) stopListening();

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsThinking(true);

    // Update user arguments count & detect topic
    setStats((prev) => ({
      ...prev,
      userArguments: prev.userArguments + 1,
      topic: prev.topic || detectTopic(userText)
    }));

    try {
      // Call backend API with conversation history and character state
      const res = await fetch('/api/argument', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterId: character.id,
          message: userText,
          conversationHistory: newMessages.map((m) => ({ sender: m.sender, text: m.text })),
          currentStubbornness: stubbornness,
          currentConfidence: aiConfidence,
          memory
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || `Server error ${res.status}`);
      }

      setKeyMissingError(null);
      handleAiResponse(data);
    } catch (err: any) {
      // Graceful fallback to client-side debate engine (for GitHub Pages static hosting or standalone usage)
      console.warn('Backend unavailable, using client-side debate engine:', err);
      try {
        const clientData = await generateClientDebateResponse({
          character,
          message: userText,
          conversationHistory: newMessages.map((m) => ({ sender: m.sender, text: m.text })),
          currentStubbornness: stubbornness,
          currentConfidence: aiConfidence,
          memory
        });
        setKeyMissingError(null);
        handleAiResponse(clientData);
      } catch (fallbackErr: any) {
        console.error('Debate Engine Error:', fallbackErr);
        const errMsg: Message = {
          id: `err-${Date.now()}`,
          sender: 'ai',
          text: `⚠️ Error generating counterargument: ${fallbackErr.message || 'Engine offline'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          fallacy: 'Dialectical Failure'
        };
        setMessages((prev) => [...prev, errMsg]);
      }
    } finally {
      setIsThinking(false);
    }
  };

  // Helper topic detector
  const detectTopic = (text: string): string => {
    const t = text.toLowerCase();
    if (t.includes('biriyani') || t.includes('food') || t.includes('eat') || t.includes('rice')) return 'Culinary Superiority';
    if (t.includes('tea') || t.includes('coffee')) return 'Caffeine Supremacy';
    if (t.includes('2') || t.includes('math') || t.includes('arithmetic')) return 'Validity of Arithmetic';
    if (t.includes('sleep') || t.includes('morning') || t.includes('wake')) return 'Sleep & Moral Fiber';
    if (t.includes('ai') || t.includes('code') || t.includes('tech')) return 'Technology & Society';
    return 'Subjective Human Convictions';
  };

  // Process AI response payload
  const handleAiResponse = (data: any) => {
    const newStub = data.newStubbornness || Math.min(100, stubbornness + 12);
    const newConf = data.newConfidence || Math.max(15, aiConfidence - 8);
    const isInstable = Boolean(data.instabilityTriggered);

    setStubbornness(newStub);
    setAiConfidence(newConf);
    setEmotionalState(data.emotionalState || 'CONFIDENT');
    setInstability(isInstable);

    if (data.memoryExtracted) {
      setMemory((prev) => [...prev, data.memoryExtracted]);
    }

    // Play tension sound
    if (isInstable) {
      soundEffects.playGlitch();
    } else {
      soundEffects.playTension(newStub);
    }

    const aiMsg: Message = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: data.counterargument,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      claimDetected: data.claimDetected,
      fallacy: data.fallacy,
      emotionalState: data.emotionalState,
      stubbornness: newStub,
      confidence: newConf,
      instability: isInstable
    };

    setMessages((prev) => [...prev, aiMsg]);

    // Update stats
    setStats((prev) => ({
      ...prev,
      aiCounterarguments: prev.aiCounterarguments + 1,
      timesGoalpostsMoved: prev.timesGoalpostsMoved + 1,
      whatsappForwardsCited: prev.whatsappForwardsCited + (character.id === 'uncle' ? 1 : 0),
      aiContradictions: prev.aiContradictions + (isInstable ? 1 : 0),
      aiStubbornness: newStub,
      aiConfidence: newConf,
      userPatience: Math.max(2, prev.userPatience - 18)
    }));

    // Speak counterargument aloud
    if (!isMuted) {
      speak(data.counterargument, character);
    }

    // Advance demo step if in demo mode
    if (isDemoMode) {
      setDemoStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    sendMessageRef.current = sendMessage;
  });

  // Terminate argument and go to report
  const handleRunAway = () => {
    soundEffects.playBusHorn();
    stopSpeaking();
    if (isListening) stopListening();
    onEndConversation(stats);
  };

  const lastAiMessage = [...messages].reverse().find((m) => m.sender === 'ai');

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-3 flex flex-col gap-4 animate-in fade-in duration-300 select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between bg-[#280A10] px-5 py-3 rounded-2xl border-2 border-[#5C1523] shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-3.5xl filter drop-shadow-md">{character.avatar}</span>
          <div>
            <h1 className="font-desi-display text-xl sm:text-2xl font-black text-[#FBBF24] tracking-wide leading-tight drop-shadow-xs">
              {character.name}
            </h1>
            <p className="text-xs text-[#EA580C] font-serif font-bold tracking-tight">
              {character.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio toggle */}
          <button
            type="button"
            onClick={onToggleMute}
            className="p-2.5 rounded-xl bg-[#1A0508] hover:bg-[#340E16] text-[#FEEBC8] border border-[#5C1523] cursor-pointer transition-colors shadow-sm"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#EF4444]" /> : <Volume2 className="w-4 h-4 text-[#22C55E]" />}
          </button>

          {/* RUN AWAY button */}
          <button
            type="button"
            onClick={handleRunAway}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#EA580C] via-[#DC2626] to-[#991B1B] hover:from-[#F97316] hover:to-[#B91C1C] text-white font-mono font-black text-xs tracking-wider flex items-center gap-2 shadow-lg shadow-red-900/40 transition-all cursor-pointer active:scale-95 border border-[#EF4444]/60"
            title="Concede and view forensic argument autopsy"
          >
            <LogOut className="w-4 h-4" />
            <span>RUN AWAY</span>
          </button>
        </div>
      </div>

      {/* Demo Mode Guided Bar (if activated) */}
      {isDemoMode && (
        <DemoModeBar
          currentStep={demoStep}
          onTriggerPrompt={(prompt) => sendMessage(prompt)}
          onExitDemo={onExitDemo}
        />
      )}

      {/* Main Debate Arena: Avatar + Transcript + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Center Avatar Display */}
        <div className="lg:col-span-4 bg-[#280A10] border-2 border-[#5C1523] rounded-3xl p-5 flex flex-col items-center justify-between shadow-2xl">
          <AvatarDisplay
            character={character}
            emotionalState={emotionalState}
            stubbornness={stubbornness}
            isSpeaking={isSpeaking}
            isThinking={isThinking}
            instability={instability}
          />

          {/* Quick Debate Prompt Chips for Testing */}
          <div className="w-full mt-4 pt-3.5 border-t border-[#4A0E19]">
            <p className="text-[10px] font-mono uppercase text-[#FBBF24] font-bold mb-2 text-center tracking-wide">
              ☕ TOSS A TOPIC INTO THE VERANDAH:
            </p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  disabled={isThinking}
                  className="text-[11px] px-3 py-1 rounded-xl bg-[#180407] hover:bg-[#340E16] text-[#FEEBC8] hover:text-[#FBBF24] transition-all border border-[#5C1523] hover:border-[#F59E0B] cursor-pointer truncate max-w-full font-sans font-medium shadow-xs hover:scale-102"
                >
                  &ldquo;{prompt}&rdquo;
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Live Transcript & Speech Controls */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Transcript Log Styled as Kerala Contrarian WhatsApp Arena */}
          <div
            ref={chatScrollRef}
            className="h-[400px] md:h-[440px] overflow-y-auto bg-[#180407] border-2 border-[#5C1523] rounded-3xl p-4 flex flex-col gap-4 scroll-smooth shadow-inner"
          >
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[92%] ${
                    isUser ? 'self-end' : 'self-start'
                  }`}
                >
                  {/* Sender Header */}
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#FEEBC8] font-bold mb-1 px-1">
                    <span className={isUser ? 'text-[#FBBF24]' : 'text-[#EA580C]'}>{isUser ? 'YOU' : character.name}</span>
                    <span className="text-[#8C4A56]">•</span>
                    <span className="text-[10px] text-[#D4A373]">{msg.timestamp}</span>
                    {msg.fallacy && (
                      <span className="text-[#FBBF24] font-bold bg-[#4D1521] px-2 py-0.5 rounded-md border border-[#EA580C] text-[10px]">
                        {msg.fallacy}
                      </span>
                    )}
                  </div>

                  {/* Message Bubble: High Contrast WhatsApp Contrarian Style */}
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                      isUser
                        ? 'bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#D97706] text-[#170407] font-bold rounded-tr-xs border-2 border-[#FCD34D]'
                        : 'bg-[#FFFDF7] text-[#170407] font-semibold border-2 border-[#D4AF37] rounded-tl-xs'
                    }`}
                  >
                    <p className="font-sans text-[14px]">{msg.text}</p>
                  </div>
                </div>
              );
            })}

            {/* Thinking Bubbles */}
            {isThinking && (
              <div className="self-start flex flex-col items-start max-w-[80%]">
                <div className="p-3.5 bg-[#280A10] rounded-2xl rounded-tl-xs border-2 border-[#EA580C] flex items-center gap-2 text-xs font-mono text-[#FBBF24] font-bold shadow-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] animate-ping" />
                  <span>Formulating spicy counterargument...</span>
                </div>
              </div>
            )}
          </div>

          {/* Missing API Key Warning Banner */}
          {keyMissingError && (
            <div className="p-3 bg-[#3B0711] border-2 border-[#EF4444] rounded-2xl flex items-center justify-between gap-3 text-xs text-[#FEEBC8] shadow-md">
              <div className="flex items-center gap-2">
                <span className="text-base">⚠️</span>
                <span><strong>LLM Key Required:</strong> Set GEMINI_API_KEY in .env or configure below.</span>
              </div>
              {onOpenKeyModal && (
                <button
                  type="button"
                  onClick={onOpenKeyModal}
                  className="px-3.5 py-1 bg-[#DC2626] hover:bg-[#EF4444] text-white font-bold rounded-xl whitespace-nowrap cursor-pointer transition-all shrink-0 font-mono shadow-sm"
                >
                  Configure Key
                </button>
              )}
            </div>
          )}

          {/* Speech & Text Input Controls */}
          <SpeechControls
            isListening={isListening}
            isThinking={isThinking}
            isSpeaking={isSpeaking}
            speechError={speechError}
            audioLevel={audioLevel}
            transcript={transcript}
            isSupported={isSupported}
            onSendMessage={sendMessage}
            onToggleVoice={handleToggleVoice}
            isVoiceMode={isVoiceMode}
            onToggleVoiceMode={() => setIsVoiceMode((prev) => !prev)}
          />
        </div>

        {/* Far Right Column: Live Argument Telemetry HUD */}
        <div className="lg:col-span-3">
          <ArgumentStats
            stats={stats}
            lastClaim={lastAiMessage?.claimDetected}
            lastFallacy={lastAiMessage?.fallacy}
            instability={instability}
          />
        </div>
      </div>
    </div>
  );
};
