import { useState, useEffect } from 'react';
import type { Character, EmotionalState } from '../types';

interface AvatarDisplayProps {
  character: Character;
  emotionalState: EmotionalState;
  stubbornness: number;
  isSpeaking: boolean;
  isThinking: boolean;
  instability: boolean;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  character,
  emotionalState,
  stubbornness,
  isSpeaking,
  isThinking,
  instability
}) => {
  const [blink, setBlink] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);

  // Natural blinking interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, 3200 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Mouth flapping animation when speaking
  useEffect(() => {
    if (!isSpeaking) {
      setMouthOpen(false);
      return;
    }
    const mouthInterval = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, 140);

    return () => clearInterval(mouthInterval);
  }, [isSpeaking]);

  const isUnhinged = stubbornness >= 85 || emotionalState === 'UNHINGED' || emotionalState === 'EXISTENTIAL_CRISIS';
  const isAnnoyed = stubbornness >= 65 || emotionalState === 'ANNOYED' || emotionalState === 'OFFENDED';
  const isExistential = stubbornness >= 95 || emotionalState === 'EXISTENTIAL_CRISIS';

  return (
    <div className="relative flex flex-col items-center justify-center p-4 select-none">
      {/* Background Aura / Glow */}
      <div
        className={`absolute -inset-4 rounded-full blur-3xl opacity-30 transition-all duration-700 pointer-events-none ${
          isExistential
            ? 'bg-purple-600 animate-pulse scale-125'
            : isUnhinged
            ? 'bg-red-600 animate-ping scale-110'
            : isAnnoyed
            ? 'bg-amber-600'
            : 'bg-emerald-500'
        }`}
      />

      {/* Steam clouds when annoyed */}
      {isAnnoyed && (
        <div className="absolute -top-6 flex justify-between w-32 pointer-events-none z-20">
          <span className="text-2xl animate-bounce">💨</span>
          <span className="text-2xl animate-bounce delay-150">😤</span>
          <span className="text-2xl animate-bounce delay-300">💨</span>
        </div>
      )}

      {/* Instability Warning Alert Badge */}
      {instability && (
        <div className="absolute -top-10 z-30 px-3.5 py-1.5 bg-[#DC2626] text-white font-mono font-black text-xs uppercase tracking-widest rounded-full border-2 border-[#FCA5A5] shadow-xl animate-pulse flex items-center gap-2">
          <span>⚠️</span>
          <span>LOGIC INSTABILITY: CONTRADICTION DETECTED</span>
        </div>
      )}

      {/* Main Avatar Frame */}
      <div
        className={`relative w-48 h-48 md:w-56 md:h-56 rounded-full border-4 shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-300 bg-gradient-to-b from-[#380F17] via-[#260A10] to-[#180407] ${
          isExistential
            ? 'border-[#A855F7] shadow-purple-600/50 animate-bounce'
            : isUnhinged
            ? 'border-[#EF4444] shadow-red-600/60 animate-pulse scale-105 ring-4 ring-red-500/30'
            : isAnnoyed
            ? 'border-[#EA580C] shadow-orange-600/50'
            : 'border-[#FBBF24] shadow-amber-500/30'
        }`}
      >
        {/* CRT Scanline Overlay during high stubbornness */}
        {stubbornness > 80 && (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-60" />
        )}

        {/* Character-specific SVG Illustration */}
        <div className={`relative w-full h-full flex items-center justify-center transition-transform duration-200 ${
          isSpeaking ? 'scale-105' : ''
        } ${isUnhinged ? 'rotate-1' : ''}`}>
          
          {character.id === 'ammachi' && (
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              {/* Hair Bun & Traditional Hair */}
              <circle cx="100" cy="55" r="32" fill="#E2E8F0" />
              <circle cx="100" cy="40" r="20" fill="#CBD5E1" />
              {/* Face */}
              <circle cx="100" cy="100" r="54" fill="#E5B288" />
              {/* Traditional Forehead Chandana Kuri (Sandalwood / Bindi) */}
              <ellipse cx="100" cy="74" rx="7" ry="3" fill="#FCD34D" />
              <circle cx="100" cy="74" r="2" fill="#DC2626" />
              {/* Saree Pallu border draped */}
              <path d="M 50 145 Q 100 120 150 145 L 170 200 L 30 200 Z" fill="#F8FAFC" />
              <path d="M 50 145 Q 100 120 150 145" stroke="#D97706" strokeWidth="6" fill="none" />
              {/* Spectacles */}
              <circle cx="82" cy="95" r="14" fill="none" stroke="#78350F" strokeWidth="3" />
              <circle cx="118" cy="95" r="14" fill="none" stroke="#78350F" strokeWidth="3" />
              <line x1="96" y1="95" x2="104" y2="95" stroke="#78350F" strokeWidth="3" />
              {/* Eyes */}
              {!blink ? (
                <>
                  <circle cx="82" cy="95" r="4" fill={isUnhinged ? '#DC2626' : '#1E293B'} />
                  <circle cx="118" cy="95" r="4" fill={isUnhinged ? '#DC2626' : '#1E293B'} />
                  {isUnhinged && (
                    <>
                      <line x1="82" y1="95" x2="60" y2="95" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,2" />
                      <line x1="118" y1="95" x2="140" y2="95" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,2" />
                    </>
                  )}
                </>
              ) : (
                <>
                  <line x1="74" y1="95" x2="90" y2="95" stroke="#1E293B" strokeWidth="3" />
                  <line x1="110" y1="95" x2="126" y2="95" stroke="#1E293B" strokeWidth="3" />
                </>
              )}
              {/* Eyebrows */}
              <path d={isAnnoyed ? "M 70 82 L 92 87" : "M 70 84 Q 82 78 92 84"} stroke="#64748B" strokeWidth="3" fill="none" />
              <path d={isAnnoyed ? "M 130 82 L 108 87" : "M 108 84 Q 118 78 130 84"} stroke="#64748B" strokeWidth="3" fill="none" />
              {/* Mouth */}
              {mouthOpen ? (
                <ellipse cx="100" cy="126" rx="9" ry="8" fill="#7F1D1D" stroke="#991B1B" strokeWidth="2" />
              ) : isAnnoyed ? (
                <path d="M 88 128 Q 100 120 112 128" stroke="#991B1B" strokeWidth="3" fill="none" />
              ) : (
                <path d="M 90 124 Q 100 130 110 124" stroke="#991B1B" strokeWidth="3" fill="none" />
              )}
            </svg>
          )}

          {character.id === 'uncle' && (
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              {/* Hair */}
              <path d="M 45 90 Q 50 35 100 35 Q 150 35 155 90 Z" fill="#1E293B" />
              {/* Face */}
              <circle cx="100" cy="100" r="54" fill="#D49B6A" />
              {/* Collar Shirt */}
              <path d="M 45 150 L 100 135 L 155 150 L 165 200 L 35 200 Z" fill="#1D4ED8" />
              <polygon points="100,135 85,160 100,195 115,160" fill="#FFFFFF" />
              {/* Spectacles */}
              <rect x="68" y="82" width="26" height="20" rx="3" fill="none" stroke="#F59E0B" strokeWidth="3" />
              <rect x="106" y="82" width="26" height="20" rx="3" fill="none" stroke="#F59E0B" strokeWidth="3" />
              <line x1="94" y1="92" x2="106" y2="92" stroke="#F59E0B" strokeWidth="3" />
              {/* Eyes */}
              {!blink ? (
                <>
                  <circle cx="81" cy="92" r="4" fill={isUnhinged ? '#25D366' : '#0F172A'} />
                  <circle cx="119" cy="92" r="4" fill={isUnhinged ? '#25D366' : '#0F172A'} />
                </>
              ) : (
                <>
                  <line x1="73" y1="92" x2="89" y2="92" stroke="#0F172A" strokeWidth="3" />
                  <line x1="111" y1="92" x2="127" y2="92" stroke="#0F172A" strokeWidth="3" />
                </>
              )}
              {/* Iconic Malayalam Uncle Mustache */}
              <path d="M 72 118 Q 100 114 100 122 Q 100 114 128 118 Q 100 134 72 118 Z" fill="#0F172A" />
              {/* Mouth */}
              {mouthOpen ? (
                <ellipse cx="100" cy="132" rx="8" ry="6" fill="#881337" />
              ) : (
                <line x1="92" y1="130" x2="108" y2="130" stroke="#881337" strokeWidth="3" />
              )}
              {/* WhatsApp Smartphone in corner */}
              <g transform="translate(140, 120) scale(0.65)">
                <rect x="0" y="0" width="36" height="60" rx="6" fill="#020617" stroke="#25D366" strokeWidth="2" />
                <circle cx="18" cy="30" r="11" fill="#25D366" />
                <text x="13" y="34" fontSize="12" fill="#FFFFFF" fontWeight="bold">W</text>
              </g>
            </svg>
          )}

          {character.id === 'aunty' && (
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              {/* Hair bun with jasmine flowers */}
              <circle cx="130" cy="65" r="25" fill="#0F172A" />
              <circle cx="138" cy="60" r="7" fill="#FEF08A" />
              <circle cx="144" cy="68" r="6" fill="#FEF08A" />
              {/* Face */}
              <circle cx="100" cy="100" r="52" fill="#E29D72" />
              {/* Sindoor / Bindi */}
              <circle cx="100" cy="74" r="4" fill="#BE123C" />
              {/* Big Gold Jhumka Earrings */}
              <circle cx="48" cy="108" r="5" fill="#EAB308" />
              <polygon points="43,113 53,113 48,124" fill="#EAB308" />
              <circle cx="152" cy="108" r="5" fill="#EAB308" />
              <polygon points="147,113 157,113 152,124" fill="#EAB308" />
              {/* Eyes with intense side-eye gaze */}
              {!blink ? (
                <>
                  <ellipse cx="78" cy="94" rx="9" ry="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                  <circle cx="74" cy="94" r="4" fill="#831843" />
                  <ellipse cx="122" cy="94" rx="9" ry="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                  <circle cx="118" cy="94" r="4" fill="#831843" />
                </>
              ) : (
                <>
                  <path d="M 70 94 Q 78 98 86 94" stroke="#0F172A" strokeWidth="3" fill="none" />
                  <path d="M 114 94 Q 122 98 130 94" stroke="#0F172A" strokeWidth="3" fill="none" />
                </>
              )}
              {/* Arched Judgemental Eyebrows */}
              <path d="M 68 84 Q 78 74 88 84" stroke="#0F172A" strokeWidth="3.5" fill="none" />
              <path d="M 112 84 Q 122 72 132 82" stroke="#0F172A" strokeWidth="3.5" fill="none" />
              {/* Smirking mouth */}
              {mouthOpen ? (
                <ellipse cx="100" cy="126" rx="8" ry="7" fill="#9F1239" />
              ) : (
                <path d="M 88 126 Q 102 122 114 128" stroke="#BE123C" strokeWidth="3" fill="none" />
              )}
              {/* Traditional Sari Neck */}
              <path d="M 48 145 Q 100 170 152 145 L 165 200 L 35 200 Z" fill="#BE185D" />
            </svg>
          )}

          {character.id === 'techbro' && (
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              {/* Startup Hoodie */}
              <path d="M 35 145 Q 100 120 165 145 L 175 200 L 25 200 Z" fill="#0F172A" />
              <path d="M 80 145 L 100 180 L 120 145" fill="none" stroke="#38BDF8" strokeWidth="3" />
              {/* Face */}
              <circle cx="100" cy="95" r="50" fill="#DDA15E" />
              {/* Trendy Fade Haircut */}
              <path d="M 50 80 Q 55 35 100 35 Q 145 35 150 80 L 150 65 Q 100 45 50 65 Z" fill="#1E293B" />
              {/* Wireless AirPods in Ear */}
              <rect x="44" y="92" width="5" height="15" rx="2" fill="#FFFFFF" />
              <rect x="151" y="92" width="5" height="15" rx="2" fill="#FFFFFF" />
              {/* Modern Round Designer Glasses */}
              <circle cx="80" cy="92" r="14" fill="none" stroke="#0284C7" strokeWidth="2.5" />
              <circle cx="120" cy="92" r="14" fill="none" stroke="#0284C7" strokeWidth="2.5" />
              <line x1="94" y1="92" x2="106" y2="92" stroke="#0284C7" strokeWidth="2" />
              {/* Eyes */}
              {!blink ? (
                <>
                  <circle cx="80" cy="92" r="3.5" fill={isUnhinged ? '#38BDF8' : '#0F172A'} />
                  <circle cx="120" cy="92" r="3.5" fill={isUnhinged ? '#38BDF8' : '#0F172A'} />
                </>
              ) : (
                <>
                  <line x1="72" y1="92" x2="88" y2="92" stroke="#0F172A" strokeWidth="2" />
                  <line x1="112" y1="92" x2="128" y2="92" stroke="#0F172A" strokeWidth="2" />
                </>
              )}
              {/* Light Stubble Beard */}
              <path d="M 68 115 Q 100 145 132 115" stroke="#64748B" strokeWidth="2" strokeDasharray="2,3" fill="none" />
              {/* Fast talking mouth */}
              {mouthOpen ? (
                <ellipse cx="100" cy="125" rx="10" ry="7" fill="#1E293B" stroke="#0284C7" strokeWidth="1" />
              ) : (
                <line x1="90" y1="125" x2="110" y2="125" stroke="#1E293B" strokeWidth="3" />
              )}
              {/* Floating Tech Jargon Hologram */}
              <g transform="translate(130, 45)">
                <rect x="0" y="0" width="60" height="20" rx="4" fill="#0284C7" opacity="0.8" />
                <text x="6" y="14" fontSize="9" fill="#FFFFFF" fontFamily="monospace">O(n²) ❌</text>
              </g>
            </svg>
          )}

          {character.id === 'malayali' && (
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              {/* Wavy unruly hair */}
              <path d="M 45 85 Q 50 30 100 30 Q 150 30 155 85 Q 140 45 100 50 Q 60 45 45 85 Z" fill="#0F172A" />
              {/* Face */}
              <circle cx="100" cy="100" r="52" fill="#C58A55" />
              {/* Veshti / Lungi Shoulder Shawl (Thorthu) */}
              <path d="M 40 150 L 160 150 L 170 200 L 30 200 Z" fill="#E2E8F0" />
              <path d="M 120 140 Q 140 170 150 200" stroke="#DC2626" strokeWidth="6" fill="none" />
              {/* Eyes with wide theatrical disbelief */}
              {!blink ? (
                <>
                  <circle cx="78" cy="90" r="7" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                  <circle cx="78" cy="90" r="4" fill={isUnhinged ? '#EF4444' : '#0F172A'} />
                  <circle cx="122" cy="90" r="7" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                  <circle cx="122" cy="90" r="4" fill={isUnhinged ? '#EF4444' : '#0F172A'} />
                </>
              ) : (
                <>
                  <line x1="71" y1="90" x2="85" y2="90" stroke="#0F172A" strokeWidth="3" />
                  <line x1="115" y1="90" x2="129" y2="90" stroke="#0F172A" strokeWidth="3" />
                </>
              )}
              {/* Eyebrows raised in total drama */}
              <path d="M 70 78 Q 78 70 88 76" stroke="#0F172A" strokeWidth="3.5" fill="none" />
              <path d="M 112 76 Q 122 70 130 78" stroke="#0F172A" strokeWidth="3.5" fill="none" />
              {/* Mustache */}
              <path d="M 75 116 Q 100 110 125 116 Q 100 128 75 116 Z" fill="#0F172A" />
              {/* Wide open shouting mouth */}
              {mouthOpen ? (
                <ellipse cx="100" cy="132" rx="12" ry="10" fill="#7F1D1D" stroke="#991B1B" strokeWidth="2" />
              ) : (
                <path d="M 88 130 Q 100 138 112 130" stroke="#991B1B" strokeWidth="3" fill="none" />
              )}
            </svg>
          )}

          {character.id === 'finalboss' && (
            <svg viewBox="0 0 200 200" className="w-40 h-40">
              {/* Cyber skull outline */}
              <path d="M 60 60 Q 100 20 140 60 Q 165 90 155 130 Q 140 170 125 160 L 125 180 L 75 180 L 75 160 Q 60 170 45 130 Q 35 90 60 60 Z" fill="#09090B" stroke="#A855F7" strokeWidth="4" />
              {/* Glowing Horns */}
              <path d="M 60 60 Q 40 30 30 15 Q 50 30 65 50" fill="#9333EA" stroke="#C084FC" strokeWidth="2" />
              <path d="M 140 60 Q 160 30 170 15 Q 150 30 135 50" fill="#9333EA" stroke="#C084FC" strokeWidth="2" />
              {/* Cyber Grid Lines */}
              <line x1="60" y1="95" x2="140" y2="95" stroke="#9333EA" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="100" y1="50" x2="100" y2="150" stroke="#9333EA" strokeWidth="1" strokeDasharray="4,4" />
              {/* Laser Eye Sockets */}
              <polygon points="70,85 92,90 85,108 65,100" fill="#3B0764" stroke="#C084FC" strokeWidth="2" />
              <polygon points="130,85 108,90 115,108 135,100" fill="#3B0764" stroke="#C084FC" strokeWidth="2" />
              {/* Intense Glowing Laser Pupils */}
              {!blink && (
                <>
                  <circle cx="78" cy="96" r="4" fill="#F43F5E" className="animate-ping" />
                  <circle cx="78" cy="96" r="3" fill="#FFFFFF" />
                  <circle cx="122" cy="96" r="4" fill="#F43F5E" className="animate-ping" />
                  <circle cx="122" cy="96" r="3" fill="#FFFFFF" />
                  {/* Laser Beams shooting out */}
                  <line x1="78" y1="96" x2="40" y2="96" stroke="#F43F5E" strokeWidth="3" />
                  <line x1="122" y1="96" x2="160" y2="96" stroke="#F43F5E" strokeWidth="3" />
                </>
              )}
              {/* Skull Teeth Grid */}
              <rect x="80" y="152" width="8" height="16" fill="#A855F7" />
              <rect x="92" y="152" width="8" height="16" fill="#A855F7" />
              <rect x="104" y="152" width="8" height="16" fill="#A855F7" />
              <rect x="116" y="152" width="8" height="16" fill="#A855F7" />
              {/* Digital glitch bar */}
              <rect x="45" y="115" width="110" height="4" fill="#E11D48" opacity="0.7" />
            </svg>
          )}

        </div>

        {/* Thinking Pulse Indicator */}
        {isThinking && (
          <div className="absolute inset-0 bg-[#170407]/80 backdrop-blur-xs flex items-center justify-center z-20">
            <div className="flex gap-2 items-center">
              <span className="w-3.5 h-3.5 bg-[#F59E0B] rounded-full animate-bounce delay-0 shadow-md" />
              <span className="w-3.5 h-3.5 bg-[#EA580C] rounded-full animate-bounce delay-150 shadow-md" />
              <span className="w-3.5 h-3.5 bg-[#22C55E] rounded-full animate-bounce delay-300 shadow-md" />
            </div>
          </div>
        )}
      </div>

      {/* Character Name & Tagline */}
      <div className="text-center mt-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-2.5xl">{character.avatar}</span>
          <h2 className="font-desi-display text-2xl sm:text-3xl font-black text-[#FBBF24] tracking-wide drop-shadow-xs">
            {character.name}
          </h2>
        </div>
        <p className="text-xs font-serif font-bold text-[#EA580C] tracking-wider mt-0.5">
          {character.title}
        </p>
      </div>

      {/* Stubbornness Progress Bar under Avatar */}
      <div className="w-full max-w-xs mt-3.5 px-2">
        <div className="flex justify-between items-center text-xs font-mono mb-1.5 font-bold">
          <span className="text-[#FEEBC8]">STUBBORNNESS:</span>
          <span className={`${
            stubbornness >= 85 ? 'text-[#EF4444] animate-pulse' : stubbornness >= 60 ? 'text-[#F59E0B]' : 'text-[#4ADE80]'
          }`}>
            {stubbornness}% [{emotionalState}]
          </span>
        </div>
        <div className="h-3 w-full bg-[#180407] rounded-full overflow-hidden p-0.5 border border-[#5C1523] shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-500 shadow-xs ${
              stubbornness >= 85
                ? 'bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#EF4444]'
                : stubbornness >= 60
                ? 'bg-gradient-to-r from-[#22C55E] via-[#F59E0B] to-[#EA580C]'
                : 'bg-gradient-to-r from-[#4ADE80] to-[#22C55E]'
            }`}
            style={{ width: `${Math.min(100, stubbornness)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
