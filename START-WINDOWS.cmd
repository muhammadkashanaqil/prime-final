@echo off
setlocal
cd /d "%~dp0"
echo.
type VERSION.txt
echo.
echo This window is running the project from:
echo "%CD%"
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or is not on PATH.
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo npm is not installed or is not on PATH.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing the project's locked dependencies...
  call npm ci
  if errorlevel 1 (
    echo Dependency installation failed. Please share the error above.
    pause
    exit /b 1
  )
)
echo Generating the Prisma client. This does not change your database.
call npm run prisma:generate
if errorlevel 1 (
  echo Prisma generation failed. Please share the error above.
  pause
  exit /b 1
)
echo.
echo Open the exact Local URL printed below by Next.js.
echo If port 3000 is already in use, Next.js may choose a different port.
echo.
call npm run dev
pause
