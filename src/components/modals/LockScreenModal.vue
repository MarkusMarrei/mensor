<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAppStore } from '../../stores/app';
import { hashString } from '../../crypto';
import { authenticateWithBiometrics, isBiometricsAvailable } from '../../utils/biometrics';
import { Fingerprint, AlertCircle, Delete, KeyRound } from 'lucide-vue-next';

const appStore = useAppStore();

const enteredPin = ref('');
const error = ref('');
const isErrorShaking = ref(false);
const hasBiometrics = ref(true);
const activeMode = ref<'biometric' | 'pin'>('pin');

onMounted(async () => {
  const hasHardware = await isBiometricsAvailable();
  hasBiometrics.value = hasHardware;

  if (hasHardware && (appStore.settings.biometricsEnabled || appStore.settings.securityType === 'biometric')) {
    activeMode.value = 'biometric';
    handleBiometricAuth();
  } else {
    // If device lacks biometric sensor (e.g. tablet) or user chose PIN
    if (appStore.settings.pinHash) {
      activeMode.value = 'pin';
    } else {
      // No alternate secret configured, unlock safely
      appStore.unlock();
    }
  }
});

async function handleBiometricAuth() {
  error.value = '';
  try {
    const success = await authenticateWithBiometrics({
      title: 'Mensor',
      subtitle: appStore.t.security.touchFingerprintSensor,
      cancelText: appStore.t.common.cancel,
    });
    if (success) {
      appStore.unlock();
    } else {
      error.value = appStore.t.security.fingerprintNotRecognized;
      triggerShake();
    }
  } catch {
    error.value = appStore.t.security.biometricError;
    triggerShake();
  }
}

function handlePinDigit(digit: string) {
  error.value = '';
  if (enteredPin.value.length < 6) {
    enteredPin.value += digit;
    if (enteredPin.value.length >= 4) {
      verifyPin();
    }
  }
}

function handleBackspace() {
  enteredPin.value = enteredPin.value.slice(0, -1);
}

function triggerShake() {
  isErrorShaking.value = true;
  setTimeout(() => {
    isErrorShaking.value = false;
  }, 500);
}

async function verifyPin() {
  if (!appStore.settings.pinHash) {
    appStore.unlock();
    return;
  }
  const hash = await hashString(enteredPin.value);
  if (hash === appStore.settings.pinHash) {
    appStore.unlock();
  } else {
    if (enteredPin.value.length >= 4) {
      error.value = appStore.t.security.invalidPin;
      triggerShake();
      enteredPin.value = '';
    }
  }
}
</script>

<template>
  <div class="fixed inset-0 z-50 bg-[#0A0B0E] text-white flex flex-col items-center justify-between p-6 select-none overflow-hidden">
    <!-- Ambient Ruby Glow in background -->
    <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/15 rounded-full blur-[100px] pointer-events-none" />
    <div class="absolute -bottom-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-900/10 rounded-full blur-[100px] pointer-events-none" />

    <!-- Top Brand Header -->
    <div class="w-full flex flex-col items-center pt-8 relative z-10">
      <div class="w-16 h-16 rounded-3xl overflow-hidden shadow-2xl ring-2 ring-rose-500/30 mb-3 p-0.5 bg-gradient-to-tr from-rose-600 to-zinc-800">
        <img src="/Mensor.jpg" alt="Mensor Logo" class="w-full h-full object-cover rounded-[22px]" />
      </div>
      <h2 class="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
        <span>Mensor</span>
        <span class="w-1.5 h-1.5 rounded-full bg-rose-500" />
      </h2>
      <p class="text-xs text-zinc-400 mt-0.5">{{ appStore.t.security.safeVault }}</p>
    </div>

    <!-- Error Toast -->
    <div
      v-if="error"
      class="py-1.5 px-3.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-1.5 animate-fade-in relative z-10"
      :class="{ 'animate-bounce': isErrorShaking }"
    >
      <AlertCircle class="w-3.5 h-3.5" />
      <span>{{ error }}</span>
    </div>

    <!-- MAIN INTERACTIVE GUARD ZONE -->
    <div class="w-full max-w-xs flex flex-col items-center justify-center my-auto relative z-10">
      <!-- 1. BIOMETRIC MODE -->
      <div v-if="activeMode === 'biometric'" class="flex flex-col items-center text-center">
        <button
          class="w-24 h-24 rounded-full bg-rose-500/15 border-2 border-rose-500/40 text-rose-500 flex items-center justify-center mb-5 hover:bg-rose-500/25 active:scale-95 transition-all shadow-[0_0_30px_rgba(225,29,72,0.3)] group cursor-pointer"
          @click="handleBiometricAuth"
          :title="appStore.t.security.touchFingerprintSensor"
        >
          <Fingerprint class="w-12 h-12 group-hover:scale-110 transition-transform stroke-[1.8]" />
        </button>
        <p class="text-sm font-medium text-zinc-200">{{ appStore.t.security.touchFingerprintSensor }}</p>
        <button
          v-if="appStore.settings.pinHash"
          class="text-xs text-rose-400 font-semibold mt-3 hover:underline"
          @click="activeMode = 'pin'"
        >
          {{ appStore.t.security.orSwitchToCode }}
        </button>
      </div>

      <!-- 2. PIN MODE (with custom luxury glass pad) -->
      <div v-else-if="activeMode === 'pin'" class="w-full flex flex-col items-center">
        <!-- PIN Dots Indicator -->
        <div class="flex items-center gap-3.5 mb-8">
          <div
            v-for="i in 4"
            :key="i"
            class="w-3.5 h-3.5 rounded-full border transition-all duration-200"
            :class="[
              enteredPin.length >= i
                ? 'bg-rose-500 border-rose-400 shadow-[0_0_12px_rgba(225,29,72,0.8)] scale-110'
                : 'bg-zinc-800/80 border-zinc-700'
            ]"
          />
        </div>

        <!-- Glass NumPad -->
        <div class="grid grid-cols-3 gap-3.5 w-full">
          <button
            v-for="digit in ['1', '2', '3', '4', '5', '6', '7', '8', '9']"
            :key="digit"
            class="h-14 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 active:bg-rose-950/40 active:border-rose-500/50 flex items-center justify-center text-xl font-semibold text-zinc-100 transition shadow-sm backdrop-blur"
            @click="handlePinDigit(digit)"
          >
            {{ digit }}
          </button>

          <!-- Biometrics button on numpad if available -->
          <button
            class="h-14 rounded-2xl bg-zinc-900/40 hover:bg-zinc-800 border border-zinc-800/60 active:bg-rose-950/40 flex items-center justify-center transition"
            :class="hasBiometrics ? 'text-rose-400' : 'text-zinc-600 opacity-40'"
            :disabled="!hasBiometrics"
            @click="hasBiometrics && handleBiometricAuth()"
            :title="appStore.t.security.fingerprintShort"
          >
            <Fingerprint class="w-6 h-6" />
          </button>

          <!-- Zero -->
          <button
            class="h-14 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 active:bg-rose-950/40 active:border-rose-500/50 flex items-center justify-center text-xl font-semibold text-zinc-100 transition shadow-sm"
            @click="handlePinDigit('0')"
          >
            0
          </button>

          <!-- Backspace -->
          <button
            class="h-14 rounded-2xl bg-zinc-900/40 hover:bg-zinc-800 border border-zinc-800/60 active:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-200 transition"
            @click="handleBackspace"
            title="Backspace"
          >
            <Delete class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Mode Switcher -->
    <div class="w-full max-w-xs flex items-center justify-center gap-2 pt-4 relative z-10">
      <button
        v-if="hasBiometrics && (appStore.settings.biometricsEnabled || appStore.settings.securityType === 'biometric')"
        class="py-1.5 px-3 rounded-full text-xs font-medium transition flex items-center gap-1.5"
        :class="activeMode === 'biometric' ? 'bg-rose-600/30 text-rose-300 border border-rose-500/40' : 'text-zinc-500 hover:text-zinc-300'"
        @click="activeMode = 'biometric'"
      >
        <Fingerprint class="w-3.5 h-3.5" />
        <span>{{ appStore.t.security.fingerprintShort }}</span>
      </button>

      <button
        v-if="appStore.settings.pinHash"
        class="py-1.5 px-3 rounded-full text-xs font-medium transition flex items-center gap-1.5"
        :class="activeMode === 'pin' ? 'bg-rose-600/30 text-rose-300 border border-rose-500/40' : 'text-zinc-500 hover:text-zinc-300'"
        @click="activeMode = 'pin'"
      >
        <KeyRound class="w-3.5 h-3.5" />
        <span>{{ appStore.t.security.pinShort }}</span>
      </button>
    </div>
  </div>
</template>
