import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { LanguageCode, AppSettings, SecurityType } from '../types';
import { getAppSettings, updateAppSettings, DEFAULT_SETTINGS } from '../db';
import { translations } from '../i18n/translations';

export const useAppStore = defineStore('app', () => {
  const currentTab = ref<'dashboard' | 'schedule' | 'notes' | 'projects'>('dashboard');
  const settings = ref<AppSettings>({ ...DEFAULT_SETTINGS });
  const isLocked = ref<boolean>(false);
  const showSettingsModal = ref<boolean>(false);
  const showProfileModal = ref<boolean>(false);
  const showNewItemModal = ref<boolean>(false);
  const isInitialized = ref<boolean>(false);

  // Context for opening the new item modal
  const newItemModalContext = ref<{
    type?: 'note' | 'task' | 'project';
    projectId?: string | null;
  }>({});

  const t = computed(() => {
    return translations[settings.value.language] || translations.ru;
  });

  const displayName = computed(() => {
    if (settings.value.userFirstName && settings.value.userFirstName.trim()) {
      return settings.value.userFirstName.trim();
    }
    return settings.value.userName || 'User';
  });

  function openNewItemModal(options?: {
    type?: 'note' | 'task' | 'project';
    projectId?: string | null;
  }) {
    newItemModalContext.value = options || {};
    showNewItemModal.value = true;
  }

  async function updateProfile(data: {
    firstName: string;
    lastName?: string;
    bio?: string;
    avatar?: string | null;
  }) {
    const newAvatar = data.avatar !== undefined ? data.avatar : settings.value.userAvatar;
    settings.value.userFirstName = data.firstName;
    settings.value.userLastName = data.lastName || '';
    settings.value.userBio = data.bio || '';
    settings.value.userAvatar = newAvatar;
    settings.value.userName = data.firstName;

    await updateAppSettings({
      userFirstName: data.firstName,
      userLastName: data.lastName || '',
      userBio: data.bio || '',
      userAvatar: newAvatar,
      userName: data.firstName,
    });
  }

  async function init() {
    try {
      const loaded = await getAppSettings();
      settings.value = loaded;

      // If protection is configured and not first launch, lock app
      const hasSecurity = !loaded.isFirstLaunch && (
        (loaded.securityType === 'biometric' && loaded.biometricsEnabled) ||
        (loaded.securityType === 'pin' && !!loaded.pinHash)
      );
      if (hasSecurity) {
        isLocked.value = true;
      }
      isInitialized.value = true;
    } catch (e) {
      console.error('Failed to init app store', e);
      isInitialized.value = true;
    }
  }

  async function setLanguage(lang: LanguageCode) {
    settings.value.language = lang;
    await updateAppSettings({ language: lang });
  }

  async function updateSecuritySettings(security: {
    securityType?: SecurityType;
    pinHash?: string | null;
    biometricsEnabled?: boolean;
  }) {
    if (security.securityType !== undefined) settings.value.securityType = security.securityType;
    if (security.pinHash !== undefined) settings.value.pinHash = security.pinHash;
    if (security.biometricsEnabled !== undefined) settings.value.biometricsEnabled = security.biometricsEnabled;

    await updateAppSettings({
      securityType: settings.value.securityType,
      pinHash: settings.value.pinHash,
      biometricsEnabled: settings.value.biometricsEnabled,
    });
  }

  async function completeFirstLaunch(security: {
    type: SecurityType;
    pinHash?: string | null;
    biometrics?: boolean;
  }) {
    settings.value.isFirstLaunch = false;
    settings.value.securityType = security.type;
    settings.value.pinHash = security.pinHash || null;
    settings.value.biometricsEnabled = security.biometrics || false;

    await updateAppSettings({
      isFirstLaunch: false,
      securityType: security.type,
      pinHash: security.pinHash || null,
      biometricsEnabled: security.biometrics || false,
    });
    isLocked.value = false;
  }

  function unlock() {
    isLocked.value = false;
  }

  function lock() {
    const s = settings.value;
    const hasSecurity = !s.isFirstLaunch && (
      (s.securityType === 'biometric' && s.biometricsEnabled) ||
      (s.securityType === 'pin' && !!s.pinHash)
    );
    if (hasSecurity) {
      isLocked.value = true;
    }
  }

  return {
    currentTab,
    settings,
    isLocked,
    showSettingsModal,
    showProfileModal,
    showNewItemModal,
    isInitialized,
    newItemModalContext,
    t,
    displayName,
    openNewItemModal,
    init,
    setLanguage,
    updateSecuritySettings,
    completeFirstLaunch,
    updateProfile,
    unlock,
    lock,
  };
});
