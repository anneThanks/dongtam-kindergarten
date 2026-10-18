# HƯỚNG DẪN TRIỂN KHAI WEB SPEECH API TIẾNG VIỆT ĐA NỀN TẢNG (CHROME, SAFARI IOS, ANDROID)

Web Speech API (`webkitSpeechRecognition` / `SpeechRecognition`) là giải pháp lý tưởng giúp giáo viên ghi nhận xét nhanh bằng giọng nói mà không tốn chi phí API Whisper hay các cloud speech service.

---

## 1. CÁC VẤN ĐỀ ĐẶC THÙ VÀ CÁCH KHẮC PHỤC

### Vấn đề 1: Lỗi `aborted` ngay lập tức trên iOS Safari và Android
- **Nguyên nhân:** Trên di động, nếu đặt thuộc tính `recognition.continuous = true`, trình duyệt Safari và Chrome di động thường chủ động hủy phiên nghe ngay khi người dùng ngưng nói một nhịp nhỏ, gây ra lỗi `event.error = 'aborted'`.
- **Giải pháp chuẩn:**
  ```javascript
  const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);
  // Chỉ bật continuous: true trên Desktop PC/Mac, tắt trên mobile
  this.recognition.continuous = !isMobile;
  this.recognition.interimResults = true;
  this.recognition.lang = "vi-VN";
  ```

### Vấn đề 2: Lỗi `'no-speech'` và `'aborted'` bị nhầm là lỗi hệ thống
- **Nguyên nhân:** Khi cô giáo bấm mic nhưng chưa kịp nói, hoặc bấm mic để dừng lại, trình duyệt sẽ phát sinh sự kiện `error` với mã `'no-speech'` hoặc `'aborted'`.
- **Giải pháp chuẩn:** Không thông báo cảnh báo lỗi làm hoảng người dùng đối với 2 mã lỗi này:
  ```javascript
  this.recognition.onerror = (event) => {
    this.isListening = false;
    this.updateMicUI(false);
    
    // Bỏ qua trạng thái ngắt bình thường
    if (event.error === "aborted" || event.error === "no-speech") {
      return;
    }
    
    console.warn("Lỗi nhận diện giọng nói:", event.error);
    alert("Không thể nhận diện micro: " + event.error);
  };
  ```

---

## 2. BỘ ĐỌC VĂN BẢN TIẾNG VIỆT (SPEECH SYNTHESIS)

Để giúp giáo viên nghe lại báo cáo hoặc hỗ trợ học sinh nghe đọc truyện/nhận xét:

```javascript
speakVietnamese(text) {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel(); // Dừng câu đang đọc trước đó
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "vi-VN";
  utterance.rate = 0.95; // Tốc độ hơi chậm, ấm áp, rõ ràng
  utterance.pitch = 1.05; // Cao độ nhẹ nhàng, chuẩn giọng cô giáo

  // Tìm giọng tiếng Việt ưu tiên (ví dụ giọng Google/Microsoft tiếng Việt)
  const voices = window.speechSynthesis.getVoices();
  const viVoice = voices.find(v => v.lang.includes("vi") || v.lang.includes("VI"));
  if (viVoice) {
    utterance.voice = viVoice;
  }

  window.speechSynthesis.speak(utterance);
}
```
