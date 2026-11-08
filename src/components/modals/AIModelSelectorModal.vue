<script setup lang="ts">
import { useAIStore } from '../../stores/ai';
import { useAppStore } from '../../stores/app';
import type { AIProvider } from '../../types';
import { Cpu, Zap, Wifi, X, Check, ShieldCheck } from 'lucide-vue-next';

const aiStore = useAIStore();
const appStore = useAppStore();

function selectProvider(provider: AIProvider, model: string) {
  aiStore.setProvider(provider, model);
}
</script>

<template>
  <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-zinc-100 flex flex-col">
      <!-- Header -->
      <div class="p-5 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <h3 class="text-base font-bold text-zinc-900">{{ appStore.t.ai.chooseModelTitle }}</h3>
          <p class="text-xs text-zinc-500 mt-0.5">{{ appStore.t.ai.chooseModelDesc }}</p>
        </div>
        <button
          class="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-black transition"
          @click="aiStore.showModelModal = false"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Models List -->
      <div class="p-5 space-y-3">
        <!-- Option 1: Gemma 3 (1B) Default -->
        <div
          class="p-4 rounded-2xl border-2 transition cursor-pointer relative"
          :class="[
            appStore.settings.aiProvider === 'local_gemma3'
              ? 'border-mensor-red bg-mensor-red-light/40 shadow-soft'
              : 'border-zinc-200/80 hover:border-zinc-300 bg-white'
          ]"
          @click="selectProvider('local_gemma3', 'google/gemma-3-1b-it')"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-mensor-red/10 text-mensor-red flex items-center justify-center">
                <Zap class="w-5 h-5 fill-current" />
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-bold text-zinc-900">{{ appStore.t.ai.gemma3Title }}</span>
                  <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">{{ appStore.t.settings.defaultModel }}</span>
                </div>
                <p class="text-xs text-zinc-500 mt-0.5">{{ appStore.t.ai.gemma3Desc }}</p>
              </div>
            </div>
            <div
              v-if="appStore.settings.aiProvider === 'local_gemma3'"
              class="w-5 h-5 rounded-full bg-mensor-red text-white flex items-center justify-center shrink-0"
            >
              <Check class="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>
          <div class="mt-2.5 flex items-center gap-3 text-[11px] text-zinc-500 border-t border-zinc-100 pt-2">
            <span>✓ ~1 GB RAM</span>
            <span>✓ Low power</span>
          </div>
        </div>

        <!-- Option 2: Gemma 4-E2B (2B) -->
        <div
          class="p-4 rounded-2xl border-2 transition cursor-pointer relative"
          :class="[
            appStore.settings.aiProvider === 'local_gemma4'
              ? 'border-mensor-red bg-mensor-red-light/40 shadow-soft'
              : 'border-zinc-200/80 hover:border-zinc-300 bg-white'
          ]"
          @click="selectProvider('local_gemma4', 'google/gemma-4-E2B')"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Cpu class="w-5 h-5" />
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-bold text-zinc-900">{{ appStore.t.ai.gemma4Title }}</span>
                  <span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold">8+ GB RAM</span>
                </div>
                <p class="text-xs text-zinc-500 mt-0.5">{{ appStore.t.ai.gemma4Desc }}</p>
              </div>
            </div>
            <div
              v-if="appStore.settings.aiProvider === 'local_gemma4'"
              class="w-5 h-5 rounded-full bg-mensor-red text-white flex items-center justify-center shrink-0"
            >
              <Check class="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>
          <div class="mt-2.5 flex items-center gap-3 text-[11px] text-zinc-500 border-t border-zinc-100 pt-2">
            <span>✓ Deep reasoning</span>
            <span>✓ Extended context</span>
          </div>
        </div>

        <!-- Option 3: External API / Home LAN -->
        <div
          class="p-4 rounded-2xl border-2 transition cursor-pointer relative"
          :class="[
            appStore.settings.aiProvider === 'custom_api'
              ? 'border-mensor-red bg-mensor-red-light/40 shadow-soft'
              : 'border-zinc-200/80 hover:border-zinc-300 bg-white'
          ]"
          @click="selectProvider('custom_api', 'custom')"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Wifi class="w-5 h-5" />
              </div>
              <div>
                <span class="text-sm font-bold text-zinc-900">{{ appStore.t.ai.externalApiTitle }}</span>
                <p class="text-xs text-zinc-500 mt-0.5">{{ appStore.t.ai.externalApiDesc }}</p>
              </div>
            </div>
            <div
              v-if="appStore.settings.aiProvider === 'custom_api'"
              class="w-5 h-5 rounded-full bg-mensor-red text-white flex items-center justify-center shrink-0"
            >
              <Check class="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 bg-zinc-50 border-t border-zinc-100 text-center">
        <span class="text-[11px] text-zinc-400 flex items-center justify-center gap-1">
          <ShieldCheck class="w-3.5 h-3.5 text-emerald-600" />
          <span>INT8 KV-Cache Quantization Active • OOM Protection</span>
        </span>
      </div>
    </div>
  </div>
</template>
