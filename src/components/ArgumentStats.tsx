import React from 'react';
import type { ArgumentStats as StatsType } from '../types';
import { Flame, AlertTriangle, Newspaper, Coffee } from 'lucide-react';

interface ArgumentStatsProps {
  stats: StatsType;
  lastClaim?: string;
  lastFallacy?: string;
  instability: boolean;
}

export const ArgumentStats: React.FC<ArgumentStatsProps> = ({
  stats,
  lastClaim,
  lastFallacy,
  instability
}) => {
  return (
    <div className="bg-[#280A10] border-2 border-[#5C1523] rounded-3xl p-5 flex flex-col gap-3.5 font-mono text-xs shadow-2xl select-none text-[#FFFDF7]">
      {/* Header Styled as Newspaper Dispatch */}
      <div className="flex items-center justify-between border-b-2 border-[#4A0E19] pb-3">
        <div className="flex items-center gap-2 text-[#FBBF24] font-black tracking-wider font-desi-display text-lg">
          <Newspaper className="w-4 h-4 text-[#EA580C]" />
          <span>DAILY DISPATCH</span>
        </div>
        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#180407] text-[#4ADE80] font-bold border border-[#22C55E]/50 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping" />
          <span>LIVE TELEMETRY</span>
        </span>
      </div>

      {/* Instability Alert Banner */}
      {instability && (
        <div className="bg-[#3B0711] border-2 border-[#EF4444] rounded-2xl p-3 text-[#FEEBC8] flex items-start gap-2.5 animate-pulse shadow-md">
          <AlertTriangle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-[#EF4444] uppercase tracking-wide text-xs">⚠️ LOGIC INSTABILITY TRIGGERED</p>
            <p className="text-[11px] text-[#FEEBC8] font-sans mt-0.5 leading-snug">
              Logic buffer overwhelmed! The AI is desperately manufacturing an unscientific retreat!
            </p>
          </div>
        </div>
      )}

      {/* Last Detected Claim & Fallacy Badge */}
      {lastClaim && (
        <div className="bg-[#180407] rounded-2xl p-3 border border-[#5C1523] flex flex-col gap-1.5 shadow-inner">
          <div className="flex items-center justify-between text-[10px] text-[#D4A373] font-bold">
            <span>DETECTED CLAIM:</span>
            {lastFallacy && (
              <span className="text-[#FBBF24] font-bold bg-[#4D1521] px-2 py-0.5 rounded border border-[#EA580C]">
                {lastFallacy}
              </span>
            )}
          </div>
          <p className="text-[#FFFDF7] font-sans font-semibold text-xs truncate italic">
            &ldquo;{lastClaim}&rdquo;
          </p>
        </div>
      )}

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Stubbornness */}
        <div className="bg-[#180407] p-3 rounded-2xl border border-[#5C1523] flex flex-col justify-between shadow-inner">
          <div className="flex items-center gap-1.5 text-[#D4A373] text-[10px] font-bold">
            <Flame className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>STUBBORNNESS</span>
          </div>
          <div className="flex items-baseline gap-1 mt-1.5">
            <span className={`text-2xl font-black font-desi-display ${
              stats.aiStubbornness >= 85 ? 'text-[#EF4444]' : stats.aiStubbornness >= 60 ? 'text-[#F59E0B]' : 'text-[#4ADE80]'
            }`}>
              {stats.aiStubbornness}%
            </span>
          </div>
        </div>

        {/* AI Confidence */}
        <div className="bg-[#180407] p-3 rounded-2xl border border-[#5C1523] flex flex-col justify-between shadow-inner">
          <div className="flex items-center gap-1.5 text-[#D4A373] text-[10px] font-bold">
            <Coffee className="w-3.5 h-3.5 text-[#FBBF24]" />
            <span>CONFIDENCE</span>
          </div>
          <div className="flex items-baseline gap-1 mt-1.5">
            <span className={`text-2xl font-black font-desi-display ${
              stats.aiConfidence < 40 ? 'text-[#EF4444] animate-pulse' : 'text-[#FBBF24]'
            }`}>
              {stats.aiConfidence}%
            </span>
          </div>
        </div>
      </div>

      {/* Counters List */}
      <div className="space-y-1.5 pt-1 text-[#FEEBC8] text-[11px] font-medium">
        <div className="flex justify-between items-center py-1.5 border-b border-[#4A0E19]">
          <span className="text-[#D4A373]">User arguments:</span>
          <span className="font-bold text-[#FFFDF7]">{stats.userArguments}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-[#4A0E19]">
          <span className="text-[#D4A373]">AI counterarguments:</span>
          <span className="font-bold text-[#EA580C]">{stats.aiCounterarguments}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-[#4A0E19]">
          <span className="text-[#D4A373]">Times goalposts moved:</span>
          <span className="font-bold text-[#C084FC]">{stats.timesGoalpostsMoved}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-[#4A0E19]">
          <span className="text-[#D4A373]">WhatsApp forwards cited:</span>
          <span className="font-bold text-[#4ADE80]">{stats.whatsappForwardsCited}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-[#4A0E19]">
          <span className="text-[#D4A373]">User victory:</span>
          <span className="font-bold text-[#EF4444]">0</span>
        </div>
        <div className="flex justify-between items-center py-1.5">
          <span className="text-[#D4A373]">AI admissions of defeat:</span>
          <span className="font-bold text-[#EF4444]">0</span>
        </div>
      </div>

      <div className="mt-1 pt-2.5 border-t border-[#4A0E19] text-[10px] text-center text-[#D4A373] italic font-serif">
        &ldquo;The truth is whatever preserves my ego.&rdquo;
      </div>
    </div>
  );
};
