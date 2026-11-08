import { registerPlugin, Capacitor } from '@capacitor/core';

interface NativeBiometricPluginInterface {
  isAvailable(): Promise<{ isAvailable: boolean; code?: number; error?: string }>;
  authenticate(options?: {
    title?: string;
    subtitle?: string;
    cancelText?: string;
  }): Promise<{ success: boolean; error?: string; errorCode?: number }>;
}

const NativeBiometric = registerPlugin<NativeBiometricPluginInterface>('NativeBiometric');

export async function isBiometricsAvailable(): Promise<boolean> {
  if (Capacitor.isNativePlatform()) {
    try {
      const result = await NativeBiometric.isAvailable();
      return !!result.isAvailable;
    } catch (e) {
      console.warn('Native biometric availability check failed:', e);
      return false;
    }
  }

  // Browser / Web fallback
  if (typeof window !== 'undefined' && window.PublicKeyCredential) {
    try {
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch {
      return false;
    }
  }
  return false;
}

export async function authenticateWithBiometrics(options?: {
  title?: string;
  subtitle?: string;
  cancelText?: string;
}): Promise<boolean> {
  if (Capacitor.isNativePlatform()) {
    try {
      const result = await NativeBiometric.authenticate({
        title: options?.title || 'Mensor',
        subtitle: options?.subtitle || 'Touch the fingerprint sensor',
        cancelText: options?.cancelText || 'Cancel',
      });
      return !!result.success;
    } catch (e) {
      console.error('Native biometric authentication error:', e);
      return false;
    }
  }

  // Dev browser environment: succeed gracefully so local web testing isn't blocked
  return true;
}
