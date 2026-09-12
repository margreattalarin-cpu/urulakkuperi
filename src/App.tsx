import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { CharacterSelect } from './components/CharacterSelect';
import { Conversation } from './components/Conversation';
import { ArgumentReport } from './components/ArgumentReport';
import { CertificateModal } from './components/CertificateModal';
import { HowUselessModal } from './components/HowUselessModal';
import type { Character, ArgumentStats } from './types';
import { CHARACTERS } from './data/characters';
import { soundEffects } from './utils/soundEffects';
import { Key, CheckCircle, Coffee } from 'lucide-react';

type Screen = 'landing' | 'select' | 'conversation' | 'report';

export function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [character, setCharacter] = useState<Character>(CHARACTERS[0]);
  const [stats, setStats] = useState<ArgumentStats | null>(null);
  const [showHowUseless, setShowHowUseless] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [healthStatus, setHealthStatus] = useState<string>('Connecting engine...');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyProvider, setKeyProvider] = useState<'gemini' | 'groq' | 'openai'>('gemini');
  const [inputKey, setInputKey] = useState('');
  const [keySavedMessage, setKeySavedMessage] = useState<string | null>(null);

  // Check health of backend on mount
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setHealthStatus(data.aiProvider || 'LLM Configured');
      })
      .catch(() => {
        setHealthStatus('Backend Offline');
      });
  }, []);

  const handleToggleMute = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
  };

  const handleStart = () => {
    setIsDemoMode(false);
    setScreen('select');
  };

  const handleStartDemo = () => {
    setIsDemoMode(true);
    setCharacter(CHARACTERS[1]);
    setScreen('conversation');
  };

  const handleSelectCharacter = (selected: Character) => {
    setCharacter(selected);
    setIsDemoMode(false);
    setScreen('conversation');
  };

  const handleEndConversation = (finalStats: ArgumentStats) => {
    setStats(finalStats);
    setScreen('report');
  };

  const handleRestart = () => {
    soundEffects.playGong();
    setIsDemoMode(false);
    setScreen('select');
  };

  const handleSaveApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) return;

    try {
      const res = await fetch('/api/config/key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: inputKey.trim(), provider: keyProvider })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save key');

      setKeySavedMessage(`Active ${keyProvider.toUpperCase()} key activated!`);
      setHealthStatus(`${keyProvider.toUpperCase()} (Live)`);
      setTimeout(() => {
        setShowKeyModal(false);
        setKeySavedMessage(null);
      }, 1500);
    } catch (err: any) {
      setKeySavedMessage(`Error: ${err.message}`);
    }
  };

  const isLanding = screen === 'landing';

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-[#F59E0B] selection:text-[#170407] relative overflow-x-hidden font-ui-body transition-colors duration-300 ${
      isLanding ? 'paper-warm-bg text-[#26160C]' : 'bg-transparent text-[#FFFDF7]'
    }`}>
      {/* Kasavu Gold Decorative Accent Ribbon */}
      <div className="kasavu-gold-strip fixed top-0 left-0 z-50" />

      {/* Top Navbar: Responsive to Landing vs Arena */}
      <header className={`w-full px-4 sm:px-6 py-3 backdrop-blur-md flex items-center justify-between z-40 sticky top-0 transition-colors duration-300 ${
        isLanding
          ? 'bg-[#FAF5EB]/95 border-b-2 border-[#E6DBC8] shadow-sm text-[#26160C]'
          : 'bg-[#22070D]/95 border-b-2 border-[#5C1523] shadow-lg shadow-black/40 text-[#FFFDF7]'
      }`}>
        <div
          onClick={() => setScreen('landing')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          {/* Logo Badge */}
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-md border-2 transition-transform group-hover:scale-105 ${
            isLanding
              ? 'bg-gradient-to-br from-[#FFC72C] via-[#F59E0B] to-[#EA580C] border-[#26160C] text-[#26160C]'
              : 'bg-gradient-to-br from-[#F59E0B] via-[#EA580C] to-[#C2410C] border-[#FBBF24]/60 text-white'
          }`}>
            🌶️
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`font-comic-title text-2xl sm:text-3xl tracking-wide transition-colors drop-shadow-xs ${
                isLanding ? 'text-[#26160C] group-hover:text-[#EA580C]' : 'text-[#FFC72C] group-hover:text-[#F59E0B]'
              }`}>
                URULAKKUPPERI
              </span>
              <span className={`text-xs sm:text-sm font-malayalam-title font-extrabold ${
                isLanding ? 'text-[#26160C]' : 'text-[#EA580C]'
              }`}>
                (ഉരുളക്കുപ്പേരി)
              </span>
            </div>
            <p className={`text-[11px] font-editorial-tagline tracking-wider hidden sm:block -mt-0.5 ${
              isLanding ? 'text-[#6B5544]' : 'text-[#FEEBC8]'
            }`}>
              “Where every opinion is wrong.”
            </p>
          </div>
        </div>

        {/* Right Nav Actions: Engine Status & Brain Config */}
        <div className="flex items-center gap-3 text-xs font-ui-body">
          {/* Argument Engine Online Pill */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-xs ${
            isLanding
              ? 'bg-[#EAF5EC] border-[#86EFAC] text-[#15803D]'
              : 'bg-[#2D0B12] border-2 border-[#15803D] text-[#4ADE80]'
          }`}>
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse shrink-0" />
            <span className="font-bold tracking-wide hidden sm:inline">Argument Engine Online</span>
            <span className="font-bold tracking-wide sm:hidden">Online</span>
            <span className={`hidden lg:inline text-[10px] pl-2 border-l ${
              isLanding ? 'text-[#166534] border-[#86EFAC]' : 'text-[#A7F3D0] border-[#15803D]'
            }`}>
              {healthStatus}
            </span>
          </div>

          {/* Brain Config button */}
          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95 font-bold ${
              isLanding
                ? 'bg-[#F3EADB] hover:bg-[#EADDC9] text-[#26160C] border border-[#D9C8B2]'
                : 'bg-[#340E16] hover:bg-[#48121E] text-[#FEEBC8] border border-[#D4AF37]/50'
            }`}
            title="Configure AI Brain Key"
          >
            <Key className="w-3.5 h-3.5 text-[#EA580C]" />
            <span className="hidden md:inline">Brain Config</span>
          </button>
        </div>
      </header>

      {/* Main Screen Body */}
      <main className="flex-1 flex flex-col justify-center py-4">
        {screen === 'landing' && (
          <LandingPage
            onStart={handleStart}
            onOpenHowUseless={() => setShowHowUseless(true)}
            onStartDemo={handleStartDemo}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        )}

        {screen === 'select' && (
          <CharacterSelect
            onSelectCharacter={handleSelectCharacter}
            onBack={() => setScreen('landing')}
          />
        )}

        {screen === 'conversation' && (
          <Conversation
            character={character}
            onEndConversation={handleEndConversation}
            isDemoMode={isDemoMode}
            onExitDemo={() => setIsDemoMode(false)}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onOpenKeyModal={() => setShowKeyModal(true)}
          />
        )}

        {screen === 'report' && stats && (
          <div className="px-4 py-8">
            <ArgumentReport
              stats={stats}
              character={character}
              onRestart={handleRestart}
              onOpenCertificate={() => setShowCertificate(true)}
            />
          </div>
        )}
      </main>

      {/* Footer: Kerala Satire Imprint */}
      <footer className={`w-full px-6 py-4 transition-colors duration-300 text-center text-xs font-ui-body ${
        isLanding
          ? 'border-t-2 border-[#E5D7C3] bg-[#FAF5EB] text-[#7C6856]'
          : 'border-t-2 border-[#4A0E19] bg-[#160406]/90 text-[#D4A373]'
      }`}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className={`flex items-center gap-2 font-bold ${isLanding ? 'text-[#26160C]' : 'text-[#FEEBC8]'}`}>
            <Coffee className="w-4 h-4 text-[#EA580C]" />
            <span>URULAKKUPPERI • Kerala&apos;s Premier AI Contrarian Debate Simulator</span>
          </p>
          <p className="text-[11px] opacity-80">
            “Where every opinion is wrong.” • Pure Satire
          </p>
        </div>
      </footer>

      {/* Modals */}
      {showHowUseless && <HowUselessModal onClose={() => setShowHowUseless(false)} />}
      {showCertificate && stats && (
        <CertificateModal
          stats={stats}
          character={character}
          onClose={() => setShowCertificate(false)}
        />
      )}

      {/* API Key Modal (Brain Config) */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 bg-[#120305]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#280A10] border-2 border-[#D4AF37] rounded-3xl p-6 max-w-md w-full spice-glow-gold flex flex-col gap-4 text-[#FFFDF7]">
            <div className="flex items-center justify-between border-b border-[#5C1523] pb-3">
              <div className="flex items-center gap-2 text-[#FBBF24] font-bold font-desi-display text-lg">
                <Key className="w-5 h-5 text-[#EA580C]" />
                <span>AI Brain Configuration</span>
              </div>
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="text-[#D4A373] hover:text-white font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#FEEBC8] leading-relaxed font-sans">
              To dynamically disagree with any topic in real-time, connect your API key. (Saved locally in <code className="bg-[#3A0F18] px-1.5 py-0.5 rounded border border-[#781E30] text-[#FBBF24]">.env</code>).
            </p>

            {keySavedMessage && (
              <div className="p-3 bg-[#052E16] border border-[#22C55E] rounded-xl text-xs text-[#4ADE80] flex items-center gap-2 font-medium">
                <CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>{keySavedMessage}</span>
              </div>
            )}

            <form onSubmit={handleSaveApiKey} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 text-xs">
                <label className="text-[#FEEBC8] font-mono font-semibold">Select Provider:</label>
                <select
                  value={keyProvider}
                  onChange={(e) => setKeyProvider(e.target.value as 'gemini' | 'groq' | 'openai')}
                  className="px-3 py-2 bg-[#1A0508] border border-[#5C1523] rounded-xl text-xs text-[#FFFDF7] focus:outline-hidden focus:border-[#F59E0B] font-mono cursor-pointer"
                >
                  <option value="gemini">Google Gemini (Default / Free from aistudio.google.com)</option>
                  <option value="groq">Groq LLaMA 3.3 (Fast free tier)</option>
                  <option value="openai">OpenAI (GPT-4o mini)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 text-xs">
                <label className="text-[#FEEBC8] font-mono font-semibold">API Key:</label>
                <input
                  type="password"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder={
                    keyProvider === 'gemini'
                      ? 'AIzaSy... (Gemini Key)'
                      : keyProvider === 'groq'
                      ? 'gsk_... (Groq Key)'
                      : 'sk-... (OpenAI Key)'
                  }
                  className="px-4 py-2.5 bg-[#1A0508] border border-[#5C1523] rounded-xl text-xs font-mono text-[#FFFDF7] placeholder-[#8C4A56] focus:outline-hidden focus:border-[#F59E0B]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#C2410C] hover:from-[#FBBF24] hover:to-[#EA580C] text-[#170407] font-black text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-[#EA580C]/30 tracking-wider font-mono"
                >
                  SAVE & ACTIVATE
                </button>
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="px-4 py-2.5 bg-[#3A0F18] hover:bg-[#4D1521] text-[#FEEBC8] text-xs font-mono font-bold rounded-xl cursor-pointer border border-[#5C1523]"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
