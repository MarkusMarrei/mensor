<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useAppStore } from '../../stores/app';
import { useAIStore } from '../../stores/ai';
import {
  Send,
  Trash2,
  Sparkles,
  Mic,
  MicOff
} from 'lucide-vue-next';
import {
  startSpeechRecognition,
  stopSpeechRecognition,
  isSpeechRecognitionSupported
} from '../../utils/stt';

const appStore = useAppStore();
const aiStore = useAIStore();

const inputText = ref('');
const isListening = ref(false);
const chatScrollRef = ref<HTMLDivElement | null>(null);

function toggleVoiceInput() {
  if (isListening.value) {
    stopSpeechRecognition();
    isListening.value = false;
    return;
  }

  if (!isSpeechRecognitionSupported()) {
    alert(appStore.t.ai.voiceNotSupported);
    return;
  }

  const lang = appStore.settings.language === 'en' ? 'en-US' : 'ru-RU';

  isListening.value = true;
  startSpeechRecognition({
    lang,
    onResult: (transcript, isFinal) => {
      inputText.value = transcript;
      if (isFinal) {
        // Keeps transcribed text in the input
      }
    },
    onError: (err) => {
      console.warn('STT Error:', err);
      isListening.value = false;
    },
    onEnd: () => {
      isListening.value = false;
    },
  });
}

async function handleSend() {
  if (!inputText.value.trim() || aiStore.isGenerating) return;
  const text = inputText.value;
  inputText.value = '';
  await aiStore.sendMessage(text);
  scrollToBottom();
}

function handleQuickPrompt(promptText: string) {
  inputText.value = promptText;
  handleSend();
}

function scrollToBottom() {
  nextTick(() => {
    if (chatScrollRef.value) {
      chatScrollRef.value.scrollTop = chatScrollRef.value.scrollHeight;
    }
  });
}

onMounted(() => {
  aiStore.loadHistory();
  scrollToBottom();
});
</script>

<template>
  <div class="flex flex-col h-[calc(100vh-140px)] sm:h-[730px] px-4 min-h-0">
    <!-- Optional clean action bar when there is message history -->
    <div v-if="aiStore.messages.length > 0" class="flex justify-end pt-1 pb-1 shrink-0">
      <button
        class="text-[11px] text-zinc-400 hover:text-red-500 flex items-center gap-1 transition px-2 py-1 rounded-lg hover:bg-zinc-100"
        @click="aiStore.clearMemory"
        :title="appStore.t.ai.clearMemory"
      >
        <Trash2 class="w-3 h-3" />
        <span>{{ appStore.t.ai.clearMemory }}</span>
      </button>
    </div>

    <!-- Chat Messages Scroll Area -->
    <div
      ref="chatScrollRef"
      class="flex-1 overflow-y-auto space-y-3.5 py-2 pr-1 min-h-0"
    >
      <!-- Greeting / Initial state if no messages -->
      <div v-if="aiStore.messages.length === 0" class="text-center py-6 px-4 space-y-4">
        <!-- AI Glowing Logo -->
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-zinc-900 to-zinc-800 ring-2 ring-mensor-red/40 mx-auto flex items-center justify-center text-rose-400 shadow-soft">
          <Sparkles class="w-7 h-7 animate-pulse" />
        </div>
        <div>
          <h3 class="text-sm font-bold text-zinc-900">{{ appStore.t.ai.greetingTitle }}</h3>
          <p class="text-xs text-zinc-500 mt-1 max-w-xs mx-auto leading-relaxed">
            {{ appStore.t.ai.greetingSubtitle }}
          </p>
        </div>

        <!-- Quick prompt chips -->
        <div class="flex flex-col gap-2 max-w-xs mx-auto pt-1">
          <button
            class="text-left py-2.5 px-3.5 rounded-2xl bg-white border border-zinc-200 hover:border-mensor-red hover:bg-mensor-red-light/30 transition text-xs text-zinc-700 shadow-sm flex items-center gap-2"
            @click="handleQuickPrompt(appStore.t.ai.quickQuery1)"
          >
            <span>📋</span>
            <span>{{ appStore.t.ai.quickQuery1 }}</span>
          </button>
          <button
            class="text-left py-2.5 px-3.5 rounded-2xl bg-white border border-zinc-200 hover:border-mensor-red hover:bg-mensor-red-light/30 transition text-xs text-zinc-700 shadow-sm flex items-center gap-2"
            @click="handleQuickPrompt(appStore.t.ai.quickQuery2)"
          >
            <span>📁</span>
            <span>{{ appStore.t.ai.quickQuery2 }}</span>
          </button>
          <button
            class="text-left py-2.5 px-3.5 rounded-2xl bg-white border border-zinc-200 hover:border-mensor-red hover:bg-mensor-red-light/30 transition text-xs text-zinc-700 shadow-sm flex items-center gap-2"
            @click="handleQuickPrompt(appStore.t.ai.quickQuery3)"
          >
            <span>⚡</span>
            <span>{{ appStore.t.ai.quickQuery3 }}</span>
          </button>
        </div>
      </div>

      <!-- Messages loop -->
      <div
        v-for="msg in aiStore.messages"
        :key="msg.id"
        class="flex gap-2.5 items-start"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <!-- Point 7: Assistant Avatar with Glowing Badge -->
        <div
          v-if="msg.role === 'assistant'"
          class="w-7 h-7 rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-800 ring-2 ring-mensor-red/40 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm"
        >
          <Sparkles class="w-3.5 h-3.5 text-rose-400" />
        </div>

        <!-- Bubble -->
        <div
          class="max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm whitespace-pre-wrap"
          :class="[
            msg.role === 'user'
              ? 'bg-zinc-900 text-white rounded-tr-none'
              : 'bg-white text-zinc-800 border border-zinc-200/80 rounded-tl-none shadow-soft'
          ]"
        >
          {{ msg.content }}
        </div>

        <!-- Point 7: User Profile Avatar -->
        <div
          v-if="msg.role === 'user'"
          class="w-7 h-7 rounded-full overflow-hidden border border-zinc-200 shrink-0 mt-0.5 bg-zinc-200 flex items-center justify-center text-[10px] font-bold text-zinc-700 shadow-sm"
        >
          <img
            v-if="appStore.settings.userAvatar"
            :src="appStore.settings.userAvatar"
            alt="User"
            class="w-full h-full object-cover"
          />
          <span v-else>{{ appStore.displayName.slice(0, 1).toUpperCase() }}</span>
        </div>
      </div>

      <!-- Typing Indicator -->
      <div v-if="aiStore.isGenerating" class="flex gap-2.5 items-center text-zinc-400 text-xs pl-1">
        <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-zinc-900 to-zinc-800 ring-2 ring-mensor-red/40 text-white flex items-center justify-center shrink-0">
          <Sparkles class="w-3.5 h-3.5 text-rose-400" />
        </div>
        <div class="flex items-center gap-1 bg-white border border-zinc-200 px-3 py-2 rounded-2xl shadow-soft">
          <span class="w-1.5 h-1.5 rounded-full bg-mensor-red animate-bounce" style="animation-delay: 0ms" />
          <span class="w-1.5 h-1.5 rounded-full bg-mensor-red animate-bounce" style="animation-delay: 150ms" />
          <span class="w-1.5 h-1.5 rounded-full bg-mensor-red animate-bounce" style="animation-delay: 300ms" />
          <span class="ml-1 text-[11px] text-zinc-500">{{ appStore.t.ai.analyzing }}</span>
        </div>
      </div>
    </div>

    <!-- Point 6: Input Bar fixed above Bottom Navigation Pill and FAB -->
    <div class="pt-2 pb-24 shrink-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/95 to-transparent">
      <form @submit.prevent="handleSend" class="relative flex items-center gap-2">
        <div class="relative flex-1 flex items-center">
          <input
            type="text"
            v-model="inputText"
            :placeholder="isListening ? appStore.t.ai.listening : appStore.t.ai.inputPlaceholder"
            :disabled="aiStore.isGenerating"
            class="w-full text-xs pl-4 pr-10 py-3 rounded-2xl bg-white border border-zinc-200 shadow-soft focus:outline-none focus:border-mensor-red transition disabled:bg-zinc-100 text-zinc-900"
            :class="{ 'border-mensor-red ring-2 ring-mensor-red/20': isListening }"
          />

          <!-- Microphone voice input button inside input field -->
          <button
            type="button"
            class="absolute right-2 w-7 h-7 rounded-xl flex items-center justify-center transition active:scale-95"
            :class="[
              isListening
                ? 'bg-mensor-red text-white animate-pulse shadow-sm'
                : 'text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100'
            ]"
            @click="toggleVoiceInput"
            :title="isListening ? appStore.t.notes.stopSpeech : appStore.t.ai.listening"
          >
            <MicOff v-if="isListening" class="w-3.5 h-3.5" />
            <Mic v-else class="w-4 h-4" />
          </button>
        </div>

        <button
          type="submit"
          :disabled="!inputText.trim() || aiStore.isGenerating"
          class="w-10 h-10 rounded-2xl bg-mensor-dark text-white flex items-center justify-center shrink-0 disabled:opacity-40 hover:bg-black transition active:scale-95 shadow-soft"
          :title="appStore.t.ai.send"
        >
          <Send class="w-4 h-4" />
        </button>
      </form>
    </div>
  </div>
</template>
