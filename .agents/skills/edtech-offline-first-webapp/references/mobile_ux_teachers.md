# THIẾT KẾ UX/UI DI ĐỘNG DÀNH CHO GIÁO VIÊN TRONG LỚP HỌC (MOBILE-FIRST)

Giáo viên trong lớp học thường phải vừa quan sát trẻ vừa ghi chú trên điện thoại thông minh, tay có thể bận hoặc thao tác bằng 1 tay (One-handed operation). Thiết kế giao diện cần tuân thủ các nguyên lý sau:

---

## 1. BĂNG CHUYỀN HỌC SINH (HORIZONTAL PILL CAROUSEL)

Thay vì dùng bảng danh sách dài dạng table hoặc dropdown phức tạp:
- Thiết kế thanh trượt ngang cố định ngay đầu trang (hoặc dưới thanh công cụ).
- Mỗi học sinh là 1 "viên thuốc" (pill) gồm ảnh đại diện tròn + biệt danh ngắn gọn (ví dụ: Bé Bon, Bé Tít, Bé Thỏ).
- Đèn trạng thái:
  - Viền xanh lá / dấu tích: Đã hoàn thành ghi chú ngày hôm nay.
  - Viền xám / chấm vàng: Chưa có đánh giá ngày.
- Chạm vào là chuyển đổi bé ngay lập tức với animation mượt mà mà không tải lại trang.

```css
/* CSS Thanh trượt học sinh dạng Pill */
.student-carousel {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 8px 16px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.student-pill {
  flex: 0 0 auto;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 9999px;
  background: var(--surface-card);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}
.student-pill.active {
  border-color: var(--primary-color);
  background: var(--primary-light);
  transform: scale(1.05);
}
```

---

## 2. CHIP GỢI Ý HÀNH VI NHANH (QUICK TAGS / ACTION CHIPS)

Giáo viên không phải lúc nào cũng rảnh để nói hoặc gõ cả câu dài:
- Bố trí các chip từ khóa nhanh theo chủ đề:
  - *Thể chất:* `[Ăn hết suất]`, `[Tự xúc gọn]`, `[Kén rau]`, `[Ngủ ngoan]`, `[Chạy nhảy khỏe]`
  - *Nhận thức:* `[Xếp lego khéo]`, `[Đếm số nhanh]`, `[Tò mò hỏi nhiều]`
  - *Kỹ năng:* `[Nhường bạn đồ chơi]`, `[Tự cất đồ dùng]`, `[Hòa đồng]`
- Khi bấm vào chip, từ khóa tự động được chèn nối tiếp vào ô ghi chú mà không ghi đè nội dung cũ.

---

## 3. THANH ĐIỀU HƯỚNG DƯỚI ĐÁY MÀN HÌNH (BOTTOM NAVIGATION BAR)

- Trên điện thoại di động, thanh menu ở đỉnh màn hình gây mỏi tay khi với ngón cái.
- Bố trí thanh 4 nút ở đáy màn hình (Fixed Bottom Bar):
  1. 🏠 **Đánh giá** (Màn hình chính)
  2. 📇 **Nhật ký thẻ** (Xem thiệp infographic)
  3. 👥 **Lớp học** (Danh sách bé & cấu hình)
  4. ⚙️ **Cài đặt** (Ẩn danh, đổi chủ đề, API Key)
- Tự động ẩn thanh đáy khi bàn phím ảo bật lên để tránh che mất khung nhập liệu.
