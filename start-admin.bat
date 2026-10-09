@echo off
rem Double-click on Windows to start the VerifyU admin (needs Node.js 18 or newer from https://nodejs.org)
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js is not installed. Download it from https://nodejs.org and run this again. & pause & exit /b 1)
start "" "http://127.0.0.1:8790/"
node admin\server.mjs
