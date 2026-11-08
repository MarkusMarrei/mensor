import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Task, TaskStatus } from '../types';
import { db } from '../db';
import { generateUUID } from '../utils/uuid';

export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);
  const selectedDate = ref<string>(getTodayDateString());
  const activeEditingTask = ref<Task | null>(null);

  const todayTasks = computed(() => {
    const today = getTodayDateString();
    return tasks.value.filter(t => t.date === today);
  });

  const selectedDayTasks = computed(() => {
    return tasks.value
      .filter(t => t.date === selectedDate.value)
      .sort((a, b) => (a.timeSlot || '99:99').localeCompare(b.timeSlot || '99:99'));
  });

  // Count completed vs total tasks for current week
  const weekStats = computed(() => {
    const now = new Date();
    const dayOfWeek = now.getDay() || 7; // 1 = Mon, 7 = Sun
    const monday = new Date(now);
    monday.setDate(now.getDate() - dayOfWeek + 1);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const weekTasks = tasks.value.filter(t => {
      const taskDate = new Date(t.date);
      return taskDate >= monday && taskDate <= sunday;
    });

    const completed = weekTasks.filter(t => t.status === 'completed').length;
    return {
      total: weekTasks.length,
      completed,
      percentage: weekTasks.length > 0 ? Math.round((completed / weekTasks.length) * 100) : 0,
    };
  });

  async function loadTasks() {
    tasks.value = await db.tasks.toArray();
  }

  async function addTask(taskData: Omit<Task, 'id' | 'createdAt' | 'completedAt'>): Promise<Task> {
    const newTask: Task = {
      ...taskData,
      id: generateUUID(),
      createdAt: Date.now(),
      completedAt: taskData.status === 'completed' ? Date.now() : null,
    };
    await db.tasks.put(newTask);
    tasks.value.push(newTask);
    return newTask;
  }

  async function updateTask(id: string, updates: Partial<Task>): Promise<void> {
    await db.tasks.update(id, updates);
    const idx = tasks.value.findIndex(t => t.id === id);
    if (idx !== -1) {
      tasks.value[idx] = { ...tasks.value[idx], ...updates };
    }
  }

  async function toggleTaskStatus(id: string): Promise<void> {
    const task = tasks.value.find(t => t.id === id);
    if (!task) return;

    const newStatus: TaskStatus = task.status === 'completed' ? 'pending' : 'completed';
    const completedAt = newStatus === 'completed' ? Date.now() : null;

    await updateTask(id, { status: newStatus, completedAt });
  }

  async function deleteTask(id: string): Promise<void> {
    await db.tasks.delete(id);
    tasks.value = tasks.value.filter(t => t.id !== id);
  }

  function getProjectTasks(projectId: string): Task[] {
    return tasks.value.filter(t => t.projectId === projectId);
  }

  async function deleteProjectTasks(projectId: string): Promise<void> {
    const toDelete = tasks.value.filter(t => t.projectId === projectId).map(t => t.id);
    if (toDelete.length > 0) {
      await db.tasks.bulkDelete(toDelete);
      tasks.value = tasks.value.filter(t => t.projectId !== projectId);
    }
  }

  return {
    tasks,
    selectedDate,
    activeEditingTask,
    todayTasks,
    selectedDayTasks,
    weekStats,
    loadTasks,
    addTask,
    updateTask,
    toggleTaskStatus,
    deleteTask,
    getProjectTasks,
    deleteProjectTasks,
  };
});
