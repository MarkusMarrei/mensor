<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAppStore } from '../../stores/app';
import type { LanguageCode, SecurityType } from '../../types';
import { hashString } from '../../crypto';
import { isBiometricsAvailable } from '../../utils/biometrics';
import { Shield, Fingerprint, Lock, Check, ChevronRight } from 'lucide-vue-next';

const appStore = useAppStore();

const step = ref<'language' | 'security'>('language');
const selectedLang = ref<LanguageCode>(appStore.settings.language);
const chosenSecurityType = ref<SecurityType>('pin');
const hasBiometrics = ref(false);
const pinCode = ref('');
const pinError = ref('');

onMounted(async () => {
  hasBiometrics.value = await isBiometricsAvailable();
  if (hasBiometrics.value) {
    chosenSecurityType.value = 'biometric';
  } else {
    chosenSecurityType.value = 'pin';
  }
});

const languages: { code: LanguageCode; name: string; native: string; flag: string }[] = [
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷' },
];

function selectLanguage(lang: LanguageCode) {
  selectedLang.value = lang;
  appStore.setLanguage(lang);
}

function proceedToSecurity() {
  step.value = 'security';
}

async function finishOnboarding() {
  let pinHash: string | null = null;
  if (chosenSecurityType.value === 'pin') {
    if (pinCode.value.length < 4) {
      pinError.value = appStore.t.security.pinLengthError || 'Минимум 4 цифры';
      return;
    }
    pinHash = await hashString(pinCode.value);
  }

  await appStore.completeFirstLaunch({
    type: chosenSecurityType.value,
    pinHash,
    biometrics: chosenSecurityType.value === 'biometric',
  });
}
</script>

<template>
  <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-zinc-100 flex flex-col max-h-[90vh]">
      <!-- Header with Mensor Logo -->
      <div class="pt-6 pb-3 px-6 text-center border-b border-zinc-100 bg-gradient-to-b from-zinc-50/50 to-white">
        <div class="w-14 h-14 mx-auto mb-3 rounded-2xl overflow-hidden shadow-soft ring-1 ring-zinc-200">
          <img src="/Mensor.jpg" alt="Mensor Logo" class="w-full h-full object-cover" />
        </div>
        <h2 class="text-xl font-bold text-zinc-900">{{ appStore.t.appName }}</h2>
        <p class="text-xs text-zinc-500 mt-0.5">{{ appStore.t.appSubtitle }}</p>
      </div>

      <!-- Step 1: Language selection -->
      <div v-if="step === 'language'" class="p-6 flex-1 overflow-y-auto">
        <div class="text-center mb-4">
          <h3 class="text-sm font-semibold text-zinc-800">Выберите язык / Choose Language</h3>
          <p class="text-xs text-zinc-400">Сменить язык можно в любой момент в настройках</p>
        </div>

        <div class="grid grid-cols-1 gap-2">
          <button
            v-for="l in languages"
            :key="l.code"
            class="flex items-center justify-between px-4 py-3 rounded-2xl border text-sm transition-all"
            :class="[
              selectedLang === l.code
                ? 'border-mensor-red bg-mensor-red-light/50 font-medium text-zinc-900 shadow-sm'
                : 'border-zinc-200/80 bg-white hover:bg-zinc-50 text-zinc-700'
            ]"
            @click="selectLanguage(l.code)"
          >
            <div class="flex items-center gap-3">
              <span class="text-xl">{{ l.flag }}</span>
              <span class="font-medium">{{ l.native }}</span>
              <span class="text-xs text-zinc-400 font-normal">({{ l.name }})</span>
            </div>
            <Check v-if="selectedLang === l.code" class="w-4 h-4 text-mensor-red stroke-[2.5]" />
          </button>
        </div>

        <button
          class="w-full mt-5 py-3.5 px-4 bg-mensor-dark text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-float hover:bg-black active:scale-[0.98] transition"
          @click="proceedToSecurity"
        >
          <span>Далее / Next</span>
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>

      <!-- Step 2: Security selection -->
      <div v-else class="p-6 flex-1 overflow-y-auto">
        <div class="text-center mb-5">
          <h3 class="text-base font-bold text-zinc-900">{{ appStore.t.security.chooseMethod }}</h3>
          <p class="text-xs text-zinc-400 mt-1">Защитите ваши персональные мысли и проекты</p>
        </div>

        <div class="space-y-2.5 mb-4">
          <!-- Biometric option only if hardware available -->
          <label
            v-if="hasBiometrics"
            class="flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition"
            :class="chosenSecurityType === 'biometric' ? 'border-mensor-red bg-rose-50/60 ring-1 ring-mensor-red' : 'border-zinc-200 bg-white'"
          >
            <div class="flex items-center gap-3">
              <Fingerprint class="w-5 h-5 text-mensor-red" />
              <div>
                <div class="text-xs font-semibold text-zinc-900">{{ appStore.t.security.biometric }}</div>
                <div class="text-[11px] text-zinc-400">Вход по отпечатку пальца</div>
              </div>
            </div>
            <input type="radio" value="biometric" v-model="chosenSecurityType" class="accent-mensor-red" />
          </label>

          <!-- PIN option -->
          <label
            class="flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition"
            :class="chosenSecurityType === 'pin' ? 'border-mensor-red bg-rose-50/60 ring-1 ring-mensor-red' : 'border-zinc-200 bg-white'"
          >
            <div class="flex items-center gap-3">
              <Lock class="w-5 h-5 text-zinc-700" />
              <div>
                <div class="text-xs font-semibold text-zinc-900">{{ appStore.t.security.pin }}</div>
                <div class="text-[11px] text-zinc-400">4-6 цифр для быстрого входа</div>
              </div>
            </div>
            <input type="radio" value="pin" v-model="chosenSecurityType" class="accent-mensor-red" />
          </label>

          <!-- None option -->
          <label
            class="flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition"
            :class="chosenSecurityType === 'none' ? 'border-mensor-red bg-rose-50/60 ring-1 ring-mensor-red' : 'border-zinc-200 bg-white'"
          >
            <div class="flex items-center gap-3">
              <Shield class="w-5 h-5 text-zinc-400" />
              <div>
                <div class="text-xs font-semibold text-zinc-900">{{ appStore.t.security.none || 'Без защиты' }}</div>
                <div class="text-[11px] text-zinc-400">Вход сразу без пароля</div>
              </div>
            </div>
            <input type="radio" value="none" v-model="chosenSecurityType" class="accent-mensor-red" />
          </label>
        </div>

        <!-- PIN entry field if PIN chosen -->
        <div v-if="chosenSecurityType === 'pin'" class="mb-4">
          <input
            type="password"
            maxlength="6"
            v-model="pinCode"
            placeholder="Введите PIN-код"
            class="w-full text-center text-xl tracking-widest py-3 px-4 rounded-2xl border border-zinc-200 focus:outline-none focus:border-mensor-red focus:ring-1 focus:ring-mensor-red"
          />
          <p v-if="pinError" class="text-xs text-red-500 mt-1.5 text-center font-medium">{{ pinError }}</p>
        </div>

        <button
          class="w-full py-3.5 px-4 bg-mensor-dark text-white rounded-2xl font-semibold text-sm shadow-float hover:bg-black active:scale-[0.98] transition mt-2"
          @click="finishOnboarding"
        >
          Завершить и войти
        </button>
      </div>
    </div>
  </div>
</template>
