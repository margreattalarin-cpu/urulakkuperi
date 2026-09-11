import { useState, useEffect, useRef, useCallback } from 'react';

interface SpeechRecognitionOptions {
  onFinalTranscript?: (text: string) => void;
  onInterimTranscript?: (text: string) => void;
  language?: string;
}

// Browser Web Speech API type definition
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export function useSpeechRecognition({
  onFinalTranscript,
  onInterimTranscript,
  language = 'en-IN'
}: SpeechRecognitionOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);

  const recognitionRef = useRef<any>(null);
  const audioAnimationRef = useRef<number | null>(null);
  const accumulatedTranscriptRef = useRef<string>('');
  const hasSubmittedRef = useRef<boolean>(false);

  // Keep callback references stable to prevent re-render tearing
  const onFinalTranscriptRef = useRef(onFinalTranscript);
  useEffect(() => {
    onFinalTranscriptRef.current = onFinalTranscript;
  }, [onFinalTranscript]);

  const onInterimTranscriptRef = useRef(onInterimTranscript);
  useEffect(() => {
    onInterimTranscriptRef.current = onInterimTranscript;
  }, [onInterimTranscript]);

  // Check browser support on initial mount
  useEffect(() => {
    const win = window as unknown as IWindow;
    const hasSpeechApi = Boolean(win.SpeechRecognition || win.webkitSpeechRecognition);
    setIsSupported(hasSpeechApi);
    if (!hasSpeechApi) {
      setError('Speech recognition not supported in this browser. Please use text mode.');
    }
  }, []);

  // Audio animation visualizer
  const startAudioPulsing = useCallback(() => {
    if (audioAnimationRef.current) cancelAnimationFrame(audioAnimationRef.current);
    const pulse = () => {
      setAudioLevel(0.3 + Math.random() * 0.7);
      audioAnimationRef.current = requestAnimationFrame(pulse);
    };
    pulse();
  }, []);

  const stopAudioPulsing = useCallback(() => {
    if (audioAnimationRef.current) {
      cancelAnimationFrame(audioAnimationRef.current);
      audioAnimationRef.current = null;
    }
    setAudioLevel(0);
  }, []);

  // Request native mic permission if mediaDevices is available
  const requestMicPermission = useCallback(async (): Promise<boolean> => {
    try {
      if (navigator?.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Immediately stop tracks to free hardware for SpeechRecognition
        stream.getTracks().forEach((track) => track.stop());
        return true;
      }
      return true;
    } catch (err: any) {
      console.warn('[Microphone] Permission check error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Microphone permission was denied. Please allow mic access in browser settings.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError('No microphone found on your device. Please connect a mic.');
      } else {
        setError(`Microphone error: ${err.message || 'Unable to access microphone'}`);
      }
      return false;
    }
  }, []);

  // Stop listening cleanly and submit any pending spoken words
  const stopListening = useCallback(() => {
    setIsListening(false);
    stopAudioPulsing();

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore
      }
    }

    // Auto-submit accumulated transcript if available and not yet submitted
    const pendingText = accumulatedTranscriptRef.current.trim();
    if (pendingText && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      if (onFinalTranscriptRef.current) {
        onFinalTranscriptRef.current(pendingText);
      }
    }
  }, [stopAudioPulsing]);

  // Start speech recognition session
  const startListening = useCallback(async () => {
    const win = window as unknown as IWindow;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setIsSupported(false);
      setError('Speech recognition is not supported in this browser. Please use text mode.');
      return;
    }

    // Clean up any lingering active session
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // Ignore
      }
      recognitionRef.current = null;
    }

    setError(null);
    setTranscript('');
    accumulatedTranscriptRef.current = '';
    hasSubmittedRef.current = false;

    // Check / Request microphone permission first
    const micGranted = await requestMicPermission();
    if (!micGranted) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        startAudioPulsing();
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            final += item[0].transcript;
          } else {
            interim += item[0].transcript;
          }
        }

        const currentText = (final || interim || '').trim();
        if (currentText) {
          accumulatedTranscriptRef.current = currentText;
          setTranscript(currentText);

          if (onInterimTranscriptRef.current) {
            onInterimTranscriptRef.current(currentText);
          }
        }

        // If recognition detected a final segment
        if (final && !hasSubmittedRef.current) {
          hasSubmittedRef.current = true;
          setIsListening(false);
          stopAudioPulsing();
          if (onFinalTranscriptRef.current) {
            onFinalTranscriptRef.current(final.trim());
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('[SpeechRecognition] error event:', event.error);
        stopAudioPulsing();
        setIsListening(false);

        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          setError('Microphone permission denied. Please allow mic access in your browser.');
        } else if (event.error === 'no-speech') {
          // If no speech was detected, provide gentle feedback without blocking text mode
          setError('No speech was detected. Tap the mic and speak again.');
        } else if (event.error === 'network') {
          setError('Speech recognition network error. Please try again or use text chat.');
        } else if (event.error === 'aborted') {
          // Normal abort when user stops
        } else {
          setError(`Speech recognition: ${event.error}. Use text mode.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        stopAudioPulsing();

        // If recognition ended naturally with captured speech, auto-submit
        const pendingText = accumulatedTranscriptRef.current.trim();
        if (pendingText && !hasSubmittedRef.current) {
          hasSubmittedRef.current = true;
          if (onFinalTranscriptRef.current) {
            onFinalTranscriptRef.current(pendingText);
          }
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('[SpeechRecognition] failed to start instance:', err);
      setIsListening(false);
      stopAudioPulsing();
      setError(`Microphone error: ${err.message || 'Unable to start recognition'}`);
    }
  }, [language, requestMicPermission, startAudioPulsing, stopAudioPulsing]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Cleanup on hook unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore
        }
      }
      if (audioAnimationRef.current) {
        cancelAnimationFrame(audioAnimationRef.current);
      }
    };
  }, []);

  return {
    isListening,
    transcript,
    error,
    isSupported,
    audioLevel,
    startListening,
    stopListening,
    toggleListening,
    setTranscript
  };
}
