<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAppStore } from '../../stores/app';
import { useNotesStore } from '../../stores/notes';
import { useTasksStore, getTodayDateString } from '../../stores/tasks';
import { useProjectsStore } from '../../stores/projects';
import { startSpeechRecognition } from '../../utils/stt';
import type { Priority } from '../../types';
import { X, FileText, CheckSquare, FolderPlus, Mic } from 'lucide-vue-next';

const appStore = useAppStore();
const notesStore = useNotesStore();
const tasksStore = useTasksStore();
const projectsStore = useProjectsStore();

const itemType = ref<'note' | 'task' | 'project'>('note');

// Note form
const noteTitle = ref('');
const noteContent = ref('');
const noteProjectId = ref<string | null>(null);
const isRecordingNote = ref(false);

// Task form
const taskTitle = ref('');
const taskDescription = ref('');
const taskDate = ref(tasksStore.selectedDate || getTodayDateString());
const taskTime = ref('10:00');
const taskPriority = ref<Priority>('medium');
const taskProjectId = ref<string | null>(null);

// Project form
const projectTitle = ref('');
const projectDesc = ref('');
const projectColor = ref('#E11D48');

// Apply context whenever modal is triggered
watch(
  () => appStore.showNewItemModal,
  (isOpen) => {
    if (isOpen) {
      const ctx = appStore.newItemModalContext;
      if (ctx.type) {
        itemType.value = ctx.type;
      }
      if (ctx.projectId) {
        noteProjectId.value = ctx.projectId;
        taskProjectId.value = ctx.projectId;
      } else {
        noteProjectId.value = null;
        taskProjectId.value = null;
      }
      taskDate.value = tasksStore.selectedDate || getTodayDateString();
    }
  },
  { immediate: true }
);

function handleVoiceInputNote() {
  if (isRecordingNote.value) {
    isRecordingNote.value = false;
    return;
  }
  isRecordingNote.value = true;
  startSpeechRecognition({
    lang: appStore.settings.language === 'en' ? 'en-US' : 'ru-RU',
    onResult: (transcript, isFinal) => {
      if (isFinal) {
        noteContent.value = noteContent.value ? `${noteContent.value} ${transcript}` : transcript;
        isRecordingNote.value = false;
      }
    },
    onError: () => {
      isRecordingNote.value = false;
    },
    onEnd: () => {
      isRecordingNote.value = false;
    }
  });
}

function formatPriorityLabel(p: Priority): string {
  const word = appStore.t.schedule[p] || p;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

async function handleCreate() {
  if (itemType.value === 'note') {
    if (!noteTitle.value.trim() && !noteContent.value.trim()) return;
    const cleanProjectId = (noteProjectId.value && noteProjectId.value !== 'null' && noteProjectId.value !== '')
      ? noteProjectId.value
      : null;

    await notesStore.addNote({
      title: noteTitle.value.trim() || 'Без названия',
      content: noteContent.value.trim(),
      images: [],
      projectId: cleanProjectId,
      tags: [],
    });

    if (cleanProjectId) {
      appStore.currentTab = 'projects';
    } else {
      appStore.currentTab = 'notes';
    }
    noteTitle.value = '';
    noteContent.value = '';
  } else if (itemType.value === 'task') {
    if (!taskTitle.value.trim()) return;
    const cleanProjectId = (taskProjectId.value && taskProjectId.value !== 'null' && taskProjectId.value !== '')
      ? taskProjectId.value
      : null;

    await tasksStore.addTask({
      title: taskTitle.value.trim(),
      description: taskDescription.value.trim(),
      date: taskDate.value || getTodayDateString(),
      timeSlot: taskTime.value || '10:00',
      status: 'pending',
      priority: taskPriority.value,
      projectId: cleanProjectId,
    });

    if (cleanProjectId) {
      const projTasks = tasksStore.getProjectTasks(cleanProjectId);
      const completed = projTasks.filter(t => t.status === 'completed').length;
      const progress = projTasks.length > 0 ? Math.round((completed / projTasks.length) * 100) : 0;
      await projectsStore.updateProject(cleanProjectId, { progress });
      appStore.currentTab = 'projects';
    } else {
      appStore.currentTab = 'schedule';
    }
    taskTitle.value = '';
    taskDescription.value = '';
  } else if (itemType.value === 'project') {
    if (!projectTitle.value.trim()) return;
    await projectsStore.addProject({
      title: projectTitle.value.trim(),
      description: projectDesc.value.trim(),
      color: projectColor.value,
      status: 'in_progress',
      progress: 0,
    });
    appStore.currentTab = 'projects';
    projectTitle.value = '';
    projectDesc.value = '';
  }

  appStore.showNewItemModal = false;
}
</script>

<template>
  <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-zinc-200">
      <!-- Header -->
      <div class="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
        <h3 class="text-base font-bold text-zinc-900">Создать</h3>
        <button
          class="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-black transition"
          @click="appStore.showNewItemModal = false"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <!-- Type Switcher -->
      <div class="grid grid-cols-3 gap-1 p-2 m-4 bg-zinc-100 rounded-2xl">
        <button
          class="py-2 px-3 rounded-2xl flex items-center justify-center gap-1.5 text-xs font-semibold transition"
          :class="itemType === 'note' ? 'bg-white shadow-soft text-mensor-red' : 'text-zinc-500 hover:text-zinc-900'"
          @click="itemType = 'note'"
        >
          <FileText class="w-3.5 h-3.5" />
          <span>{{ appStore.t.nav.notes }}</span>
        </button>

        <button
          class="py-2 px-3 rounded-2xl flex items-center justify-center gap-1.5 text-xs font-semibold transition"
          :class="itemType === 'task' ? 'bg-white shadow-soft text-mensor-red' : 'text-zinc-500 hover:text-zinc-900'"
          @click="itemType = 'task'"
        >
          <CheckSquare class="w-3.5 h-3.5" />
          <span>{{ appStore.t.nav.schedule }}</span>
        </button>

        <button
          class="py-2 px-3 rounded-2xl flex items-center justify-center gap-1.5 text-xs font-semibold transition"
          :class="itemType === 'project' ? 'bg-white shadow-soft text-mensor-red' : 'text-zinc-500 hover:text-zinc-900'"
          @click="itemType = 'project'"
        >
          <FolderPlus class="w-3.5 h-3.5" />
          <span>{{ appStore.t.nav.projects }}</span>
        </button>
      </div>

      <!-- Form Body -->
      <div class="p-5 flex-1 overflow-y-auto space-y-3.5">
        <!-- NOTE FORM -->
        <template v-if="itemType === 'note'">
          <input
            type="text"
            v-model="noteTitle"
            :placeholder="appStore.t.notes.titlePlaceholder"
            class="w-full text-sm font-semibold px-3.5 py-2.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-mensor-red"
          />

          <div class="relative">
            <textarea
              v-model="noteContent"
              rows="4"
              :placeholder="appStore.t.notes.contentPlaceholder"
              class="w-full text-sm px-3.5 py-2.5 pr-10 rounded-2xl border border-zinc-200 focus:outline-none focus:border-mensor-red"
            ></textarea>
            <!-- STT Voice button -->
            <button
              type="button"
              class="absolute right-3 bottom-3 w-7 h-7 rounded-full flex items-center justify-center transition"
              :class="isRecordingNote ? 'bg-mensor-red text-white animate-pulse' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'"
              @click="handleVoiceInputNote"
              title="Голосовой ввод"
            >
              <Mic class="w-3.5 h-3.5" />
            </button>
          </div>

          <div v-if="projectsStore.projects.length > 0">
            <label class="block text-[11px] font-medium text-zinc-500 mb-1">Привязать к проекту (опционально):</label>
            <select
              v-model="noteProjectId"
              class="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none bg-white"
            >
              <option :value="null">Без проекта (отдельная записка)</option>
              <option v-for="p in projectsStore.projects" :key="p.id" :value="p.id">
                📁 {{ p.title }}
              </option>
            </select>
          </div>
        </template>

        <!-- TASK FORM -->
        <template v-else-if="itemType === 'task'">
          <input
            type="text"
            v-model="taskTitle"
            placeholder="Что нужно сделать?"
            class="w-full text-sm font-semibold px-3.5 py-2.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-mensor-red"
          />

          <textarea
            v-model="taskDescription"
            rows="2"
            placeholder="Описание задачи (опционально)..."
            class="w-full text-xs px-3.5 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-mensor-red"
          ></textarea>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-[11px] font-medium text-zinc-500 mb-1">Дата</label>
              <input
                type="date"
                v-model="taskDate"
                class="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none bg-white"
              />
            </div>
            <div>
              <label class="block text-[11px] font-medium text-zinc-500 mb-1">Время</label>
              <input
                type="time"
                v-model="taskTime"
                class="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none bg-white"
              />
            </div>
          </div>

          <div>
            <label class="block text-[11px] font-medium text-zinc-500 mb-1">Приоритет</label>
            <div class="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                class="py-1.5 rounded-xl border font-medium transition"
                :class="taskPriority === 'low' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-zinc-200 text-zinc-600'"
                @click="taskPriority = 'low'"
              >
                {{ formatPriorityLabel('low') }}
              </button>
              <button
                type="button"
                class="py-1.5 rounded-xl border font-medium transition"
                :class="taskPriority === 'medium' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-zinc-200 text-zinc-600'"
                @click="taskPriority = 'medium'"
              >
                {{ formatPriorityLabel('medium') }}
              </button>
              <button
                type="button"
                class="py-1.5 rounded-xl border font-medium transition"
                :class="taskPriority === 'high' ? 'border-red-500 bg-red-50 text-red-700' : 'border-zinc-200 text-zinc-600'"
                @click="taskPriority = 'high'"
              >
                {{ formatPriorityLabel('high') }}
              </button>
            </div>
          </div>

          <div v-if="projectsStore.projects.length > 0">
            <label class="block text-[11px] font-medium text-zinc-500 mb-1">Привязать к проекту (опционально):</label>
            <select
              v-model="taskProjectId"
              class="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none bg-white"
            >
              <option :value="null">Без проекта</option>
              <option v-for="p in projectsStore.projects" :key="p.id" :value="p.id">
                📁 {{ p.title }}
              </option>
            </select>
          </div>
        </template>

        <!-- PROJECT FORM -->
        <template v-else>
          <input
            type="text"
            v-model="projectTitle"
            placeholder="Название проекта..."
            class="w-full text-sm font-semibold px-3.5 py-2.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-mensor-red"
          />
          <textarea
            v-model="projectDesc"
            rows="3"
            placeholder="Краткое описание проекта и целей..."
            class="w-full text-sm px-3.5 py-2.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-mensor-red"
          ></textarea>

          <div>
            <label class="block text-[11px] font-medium text-zinc-500 mb-1.5">Цветовая метка проекта</label>
            <div class="flex gap-2">
              <button
                v-for="c in ['#E11D48', '#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#18181B']"
                :key="c"
                type="button"
                class="w-7 h-7 rounded-full border-2 transition"
                :style="{ backgroundColor: c }"
                :class="projectColor === c ? 'border-black scale-110 shadow-sm' : 'border-transparent'"
                @click="projectColor = c"
              />
            </div>
          </div>
        </template>
      </div>

      <!-- Action Footer -->
      <div class="p-4 border-t border-zinc-100 bg-zinc-50/50">
        <button
          class="w-full py-3 bg-mensor-dark text-white rounded-2xl font-semibold text-sm shadow-float hover:bg-black transition active:scale-[0.98]"
          @click="handleCreate"
        >
          Создать
        </button>
      </div>
    </div>
  </div>
</template>
