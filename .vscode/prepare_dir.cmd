set dir_path=%1

if exist %dir_path% rmdir /S /Q  %dir_path%
mkdir %dir_path%

exit /b 0