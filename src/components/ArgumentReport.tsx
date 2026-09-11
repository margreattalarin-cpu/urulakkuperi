import React from 'react';
import type { ArgumentStats, Character } from '../types';
import { Trophy, RotateCcw, Award, AlertCircle } from 'lucide-react';

interface ArgumentReportProps {
  stats: ArgumentStats;
  character: Character;
  onRestart: () => void;
  onOpenCertificate: () => void;
}

export const ArgumentReport: React.FC<ArgumentReportProps> = ({
  stats,
  character,
  onRestart,
  onOpenCertificate
}) => {
  const durationSeconds = Math.max(12, Math.round((Date.now() - stats.startTime) / 1000));
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds}s`;

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#280A10] border-2 border-[#D4AF37] rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in duration-300 select-none text-[#FFFDF7]">
      {/* Newspaper Masthead Banner */}
      <div className="text-center border-b-2 border-[#4A0E19] pb-5">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#3B0711] border border-[#EF4444] text-[#EF4444] text-xs font-mono font-black uppercase tracking-wider mb-3">
          <AlertCircle className="w-4 h-4 text-[#EF4444]" />
          <span>SESSION TERMINATED (YOU CONCEDED)</span>
        </div>
        <h1 className="font-desi-display text-4xl md:text-5xl font-black text-[#FBBF24] tracking-tight drop-shadow-md">
          ARGUMENT AUTOPSY
        </h1>
        <p className="text-xs sm:text-sm text-[#FEEBC8] font-serif font-bold mt-1">
          An official post-mortem breakdown of your completely futile verandah debate with {character.name}.
        </p>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
        <div className="bg-[#180407] p-3 rounded-2xl border border-[#5C1523] shadow-inner">
          <p className="text-[10px] text-[#D4A373] font-bold">ARGUMENTS</p>
          <p className="font-desi-display text-3xl font-black text-[#FFFDF7] mt-1">{stats.userArguments}</p>
        </div>
        <div className="bg-[#180407] p-3 rounded-2xl border border-[#5C1523] shadow-inner">
          <p className="text-[10px] text-[#D4A373] font-bold">REBUTTALS</p>
          <p className="font-desi-display text-3xl font-black text-[#EA580C] mt-1">{stats.aiCounterarguments}</p>
        </div>
        <div className="bg-[#180407] p-3 rounded-2xl border border-[#5C1523] shadow-inner">
          <p className="text-[10px] text-[#D4A373] font-bold">FINAL STUBBORNNESS</p>
          <p className="font-desi-display text-3xl font-black text-[#EF4444] mt-1">{stats.aiStubbornness}%</p>
        </div>
        <div className="bg-[#180407] p-3 rounded-2xl border border-[#5C1523] shadow-inner">
          <p className="text-[10px] text-[#D4A373] font-bold">DURATION</p>
          <p className="font-desi-display text-2xl font-black text-[#4ADE80] mt-1.5">{timeFormatted}</p>
        </div>
      </div>

      {/* Forensic Breakdown Table */}
      <div className="bg-[#180407] rounded-2xl p-4.5 border border-[#5C1523] font-mono text-xs space-y-2.5 shadow-inner">
        <div className="flex justify-between items-center text-[#FEEBC8]">
          <span className="text-[#D4A373] font-semibold">Debate Topic Detected:</span>
          <span className="font-bold text-[#FBBF24] bg-[#2A0B11] border border-[#5C1523] px-2.5 py-0.5 rounded-md font-sans">
            {stats.topic || 'Arbitrary Human Existence'}
          </span>
        </div>
        <div className="flex justify-between items-center text-[#FEEBC8]">
          <span className="text-[#D4A373] font-semibold">Times AI Moved Goalposts:</span>
          <span className="font-bold text-[#C084FC]">{stats.timesGoalpostsMoved}</span>
        </div>
        <div className="flex justify-between items-center text-[#FEEBC8]">
          <span className="text-[#D4A373] font-semibold">WhatsApp Forwards Cited:</span>
          <span className="font-bold text-[#4ADE80]">{stats.whatsappForwardsCited}</span>
        </div>
        <div className="flex justify-between items-center text-[#FEEBC8]">
          <span className="text-[#D4A373] font-semibold">Completely Unnecessary Arguments:</span>
          <span className="font-bold text-[#EA580C]">{Math.max(stats.aiCounterarguments, 8)}</span>
        </div>
        <div className="flex justify-between items-center text-[#FEEBC8]">
          <span className="text-[#D4A373] font-semibold">AI Contradictions Disregarded:</span>
          <span className="font-bold text-[#38BDF8]">{stats.aiContradictions || 2}</span>
        </div>
        <div className="flex justify-between items-center text-[#FEEBC8]">
          <span className="text-[#D4A373] font-semibold">User Remaining Patience:</span>
          <span className="font-bold text-[#EF4444]">2%</span>
        </div>
        <div className="flex justify-between items-center text-[#FEEBC8]">
          <span className="text-[#D4A373] font-semibold">AI Admissions of Defeat:</span>
          <span className="font-bold text-[#8C4A56]">0 (As expected)</span>
        </div>
      </div>

      {/* Final Verdict Box */}
      <div className="bg-gradient-to-br from-[#380E17] via-[#2A0B11] to-[#180407] border-2 border-[#D4AF37] rounded-2xl p-5 text-center relative overflow-hidden shadow-xl">
        <div className="flex items-center justify-center gap-2 text-[#FBBF24] mb-1">
          <Trophy className="w-6 h-6 text-[#F59E0B]" />
          <h2 className="font-desi-display text-xl font-bold tracking-wider uppercase">
            OFFICIAL JURY VERDICT
          </h2>
        </div>
        
        <p className="font-desi-display text-3xl md:text-4xl font-black text-[#FFFDF7] mt-1">
          YOU TECHNICALLY WON.
        </p>

        {/* AI Immediate Rebuttal */}
        <div className="mt-4 p-4 bg-[#180407] rounded-2xl border border-[#5C1523] text-left flex items-start gap-3 shadow-inner">
          <span className="text-3xl">{character.avatar}</span>
          <div>
            <p className="text-xs text-[#EA580C] font-bold font-desi-display">{character.name} Retorts:</p>
            <p className="text-sm text-[#FEEBC8] italic mt-0.5 font-sans leading-relaxed">
              &ldquo;I categorically disagree with the results. The judging criteria were rigged, and your victory is an unproven subjective narrative.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={onOpenCertificate}
          className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#C2410C] hover:from-[#FBBF24] hover:to-[#EA580C] text-[#170407] font-desi-display text-base tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#EA580C]/30 transition-all cursor-pointer active:scale-95 border-2 border-[#FBBF24] font-black"
        >
          <Award className="w-5 h-5" />
          <span>CLAIM SURVIVOR CERTIFICATE</span>
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="py-4 px-6 rounded-2xl bg-[#180407] hover:bg-[#340E16] text-[#FFFDF7] font-bold text-sm tracking-wide flex items-center justify-center gap-2 border-2 border-[#5C1523] transition-all cursor-pointer active:scale-95 shadow-md"
        >
          <RotateCcw className="w-4 h-4 text-[#EA580C]" />
          <span>FIGHT AGAIN</span>
        </button>
      </div>
    </div>
  );
};
