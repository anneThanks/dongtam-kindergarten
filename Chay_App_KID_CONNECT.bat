@echo off
chcp 65001 >nul
title KID-CONNECT AI - Truong Mam Non Phuc Son B
echo ================================================================
echo   ĐANG KHỞI ĐỘNG ỨNG DỤNG KID-CONNECT AI...
echo   Giải Thưởng Tiên Phong AI Trong Giáo Dục Việt Nam 2026
echo ================================================================
echo.
echo Đang mở ứng dụng trên trình duyệt web...
python server.py
if %ERRORLEVEL% NEQ 0 (
    echo Không tìm thấy Python, đang mở trực tiếp file HTML...
    start kid_connect_app\index.html
)
pause
