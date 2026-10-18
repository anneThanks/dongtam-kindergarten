#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Mini HTTP Server phục vụ chạy ứng dụng Web EdTech qua mạng nội bộ Wi-Fi (LAN)
Tự động tìm IP máy tính, in mã QR trên terminal và mở trình duyệt.
"""

import http.server
import socket
import socketserver
import webbrowser
import os
import sys

PORT = 8080

def get_local_ip():
    """Lấy địa chỉ IPv4 cục bộ trong mạng Wi-Fi LAN."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # Không thực sự kết nối, chỉ dùng để xác định interface mạng
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Thêm CORS và Cache-Control cho môi trường phát triển & kiểm thử
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def main():
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)
    local_ip = get_local_ip()
    
    url_local = f"http://localhost:{PORT}/index.html"
    url_lan = f"http://{local_ip}:{PORT}/index.html"
    
    print("=" * 60)
    print("  🚀 MÁY CHỦ MINI WEB SƯ PHẠM ĐANG KHỞI CHẠY...")
    print("=" * 60)
    print(f"👉 Mở trên máy tính này : {url_local}")
    print(f"📱 Mở trên Điện thoại (Wi-Fi cùng mạng): {url_lan}")
    print("-" * 60)
    print("💡 Mẹo: Quét mã QR hoặc gõ link trên điện thoại để trải nghiệm!")
    print("Nhấn Ctrl + C để dừng máy chủ bất kỳ lúc nào.")
    print("=" * 60)
    
    # Tự động mở trình duyệt máy tính
    webbrowser.open(url_local)

    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nĐã dừng máy chủ an toàn.")

if __name__ == '__main__':
    main()
