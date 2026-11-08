<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAppStore } from '../../stores/app';
import { useTasksStore, getTodayDateString } from '../../stores/tasks';
import { useProjectsStore } from '../../stores/projects';
import type { Priority, TaskStatus } from '../../types';
import { X, Trash2, Check, Clock } from 'lucide-vue-next';

const appStore = useAppStore();
const tasksStore = useTasksStore();
const projectsStore = useProjectsStore();

const task = tasksStore.activeEditingTask;

const editTitle = ref(task?.title || '');
const editDescription = ref(task?.description || '');
const editDate = ref(task?.date || getTodayDateString());
const editTimeSlot = ref(task?.timeSlot || '10:00');
const editPriority = ref<Priority>(task?.priority || 'medium');
const editProjectId = ref<string | null>(task?.projectId || null);
const editStatus = ref<TaskStatus>(task?.status || 'pending');

watch(
  () => tasksStore.activeEditingTask,
  (current) => {
    if (current) {
      editTitle.value = current.title;
      editDescription.value = current.description || '';
      editDate.value = current.date || getTodayDateString();
      editTimeSlot.value = current.timeSlot || '10:00';
      editPriority.value = current.priority;
      editProjectId.value = current.projectId || null;
      editStatus.value = current.status;
    }
  },
  { immediate: true }
);

function closeModal() {
  tasksStore.activeEditingTask = null;
}

function formatPriorityLabel(p: Priority): string {
  const word = appStore.t.schedule[p] || p;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function toggleStatus() {
  editStatus.value = editStatus.value === 'completed' ? 'pending' : 'completed';
}

async function handleSave() {
  const currentTask = tasksStore.activeEditingTask;
  if (!currentTask) return;
  if (!editTitle.value.trim()) return;

  const oldProjId = currentTask.projectId;
  const newProjId = (editProjectId.value && editProjectId.value !== 'null' && editProjectId.value !== '')
    ? editProjectId.value
    : null;

  const completedAt = editStatus.value === 'completed'
    ? (currentTask.completedAt || Date.now())
    : null;

  await tasksStore.updateTask(currentTask.id, {
    title: editTitle.value.trim(),
    description: editDescription.value.trim(),
    date: editDate.value || getTodayDateString(),
    timeSlot: editTimeSlot.value || '10:00',
    priority: editPriority.value,
    projectId: newProjId,
    status: editStatus.value,
    completedAt,
  });

  // Recalculate progress for any affected projects
  const affectedProjects = new Set<string>();
  if (oldProjId) affectedProjects.add(oldProjId);
  if (newProjId) affectedProjects.add(newProjId);

  for (const pid of affectedProjects) {
    const projTasks = tasksStore.getProjectTasks(pid);
    const completed = projTasks.filter(t => t.status === 'completed').length;
    const progress = projTasks.length > 0 ? Math.round((completed / projTasks.length) * 100) : 0;
    await projectsStore.updateProject(pid, { progress });
  }

  closeModal();
}

async function handleDelete() {
  const currentTask = tasksStore.activeEditingTask;
  if (!currentTask) return;

  if (confirm(appStore.t.schedule.deleteTaskConfirm)) {
    const projId = currentTask.projectId;
    await tasksStore.deleteTask(currentTask.id);

    if (projId) {
      const projTasks = tasksStore.getProjectTasks(projId);
      const completed = projTasks.filter(t => t.status === 'completed').length;
      const progress = projTasks.length > 0 ? Math.round((completed / projTasks.length) * 100) : 0;
      await projectsStore.updateProject(projId, { progress });
    }

    closeModal();
  }
}
</script>

<template>
  <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-zinc-200">
      <!-- Header -->
      <div class="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
        <h3 class="text-base font-bold text-zinc-900">{{ appStore.t.schedule.editTask }}</h3>
        <div class="flex items-center gap-1.5">
          <button
            class="w-8 h-8 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition"
            @click="handleDelete"
            :title="appStore.t.common.delete"
          >
            <Trash2 class="w-4 h-4" />
          </button>
          <button
            class="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-black transition"
            @click="closeModal"
            :title="appStore.t.common.cancel"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Form Body -->
      <div class="p-5 flex-1 overflow-y-auto space-y-4">
        <!-- Status Toggle Banner -->
        <button
          type="button"
          class="w-full flex items-center justify-between p-3 rounded-2xl border transition text-left"
          :class="editStatus === 'completed' ? 'border-emerald-200 bg-emerald-50/80 text-emerald-900' : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700'"
          @click="toggleStatus"
        >
          <div class="flex items-center gap-2.5">
            <div
              class="w-6 h-6 rounded-full flex items-center justify-center transition"
              :class="editStatus === 'completed' ? 'bg-emerald-600 text-white' : 'border-2 border-zinc-400 bg-white'"
            >
              <Check v-if="editStatus === 'completed'" class="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <div>
              <div class="text-xs font-bold">
                {{ editStatus === 'completed' ? appStore.t.schedule.statusCompleted : appStore.t.schedule.statusPending }}
              </div>
              <div class="text-[10px] text-zinc-500">
                {{ editStatus === 'completed' ? (task?.completedAt ? new Date(task.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '') : editTimeSlot }}
              </div>
            </div>
          </div>
          <span class="text-[11px] font-semibold text-zinc-500 flex items-center gap-1">
            <Clock class="w-3.5 h-3.5" />
            <span>{{ appStore.t.common.edit }}</span>
          </span>
        </button>

        <!-- Task Title -->
        <div>
          <label class="block text-[11px] font-medium text-zinc-500 mb-1">{{ appStore.t.schedule.title }}</label>
          <input
            type="text"
            v-model="editTitle"
            :placeholder="appStore.t.newItem.taskTitlePlaceholder"
            class="w-full text-sm font-semibold px-3.5 py-2.5 rounded-2xl border border-zinc-200 focus:outline-none focus:border-mensor-red"
          />
        </div>

        <!-- Task Description -->
        <div>
          <label class="block text-[11px] font-medium text-zinc-500 mb-1">{{ appStore.t.schedule.taskDetails }}</label>
          <textarea
            v-model="editDescription"
            rows="3"
            :placeholder="appStore.t.newItem.taskDescPlaceholder"
            class="w-full text-xs px-3.5 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-mensor-red leading-relaxed"
          ></textarea>
        </div>

        <!-- Date & Time -->
        <div class="grid grid-cols-2 gap-2.5">
          <div>
            <label class="block text-[11px] font-medium text-zinc-500 mb-1">{{ appStore.t.newItem.dateLabel }}</label>
            <input
              type="date"
              v-model="editDate"
              class="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none bg-white font-medium"
            />
          </div>
          <div>
            <label class="block text-[11px] font-medium text-zinc-500 mb-1">{{ appStore.t.newItem.timeLabel }}</label>
            <input
              type="time"
              v-model="editTimeSlot"
              class="w-full text-xs px-3 py-2 rounded-xl border border-zinc-200 focus:outline-none bg-white font-medium"
            />
          </div>
        </div>

        <!-- Priority Selector -->
        <div>
          <label class="block text-[11px] font-medium text-zinc-500 mb-1.5">{{ appStore.t.newItem.priorityLabel }}</label>
          <div class="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              class="py-2 rounded-xl border font-semibold transition"
              :class="editPriority === 'low' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500' : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'"
              @click="editPriority = 'low'"
            >
              {{ formatPriorityLabel('low') }}
            </button>
            <button
              type="button"
              class="py-2 rounded-xl border font-semibold transition"
              :class="editPriority === 'medium' ? 'border-amber-500 bg-amber-50 text-amber-700 ring-1 ring-amber-500' : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'"
              @click="editPriority = 'medium'"
            >
              {{ formatPriorityLabel('medium') }}
            </button>
            <button
              type="button"
              class="py-2 rounded-xl border font-semibold transition"
              :class="editPriority === 'high' ? 'border-rose-500 bg-rose-50 text-rose-700 ring-1 ring-rose-500' : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'"
              @click="editPriority = 'high'"
            >
              {{ formatPriorityLabel('high') }}
            </button>
          </div>
        </div>

        <!-- Project Association Dropdown -->
        <div v-if="projectsStore.projects.length > 0">
          <label class="block text-[11px] font-medium text-zinc-500 mb-1">{{ appStore.t.newItem.taskProjectLabel }}</label>
          <select
            v-model="editProjectId"
            class="w-full text-xs px-3 py-2.5 rounded-xl border border-zinc-200 focus:outline-none bg-white font-medium"
          >
            <option :value="null">{{ appStore.t.newItem.noProject }}</option>
            <option v-for="p in projectsStore.projects" :key="p.id" :value="p.id">
              📁 {{ p.title }}
            </option>
          </select>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="p-4 border-t border-zinc-100 bg-zinc-50/50 flex items-center gap-2">
        <button
          class="flex-1 py-2.5 bg-zinc-100 text-zinc-700 rounded-2xl font-semibold text-xs hover:bg-zinc-200 transition active:scale-[0.98]"
          @click="closeModal"
        >
          {{ appStore.t.common.cancel }}
        </button>
        <button
          class="flex-1 py-2.5 bg-mensor-red text-white rounded-2xl font-semibold text-xs shadow-float hover:bg-rose-700 transition active:scale-[0.98]"
          @click="handleSave"
        >
          {{ appStore.t.schedule.saveTask }}
        </button>
      </div>
    </div>
  </div>
</template>
