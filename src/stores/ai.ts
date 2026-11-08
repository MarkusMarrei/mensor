import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AIMessage, AIProvider } from '../types';
import { db } from '../db';
import { useNotesStore } from './notes';
import { useTasksStore, getTodayDateString } from './tasks';
import { useProjectsStore } from './projects';
import { useAppStore } from './app';

export const useAIStore = defineStore('ai', () => {
  const messages = ref<AIMessage[]>([]);
  const isGenerating = ref(false);
  const showModelModal = ref(false);

  async function loadHistory() {
    messages.value = await db.messages.orderBy('timestamp').toArray();
  }

  // Build the intelligent, compressed system context (Smart Consultant)
  function buildSystemSnapshot(): string {
    const appStore = useAppStore();
    const tasksStore = useTasksStore();
    const projectsStore = useProjectsStore();
    const notesStore = useNotesStore();

    const now = new Date();
    const dateStr = now.toLocaleDateString(appStore.settings.language, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Projects summary
    const projectsSummary = projectsStore.projects.map(p => {
      const pNotes = notesStore.getProjectNotes(p.id);
      const pTasks = tasksStore.getProjectTasks(p.id);
      return `- Проект "${p.title}" (Прогресс: ${p.progress}%, Записей: ${pNotes.length}, Задач: ${pTasks.length})`;
    }).join('\n') || 'Нет активных проектов.';

    // Today's tasks summary
    const today = getTodayDateString();
    const todayTasksList = tasksStore.tasks.filter(t => t.date === today);
    const completedTasks = todayTasksList.filter(t => t.status === 'completed');
    const pendingTasks = todayTasksList.filter(t => t.status !== 'completed');

    const tasksSummary = `
Задачи на сегодня (${dateStr}, ${timeStr}):
- Выполнено: ${completedTasks.length}
- В ожидании: ${pendingTasks.length}
${pendingTasks.map(t => `  • [${t.timeSlot || 'Без времени'}] ${t.title} (Приоритет: ${t.priority})`).join('\n') || '  • Все задачи выполнены!'}
`;

    // High-level Standalone Notes summary
    const recentNotes = notesStore.standaloneNotes.slice(0, 5).map(n => `• "${n.title}": ${n.content.slice(0, 80)}...`).join('\n') || 'Нет записей.';

    return `Ты — Mensor AI, умный персональный консультант и ассистент по проектам, заметкам и задачам.
ТЕКУЩЕЕ ВРЕМЯ: ${dateStr}, ${timeStr}.

СВОДКА ПРОЕКТОВ ПОЛЬЗОВАТЕЛЯ:
${projectsSummary}

СВОДКА РАСПИСАНИЯ:
${tasksSummary}

НЕДАВНИЕ СВОБОДНЫЕ ЗАПИСИ:
${recentNotes}

ИНСТРУКЦИЯ:
1. Отвечай кратко, доброжелательно, структурированно и по делу.
2. Ты видишь реальные задачи, проекты и заметки пользователя. Помогай планировать время, расставлять приоритеты и находить нужную информацию.
3. Всегда учитывай текущее время и статус выполнения задач.
`;
  }

  async function sendMessage(userText: string): Promise<void> {
    if (!userText.trim() || isGenerating.value) return;

    const userMsg: AIMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userText.trim(),
      timestamp: Date.now(),
    };

    messages.value.push(userMsg);
    await db.messages.put(userMsg);

    isGenerating.value = true;

    try {
      const appStore = useAppStore();
      const systemPrompt = buildSystemSnapshot();

      // Recent 4 messages for sliding context window
      const contextHistory = messages.value.slice(-5);

      let replyContent = '';

      // If user has configured an external API / LAN server (e.g. LM Studio, Ollama, OpenRouter)
      if (appStore.settings.aiBaseUrl && appStore.settings.aiApiKey) {
        try {
          const res = await fetch(`${appStore.settings.aiBaseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${appStore.settings.aiApiKey}`,
            },
            body: JSON.stringify({
              model: appStore.settings.aiSelectedModel || 'google/gemma-3-1b-it',
              messages: [
                { role: 'system', content: systemPrompt },
                ...contextHistory.map(m => ({ role: m.role, content: m.content })),
              ],
              temperature: 0.7,
              max_tokens: 500,
            }),
          });
          const data = await res.json();
          replyContent = data.choices?.[0]?.message?.content || 'Не удалось получить ответ от сервера.';
        } catch (apiErr) {
          console.warn('API call failed, falling back to local heuristic response', apiErr);
          replyContent = generateLocalConsultantResponse(userText);
        }
      } else {
        // Local intelligent heuristic & fast Edge model simulation
        await new Promise(r => setTimeout(r, 600)); // Smooth typing simulation
        replyContent = generateLocalConsultantResponse(userText);
      }

      const assistantMsg: AIMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: replyContent,
        timestamp: Date.now(),
      };

      messages.value.push(assistantMsg);
      await db.messages.put(assistantMsg);
    } catch (err) {
      console.error('Failed to generate AI response', err);
    } finally {
      isGenerating.value = false;
    }
  }

  function generateLocalConsultantResponse(query: string): string {
    const q = query.toLowerCase();
    const tasksStore = useTasksStore();
    const projectsStore = useProjectsStore();
    const notesStore = useNotesStore();

    const today = getTodayDateString();
    const todayTasks = tasksStore.tasks.filter(t => t.date === today);
    const pendingTasks = todayTasks.filter(t => t.status !== 'completed');

    if (q.includes('задач') || q.includes('план') || q.includes('сегодня') || q.includes('task') || q.includes('schedule')) {
      if (todayTasks.length === 0) {
        return `На сегодня задач в расписании пока нет. Отличное время, чтобы запланировать новые цели или продвинуться по текущим проектам!`;
      }
      return `На сегодня запланировано задач: **${todayTasks.length}** (осталось выполнить: **${pendingTasks.length}**).\n\n` +
        pendingTasks.map((t, idx) => `${idx + 1}. **${t.title}** ${t.timeSlot ? `в ${t.timeSlot}` : ''} [${t.priority}]`).join('\n') +
        `\n\nРекомендую начать с задач с высоким приоритетом!`;
    }

    if (q.includes('проект') || q.includes('project') || q.includes('саммари')) {
      if (projectsStore.projects.length === 0) {
        return `У вас пока нет активных проектов. Вы можете создать проект во вкладке «Проекты», чтобы вести изолированные заметки и задачи.`;
      }
      return `У вас сейчас **${projectsStore.projects.length}** проекта(ов):\n\n` +
        projectsStore.projects.map(p => {
          const notesCount = notesStore.getProjectNotes(p.id).length;
          return `📁 **${p.title}** — прогресс: **${p.progress}%**, заметок внутри: **${notesCount}**`;
        }).join('\n');
    }

    if (q.includes('запис') || q.includes('заметк') || q.includes('мысл') || q.includes('note')) {
      return `В общем списке у вас **${notesStore.standaloneNotes.length}** записок. Напомню, что проектные заметки изолированы и доступны внутри каждого проекта. Если нужно найти что-то конкретное, просто назовите тему или ключевое слово!`;
    }

    return `Я проанализировал ваши текущие задачи и проекты. У вас активно **${projectsStore.projects.length}** проекта(ов) и **${pendingTasks.length}** незакрытых задач на сегодня. Чем я могу помочь детально: составить план, сделать выжимку по заметкам или приоритизировать дела?`;
  }

  async function clearMemory(): Promise<void> {
    await db.messages.clear();
    messages.value = [];
  }

  function setProvider(provider: AIProvider, model: string) {
    const appStore = useAppStore();
    appStore.settings.aiProvider = provider;
    appStore.settings.aiSelectedModel = model;
    showModelModal.value = false;
  }

  return {
    messages,
    isGenerating,
    showModelModal,
    loadHistory,
    sendMessage,
    clearMemory,
    setProvider,
    buildSystemSnapshot,
  };
});
