import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Send, MessageSquare, Volume2, AlertCircle, Coffee } from 'lucide-react';

interface SpeechControlsProps {
  isListening: boolean;
  isThinking: boolean;
  isSpeaking: boolean;
  speechError: string | null;
  audioLevel: number;
  transcript?: string;
  isSupported?: boolean;
  onSendMessage: (text: string) => void;
  onToggleVoice: () => void;
  isVoiceMode: boolean;
  onToggleVoiceMode: () => void;
}

const BRAINROT_THINKING_MESSAGES = [
  'Consulting WhatsApp University...',
  'Moving the goalposts...',
  'Preparing nostalgic guilt-trip...',
  'Checking if Sharmaji\'s son did it better...',
  'Finding something to disagree with...',
  'Formulating unscientific counter-thesis...',
  'Asking 47 cousins in Dubai for proof...',
  'Checking unverified ISRO WhatsApp forward...',
  'Categorically disagreeing with premise...'
];

export const SpeechControls: React.FC<SpeechControlsProps> = ({
  isListening,
  isThinking,
  isSpeaking,
  speechError,
  audioLevel,
  transcript = '',
  isSupported = true,
  onSendMessage,
  onToggleVoice,
  isVoiceMode,
  onToggleVoiceMode
}) => {
  const [inputText, setInputText] = useState('');
  const [thinkingIndex, setThinkingIndex] = useState(0);

  // Rotate brainrot loading messages while AI is generating
  useEffect(() => {
    if (!isThinking) return;
    const interval = setInterval(() => {
      setThinkingIndex((prev) => (prev + 1) % BRAINROT_THINKING_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isThinking]);

  // When speech recognition produces interim/final transcript, show it live in the input
  useEffect(() => {
    if (transcript && isListening) {
      setInputText(transcript);
    }
  }, [transcript, isListening]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isThinking) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-2.5 select-none">
      {/* Current State / Telemetry Banner */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#280A10] rounded-xl border-2 border-[#5C1523] text-xs font-mono shadow-md">
        <div className="flex items-center gap-2 overflow-hidden">
          {isThinking ? (
            <div className="flex items-center gap-2 text-[#FBBF24] font-bold animate-pulse truncate">
              <span>🧠</span>
              <span className="truncate">{BRAINROT_THINKING_MESSAGES[thinkingIndex]}</span>
            </div>
          ) : isSpeaking ? (
            <div className="flex items-center gap-2 text-[#EA580C] font-bold animate-pulse truncate">
              <Volume2 className="w-4 h-4 shrink-0 text-[#F59E0B]" />
              <span>🗣️ AI DISPUTING YOUR REALITY ALOUD...</span>
            </div>
          ) : isListening ? (
            <div className="flex items-center gap-2 text-[#4ADE80] font-bold animate-pulse truncate">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-ping shrink-0" />
              <span>🎙️ MIC ACTIVE: Speak your claim now!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[#FEEBC8] truncate font-medium">
              <Coffee className="w-4 h-4 text-[#EA580C] shrink-0" />
              <span>READY FOR DISAGREEMENT</span>
            </div>
          )}
        </div>

        {/* Voice vs Text UI Mode Toggle */}
        <button
          type="button"
          onClick={onToggleVoiceMode}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#180407] hover:bg-[#340E16] text-[#FEEBC8] transition-colors cursor-pointer border border-[#5C1523] shrink-0 ml-2 shadow-xs text-[11px] font-bold"
          title="Toggle between Voice UI Stage and Chat Bar"
        >
          {isVoiceMode ? (
            <>
              <MessageSquare className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="text-[#F59E0B]">CHAT BAR</span>
            </>
          ) : (
            <>
              <Mic className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[#4ADE80]">VOICE STAGE</span>
            </>
          )}
        </button>
      </div>

      {/* Prominent Live "LISTENING" Banner during active speech recognition */}
      {isListening && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#052E16] border-2 border-[#22C55E] rounded-2xl text-xs font-mono text-[#4ADE80] animate-pulse shadow-xl">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="w-3 h-3 rounded-full bg-[#22C55E] animate-ping shrink-0" />
            <span className="font-black uppercase tracking-wide shrink-0 text-[#22C55E]">
              🔴 LISTENING
            </span>
            <span className="text-[#A7F3D0] truncate italic font-sans font-medium">
              {inputText ? `"${inputText}"` : 'Say an opinion (e.g. "Biriyani is better than fried rice")...'}
            </span>
          </div>
          <button
            type="button"
            onClick={onToggleVoice}
            className="px-3.5 py-1 bg-[#15803D] hover:bg-[#16A34A] text-white font-sans font-bold text-xs rounded-xl transition-all cursor-pointer shrink-0 ml-2 shadow-sm"
          >
            Done Speaking
          </button>
        </div>
      )}

      {/* Mic Permission / Speech Recognition Error Alert with Text Fallback */}
      {speechError && (
        <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-[#3B0711] border-2 border-[#EF4444] rounded-xl text-xs text-[#FEEBC8] shadow-md">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#EF4444] shrink-0" />
            <span>{speechError}</span>
          </div>
          <span className="text-[11px] text-[#FEEBC8] bg-[#1A0508] px-2 py-0.5 rounded border border-[#5C1523] whitespace-nowrap shrink-0 font-medium">
            Type your claim below
          </span>
        </div>
      )}

      {/* Input Area */}
      {isVoiceMode ? (
        /* Full Voice Stage UI */
        <div className="flex flex-col items-center justify-center p-6 bg-[#280A10] rounded-3xl border-2 border-[#5C1523] shadow-2xl gap-4">
          <div className="relative flex items-center justify-center">
            {/* Animated Ripple Waves around Mic Button */}
            {isListening && (
              <>
                <div
                  className="absolute w-28 h-28 rounded-full bg-[#22C55E]/20 animate-ping pointer-events-none"
                  style={{ transform: `scale(${1.1 + audioLevel * 0.9})` }}
                />
                <div
                  className="absolute w-36 h-36 rounded-full border-2 border-[#22C55E]/40 animate-pulse pointer-events-none"
                />
              </>
            )}

            <button
              type="button"
              onClick={onToggleVoice}
              disabled={isThinking || !isSupported}
              className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer ${
                isListening
                  ? 'bg-[#DC2626] text-white scale-110 shadow-red-600/60 ring-4 ring-[#EF4444]'
                  : isSupported
                    ? 'bg-gradient-to-tr from-[#15803D] via-[#16A34A] to-[#22C55E] text-white hover:scale-105 active:scale-95 shadow-lg shadow-green-950/60 border-3 border-[#86EFAC]'
                    : 'bg-[#3A0F18] text-[#8C4A56] border border-[#5C1523] cursor-not-allowed'
              } ${isThinking ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isListening ? (
                <Mic className="w-12 h-12 animate-pulse" />
              ) : isSupported ? (
                <Mic className="w-11 h-11 text-white" />
              ) : (
                <MicOff className="w-10 h-10 text-[#8C4A56]" />
              )}
            </button>
          </div>

          {/* Spoken Text Display in Voice Mode */}
          <div className="w-full max-w-md text-center">
            <p className="text-sm font-sans font-medium text-[#FFFDF7] min-h-[1.5rem]">
              {inputText ? (
                <span className="bg-[#180407] px-4 py-2 rounded-2xl border-2 border-[#F59E0B] inline-block shadow-md font-bold text-[#FBBF24]">
                  "{inputText}"
                </span>
              ) : isListening ? (
                <span className="text-[#4ADE80] font-bold animate-pulse">
                  Listening... speak your mind loud and clear!
                </span>
              ) : (
                <span className="text-[#FEEBC8] text-xs font-serif font-bold">
                  Tap microphone & speak an opinion (e.g. &ldquo;Biriyani is better than fried rice&rdquo;)
                </span>
              )}
            </p>
          </div>
        </div>
      ) : (
        /* Integrated Chat Input with Direct High-Presence Mic Button */
        <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
          <div className="relative flex-1 flex items-center">
            {/* High-Presence Kerala Banana-Leaf Green Mic Button */}
            <button
              type="button"
              onClick={onToggleVoice}
              disabled={isThinking || !isSupported}
              title={
                !isSupported
                  ? 'Microphone speech recognition not supported in this browser'
                  : isListening
                    ? 'Click to stop listening and send'
                    : 'Click to speak your argument via microphone'
              }
              className={`p-3.5 rounded-2xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                isListening
                  ? 'bg-[#DC2626] hover:bg-[#B91C1C] text-white animate-pulse shadow-xl shadow-red-600/50 ring-4 ring-[#EF4444] scale-105'
                  : isSupported
                    ? 'bg-gradient-to-tr from-[#15803D] via-[#16A34A] to-[#22C55E] hover:from-[#16A34A] hover:to-[#22C55E] text-white shadow-lg shadow-green-950/60 border-2 border-[#86EFAC] hover:scale-105 active:scale-95'
                    : 'bg-[#3A0F18] text-[#8C4A56] border border-[#5C1523] cursor-not-allowed'
              } ${isThinking ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isListening ? (
                <Mic className="w-5 h-5 animate-bounce" />
              ) : isSupported ? (
                <Mic className="w-5 h-5 text-white" />
              ) : (
                <MicOff className="w-5 h-5 text-[#8C4A56]" />
              )}
            </button>

            {/* Main Text / Spoken Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isListening
                  ? 'Listening... Speak your claim now...'
                  : "Type your claim or click the 🎤 mic to speak..."
              }
              disabled={isThinking}
              className={`w-full px-4 py-3 ml-2.5 bg-[#180407] border-2 rounded-2xl text-[#FFFDF7] placeholder-[#8C4A56] text-sm focus:outline-hidden transition-all font-sans shadow-inner ${
                isListening
                  ? 'border-[#22C55E] ring-2 ring-[#86EFAC] bg-[#052E16] placeholder-[#4ADE80] font-medium'
                  : 'border-[#5C1523] focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20'
              }`}
            />
          </div>

          {/* ARGUE / Submit Button in Turmeric & Burnt Orange */}
          <button
            type="submit"
            disabled={!inputText.trim() || isThinking}
            className={`px-7 py-3.5 rounded-2xl font-desi-display tracking-wider text-sm flex items-center gap-2 transition-all cursor-pointer shrink-0 border-2 border-[#FBBF24] font-black ${
              !inputText.trim() || isThinking
                ? 'bg-[#3A0F18] text-[#8C4A56] cursor-not-allowed border-transparent'
                : 'bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#C2410C] hover:from-[#FBBF24] hover:to-[#EA580C] text-[#170407] shadow-xl shadow-[#EA580C]/30 active:scale-95'
            }`}
          >
            <span>ARGUE</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
};
