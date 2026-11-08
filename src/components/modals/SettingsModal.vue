<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAppStore } from '../../stores/app';
import { hashString } from '../../crypto';
import { isBiometricsAvailable, authenticateWithBiometrics } from '../../utils/biometrics';
import type { LanguageCode } from '../../types';
import {
  X,
  Globe,
  Shield,
  Fingerprint,
  KeyRound,
  Code2,
  User,
  Lock
} from 'lucide-vue-next';

const appStore = useAppStore();

const activeSettingsTab = ref<'general' | 'security' | 'about'>('general');

// General tab state
const localUserName = ref(appStore.settings.userName);

// Security tab state
const showChangePinModal = ref(false);
const newPin = ref('');
const newPinConfirm = ref('');
const pinChangeError = ref('');
const hasBiometrics = ref(true);
const securityStatusMsg = ref('');

onMounted(async () => {
  hasBiometrics.value = await isBiometricsAvailable();
});

async function togglePinProtection() {
  if (appStore.settings.pinHash) {
    // Disable PIN
    await appStore.updateSecuritySettings({
      pinHash: null,
      securityType: appStore.settings.biometricsEnabled ? 'biometric' : 'none',
    });
    securityStatusMsg.value = appStore.t.security.pinDisabled;
  } else {
    // Open modal to set PIN
    newPin.value = '';
    newPinConfirm.value = '';
    pinChangeError.value = '';
    showChangePinModal.value = true;
  }
}

async function saveNewPin() {
  pinChangeError.value = '';
  if (newPin.value.length < 4) {
    pinChangeError.value = appStore.t.security.pinLengthError;
    return;
  }
  if (newPin.value !== newPinConfirm.value) {
    pinChangeError.value = appStore.t.security.pinMismatchError;
    return;
  }

  const hash = await hashString(newPin.value);
  await appStore.updateSecuritySettings({
    pinHash: hash,
    securityType: 'pin',
  });
  showChangePinModal.value = false;
  securityStatusMsg.value = appStore.t.security.pinSavedSuccess;
  setTimeout(() => { securityStatusMsg.value = ''; }, 3500);
}

async function toggleBiometrics() {
  if (appStore.settings.biometricsEnabled) {
    await appStore.updateSecuritySettings({
      biometricsEnabled: false,
      securityType: appStore.settings.pinHash ? 'pin' : 'none',
    });
    securityStatusMsg.value = appStore.t.security.biometricDisabled;
    setTimeout(() => { securityStatusMsg.value = ''; }, 3500);
  } else {
    // Authenticate via native system prompt before enabling
    const success = await authenticateWithBiometrics({
      title: appStore.t.security.biometricActivated,
      subtitle: appStore.t.security.touchFingerprintSensor,
      cancelText: appStore.t.common.cancel
    });

    if (success) {
      await appStore.updateSecuritySettings({
        biometricsEnabled: true,
        securityType: 'biometric',
      });
      securityStatusMsg.value = appStore.t.security.biometricActivated;
    } else {
      securityStatusMsg.value = appStore.t.security.biometricNotConfirmed;
    }
    setTimeout(() => { securityStatusMsg.value = ''; }, 3500);
  }
}

async function saveGeneralSettings() {
  if (localUserName.value.trim()) {
    await appStore.updateProfile({ firstName: localUserName.value.trim() });
  }
  appStore.showSettingsModal = false;
}

const languages: { code: LanguageCode; label: string }[] = [
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'pt', label: 'Português' },
  { code: 'it', label: 'Italiano' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
];
</script>

<template>
  <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-zinc-200">
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
        <h3 class="text-base font-bold text-zinc-900">{{ appStore.t.common.settings }}</h3>
        <button
          class="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-black transition"
          @click="appStore.showSettingsModal = false"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Settings Tabs (3 equal columns, perfectly spaced 1-row layout on all smartphones) -->
      <div class="grid grid-cols-3 border-b border-zinc-100 bg-zinc-50/50 px-3">
        <button
          class="py-3 px-2 border-b-2 text-xs font-semibold text-center transition truncate"
          :class="activeSettingsTab === 'general' ? 'border-mensor-red text-mensor-red' : 'border-transparent text-zinc-500 hover:text-zinc-900'"
          @click="activeSettingsTab === 'general'"
        >
          {{ appStore.t.settings.general }}
        </button>

        <button
          class="py-3 px-2 border-b-2 text-xs font-semibold text-center transition truncate"
          :class="activeSettingsTab === 'security' ? 'border-mensor-red text-mensor-red' : 'border-transparent text-zinc-500 hover:text-zinc-900'"
          @click="activeSettingsTab === 'security'"
        >
          {{ appStore.t.settings.security }}
        </button>

        <button
          class="py-3 px-2 border-b-2 text-xs font-semibold text-center transition truncate"
          :class="activeSettingsTab === 'about' ? 'border-mensor-red text-mensor-red' : 'border-transparent text-zinc-500 hover:text-zinc-900'"
          @click="activeSettingsTab === 'about'"
        >
          {{ appStore.t.settings.about }}
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 flex-1 overflow-y-auto space-y-6">
        <!-- 1. GENERAL TAB -->
        <div v-if="activeSettingsTab === 'general'" class="space-y-5">
          <div>
            <label class="block text-xs font-semibold text-zinc-700 mb-1.5">{{ appStore.t.settings.userName }}</label>
            <input
              type="text"
              v-model="localUserName"
              class="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-mensor-red"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold text-zinc-700 mb-2 flex items-center gap-1.5">
              <Globe class="w-3.5 h-3.5 text-zinc-400" />
              <span>{{ appStore.t.settings.language }}</span>
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="l in languages"
                :key="l.code"
                class="py-2 px-2.5 rounded-xl border text-xs font-medium text-center transition"
                :class="appStore.settings.language === l.code ? 'border-mensor-red bg-rose-50 text-mensor-red font-semibold' : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'"
                @click="appStore.setLanguage(l.code)"
              >
                {{ l.label }}
              </button>
            </div>
          </div>

          <div class="pt-2">
            <button
              class="w-full py-2.5 bg-mensor-dark text-white rounded-xl text-xs font-semibold shadow-soft hover:bg-black transition active:scale-95"
              @click="saveGeneralSettings"
            >
              {{ appStore.t.common.save }}
            </button>
          </div>
        </div>

        <!-- 2. SECURITY TAB (PIN + Biometrics) -->
        <div v-else-if="activeSettingsTab === 'security'" class="space-y-4">
          <div class="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <KeyRound class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-zinc-900">{{ appStore.t.security.pinProtection }}</h4>
                  <p class="text-[11px] text-zinc-500">{{ appStore.t.security.pinProtectionDesc }}</p>
                </div>
              </div>

              <button
                type="button"
                @click="togglePinProtection"
                class="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                :class="appStore.settings.pinHash ? 'bg-mensor-red' : 'bg-zinc-200'"
              >
                <span
                  class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out"
                  :class="appStore.settings.pinHash ? 'translate-x-4' : 'translate-x-0'"
                />
              </button>
            </div>

            <div v-if="appStore.settings.pinHash" class="pt-2 border-t border-zinc-200/60 flex justify-end">
              <button
                class="text-xs font-semibold text-mensor-red hover:underline"
                @click="newPin = ''; newPinConfirm = ''; pinChangeError = ''; showChangePinModal = true;"
              >
                {{ appStore.t.security.changePin }}
              </button>
            </div>
          </div>

          <!-- Biometrics Switch -->
          <div class="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Fingerprint class="w-4 h-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-zinc-900">{{ appStore.t.security.biometricProtection }}</h4>
                  <p class="text-[11px] text-zinc-500">
                    {{ hasBiometrics ? appStore.t.security.biometricProtectionDesc : 'Not supported on this device' }}
                  </p>
                </div>
              </div>

              <button
                type="button"
                :disabled="!hasBiometrics"
                @click="hasBiometrics && toggleBiometrics()"
                class="relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                :class="[
                  !hasBiometrics
                    ? 'opacity-40 cursor-not-allowed bg-zinc-200'
                    : (appStore.settings.biometricsEnabled ? 'bg-mensor-red cursor-pointer' : 'bg-zinc-200 cursor-pointer')
                ]"
              >
                <span
                  class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out"
                  :class="appStore.settings.biometricsEnabled ? 'translate-x-4' : 'translate-x-0'"
                />
              </button>
            </div>
          </div>

          <p v-if="securityStatusMsg" class="text-xs text-center font-semibold text-emerald-600">
            {{ securityStatusMsg }}
          </p>

          <!-- Change PIN Modal -->
          <div v-if="showChangePinModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div class="bg-white rounded-3xl w-full max-w-xs p-5 shadow-2xl space-y-3.5 border border-zinc-200">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-bold text-zinc-900">{{ appStore.t.security.setPinTitle }}</h4>
                <button @click="showChangePinModal = false">
                  <X class="w-4 h-4 text-zinc-500" />
                </button>
              </div>

              <div>
                <label class="block text-[11px] font-medium text-zinc-500 mb-1">{{ appStore.t.security.newPinLabel }}</label>
                <input
                  type="password"
                  maxlength="6"
                  v-model="newPin"
                  placeholder="••••"
                  class="w-full text-center text-lg font-bold py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-mensor-red"
                />
              </div>

              <div>
                <label class="block text-[11px] font-medium text-zinc-500 mb-1">{{ appStore.t.security.confirmPinLabel }}</label>
                <input
                  type="password"
                  maxlength="6"
                  v-model="newPinConfirm"
                  placeholder="••••"
                  class="w-full text-center text-lg font-bold py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-mensor-red"
                />
              </div>

              <p v-if="pinChangeError" class="text-[11px] text-red-500 text-center font-medium">
                {{ pinChangeError }}
              </p>

              <button
                class="w-full py-2.5 bg-mensor-dark text-white rounded-xl text-xs font-semibold hover:bg-black transition"
                @click="saveNewPin"
              >
                {{ appStore.t.security.savePin }}
              </button>
            </div>
          </div>
        </div>

        <!-- 3. ABOUT APP TAB -->
        <div v-else-if="activeSettingsTab === 'about'" class="space-y-4">
          <!-- Logo & Brand Card -->
          <div class="text-center p-5 rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-2">
            <div class="w-16 h-16 rounded-3xl overflow-hidden shadow-float ring-2 ring-zinc-200 mx-auto">
              <img src="/Mensor.jpg" alt="Mensor Logo" class="w-full h-full object-cover" />
            </div>
            <h3 class="text-base font-bold text-zinc-900">Mensor: Project Notes</h3>
            <p class="text-xs text-mensor-red font-semibold">{{ appStore.t.about.version }} 4.0.0</p>
            <p class="text-[11px] text-zinc-500 leading-relaxed max-w-xs mx-auto">
              {{ appStore.t.about.appDescription }}
            </p>
          </div>

          <!-- Developer & License & Tech Details -->
          <div class="space-y-2.5 text-xs">
            <!-- Author -->
            <div class="p-3.5 rounded-2xl bg-white border border-zinc-200/90 flex items-center justify-between">
              <span class="text-zinc-500 flex items-center gap-1.5 text-xs">
                <User class="w-3.5 h-3.5 text-zinc-400" />
                <span>{{ appStore.t.about.author }}</span>
              </span>
              <span class="font-bold text-zinc-900 text-xs">{{ appStore.t.about.authorName }}</span>
            </div>

            <!-- License -->
            <div class="p-3.5 rounded-2xl bg-white border border-zinc-200/90 flex items-center justify-between">
              <span class="text-zinc-500 flex items-center gap-1.5 text-xs">
                <Shield class="w-3.5 h-3.5 text-zinc-400" />
                <span>{{ appStore.t.about.license }}</span>
              </span>
              <span class="font-bold text-zinc-900 text-xs">{{ appStore.t.about.licenseName }}</span>
            </div>

            <!-- Tech Stack -->
            <div class="p-3.5 rounded-2xl bg-white border border-zinc-200/90 flex flex-col justify-center gap-1">
              <div class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 class="w-3.5 h-3.5 text-zinc-400" />
                <span>{{ appStore.t.about.techStack }}</span>
              </div>
              <div class="text-xs font-semibold text-zinc-800 pl-5">
                {{ appStore.t.about.techStackValue }}
              </div>
            </div>

            <!-- Encryption -->
            <div class="p-3.5 rounded-2xl bg-white border border-zinc-200/90 flex flex-col justify-center gap-1">
              <div class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Lock class="w-3.5 h-3.5 text-zinc-400" />
                <span>{{ appStore.t.about.encryption }}</span>
              </div>
              <div class="text-xs font-bold text-emerald-700 pl-5">
                {{ appStore.t.about.encryptionValue }}
              </div>
            </div>
          </div>

          <div class="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100 text-[11px] text-zinc-600 leading-relaxed">
            <span class="font-bold text-mensor-red">{{ appStore.t.about.offlineFirstTitle }}:</span> {{ appStore.t.about.offlineFirstDesc }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
