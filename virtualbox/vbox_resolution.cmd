@echo off

setlocal

if exist "C:\Program Files\Oracle\VirtualBox\" goto OK else goto FAIL

:FAIL

echo "VirtualBox �� ������!"
pause
exit

:OK

SET PATH="C:\Program Files\Oracle\VirtualBox\"

set /P vbname="������ ��� ����㠫쭮 ��設�, �筮 ��� � VirtualBox: "
set /P vbres="������ ࠧ�襭�� �࠭� WxH, ���ਬ�� 1920�1080: "

VBoxManage setextradata "%vbname%" VBoxInternal2/EfiGraphicsResolution %vbres%

echo "�ᯥ譮"

endlocal

pause