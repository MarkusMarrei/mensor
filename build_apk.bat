@echo off
title Build Mensor APK
if "%JAVA_HOME%"=="" if exist "C:\src\jdk-17" set JAVA_HOME=C:\src\jdk-17
if "%ANDROID_HOME%"=="" if exist "C:\Android\Sdk" set ANDROID_HOME=C:\Android\Sdk
echo ===================================================
echo     MENSOR: BUILD ANDROID APK
echo ===================================================
echo 1. Компиляция фронтенда Vite...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Ошибка сборки фронтенда!
    pause
    exit /b %errorlevel%
)
echo.
echo 2. Синхронизация с платформой Capacitor Android...
call npx cap sync android
echo.
echo 3. Сборка APK через Gradle...
cd android
call gradlew.bat assembleDebug
cd ..
echo.
echo Готово! Собранный APK находится в:
echo android\app\build\outputs\apk\debug\app-debug.apk
pause
