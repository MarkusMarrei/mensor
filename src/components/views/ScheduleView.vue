<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAppStore } from '../../stores/app';
import { useTasksStore, getTodayDateString } from '../../stores/tasks';
import { useProjectsStore } from '../../stores/projects';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check, Plus } from 'lucide-vue-next';

const appStore = useAppStore();
const tasksStore = useTasksStore();
const projectsStore = useProjectsStore();

const currentDate = ref(new Date());

// Format month name and year e.g. "Ноябрь 2026"
const monthYearTitle = computed(() => {
  return currentDate.value.toLocaleDateString(appStore.settings.language, {
    month: 'long',
    year: 'numeric',
  });
});

// Generate 7 days centered on or around current week
const weekDays = computed(() => {
  const current = new Date(currentDate.value);
  const dayOfWeek = current.getDay() || 7; // 1 = Mon, 7 = Sun
  const monday = new Date(current);
  monday.setDate(current.getDate() - dayOfWeek + 1);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const iso = `${year}-${month}-${day}`;

    const shortDayName = d.toLocaleDateString(appStore.settings.language, { weekday: 'short' });

    days.push({
      dateObj: d,
      iso,
      dayNum: d.getDate(),
      dayName: shortDayName,
      isToday: iso === getTodayDateString(),
      isSelected: iso === tasksStore.selectedDate,
    });
  }
  return days;
});

function selectDay(iso: string) {
  tasksStore.selectedDate = iso;
}

function nextWeek() {
  const d = new Date(currentDate.value);
  d.setDate(d.getDate() + 7);
  currentDate.value = d;
}

function prevWeek() {
  const d = new Date(currentDate.value);
  d.setDate(d.getDate() - 7);
  currentDate.value = d;
}

function getProjectTitle(projectId?: string | null): string {
  if (!projectId) return 'Общее';
  const p = projectsStore.projects.find(proj => proj.id === projectId);
  return p ? p.title : 'Проект';
}
</script>

<template>
  <div class="space-y-5 py-2">
    <!-- Schedule Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-zinc-900 tracking-tight">{{ appStore.t.schedule.title }}</h1>
        <p class="text-xs text-zinc-500 mt-0.5">{{ appStore.t.schedule.subtitle }}</p>
      </div>

      <button
        class="w-10 h-10 rounded-2xl bg-white border border-mensor-border flex items-center justify-center text-zinc-700 shadow-soft hover:bg-zinc-50 active:scale-95 transition"
        @click="appStore.openNewItemModal({ type: 'task' })"
        aria-label="Add task"
      >
        <CalendarIcon class="w-4 h-4 text-mensor-red" />
      </button>
    </div>

    <!-- Month & Week Navigation -->
    <div class="bg-white rounded-3xl p-4 border border-mensor-border/80 shadow-soft">
      <div class="flex items-center justify-between mb-3.5 px-1">
        <div class="flex items-center gap-2">
          <span class="text-sm font-bold text-zinc-900 capitalize">{{ monthYearTitle }}</span>
          <span class="text-[11px] font-medium text-zinc-400 italic">Good day :)</span>
        </div>
        <div class="flex items-center gap-1">
          <button
            class="w-7 h-7 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-500"
            @click="prevWeek"
          >
            <ChevronLeft class="w-4 h-4" />
          </button>
          <button
            class="w-7 h-7 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-500"
            @click="nextWeek"
          >
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Week Days Strip -->
      <div class="grid grid-cols-7 gap-1.5 text-center">
        <button
          v-for="d in weekDays"
          :key="d.iso"
          class="py-2.5 px-1 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center"
          :class="[
            d.isSelected
              ? 'bg-zinc-900 text-white shadow-soft font-bold scale-105'
              : 'hover:bg-zinc-50 text-zinc-700'
          ]"
          @click="selectDay(d.iso)"
        >
          <span
            class="text-[10px] uppercase tracking-wider mb-1"
            :class="d.isSelected ? 'text-zinc-300' : 'text-zinc-400'"
          >
            {{ d.dayName }}
          </span>
          <span class="text-sm font-extrabold leading-none">{{ d.dayNum }}</span>
          <span
            v-if="d.isToday && !d.isSelected"
            class="w-1.5 h-1.5 rounded-full bg-mensor-red mt-1"
          />
        </button>
      </div>
    </div>

    <!-- Day Timeline Tasks -->
    <div class="space-y-3">
      <div class="flex items-center justify-between px-1">
        <span class="text-xs font-bold text-zinc-800 uppercase tracking-wider">
          План на выбранный день
        </span>
        <button
          class="text-xs font-semibold text-mensor-red hover:underline flex items-center gap-1"
          @click="appStore.openNewItemModal({ type: 'task' })"
        >
          <Plus class="w-3.5 h-3.5" />
          <span>{{ appStore.t.schedule.addTask }}</span>
        </button>
      </div>

      <div v-if="tasksStore.selectedDayTasks.length > 0" class="space-y-3">
        <div
          v-for="task in tasksStore.selectedDayTasks"
          :key="task.id"
          class="flex items-start gap-3.5"
        >
          <!-- Time slot column -->
          <div class="w-14 text-right pt-2 shrink-0">
            <span class="text-[11px] font-bold text-zinc-500">
              {{ task.timeSlot || 'Весь день' }}
            </span>
          </div>

          <!-- Task Card (Styled with subtle sage/warm tint when active) -->
          <div
            class="flex-1 rounded-3xl p-4 border transition-all duration-200"
            :class="[
              task.status === 'completed'
                ? 'bg-zinc-50 border-zinc-200 opacity-60'
                : task.priority === 'high'
                ? 'bg-rose-50/50 border-rose-200 shadow-soft'
                : 'bg-white border-mensor-border/80 shadow-soft'
            ]"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-start gap-2.5">
                <button
                  class="w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 transition"
                  :class="[
                    task.status === 'completed'
                      ? 'bg-zinc-900 border-zinc-900 text-white'
                      : 'border-zinc-300 hover:border-zinc-600'
                  ]"
                  @click="tasksStore.toggleTaskStatus(task.id)"
                >
                  <Check v-if="task.status === 'completed'" class="w-3 h-3 stroke-[3]" />
                </button>

                <div>
                  <h3
                    class="text-xs font-bold text-zinc-900 leading-snug"
                    :class="{ 'line-through text-zinc-400': task.status === 'completed' }"
                  >
                    {{ task.title }}
                  </h3>

                  <div class="flex items-center gap-2 mt-1 text-[10px] text-zinc-400">
                    <span class="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 font-medium">
                      {{ getProjectTitle(task.projectId) }}
                    </span>
                    <span
                      class="font-semibold"
                      :class="{
                        'text-red-500': task.priority === 'high',
                        'text-amber-500': task.priority === 'medium',
                        'text-zinc-400': task.priority === 'low'
                      }"
                    >
                      {{ task.priority }}
                    </span>
                  </div>

                  <p
                    v-if="task.description"
                    class="text-[11px] text-zinc-600 mt-2 bg-white/70 p-2.5 rounded-xl border border-zinc-100"
                  >
                    {{ task.description }}
                  </p>
                </div>
              </div>

              <button
                class="text-zinc-300 hover:text-red-500 text-xs transition p-1"
                @click="tasksStore.deleteTask(task.id)"
                title="Удалить задачу"
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="p-8 rounded-3xl bg-white border border-dashed border-zinc-200 text-center shadow-soft"
      >
        <p class="text-xs text-zinc-500">{{ appStore.t.schedule.noTasksForDay }}</p>
        <button
          class="mt-3 text-xs font-semibold text-mensor-red hover:underline"
          @click="appStore.openNewItemModal({ type: 'task' })"
        >
          + Запланировать задачу на этот день
        </button>
      </div>
    </div>
  </div>
</template>
