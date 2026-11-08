import type { LanguageCode } from '../types';

export interface TranslationSchema {
  appName: string;
  appSubtitle: string;
  nav: {
    dashboard: string;
    schedule: string;
    notes: string;
    projects: string;
    assistant: string;
  };
  dashboard: {
    greeting: string;
    motto: string;
    badgeQuote: string;
    quoteBottom: string;
    weekSummaryTitle: string;
    yearSummaryTitle: string;
    keepGoing: string;
    currentProjects: string;
    seeAll: string;
    todayTasks: string;
    emptyTasks: string;
    emptyProjects: string;
    tasksWord: string;
    forThisWeek: string;
    todayWord: string;
    pace: string;
    completedWord: string;
    projectsWord: string;
    inProgressWord: string;
    createFirstProject: string;
  };
  schedule: {
    title: string;
    subtitle: string;
    today: string;
    addTask: string;
    noTasksForDay: string;
    high: string;
    medium: string;
    low: string;
  };
  notes: {
    title: string;
    searchPlaceholder: string;
    newNote: string;
    emptyNotes: string;
    speakText: string;
    stopSpeech: string;
    attachImage: string;
    save: string;
    delete: string;
    titlePlaceholder: string;
    contentPlaceholder: string;
  };
  projects: {
    title: string;
    newProject: string;
    projectNotes: string;
    projectTasks: string;
    emptyProjects: string;
    emptyProjectNotes: string;
    deleteConfirm: string;
    progress: string;
    inProgress: string;
    noDescription: string;
  };
  ai: {
    title: string;
    subtitle: string;
    chooseModelTitle: string;
    chooseModelDesc: string;
    gemma3Title: string;
    gemma3Desc: string;
    gemma4Title: string;
    gemma4Desc: string;
    externalApiTitle: string;
    externalApiDesc: string;
    inputPlaceholder: string;
    send: string;
    clearMemory: string;
    memoryCleaned: string;
    activeContext: string;
    todaySnapshot: string;
    quickQuery1: string;
    quickQuery2: string;
    quickQuery3: string;
    greetingTitle: string;
    greetingSubtitle: string;
    listening: string;
    analyzing: string;
    voiceNotSupported: string;
  };
  profile: {
    title: string;
    changePhoto: string;
    uploadPhoto: string;
    removePhoto: string;
    firstName: string;
    firstNamePlaceholder: string;
    lastName: string;
    lastNamePlaceholder: string;
    bio: string;
    bioPlaceholder: string;
    saveProfile: string;
  };
  settings: {
    general: string;
    security: string;
    aiModels: string;
    backup: string;
    about: string;
    userName: string;
    language: string;
    aiInferenceSource: string;
    gemma3CardTitle: string;
    gemma3CardDesc: string;
    gemma4CardTitle: string;
    gemma4CardDesc: string;
    externalApiCardTitle: string;
    externalApiCardDesc: string;
    apiBaseUrl: string;
    apiKey: string;
    saveAiSettings: string;
    settingsSaved: string;
    download: string;
    downloading: string;
    downloaded: string;
    deleteModel: string;
    defaultModel: string;
    setDefault: string;
    exportTitle: string;
    exportDesc: string;
    exportButton: string;
    importTitle: string;
    importDesc: string;
    chooseFile: string;
    passwordPlaceholder: string;
    enterPasswordError: string;
    exportSuccess: string;
    importSuccess: string;
    decryptError: string;
  };
  security: {
    title: string;
    chooseMethod: string;
    biometric: string;
    pin: string;
    pattern: string;
    none: string;
    enterPin: string;
    drawPattern: string;
    unlock: string;
    backupTitle: string;
    exportBackup: string;
    importBackup: string;
    passwordPlaceholder: string;
    safeVault: string;
    pinProtection: string;
    pinProtectionDesc: string;
    changePin: string;
    setPinTitle: string;
    newPinLabel: string;
    confirmPinLabel: string;
    savePin: string;
    pinLengthError: string;
    pinMismatchError: string;
    pinSavedSuccess: string;
    pinDisabled: string;
    patternProtection: string;
    patternProtectionDesc: string;
    changePattern: string;
    setPatternTitle: string;
    patternInstructions: string;
    patternMinPointsError: string;
    patternSavedSuccess: string;
    patternDisabled: string;
    biometricProtection: string;
    biometricProtectionDesc: string;
    biometricActivated: string;
    biometricDisabled: string;
    biometricNotConfirmed: string;
    touchFingerprintSensor: string;
    orSwitchToCode: string;
    invalidPin: string;
    invalidPattern: string;
    fingerprintNotRecognized: string;
    biometricError: string;
    fingerprintShort: string;
    pinShort: string;
    patternShort: string;
  };
  about: {
    title: string;
    version: string;
    appDescription: string;
    author: string;
    authorName: string;
    license: string;
    licenseName: string;
    techStack: string;
    techStackValue: string;
    encryption: string;
    encryptionValue: string;
    offlineFirstTitle: string;
    offlineFirstDesc: string;
  };
  common: {
    cancel: string;
    confirm: string;
    save: string;
    delete: string;
    edit: string;
    back: string;
    settings: string;
    language: string;
  };
}

export const translations: Record<LanguageCode, TranslationSchema> = {
  "ru": {
    "profile": {
      "title": "Профиль пользователя",
      "changePhoto": "Сменить фото",
      "uploadPhoto": "Загрузить фото",
      "removePhoto": "Удалить",
      "firstName": "Имя",
      "firstNamePlaceholder": "Ваше имя...",
      "lastName": "Фамилия",
      "lastNamePlaceholder": "Ваша фамилия (опционально)...",
      "bio": "О себе (кратко)",
      "bioPlaceholder": "Пара слов о ваших целях, интересах или девизе...",
      "saveProfile": "Сохранить профиль"
    },
    "appName": "Mensor: Проектные записки",
    "appSubtitle": "Умный хаб для записей, задач и проектов",
    "nav": {
      "dashboard": "Главная",
      "schedule": "Задачи",
      "notes": "Записки",
      "projects": "Проекты",
      "assistant": "Ассистент"
    },
    "dashboard": {
      "greeting": "Привет,",
      "motto": "Создавай то, что любишь. Шаг за шагом.",
      "badgeQuote": "Шаг за шагом ✨",
      "quoteBottom": "~ Лучше, чем вчера ✨",
      "weekSummaryTitle": "На этой неделе",
      "yearSummaryTitle": "Статистика за год",
      "keepGoing": "Продолжай в том же духе",
      "currentProjects": "Текущие проекты",
      "seeAll": "Все проекты",
      "todayTasks": "Задачи на сегодня",
      "emptyTasks": "На сегодня задач нет. Отличная работа!",
      "emptyProjects": "У вас пока нет активных проектов. Создайте первый!",
      "tasksWord": "задач",
      "forThisWeek": "за эту неделю",
      "todayWord": "сегодня",
      "pace": "темп",
      "completedWord": "Завершено:",
      "projectsWord": "Проектов:",
      "inProgressWord": "в работе",
      "createFirstProject": "+ Создать первый проект"
    },
    "schedule": {
      "title": "Расписание",
      "subtitle": "Планируй сегодня. Строй будущее.",
      "today": "Сегодня",
      "addTask": "Новая задача",
      "noTasksForDay": "На этот день ничего не запланировано",
      "high": "высокий",
      "medium": "средний",
      "low": "низкий"
    },
    "notes": {
      "title": "Записки",
      "searchPlaceholder": "Поиск по записям...",
      "newNote": "Новая запись",
      "emptyNotes": "Список записей пуст",
      "speakText": "Озвучить текст",
      "stopSpeech": "Остановить озвучку",
      "attachImage": "Прикрепить фото",
      "save": "Сохранить",
      "delete": "Удалить",
      "titlePlaceholder": "Заголовок записи...",
      "contentPlaceholder": "Текст заметки или мысли..."
    },
    "projects": {
      "title": "Проекты",
      "newProject": "Новый проект",
      "projectNotes": "Записи проекта",
      "projectTasks": "Задачи проекта",
      "emptyProjects": "Проекты пока не созданы",
      "emptyProjectNotes": "В этом проекте пока нет записок",
      "deleteConfirm": "Удалить этот проект со всеми привязанными записями?",
      "progress": "Прогресс",
      "inProgress": "В процессе",
      "noDescription": "Без описания"
    },
    "ai": {
      "title": "AI-Ассистент",
      "subtitle": "Контекстный консультант по проектам и задачам",
      "chooseModelTitle": "Выберите модель ИИ",
      "chooseModelDesc": "Выберите локальную модель или подключите API",
      "gemma3Title": "Gemma 3 (1B)",
      "gemma3Desc": "Быстрая, легкая (~700 МБ), для любых устройств",
      "gemma4Title": "Gemma 4-E2B (2B)",
      "gemma4Desc": "Глубокие рассуждения (~1.4 ГБ), для мощных смартфонов (8+ ГБ RAM)",
      "externalApiTitle": "Внешний API / Домашний ПК",
      "externalApiDesc": "OpenRouter, DeepSeek или LM Studio/Ollama по Wi-Fi",
      "inputPlaceholder": "Спросите ассистента о проектах или задачах...",
      "send": "Отправить",
      "clearMemory": "Очистить историю",
      "memoryCleaned": "История сообщений успешно очищена",
      "activeContext": "Активный контекст",
      "todaySnapshot": "Сводка системы",
      "quickQuery1": "Какие задачи у меня на сегодня?",
      "quickQuery2": "Сделай краткое саммари по проектам",
      "quickQuery3": "Что требует внимания в первую очередь?",
      "greetingTitle": "Чем я могу помочь вам сегодня?",
      "greetingSubtitle": "Я вижу всё ваше расписание на сегодня, проекты и заметки. Задайте любой вопрос или выберите быстрый сценарий:",
      "listening": "Слушаю вас... Говорите",
      "analyzing": "Анализ контекста...",
      "voiceNotSupported": "Голосовой ввод не поддерживается данным браузером."
    },
    "settings": {
      "general": "Общие",
      "aiModels": "AI-Модели",
      "backup": "Резервная копия",
      "userName": "Имя пользователя",
      "language": "Язык интерфейса",
      "aiInferenceSource": "Настройка источника инференса для AI-консультанта:",
      "gemma3CardTitle": "Gemma 3 (1B)",
      "gemma3CardDesc": "Быстрая, легкая для смартфона (~700 МБ)",
      "gemma4CardTitle": "Gemma 4-E2B (2B)",
      "gemma4CardDesc": "Для мощных смартфонов (8+ ГБ RAM, ~1.4 ГБ)",
      "externalApiCardTitle": "Внешний API / ПК (Ollama / LM Studio)",
      "externalApiCardDesc": "OpenRouter, DeepSeek или сервер по Wi-Fi",
      "apiBaseUrl": "API Base URL",
      "apiKey": "API Key (если требуется)",
      "saveAiSettings": "Сохранить параметры ИИ",
      "settingsSaved": "Настройки сохранены",
      "download": "Скачать",
      "downloading": "Загрузка...",
      "downloaded": "Загружена",
      "deleteModel": "Удалить",
      "defaultModel": "По умолчанию",
      "setDefault": "Выбрать",
      "exportTitle": "Экспорт зашифрованного архива",
      "exportDesc": "Все ваши проекты, заметки и задачи будут зашифрованы ключом AES-256-GCM.",
      "exportButton": "Экспортировать в .mensor",
      "importTitle": "Восстановление из архива",
      "importDesc": "Загрузите файл .mensor для восстановления всех записей на этом устройстве.",
      "chooseFile": "Выбрать файл .mensor",
      "passwordPlaceholder": "Придумайте пароль шифрования...",
      "enterPasswordError": "Введите пароль для шифрования архива",
      "exportSuccess": "✓ Резервная копия успешно создана и сохранена!",
      "importSuccess": "Данные успешно восстановлены!",
      "decryptError": "Ошибка расшифровки: неверный пароль или поврежденный файл.",
      "security": "Безопасность",
      "about": "О приложении"
    },
    "security": {
      "title": "Безопасность",
      "chooseMethod": "Способ защиты приложения",
      "biometric": "Биометрия (Отпечаток / Лицо)",
      "pin": "PIN-код",
      "pattern": "Графический ключ",
      "none": "Без защиты",
      "enterPin": "Введите PIN-код",
      "drawPattern": "Нарисуйте графический ключ",
      "unlock": "Разблокировать",
      "backupTitle": "Резервная копия",
      "exportBackup": "Экспорт данных (зашифрованный .mensor)",
      "importBackup": "Импорт данных из файла",
      "passwordPlaceholder": "Пароль для шифрования бэкапа...",
      "safeVault": "Личное пространство",
      "pinProtection": "Защита PIN-кодом",
      "pinProtectionDesc": "Запрашивать цифровой код при входе",
      "changePin": "Сменить PIN-код →",
      "setPinTitle": "Установка PIN-кода",
      "newPinLabel": "Новый PIN (4-6 цифр)",
      "confirmPinLabel": "Повторите PIN",
      "savePin": "Сохранить PIN",
      "pinLengthError": "PIN должен состоять минимум из 4 цифр",
      "pinMismatchError": "Введённые PIN-коды не совпадают",
      "pinSavedSuccess": "PIN-код успешно установлен",
      "pinDisabled": "Защита PIN-кодом отключена",
      "patternProtection": "Графический ключ",
      "patternProtectionDesc": "Разблокировка соединением точек 3x3",
      "changePattern": "Перерисовать ключ →",
      "setPatternTitle": "Новый графический ключ",
      "patternInstructions": "Соедините точки ключа разблокировки",
      "patternMinPointsError": "Соедините минимум 4 точки",
      "patternSavedSuccess": "Графический ключ успешно сохранён",
      "patternDisabled": "Графический ключ отключен",
      "biometricProtection": "Биометрия (Отпечаток пальца)",
      "biometricProtectionDesc": "Аппаратный вход через сканер устройства",
      "biometricActivated": "Биометрическая защита включена",
      "biometricDisabled": "Биометрическая защита отключена",
      "biometricNotConfirmed": "Отпечаток не подтверждён",
      "touchFingerprintSensor": "Прикоснитесь к сканеру отпечатка пальца",
      "orSwitchToCode": "Или переключитесь на PIN-код",
      "invalidPin": "Неверный PIN-код",
      "invalidPattern": "Неверный графический ключ",
      "fingerprintNotRecognized": "Отпечаток пальца не распознан",
      "biometricError": "Ошибка биометрической аутентификации",
      "fingerprintShort": "Отпечаток",
      "pinShort": "PIN-код",
      "patternShort": "Ключ"
    },
    "common": {
      "cancel": "Отмена",
      "confirm": "Подтвердить",
      "save": "Сохранить",
      "delete": "Удалить",
      "edit": "Изменить",
      "back": "Назад",
      "settings": "Настройки",
      "language": "Язык интерфейса"
    },
    "about": {
      "title": "О приложении",
      "version": "Версия 4.0.0 (Mensor v4.0)",
      "appDescription": "Интеллектуальный автономный мобильный хаб для проектов, заметок и задач со сквозным шифрованием.",
      "author": "Автор и разработчик",
      "authorName": "Маркус Маррей",
      "license": "Лицензия",
      "licenseName": "Apache 2.0",
      "techStack": "Технологический стек",
      "techStackValue": "Vue 3 • Capacitor 7 • Dexie",
      "encryption": "Шифрование данных",
      "encryptionValue": "AES-256-GCM (Локально)",
      "offlineFirstTitle": "100% Offline-First",
      "offlineFirstDesc": "Все ваши персональные данные, мысли, задачи и аудиозаписи хранятся исключительно на физическом носителе вашего устройства и никогда не передаются на внешние серверы."
    }
  },
  "en": {
    "profile": {
      "title": "User Profile",
      "changePhoto": "Change photo",
      "uploadPhoto": "Upload photo",
      "removePhoto": "Remove",
      "firstName": "First Name",
      "firstNamePlaceholder": "Your first name...",
      "lastName": "Last Name",
      "lastNamePlaceholder": "Your last name (optional)...",
      "bio": "Bio (briefly)",
      "bioPlaceholder": "A few words about your goals or motto...",
      "saveProfile": "Save Profile"
    },
    "appName": "Mensor: Project Notes",
    "appSubtitle": "Smart hub for notes, tasks, and projects",
    "nav": {
      "dashboard": "Home",
      "schedule": "Schedule",
      "notes": "Notes",
      "projects": "Projects",
      "assistant": "Assistant"
    },
    "dashboard": {
      "greeting": "Hello,",
      "motto": "Build what you love. One step at a time.",
      "badgeQuote": "Step by step ✨",
      "quoteBottom": "~ Better than yesterday ✨",
      "weekSummaryTitle": "This week",
      "yearSummaryTitle": "Year in Review",
      "keepGoing": "Keep going",
      "currentProjects": "Current Projects",
      "seeAll": "See all",
      "todayTasks": "Today's Tasks",
      "emptyTasks": "No tasks for today. Great job!",
      "emptyProjects": "No active projects yet. Create your first one!",
      "tasksWord": "tasks",
      "forThisWeek": "this week",
      "todayWord": "today",
      "pace": "pace",
      "completedWord": "Completed:",
      "projectsWord": "Projects:",
      "inProgressWord": "in progress",
      "createFirstProject": "+ Create first project"
    },
    "schedule": {
      "title": "Schedule",
      "subtitle": "Plan today. Build tomorrow.",
      "today": "Today",
      "addTask": "New Task",
      "noTasksForDay": "Nothing planned for this day",
      "high": "high",
      "medium": "medium",
      "low": "low"
    },
    "notes": {
      "title": "Notes",
      "searchPlaceholder": "Search notes...",
      "newNote": "New Note",
      "emptyNotes": "No notes yet",
      "speakText": "Speak note",
      "stopSpeech": "Stop speaking",
      "attachImage": "Attach image",
      "save": "Save",
      "delete": "Delete",
      "titlePlaceholder": "Note title...",
      "contentPlaceholder": "Write your thoughts..."
    },
    "projects": {
      "title": "Projects",
      "newProject": "New Project",
      "projectNotes": "Project Notes",
      "projectTasks": "Project Tasks",
      "emptyProjects": "No projects yet",
      "emptyProjectNotes": "No notes in this project yet",
      "deleteConfirm": "Delete this project along with all associated notes?",
      "progress": "Progress",
      "inProgress": "In progress",
      "noDescription": "No description"
    },
    "ai": {
      "title": "AI Assistant",
      "subtitle": "Contextual advisor for projects and daily tasks",
      "chooseModelTitle": "Select AI Model",
      "chooseModelDesc": "Choose an on-device local model or connect an API",
      "gemma3Title": "Gemma 3 (1B)",
      "gemma3Desc": "Fast & lightweight (~700 MB) for any device",
      "gemma4Title": "Gemma 4-E2B (2B)",
      "gemma4Desc": "Advanced reasoning (~1.4 GB) for powerful devices (8+ GB RAM)",
      "externalApiTitle": "External API / Local PC",
      "externalApiDesc": "OpenRouter, DeepSeek or LM Studio/Ollama over Wi-Fi",
      "inputPlaceholder": "Ask assistant about your projects or tasks...",
      "send": "Send",
      "clearMemory": "Clear History",
      "memoryCleaned": "Conversation history cleared",
      "activeContext": "Active Context",
      "todaySnapshot": "System Snapshot",
      "quickQuery1": "What are my tasks for today?",
      "quickQuery2": "Summarize my current projects",
      "quickQuery3": "What needs my attention first?",
      "greetingTitle": "How can I help you today?",
      "greetingSubtitle": "I have full visibility of your schedule, active projects, and notes. Ask any question or choose a prompt below:",
      "listening": "Listening... Speak now",
      "analyzing": "Analyzing context...",
      "voiceNotSupported": "Speech recognition is not supported in this browser."
    },
    "settings": {
      "general": "General",
      "aiModels": "AI Models",
      "backup": "Backup & Restore",
      "userName": "User Name",
      "language": "Interface Language",
      "aiInferenceSource": "Configure AI consultant inference engine:",
      "gemma3CardTitle": "Gemma 3 (1B)",
      "gemma3CardDesc": "Fast & lightweight for any smartphone (~700 MB)",
      "gemma4CardTitle": "Gemma 4-E2B (2B)",
      "gemma4CardDesc": "For powerful smartphones (8+ GB RAM, ~1.4 GB)",
      "externalApiCardTitle": "External API / PC (Ollama / LM Studio)",
      "externalApiCardDesc": "OpenRouter, DeepSeek or Wi-Fi local server",
      "apiBaseUrl": "API Base URL",
      "apiKey": "API Key (if required)",
      "saveAiSettings": "Save AI Settings",
      "settingsSaved": "Settings saved successfully",
      "download": "Download",
      "downloading": "Downloading...",
      "downloaded": "Downloaded",
      "deleteModel": "Delete",
      "defaultModel": "Default",
      "setDefault": "Select",
      "exportTitle": "Export Encrypted Backup",
      "exportDesc": "All your projects, notes, and tasks will be encrypted using AES-256-GCM.",
      "exportButton": "Export to .mensor",
      "importTitle": "Restore from Backup",
      "importDesc": "Select a .mensor file to restore all entries on this device.",
      "chooseFile": "Select .mensor file",
      "passwordPlaceholder": "Create encryption password...",
      "enterPasswordError": "Please enter a password for encryption",
      "exportSuccess": "✓ Backup created and saved successfully!",
      "importSuccess": "Data restored successfully!",
      "decryptError": "Decryption failed: invalid password or corrupted file.",
      "security": "Security",
      "about": "About App"
    },
    "security": {
      "title": "Security",
      "chooseMethod": "App Protection Method",
      "biometric": "Biometrics (Fingerprint / Face)",
      "pin": "PIN code",
      "pattern": "Pattern lock",
      "none": "No protection",
      "enterPin": "Enter PIN code",
      "drawPattern": "Draw pattern",
      "unlock": "Unlock",
      "backupTitle": "Backup",
      "exportBackup": "Export data (encrypted .mensor)",
      "importBackup": "Import data from file",
      "passwordPlaceholder": "Backup encryption password...",
      "safeVault": "Personal Space",
      "pinProtection": "PIN Code Protection",
      "pinProtectionDesc": "Require numeric code at launch",
      "changePin": "Change PIN Code →",
      "setPinTitle": "Set Up PIN Code",
      "newPinLabel": "New PIN (4-6 digits)",
      "confirmPinLabel": "Repeat PIN",
      "savePin": "Save PIN",
      "pinLengthError": "PIN must be at least 4 digits",
      "pinMismatchError": "Entered PIN codes do not match",
      "pinSavedSuccess": "PIN code successfully set",
      "pinDisabled": "PIN protection disabled",
      "patternProtection": "Pattern Lock",
      "patternProtectionDesc": "Unlock by connecting 3x3 dots",
      "changePattern": "Redraw Pattern →",
      "setPatternTitle": "New Pattern Lock",
      "patternInstructions": "Connect the dots to set your unlock pattern",
      "patternMinPointsError": "Connect at least 4 dots",
      "patternSavedSuccess": "Pattern lock successfully saved",
      "patternDisabled": "Pattern lock disabled",
      "biometricProtection": "Biometrics (Fingerprint)",
      "biometricProtectionDesc": "Hardware login using device scanner",
      "biometricActivated": "Biometric protection enabled",
      "biometricDisabled": "Biometric protection disabled",
      "biometricNotConfirmed": "Fingerprint not verified",
      "touchFingerprintSensor": "Touch the fingerprint sensor",
      "orSwitchToCode": "Or switch to PIN code",
      "invalidPin": "Invalid PIN code",
      "invalidPattern": "Invalid pattern",
      "fingerprintNotRecognized": "Fingerprint not recognized",
      "biometricError": "Biometric authentication error",
      "fingerprintShort": "Fingerprint",
      "pinShort": "PIN Code",
      "patternShort": "Pattern"
    },
    "common": {
      "cancel": "Cancel",
      "confirm": "Confirm",
      "save": "Save",
      "delete": "Delete",
      "edit": "Edit",
      "back": "Back",
      "settings": "Settings",
      "language": "Interface language"
    },
    "about": {
      "title": "About App",
      "version": "Version 4.0.0 (Mensor v4.0)",
      "appDescription": "Intelligent offline-first mobile hub for projects, notes, and tasks with end-to-end encryption.",
      "author": "Author & Developer",
      "authorName": "Markus Marrei",
      "license": "License",
      "licenseName": "Apache 2.0",
      "techStack": "Technology Stack",
      "techStackValue": "Vue 3 • Capacitor 7 • Dexie",
      "encryption": "Data Encryption",
      "encryptionValue": "AES-256-GCM (Local)",
      "offlineFirstTitle": "100% Offline-First",
      "offlineFirstDesc": "All your personal data, thoughts, tasks, and audio recordings are stored solely on your physical device and are never sent to external servers."
    }
  },
  "es": {
    "profile": {
      "title": "Perfil de usuario",
      "changePhoto": "Cambiar foto",
      "uploadPhoto": "Subir foto",
      "removePhoto": "Eliminar",
      "firstName": "Nombre",
      "firstNamePlaceholder": "Tu nombre...",
      "lastName": "Apellido",
      "lastNamePlaceholder": "Tu apellido (opcional)...",
      "bio": "Sobre ti",
      "bioPlaceholder": "Unas palabras sobre tus objetivos...",
      "saveProfile": "Guardar perfil"
    },
    "appName": "Mensor: Notas de Proyecto",
    "appSubtitle": "Centro inteligente para notas, tareas y proyectos",
    "nav": {
      "dashboard": "Inicio",
      "schedule": "Tareas",
      "notes": "Notas",
      "projects": "Proyectos",
      "assistant": "Asistente"
    },
    "dashboard": {
      "greeting": "Hola,",
      "motto": "Construye lo que amas. Paso a paso.",
      "badgeQuote": "Paso a paso ✨",
      "quoteBottom": "~ Mejor que ayer ✨",
      "weekSummaryTitle": "Esta semana",
      "yearSummaryTitle": "Estadísticas del año",
      "keepGoing": "Sigue adelante",
      "currentProjects": "Proyectos actuales",
      "seeAll": "Ver todos",
      "todayTasks": "Tareas de hoy",
      "emptyTasks": "No hay tareas para hoy. ¡Excelente!",
      "emptyProjects": "Aún no hay proyectos activos.",
      "tasksWord": "tareas",
      "forThisWeek": "esta semana",
      "todayWord": "hoy",
      "pace": "ritmo",
      "completedWord": "Completado:",
      "projectsWord": "Proyectos:",
      "inProgressWord": "en progreso",
      "createFirstProject": "+ Crear primer proyecto"
    },
    "schedule": {
      "title": "Horario",
      "subtitle": "Planifica hoy. Construye mañana.",
      "today": "Hoy",
      "addTask": "Nueva tarea",
      "noTasksForDay": "Nada planeado para este día",
      "high": "alta",
      "medium": "media",
      "low": "baja"
    },
    "notes": {
      "title": "Notas",
      "searchPlaceholder": "Buscar notas...",
      "newNote": "Nueva nota",
      "emptyNotes": "Aún no hay notas",
      "speakText": "Leer texto",
      "stopSpeech": "Detener",
      "attachImage": "Adjuntar imagen",
      "save": "Guardar",
      "delete": "Eliminar",
      "titlePlaceholder": "Título de la nota...",
      "contentPlaceholder": "Escribe tus pensamientos..."
    },
    "projects": {
      "title": "Proyectos",
      "newProject": "Nuevo proyecto",
      "projectNotes": "Notas del proyecto",
      "projectTasks": "Tareas del proyecto",
      "emptyProjects": "Aún no hay proyectos",
      "emptyProjectNotes": "Aún no hay notas en este proyecto",
      "deleteConfirm": "¿Eliminar este proyecto con todas sus notas?",
      "progress": "Progreso",
      "inProgress": "En progreso",
      "noDescription": "Sin descripción"
    },
    "ai": {
      "title": "Asistente IA",
      "subtitle": "Consultor contextual para proyectos y tareas",
      "chooseModelTitle": "Elegir modelo de IA",
      "chooseModelDesc": "Elige un modelo local o conecta una API",
      "gemma3Title": "Gemma 3 (1B)",
      "gemma3Desc": "Rápido y ligero (~700 MB)",
      "gemma4Title": "Gemma 4-E2B (2B)",
      "gemma4Desc": "Razonamiento avanzado (~1.4 GB)",
      "externalApiTitle": "API externa / PC local",
      "externalApiDesc": "OpenRouter o LM Studio/Ollama por Wi-Fi",
      "inputPlaceholder": "Pregunta sobre tus proyectos o tareas...",
      "send": "Enviar",
      "clearMemory": "Borrar historial",
      "memoryCleaned": "Historial borrado",
      "activeContext": "Contexto activo",
      "todaySnapshot": "Resumen del sistema",
      "quickQuery1": "¿Cuáles son mis tareas de hoy?",
      "quickQuery2": "Resume mis proyectos actuales",
      "quickQuery3": "¿Qué requiere mi atención primero?",
      "greetingTitle": "¿En qué puedo ayudarte hoy?",
      "greetingSubtitle": "Veo todo tu horario de hoy, proyectos y notas. Haz cualquier pregunta:",
      "listening": "Escuchando... Habla ahora",
      "analyzing": "Analizando contexto...",
      "voiceNotSupported": "El reconocimiento de voz no es compatible con este navegador."
    },
    "settings": {
      "general": "General",
      "aiModels": "Modelos IA",
      "backup": "Copia de seguridad",
      "userName": "Nombre de usuario",
      "language": "Idioma de interfaz",
      "aiInferenceSource": "Configuración del motor de inferencia IA:",
      "gemma3CardTitle": "Gemma 3 (1B)",
      "gemma3CardDesc": "Rápido y ligero para smartphone (~700 MB)",
      "gemma4CardTitle": "Gemma 4-E2B (2B)",
      "gemma4CardDesc": "Para smartphones potentes (8+ GB RAM, ~1.4 GB)",
      "externalApiCardTitle": "API externa / PC (Ollama / LM Studio)",
      "externalApiCardDesc": "OpenRouter, DeepSeek o servidor local por Wi-Fi",
      "apiBaseUrl": "API Base URL",
      "apiKey": "API Key (si se requiere)",
      "saveAiSettings": "Guardar ajustes de IA",
      "settingsSaved": "Ajustes guardados con éxito",
      "download": "Descargar",
      "downloading": "Descargando...",
      "downloaded": "Descargada",
      "deleteModel": "Eliminar",
      "defaultModel": "Por defecto",
      "setDefault": "Seleccionar",
      "exportTitle": "Exportar archivo cifrado",
      "exportDesc": "Todos tus proyectos, notas y tareas serán cifrados con AES-256-GCM.",
      "exportButton": "Exportar a .mensor",
      "importTitle": "Restaurar desde archivo",
      "importDesc": "Carga un archivo .mensor para restaurar todas tus entradas.",
      "chooseFile": "Seleccionar archivo .mensor",
      "passwordPlaceholder": "Contraseña de cifrado...",
      "enterPasswordError": "Ingresa una contraseña para el cifrado",
      "exportSuccess": "✓ ¡Copia de seguridad creada con éxito!",
      "importSuccess": "¡Datos restaurados con éxito!",
      "decryptError": "Error al descifrar: contraseña incorrecta o archivo dañado.",
      "security": "Seguridad",
      "about": "Acerca de la app"
    },
    "security": {
      "title": "Seguridad",
      "chooseMethod": "Método de protección",
      "biometric": "Biometría",
      "pin": "Código PIN",
      "pattern": "Patrón",
      "none": "Sin protección",
      "enterPin": "Ingresa el PIN",
      "drawPattern": "Dibuja el patrón",
      "unlock": "Desbloquear",
      "backupTitle": "Copia de seguridad",
      "exportBackup": "Exportar datos (.mensor)",
      "importBackup": "Importar datos",
      "passwordPlaceholder": "Contraseña de copia...",
      "safeVault": "Espacio Personal",
      "pinProtection": "Protección por PIN",
      "pinProtectionDesc": "Solicitar código numérico al iniciar",
      "changePin": "Cambiar código PIN →",
      "setPinTitle": "Configurar código PIN",
      "newPinLabel": "Nuevo PIN (4-6 dígitos)",
      "confirmPinLabel": "Repetir PIN",
      "savePin": "Guardar PIN",
      "pinLengthError": "El PIN debe tener al menos 4 dígitos",
      "pinMismatchError": "Los códigos PIN ingresados no coinciden",
      "pinSavedSuccess": "Código PIN configurado con éxito",
      "pinDisabled": "Protección por PIN desactivada",
      "patternProtection": "Patrón de desbloqueo",
      "patternProtectionDesc": "Desbloqueo uniendo puntos 3x3",
      "changePattern": "Redibujar patrón →",
      "setPatternTitle": "Nuevo patrón de desbloqueo",
      "patternInstructions": "Une los puntos para crear tu patrón",
      "patternMinPointsError": "Conecta al menos 4 puntos",
      "patternSavedSuccess": "Patrón guardado con éxito",
      "patternDisabled": "Patrón de desbloqueo desactivado",
      "biometricProtection": "Biometría (Huella dactilar)",
      "biometricProtectionDesc": "Acceso mediante el sensor del dispositivo",
      "biometricActivated": "Protección biométrica activada",
      "biometricDisabled": "Protección biométrica desactivada",
      "biometricNotConfirmed": "Huella no confirmada",
      "touchFingerprintSensor": "Toca el sensor de huella dactilar",
      "orSwitchToCode": "O cambia al código PIN",
      "invalidPin": "Código PIN incorrecto",
      "invalidPattern": "Patrón incorrecto",
      "fingerprintNotRecognized": "Huella dactilar no reconocida",
      "biometricError": "Error de autenticación biométrica",
      "fingerprintShort": "Huella",
      "pinShort": "Código PIN",
      "patternShort": "Patrón"
    },
    "common": {
      "cancel": "Cancelar",
      "confirm": "Confirmar",
      "save": "Guardar",
      "delete": "Eliminar",
      "edit": "Editar",
      "back": "Atrás",
      "settings": "Ajustes",
      "language": "Idioma"
    },
    "about": {
      "title": "Acerca de la app",
      "version": "Versión 3.5.0 (Mensor v3.5)",
      "appDescription": "Centro móvil inteligente y autónomo para proyectos, notas y tareas con cifrado de extremo a extremo.",
      "author": "Autor y desarrollador",
      "authorName": "Markus Marrei",
      "license": "Licencia",
      "licenseName": "Apache 2.0",
      "techStack": "Pila tecnológica",
      "techStackValue": "Vue 3 • Capacitor 7 • Dexie",
      "encryption": "Cifrado de datos",
      "encryptionValue": "AES-256-GCM (Local)",
      "offlineFirstTitle": "100% Offline-First",
      "offlineFirstDesc": "Todos tus datos personales, ideas, tareas y grabaciones se almacenan exclusivamente en el almacenamiento físico de tu dispositivo."
    }
  },
  "de": {
    "profile": {
      "title": "Benutzerprofil",
      "changePhoto": "Foto ändern",
      "uploadPhoto": "Foto hochladen",
      "removePhoto": "Entfernen",
      "firstName": "Vorname",
      "firstNamePlaceholder": "Dein Vorname...",
      "lastName": "Nachname",
      "lastNamePlaceholder": "Dein Nachname (optional)...",
      "bio": "Über mich",
      "bioPlaceholder": "Ein paar Worte über deine Ziele...",
      "saveProfile": "Profil speichern"
    },
    "appName": "Mensor: Projektnotizen",
    "appSubtitle": "Smarter Hub für Notizen, Aufgaben und Projekte",
    "nav": {
      "dashboard": "Start",
      "schedule": "Aufgaben",
      "notes": "Notizen",
      "projects": "Projekte",
      "assistant": "Assistent"
    },
    "dashboard": {
      "greeting": "Hallo,",
      "motto": "Erschaffe, was du liebst. Schritt für Schritt.",
      "badgeQuote": "Schritt für Schritt ✨",
      "quoteBottom": "~ Besser als gestern ✨",
      "weekSummaryTitle": "Diese Woche",
      "yearSummaryTitle": "Jahresstatistik",
      "keepGoing": "Weiter so",
      "currentProjects": "Aktuelle Projekte",
      "seeAll": "Alle anzeigen",
      "todayTasks": "Aufgaben für heute",
      "emptyTasks": "Keine Aufgaben für heute. Super!",
      "emptyProjects": "Noch keine aktiven Projekte.",
      "tasksWord": "Aufgaben",
      "forThisWeek": "diese Woche",
      "todayWord": "heute",
      "pace": "Tempo",
      "completedWord": "Erledigt:",
      "projectsWord": "Projekte:",
      "inProgressWord": "in Arbeit",
      "createFirstProject": "+ Erstes Projekt erstellen"
    },
    "schedule": {
      "title": "Zeitplan",
      "subtitle": "Heute planen. Zukunft gestalten.",
      "today": "Heute",
      "addTask": "Neue Aufgabe",
      "noTasksForDay": "Für diesen Tag ist nichts geplant",
      "high": "hoch",
      "medium": "mittel",
      "low": "niedrig"
    },
    "notes": {
      "title": "Notizen",
      "searchPlaceholder": "Notizen durchsuchen...",
      "newNote": "Neue Notiz",
      "emptyNotes": "Noch keine Notizen vorhanden",
      "speakText": "Vorlesen",
      "stopSpeech": "Stopp",
      "attachImage": "Bild anhängen",
      "save": "Speichern",
      "delete": "Löschen",
      "titlePlaceholder": "Titel der Notiz...",
      "contentPlaceholder": "Gedanken notieren..."
    },
    "projects": {
      "title": "Projekte",
      "newProject": "Neues Projekt",
      "projectNotes": "Projektnotizen",
      "projectTasks": "Projektaufgaben",
      "emptyProjects": "Noch keine Projekte angelegt",
      "emptyProjectNotes": "Noch keine Notizen in diesem Projekt",
      "deleteConfirm": "Projekt mit allen Notizen löschen?",
      "progress": "Fortschritt",
      "inProgress": "In Arbeit",
      "noDescription": "Keine Beschreibung"
    },
    "ai": {
      "title": "KI-Assistent",
      "subtitle": "Kontextberater für Projekte und Aufgaben",
      "chooseModelTitle": "KI-Modell wählen",
      "chooseModelDesc": "Lokales Modell oder API-Anbindung wählen",
      "gemma3Title": "Gemma 3 (1B)",
      "gemma3Desc": "Schnell und leicht (~700 MB)",
      "gemma4Title": "Gemma 4-E2B (2B)",
      "gemma4Desc": "Erweitertes Denken (~1.4 GB)",
      "externalApiTitle": "Externe API / Lokaler PC",
      "externalApiDesc": "OpenRouter oder LM Studio/Ollama über WLAN",
      "inputPlaceholder": "Frage den Assistenten zu Projekten...",
      "send": "Senden",
      "clearMemory": "Verlauf leeren",
      "memoryCleaned": "Verlauf gelöscht",
      "activeContext": "Aktiver Kontext",
      "todaySnapshot": "Systemübersicht",
      "quickQuery1": "Welche Aufgaben habe ich heute?",
      "quickQuery2": "Fasse meine Projekte zusammen",
      "quickQuery3": "Was braucht zuerst Aufmerksamkeit?",
      "greetingTitle": "Wie kann ich heute helfen?",
      "greetingSubtitle": "Ich kenne deinen Zeitplan, Projekte und Notizen. Stelle eine Frage:",
      "listening": "Höre zu... Bitte sprechen",
      "analyzing": "Kontext wird analysiert...",
      "voiceNotSupported": "Spracherkennung wird nicht unterstützt."
    },
    "settings": {
      "general": "Allgemein",
      "aiModels": "KI-Modelle",
      "backup": "Sicherung & Wiederherstellung",
      "userName": "Benutzername",
      "language": "Sprache",
      "aiInferenceSource": "Inferenzquelle für KI-Assistenten konfigurieren:",
      "gemma3CardTitle": "Gemma 3 (1B)",
      "gemma3CardDesc": "Schnell & leicht für Smartphones (~700 MB)",
      "gemma4CardTitle": "Gemma 4-E2B (2B)",
      "gemma4CardDesc": "Für leistungsstarke Geräte (8+ GB RAM, ~1.4 GB)",
      "externalApiCardTitle": "Externe API / PC (Ollama / LM Studio)",
      "externalApiCardDesc": "OpenRouter, DeepSeek oder lokaler WLAN-Server",
      "apiBaseUrl": "API Base URL",
      "apiKey": "API-Schlüssel (falls nötig)",
      "saveAiSettings": "KI-Einstellungen speichern",
      "settingsSaved": "Einstellungen erfolgreich gespeichert",
      "download": "Herunterladen",
      "downloading": "Wird geladen...",
      "downloaded": "Geladen",
      "deleteModel": "Löschen",
      "defaultModel": "Standard",
      "setDefault": "Auswählen",
      "exportTitle": "Verschlüsseltes Backup exportieren",
      "exportDesc": "Alle Projekte, Notizen und Aufgaben werden mit AES-256-GCM verschlüsselt.",
      "exportButton": "In .mensor exportieren",
      "importTitle": "Aus Backup wiederherstellen",
      "importDesc": "Wähle eine .mensor-Datei zur Wiederherstellung aller Daten.",
      "chooseFile": ".mensor-Datei auswählen",
      "passwordPlaceholder": "Passwort festlegen...",
      "enterPasswordError": "Bitte Passwort eingeben",
      "exportSuccess": "✓ Backup erfolgreich erstellt!",
      "importSuccess": "Daten erfolgreich wiederhergestellt!",
      "decryptError": "Entschlüsselung fehlgeschlagen.",
      "security": "Sicherheit",
      "about": "Über die App"
    },
    "security": {
      "title": "Sicherheit",
      "chooseMethod": "Schutzmethode",
      "biometric": "Biometrie",
      "pin": "PIN-Code",
      "pattern": "Muster",
      "none": "Kein Schutz",
      "enterPin": "PIN eingeben",
      "drawPattern": "Muster zeichnen",
      "unlock": "Entsperren",
      "backupTitle": "Sicherung",
      "exportBackup": "Daten exportieren (.mensor)",
      "importBackup": "Daten importieren",
      "passwordPlaceholder": "Backup-Passwort...",
      "safeVault": "Persönlicher Raum",
      "pinProtection": "PIN-Schutz",
      "pinProtectionDesc": "Numerischen Code beim Start anfordern",
      "changePin": "PIN ändern →",
      "setPinTitle": "PIN einrichten",
      "newPinLabel": "Neuer PIN (4-6 Ziffern)",
      "confirmPinLabel": "PIN wiederholen",
      "savePin": "PIN speichern",
      "pinLengthError": "PIN muss mindestens 4 Ziffern lang sein",
      "pinMismatchError": "Die eingegebenen PINs stimmen nicht überein",
      "pinSavedSuccess": "PIN erfolgreich eingerichtet",
      "pinDisabled": "PIN-Schutz deaktiviert",
      "patternProtection": "Muster-Sperre",
      "patternProtectionDesc": "Entsperren durch Verbinden von 3x3 Punkten",
      "changePattern": "Muster neu zeichnen →",
      "setPatternTitle": "Neues Sperrmuster",
      "patternInstructions": "Verbinden Sie die Punkte, um das Muster festzulegen",
      "patternMinPointsError": "Verbinden Sie mindestens 4 Punkte",
      "patternSavedSuccess": "Muster erfolgreich gespeichert",
      "patternDisabled": "Muster-Sperre deaktiviert",
      "biometricProtection": "Biometrie (Fingerabdruck)",
      "biometricProtectionDesc": "Hardware-Anmeldung über Gerätesensor",
      "biometricActivated": "Biometrischer Schutz aktiviert",
      "biometricDisabled": "Biometrischer Schutz deaktiviert",
      "biometricNotConfirmed": "Fingerabdruck nicht bestätigt",
      "touchFingerprintSensor": "Berühren Sie den Fingerabdrucksensor",
      "orSwitchToCode": "Oder zum PIN-Code wechseln",
      "invalidPin": "Ungültiger PIN",
      "invalidPattern": "Ungültiges Muster",
      "fingerprintNotRecognized": "Fingerabdruck nicht erkannt",
      "biometricError": "Biometrischer Authentifizierungsfehler",
      "fingerprintShort": "Fingerabdruck",
      "pinShort": "PIN",
      "patternShort": "Muster"
    },
    "common": {
      "cancel": "Abbrechen",
      "confirm": "Bestätigen",
      "save": "Speichern",
      "delete": "Löschen",
      "edit": "Bearbeiten",
      "back": "Zurück",
      "settings": "Einstellungen",
      "language": "Sprache"
    },
    "about": {
      "title": "Über die App",
      "version": "Version 4.0.0 (Mensor v4.0)",
      "appDescription": "Intelligenter, autarker mobiler Hub für Projekte, Notizen und Aufgaben mit Ende-zu-Ende-Verschlüsselung.",
      "author": "Autor und Entwickler",
      "authorName": "Markus Marrei",
      "license": "Lizenz",
      "licenseName": "Apache 2.0",
      "techStack": "Technologie-Stack",
      "techStackValue": "Vue 3 • Capacitor 7 • Dexie",
      "encryption": "Datenverschlüsselung",
      "encryptionValue": "AES-256-GCM (Lokal)",
      "offlineFirstTitle": "100% Offline-First",
      "offlineFirstDesc": "Alle Ihre persönlichen Daten, Notizen, Aufgaben und Sprachaufnahmen werden ausschließlich auf dem physischen Speicher Ihres Geräts gespeichert."
    }
  },
  "fr": {
    "profile": {
      "title": "Profil utilisateur",
      "changePhoto": "Changer de photo",
      "uploadPhoto": "Téléverser une photo",
      "removePhoto": "Supprimer",
      "firstName": "Prénom",
      "firstNamePlaceholder": "Votre prénom...",
      "lastName": "Nom",
      "lastNamePlaceholder": "Votre nom (optionnel)...",
      "bio": "À propos de moi",
      "bioPlaceholder": "Quelques mots sur vos objectifs...",
      "saveProfile": "Enregistrer le profil"
    },
    "appName": "Mensor: Notes de Projet",
    "appSubtitle": "Hub intelligent pour notes, tâches et projets",
    "nav": {
      "dashboard": "Accueil",
      "schedule": "Tâches",
      "notes": "Notes",
      "projects": "Projets",
      "assistant": "Assistant"
    },
    "dashboard": {
      "greeting": "Salut,",
      "motto": "Construisez ce que vous aimez. Pas à pas.",
      "badgeQuote": "Pas à pas ✨",
      "quoteBottom": "~ Mieux qu’hier ✨",
      "weekSummaryTitle": "Cette semaine",
      "yearSummaryTitle": "Bilan annuel",
      "keepGoing": "Continuez ainsi",
      "currentProjects": "Projets en cours",
      "seeAll": "Tout voir",
      "todayTasks": "Tâches du jour",
      "emptyTasks": "Aucune tâche aujourd’hui. Bravo !",
      "emptyProjects": "Aucun projet actif pour l’instant.",
      "tasksWord": "tâches",
      "forThisWeek": "cette semaine",
      "todayWord": "aujourd’hui",
      "pace": "rythme",
      "completedWord": "Terminé :",
      "projectsWord": "Projets :",
      "inProgressWord": "en cours",
      "createFirstProject": "+ Créer un premier projet"
    },
    "schedule": {
      "title": "Planning",
      "subtitle": "Planifier aujourd’hui. Bâtir demain.",
      "today": "Aujourd’hui",
      "addTask": "Nouvelle tâche",
      "noTasksForDay": "Rien de prévu pour ce jour",
      "high": "haute",
      "medium": "moyenne",
      "low": "basse"
    },
    "notes": {
      "title": "Notes",
      "searchPlaceholder": "Rechercher des notes...",
      "newNote": "Nouvelle note",
      "emptyNotes": "Aucune note pour l’instant",
      "speakText": "Lire le texte",
      "stopSpeech": "Arrêter",
      "attachImage": "Joindre une image",
      "save": "Enregistrer",
      "delete": "Supprimer",
      "titlePlaceholder": "Titre de la note...",
      "contentPlaceholder": "Écrivez vos pensées..."
    },
    "projects": {
      "title": "Projets",
      "newProject": "Nouveau projet",
      "projectNotes": "Notes du projet",
      "projectTasks": "Tâches du projet",
      "emptyProjects": "Aucun projet créé",
      "emptyProjectNotes": "Aucune note dans ce projet",
      "deleteConfirm": "Supprimer ce projet avec toutes ses notes ?",
      "progress": "Progression",
      "inProgress": "En cours",
      "noDescription": "Sans description"
    },
    "ai": {
      "title": "Assistant IA",
      "subtitle": "Conseiller contextuel pour projets et tâches",
      "chooseModelTitle": "Choisir le modèle d’IA",
      "chooseModelDesc": "Modèle local ou connexion API",
      "gemma3Title": "Gemma 3 (1B)",
      "gemma3Desc": "Rapide et léger (~700 Mo)",
      "gemma4Title": "Gemma 4-E2B (2B)",
      "gemma4Desc": "Raisonnement avancé (~1.4 Go)",
      "externalApiTitle": "API externe / PC local",
      "externalApiDesc": "OpenRouter ou LM Studio/Ollama par Wi-Fi",
      "inputPlaceholder": "Posez une question sur vos projets...",
      "send": "Envoyer",
      "clearMemory": "Effacer l’historique",
      "memoryCleaned": "Historique effacé",
      "activeContext": "Contexte actif",
      "todaySnapshot": "Aperçu du système",
      "quickQuery1": "Quelles sont mes tâches aujourd’hui ?",
      "quickQuery2": "Résume mes projets actuels",
      "quickQuery3": "Qu’est-ce qui nécessite mon attention ?",
      "greetingTitle": "Comment puis-je vous aider aujourd’hui ?",
      "greetingSubtitle": "J’ai accès à votre planning, vos projets et vos notes. Posez votre question :",
      "listening": "À l’écoute... Parlez maintenant",
      "analyzing": "Analyse du contexte...",
      "voiceNotSupported": "La reconnaissance vocale n’est pas prise en charge."
    },
    "settings": {
      "general": "Général",
      "aiModels": "Modèles IA",
      "backup": "Sauvegarde & Restauration",
      "userName": "Nom d’utilisateur",
      "language": "Langue de l’interface",
      "aiInferenceSource": "Configurer le moteur d’inférence de l’assistant :",
      "gemma3CardTitle": "Gemma 3 (1B)",
      "gemma3CardDesc": "Rapide et léger pour smartphone (~700 Mo)",
      "gemma4CardTitle": "Gemma 4-E2B (2B)",
      "gemma4CardDesc": "Pour smartphones puissants (8+ Go RAM, ~1.4 Go)",
      "externalApiCardTitle": "API externe / PC (Ollama / LM Studio)",
      "externalApiCardDesc": "OpenRouter, DeepSeek ou serveur local Wi-Fi",
      "apiBaseUrl": "API Base URL",
      "apiKey": "Clé API (si requis)",
      "saveAiSettings": "Enregistrer les paramètres IA",
      "settingsSaved": "Paramètres enregistrés avec succès",
      "download": "Télécharger",
      "downloading": "Téléchargement...",
      "downloaded": "Téléchargé",
      "deleteModel": "Supprimer",
      "defaultModel": "Par défaut",
      "setDefault": "Sélectionner",
      "exportTitle": "Exporter l’archive chiffrée",
      "exportDesc": "Tous vos projets, notes et tâches seront chiffrés avec AES-256-GCM.",
      "exportButton": "Exporter en .mensor",
      "importTitle": "Restaurer depuis une sauvegarde",
      "importDesc": "Sélectionnez un fichier .mensor pour restaurer vos entrées.",
      "chooseFile": "Choisir le fichier .mensor",
      "passwordPlaceholder": "Mot de passe de chiffrement...",
      "enterPasswordError": "Veuillez saisir un mot de passe",
      "exportSuccess": "✓ Sauvegarde créée avec succès !",
      "importSuccess": "Données restaurées avec succès !",
      "decryptError": "Échec du déchiffrement : mot de passe erroné.",
      "security": "Sécurité",
      "about": "À propos"
    },
    "security": {
      "title": "Sécurité",
      "chooseMethod": "Méthode de protection",
      "biometric": "Biométrie",
      "pin": "Code PIN",
      "pattern": "Schéma",
      "none": "Aucune protection",
      "enterPin": "Entrez le PIN",
      "drawPattern": "Dessinez le schéma",
      "unlock": "Déverrouiller",
      "backupTitle": "Sauvegarde",
      "exportBackup": "Exporter les données (.mensor)",
      "importBackup": "Importer des données",
      "passwordPlaceholder": "Mot de passe...",
      "safeVault": "Espace personnel",
      "pinProtection": "Protection par code PIN",
      "pinProtectionDesc": "Exiger un code numérique au lancement",
      "changePin": "Modifier le code PIN →",
      "setPinTitle": "Configurer le code PIN",
      "newPinLabel": "Nouveau PIN (4-6 chiffres)",
      "confirmPinLabel": "Répéter le PIN",
      "savePin": "Enregistrer le PIN",
      "pinLengthError": "Le PIN doit comporter au moins 4 chiffres",
      "pinMismatchError": "Les codes PIN saisis ne correspondent pas",
      "pinSavedSuccess": "Code PIN configuré avec succès",
      "pinDisabled": "Protection par code PIN désactivée",
      "patternProtection": "Schéma de verrouillage",
      "patternProtectionDesc": "Déverrouillage en reliant des points 3x3",
      "changePattern": "Redessiner le schéma →",
      "setPatternTitle": "Nouveau schéma",
      "patternInstructions": "Reliez les points pour définir votre schéma",
      "patternMinPointsError": "Reliez au moins 4 points",
      "patternSavedSuccess": "Schéma enregistré avec succès",
      "patternDisabled": "Schéma de verrouillage désactivé",
      "biometricProtection": "Biométrie (Empreinte digitale)",
      "biometricProtectionDesc": "Connexion matérielle via le capteur de l'appareil",
      "biometricActivated": "Protection biométrique activée",
      "biometricDisabled": "Protection biométrique désactivée",
      "biometricNotConfirmed": "Empreinte non confirmée",
      "touchFingerprintSensor": "Touchez le capteur d'empreintes",
      "orSwitchToCode": "Ou basculer vers le code PIN",
      "invalidPin": "Code PIN invalide",
      "invalidPattern": "Schéma invalide",
      "fingerprintNotRecognized": "Empreinte digitale non reconnue",
      "biometricError": "Erreur d'authentification biométrique",
      "fingerprintShort": "Empreinte",
      "pinShort": "Code PIN",
      "patternShort": "Schéma"
    },
    "common": {
      "cancel": "Annuler",
      "confirm": "Confirmer",
      "save": "Enregistrer",
      "delete": "Supprimer",
      "edit": "Modifier",
      "back": "Retour",
      "settings": "Paramètres",
      "language": "Langue"
    },
    "about": {
      "title": "À propos",
      "version": "Version 4.0.0 (Mensor v4.0)",
      "appDescription": "Hub mobile autonome et intelligent pour vos projets, notes et tâches avec chiffrement de bout en bout.",
      "author": "Auteur et développeur",
      "authorName": "Markus Marrei",
      "license": "Licence",
      "licenseName": "Apache 2.0",
      "techStack": "Stack technique",
      "techStackValue": "Vue 3 • Capacitor 7 • Dexie",
      "encryption": "Chiffrement des données",
      "encryptionValue": "AES-256-GCM (Local)",
      "offlineFirstTitle": "100% Offline-First",
      "offlineFirstDesc": "Toutes vos données personnelles, pensées, tâches et enregistrements vocaux restent exclusivement sur la mémoire physique de votre appareil."
    }
  },
  "pt": {
    "profile": {
      "title": "Perfil do Usuário",
      "changePhoto": "Alterar foto",
      "uploadPhoto": "Carregar foto",
      "removePhoto": "Remover",
      "firstName": "Nome",
      "firstNamePlaceholder": "Seu nome...",
      "lastName": "Sobrenome",
      "lastNamePlaceholder": "Seu sobrenome (opcional)...",
      "bio": "Sobre você",
      "bioPlaceholder": "Algumas palavras sobre seus objetivos...",
      "saveProfile": "Salvar perfil"
    },
    "appName": "Mensor: Notas de Projeto",
    "appSubtitle": "Hub inteligente para notas, tarefas e projetos",
    "nav": {
      "dashboard": "Início",
      "schedule": "Tarefas",
      "notes": "Notas",
      "projects": "Projetos",
      "assistant": "Assistente"
    },
    "dashboard": {
      "greeting": "Olá,",
      "motto": "Construa o que você ama. Passo a passo.",
      "badgeQuote": "Passo a paso ✨",
      "quoteBottom": "~ Melhor que ontem ✨",
      "weekSummaryTitle": "Esta semana",
      "yearSummaryTitle": "Estatísticas do ano",
      "keepGoing": "Continue assim",
      "currentProjects": "Projetos atuais",
      "seeAll": "Ver todos",
      "todayTasks": "Tarefas de hoje",
      "emptyTasks": "Nenhuma tarefa para hoje. Ótimo trabalho!",
      "emptyProjects": "Nenhum projeto ativo ainda.",
      "tasksWord": "tarefas",
      "forThisWeek": "esta semana",
      "todayWord": "hoje",
      "pace": "ritmo",
      "completedWord": "Concluído:",
      "projectsWord": "Projetos:",
      "inProgressWord": "em andamento",
      "createFirstProject": "+ Criar primeiro projeto"
    },
    "schedule": {
      "title": "Agenda",
      "subtitle": "Planeje hoje. Construa amanhã.",
      "today": "Hoje",
      "addTask": "Nova tarefa",
      "noTasksForDay": "Nada planejado para este dia",
      "high": "alta",
      "medium": "média",
      "low": "baixa"
    },
    "notes": {
      "title": "Notas",
      "searchPlaceholder": "Buscar notas...",
      "newNote": "Nova nota",
      "emptyNotes": "Nenhuma nota ainda",
      "speakText": "Ouvir texto",
      "stopSpeech": "Parar",
      "attachImage": "Anexar imagem",
      "save": "Salvar",
      "delete": "Excluir",
      "titlePlaceholder": "Título da nota...",
      "contentPlaceholder": "Escreva seus pensamentos..."
    },
    "projects": {
      "title": "Projetos",
      "newProject": "Novo projeto",
      "projectNotes": "Notas do projeto",
      "projectTasks": "Tarefas do projeto",
      "emptyProjects": "Nenhum projeto criado",
      "emptyProjectNotes": "Nenhuma nota neste projeto ainda",
      "deleteConfirm": "Excluir este projeto e todas as notas?",
      "progress": "Progresso",
      "inProgress": "Em andamento",
      "noDescription": "Sem descrição"
    },
    "ai": {
      "title": "Assistente IA",
      "subtitle": "Consultor contextual para projetos e tarefas",
      "chooseModelTitle": "Escolher modelo de IA",
      "chooseModelDesc": "Modelo local ou conexão via API",
      "gemma3Title": "Gemma 3 (1B)",
      "gemma3Desc": "Rápido e leve (~700 MB)",
      "gemma4Title": "Gemma 4-E2B (2B)",
      "gemma4Desc": "Raciocínio avançado (~1.4 GB)",
      "externalApiTitle": "API externa / PC local",
      "externalApiDesc": "OpenRouter ou LM Studio/Ollama por Wi-Fi",
      "inputPlaceholder": "Pergunte sobre seus projetos...",
      "send": "Enviar",
      "clearMemory": "Limpar histórico",
      "memoryCleaned": "Histórico limpo",
      "activeContext": "Contexto ativo",
      "todaySnapshot": "Resumo do sistema",
      "quickQuery1": "Quais são minhas tarefas de hoje?",
      "quickQuery2": "Resuma meus projetos atuais",
      "quickQuery3": "O que precisa da minha atenção primeiro?",
      "greetingTitle": "Como posso ajudar você hoje?",
      "greetingSubtitle": "Vejo toda a sua agenda de hoje, projetos e notas. Faça qualquer pergunta:",
      "listening": "Ouvindo... Fale agora",
      "analyzing": "Analisando contexto...",
      "voiceNotSupported": "Reconhecimento de voz não suportado."
    },
    "settings": {
      "general": "Geral",
      "aiModels": "Modelos IA",
      "backup": "Backup e Restauração",
      "userName": "Nome de usuário",
      "language": "Idioma da interface",
      "aiInferenceSource": "Configurar mecanismo de inferência da IA:",
      "gemma3CardTitle": "Gemma 3 (1B)",
      "gemma3CardDesc": "Rápido e leve para smartphone (~700 MB)",
      "gemma4CardTitle": "Gemma 4-E2B (2B)",
      "gemma4CardDesc": "Para smartphones potentes (8+ GB RAM, ~1.4 GB)",
      "externalApiCardTitle": "API externa / PC (Ollama / LM Studio)",
      "externalApiCardDesc": "OpenRouter, DeepSeek ou servidor local Wi-Fi",
      "apiBaseUrl": "API Base URL",
      "apiKey": "Chave API (se necessário)",
      "saveAiSettings": "Salvar configurações de IA",
      "settingsSaved": "Configurações salvas com sucesso",
      "download": "Baixar",
      "downloading": "Baixando...",
      "downloaded": "Baixado",
      "deleteModel": "Excluir",
      "defaultModel": "Padrão",
      "setDefault": "Selecionar",
      "exportTitle": "Exportar arquivo criptografado",
      "exportDesc": "Todos os seus projetos, notas e tarefas serão criptografados com AES-256-GCM.",
      "exportButton": "Exportar para .mensor",
      "importTitle": "Restaurar de backup",
      "importDesc": "Selecione um arquivo .mensor para restaurar suas informações.",
      "chooseFile": "Selecionar arquivo .mensor",
      "passwordPlaceholder": "Criar senha de criptografia...",
      "enterPasswordError": "Digite uma senha de criptografia",
      "exportSuccess": "✓ Backup criado e salvo com sucesso!",
      "importSuccess": "Dados restaurados com sucesso!",
      "decryptError": "Falha ao descriptografar: senha inválida.",
      "security": "Segurança",
      "about": "Sobre o app"
    },
    "security": {
      "title": "Segurança",
      "chooseMethod": "Método de proteção",
      "biometric": "Biometria",
      "pin": "Código PIN",
      "pattern": "Padrão",
      "none": "Sem proteção",
      "enterPin": "Digite o PIN",
      "drawPattern": "Desenhe o padrão",
      "unlock": "Desbloquear",
      "backupTitle": "Backup",
      "exportBackup": "Exportar dados (.mensor)",
      "importBackup": "Importar dados",
      "passwordPlaceholder": "Senha do backup...",
      "safeVault": "Espaço Pessoal",
      "pinProtection": "Proteção por PIN",
      "pinProtectionDesc": "Exigir código numérico ao iniciar",
      "changePin": "Alterar PIN →",
      "setPinTitle": "Configurar código PIN",
      "newPinLabel": "Novo PIN (4-6 dígitos)",
      "confirmPinLabel": "Repetir PIN",
      "savePin": "Salvar PIN",
      "pinLengthError": "O PIN deve ter pelo menos 4 dígitos",
      "pinMismatchError": "Os códigos PIN informados não coincidem",
      "pinSavedSuccess": "Código PIN configurado com sucesso",
      "pinDisabled": "Proteção por PIN desativada",
      "patternProtection": "Padrão de desbloqueio",
      "patternProtectionDesc": "Desbloqueio ligando pontos 3x3",
      "changePattern": "Redesenhar padrão →",
      "setPatternTitle": "Novo padrão de desbloqueio",
      "patternInstructions": "Ligue os pontos para definir o padrão",
      "patternMinPointsError": "Conecte pelo menos 4 pontos",
      "patternSavedSuccess": "Padrão salvo com sucesso",
      "patternDisabled": "Padrão de desbloqueio desativado",
      "biometricProtection": "Biometria (Impressão digital)",
      "biometricProtectionDesc": "Login biométrico através do sensor do aparelho",
      "biometricActivated": "Proteção biométrica ativada",
      "biometricDisabled": "Proteção biométrica desativada",
      "biometricNotConfirmed": "Impressão digital não confirmada",
      "touchFingerprintSensor": "Toque no sensor de impressão digital",
      "orSwitchToCode": "Ou mude para o código PIN",
      "invalidPin": "Código PIN inválido",
      "invalidPattern": "Padrão inválido",
      "fingerprintNotRecognized": "Impressão digital não reconhecida",
      "biometricError": "Erro de autenticação biométrica",
      "fingerprintShort": "Digital",
      "pinShort": "PIN",
      "patternShort": "Padrão"
    },
    "common": {
      "cancel": "Cancelar",
      "confirm": "Confirmar",
      "save": "Salvar",
      "delete": "Excluir",
      "edit": "Editar",
      "back": "Voltar",
      "settings": "Configurações",
      "language": "Idioma"
    },
    "about": {
      "title": "Sobre o app",
      "version": "Versão 4.0.0 (Mensor v4.0)",
      "appDescription": "Hub móvel inteligente e autônomo para projetos, notas e tarefas com criptografia de ponta a ponta.",
      "author": "Autor e desenvolvedor",
      "authorName": "Markus Marrei",
      "license": "Licença",
      "licenseName": "Apache 2.0",
      "techStack": "Stack tecnológico",
      "techStackValue": "Vue 3 • Capacitor 7 • Dexie",
      "encryption": "Criptografia de dados",
      "encryptionValue": "AES-256-GCM (Local)",
      "offlineFirstTitle": "100% Offline-First",
      "offlineFirstDesc": "Todos os seus dados pessoais, anotações, tarefas e áudios são salvos exclusivamente no armazenamento físico do seu dispositivo."
    }
  },
  "it": {
    "profile": {
      "title": "Profilo utente",
      "changePhoto": "Cambia foto",
      "uploadPhoto": "Carica foto",
      "removePhoto": "Rimuovi",
      "firstName": "Nome",
      "firstNamePlaceholder": "Il tuo nome...",
      "lastName": "Cognome",
      "lastNamePlaceholder": "Il tuo cognome (opzionale)...",
      "bio": "Su di te",
      "bioPlaceholder": "Qualche parola sui tuoi obiettivi...",
      "saveProfile": "Salva profilo"
    },
    "appName": "Mensor: Note di Progetto",
    "appSubtitle": "Hub intelligente per note, compiti e progetti",
    "nav": {
      "dashboard": "Home",
      "schedule": "Attività",
      "notes": "Note",
      "projects": "Progetti",
      "assistant": "Assistente"
    },
    "dashboard": {
      "greeting": "Ciao,",
      "motto": "Costruisci ciò che ami. Un passo alla volta.",
      "badgeQuote": "Passo dopo passo ✨",
      "quoteBottom": "~ Meglio di ieri ✨",
      "weekSummaryTitle": "Questa settimana",
      "yearSummaryTitle": "Statistiche annuali",
      "keepGoing": "Continua così",
      "currentProjects": "Progetti attuali",
      "seeAll": "Vedi tutti",
      "todayTasks": "Attività di oggi",
      "emptyTasks": "Nessuna attività per oggi. Ottimo!",
      "emptyProjects": "Nessun progetto attivo al momento.",
      "tasksWord": "attività",
      "forThisWeek": "questa settimana",
      "todayWord": "oggi",
      "pace": "passo",
      "completedWord": "Completate:",
      "projectsWord": "Progetti:",
      "inProgressWord": "in corso",
      "createFirstProject": "+ Crea primo progetto"
    },
    "schedule": {
      "title": "Programma",
      "subtitle": "Pianifica oggi. Costruisci il domani.",
      "today": "Oggi",
      "addTask": "Nuova attività",
      "noTasksForDay": "Nulla pianificato per questo giorno",
      "high": "alta",
      "medium": "media",
      "low": "bassa"
    },
    "notes": {
      "title": "Note",
      "searchPlaceholder": "Cerca note...",
      "newNote": "Nuova nota",
      "emptyNotes": "Nessuna nota presente",
      "speakText": "Leggi testo",
      "stopSpeech": "Stop",
      "attachImage": "Allega immagine",
      "save": "Salva",
      "delete": "Elimina",
      "titlePlaceholder": "Titolo della nota...",
      "contentPlaceholder": "Scrivi i tuoi pensieri..."
    },
    "projects": {
      "title": "Progetti",
      "newProject": "Nuovo progetto",
      "projectNotes": "Note del progetto",
      "projectTasks": "Attività del progetto",
      "emptyProjects": "Nessun progetto creato",
      "emptyProjectNotes": "Nessuna nota in questo progetto",
      "deleteConfirm": "Eliminare questo progetto e tutte le note?",
      "progress": "Progresso",
      "inProgress": "In corso",
      "noDescription": "Nessuna descrizione"
    },
    "ai": {
      "title": "Assistente IA",
      "subtitle": "Consulente contestuale per progetti e attività",
      "chooseModelTitle": "Scegli modello IA",
      "chooseModelDesc": "Modello locale o connessione API",
      "gemma3Title": "Gemma 3 (1B)",
      "gemma3Desc": "Veloce e leggero (~700 MB)",
      "gemma4Title": "Gemma 4-E2B (2B)",
      "gemma4Desc": "Ragionamento avanzato (~1.4 GB)",
      "externalApiTitle": "API esterna / PC locale",
      "externalApiDesc": "OpenRouter o LM Studio/Ollama via Wi-Fi",
      "inputPlaceholder": "Chiedi informazioni sui tuoi progetti...",
      "send": "Invia",
      "clearMemory": "Cancella cronologia",
      "memoryCleaned": "Cronologia cancellata",
      "activeContext": "Contesto attivo",
      "todaySnapshot": "Riepilogo di sistema",
      "quickQuery1": "Quali sono le mie attività di oggi?",
      "quickQuery2": "Riassumi i miei progetti attuali",
      "quickQuery3": "Cosa richiede prima la mia attenzione?",
      "greetingTitle": "Come posso aiutarti oggi?",
      "greetingSubtitle": "Vedo il tuo programma di oggi, i progetti e le note. Fai una domanda:",
      "listening": "In ascolto... Parla ora",
      "analyzing": "Analisi del contesto...",
      "voiceNotSupported": "Riconoscimento vocale non supportato."
    },
    "settings": {
      "general": "Generale",
      "aiModels": "Modelli IA",
      "backup": "Backup e Ripristino",
      "userName": "Nome utente",
      "language": "Lingua interfaccia",
      "aiInferenceSource": "Configura il motore di inferenza dell’assistente IA:",
      "gemma3CardTitle": "Gemma 3 (1B)",
      "gemma3CardDesc": "Veloce e leggero per smartphone (~700 MB)",
      "gemma4CardTitle": "Gemma 4-E2B (2B)",
      "gemma4CardDesc": "Per smartphone potenti (8+ GB RAM, ~1.4 GB)",
      "externalApiCardTitle": "API esterna / PC (Ollama / LM Studio)",
      "externalApiCardDesc": "OpenRouter, DeepSeek o server Wi-Fi locale",
      "apiBaseUrl": "API Base URL",
      "apiKey": "Chiave API (se richiesta)",
      "saveAiSettings": "Salva impostazioni IA",
      "settingsSaved": "Impostazioni salvate con successo",
      "download": "Scarica",
      "downloading": "Scaricamento...",
      "downloaded": "Scaricato",
      "deleteModel": "Elimina",
      "defaultModel": "Predefinito",
      "setDefault": "Seleziona",
      "exportTitle": "Esporta archivio crittografato",
      "exportDesc": "Tutti i progetti, note e attività saranno crittografati con AES-256-GCM.",
      "exportButton": "Esporta in .mensor",
      "importTitle": "Ripristina da archivio",
      "importDesc": "Seleziona un file .mensor per ripristinare i tuoi dati.",
      "chooseFile": "Seleziona file .mensor",
      "passwordPlaceholder": "Crea password di crittografia...",
      "enterPasswordError": "Inserisci una password di crittografia",
      "exportSuccess": "✓ Backup creato e salvato con successo!",
      "importSuccess": "Dati ripristinati con successo!",
      "decryptError": "Decrittografia fallita: password errata.",
      "security": "Sicurezza",
      "about": "Informazioni"
    },
    "security": {
      "title": "Sicurezza",
      "chooseMethod": "Metodo di protezione",
      "biometric": "Biometria",
      "pin": "Codice PIN",
      "pattern": "Sequenza",
      "none": "Nessuna protezione",
      "enterPin": "Inserisci PIN",
      "drawPattern": "Disegna sequenza",
      "unlock": "Sblocca",
      "backupTitle": "Backup",
      "exportBackup": "Esporta dati (.mensor)",
      "importBackup": "Importa dati",
      "passwordPlaceholder": "Password di backup...",
      "safeVault": "Spazio Personale",
      "pinProtection": "Protezione con PIN",
      "pinProtectionDesc": "Richiedi codice numerico all'avvio",
      "changePin": "Modifica PIN →",
      "setPinTitle": "Imposta codice PIN",
      "newPinLabel": "Nuovo PIN (4-6 cifre)",
      "confirmPinLabel": "Ripeti PIN",
      "savePin": "Salva PIN",
      "pinLengthError": "Il PIN deve contenere almeno 4 cifre",
      "pinMismatchError": "I codici PIN inseriti non corrispondono",
      "pinSavedSuccess": "Codice PIN impostato con successo",
      "pinDisabled": "Protezione con PIN disattivata",
      "patternProtection": "Sequenza di sblocco",
      "patternProtectionDesc": "Sblocco collegando punti 3x3",
      "changePattern": "Ridisegna sequenza →",
      "setPatternTitle": "Nuova sequenza di sblocco",
      "patternInstructions": "Collega i punti per impostare la sequenza",
      "patternMinPointsError": "Collega almeno 4 punti",
      "patternSavedSuccess": "Sequenza salvata con successo",
      "patternDisabled": "Sequenza di sblocco disattivata",
      "biometricProtection": "Biometria (Impronta digitale)",
      "biometricProtectionDesc": "Accesso hardware tramite il sensore del dispositivo",
      "biometricActivated": "Protezione biometrica attivata",
      "biometricDisabled": "Protezione biometrica disattivata",
      "biometricNotConfirmed": "Impronta non confermata",
      "touchFingerprintSensor": "Tocca il sensore di impronte digitali",
      "orSwitchToCode": "O passa al codice PIN",
      "invalidPin": "Codice PIN non valido",
      "invalidPattern": "Sequenza non valida",
      "fingerprintNotRecognized": "Impronta digitale non riconosciuta",
      "biometricError": "Errore di autenticazione biometrica",
      "fingerprintShort": "Impronta",
      "pinShort": "PIN",
      "patternShort": "Sequenza"
    },
    "common": {
      "cancel": "Annulla",
      "confirm": "Conferma",
      "save": "Salva",
      "delete": "Elimina",
      "edit": "Modifica",
      "back": "Indietro",
      "settings": "Impostazioni",
      "language": "Lingua"
    },
    "about": {
      "title": "Informazioni",
      "version": "Versione 4.0.0 (Mensor v4.0)",
      "appDescription": "Hub mobile intelligente e autonomo per progetti, note e attività con crittografia end-to-end.",
      "author": "Autore e sviluppatore",
      "authorName": "Markus Marrei",
      "license": "Licenza",
      "licenseName": "Apache 2.0",
      "techStack": "Stack tecnologico",
      "techStackValue": "Vue 3 • Capacitor 7 • Dexie",
      "encryption": "Crittografia dei dati",
      "encryptionValue": "AES-256-GCM (Locale)",
      "offlineFirstTitle": "100% Offline-First",
      "offlineFirstDesc": "Tutti i tuoi dati personali, pensieri, attività e registrazioni audio sono archiviati solo nella memoria fisica del tuo dispositivo."
    }
  },
  "ja": {
    "profile": {
      "title": "ユーザープロフィール",
      "changePhoto": "写真を変更",
      "uploadPhoto": "写真をアップロード",
      "removePhoto": "削除",
      "firstName": "名",
      "firstNamePlaceholder": "お名前...",
      "lastName": "姓",
      "lastNamePlaceholder": "苗字 (任意)...",
      "bio": "自己紹介",
      "bioPlaceholder": "目標やモットーなど...",
      "saveProfile": "プロフィールを保存"
    },
    "appName": "Mensor: プロジェクトノート",
    "appSubtitle": "メモ、タスク、プロジェクトのスマートハブ",
    "nav": {
      "dashboard": "ホーム",
      "schedule": "タスク",
      "notes": "メモ",
      "projects": "プロジェクト",
      "assistant": "アシスタント"
    },
    "dashboard": {
      "greeting": "こんにちは、",
      "motto": "大好きなものを創ろう。一歩ずつ。",
      "badgeQuote": "一歩ずつ ✨",
      "quoteBottom": "~ 昨日より前へ ✨",
      "weekSummaryTitle": "今週の概要",
      "yearSummaryTitle": "年間統計",
      "keepGoing": "この調子で続けましょう",
      "currentProjects": "進行中のプロジェクト",
      "seeAll": "すべて見る",
      "todayTasks": "本日のタスク",
      "emptyTasks": "本日のタスクはありません。素晴らしい！",
      "emptyProjects": "アクティブなプロジェクトはまだありません。",
      "tasksWord": "タスク",
      "forThisWeek": "今週",
      "todayWord": "今日",
      "pace": "ペース",
      "completedWord": "完了:",
      "projectsWord": "プロジェクト:",
      "inProgressWord": "進行中",
      "createFirstProject": "+ 最初のプロジェクトを作成"
    },
    "schedule": {
      "title": "スケジュール",
      "subtitle": "今日を計画し、明日を築く。",
      "today": "今日",
      "addTask": "新しいタスク",
      "noTasksForDay": "この日の予定はありません",
      "high": "高",
      "medium": "中",
      "low": "低"
    },
    "notes": {
      "title": "メモ",
      "searchPlaceholder": "メモを検索...",
      "newNote": "新規メモ",
      "emptyNotes": "メモはまだありません",
      "speakText": "テキスト読み上げ",
      "stopSpeech": "停止",
      "attachImage": "画像添付",
      "save": "保存",
      "delete": "削除",
      "titlePlaceholder": "メモのタイトル...",
      "contentPlaceholder": "考えを書き留めましょう..."
    },
    "projects": {
      "title": "プロジェクト",
      "newProject": "新規プロジェクト",
      "projectNotes": "プロジェクトメモ",
      "projectTasks": "プロジェクトタスク",
      "emptyProjects": "プロジェクトはまだありません",
      "emptyProjectNotes": "このプロジェクトにはまだメモがありません",
      "deleteConfirm": "このプロジェクトと関連メモをすべて削除しますか？",
      "progress": "進捗",
      "inProgress": "進行中",
      "noDescription": "説明なし"
    },
    "ai": {
      "title": "AIアシスタント",
      "subtitle": "プロジェクトとタスクのコンテキスト相談役",
      "chooseModelTitle": "AIモデルを選択",
      "chooseModelDesc": "ローカルモデルまたはAPI接続を選択",
      "gemma3Title": "Gemma 3 (1B)",
      "gemma3Desc": "高速＆軽量 (~700 MB)",
      "gemma4Title": "Gemma 4-E2B (2B)",
      "gemma4Desc": "高度な推論 (~1.4 GB)",
      "externalApiTitle": "外部API / 自宅PC",
      "externalApiDesc": "OpenRouter または Wi-Fi経由の LM Studio / Ollama",
      "inputPlaceholder": "プロジェクトやタスクについて質問...",
      "send": "送信",
      "clearMemory": "履歴を消去",
      "memoryCleaned": "会話履歴を消去しました",
      "activeContext": "アクティブコンテキスト",
      "todaySnapshot": "システム概要",
      "quickQuery1": "今日のタスクは何ですか？",
      "quickQuery2": "現在のプロジェクトを要約して",
      "quickQuery3": "まず何に集中すべきですか？",
      "greetingTitle": "今日はどのようなご用件ですか？",
      "greetingSubtitle": "本日の予定、進行中のプロジェクト、メモをすべて把握しています。質問を入力してください:",
      "listening": "聞いています... お話しください",
      "analyzing": "コンテキスト解析中...",
      "voiceNotSupported": "音声認識はこのブラウザでサポートされていません。"
    },
    "settings": {
      "general": "一般",
      "aiModels": "AIモデル",
      "backup": "バックアップと復元",
      "userName": "ユーザー名",
      "language": "表示言語",
      "aiInferenceSource": "AIアシスタントの推論エンジン設定:",
      "gemma3CardTitle": "Gemma 3 (1B)",
      "gemma3CardDesc": "スマートフォン向け高速＆軽量 (~700 MB)",
      "gemma4CardTitle": "Gemma 4-E2B (2B)",
      "gemma4CardDesc": "高性能スマートフォン向け (8+ GB RAM, ~1.4 GB)",
      "externalApiCardTitle": "外部API / PC (Ollama / LM Studio)",
      "externalApiCardDesc": "OpenRouter、DeepSeek、またはローカルWi-Fiサーバー",
      "apiBaseUrl": "API Base URL",
      "apiKey": "APIキー (必要な場合)",
      "saveAiSettings": "AI設定を保存",
      "settingsSaved": "設定が保存されました",
      "download": "ダウンロード",
      "downloading": "ダウンロード中...",
      "downloaded": "ダウンロード済み",
      "deleteModel": "削除",
      "defaultModel": "デフォルト",
      "setDefault": "選択",
      "exportTitle": "暗号化バックアップのエクスポート",
      "exportDesc": "すべてのプロジェクト、メモ、タスクがAES-256-GCMで暗号化されます。",
      "exportButton": ".mensor にエクスポート",
      "importTitle": "バックアップから復元",
      "importDesc": ".mensorファイルを選択してデータを復元します。",
      "chooseFile": ".mensorファイルを選択",
      "passwordPlaceholder": "暗号化パスワードを入力...",
      "enterPasswordError": "暗号化パスワードを入力してください",
      "exportSuccess": "✓ バックアップが作成・保存されました！",
      "importSuccess": "データが正常に復元されました！",
      "decryptError": "復号化に失敗しました: パスワードが無効です。",
      "security": "セキュリティ",
      "about": "アプリについて"
    },
    "security": {
      "title": "セキュリティ",
      "chooseMethod": "アプリ保護方式",
      "biometric": "生体認証",
      "pin": "PINコード",
      "pattern": "パターンロック",
      "none": "保護なし",
      "enterPin": "PINを入力",
      "drawPattern": "パターンを描く",
      "unlock": "ロック解除",
      "backupTitle": "バックアップ",
      "exportBackup": "データエクスポート (.mensor)",
      "importBackup": "データインポート",
      "passwordPlaceholder": "パスワード...",
      "safeVault": "プライベートスペース",
      "pinProtection": "PINコード保護",
      "pinProtectionDesc": "起動時に数字コードを要求",
      "changePin": "PINコードを変更 →",
      "setPinTitle": "PINコードの設定",
      "newPinLabel": "新しいPIN（4〜6桁）",
      "confirmPinLabel": "PINの再入力",
      "savePin": "PINを保存",
      "pinLengthError": "PINは4桁以上である必要があります",
      "pinMismatchError": "入力されたPINコードが一致しません",
      "pinSavedSuccess": "PINコードが正常に設定されました",
      "pinDisabled": "PIN保護が無効化されました",
      "patternProtection": "パターンロック",
      "patternProtectionDesc": "3x3の点を結んでロック解除",
      "changePattern": "パターンを再設定 →",
      "setPatternTitle": "新しいパターンロック",
      "patternInstructions": "点を結んでロック解除パターンを設定してください",
      "patternMinPointsError": "少なくとも4つの点を結んでください",
      "patternSavedSuccess": "パターンが正常に保存されました",
      "patternDisabled": "パターンロックが無効化されました",
      "biometricProtection": "生体認証（指紋）",
      "biometricProtectionDesc": "端末センサーによる生体ログイン",
      "biometricActivated": "生体認証が有効になりました",
      "biometricDisabled": "生体認証が無効になりました",
      "biometricNotConfirmed": "指紋が確認されませんでした",
      "touchFingerprintSensor": "指紋センサーにタッチしてください",
      "orSwitchToCode": "またはPINコードに切り替え",
      "invalidPin": "無効なPINコードです",
      "invalidPattern": "無効なパターンです",
      "fingerprintNotRecognized": "指紋が認識されませんでした",
      "biometricError": "生体認証エラー",
      "fingerprintShort": "指紋",
      "pinShort": "PIN",
      "patternShort": "パターン"
    },
    "common": {
      "cancel": "キャンセル",
      "confirm": "確認",
      "save": "保存",
      "delete": "削除",
      "edit": "編集",
      "back": "戻る",
      "settings": "設定",
      "language": "言語"
    },
    "about": {
      "title": "アプリについて",
      "version": "バージョン 4.0.0 (Mensor v4.0)",
      "appDescription": "エンドツーエンド暗号化を備えた、プロジェクト・メモ・タスクのためのインテリジェントな完全オフラインハブ。",
      "author": "開発者・著者",
      "authorName": "Markus Marrei",
      "license": "ライセンス",
      "licenseName": "Apache 2.0",
      "techStack": "技術スタック",
      "techStackValue": "Vue 3 • Capacitor 7 • Dexie",
      "encryption": "データ暗号化",
      "encryptionValue": "AES-256-GCM（ローカル）",
      "offlineFirstTitle": "100% オフライン優先",
      "offlineFirstDesc": "すべての個人データ、メモ、タスク、音声録音はデバイスの物理ストレージにのみ保存され、外部サーバーに送信されることはありません。"
    }
  },
  "ko": {
    "profile": {
      "title": "사용자 프로필",
      "changePhoto": "사진 변경",
      "uploadPhoto": "사진 업로드",
      "removePhoto": "삭제",
      "firstName": "이름",
      "firstNamePlaceholder": "이름을 입력하세요...",
      "lastName": "성",
      "lastNamePlaceholder": "성 (선택 사항)...",
      "bio": "소개",
      "bioPlaceholder": "목표나 좌우명을 적어보세요...",
      "saveProfile": "프로필 저장"
    },
    "appName": "Mensor: 프로젝트 노트",
    "appSubtitle": "노트, 작업, 프로젝트를 위한 스마트 허브",
    "nav": {
      "dashboard": "홈",
      "schedule": "일정",
      "notes": "노트",
      "projects": "프로젝트",
      "assistant": "어시스턴트"
    },
    "dashboard": {
      "greeting": "안녕하세요,",
      "motto": "좋아하는 것을 만드세요. 한 걸음씩.",
      "badgeQuote": "한 걸음씩 ✨",
      "quoteBottom": "~ 어제보다 더 나은 오늘 ✨",
      "weekSummaryTitle": "이번 주",
      "yearSummaryTitle": "연간 통계",
      "keepGoing": "계속 나아가세요",
      "currentProjects": "진행 중인 프로젝트",
      "seeAll": "모두 보기",
      "todayTasks": "오늘의 작업",
      "emptyTasks": "오늘 예정된 작업이 없습니다.",
      "emptyProjects": "활성화된 프로젝트가 없습니다.",
      "tasksWord": "작업",
      "forThisWeek": "이번 주",
      "todayWord": "오늘",
      "pace": "페이스",
      "completedWord": "완료됨:",
      "projectsWord": "프로젝트:",
      "inProgressWord": "진행 중",
      "createFirstProject": "+ 첫 프로젝트 만들기"
    },
    "schedule": {
      "title": "일정",
      "subtitle": "오늘을 계획하고, 내일을 만듭니다.",
      "today": "오늘",
      "addTask": "새 작업",
      "noTasksForDay": "이 날짜에 계획된 일정이 없습니다",
      "high": "높음",
      "medium": "중간",
      "low": "낮음"
    },
    "notes": {
      "title": "노트",
      "searchPlaceholder": "노트 검색...",
      "newNote": "새 노트",
      "emptyNotes": "노트가 없습니다",
      "speakText": "텍스트 읽기",
      "stopSpeech": "정지",
      "attachImage": "이미지 첨부",
      "save": "저장",
      "delete": "삭제",
      "titlePlaceholder": "노트 제목...",
      "contentPlaceholder": "생각을 적어보세요..."
    },
    "projects": {
      "title": "프로젝트",
      "newProject": "새 프로젝트",
      "projectNotes": "프로젝트 노트",
      "projectTasks": "프로젝트 작업",
      "emptyProjects": "생성된 프로젝트가 없습니다",
      "emptyProjectNotes": "이 프로젝트에 아직 노트가 없습니다",
      "deleteConfirm": "이 프로젝트와 모든 노트를 삭제하시겠습니까?",
      "progress": "진행률",
      "inProgress": "진행 중",
      "noDescription": "설명 없음"
    },
    "ai": {
      "title": "AI 어시스턴트",
      "subtitle": "프로젝트 및 작업을 위한 컨텍스트 컨설턴트",
      "chooseModelTitle": "AI 모델 선택",
      "chooseModelDesc": "로컬 모델 또는 API 연결",
      "gemma3Title": "Gemma 3 (1B)",
      "gemma3Desc": "빠르고 가벼움 (~700MB)",
      "gemma4Title": "Gemma 4-E2B (2B)",
      "gemma4Desc": "고급 추론 (~1.4GB, 고성능 스마트폰용)",
      "externalApiTitle": "외부 API / 홈 PC",
      "externalApiDesc": "OpenRouter 또는 Wi-Fi 기반 LM Studio / Ollama",
      "inputPlaceholder": "프로젝트나 작업에 대해 물어보세요...",
      "send": "전송",
      "clearMemory": "대화 기록 지우기",
      "memoryCleaned": "대화 기록이 초기화되었습니다",
      "activeContext": "활성 컨텍스트",
      "todaySnapshot": "시스템 요약",
      "quickQuery1": "오늘의 작업은 무엇인가요?",
      "quickQuery2": "현재 프로젝트들을 요약해줘",
      "quickQuery3": "가장 먼저 집중해야 할 일은?",
      "greetingTitle": "오늘 무엇을 도와드릴까요?",
      "greetingSubtitle": "오늘의 일정, 진행 중인 프로젝트, 노트를 모두 파악하고 있습니다. 질문을 입력하세요:",
      "listening": "듣고 있습니다... 말씀하세요",
      "analyzing": "컨텍스트 분석 중...",
      "voiceNotSupported": "이 브라우저는 음성 인식을 지원하지 않습니다."
    },
    "settings": {
      "general": "일반",
      "aiModels": "AI 모델",
      "backup": "백업 및 복원",
      "userName": "사용자 이름",
      "language": "표시 언어",
      "aiInferenceSource": "AI 어시스턴트 추론 엔진 구성:",
      "gemma3CardTitle": "Gemma 3 (1B)",
      "gemma3CardDesc": "스마트폰을 위한 빠르고 가벼운 모델 (~700 MB)",
      "gemma4CardTitle": "Gemma 4-E2B (2B)",
      "gemma4CardDesc": "고성능 스마트폰용 (8+ GB RAM, ~1.4 GB)",
      "externalApiCardTitle": "외부 API / PC (Ollama / LM Studio)",
      "externalApiCardDesc": "OpenRouter, DeepSeek 또는 Wi-Fi 로컬 서버",
      "apiBaseUrl": "API Base URL",
      "apiKey": "API 키 (필요한 경우)",
      "saveAiSettings": "AI 설정 저장",
      "settingsSaved": "설정이 성공적으로 저장되었습니다",
      "download": "다운로드",
      "downloading": "다운로드 중...",
      "downloaded": "다운로드됨",
      "deleteModel": "삭제",
      "defaultModel": "기본값",
      "setDefault": "선택",
      "exportTitle": "암호화된 백업 내보내기",
      "exportDesc": "모든 프로젝트, 노트 및 작업이 AES-256-GCM으로 암호화됩니다.",
      "exportButton": ".mensor 로 내보내기",
      "importTitle": "백업에서 복원",
      "importDesc": ".mensor 파일을 선택하여 데이터를 복원하세요.",
      "chooseFile": ".mensor 파일 선택",
      "passwordPlaceholder": "암호화 비밀번호 생성...",
      "enterPasswordError": "암호화 비밀번호를 입력하세요",
      "exportSuccess": "✓ 백업이 성공적으로 생성 및 저장되었습니다!",
      "importSuccess": "데이터가 성공적으로 복원되었습니다!",
      "decryptError": "복호화 실패: 비밀번호가 잘못되었거나 파일이 손상되었습니다.",
      "security": "보안",
      "about": "앱 정보"
    },
    "security": {
      "title": "보안",
      "chooseMethod": "앱 보호 방법",
      "biometric": "생체 인식",
      "pin": "PIN 번호",
      "pattern": "패턴 잠금",
      "none": "보호 안 함",
      "enterPin": "PIN 입력",
      "drawPattern": "패턴 그리기",
      "unlock": "잠금 해제",
      "backupTitle": "백업 및 복원",
      "exportBackup": "데이터 내보내기 (암호화된 .mensor)",
      "importBackup": "데이터 가져오기",
      "passwordPlaceholder": "암호화 비밀번호...",
      "safeVault": "개인 공간",
      "pinProtection": "PIN 코드 보호",
      "pinProtectionDesc": "시작 시 숫자 코드 요구",
      "changePin": "PIN 코드 변경 →",
      "setPinTitle": "PIN 코드 설정",
      "newPinLabel": "새 PIN (4~6자리)",
      "confirmPinLabel": "PIN 확인",
      "savePin": "PIN 저장",
      "pinLengthError": "PIN은 4자리 이상이어야 합니다",
      "pinMismatchError": "입력한 PIN 코드가 일치하지 않습니다",
      "pinSavedSuccess": "PIN 코드가 성공적으로 저장되었습니다",
      "pinDisabled": "PIN 보호가 비활성화되었습니다",
      "patternProtection": "패턴 잠금",
      "patternProtectionDesc": "3x3 점을 연결하여 잠금 해제",
      "changePattern": "패턴 다시 그리기 →",
      "setPatternTitle": "새 잠금 패턴",
      "patternInstructions": "점을 연결하여 잠금 해제 패턴을 설정하세요",
      "patternMinPointsError": "최소 4개의 점을 연결하세요",
      "patternSavedSuccess": "잠금 패턴이 성공적으로 저장되었습니다",
      "patternDisabled": "패턴 잠금이 비활성화되었습니다",
      "biometricProtection": "생체 인증 (지문)",
      "biometricProtectionDesc": "기기 센서를 통한 하드웨어 인증",
      "biometricActivated": "생체 인증이 활성화되었습니다",
      "biometricDisabled": "생체 인증이 비활성화되었습니다",
      "biometricNotConfirmed": "지문이 확인되지 않았습니다",
      "touchFingerprintSensor": "지문 센서를 터치하세요",
      "orSwitchToCode": "또는 PIN 코드로 전환",
      "invalidPin": "잘못된 PIN 코드",
      "invalidPattern": "잘못된 패턴",
      "fingerprintNotRecognized": "지문이 인식되지 않았습니다",
      "biometricError": "생체 인증 오류",
      "fingerprintShort": "지문",
      "pinShort": "PIN",
      "patternShort": "패턴"
    },
    "common": {
      "cancel": "취소",
      "confirm": "확인",
      "save": "저장",
      "delete": "삭제",
      "edit": "수정",
      "back": "뒤로",
      "settings": "설정",
      "language": "언어"
    },
    "about": {
      "title": "앱 정보",
      "version": "버전 4.0.0 (Mensor v4.0)",
      "appDescription": "종단간 암호화(E2EE)를 지원하는 프로젝트, 메모 및 할 일을 위한 지능형 완전 오프라인 모바일 허브.",
      "author": "개발자 및 제작자",
      "authorName": "Markus Marrei",
      "license": "라이선스",
      "licenseName": "Apache 2.0",
      "techStack": "기술 스택",
      "techStackValue": "Vue 3 • Capacitor 7 • Dexie",
      "encryption": "데이터 암호화",
      "encryptionValue": "AES-256-GCM (로컬)",
      "offlineFirstTitle": "100% 오프라인 우선",
      "offlineFirstDesc": "모든 개인 데이터, 생각, 작업 및 음성 녹음은 기기의 물리적 저장소에만 보관되며 외부 서버로 전송되지 않습니다."
    }
  }
};
