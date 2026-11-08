<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAppStore } from '../../stores/app';
import { useProjectsStore } from '../../stores/projects';
import { useNotesStore } from '../../stores/notes';
import { useTasksStore } from '../../stores/tasks';
import { speakText, stopSpeaking, getIsSpeaking } from '../../utils/tts';
import { startSpeechRecognition } from '../../utils/stt';
import type { Note, Priority } from '../../types';
import {
  FolderPlus,
  Plus,
  ArrowLeft,
  Trash2,
  FileText,
  CheckSquare,
  Check,
  Volume2,
  VolumeX,
  Mic,
  X,
  Edit3,
  ChevronRight
} from 'lucide-vue-next';

const appStore = useAppStore();
const projectsStore = useProjectsStore();
const notesStore = useNotesStore();
const tasksStore = useTasksStore();

const activeProject = computed(() => {
  if (!projectsStore.activeProjectId) return null;
  return projectsStore.projects.find(p => p.id === projectsStore.activeProjectId) || null;
});

const projectNotes = computed(() => {
  if (!activeProject.value) return [];
  return notesStore.getProjectNotes(activeProject.value.id);
});

const projectTasks = computed(() => {
  if (!activeProject.value) return [];
  return tasksStore.getProjectTasks(activeProject.value.id);
});

// Automatic calculated progress for the active project
const activeProjectProgress = computed(() => {
  const tasks = projectTasks.value;
  if (tasks.length === 0) return 0;
  const completed = tasks.filter(t => t.status === 'completed').length;
  return Math.round((completed / tasks.length) * 100);
});

function getProjectProgress(projectId: string): number {
  const tasks = tasksStore.getProjectTasks(projectId);
  if (tasks.length === 0) return 0;
  const completed = tasks.filter(t => t.status === 'completed').length;
  return Math.round((completed / tasks.length) * 100);
}

function formatPriority(priority: Priority): string {
  const word = appStore.t.schedule[priority] || priority;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const activeSubTab = ref<'notes' | 'tasks'>('notes');

// --- Edit Project Details Modal State ---
const isEditingProject = ref(false);
const editProjectTitle = ref('');
const editProjectDescription = ref('');
const editProjectColor = ref('#E11D48');

function openEditProjectModal() {
  if (!activeProject.value) return;
  editProjectTitle.value = activeProject.value.title;
  editProjectDescription.value = activeProject.value.description || '';
  editProjectColor.value = activeProject.value.color || '#E11D48';
  isEditingProject.value = true;
}

async function saveProjectDetails() {
  if (!activeProject.value) return;
  await projectsStore.updateProject(activeProject.value.id, {
    title: editProjectTitle.value.trim() || activeProject.value.title,
    description: editProjectDescription.value.trim(),
    color: editProjectColor.value,
  });
  isEditingProject.value = false;
}

// --- Note Detail & Editor Modal in Project ---
const selectedProjectNote = ref<Note | null>(null);
const isEditingProjectNote = ref(false);
const editTitle = ref('');
const editContent = ref('');
const currentlySpeakingId = ref<string | null>(null);
const isRecordingEditNote = ref(false);

function openProjectNote(note: Note) {
  selectedProjectNote.value = note;
  editTitle.value = note.title;
  editContent.value = note.content;
  isEditingProjectNote.value = true;
}

function closeProjectNoteEditor() {
  isEditingProjectNote.value = false;
  selectedProjectNote.value = null;
  stopSpeaking();
  currentlySpeakingId.value = null;
  isRecordingEditNote.value = false;
}

function handleVoiceInputEditNote() {
  if (isRecordingEditNote.value) {
    isRecordingEditNote.value = false;
    return;
  }
  isRecordingEditNote.value = true;
  startSpeechRecognition({
    lang: appStore.settings.language === 'en' ? 'en-US' : 'ru-RU',
    onResult: (transcript, isFinal) => {
      if (isFinal) {
        editContent.value = editContent.value ? `${editContent.value} ${transcript}` : transcript;
        isRecordingEditNote.value = false;
      }
    },
    onError: () => {
      isRecordingEditNote.value = false;
    },
    onEnd: () => {
      isRecordingEditNote.value = false;
    }
  });
}

async function saveProjectNoteChanges() {
  if (!selectedProjectNote.value) return;
  await notesStore.updateNote(selectedProjectNote.value.id, {
    title: editTitle.value.trim() || appStore.t.notes.untitledNote,
    content: editContent.value.trim(),
    images: [],
  });
  closeProjectNoteEditor();
}

async function deleteSelectedProjectNote() {
  if (!selectedProjectNote.value) return;
  if (confirm(appStore.t.notes.deleteConfirm)) {
    await notesStore.deleteNote(selectedProjectNote.value.id);
    closeProjectNoteEditor();
  }
}

function handleToggleSpeech(note: Note, e?: Event) {
  e?.stopPropagation();
  if (currentlySpeakingId.value === note.id && getIsSpeaking()) {
    stopSpeaking();
    currentlySpeakingId.value = null;
  } else {
    stopSpeaking();
    const fullText = `${note.title}. ${note.content}`;
    speakText(fullText, appStore.settings.language === 'en' ? 'en-US' : 'ru-RU');
    currentlySpeakingId.value = note.id;
  }
}

async function toggleTaskStatus(taskId: string) {
  await tasksStore.toggleTaskStatus(taskId);
  if (activeProject.value) {
    const tasks = tasksStore.getProjectTasks(activeProject.value.id);
    const completed = tasks.filter(t => t.status === 'completed').length;
    const progress = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
    await projectsStore.updateProject(activeProject.value.id, { progress });
  }
}

async function handleDeleteProject() {
  if (!activeProject.value) return;
  if (confirm(appStore.t.projects.deleteConfirm)) {
    await projectsStore.deleteProject(activeProject.value.id);
  }
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString(appStore.settings.language, {
    month: 'short',
    day: 'numeric',
  });
}
</script>

<template>
  <div class="space-y-5 py-2">
    <!-- 1. PROJECTS LIST VIEW (When no project is open) -->
    <div v-if="!activeProject" class="space-y-5">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-zinc-900 tracking-tight">{{ appStore.t.projects.title }}</h1>
          <p class="text-xs text-zinc-500 mt-0.5">{{ appStore.t.projects.subtitle }}</p>
        </div>

        <button
          class="w-10 h-10 rounded-2xl bg-white border border-mensor-border flex items-center justify-center text-zinc-700 shadow-soft hover:bg-zinc-50 active:scale-95 transition"
          @click="appStore.openNewItemModal({ type: 'project' })"
          aria-label="New Project"
        >
          <Plus class="w-4 h-4 text-mensor-red" />
        </button>
      </div>

      <!-- Projects Grid (Adaptive 3 columns on tablet) -->
      <div v-if="projectsStore.projects.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="p in projectsStore.projects"
          :key="p.id"
          class="bg-white rounded-3xl p-5 border border-mensor-border/80 shadow-soft hover:shadow-float transition cursor-pointer active:scale-[0.99] flex flex-col justify-between h-48"
          @click="projectsStore.openProject(p.id)"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <span
                class="w-3.5 h-3.5 rounded-full ring-4 ring-zinc-50"
                :style="{ backgroundColor: p.color || '#E11D48' }"
              />
              <span class="text-[11px] font-bold text-zinc-400">
                {{ notesStore.getProjectNotes(p.id).length }} {{ appStore.t.projects.notesWord }}
              </span>
            </div>

            <h3 class="text-base font-bold text-zinc-900 line-clamp-1 mb-1">{{ p.title }}</h3>
            <p class="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{{ p.description || appStore.t.projects.noDescription }}</p>
          </div>

          <div>
            <div class="flex items-center justify-between text-xs font-semibold text-zinc-600 mb-1.5">
              <span>{{ appStore.t.projects.progress }}</span>
              <span class="font-bold text-zinc-900">{{ getProjectProgress(p.id) }}%</span>
            </div>
            <div class="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
              <div
                class="h-2 rounded-full transition-all duration-500 ease-out"
                :style="{ width: `${getProjectProgress(p.id)}%`, backgroundColor: p.color || '#E11D48' }"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="p-8 rounded-3xl bg-white border border-dashed border-zinc-200 text-center shadow-soft"
      >
        <FolderPlus class="w-10 h-10 text-zinc-300 mx-auto mb-2" />
        <p class="text-xs text-zinc-500">{{ appStore.t.projects.emptyProjects }}</p>
        <button
          class="mt-3 text-xs font-semibold text-mensor-red hover:underline"
          @click="appStore.openNewItemModal({ type: 'project' })"
        >
          {{ appStore.t.projects.createFirstProject }}
        </button>
      </div>
    </div>

    <!-- 2. ISOLATED PROJECT WORKSPACE (When project is clicked) -->
    <div v-else class="space-y-4">
      <!-- Workspace Navigation Bar -->
      <div class="flex items-center justify-between">
        <button
          class="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-black bg-white px-3 py-2 rounded-2xl border border-mensor-border/80 shadow-soft transition active:scale-95"
          @click="projectsStore.activeProjectId = null"
        >
          <ArrowLeft class="w-3.5 h-3.5" />
          <span>{{ appStore.t.projects.allProjects }}</span>
        </button>

        <div class="flex items-center gap-2">
          <!-- Edit Project Button -->
          <button
            class="w-9 h-9 rounded-2xl bg-zinc-100 text-zinc-700 hover:bg-zinc-200 flex items-center justify-center transition active:scale-95"
            @click="openEditProjectModal"
            :title="appStore.t.projects.editProject"
            :aria-label="appStore.t.projects.editProject"
          >
            <Edit3 class="w-4 h-4" />
          </button>

          <!-- Delete Project Button -->
          <button
            class="w-9 h-9 rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition active:scale-95"
            @click="handleDeleteProject"
            :title="appStore.t.projects.deleteProject"
            :aria-label="appStore.t.projects.deleteProject"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Project Header Card with Automated Dynamic Progress & Edit capability -->
      <div class="p-6 rounded-3xl bg-white border border-mensor-border/80 shadow-soft space-y-4">
        <div class="flex items-start gap-3">
          <span
            class="w-4 h-4 rounded-full mt-1 shrink-0 ring-4 ring-zinc-50 cursor-pointer"
            :style="{ backgroundColor: activeProject.color || '#E11D48' }"
            @click="openEditProjectModal"
            :title="appStore.t.projects.editProject"
          />
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <h2 class="text-lg font-bold text-zinc-900 leading-tight">{{ activeProject.title }}</h2>
              <button
                class="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
                @click="openEditProjectModal"
                :title="appStore.t.projects.editProject"
              >
                <Edit3 class="w-3.5 h-3.5" />
              </button>
            </div>
            <p class="text-xs text-zinc-500 mt-1 leading-relaxed">{{ activeProject.description || appStore.t.projects.noDescription }}</p>
          </div>
        </div>

        <!-- Automated Calculated Progress Bar (Zero Manual Slider) -->
        <div>
          <div class="flex items-center justify-between text-xs font-semibold text-zinc-600 mb-1.5">
            <span>{{ appStore.t.projects.progressLabel }}</span>
            <span class="font-bold text-zinc-900">
              {{ activeProjectProgress }}%
              <span class="font-normal text-zinc-400 text-[11px]">
                ({{ projectTasks.filter(t => t.status === 'completed').length }}/{{ projectTasks.length }} {{ appStore.t.projects.tasksWord }})
              </span>
            </span>
          </div>
          <div class="w-full bg-zinc-100 rounded-full h-2.5 overflow-hidden">
            <div
              class="h-2.5 rounded-full transition-all duration-500 ease-out"
              :style="{ width: `${activeProjectProgress}%`, backgroundColor: activeProject.color || '#E11D48' }"
            />
          </div>
        </div>
      </div>

      <!-- Sub Tabs: Project Notes vs Project Tasks -->
      <div class="flex gap-2">
        <button
          class="flex-1 py-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5"
          :class="activeSubTab === 'notes' ? 'bg-white shadow-soft text-rose-600 border border-rose-200' : 'bg-zinc-100/70 text-zinc-500 hover:bg-zinc-100'"
          @click="activeSubTab = 'notes'"
        >
          <FileText class="w-3.5 h-3.5" />
          <span>{{ appStore.t.projects.projectNotesTab }} ({{ projectNotes.length }})</span>
        </button>

        <button
          class="flex-1 py-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5"
          :class="activeSubTab === 'tasks' ? 'bg-white shadow-soft text-emerald-600 border border-emerald-200' : 'bg-zinc-100/70 text-zinc-500 hover:bg-zinc-100'"
          @click="activeSubTab = 'tasks'"
        >
          <CheckSquare class="w-3.5 h-3.5" />
          <span>{{ appStore.t.projects.projectTasksTab }} ({{ projectTasks.length }})</span>
        </button>
      </div>

      <!-- 1. PROJECT NOTES (ISOLATED) -->
      <div v-if="activeSubTab === 'notes'" class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs text-zinc-500 font-medium">{{ appStore.t.projects.projectNotesSection }}</span>
          <button
            class="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded-xl transition"
            @click="appStore.openNewItemModal({ type: 'note', projectId: activeProject.id })"
          >
            <Plus class="w-3.5 h-3.5" />
            <span>{{ appStore.t.projects.addNoteToProject }}</span>
          </button>
        </div>

        <div v-if="projectNotes.length > 0" class="space-y-2.5 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-3">
          <div
            v-for="note in projectNotes"
            :key="note.id"
            class="p-4 rounded-2xl bg-white border border-mensor-border/80 shadow-soft hover:shadow-float transition cursor-pointer active:scale-[0.99] flex flex-col justify-between"
            @click="openProjectNote(note)"
          >
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <h4 class="text-xs font-bold text-zinc-900 line-clamp-1">{{ note.title || appStore.t.notes.untitledNote }}</h4>
                <button
                  class="w-6 h-6 rounded-full flex items-center justify-center transition"
                  :class="[
                    currentlySpeakingId === note.id
                      ? 'bg-mensor-red text-white'
                      : 'text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100'
                  ]"
                  @click="handleToggleSpeech(note, $event)"
                  :title="appStore.t.notes.speakText"
                >
                  <VolumeX v-if="currentlySpeakingId === note.id" class="w-3.5 h-3.5" />
                  <Volume2 v-else class="w-3.5 h-3.5" />
                </button>
              </div>
              <p class="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">{{ note.content }}</p>
            </div>
            <div class="flex items-center justify-between mt-3 pt-2 border-t border-zinc-100 text-[10px] text-zinc-400">
              <span>{{ formatDate(note.updatedAt) }}</span>
            </div>
          </div>
        </div>

        <div v-else class="p-8 rounded-3xl bg-white border border-dashed border-zinc-200 text-center shadow-soft">
          <p class="text-xs text-zinc-400">{{ appStore.t.projects.emptyProjectNotes }}</p>
          <button
            class="mt-2.5 text-xs font-semibold text-mensor-red hover:underline"
            @click="appStore.openNewItemModal({ type: 'note', projectId: activeProject.id })"
          >
            {{ appStore.t.projects.createFirstNoteInProject }}
          </button>
        </div>
      </div>

      <!-- 2. PROJECT TASKS (ISOLATED) -->
      <div v-else class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs text-zinc-500 font-medium">{{ appStore.t.projects.projectTasksSection }}</span>
          <button
            class="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-xl transition"
            @click="appStore.openNewItemModal({ type: 'task', projectId: activeProject.id })"
          >
            <Plus class="w-3.5 h-3.5" />
            <span>{{ appStore.t.projects.addTaskToProject }}</span>
          </button>
        </div>

        <div v-if="projectTasks.length > 0" class="space-y-2.5 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-3">
          <div
            v-for="task in projectTasks"
            :key="task.id"
            class="flex items-center justify-between p-4 rounded-2xl bg-white border border-mensor-border/80 shadow-soft cursor-pointer hover:border-zinc-300 transition"
            @click="tasksStore.activeEditingTask = task"
          >
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <button
                type="button"
                class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition shrink-0"
                :class="task.status === 'completed' ? 'bg-zinc-900 border-zinc-900 text-white' : 'border-zinc-300'"
                @click.stop="toggleTaskStatus(task.id)"
              >
                <Check v-if="task.status === 'completed'" class="w-3 h-3 stroke-[3]" />
              </button>
              <div class="min-w-0 flex-1">
                <h5
                  class="text-xs font-bold text-zinc-900 truncate"
                  :class="{ 'line-through text-zinc-400': task.status === 'completed' }"
                >
                  {{ task.title }}
                </h5>
                <p v-if="task.description" class="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">{{ task.description }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-[10px] text-zinc-400">{{ task.date }} • {{ task.timeSlot || appStore.t.schedule.allDay }}</span>
                  <span
                    class="text-[9px] font-bold px-2 py-0.5 rounded-md"
                    :class="[
                      task.priority === 'high' ? 'bg-rose-100 text-rose-700' :
                      task.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    ]"
                  >
                    {{ formatPriority(task.priority) }}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              class="p-1 rounded-full text-zinc-300 hover:text-zinc-600 hover:bg-zinc-100 transition shrink-0"
              @click.stop="tasksStore.activeEditingTask = task"
              :title="appStore.t.schedule.editTask"
            >
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div v-else class="p-8 rounded-3xl bg-white border border-dashed border-zinc-200 text-center shadow-soft">
          <p class="text-xs text-zinc-400">{{ appStore.t.projects.emptyProjectTasks }}</p>
          <button
            class="mt-2.5 text-xs font-semibold text-emerald-600 hover:underline"
            @click="appStore.openNewItemModal({ type: 'task', projectId: activeProject.id })"
          >
            {{ appStore.t.projects.createFirstTaskInProject }}
          </button>
        </div>
      </div>

      <!-- EDIT PROJECT DETAILS MODAL -->
      <div
        v-if="isEditingProject && activeProject"
        class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        <div class="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-zinc-200">
          <!-- Header -->
          <div class="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
            <h3 class="text-base font-bold text-zinc-900">{{ appStore.t.projects.editProjectTitle }}</h3>
            <button
              class="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-black transition"
              @click="isEditingProject = false"
            >
              <X class="w-4 h-4" />
            </button>
          </div>

          <!-- Body -->
          <div class="p-5 flex-1 overflow-y-auto space-y-4">
            <div>
              <label class="block text-[11px] font-semibold text-zinc-500 mb-1.5">{{ appStore.t.newItem.projectTitlePlaceholder }}</label>
              <input
                type="text"
                v-model="editProjectTitle"
                :placeholder="appStore.t.projects.projectTitlePlaceholder"
                class="w-full text-sm font-semibold px-3.5 py-2.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-mensor-red"
              />
            </div>

            <div>
              <label class="block text-[11px] font-semibold text-zinc-500 mb-1.5">{{ appStore.t.newItem.projectDescPlaceholder }}</label>
              <textarea
                v-model="editProjectDescription"
                rows="3"
                :placeholder="appStore.t.projects.projectDescPlaceholder"
                class="w-full text-xs text-zinc-700 leading-relaxed rounded-2xl border border-zinc-200 p-3.5 focus:outline-none focus:border-mensor-red"
              ></textarea>
            </div>

            <div>
              <label class="block text-[11px] font-semibold text-zinc-500 mb-1.5">{{ appStore.t.projects.projectColorLabel }}</label>
              <div class="flex gap-2.5">
                <button
                  v-for="c in ['#E11D48', '#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#18181B']"
                  :key="c"
                  type="button"
                  class="w-7 h-7 rounded-full border-2 transition"
                  :style="{ backgroundColor: c }"
                  :class="editProjectColor === c ? 'border-black scale-110 shadow-sm' : 'border-transparent'"
                  @click="editProjectColor = c"
                />
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-4 border-t border-zinc-100 bg-zinc-50/50 flex items-center justify-end gap-2">
            <button
              class="px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 transition"
              @click="isEditingProject = false"
            >
              {{ appStore.t.common.cancel }}
            </button>
            <button
              class="px-6 py-2.5 bg-mensor-dark text-white rounded-xl text-xs font-semibold shadow-soft hover:bg-black transition"
              @click="saveProjectDetails"
            >
              {{ appStore.t.projects.saveChanges }}
            </button>
          </div>
        </div>
      </div>

      <!-- Note Full Viewer & Editor Modal for Project Notes -->
      <div
        v-if="isEditingProjectNote && selectedProjectNote"
        class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        <div class="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-zinc-200">
          <!-- Top bar -->
          <div class="px-5 py-3.5 border-b border-zinc-100 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button
                class="w-8 h-8 rounded-full flex items-center justify-center transition"
                :class="[
                  currentlySpeakingId === selectedProjectNote.id
                    ? 'bg-mensor-red text-white animate-pulse'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                ]"
                @click="handleToggleSpeech(selectedProjectNote)"
                :title="appStore.t.notes.speakText"
              >
                <VolumeX v-if="currentlySpeakingId === selectedProjectNote.id" class="w-4 h-4" />
                <Volume2 v-else class="w-4 h-4" />
              </button>
              <span class="text-xs text-zinc-400 font-medium">{{ appStore.t.projects.projectNoteLabel }}</span>
            </div>

            <div class="flex items-center gap-1.5">
              <button
                class="w-8 h-8 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition"
                @click="deleteSelectedProjectNote"
                :title="appStore.t.notes.delete"
              >
                <Trash2 class="w-4 h-4" />
              </button>
              <button
                class="w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 hover:text-black flex items-center justify-center transition"
                @click="closeProjectNoteEditor"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Editor Body -->
          <div class="p-5 flex-1 overflow-y-auto space-y-4">
            <input
              type="text"
              v-model="editTitle"
              :placeholder="appStore.t.notes.titlePlaceholder"
              class="w-full text-base font-bold text-zinc-900 border-b border-zinc-200 pb-2 focus:outline-none focus:border-mensor-red"
            />

            <div class="relative">
              <textarea
                v-model="editContent"
                rows="6"
                :placeholder="appStore.t.notes.contentPlaceholder"
                class="w-full text-xs text-zinc-700 leading-relaxed rounded-2xl border border-zinc-200 p-3.5 pr-10 focus:outline-none focus:border-mensor-red"
              ></textarea>
              <!-- STT Voice Input button -->
              <button
                type="button"
                class="absolute right-3 bottom-4 w-7 h-7 rounded-full flex items-center justify-center transition"
                :class="isRecordingEditNote ? 'bg-mensor-red text-white animate-pulse' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'"
                @click="handleVoiceInputEditNote"
                :title="appStore.t.notes.voiceInput"
              >
                <Mic class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-4 border-t border-zinc-100 bg-zinc-50/50 flex items-center justify-end gap-2">
            <button
              class="px-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-600 hover:bg-zinc-100"
              @click="closeProjectNoteEditor"
            >
              {{ appStore.t.common.cancel }}
            </button>
            <button
              class="px-6 py-2.5 bg-mensor-dark text-white rounded-xl text-xs font-semibold shadow-soft hover:bg-black transition"
              @click="saveProjectNoteChanges"
            >
              {{ appStore.t.projects.saveChanges }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
