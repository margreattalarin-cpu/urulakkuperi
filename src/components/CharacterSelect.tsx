import React from 'react';
import type { Character } from '../types';
import { CHARACTERS } from '../data/characters';
import { Swords, Skull, ArrowLeft, MessageCircle } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface CharacterSelectProps {
  onSelectCharacter: (character: Character) => void;
  onBack: () => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({
  onSelectCharacter,
  onBack
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6 animate-in fade-in duration-300 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b-2 border-[#4A0E19] pb-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#280A10] hover:bg-[#380E16] text-[#FEEBC8] text-xs font-mono font-bold transition-all border-2 border-[#D4AF37]/50 cursor-pointer shadow-md hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4 text-[#F59E0B]" />
          <span>BACK</span>
        </button>

        <div className="text-center">
          <h1 className="font-desi-display text-3xl sm:text-4xl md:text-5xl font-black text-[#FBBF24] tracking-tight drop-shadow-md">
            CHOOSE YOUR OPPONENT
          </h1>
          <p className="text-xs sm:text-sm text-[#FEEBC8] font-serif font-bold mt-1">
            Pick which opinionated relative you would like to have a futile verandah argument with.
          </p>
        </div>

        <div className="w-16" />
      </div>

      {/* Grid of Characters Styled as Vibrant Family Album Roster */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHARACTERS.map((char) => {
          const isBoss = char.isBoss;

          return (
            <div
              key={char.id}
              className={`relative rounded-3xl p-6 border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-xl hover:-translate-y-1 ${
                isBoss
                  ? 'bg-[#2A050B] border-[#DC2626] hover:border-[#EF4444] shadow-red-950/50 hover:shadow-red-700/30'
                  : 'bg-[#280A10] border-[#5C1523] hover:border-[#F59E0B] shadow-black/60 hover:shadow-amber-900/30'
              }`}
              onClick={() => {
                soundEffects.playClick();
                if (isBoss) soundEffects.playGlitch();
                else soundEffects.playWhatsApp();
                onSelectCharacter(char);
              }}
            >
              {/* Top Accent Strip */}
              <div
                className="absolute top-0 left-0 right-0 h-2"
                style={{
                  backgroundColor: isBoss ? '#DC2626' : char.color || '#F59E0B'
                }}
              />

              {/* Boss Warning Stamp Badge */}
              {isBoss && (
                <div className="absolute top-2 right-0 bg-[#DC2626] text-white text-[10px] font-mono font-black px-3.5 py-1 rounded-bl-xl uppercase tracking-widest flex items-center gap-1 shadow-md">
                  <Skull className="w-3.5 h-3.5" />
                  <span>FINAL BOSS</span>
                </div>
              )}

              <div>
                {/* Avatar Portrait & Title */}
                <div className="flex items-center gap-4 mb-4 mt-1">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-md border-2 shrink-0 ${
                    isBoss
                      ? 'border-[#DC2626] bg-[#3B0711]'
                      : 'border-[#F59E0B] bg-[#380E16]'
                  }`}>
                    {char.avatar}
                  </div>
                  <div>
                    <h2 className="font-desi-display text-2xl font-bold text-[#FFFDF7] tracking-wide">
                      {char.name}
                    </h2>
                    <p className="text-xs font-serif font-bold text-[#F59E0B]">
                      {char.title}
                    </p>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-xs text-[#FEEBC8] italic mb-4 border-l-2 border-[#EA580C] pl-2.5 font-sans leading-relaxed">
                  &ldquo;{char.tagline}&rdquo;
                </p>

                {/* Signature Retort Preview */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono text-[#D4A373] font-bold">
                    <MessageCircle className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>SIGNATURE WHATSAPP RETORT:</span>
                  </div>
                  <p className="text-xs text-[#FEEBC8] bg-[#1A0508] p-3.5 rounded-2xl border border-[#5C1523] font-sans leading-relaxed italic shadow-inner">
                    &ldquo;{char.sampleCounter}&rdquo;
                  </p>
                </div>
              </div>

              {/* Bottom Meta & Select Action */}
              <div className="pt-4 border-t border-[#4A0E19] flex items-center justify-between mt-auto">
                <div className="text-[11px] font-mono">
                  <span className="text-[#D4A373] block font-semibold text-[10px]">DIFFICULTY:</span>
                  <span className={`font-bold ${isBoss ? 'text-[#EF4444]' : 'text-[#4ADE80]'}`}>
                    {char.difficulty}
                  </span>
                </div>

                <button
                  type="button"
                  className={`px-5 py-2.5 rounded-xl text-xs font-mono font-black tracking-wider flex items-center gap-1.5 transition-all shadow-lg active:scale-95 ${
                    isBoss
                      ? 'bg-[#DC2626] hover:bg-[#EF4444] text-white shadow-red-600/30'
                      : 'bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#C2410C] hover:from-[#FBBF24] hover:to-[#EA580C] text-[#170407] shadow-amber-600/30 font-black'
                  }`}
                >
                  <Swords className="w-4 h-4" />
                  <span>ARGUE</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
