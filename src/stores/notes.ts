import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Note } from '../types';
import { db } from '../db';
import { generateUUID } from '../utils/uuid';

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([]);
  const searchQuery = ref('');
  const activeEditingNote = ref<Note | null>(null);

  // Standalone notes (NOT belonging to any project)
  const standaloneNotes = computed(() => {
    return notes.value.filter(n => !n.projectId || n.projectId === 'null' || n.projectId === '');
  });

  // Filtered standalone notes
  const filteredStandaloneNotes = computed(() => {
    const q = searchQuery.value.toLowerCase().trim();
    if (!q) return standaloneNotes.value;
    return standaloneNotes.value.filter(
      n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  });

  async function loadNotes() {
    notes.value = await db.notes.orderBy('updatedAt').reverse().toArray();
  }

  // Get notes for a specific project
  function getProjectNotes(projectId: string) {
    return notes.value.filter(n => n.projectId === projectId);
  }

  async function addNote(noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    const now = Date.now();
    const cleanProjectId = (noteData.projectId && noteData.projectId !== 'null' && noteData.projectId !== '') ? noteData.projectId : null;
    const newNote: Note = {
      ...noteData,
      projectId: cleanProjectId,
      id: generateUUID(),
      createdAt: now,
      updatedAt: now,
    };
    await db.notes.put(newNote);
    notes.value.unshift(newNote);
    return newNote;
  }

  async function updateNote(id: string, updates: Partial<Note>): Promise<void> {
    const now = Date.now();
    await db.notes.update(id, { ...updates, updatedAt: now });
    const idx = notes.value.findIndex(n => n.id === id);
    if (idx !== -1) {
      notes.value[idx] = { ...notes.value[idx], ...updates, updatedAt: now };
    }
  }

  async function deleteNote(id: string): Promise<void> {
    await db.notes.delete(id);
    notes.value = notes.value.filter(n => n.id !== id);
  }

  async function deleteProjectNotes(projectId: string): Promise<void> {
    const toDelete = notes.value.filter(n => n.projectId === projectId).map(n => n.id);
    if (toDelete.length > 0) {
      await db.notes.bulkDelete(toDelete);
      notes.value = notes.value.filter(n => n.projectId !== projectId);
    }
  }

  return {
    notes,
    searchQuery,
    activeEditingNote,
    standaloneNotes,
    filteredStandaloneNotes,
    loadNotes,
    getProjectNotes,
    addNote,
    updateNote,
    deleteNote,
    deleteProjectNotes,
  };
});
