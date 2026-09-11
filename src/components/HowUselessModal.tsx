import React from 'react';
import { X, Laugh } from 'lucide-react';

interface HowUselessModalProps {
  onClose: () => void;
}

export const HowUselessModal: React.FC<HowUselessModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#120305]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto select-none">
      <div className="relative w-full max-w-xl bg-[#280A10] border-2 border-[#D4AF37] rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-5 text-[#FFFDF7] my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#1A0508] hover:bg-[#380E16] flex items-center justify-center text-[#FEEBC8] hover:text-white transition-colors cursor-pointer border border-[#5C1523]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 text-[#FBBF24]">
          <Laugh className="w-6 h-6 text-[#EA580C]" />
          <h2 className="font-desi-display text-2xl md:text-3xl font-black uppercase tracking-tight">
            HOW USELESS IS THIS?
          </h2>
        </div>

        <p className="text-sm text-[#FEEBC8] leading-relaxed font-sans">
          In 2026, humanity has built autonomous agents to cure diseases, write production software, and explore deep space.
        </p>
        
        <p className="text-sm text-[#FFFDF7] leading-relaxed font-bold bg-[#180407] p-4 rounded-2xl border-2 border-[#EA580C] font-sans shadow-inner">
          We spent that same cutting-edge engineering effort to simulate your uncle in Thrissur who insists 2 + 2 = 5 because NASA hasn&apos;t declassified ancient palm leaves yet.
        </p>

        <div className="space-y-3 text-xs font-mono bg-[#180407] p-4.5 rounded-2xl border border-[#5C1523]">
          <div className="flex items-start gap-2.5">
            <span className="text-[#4ADE80] font-black">60% CREATIVITY:</span>
            <span className="text-[#FEEBC8]">A comedic psychological reverse-Turing test. You cannot convince it. You cannot pacify it. It exists solely to argue.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-[#EA580C] font-black">20% COMPLEXITY:</span>
            <span className="text-[#FEEBC8]">Full-stack real-time speech recognition, voice synthesis, multi-turn dynamic prompt escalation, and self-contradiction tracking.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="text-[#FBBF24] font-black">20% CROSS-DISCIPLINARY:</span>
            <span className="text-[#FEEBC8]">Sociological Kerala culture satire, behavioral stubbornness state machines, procedural sound design, and live canvas generation.</span>
          </div>
        </div>

        <p className="text-xs text-[#D4A373] italic text-center font-serif">
          &ldquo;Arguing with an intelligent person is hard. Arguing with someone from WhatsApp University is impossible.&rdquo;
        </p>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#C2410C] hover:from-[#FBBF24] hover:to-[#EA580C] text-[#170407] font-desi-display tracking-wider text-base font-black transition-all cursor-pointer shadow-xl shadow-[#EA580C]/30 active:scale-95 border-2 border-[#FBBF24]"
        >
          I ACCEPT THE FUTILITY. TAKE ME BACK.
        </button>
      </div>
    </div>
  );
};
