<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAppStore } from '../../stores/app';
import { useNotesStore } from '../../stores/notes';
import { useProjectsStore } from '../../stores/projects';
import { speakText, stopSpeaking, getIsSpeaking } from '../../utils/tts';
import { startSpeechRecognition } from '../../utils/stt';
import type { Note } from '../../types';
import {
  Search,
  Plus,
  Volume2,
  VolumeX,
  Trash2,
  FileText,
  Calendar,
  Mic,
  X
} from 'lucide-vue-next';

const appStore = useAppStore();
const notesStore = useNotesStore();
const projectsStore = useProjectsStore();

const currentlySpeakingId = ref<string | null>(null);
const selectedNote = ref<Note | null>(null);
const isEditing = ref(false);

const editTitle = ref('');
const editContent = ref('');
const isRecordingVoice = ref(false);

onMounted(async () => {
  await notesStore.loadNotes();
});

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

function openNote(note: Note) {
  selectedNote.value = note;
  editTitle.value = note.title;
  editContent.value = note.content;
  isEditing.value = true;
}

function closeEditor() {
  isEditing.value = false;
  selectedNote.value = null;
  stopSpeaking();
  currentlySpeakingId.value = null;
  isRecordingVoice.value = false;
}

function handleVoiceInput() {
  if (isRecordingVoice.value) {
    isRecordingVoice.value = false;
    return;
  }
  isRecordingVoice.value = true;
  startSpeechRecognition({
    lang: appStore.settings.language === 'en' ? 'en-US' : 'ru-RU',
    onResult: (transcript, isFinal) => {
      if (isFinal) {
        editContent.value = editContent.value ? `${editContent.value} ${transcript}` : transcript;
        isRecordingVoice.value = false;
      }
    },
    onError: () => {
      isRecordingVoice.value = false;
    },
    onEnd: () => {
      isRecordingVoice.value = false;
    }
  });
}

async function saveNoteChanges() {
  if (!selectedNote.value) return;
  await notesStore.updateNote(selectedNote.value.id, {
    title: editTitle.value.trim() || appStore.t.notes.untitledNote,
    content: editContent.value.trim(),
    images: [],
  });
  closeEditor();
}

async function handleDeleteNote(id: string) {
  if (confirm(appStore.t.notes.delete + '?')) {
    await notesStore.deleteNote(id);
    closeEditor();
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
  <div class="space-y-4 py-2">
    <!-- Header with Search and New Note Button -->
    <div class="flex items-center gap-3">
      <div class="relative flex-1">
        <Search class="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          v-model="notesStore.searchQuery"
          :placeholder="appStore.t.notes.searchPlaceholder"
          class="w-full text-xs pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-zinc-200/80 focus:outline-none focus:border-mensor-red shadow-xs transition"
        />
      </div>

      <button
        class="h-10 px-3.5 rounded-2xl bg-zinc-900 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:bg-black active:scale-95 transition"
        @click="appStore.openNewItemModal({ type: 'note' })"
      >
        <Plus class="w-4 h-4 stroke-[2.5]" />
        <span>{{ appStore.t.notes.newNote }}</span>
      </button>
    </div>

    <!-- Notes List (Responsive card grid on tablet) -->
    <div v-if="notesStore.filteredStandaloneNotes.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
      <div
        v-for="note in notesStore.filteredStandaloneNotes"
        :key="note.id"
        class="p-4 rounded-3xl bg-white border border-zinc-200/70 shadow-xs hover:shadow-soft transition-all cursor-pointer space-y-2.5 active:scale-[0.99] flex flex-col justify-between"
        @click="openNote(note)"
      >
        <div class="flex items-start justify-between gap-2">
          <h3 class="text-sm font-bold text-zinc-900 line-clamp-1">
            {{ note.title || appStore.t.notes.untitledNote }}
          </h3>

          <!-- TTS listen button -->
          <button
            class="w-7 h-7 rounded-full flex items-center justify-center transition shrink-0"
            :class="[
              currentlySpeakingId === note.id
                ? 'bg-mensor-red text-white animate-pulse'
                : 'bg-zinc-100 text-zinc-500 hover:text-black hover:bg-zinc-200'
            ]"
            @click="handleToggleSpeech(note, $event)"
            :title="appStore.t.notes.speakText"
          >
            <VolumeX v-if="currentlySpeakingId === note.id" class="w-3.5 h-3.5" />
            <Volume2 v-else class="w-3.5 h-3.5" />
          </button>
        </div>

        <div class="space-y-1.5">
          <div class="flex items-center gap-2 text-[11px] text-zinc-400">
            <span class="flex items-center gap-1">
              <Calendar class="w-3 h-3" />
              <span>{{ formatDate(note.updatedAt) }}</span>
            </span>
            <span v-if="note.projectId" class="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-medium">
              📁 {{ projectsStore.projects.find((p: any) => p.id === note.projectId)?.title || appStore.t.projects.title }}
            </span>
          </div>

          <!-- Note Content Excerpt -->
          <p class="text-xs text-zinc-600 line-clamp-3 leading-relaxed">
            {{ note.content || appStore.t.notes.untitledNote }}
          </p>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="p-10 rounded-3xl bg-white border border-dashed border-zinc-200 text-center shadow-soft"
    >
      <div class="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-3 text-zinc-400">
        <FileText class="w-6 h-6" />
      </div>
      <h4 class="text-sm font-bold text-zinc-700 mb-1">{{ appStore.t.notes.emptyNotes }}</h4>
      <p class="text-xs text-zinc-400 mb-4">{{ appStore.t.notes.emptyNotesDesc }}</p>
      <button
        class="text-xs font-semibold px-4 py-2 bg-mensor-red text-white rounded-xl shadow-soft hover:bg-mensor-red-hover transition"
        @click="appStore.openNewItemModal({ type: 'note' })"
      >
        {{ appStore.t.notes.createFirstNote }}
      </button>
    </div>

    <!-- Detail / Edit Note Modal -->
    <div
      v-if="isEditing && selectedNote"
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div class="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-zinc-200">
        <!-- Header -->
        <div class="px-5 py-3.5 border-b border-zinc-100 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <button
              class="w-8 h-8 rounded-full flex items-center justify-center transition"
              :class="[
                currentlySpeakingId === selectedNote.id
                  ? 'bg-mensor-red text-white animate-pulse'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              ]"
              @click="handleToggleSpeech(selectedNote)"
              :title="appStore.t.notes.speakText"
            >
              <VolumeX v-if="currentlySpeakingId === selectedNote.id" class="w-4 h-4" />
              <Volume2 v-else class="w-4 h-4" />
            </button>
            <span class="text-xs text-zinc-400 font-medium">{{ appStore.t.common.edit }}</span>
          </div>

          <div class="flex items-center gap-1.5">
            <button
              class="w-8 h-8 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition"
              @click="handleDeleteNote(selectedNote.id)"
              :title="appStore.t.common.delete"
            >
              <Trash2 class="w-4 h-4" />
            </button>
            <button
              class="w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 hover:text-black flex items-center justify-center transition"
              @click="closeEditor"
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
              rows="9"
              :placeholder="appStore.t.notes.contentPlaceholder"
              class="w-full text-xs text-zinc-700 leading-relaxed rounded-2xl border border-zinc-200 p-3.5 pr-10 focus:outline-none focus:border-mensor-red"
            ></textarea>
            <!-- STT Voice Input button -->
            <button
              type="button"
              class="absolute right-3 bottom-4 w-7 h-7 rounded-full flex items-center justify-center transition"
              :class="isRecordingVoice ? 'bg-mensor-red text-white animate-pulse' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'"
              @click="handleVoiceInput"
              :title="appStore.t.notes.voiceInput"
            >
              <Mic class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-zinc-100 bg-zinc-50 flex items-center justify-end gap-2">
          <button
            class="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 hover:bg-zinc-200 transition"
            @click="closeEditor"
          >
            {{ appStore.t.common.cancel }}
          </button>
          <button
            class="px-5 py-2 rounded-xl text-xs font-semibold bg-mensor-red text-white hover:bg-mensor-red-hover transition shadow-sm active:scale-95"
            @click="saveNoteChanges"
          >
            {{ appStore.t.common.save }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
