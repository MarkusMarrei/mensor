import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { Capacitor } from '@capacitor/core';

let isSpeaking = false;

export async function speakText(text: string, lang = 'ru-RU'): Promise<void> {
  if (!text || text.trim() === '') return;

  // Strip markdown tags / extra symbols for cleaner speech
  const cleanText = text.replace(/[#*`_~[\]()]/g, '').trim();

  if (Capacitor.isNativePlatform()) {
    try {
      await TextToSpeech.stop();
      await TextToSpeech.speak({
        text: cleanText,
        lang: lang,
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        category: 'ambient',
      });
      isSpeaking = true;
      return;
    } catch (e) {
      console.warn('Native TTS failed, falling back to Web Speech API', e);
    }
  }

  // Web Speech API fallback
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => {
      isSpeaking = false;
    };
    utterance.onerror = () => {
      isSpeaking = false;
    };
    window.speechSynthesis.speak(utterance);
    isSpeaking = true;
  }
}

export async function stopSpeaking(): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    try {
      await TextToSpeech.stop();
    } catch (e) {
      console.warn(e);
    }
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  isSpeaking = false;
}

export function getIsSpeaking(): boolean {
  if ('speechSynthesis' in window) {
    return window.speechSynthesis.speaking;
  }
  return isSpeaking;
}
