@echo off
title Mensor Dev Server
set PATH=C:\Program Files\nodejs;%PATH%
echo ===================================================
echo     MENSOR: PROJECT NOTES (DEV SERVER)
echo ===================================================
echo Запуск локального сервера Vite...
echo Вы можете открыть приложение в браузере или на смартфоне по Wi-Fi.
echo.
npm run dev -- --host --port 5173
pause
