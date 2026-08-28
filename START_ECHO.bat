@echo off
title ECHO - Societal Innovation Platform

echo Starting ECHO Backend...
start "ECHO Backend" cmd /k "cd /d C:\Users\DARWIN\OneDrive\Documents\SIH_26 && ai\benchmark\.venv\Scripts\python.exe -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000"

timeout /t 3 /nobreak >nul

echo Starting ECHO Frontend...
start "ECHO Frontend" cmd /k "cd /d C:\Users\DARWIN\OneDrive\Documents\SIH_26\frontend && npm run dev"

timeout /t 5 /nobreak >nul

echo Opening ECHO...
start "" "http://localhost:5173"

exit
