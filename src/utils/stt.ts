// Speech Recognition (Speech-to-Text / Голосовой ввод)
// Uses native Web Speech API built into Android Chromium WebView & desktop browsers

let recognitionInstance: any = null;
let isCurrentlyListening = false;

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

export interface SpeechRecognitionOptions {
  lang?: string;
  onResult: (transcript: string, isFinal: boolean) => void;
  onError?: (error: any) => void;
  onEnd?: () => void;
  continuous?: boolean;
}

export function startSpeechRecognition(options: SpeechRecognitionOptions): boolean {
  if (!isSpeechRecognitionSupported()) {
    console.warn('Speech Recognition API is not supported in this environment');
    options.onError?.('Распознавание речи не поддерживается в этом браузере.');
    return false;
  }

  stopSpeechRecognition();

  try {
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionInstance = new SpeechRecognitionClass();

    recognitionInstance.lang = options.lang || 'ru-RU';
    recognitionInstance.continuous = options.continuous ?? false;
    recognitionInstance.interimResults = true;
    recognitionInstance.maxAlternatives = 1;

    recognitionInstance.onstart = () => {
      isCurrentlyListening = true;
    };

    recognitionInstance.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const text = finalTranscript || interimTranscript;
      const isFinal = Boolean(finalTranscript);
      options.onResult(text, isFinal);
    };

    recognitionInstance.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      isCurrentlyListening = false;
      options.onError?.(event.error);
    };

    recognitionInstance.onend = () => {
      isCurrentlyListening = false;
      options.onEnd?.();
    };

    recognitionInstance.start();
    isCurrentlyListening = true;
    return true;
  } catch (err) {
    console.error('Failed to start speech recognition', err);
    isCurrentlyListening = false;
    options.onError?.(err);
    return false;
  }
}

export function stopSpeechRecognition(): void {
  if (recognitionInstance) {
    try {
      recognitionInstance.stop();
    } catch (e) {
      // Ignore if already stopped
    }
    recognitionInstance = null;
  }
  isCurrentlyListening = false;
}

export function isSpeechListening(): boolean {
  return isCurrentlyListening;
}
