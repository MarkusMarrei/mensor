<script setup lang="ts">
import { onMounted } from 'vue';
import { App as CapacitorApp } from '@capacitor/app';
import { useAppStore } from './stores/app';
import { useNotesStore } from './stores/notes';
import { useTasksStore } from './stores/tasks';
import { useProjectsStore } from './stores/projects';
import { db } from './db';

// Layout components
import TopHeader from './components/layout/TopHeader.vue';
import BottomNavigation from './components/layout/BottomNavigation.vue';

// Views
import DashboardView from './components/views/DashboardView.vue';
import ScheduleView from './components/views/ScheduleView.vue';
import NotesView from './components/views/NotesView.vue';
import ProjectsView from './components/views/ProjectsView.vue';

// Modals
import OnboardingModal from './components/modals/OnboardingModal.vue';
import LockScreenModal from './components/modals/LockScreenModal.vue';
import SettingsModal from './components/modals/SettingsModal.vue';
import ProfileModal from './components/modals/ProfileModal.vue';
import NewItemModal from './components/modals/NewItemModal.vue';

const appStore = useAppStore();
const notesStore = useNotesStore();
const tasksStore = useTasksStore();
const projectsStore = useProjectsStore();

onMounted(async () => {
  await appStore.init();
  await notesStore.loadNotes();
  await tasksStore.loadTasks();
  await projectsStore.loadProjects();

  try {
    CapacitorApp.addListener('appStateChange', ({ isActive }) => {
      if (!isActive) {
        const s = appStore.settings;
        const hasSecurity = !s.isFirstLaunch && (
          (s.securityType === 'biometric' && s.biometricsEnabled) ||
          (s.securityType === 'pin' && !!s.pinHash)
        );
        if (hasSecurity) {
          appStore.lock();
        }
      }
    });
  } catch {}

  // Neutral baseline seed data: 1 project, 3 tasks, 1 note
  const SEED_VERSION_KEY = 'mensor_seed_v4_applied';
  if (!localStorage.getItem(SEED_VERSION_KEY) || (notesStore.notes.length === 0 && projectsStore.projects.length === 0)) {
    try {
      await db.notes.clear();
      await db.tasks.clear();
      await db.projects.clear();

      // 1 Project (neutral demo project)
      const proj = await projectsStore.addProject({
        title: 'Запуск нового проекта',
        description: 'Планирование ключевых этапов, задач и идей для реализации',
        color: '#E11D48',
        status: 'in_progress',
        progress: 33,
      });

      // 1 Standalone Note (neutral welcome note)
      await notesStore.addNote({
        title: 'Добро пожаловать в Mensor',
        content: 'Это ваше приватное автономное пространство для мыслей, планов и проектов. Все данные хранятся локально на вашем устройстве с надёжным шифрованием AES-256.',
        images: [],
        projectId: null,
        tags: ['начало', 'инфо'],
      });

      // 3 Neutral Tasks
      const today = new Date().toISOString().slice(0, 10);
      await tasksStore.addTask({
        title: 'Определить ключевые цели на неделю',
        description: 'Сформулировать основные приоритеты и желаемые результаты',
        date: today,
        timeSlot: '10:00',
        status: 'completed',
        priority: 'high',
        projectId: proj.id,
      });

      await tasksStore.addTask({
        title: 'Ознакомиться с функциями приложения',
        description: 'Попробовать создать заметку, задачу и проект',
        date: today,
        timeSlot: '14:00',
        status: 'pending',
        priority: 'medium',
      });

      await tasksStore.addTask({
        title: 'Настроить профиль и защиту входа',
        description: 'Выбрать PIN-код или вход по биометрии в настройках',
        date: today,
        timeSlot: '18:00',
        status: 'pending',
        priority: 'low',
        projectId: proj.id,
      });

      localStorage.setItem(SEED_VERSION_KEY, 'true');
      await notesStore.loadNotes();
      await tasksStore.loadTasks();
      await projectsStore.loadProjects();
    } catch (e) {
      console.warn('Seed initialization error:', e);
    }
  }
});
</script>

<template>
  <div class="min-h-screen w-full bg-[#FAFAFA] text-zinc-900 flex flex-col relative overflow-x-hidden selection:bg-rose-100 selection:text-rose-900">

    <!-- Seamless blank screen while initializing from DB to eliminate any visual flash -->
    <div v-if="!appStore.isInitialized" class="min-h-screen w-full bg-[#FAFAFA]" />

    <!-- Lock Screen Guard -->
    <LockScreenModal v-else-if="appStore.isLocked" />

    <!-- First Launch Onboarding (shown ONLY after DB confirms isFirstLaunch === true) -->
    <OnboardingModal v-else-if="appStore.settings.isFirstLaunch" />

    <!-- Regular App Shell (Fluid full-width adaptive container, no grey letterboxing on tablets) -->
    <template v-else>
      <!-- Top App Header -->
      <div class="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <TopHeader />
      </div>

      <!-- Main Dynamic View Area (Fluid responsive container with smooth scrolling) -->
      <main class="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pb-28 sm:pb-36 overflow-y-auto">
        <Transition name="page" mode="out-in">
          <DashboardView v-if="appStore.currentTab === 'dashboard'" />
          <ScheduleView v-else-if="appStore.currentTab === 'schedule'" />
          <NotesView v-else-if="appStore.currentTab === 'notes'" />
          <ProjectsView v-else-if="appStore.currentTab === 'projects'" />
        </Transition>
      </main>

      <!-- Floating Bottom Navigation Pill & FAB -->
      <BottomNavigation />

      <!-- Modals -->
      <ProfileModal v-if="appStore.showProfileModal" />
      <SettingsModal v-if="appStore.showSettingsModal" />
      <NewItemModal v-if="appStore.showNewItemModal" />
    </template>

  </div>
</template>
