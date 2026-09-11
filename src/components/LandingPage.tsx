import React from 'react';
import { Play, BookOpen, Film, Volume2, VolumeX } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface LandingPageProps {
  onStart: () => void;
  onOpenHowUseless: () => void;
  onStartDemo: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  onOpenHowUseless,
  onStartDemo,
  isMuted,
  onToggleMute
}) => {
  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden select-none">
      {/* Sound Mute Toggle */}
      <div className="absolute top-4 right-4 z-30">
        <button
          type="button"
          onClick={onToggleMute}
          className="p-2.5 rounded-full bg-[#F3EADB] hover:bg-[#EADDC9] border border-[#D9C8B2] text-[#26160C] transition-colors cursor-pointer shadow-xs"
          title={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-[#DC2626]" /> : <Volume2 className="w-5 h-5 text-[#15803D]" />}
        </button>
      </div>

      {/* ─── DOODLE 1: Sarcastic tape note (top-left) ─── */}
      <div className="hidden lg:block absolute top-12 left-10 xl:left-20 -rotate-6 select-none pointer-events-none">
        <div className="relative px-4 py-2.5 bg-[#FFF9E6] border-2 border-[#E5D7C3] shadow-sm rounded-md font-sarcastic-hand text-sm text-[#26160C]">
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-8 h-3.5 bg-[#E8DCC6]/80 rotate-1 shadow-2xs border-t border-b border-[#D4C3A3]" />
          <p>Paranja mathi... vaadam thudangam! 🙂</p>
        </div>
      </div>

      {/* ─── DOODLE 2: WhatsApp snippet (top-right) ─── */}
      <div className="hidden lg:block absolute top-28 right-12 xl:right-24 rotate-3 select-none pointer-events-none">
        <div className="px-3.5 py-1.5 bg-[#DCFCE7] border-2 border-[#86EFAC] rounded-xl shadow-xs font-sarcastic-hand text-xs text-[#14532D]">
          <p>Njan paranjatha! <span className="text-[#2563EB] font-sans font-bold">✓✓</span></p>
        </div>
      </div>

      {/* ─── DOODLE 3: Steaming chai glass sketch (bottom-left periphery) ─── */}
      <div className="hidden lg:flex items-center gap-2 absolute bottom-8 left-12 text-[#7C6856] opacity-80 select-none pointer-events-none">
        <span className="text-xl">☕</span>
        <span className="font-sarcastic-hand text-xs text-[#5C4636]">choodu chaya &amp; debate</span>
      </div>

      {/* Main Clean Hero Content (70% Clean Space, Focused Hierarchy) */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center py-6">
        
        {/* ONE Small Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF5EC] border border-[#86EFAC] text-[#15803D] text-xs font-ui-body font-bold mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse shrink-0" />
          <span>Argument Engine Online</span>
        </div>

        {/* ─── 1. URULAKKUPPERI Logo (Clear visual focal point) ─── */}
        <div className="relative inline-block mb-1">
          {/* Subtle playful hand-drawn star accents near title */}
          <span className="absolute -top-4 -right-5 text-[#F59E0B] text-xl font-sarcastic-hand select-none pointer-events-none">
            ✦
          </span>
          <span className="absolute -bottom-2 -left-5 text-[#F59E0B] text-sm font-sarcastic-hand select-none pointer-events-none">
            ✦
          </span>

          <h1 className="comic-logo-hero text-7xl sm:text-8xl md:text-9xl uppercase font-black leading-none select-none transform -rotate-1">
            URULAKKUPPERI
          </h1>
        </div>

        {/* ─── 2. Malayalam Title: Noto Sans Malayalam (800 / ExtraBold, Dark Brown) ─── */}
        <div className="mt-1 text-center">
          <span className="font-malayalam-title text-2xl sm:text-3xl md:text-4xl text-[#26160C] font-extrabold tracking-wide">
            ഉരുളക്കുപ്പേരി
          </span>
        </div>

        {/* ─── 3. Main Tagline: Bree Serif Bold Editorial Character with Hand-drawn Underline ─── */}
        <h2 className="font-editorial-tagline text-2xl sm:text-3xl md:text-4xl text-[#26160C] font-bold mt-5 tracking-wide">
          &ldquo;Where{' '}
          <span className="relative inline-block">
            every opinion
            {/* DOODLE 4: Hand-drawn red brush underline */}
            <svg
              className="absolute left-0 -bottom-1.5 w-full h-2.5 text-[#DC2626] overflow-visible pointer-events-none"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path d="M 2 6 Q 48 1 98 5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </span>{' '}
          is wrong.&rdquo;
        </h2>

        {/* ─── 4. Secondary Punchline ─── */}
        <p className="font-ui-body font-bold text-base sm:text-lg text-[#5C4636] mt-2 tracking-tight">
          Say it. We&apos;ll argue.
        </p>

        {/* ─── 5. Action Buttons (Clean & Prominent) ─── */}
        <div className="relative flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
          
          {/* Primary CTA */}
          <div className="relative w-full sm:w-auto flex items-center justify-center">
            {/* Playful comic motion sparks */}
            <span className="hidden sm:inline-block absolute -left-5 text-sm font-comic-title text-[#26160C] select-none pointer-events-none">
              ˏˋ
            </span>

            <button
              type="button"
              onClick={() => {
                soundEffects.playGong();
                onStart();
              }}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-[#FFC72C] via-[#F59E0B] to-[#EA580C] hover:from-[#FFD54F] hover:to-[#F97316] text-[#26160C] font-comic-title text-xl tracking-wider flex items-center justify-center gap-3 border-3 border-[#26160C] comic-btn-primary font-black"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>START AN ARGUMENT</span>
            </button>

            <span className="hidden sm:inline-block absolute -right-5 text-sm font-comic-title text-[#26160C] select-none pointer-events-none">
              ˎˊ
            </span>

            {/* DOODLE 5: Cute scribbled arrow pointing at primary button */}
            <div className="hidden md:flex items-center gap-1 absolute -right-32 top-3 text-[#EA580C] font-sarcastic-hand text-sm select-none pointer-events-none rotate-6">
              <svg className="w-5 h-5 -scale-x-100 rotate-12 text-[#EA580C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h14M12 5l7 7-7 7" />
              </svg>
              <span>Go on, test us</span>
            </div>
          </div>

          {/* Secondary CTA: HOW THIS WORKS */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              onOpenHowUseless();
            }}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#FAF4EA] hover:bg-[#F3EADB] text-[#26160C] font-ui-body font-bold text-sm tracking-wide flex items-center justify-center gap-2 border-2 border-[#26160C] comic-btn-secondary"
          >
            <BookOpen className="w-4 h-4 text-[#26160C]" />
            <span>HOW THIS WORKS</span>
          </button>
        </div>

        {/* Minimal Demo Mode Link */}
        <div className="mt-8 pt-4 border-t border-[#E5D7C3]/60 flex items-center justify-center">
          <button
            type="button"
            onClick={() => {
              soundEffects.playBusHorn();
              onStartDemo();
            }}
            className="inline-flex items-center gap-2 text-xs font-ui-body font-medium text-[#7C6856] hover:text-[#26160C] transition-colors cursor-pointer py-1"
          >
            <Film className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>🎬 60s Judge Presentation Demo Mode</span>
          </button>
        </div>

      </div>
    </div>
  );
};
