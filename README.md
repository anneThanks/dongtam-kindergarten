# 👶 KID-CONNECT AI - Trợ Lý AI Cá Nhân Hóa Đánh Giá Trẻ & Kết Nối Gia Đình

> **DỰ ÁN DỰ THI:** GIẢI THƯỞNG TIÊN PHONG ỨNG DỤNG AI TRONG GIÁO DỤC VIỆT NAM 2026  
> **Bảng A:** Giáo viên & Cán bộ Quản lý khối Mầm non & Tiểu học  
> **Đơn vị phối hợp tổ chức:** Bộ Giáo dục và Đào tạo & Đại học RMIT Việt Nam  

---

## 🌟 I. TỔNG QUAN DỰ ÁN

**KID-CONNECT AI** là ứng dụng web trợ lý sư phạm mầm non thông minh, hoạt động trực tiếp và mượt mà trên cả **máy tính** và **điện thoại di động (iOS / Android)**, giải quyết bài toán cốt lõi:
- **Giảm tải 70-80% thời gian** ghi chép hồ sơ sổ sách cuối ngày cho giáo viên mầm non.
- **Chuẩn hóa đánh giá trẻ** theo đúng 5 lĩnh vực phát triển GDMN của Bộ GD&ĐT (*Thể chất, Nhận thức, Ngôn ngữ, Tình cảm - Kỹ năng xã hội, Thẩm mỹ*).
- **Kết nối gia đình - nhà trường (Home Connection):** Tự động tạo lời nhắn gửi phụ huynh ấm áp và gợi ý hoạt động đồng hành 10-15 phút tại nhà.
- **Xuất thẻ nhật ký số trực quan (Canva Style):** Tải ảnh PNG chất lượng cao gửi Zalo cho phụ huynh chỉ với 1 chạm.
- **Đạo đức AI & Bảo mật dữ liệu trẻ em (Responsible AI):** Công tắc ẩn danh nhân thân học sinh theo Luật Trẻ em 2016.

---

## 🚀 II. CÁC TÍNH NĂNG CHÍNH

1. **🎙️ Nhập liệu giọng nói (Voice-to-Pedagogical Note):**
   - Cô giáo chỉ cần bật micro nói 20-30 giây bằng tiếng Việt tự nhiên cuối ngày (hoặc bấm chọn kịch bản mẫu).
2. **🧠 Động cơ phân tích sư phạm (Pedagogical Rule Engine + Google Gemini AI):**
   - Tự động đối chiếu hành vi thực tế vào 5 lĩnh vực GDMN, chấm điểm sao (1 - 5 sao).
   - Có thể hoạt động offline bằng Rule-Engine nội bộ hoặc kết nối Gemini API để cá nhân hóa sâu sắc.
3. **🎨 Kết xuất thẻ nhật ký số Canva Infographic:**
   - 4 chủ đề rực rỡ sắc màu: *Cầu vồng tươi sáng, Khu vườn khám phá, Đại dương kỳ diệu, Khu rừng cổ tích*.
   - Xuất file ảnh PNG độ nét cao, sao chép nội dung tin nhắn Zalo 1 chạm.
4. **📱 Responsive 100% trên Thiết bị Di động:**
   - Băng chuyền học sinh dạng pill avatar vuốt ngang mượt mà.
   - Thao tác nhanh gọn bằng một tay cho giáo viên trên lớp.

---

## 📂 III. CẤU TRÚC THƯ MỤC

```text
├── kid_connect_app/              # Toàn bộ mã nguồn ứng dụng Web
│   ├── index.html                # Giao diện chính (Single Page App)
│   ├── css/
│   │   └── style.css             # Hệ thống Style hiện đại, Dark/Light, Mobile-first
│   ├── js/
│   │   ├── app.js                # Điều khiển logic giao diện & State
│   │   ├── ai_engine.js          # Bộ phân tích 5 lĩnh vực & Gemini Client
│   │   ├── card_generator.js     # Trình tạo thiệp nhật ký Canva Style
│   │   ├── speech.js             # Nhận diện giọng nói & Giọng đọc tiếng Việt
│   │   └── data.js               # Dữ liệu lớp học, học sinh & kịch bản mẫu
│   └── assets/                   # Ảnh logo, mã QR, banner
├── Huong_Dan_Su_Dung_App_KID_CONNECT.md  # Tài liệu hướng dẫn sử dụng chi tiết
├── Ke_Hoach_Chi_Tiet_Du_An_AI_2026.md     # Thuyết minh sáng kiến sư phạm hoàn chỉnh
├── Kich_Ban_Loi_Binh_Video_5_Phut.md     # Kịch bản video thuyết minh dự thi
├── Noi_Dung_Canva_Poster.md              # Nội dung thiết kế Poster khổ A0
├── Noi_Dung_Canva_Slide_10_Trang.md      # Nội dung Slide thuyết trình chuẩn BTC
├── Chay_App_KID_CONNECT.bat              # Script 1-click khởi chạy app trên Windows
├── server.py                             # Máy chủ mini HTTP Python
└── QR_Code_KID_CONNECT_AI.png            # Mã QR mở nhanh app trên điện thoại
```

---

## 🛠️ IV. HƯỚNG DẪN KHỞI CHẠY

### Cách 1: Chạy nhanh trên Windows (1-Click)
Nhấp đúp chuột vào file:
👉 **`Chay_App_KID_CONNECT.bat`**  
Ứng dụng sẽ tự động mở trên trình duyệt tại: `http://localhost:8080/kid_connect_app/index.html`

### Cách 2: Dùng trực tiếp file HTML
Mở thư mục `kid_connect_app` và nhấp đúp vào file `index.html`.

### Cách 3: Sử dụng trên Điện thoại (iPhone / Android) qua Wi-Fi
1. Đảm bảo điện thoại và máy tính kết nối cùng mạng Wi-Fi.
2. Dùng camera điện thoại quét mã `QR_Code_KID_CONNECT_AI.png` hoặc truy cập địa chỉ IP cục bộ được cấp.

---

## 🛡️ V. CAM KẾT ĐẠO ĐỨC AI
Dự án tuân thủ nghiêm ngặt **Quy tắc Đạo đức AI trong Giáo dục** và **Luật Trẻ em 2016**:
- Quyền quyết định cuối cùng luôn thuộc về giáo viên (*Human-in-the-Loop*).
- Dữ liệu lưu trữ hoàn toàn cục bộ trên trình duyệt (LocalStorage), không tự ý thu thập dữ liệu sinh trắc học hoặc thông tin nhạy cảm của trẻ em.
