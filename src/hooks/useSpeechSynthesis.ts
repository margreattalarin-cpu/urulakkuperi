import { useState, useEffect, useRef, useCallback } from 'react';
import type { Character } from '../types';

// Common Manglish marker words to detect Latin-script Malayalam conversations
const MANGLISH_REGEX = /\b(aano|alla|aanu|enthu|entha|enthada|enthadaa|enthuvaade|enthokke|nokk|nokku|nokkatte|ariyilla|ariyamo|ariyaam|pinne|sherikkum|shari|sathyam|ayyo|athe|njangalude|ningal|ningalkk|njan|para|parayuva|paranjille|kunjinu|scene|machane|cheta|chechi|aliyan|poda|podi|mone|makale|vaada|vadi|adipoli|kidu|kidilam|thallu|thallal|pottan|mandan|chumma|kollam|nallathu|veruthe|urulakkupperi|kaalathu|kaaryam|undu|undo|illa|ille|ivide|avide|angane|ingane|chodyam|uttaram|onnum|padichathu|sadhanam)\b/i;

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSupported, setIsSupported] = useState(true);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      if (available && available.length > 0) {
        setVoices(available);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback(
    (text: string, character?: Character, onEndCallback?: () => void) => {
      if (!isSupported || !('speechSynthesis' in window)) {
        onEndCallback?.();
        return;
      }

      window.speechSynthesis.cancel();

      // Clean speech of asterisks, markdown, emojis, or URLs before speaking
      const cleaned = text
        .replace(/[*_~`#]/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{27BF}]/gu, '')
        .trim();

      if (!cleaned) {
        onEndCallback?.();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleaned);

      // Get available voices from state or directly from speechSynthesis
      const availableVoices =
        voices.length > 0
          ? voices
          : typeof window !== 'undefined' && window.speechSynthesis
          ? window.speechSynthesis.getVoices()
          : [];

      // 1. Malayalam voices (ml-IN, ml, or named Sobhana, Midhun, Malayalam)
      const malayalamVoices = availableVoices.filter((v) => {
        const lang = (v.lang || '').toLowerCase();
        const name = (v.name || '').toLowerCase();
        return (
          lang.startsWith('ml') ||
          lang === 'ml-in' ||
          lang === 'ml_in' ||
          name.includes('malayalam') ||
          name.includes('മലയാളം') ||
          name.includes('sobhana') ||
          name.includes('midhun')
        );
      });

      const malayalamFemaleVoice = malayalamVoices.find(
        (v) =>
          v.name.toLowerCase().includes('sobhana') ||
          v.name.toLowerCase().includes('female')
      );

      const malayalamMaleVoice = malayalamVoices.find(
        (v) =>
          v.name.toLowerCase().includes('midhun') ||
          v.name.toLowerCase().includes('male')
      );

      // 2. Indian English / Indian voices (en-IN, hi-IN, Neerja, Prabhat, Heera, Ravi)
      const indianVoices = availableVoices.filter((v) => {
        const lang = (v.lang || '').toLowerCase();
        const name = (v.name || '').toLowerCase();
        return (
          (lang.startsWith('en-in') ||
            lang === 'en_in' ||
            lang.includes('hi-in') ||
            name.includes('india') ||
            name.includes('neerja') ||
            name.includes('prabhat') ||
            name.includes('heera') ||
            name.includes('ravi')) &&
          !lang.startsWith('ml') &&
          !name.includes('malayalam') &&
          !name.includes('മലയാളം') &&
          !name.includes('sobhana') &&
          !name.includes('midhun')
        );
      });

      const indianFemaleVoice = indianVoices.find(
        (v) =>
          v.name.toLowerCase().includes('neerja') ||
          v.name.toLowerCase().includes('heera') ||
          v.name.toLowerCase().includes('female') ||
          (v.lang.toLowerCase().includes('in') &&
            !v.name.toLowerCase().includes('male') &&
            !v.name.toLowerCase().includes('ravi') &&
            !v.name.toLowerCase().includes('prabhat'))
      );

      const indianMaleVoice = indianVoices.find(
        (v) =>
          v.name.toLowerCase().includes('prabhat') ||
          v.name.toLowerCase().includes('ravi') ||
          v.name.toLowerCase().includes('male')
      );

      // 3. Standard English voices (Zira, Samantha, David, George, etc.)
      const englishFemaleVoice = availableVoices.find(
        (v) =>
          (v.name.toLowerCase().includes('female') ||
            v.name.toLowerCase().includes('zira') ||
            v.name.toLowerCase().includes('samantha')) &&
          (v.lang.toLowerCase().startsWith('en') || v.lang.toLowerCase().includes('in'))
      );

      const englishMaleVoice = availableVoices.find(
        (v) =>
          (v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('david') ||
            v.name.toLowerCase().includes('george')) &&
          (v.lang.toLowerCase().startsWith('en') || v.lang.toLowerCase().includes('in'))
      );

      // Content analysis
      const containsMalayalamScript = /[\u0D00-\u0D7F]/.test(cleaned);
      const isManglish = !containsMalayalamScript && MANGLISH_REGEX.test(cleaned);

      let selectedVoice: SpeechSynthesisVoice | undefined;
      let targetLang = 'en-US';
      let targetPitch = character?.speechConfig.pitch || 1.0;
      let targetRate = character?.speechConfig.rate || 1.0;

      if (containsMalayalamScript) {
        // Malayalam text (either purely Malayalam or mixed Malayalam + English)
        targetLang = 'ml-IN';

        // Select best Malayalam voice matching character gender preference
        if (character?.speechConfig.voiceFilter === 'female') {
          selectedVoice = malayalamFemaleVoice || malayalamVoices[0];
        } else if (character?.speechConfig.voiceFilter === 'male') {
          selectedVoice = malayalamMaleVoice || malayalamVoices[0];
        } else {
          selectedVoice = malayalamVoices[0];
        }

        // If no explicit Malayalam voice is installed, fallback to Indian voice
        if (!selectedVoice && indianVoices.length > 0) {
          if (character?.speechConfig.voiceFilter === 'female') {
            selectedVoice = indianFemaleVoice || indianVoices[0];
          } else {
            selectedVoice = indianMaleVoice || indianVoices[0];
          }
        }

        // Natural pacing for Malayalam syllables (steady, non-rushed cadence)
        targetRate = Math.min(1.02, Math.max(0.9, (character?.speechConfig.rate || 1.0) * 0.95));
      } else if (isManglish) {
        // Manglish text (Kerala vocabulary in Latin script): Indian phonetics sound authentic
        targetLang = 'en-IN';

        if (character?.speechConfig.voiceFilter === 'female') {
          selectedVoice = indianFemaleVoice || indianVoices[0];
        } else if (character?.speechConfig.voiceFilter === 'male') {
          selectedVoice = indianMaleVoice || indianVoices[0];
        } else {
          selectedVoice = indianVoices[0];
        }

        // Fallback to standard English voices if no Indian voice is available
        if (!selectedVoice) {
          if (character?.speechConfig.voiceFilter === 'female' && englishFemaleVoice) {
            selectedVoice = englishFemaleVoice;
          } else if (character?.speechConfig.voiceFilter === 'male' && englishMaleVoice) {
            selectedVoice = englishMaleVoice;
          }
        }
      } else {
        // Standard English text: Preserve existing behavior exactly!
        targetLang = 'en-US';

        if (character?.speechConfig.voiceFilter === 'female' && englishFemaleVoice) {
          selectedVoice = englishFemaleVoice;
        } else if (character?.speechConfig.voiceFilter === 'male' && englishMaleVoice) {
          selectedVoice = englishMaleVoice;
        } else if (indianVoices.length > 0) {
          selectedVoice = indianVoices[0];
        }
      }

      // Configure utterance properties
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang || targetLang;
      } else {
        utterance.lang = targetLang;
      }

      utterance.pitch = targetPitch;
      utterance.rate = targetRate;

      console.log(
        `[TTS] Speaking (${utterance.lang}): "${cleaned.slice(0, 40)}..." | Voice: ${
          utterance.voice ? utterance.voice.name : 'browser-default'
        } (pitch: ${utterance.pitch}, rate: ${utterance.rate})`
      );

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        onEndCallback?.();
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        onEndCallback?.();
      };

      currentUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, voices]
  );

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    isSpeaking,
    isSupported,
    speak,
    stop
  };
}
