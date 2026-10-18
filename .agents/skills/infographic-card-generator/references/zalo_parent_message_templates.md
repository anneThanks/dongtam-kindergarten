# MẪU NỘI DUNG TIN NHẮN ZALO / MẠNG XÃ HỘI GỬI PHỤ HUYNH

Để thuận tiện cho giáo viên gửi tin nhắn trực tiếp qua nhóm hoặc tin nhắn riêng Zalo chỉ với 1 nút "Sao chép tin nhắn Zalo", định dạng văn bản cần có emoji sinh động, bố cục rõ ràng, dễ đọc trên màn hình điện thoại.

---

## 1. MẪU TIN NHẮN NHẬT KÝ NGÀY / TUẦN

```text
🌟 NHẬT KÝ TIẾN BỘ CỦA BÉ HÔM NAY 🌟
Trường Mầm non Phúc Sơn B - Lớp Mẫu giáo A1

👶 Bé: {student_name} ({nickname})
📅 Ngày: {date}

✨ ĐÁNH GIÁ 5 LĨNH VỰC SỰ PHÁT TRIỂN:
🏃 Thể chất: {stars_the_chat}
   👉 {comment_the_chat}

🧠 Nhận thức: {stars_nhan_thuc}
   👉 {comment_nhan_thuc}

🗣️ Ngôn ngữ: {stars_ngon_ngu}
   👉 {comment_ngon_ngu}

🤝 Tình cảm & KNXH: {stars_tinh_cam}
   👉 {comment_tinh_cam}

🎨 Thẩm mỹ: {stars_tham_my}
   👉 {comment_tham_my}

💌 LỜI NHẮN TỪ CÔ GIÁO:
"{parent_message}"

💡 HOẠT ĐỘNG ĐỒNG HÀNH 10 PHÚT CÙNG CON TỐI NAY:
{home_tip}

Chúc bé và gia đình một buổi tối thật nhiều niềm vui và ấm áp! ❤️
```

---

## 2. HÀM JAVASCRIPT COPY 1 CHẠM VÀO CLIPBOARD

```javascript
async function copyZaloMessageToClipboard(formattedText) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(formattedText);
    } else {
      // Fallback cho trình duyệt cũ hoặc không có HTTPS
      const textArea = document.createElement("textarea");
      textArea.value = formattedText;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    alert("Đã sao chép nội dung tin nhắn Zalo thành công! Cô có thể dán (Paste) ngay cho phụ huynh.");
  } catch (err) {
    console.error("Không thể sao chép:", err);
  }
}
```
