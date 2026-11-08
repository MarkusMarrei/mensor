import Dexie, { type Table } from 'dexie';
import type { Note, Task, Project, AppSettings, AIMessage } from '../types';

export class MensorDatabase extends Dexie {
  notes!: Table<Note, string>;
  tasks!: Table<Task, string>;
  projects!: Table<Project, string>;
  settings!: Table<AppSettings, string>;
  messages!: Table<AIMessage, string>;

  constructor() {
    super('MensorDatabase');

    this.version(1).stores({
      notes: 'id, title, projectId, createdAt, updatedAt, *tags',
      tasks: 'id, title, date, status, priority, projectId, createdAt',
      projects: 'id, title, status, progress, createdAt, updatedAt',
      settings: 'id, language, securityType',
      messages: 'id, role, timestamp',
    });
  }
}

export const db = new MensorDatabase();

// Initial default settings
export const DEFAULT_SETTINGS: AppSettings = {
  id: 'current_settings',
  language: 'ru',
  isFirstLaunch: true,
  securityType: 'none',
  pinHash: null,
  biometricsEnabled: false,
  aiProvider: 'local_gemma3',
  aiSelectedModel: 'gemma-3-1b-it',
  downloadedModels: [],
  userName: 'User',
  userFirstName: 'User',
  userLastName: '',
  userBio: 'Focus on what matters. Step by step.',
  userAvatar: null,
};

export async function getAppSettings(): Promise<AppSettings> {
  const existing = await db.settings.get('current_settings');
  if (existing) {
    return existing;
  }
  await db.settings.put(DEFAULT_SETTINGS);
  return DEFAULT_SETTINGS;
}

export async function updateAppSettings(updates: Partial<AppSettings>): Promise<AppSettings> {
  const current = await getAppSettings();
  const updated = { ...current, ...updates };
  await db.settings.put(updated);
  return updated;
}
