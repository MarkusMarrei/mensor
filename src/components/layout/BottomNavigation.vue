<script setup lang="ts">
import { useAppStore } from '../../stores/app';
import { useProjectsStore } from '../../stores/projects';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  FolderKanban,
  Plus
} from 'lucide-vue-next';

const appStore = useAppStore();
const projectsStore = useProjectsStore();

const navItems = [
  { id: 'dashboard', label: 'nav.dashboard', icon: LayoutDashboard },
  { id: 'schedule', label: 'nav.schedule', icon: Calendar },
  { id: 'notes', label: 'nav.notes', icon: FileText },
  { id: 'projects', label: 'nav.projects', icon: FolderKanban },
] as const;

function handleTabClick(tabId: typeof navItems[number]['id']) {
  // Clicking projects tab returns to main projects list
  if (tabId === 'projects') {
    projectsStore.activeProjectId = null;
  }
  appStore.currentTab = tabId;
}

function handleFabClick() {
  if (appStore.currentTab === 'schedule') {
    appStore.openNewItemModal({ type: 'task' });
  } else if (appStore.currentTab === 'notes') {
    appStore.openNewItemModal({ type: 'note' });
  } else if (appStore.currentTab === 'projects') {
    if (projectsStore.activeProjectId) {
      appStore.openNewItemModal({ type: 'task', projectId: projectsStore.activeProjectId });
    } else {
      appStore.openNewItemModal({ type: 'project' });
    }
  } else {
    appStore.openNewItemModal();
  }
}
</script>

<template>
  <div
    class="fixed bottom-0 left-0 right-0 z-40 pointer-events-none px-4 sm:px-6 pb-2.5 sm:pb-4 max-w-md sm:max-w-xl mx-auto transition-all"
    style="padding-bottom: max(0.75rem, calc(env(safe-area-inset-bottom, 0px) + 0.5rem));"
  >
    <div class="flex items-center justify-between gap-3 sm:gap-4 pointer-events-auto">
      <!-- Main floating pill bar with prominent black border around the 4 main buttons -->
      <nav class="flex-1 bg-white/95 backdrop-blur-md rounded-full shadow-lg border-2 border-zinc-950 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="relative flex-1 py-2 sm:py-2.5 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center group"
          :class="[
            appStore.currentTab === item.id
              ? 'text-mensor-red bg-rose-50/80 scale-105 font-bold shadow-xs'
              : 'text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100/70'
          ]"
          @click="handleTabClick(item.id)"
          :aria-label="item.id"
        >
          <component :is="item.icon" class="w-6 h-6 transition-transform" />
          <span
            v-if="appStore.currentTab === item.id"
            class="absolute -bottom-1 w-1.5 h-1.5 bg-mensor-red rounded-full"
          />
        </button>
      </nav>

      <!-- Floating Plus Action Button (FAB) -->
      <button
        class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-zinc-950 text-white flex items-center justify-center shadow-lg ring-4 ring-black/5 hover:bg-black active:scale-90 transition-all duration-200 shrink-0 group"
        @click="handleFabClick"
        aria-label="Create new item"
      >
        <Plus class="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.8] group-hover:rotate-90 transition-transform duration-200" />
      </button>
    </div>
  </div>
</template>
