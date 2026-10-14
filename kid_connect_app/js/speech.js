/**
 * KID-CONNECT AI - Phân Hệ Nhập Liệu Giọng Nói & Đọc Báo Cáo
 * Sử dụng Web Speech API chuẩn trình duyệt (Chrome, Edge, Cốc Cốc, Safari, Android)
 */

class KidConnectSpeechModule {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.synth = window.speechSynthesis || null;
    this.initRecognition();
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Trình duyệt không hỗ trợ Web Speech API trực tiếp.");
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = "vi-VN"; // Tiếng Việt chuẩn
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onstart = () => {
        this.isListening = true;
        if (this.onStateChange) this.onStateChange(true);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.onStateChange) this.onStateChange(false);
      };

      this.recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        this.isListening = false;
        if (this.onStateChange) this.onStateChange(false);
        if (this.onError) this.onError(event.error);
      };

      this.recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (this.onResult) {
          this.onResult(transcript, event.results[event.results.length - 1].isFinal);
        }
      };
    } catch (e) {
      console.error("Lỗi khởi tạo SpeechRecognition:", e);
    }
  }

  isSupported() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  toggleListening(onResult, onStateChange, onError) {
    this.onResult = onResult;
    this.onStateChange = onStateChange;
    this.onError = onError;

    if (!this.recognition) {
      this.initRecognition();
    }

    if (!this.recognition) {
      alert("Trình duyệt của thầy/cô chưa hỗ trợ nhận diện giọng nói tự động. Vui lòng sử dụng Google Chrome, Microsoft Edge hoặc gõ trực tiếp ghi chú vào ô nhé!");
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    } else {
      try {
        this.recognition.start();
      } catch (e) {
        console.warn("Lỗi khi start recognition:", e);
      }
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  /**
   * Đọc văn bản bằng giọng tiếng Việt (Text-to-Speech)
   */
  speak(text) {
    if (!this.synth) return;
    this.synth.cancel(); // Dừng câu đang đọc trước đó

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "vi-VN";
    utterance.rate = 0.95; // Tốc độ vừa phải, ấm áp
    utterance.pitch = 1.05;

    // Tìm giọng tiếng Việt nếu có trong danh sách giọng của OS
    const voices = this.synth.getVoices();
    const viVoice = voices.find(v => v.lang.includes("vi") || v.lang.includes("VN"));
    if (viVoice) {
      utterance.voice = viVoice;
    }

    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

window.kidConnectSpeech = new KidConnectSpeechModule();
