<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAppStore } from '../../stores/app';
import { useProjectsStore } from '../../stores/projects';
import { useTasksStore } from '../../stores/tasks';
import { Check, ChevronRight, ArrowRight, FolderKanban } from 'lucide-vue-next';

const appStore = useAppStore();
const projectsStore = useProjectsStore();
const tasksStore = useTasksStore();

const now = new Date();

const activeHeroSlide = ref(0);
const heroCarouselRef = ref<HTMLDivElement | null>(null);

function scrollToSlide(index: number) {
  activeHeroSlide.value = index;
  if (heroCarouselRef.value) {
    const slideWidth = heroCarouselRef.value.clientWidth;
    heroCarouselRef.value.scrollTo({
      left: index * slideWidth,
      behavior: 'smooth',
    });
  }
}

function handleHeroScroll(e: Event) {
  const el = e.target as HTMLDivElement;
  if (!el) return;
  const slideWidth = el.clientWidth;
  if (slideWidth > 0) {
    const newIndex = Math.round(el.scrollLeft / slideWidth);
    if (newIndex !== activeHeroSlide.value) {
      activeHeroSlide.value = newIndex;
    }
  }
}

const currentDayOfWeek = computed(() => {
  return now.toLocaleDateString(appStore.settings.language, { weekday: 'long' });
});

const currentFormattedDate = computed(() => {
  const day = now.getDate();
  const month = now.toLocaleDateString(appStore.settings.language, { month: 'short' });
  const year = now.getFullYear();
  return `${day} ${month} ${year}`;
});

const todayStats = computed(() => {
  const total = tasksStore.todayTasks.length;
  const completed = tasksStore.todayTasks.filter(t => t.status === 'completed').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { total, completed, percentage };
});

const monthActivity = computed(() => {
  const currentYear = now.getFullYear();
  const currentMonthIdx = now.getMonth();

  // Dynamically aggregate completed tasks from Dexie database for current year
  const monthCounts = new Array(12).fill(0);
  tasksStore.tasks.forEach(t => {
    if (t.status === 'completed' && t.date) {
      const taskDate = new Date(t.date);
      if (taskDate.getFullYear() === currentYear) {
        const m = taskDate.getMonth();
        if (m >= 0 && m < 12) {
          monthCounts[m]++;
        }
      }
    }
  });

  const maxTasks = Math.max(1, ...monthCounts);
  const ruMonths = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

  return ruMonths.map((ru, idx) => {
    let monthLabel = ru;
    try {
      const d = new Date(currentYear, idx, 1);
      const loc = d.toLocaleDateString(appStore.settings.language, { month: 'short' });
      const cleaned = loc.replace('.', '').trim();
      monthLabel = cleaned.charAt(0).toUpperCase() + cleaned.slice(1, 3);
    } catch {
      monthLabel = ru;
    }

    const count = monthCounts[idx];
    const heightPct = count > 0 ? Math.round((count / maxTasks) * 100) : 0;

    return {
      month: monthLabel,
      tasks: count,
      heightPct: Math.max(16, heightPct),
      current: idx === currentMonthIdx,
    };
  });
});

const yearStats = computed(() => {
  const currentYear = now.getFullYear();
  const completedInYear = tasksStore.tasks.filter(t => {
    if (t.status !== 'completed' || !t.date) return false;
    return new Date(t.date).getFullYear() === currentYear;
  }).length;

  const totalInYear = tasksStore.tasks.filter(t => {
    if (!t.date) return false;
    return new Date(t.date).getFullYear() === currentYear;
  }).length;

  const rate = totalInYear > 0 ? Math.round((completedInYear / totalInYear) * 100) : 0;

  return {
    year: currentYear,
    completedTasks: completedInYear,
    activeProjects: projectsStore.projects.filter(p => p.status === 'in_progress').length,
    productivityRate: rate,
  };
});

function openProject(id: string) {
  projectsStore.openProject(id);
  appStore.currentTab = 'projects';
}

function getProjectProgress(projectId: string): number {
  const tasks = tasksStore.getProjectTasks(projectId);
  if (tasks.length === 0) return 0;
  const completed = tasks.filter(t => t.status === 'completed').length;
  return Math.round((completed / tasks.length) * 100);
}
</script>

<template>
  <div class="space-y-6">
    <!-- Hero Banner with Swipeable Carousel (Week/Today Slide + Year Statistics Slide) -->
    <div class="relative overflow-hidden rounded-3xl bg-zinc-900 text-white shadow-float">
      <!-- Background subtle gradient/shapes -->
      <div class="absolute inset-0 bg-gradient-to-tr from-black via-zinc-900 to-zinc-800 opacity-90 pointer-events-none" />
      <div class="absolute -right-8 -top-8 w-44 h-44 bg-mensor-red/20 rounded-full blur-2xl pointer-events-none" />

      <!-- Horizontal Swipeable Container -->
      <div
        ref="heroCarouselRef"
        class="flex overflow-x-auto snap-x snap-mandatory no-scrollbar scrollbar-none scroll-smooth relative z-10"
        @scroll="handleHeroScroll"
      >
        <!-- SLIDE 1: Week Summary & Today's Circular Ring -->
        <div class="w-full shrink-0 snap-center p-5 flex flex-col justify-between min-h-[200px] space-y-3">
          <!-- Top row -->
          <div class="flex items-center justify-between gap-3">
            <!-- Left: Week stats -->
            <div class="flex flex-col justify-center">
              <span class="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">{{ appStore.t.dashboard.weekSummaryTitle }}</span>
              <div class="flex items-baseline gap-1.5 my-1">
                <span class="text-3xl font-black tracking-tight text-white">{{ tasksStore.weekStats.completed }}/{{ tasksStore.weekStats.total }}</span>
                <span class="text-xs text-zinc-400 font-medium">{{ appStore.t.dashboard.tasksWord }}</span>
              </div>
              <div class="text-[11px] text-zinc-400">{{ appStore.t.dashboard.forThisWeek }}</div>
            </div>

            <!-- Right: Circular progress ring & Date details -->
            <div class="flex items-center gap-3 bg-zinc-800/90 backdrop-blur-md rounded-2xl py-2.5 px-3.5 border border-white/10 shadow-soft shrink-0">
              <!-- SVG Circular Ring -->
              <div class="relative w-14 h-14 shrink-0 flex items-center justify-center">
                <svg class="w-14 h-14 -rotate-90" viewBox="0 0 64 64">
                  <!-- Track -->
                  <circle
                    cx="32"
                    cy="32"
                    r="25"
                    stroke="rgba(255, 255, 255, 0.12)"
                    stroke-width="5"
                    fill="none"
                  />
                  <!-- Progress Arc -->
                  <circle
                    cx="32"
                    cy="32"
                    r="25"
                    stroke="url(#heroRingGradient)"
                    stroke-width="5.5"
                    stroke-dasharray="157.08"
                    :stroke-dashoffset="157.08 * (1 - todayStats.percentage / 100)"
                    stroke-linecap="round"
                    fill="none"
                    class="transition-all duration-700 ease-out"
                  />
                  <defs>
                    <linearGradient id="heroRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#FB7185" />
                      <stop offset="100%" stop-color="#E11D48" />
                    </linearGradient>
                  </defs>
                </svg>

                <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span class="text-xs font-black text-white leading-none tracking-tight">
                    {{ todayStats.completed }}/{{ todayStats.total }}
                  </span>
                </div>
              </div>

              <!-- Date & Day Info -->
              <div class="flex flex-col justify-center text-left">
                <span class="text-[10px] font-bold text-rose-400 uppercase tracking-wider leading-none mb-1 capitalize">
                  {{ currentDayOfWeek }}
                </span>
                <span class="text-xs font-extrabold text-white leading-none mb-1">
                  {{ currentFormattedDate }}
                </span>
                <span class="text-[10px] text-zinc-400 font-medium leading-none">
                  {{ todayStats.percentage }}% {{ appStore.t.dashboard.todayWord }}
                </span>
              </div>
            </div>
          </div>

          <!-- Bottom row: Week progress bar -->
          <div>
            <div class="w-full bg-zinc-800/80 rounded-full h-2 mb-2 overflow-hidden">
              <div
                class="bg-gradient-to-r from-mensor-red to-rose-400 h-2 rounded-full transition-all duration-500 shadow-sm"
                :style="{ width: `${tasksStore.weekStats.percentage}%` }"
              />
            </div>

            <div class="flex items-center justify-between text-xs font-semibold">
              <span class="text-zinc-300">{{ appStore.t.dashboard.keepGoing }}</span>
              <button
                class="flex items-center gap-1 text-white hover:text-mensor-red transition"
                @click="appStore.currentTab = 'schedule'"
              >
                <span>{{ tasksStore.weekStats.percentage }}%</span>
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- SLIDE 2: Year in Review (2026) with Monthly Activity Bar Chart -->
        <div class="w-full shrink-0 snap-center p-5 flex flex-col justify-between min-h-[200px] space-y-3">
          <!-- Top row -->
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">{{ appStore.t.dashboard.yearSummaryTitle }}</span>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-2xl font-black text-white tracking-tight">2026</span>
                <span class="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  ↑ +{{ yearStats.productivityRate }}% {{ appStore.t.dashboard.pace }}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-2 text-right">
              <div class="text-[11px] text-zinc-300 font-medium">
                <div>{{ appStore.t.dashboard.completedWord }} <span class="font-bold text-white">{{ yearStats.completedTasks }} {{ appStore.t.dashboard.tasksWord }}</span></div>
                <div>{{ appStore.t.dashboard.projectsWord }} <span class="font-bold text-rose-400">{{ yearStats.activeProjects }} {{ appStore.t.dashboard.inProgressWord }}</span></div>
              </div>
            </div>
          </div>

          <!-- 12-Month Activity Bar Chart with vertical columns & task numbers -->
          <div class="bg-zinc-800/80 backdrop-blur-md rounded-2xl p-2.5 border border-white/10 shadow-soft">
            <div class="flex items-end justify-between gap-1 h-24 px-1 pb-0.5">
              <div
                v-for="(m, idx) in monthActivity"
                :key="idx"
                class="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer relative"
              >
                <!-- Task count on top of bar -->
                <span
                  class="text-[9px] font-black leading-none mb-1 transition-transform group-hover:scale-125"
                  :class="[
                    m.current
                      ? 'text-rose-400 font-black'
                      : m.tasks > 0
                      ? 'text-zinc-200 group-hover:text-white font-bold'
                      : 'opacity-0'
                  ]"
                >
                  {{ m.tasks > 0 ? m.tasks : '' }}
                </span>

                <!-- Bar Column Track -->
                <div class="w-full flex justify-center items-end" style="height: 52px;">
                  <div
                    class="w-full max-w-[16px] rounded-t-[4px] transition-all duration-500 ease-out"
                    :class="[
                      m.current
                        ? 'bg-gradient-to-t from-mensor-red via-rose-500 to-rose-400 shadow-md shadow-rose-900/50 ring-1 ring-rose-300'
                        : m.tasks > 0
                        ? 'bg-gradient-to-t from-zinc-600 via-zinc-400 to-zinc-200 group-hover:from-rose-500/80 group-hover:to-rose-300'
                        : 'bg-white/10 h-1 rounded-full'
                    ]"
                    :style="{ height: m.tasks > 0 ? `${m.heightPct}%` : '4px' }"
                    :title="`${m.month}: ${m.tasks} задач`"
                  />
                </div>

                <!-- Baseline / Highlight pill -->
                <div class="w-full flex justify-center my-1">
                  <div
                    class="transition-all duration-300"
                    :class="[
                      m.current
                        ? 'w-full h-1 bg-mensor-red rounded-full shadow-sm'
                        : 'w-full h-[1px] bg-white/15'
                    ]"
                  />
                </div>

                <!-- Month Name -->
                <span
                  class="text-[9px] leading-none transition-colors"
                  :class="[
                    m.current
                      ? 'text-rose-400 font-black'
                      : m.tasks > 0
                      ? 'text-zinc-300 font-semibold group-hover:text-white'
                      : 'text-zinc-500 font-normal'
                  ]"
                >
                  {{ m.month }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide Indicator Dots (Clickable & Swipe visual feedback) -->
      <div class="flex items-center justify-center gap-1.5 pb-2.5 pt-0 relative z-10">
        <button
          class="transition-all duration-300 rounded-full"
          :class="activeHeroSlide === 0 ? 'w-5 h-1.5 bg-mensor-red shadow-sm' : 'w-1.5 h-1.5 bg-zinc-600 hover:bg-zinc-400'"
          @click="scrollToSlide(0)"
          aria-label="Слайд 1: Неделя и день"
        />
        <button
          class="transition-all duration-300 rounded-full"
          :class="activeHeroSlide === 1 ? 'w-5 h-1.5 bg-mensor-red shadow-sm' : 'w-1.5 h-1.5 bg-zinc-600 hover:bg-zinc-400'"
          @click="scrollToSlide(1)"
          aria-label="Слайд 2: Статистика года"
        />
      </div>
    </div>

    <!-- Current Projects Section -->
    <div>
      <div class="flex items-center justify-between mb-3.5">
        <h2 class="text-base font-bold text-zinc-900">{{ appStore.t.dashboard.currentProjects }}</h2>
        <button
          class="text-xs font-medium text-zinc-500 hover:text-black flex items-center gap-1 transition"
          @click="appStore.currentTab = 'projects'"
        >
          <span>{{ appStore.t.dashboard.seeAll }}</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </button>
      </div>

      <!-- Horizontal Carousel on phone, responsive grid on tablet -->
      <div
        v-if="projectsStore.projects.length > 0"
        class="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-3.5 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar scrollbar-none snap-x"
      >
        <div
          v-for="p in projectsStore.projects"
          :key="p.id"
          class="w-48 sm:w-auto shrink-0 rounded-3xl p-4 bg-white border border-mensor-border/80 shadow-soft snap-start flex flex-col justify-between h-44 hover:shadow-float transition cursor-pointer active:scale-[0.98]"
          @click="openProject(p.id)"
        >
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[10px] font-semibold text-emerald-700 border border-emerald-200/50">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{{ appStore.t.projects.inProgress }}</span>
              </span>
              <span
                class="w-2.5 h-2.5 rounded-full"
                :style="{ backgroundColor: p.color || '#E11D48' }"
              />
            </div>

            <h3 class="text-sm font-bold text-zinc-900 line-clamp-1 mt-1">{{ p.title }}</h3>
            <p class="text-[11px] text-zinc-400 line-clamp-2 mt-0.5">{{ p.description || appStore.t.projects.noDescription }}</p>
          </div>

          <div>
            <div class="flex items-center justify-between text-[11px] font-semibold text-zinc-500 mb-1.5">
              <span>{{ appStore.t.projects.progress }}</span>
              <span class="text-zinc-900 font-bold">{{ getProjectProgress(p.id) }}%</span>
            </div>
            <div class="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
              <div
                class="bg-mensor-red h-1.5 rounded-full transition-all duration-300"
                :style="{ width: `${getProjectProgress(p.id)}%` }"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="p-6 rounded-3xl bg-white border border-dashed border-zinc-200 text-center shadow-soft"
      >
        <FolderKanban class="w-8 h-8 text-zinc-300 mx-auto mb-2" />
        <p class="text-xs text-zinc-500">{{ appStore.t.dashboard.emptyProjects }}</p>
        <button
          class="mt-3 text-xs font-semibold text-mensor-red hover:underline"
          @click="appStore.openNewItemModal({ type: 'project' })"
        >
          {{ appStore.t.dashboard.createFirstProject }}
        </button>
      </div>
    </div>

    <!-- Today's Tasks Section -->
    <div>
      <div class="flex items-center justify-between mb-3.5">
        <h2 class="text-base font-bold text-zinc-900">{{ appStore.t.dashboard.todayTasks }}</h2>
        <span class="text-xs font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
          {{ tasksStore.todayTasks.length }} {{ appStore.t.dashboard.tasksWord }}
        </span>
      </div>

      <div v-if="tasksStore.todayTasks.length > 0" class="space-y-2.5 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-3">
        <div
          v-for="task in tasksStore.todayTasks"
          :key="task.id"
          class="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-mensor-border/80 shadow-soft transition hover:border-zinc-300"
        >
          <div class="flex items-center gap-3">
            <button
              class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all"
              :class="[
                task.status === 'completed'
                  ? 'bg-zinc-900 border-zinc-900 text-white'
                  : 'border-zinc-300 hover:border-zinc-500'
              ]"
              @click.stop="tasksStore.toggleTaskStatus(task.id)"
            >
              <Check v-if="task.status === 'completed'" class="w-3.5 h-3.5 stroke-[3]" />
            </button>

            <div>
              <h4
                class="text-xs font-bold text-zinc-900 transition-all"
                :class="{ 'line-through text-zinc-400': task.status === 'completed' }"
              >
                {{ task.title }}
              </h4>
              <div class="flex items-center gap-2 mt-0.5 text-[10px] text-zinc-400">
                <span v-if="task.timeSlot">{{ task.timeSlot }}</span>
                <span v-if="task.timeSlot && task.priority">•</span>
                <span
                  :class="{
                    'text-red-500 font-semibold': task.priority === 'high',
                    'text-amber-500 font-semibold': task.priority === 'medium',
                    'text-zinc-400': task.priority === 'low'
                  }"
                >
                  {{ appStore.t.schedule[task.priority] || task.priority }}
                </span>
              </div>
            </div>
          </div>

          <ChevronRight class="w-4 h-4 text-zinc-300" />
        </div>
      </div>

      <div
        v-else
        class="p-6 rounded-3xl bg-white border border-dashed border-zinc-200 text-center shadow-soft"
      >
        <p class="text-xs text-zinc-500">{{ appStore.t.dashboard.emptyTasks }}</p>
      </div>

      <!-- Doodle quote from reference -->
      <div class="pt-2 text-right">
        <span class="text-[11px] font-medium text-zinc-400 italic">{{ appStore.t.dashboard.quoteBottom }}</span>
      </div>
    </div>
  </div>
</template>
