// Mensor Types Definition

export type LanguageCode = 'ru' | 'en' | 'es' | 'de' | 'fr' | 'pt' | 'it' | 'ja' | 'ko';

export type SecurityType = 'none' | 'biometric' | 'pin';

export type Priority = 'low' | 'medium' | 'high';

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export type ProjectStatus = 'planning' | 'in_progress' | 'completed' | 'on_hold';

export type AIProvider = 'local_gemma3' | 'local_gemma4' | 'custom_api' | 'lan_server';

export interface Note {
  id: string;
  title: string;
  content: string;
  projectId?: string | null; // If null, this is an independent standalone note
  images: string[]; // Base64 / blob URLs
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId?: string | null; // Optional link to a project
  date: string; // ISO date format YYYY-MM-DD
  timeSlot?: string; // e.g. "09:00", "14:30"
  status: TaskStatus;
  priority: Priority;
  reminder?: boolean;
  createdAt: number;
  completedAt?: number | null;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  color: string; // Hex or tailwind class
  status: ProjectStatus;
  progress: number; // 0 to 100
  createdAt: number;
  updatedAt: number;
}

export interface AppSettings {
  id: string;
  language: LanguageCode;
  isFirstLaunch: boolean;
  securityType: SecurityType;
  pinHash?: string | null;
  biometricsEnabled: boolean;
  aiProvider: AIProvider;
  aiApiKey?: string;
  aiBaseUrl?: string; // For LAN Ollama/LM Studio or custom OpenAI endpoint
  aiSelectedModel: string;
  downloadedModels?: string[];
  userName: string;
  userFirstName?: string;
  userLastName?: string;
  userBio?: string;
  userAvatar?: string | null;
  lastBackupDate?: number;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}
