@echo off

setlocal

if exist "C:\Program Files\Oracle\VirtualBox\" goto OK else goto FAIL

:FAIL

echo "VirtualBox не найден!"
pause
exit

:OK

SET PATH="C:\Program Files\Oracle\VirtualBox\"

set /P vbname="Введите имя виртуально машины, точно как в VirtualBox: "
set /P vbres="Введите разрешение экрана WxH, например 1920х1080: "

VBoxManage setextradata "%vbname%" VBoxInternal2/EfiGraphicsResolution %vbres%

echo "Успешно"

endlocal

pause