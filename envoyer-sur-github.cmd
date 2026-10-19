@echo off
rem Double-clic : envoie sur GitHub (github.com/Pexi58/questionnaire-pass-sport) les modifications de index.html.
rem Le site https://pexi58.github.io/questionnaire-pass-sport/ se met a jour 1 a 2 minutes apres.
cd /d "%~dp0"
set GIT="C:\Program Files\Git\cmd\git.exe"
%GIT% add -A
%GIT% diff --cached --quiet
if errorlevel 1 %GIT% commit -m "Modifications du %date%"
%GIT% push origin main
echo.
if errorlevel 1 (echo L'envoi a echoue : lisez le message ci-dessus.) else (echo Envoi termine. Vous pouvez fermer cette fenetre.)
pause
