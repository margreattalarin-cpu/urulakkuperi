import React, { useState, useEffect } from 'react';
import type { ArgumentStats, Character } from '../types';
import confetti from 'canvas-confetti';
import { Download, Share2, X, Check } from 'lucide-react';

interface CertificateModalProps {
  stats: ArgumentStats;
  character: Character;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  stats,
  character,
  onClose
}) => {
  const [userName, setUserName] = useState('An Honourable Malayali');
  const [copied, setCopied] = useState(false);

  // Trigger celebration confetti
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F59E0B', '#EA580C', '#22C55E']
      });
    } catch {
      // Ignore
    }
  }, []);

  const durationSeconds = Math.max(12, Math.round((Date.now() - stats.startTime) / 1000));
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds}s`;

  // Draw certificate on Canvas for download in vintage Kerala stamp paper style
  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background: Warm Kerala Parchment
    ctx.fillStyle = '#FFFDF7';
    ctx.fillRect(0, 0, 1200, 800);

    // Subtle paper grain inner fill
    ctx.fillStyle = '#FAF4EA';
    ctx.fillRect(40, 40, 1120, 720);

    // Decorative Kasavu Gold Outer Border
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, 1140, 740);

    // Inner Terracotta Border
    ctx.strokeStyle = '#C2410C';
    ctx.lineWidth = 3;
    ctx.strokeRect(48, 48, 1104, 704);

    // Corner Accents
    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(44, 44, 12, 12);
    ctx.fillRect(1144, 44, 12, 12);
    ctx.fillRect(44, 744, 12, 12);
    ctx.fillRect(1144, 744, 12, 12);

    // Header Stamp
    ctx.fillStyle = '#C2410C';
    ctx.font = 'bold 20px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('★ OFFICIAL KERALA CONTRARIAN DISPUTE CERTIFICATION (URULAKKUPPERI) ★', 600, 110);

    // Main Title
    ctx.fillStyle = '#260A10';
    ctx.font = '900 48px Georgia, serif';
    ctx.fillText('CERTIFIED ARGUMENT SURVIVOR', 600, 175);

    ctx.fillStyle = '#6B5544';
    ctx.font = '20px sans-serif';
    ctx.fillText('This is officially awarded to certify that', 600, 235);

    // User Name in Large Serif
    ctx.fillStyle = '#B45309';
    ctx.font = 'bold 46px Georgia, serif';
    ctx.fillText(userName, 600, 295);

    ctx.fillStyle = '#6B5544';
    ctx.font = '22px sans-serif';
    ctx.fillText(`survived a completely futile, unsolicited verandah debate against:`, 600, 355);

    // Character Name
    ctx.fillStyle = '#260A10';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.fillText(`${character.name} ${character.avatar}`, 600, 410);

    // Argument Topic Box
    ctx.fillStyle = '#FFFDF7';
    ctx.fillRect(250, 450, 700, 60);
    ctx.strokeStyle = '#D9C8B2';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(250, 450, 700, 60);

    ctx.fillStyle = '#C2410C';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(`Topic: "${stats.topic || 'Why everything you believe is invalid'}"`, 600, 488);

    // Stats Line
    ctx.fillStyle = '#422C1D';
    ctx.font = '19px monospace';
    ctx.fillText(`Duration: ${timeFormatted}   |   Arguments: ${stats.userArguments}   |   Stubbornness: ${stats.aiStubbornness}%`, 600, 560);
    ctx.fillText(`Goalposts Moved: ${stats.timesGoalpostsMoved}   |   WhatsApp Forwards Cited: ${stats.whatsappForwardsCited}`, 600, 600);

    // Final Result
    ctx.fillStyle = '#15803D';
    ctx.font = 'bold 28px Georgia, serif';
    ctx.fillText('FINAL JURY RESULT: YOU WON (AI Still Refuses To Agree)', 600, 660);

    // Footer Disclaimer
    ctx.fillStyle = '#8C7462';
    ctx.font = 'italic 16px Georgia, serif';
    ctx.fillText('“This certificate has absolutely no legal, financial, scientific, or familial value.”', 600, 720);

    // Download image
    const link = document.createElement('a');
    link.download = `Urulakkupperi-Survivor-${userName.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleShare = () => {
    const text = `🏆 I survived a chaotic argument with ${character.name} in URULAKKUPPERI — Where Every Opinion Is Wrong!\nStubbornness reached ${stats.aiStubbornness}%, but I walked away alive. 😭\nTry arguing: ${window.location.origin}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#120305]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto select-none">
      <div className="relative w-full max-w-2xl bg-[#280A10] border-2 border-[#D4AF37] rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-6 text-[#FFFDF7] my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#1A0508] hover:bg-[#380E16] flex items-center justify-center text-[#FEEBC8] hover:text-white transition-colors cursor-pointer border border-[#5C1523]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Preview Card */}
        <div className="border-4 border-[#D4AF37] rounded-2xl p-6 md:p-8 bg-gradient-to-b from-[#FFFDF7] via-[#FAF4EA] to-[#F3E8D3] text-center relative shadow-lg text-[#260A10]">
          <div className="text-[11px] font-mono font-black uppercase tracking-widest text-[#EA580C] mb-2">
            ★ OFFICIAL KERALA CONTRARIAN CERTIFICATION • URULAKKUPPERI ★
          </div>

          <h2 className="font-desi-display text-2xl md:text-3xl font-black tracking-tight text-[#260A10] uppercase">
            CERTIFIED ARGUMENT SURVIVOR
          </h2>

          <p className="text-xs text-[#6B5544] mt-2 font-serif font-semibold">This is officially awarded to</p>

          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="text-xl md:text-2xl font-serif font-bold text-[#B45309] bg-transparent border-b-2 border-dashed border-[#EA580C] text-center px-2 py-1 my-2 focus:outline-hidden w-full max-w-md mx-auto"
            title="Click to customize your name"
          />

          <p className="text-xs text-[#6B5544] mt-1 font-serif font-semibold">
            for enduring a completely futile, unsolicited debate against:
          </p>

          <p className="font-desi-display text-xl font-bold text-[#260A10] mt-1.5">
            {character.name} {character.avatar}
          </p>

          <div className="my-3 px-4 py-2 bg-[#FFFDF7] rounded-xl border border-[#D9C8B2] text-xs text-[#C2410C] font-mono font-bold shadow-xs">
            Topic: &ldquo;{stats.topic || 'Why everything you believe is fundamentally flawed'}&rdquo;
          </div>

          <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-[#422C1D] border-t border-b border-[#E0D4BE] py-2.5 my-3">
            <div>
              <span className="text-[#8C7462] block font-bold text-[10px]">TIME:</span>
              <span className="font-bold">{timeFormatted}</span>
            </div>
            <div>
              <span className="text-[#8C7462] block font-bold text-[10px]">ARGUMENTS:</span>
              <span className="font-bold">{stats.userArguments}</span>
            </div>
            <div>
              <span className="text-[#8C7462] block font-bold text-[10px]">STUBBORNNESS:</span>
              <span className="font-bold text-[#DC2626]">{stats.aiStubbornness}%</span>
            </div>
          </div>

          <p className="text-xs font-serif font-bold text-[#15803D]">
            FINAL RESULT: YOU WON (AI Strictly Disagrees)
          </p>

          <p className="text-[10px] text-[#8C7462] italic mt-3 font-serif">
            &ldquo;This certificate has absolutely no legal, financial, or academic value.&rdquo;
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="flex-1 py-4 px-5 rounded-2xl bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#C2410C] hover:from-[#FBBF24] hover:to-[#EA580C] text-[#170407] font-desi-display text-sm tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#EA580C]/30 transition-all cursor-pointer active:scale-95 border-2 border-[#FBBF24] font-black"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD PNG CERTIFICATE</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="py-4 px-5 rounded-2xl bg-[#180407] hover:bg-[#340E16] text-[#FFFDF7] font-bold text-sm flex items-center justify-center gap-2 border-2 border-[#5C1523] transition-all cursor-pointer active:scale-95 shadow-md"
          >
            {copied ? <Check className="w-4 h-4 text-[#4ADE80]" /> : <Share2 className="w-4 h-4 text-[#EA580C]" />}
            <span>{copied ? 'COPIED BRAG TEXT!' : 'COPY TO SHARE'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
