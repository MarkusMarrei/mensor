<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from '../../stores/app';
import { Settings, Calendar, FileText, FolderKanban } from 'lucide-vue-next';

const appStore = useAppStore();

const isDashboard = computed(() => appStore.currentTab === 'dashboard');

const currentTabInfo = computed(() => {
  switch (appStore.currentTab) {
    case 'schedule':
      return {
        title: appStore.t.nav.schedule || 'Tasks',
        icon: Calendar,
        badgeClass: 'bg-sky-50/90 text-sky-800 border-sky-200/80',
        dotClass: 'bg-sky-500',
      };
    case 'notes':
      return {
        title: appStore.t.nav.notes || 'Notes',
        icon: FileText,
        badgeClass: 'bg-amber-50/90 text-amber-800 border-amber-200/80',
        dotClass: 'bg-amber-500',
      };
    case 'projects':
      return {
        title: appStore.t.nav.projects || 'Projects',
        icon: FolderKanban,
        badgeClass: 'bg-rose-50/90 text-rose-800 border-rose-200/80',
        dotClass: 'bg-rose-500',
      };
    default:
      return null;
  }
});
</script>

<template>
  <header
    class="pb-3 sm:pb-5 pt-3 sm:pt-5"
    style="padding-top: max(0.875rem, calc(env(safe-area-inset-top, 0px) + 0.5rem));"
  >
    <!-- Top small row -->
    <div class="flex items-center justify-between gap-3 mb-2">
      <!-- Left Pill on Dashboard: Short, elegant, non-truncated -->
      <div
        v-if="isDashboard"
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50/90 text-xs font-semibold text-rose-700 border border-rose-200/70 shadow-xs shrink-0"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-mensor-red animate-pulse shrink-0" />
        <span>{{ appStore.t.dashboard.badgeQuote }}</span>
      </div>

      <!-- Accent Section Pill on Other Tabs (Colored, distinctive, non-gray) -->
      <div
        v-else-if="currentTabInfo"
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border shadow-xs transition-all shrink-0"
        :class="currentTabInfo.badgeClass"
      >
        <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="currentTabInfo.dotClass" />
        <component :is="currentTabInfo.icon" class="w-3.5 h-3.5 shrink-0 opacity-80" />
        <span>{{ currentTabInfo.title }}</span>
      </div>

      <!-- Right Action Icons (shrink-0 prevents squishing) -->
      <div class="flex items-center gap-2 shrink-0">
        <button
          class="w-9 h-9 rounded-full bg-white border border-mensor-border flex items-center justify-center text-zinc-600 hover:text-black hover:bg-zinc-50 transition shadow-sm active:scale-95"
          @click="appStore.showSettingsModal = true"
          aria-label="Settings"
          :title="appStore.t.common.settings"
        >
          <Settings class="w-4 h-4" />
        </button>

        <!-- User avatar button (opens Profile Modal) -->
        <button
          class="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-zinc-200 active:scale-95 transition bg-zinc-100 flex items-center justify-center"
          @click="appStore.showProfileModal = true"
          :title="appStore.t.profile.title"
          aria-label="User Profile"
        >
          <img
            v-if="appStore.settings.userAvatar"
            :src="appStore.settings.userAvatar"
            alt="User Avatar"
            class="w-full h-full object-cover"
          />
          <img
            v-else
            src="/Mensor.jpg"
            alt="Mensor Logo"
            class="w-full h-full object-cover"
          />
        </button>
      </div>
    </div>

    <!-- Main Greeting ONLY on Dashboard -->
    <div v-if="isDashboard" class="pt-2 pb-1">
      <h1 class="text-2xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
        <span>{{ appStore.t.dashboard.greeting }}</span>
        <span class="text-mensor-red">{{ appStore.displayName }}</span>
        <span>👋</span>
      </h1>
      <p class="text-xs text-zinc-500 mt-0.5 font-normal">
        {{ appStore.settings.userBio || appStore.t.dashboard.motto }}
      </p>
    </div>
  </header>
</template>
