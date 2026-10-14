import http.server
import socketserver
import webbrowser
import os
import sys
import socket
import urllib.request
import urllib.parse

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def generate_qr(url):
    try:
        qr_api = f"https://api.qrserver.com/v1/create-qr-code/?size=600x600&data={urllib.parse.quote(url)}"
        out_file = os.path.join(DIRECTORY, "QR_Code_KID_CONNECT_AI.png")
        asset_file = os.path.join(DIRECTORY, "kid_connect_app", "assets", "QR_Code_KID_CONNECT_AI.png")
        urllib.request.urlretrieve(qr_api, out_file)
        if os.path.exists(os.path.dirname(asset_file)):
            import shutil
            shutil.copyfile(out_file, asset_file)
        print(f"  [✓] Đã tạo mã QR Code sắc nét tại: {out_file}")
    except Exception as e:
        print(f"  [!] Lưu ý khi tạo QR: {e}")

def run():
    os.chdir(DIRECTORY)
    local_ip = get_local_ip()
    local_url = f"http://localhost:{PORT}/kid_connect_app/index.html"
    mobile_url = f"http://{local_ip}:{PORT}/kid_connect_app/index.html"

    print("=" * 66)
    print("  KID-CONNECT AI: TRỢ LÝ TRÍ TUỆ NHÂN TẠO MẦM NON")
    print("  Trường Mầm non Phúc Sơn B - Bảng A (Bộ GD&ĐT & RMIT 2026)")
    print("=" * 66)
    print(f"  💻 Trên Máy Tính:  {local_url}")
    print(f"  📱 Trên Điện Thoại: {mobile_url}")
    print("-" * 66)
    print("  Đang khởi tạo mã QR Code cho điện thoại...")
    generate_qr(mobile_url)
    print("=" * 66)
    print("  👉 HƯỚNG DẪN DÙNG TRÊN ĐIỆN THOẠI:")
    print("  1. Kết nối điện thoại vào cùng mạng Wi-Fi với máy tính.")
    print("  2. Mở Camera hoặc Zalo trên điện thoại, quét ảnh 'QR_Code_KID_CONNECT_AI.png'")
    print("     (hoặc nhập trực tiếp link: " + mobile_url + ")")
    print("=" * 66)
    print("  Đang mở ứng dụng trên trình duyệt máy tính...")
    
    webbrowser.open(local_url)

    # Bind to 0.0.0.0 to allow mobile devices on the same Wi-Fi
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"  [✓] Máy chủ đang lắng nghe trên cổng {PORT} (0.0.0.0)...")
        print("  Nhấn Ctrl+C để dừng máy chủ.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  Đã dừng máy chủ.")

if __name__ == "__main__":
    run()
