@echo off
REM FastDial Project Startup Script
REM This script starts the entire FastDial project including MySQL, Backend, and Frontends

echo.
echo ========================================
echo   FastDial Project Startup
echo ========================================
echo.

REM Get the current directory
setlocal enabledelayedexpansion
set PROJECT_ROOT=%~dp0

REM Start MySQL
echo [1/4] Starting MySQL Server...
start "MySQL Server" cmd /k call "!PROJECT_ROOT!start_mysql.bat"
timeout /t 3 /nobreak

REM Start Backend Server
echo [2/4] Starting Backend Server...
start "Backend Server" cmd /k cd /d "!PROJECT_ROOT!backend" && npm run dev
timeout /t 2 /nobreak

REM Start Admin Frontend
echo [3/4] Starting Admin Frontend...
start "Admin Frontend" cmd /k cd /d "!PROJECT_ROOT!admin_frontend" && npm run dev
timeout /t 2 /nobreak

REM Start User/Vendor Frontend
echo [4/4] Starting User/Vendor Frontend...
start "User/Vendor Frontend" cmd /k cd /d "!PROJECT_ROOT!user_vendor_frontend" && npm run dev

echo.
echo ========================================
echo   All Services Starting...
echo ========================================
echo.
echo Backend:        http://localhost:5000 (or your configured port)
echo Admin Frontend:  http://localhost:5173
echo Vendor Frontend: http://localhost:5174 (or next available port)
echo.
echo All services will open in separate windows above.
echo Close any window to stop that service.
echo.
pause
