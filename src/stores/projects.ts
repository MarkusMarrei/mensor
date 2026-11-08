import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Project } from '../types';
import { db } from '../db';
import { useNotesStore } from './notes';
import { useTasksStore } from './tasks';
import { generateUUID } from '../utils/uuid';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([]);
  const activeProjectId = ref<string | null>(null);
  const activeEditingProject = ref<Project | null>(null);

  async function loadProjects() {
    projects.value = await db.projects.orderBy('updatedAt').reverse().toArray();
  }

  async function addProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const now = Date.now();
    const newProject: Project = {
      ...projectData,
      id: generateUUID(),
      createdAt: now,
      updatedAt: now,
    };
    await db.projects.put(newProject);
    projects.value.unshift(newProject);
    return newProject;
  }

  async function updateProject(id: string, updates: Partial<Project>): Promise<void> {
    const now = Date.now();
    await db.projects.update(id, { ...updates, updatedAt: now });
    const idx = projects.value.findIndex(p => p.id === id);
    if (idx !== -1) {
      projects.value[idx] = { ...projects.value[idx], ...updates, updatedAt: now };
    }
  }

  // Cascading delete: deletes project + its private notes + its tasks
  async function deleteProject(id: string): Promise<void> {
    const notesStore = useNotesStore();
    const tasksStore = useTasksStore();

    await notesStore.deleteProjectNotes(id);
    await tasksStore.deleteProjectTasks(id);
    await db.projects.delete(id);

    projects.value = projects.value.filter(p => p.id !== id);
    if (activeProjectId.value === id) {
      activeProjectId.value = null;
    }
  }

  function openProject(id: string) {
    activeProjectId.value = id;
  }

  function closeProject() {
    activeProjectId.value = null;
  }

  return {
    projects,
    activeProjectId,
    activeEditingProject,
    loadProjects,
    addProject,
    updateProject,
    deleteProject,
    openProject,
    closeProject,
  };
});
