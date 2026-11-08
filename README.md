# Mensor (Project Notes)

<div align="center">

<img src="public/Mensor.jpg" alt="Mensor Logo" width="128" height="128" style="border-radius: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);" />

### Privacy-First Offline Hub for Notes, Schedule & Project Management
**Приватный автономный мобильный хаб для заметок, задач и управления проектами**

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-42b883.svg?logo=vue.js)](https://vuejs.org/)
[![Capacitor](https://img.shields.io/badge/Capacitor-7.0-119eff.svg?logo=capacitor)](https://capacitorjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Android](https://img.shields.io/badge/Platform-Android%20%7C%20Web-3DDC84.svg?logo=android)](https://developer.android.com/)

[English](#english) • [Русский](#русский) • [Getting Started](#getting-started) • [Building APK](#building-android-apk) • [License](#license)

</div>

---

<a name="english"></a>
## English Overview

**Mensor** is a modern, high-performance, offline-first personal hub designed for creators, developers, and thinkers. It brings together rich note-taking, timeline task scheduling, and milestone-driven project organization into a single cohesive interface, shielded by client-side AES-256 encryption and biometric authentication.

### Key Highlights
- **100% Offline-First**: All your thoughts, notes, and task data are stored locally in an embedded IndexedDB database (via Dexie.js). No mandatory cloud connection, zero telemetry, absolute data sovereignty.
- **Client-Side AES-256 Encryption**: Sensitive entries and keys are encrypted directly on your device before writing to disk.
- **Biometric & PIN Lock Screen**: Hardware-backed biometric security (Fingerprint / Face Unlock via Android BiometricPrompt) and quick 4-6 digit numeric PIN.
- **Context-Aware Creation**: The floating action button (+) automatically senses your current view (Tasks in Schedule, Notes in Notes, Projects/Subtasks in Projects) to eliminate repetitive navigation.
- **Natural Voice & Audio**: Native Text-to-Speech (TTS) readout for your notes and speech recognition for hands-free thought capture.
- **Fluid Multi-Form-Factor Layout**: Fully optimized for both handheld smartphones and widescreen tablets with adaptive system bar integration and custom floating navigation.
- **Internationalization (i18n)**: 9 fully translated languages (Russian, English, Spanish, German, French, Portuguese, Italian, Japanese, Korean).

---

<a name="русский"></a>
## О проекте на русском

**Mensor** — это современный автономный персональный хаб для ведения заметок, планирования расписания и управления проектами. Приложение разработано по концепции *offline-first*: все данные шифруются по стандарту AES-256 и хранятся исключительно на физическом носителе устройства пользователя.

### Основные возможности
- **Полная автономность (100% Offline-First)**: Никаких принудительных внешних облаков и сбора метрик. Данные хранятся локально в IndexedDB (Dexie.js).
- **Сквозное шифрование AES-256**: Безопасное локальное хранение ваших персональных данных.
- **Защита входа (Биометрия и PIN-код)**: Вход по отпечатку пальца через аппаратный Android BiometricPrompt или по персональному PIN-коду.
- **Умный контекст создания записей (+)**: Главная кнопка действия автоматически определяет текущий раздел (открывает задачу в расписании, заметку в записках, проект в проектах).
- **Синтез и распознавание речи**: Нативное озвучивание текста заметок (TTS) и голосовой ввод мыслей на лету.
- **Адаптивный интерфейс для планшетов и смартфонов**: Идеальная верстка под экраны любых диагоналей с учетом жестовой навигации и системных панелей Android.
- **Поддержка 9 языков**: Русский, английский, испанский, немецкий, французский, португальский, итальянский, японский, корейский.

---

## Tech Stack & Architecture

```
Mensor/
├── src/
│   ├── components/
│   │   ├── layout/         # TopHeader, BottomNavigation
│   │   ├── modals/         # LockScreenModal, NewItemModal, SettingsModal, ProfileModal
│   │   └── views/          # DashboardView, ScheduleView, NotesView, ProjectsView
│   ├── crypto/             # AES-256-GCM encryption & SHA-256 hashing
│   ├── db/                 # Dexie.js (IndexedDB) offline-first schemas
│   ├── i18n/               # Multi-language dictionary and reactive switchers
│   ├── stores/             # Pinia state stores (app, notes, tasks, projects)
│   ├── utils/              # Native biometrics bridge, TTS, STT helpers
│   ├── App.vue             # Root component with lifecycle & lock guard
│   └── main.ts             # Application entry point
├── android/                # Native Android Capacitor wrapper (Java 17, SDK 35)
├── public/                 # Static assets and icons
└── index.html              # HTML5 entry template
```

- **Frontend Core**: [Vue 3](https://vuejs.org/) (Composition API, `<script setup lang="ts">`)
- **Language**: [TypeScript 5.7](https://www.typescriptlang.org/)
- **Build System**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Mobile Runtime**: [Capacitor 7](https://capacitorjs.com/)
- **Local Database**: [Dexie.js 4](https://dexie.org/)
- **Icons**: [Lucide Vue Next](https://lucide.dev/)

---

<a name="getting-started"></a>
## Getting Started / Быстрый старт

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm** or **pnpm**
- *(For Android mobile compilation)*:
  - **JDK**: Java Development Kit 17
  - **Android Studio** with Android SDK Platform 34 or 35

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/mensor.git
cd mensor
npm install
```

### 2. Run in Development Mode (Web Browser)
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Web Build
```bash
npm run build
```
The compiled static assets will be output to the `dist/` directory.

---

<a name="building-android-apk"></a>
## Building Android APK / Сборка мобильного приложения

Mensor uses Capacitor 7 to bridge the web application to a native Android APK.

### Automated One-Click Build (Windows)
Run the included batch script from the root folder:
```cmd
build_apk.bat
```

### Manual Build via CLI
```bash
# 1. Compile web assets
npm run build

# 2. Sync web assets with native Android project
npx cap sync android

# 3. Build Debug APK using Gradle
cd android
./gradlew assembleDebug     # macOS / Linux
gradlew.bat assembleDebug   # Windows
```

The resulting package will be located at:
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## Security & Privacy Policy

- **No Remote Servers**: Mensor does not require account registration, remote databases, or third-party cloud services.
- **Encryption**: Notes and sensitive items utilize client-side AES-256 encryption.
- **Biometric Data**: Biometric credentials remain strictly in the secure hardware enclave of the device (Android Keystore / BiometricPrompt) and are never accessed by the app code directly.

---

<a name="license"></a>
## Authorship & License / Авторство и лицензия

**Author & Creator / Автор и разработчик:**
- **Markus Marrei** (*Маркус Маррей*)

Distributed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for complete details.

```
Copyright 2026 Markus Marrei (Маркус Маррей)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
