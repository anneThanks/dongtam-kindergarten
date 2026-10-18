@echo off
chcp 65001 >nul
echo ========================================================
echo   KHỞI CHẠY ỨNG DỤNG WEB GIÁO DỤC OFFLINE
echo ========================================================
echo Đang kiểm tra môi trường Python...
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Tìm thấy Python. Đang khởi chạy máy chủ nội bộ...
    python server.py
) else (
    echo [INFO] Không có Python. Mở trực tiếp trên trình duyệt mặc định...
    start index.html
)
pause
