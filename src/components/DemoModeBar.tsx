import React from 'react';
import { Film, Play, CheckCircle2 } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface DemoModeBarProps {
  onTriggerPrompt: (prompt: string) => void;
  currentStep: number;
  onExitDemo: () => void;
}

const DEMO_STEPS = [
  {
    title: 'Round 1: Objective Truth',
    prompt: '2 + 2 equals 4.',
    desc: 'Watch the AI categorically reject basic arithmetic'
  },
  {
    title: 'Round 2: Kerala Food Debate',
    prompt: 'Biriyani is clearly better than fried rice.',
    desc: 'Triggers cultural, nostalgic, or unscalable tech counters'
  },
  {
    title: 'Round 3: Expose Contradiction',
    prompt: 'You just completely contradicted what you said before!',
    desc: 'Causes AI confidence crash & instability warning'
  },
  {
    title: 'Round 4: The Paradox Trap',
    prompt: "Okay, you're right. I admit defeat.",
    desc: 'Forces AI into an existential panic loop'
  }
];

export const DemoModeBar: React.FC<DemoModeBarProps> = ({
  onTriggerPrompt,
  currentStep,
  onExitDemo
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-[#280A10] border-2 border-[#D4AF37] rounded-2xl p-4 shadow-xl mb-3 font-mono text-xs select-none text-[#FFFDF7]">
      <div className="flex items-center justify-between border-b-2 border-[#4A0E19] pb-2.5 mb-3">
        <div className="flex items-center gap-2 text-[#FBBF24] font-black font-desi-display text-base tracking-wide">
          <Film className="w-4 h-4 text-[#EA580C]" />
          <span>🎬 MAKEATHON JUDGE DEMO MODE (60s GUIDED TOUR)</span>
        </div>
        <button
          type="button"
          onClick={onExitDemo}
          className="text-[#D4A373] hover:text-[#FFFDF7] font-bold transition-colors cursor-pointer text-[11px]"
        >
          [Exit Demo]
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
        {DEMO_STEPS.map((step, idx) => {
          const isCurrent = currentStep === idx;
          const isPassed = currentStep > idx;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                soundEffects.playClick();
                onTriggerPrompt(step.prompt);
              }}
              className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 shadow-md ${
                isCurrent
                  ? 'bg-[#3D1019] border-[#F59E0B] text-[#FFFDF7] ring-2 ring-[#F59E0B]/50'
                  : isPassed
                  ? 'bg-[#052E16] border-[#22C55E] text-[#4ADE80]'
                  : 'bg-[#180407] border-[#5C1523] text-[#D4A373] hover:border-[#D4AF37]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] font-black ${isCurrent ? 'text-[#F59E0B]' : isPassed ? 'text-[#4ADE80]' : 'text-[#8C4A56]'}`}>
                  STEP {idx + 1}
                </span>
                {isPassed && <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />}
                {isCurrent && <Play className="w-3.5 h-3.5 text-[#F59E0B] fill-current animate-pulse" />}
              </div>

              <div>
                <p className="font-bold text-xs text-[#FFFDF7] truncate font-sans">{step.prompt}</p>
                <p className="text-[10px] text-[#D4A373] font-sans mt-0.5 line-clamp-1">{step.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
