import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mensor.projectnotes',
  appName: 'Mensor',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    TextToSpeech: {
      category: 'ambient',
    },
  },
};

export default config;
