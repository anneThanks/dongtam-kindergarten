# QUY TẮC ĐẠO ĐỨC AI & BẢO MẬT DỮ LIỆU TRẺ EM (RESPONSIBLE AI IN PRESCHOOL)
*(Căn cứ Luật Trẻ em 2016, Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân & Khung UNESCO về AI trong giáo dục)*

---

## 1. NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

1. **Human-in-the-Loop (Giáo viên là người quyết định cuối cùng):**
   - AI chỉ đóng vai trò là "Thư ký hỗ trợ" hoặc "Cố vấn gợi ý" (Co-pilot).
   - Mọi nhận xét, điểm số đánh giá, lời nhắn phụ huynh do AI sinh ra bắt buộc phải được giáo viên xem lại, chỉnh sửa và bấm xác nhận trước khi lưu sổ hoặc gửi cho phụ huynh.
   - Tuyệt đối không tự động gửi nhận xét AI mà không có sự kiểm duyệt của giáo viên.

2. **Quyền riêng tư & Cơ chế ẩn danh nhân thân (Anonymization & Masking):**
   - Tuân thủ Điều 21 và Điều 36 Luật Trẻ em 2016 về bảo vệ thông tin đời sống riêng tư, bí mật cá nhân của trẻ em.
   - **Chế độ Mặt nạ bảo mật (Privacy Masking):** Khi trình chiếu demo, chia sẻ kinh nghiệm chuyên môn hoặc lưu trữ công khai:
     - Tên thật của bé được thay bằng biệt danh hoặc mã định danh (Ví dụ: `Bé Bon (Mã: PSB-01)` thay vì `Nguyễn Tuấn Kiệt`).
     - Ảnh thật của trẻ được thay thế bằng hình hoạt họa Avatar vector ngẫu nhiên (sử dụng DiceBear Bottts/Avatars).
     - Không lưu trữ địa chỉ nhà riêng, bệnh lý nhạy cảm hoặc hoàn cảnh đặc biệt của cha mẹ trên AI đám mây bên thứ ba.

3. **Lưu trữ dữ liệu cục bộ (Offline-First / Local Storage):**
   - Dữ liệu danh sách lớp, nhật ký ngày của trẻ ưu tiên lưu trữ trực tiếp trên thiết bị (LocalStorage / IndexedDB của trình duyệt giáo viên).
   - Không tự động đẩy dữ liệu lên máy chủ trung gian không rõ nguồn gốc.
   - Giáo viên có toàn quyền sao lưu (Backup JSON) và xóa vĩnh viễn (Wipe Data) bất kỳ lúc nào.

4. **Tránh thiên kiến & Dán nhãn tiêu cực (Zero Bias & Non-Stigmatization):**
   - AI không được phép đưa ra các kết luận mang tính chẩn đoán y khoa/tâm lý (như "tự kỷ", "thiểu năng", "chậm phát triển trí tuệ") trừ khi có chỉ định của cơ sở y tế chuyên khoa.
   - Nhận xét luôn hướng tới sự tiến bộ, tôn trọng sự phát triển đa dạng và khác biệt về nhịp độ lớn lên của mỗi cá nhân trẻ.
