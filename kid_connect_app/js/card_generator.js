/**
 * KID-CONNECT AI - Bộ Tạo Thẻ Infographic "Nhật Ký Tiến Bộ Của Bé"
 * Thiết kế chuẩn phong cách Canva Giáo Dục rực rỡ, sắc nét
 */

class KidConnectCardGenerator {
  constructor() {
    this.currentTheme = "theme-rainbow";
  }

  setTheme(themeName) {
    this.currentTheme = themeName;
    const cardEl = document.getElementById("growth-card-preview");
    if (cardEl) {
      cardEl.className = `growth-card ${themeName}`;
    }
  }

  /**
   * Tạo chuỗi sao đánh giá ⭐⭐⭐⭐⭐
   */
  renderStars(count = 5) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= count) {
        stars += `<span class="star filled">★</span>`;
      } else {
        stars += `<span class="star empty">☆</span>`;
      }
    }
    return stars;
  }

  /**
   * Hiển thị Card Infographic trực quan
   */
  renderCard(data, student, className = "Lớp Mẫu Giáo Lớn A1", isMasked = false) {
    const cardContainer = document.getElementById("growth-card-preview");
    if (!cardContainer) return;

    const displayName = isMasked 
      ? `${student.nickName || 'Bé'} (${student.code || 'Mã: PSB-01'})`
      : `${student.name} (${student.nickName || 'Bé Yêu'})`;

    const avatarUrl = isMasked
      ? `https://api.dicebear.com/7.x/bottts/svg?seed=${student.code}&backgroundColor=b6e3f4`
      : (student.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${student.name}&backgroundColor=ffd5dc`);

    const dateStr = data.date ? new Date(data.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : new Date().toLocaleDateString('vi-VN');
    const weekStr = data.week || "Nhật ký đồng hành cùng bé";

    const ratings = data.ratings || { theChat: 5, nhanThuc: 5, ngonNgu: 5, tinhCamXH: 5, thamMy: 5 };

    cardContainer.className = `growth-card ${this.currentTheme}`;
    cardContainer.innerHTML = `
      <div class="card-inner-frame">
        <!-- Trang trí góc -->
        <div class="card-deco deco-tl">🌸</div>
        <div class="card-deco deco-tr">⭐</div>
        <div class="card-deco deco-bl">🎈</div>
        <div class="card-deco deco-br">🌈</div>

        <!-- Header Card -->
        <div class="card-header">
          <div class="card-header-left">
            <div class="card-badge-top">
              <span class="badge-icon">✨</span>
              <span>TRƯỜNG MẦM NON PHÚC SƠN B</span>
            </div>
            <h2 class="card-main-title">NHẬT KÝ TIẾN BỘ CỦA BÉ</h2>
            <div class="card-subtitle-row">
              <span class="class-pill">🏫 ${className}</span>
              <span class="date-pill">📅 ${weekStr} (${dateStr})</span>
            </div>
          </div>
          <div class="card-header-logo">
            <div class="kid-connect-logo-badge">
              <span class="kc-sparkle">🚀</span>
              <div class="kc-text-wrap">
                <span class="kc-title">KID-CONNECT</span>
                <span class="kc-sub">AI ASSISTANT</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Student Hero Profile -->
        <div class="card-student-hero">
          <div class="student-avatar-wrap">
            <img src="${avatarUrl}" alt="${displayName}" class="student-avatar-img" />
            <div class="avatar-crown">👑</div>
          </div>
          <div class="student-hero-info">
            <div class="student-name-row">
              <h3 class="student-card-name">${displayName}</h3>
              <span class="hero-tag">Bé Chăm Ngoan</span>
            </div>
            <p class="student-hero-slogan">"Mỗi ngày đến trường là một ngày rực rỡ những trải nghiệm và tiếng cười!"</p>
          </div>
        </div>

        <!-- 5 Lĩnh Vực Phát Triển GDMN -->
        <div class="card-five-domains">
          <div class="domain-box domain-physical">
            <div class="domain-header">
              <div class="domain-title-wrap">
                <span class="domain-icon">🏃‍♂️</span>
                <span class="domain-name">Phát Triển Thể Chất</span>
              </div>
              <div class="domain-stars">${this.renderStars(ratings.theChat)}</div>
            </div>
            <p class="domain-desc">${data.theChat || "Bé tham gia năng nổ các hoạt động rèn luyện thể lực."}</p>
          </div>

          <div class="domain-box domain-cognitive">
            <div class="domain-header">
              <div class="domain-title-wrap">
                <span class="domain-icon">🧩</span>
                <span class="domain-name">Phát Triển Nhận Thức</span>
              </div>
              <div class="domain-stars">${this.renderStars(ratings.nhanThuc)}</div>
            </div>
            <p class="domain-desc">${data.nhanThuc || "Bé say sưa khám phá, sáng tạo và giải quyết vấn đề."}</p>
          </div>

          <div class="domain-box domain-language">
            <div class="domain-header">
              <div class="domain-title-wrap">
                <span class="domain-icon">🗣️</span>
                <span class="domain-name">Phát Triển Ngôn Ngữ</span>
              </div>
              <div class="domain-stars">${this.renderStars(ratings.ngonNgu)}</div>
            </div>
            <p class="domain-desc">${data.ngonNgu || "Bé diễn đạt tự tin, dùng từ vựng phong phú, rõ ràng."}</p>
          </div>

          <div class="domain-box domain-social">
            <div class="domain-header">
              <div class="domain-title-wrap">
                <span class="domain-icon">💖</span>
                <span class="domain-name">Tình Cảm & Kỹ Năng Xã Hội</span>
              </div>
              <div class="domain-stars">${this.renderStars(ratings.tinhCamXH)}</div>
            </div>
            <p class="domain-desc">${data.tinhCamXH || "Bé hòa đồng, biết chia sẻ đồ chơi và yêu thương bạn bè."}</p>
          </div>

          <div class="domain-box domain-aesthetic full-span">
            <div class="domain-header">
              <div class="domain-title-wrap">
                <span class="domain-icon">🎨</span>
                <span class="domain-name">Phát Triển Thẩm Mỹ</span>
              </div>
              <div class="domain-stars">${this.renderStars(ratings.thamMy)}</div>
            </div>
            <p class="domain-desc">${data.thamMy || "Bé cảm nhận âm nhạc tinh tế, khéo léo trong các góc tạo hình nghệ thuật."}</p>
          </div>
        </div>

        <!-- Lời Cô Nhắn Gửi Gia Đình -->
        <div class="card-message-box">
          <div class="message-box-header">
            <span class="msg-icon">💌</span>
            <span class="msg-title">Cô Giáo Nhắn Nhủ Yêu Thương</span>
          </div>
          <p class="message-content">"${data.parentMessage || "Chúc con luôn chăm ngoan, khỏe mạnh và mỗi ngày đều có thật nhiều niềm vui mới!"}"</p>
        </div>

        <!-- Bí Kíp Cùng Con Tối Nay (Home Connection Tip) -->
        <div class="card-tip-box">
          <div class="tip-box-header">
            <span class="tip-icon">🌙</span>
            <span class="tip-title">Bí Kíp Đồng Hành Cùng Con Tại Nhà (10 - 15 Phút)</span>
          </div>
          <p class="tip-content">${data.homeTip || "Bố mẹ hãy dành thời gian tâm sự cùng con về những điều con vui nhất ở lớp ngày hôm nay nhé!"}</p>
        </div>

        <!-- Footer Banner Giải Thưởng Tiên Phong AI 2026 -->
        <div class="card-footer-section">
          <img src="assets/footer_banner.png" alt="Giải Thưởng Tiên Phong AI 2026" class="card-footer-banner-img" onerror="this.style.display='none'" />
          <div class="card-footer-text-row">
            <span>Dự án: KID-CONNECT AI (Trường MN Phúc Sơn B - Bảng A)</span>
            <span>Hội đồng Phối hợp: Bộ GD&ĐT & ĐH RMIT Việt Nam</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Xuất ảnh PNG độ nét cao bằng html2canvas
   */
  async downloadCardAsPNG(studentName = "Be") {
    const cardEl = document.getElementById("growth-card-preview");
    if (!cardEl) return;

    if (typeof html2canvas === "undefined") {
      alert("Đang nạp thư viện xuất ảnh, xin vui lòng thử lại sau 3 giây!");
      return;
    }

    try {
      const originalBtn = document.getElementById("btn-download-png");
      if (originalBtn) originalBtn.innerText = "⏳ Đang kết xuất ảnh...";

      const canvas = await html2canvas(cardEl, {
        scale: 2, // Tăng gấp đôi độ phân giải để ảnh in cực nét
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
      });

      const imageURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const safeName = (studentName || "Be").replace(/\s+/g, "_");
      link.download = `Nhat_Ky_Be_${safeName}_KidConnect_AI.png`;
      link.href = imageURL;
      link.click();

      if (originalBtn) originalBtn.innerText = "📥 Tải Ảnh PNG (Gửi Zalo)";
    } catch (err) {
      console.error("Lỗi xuất ảnh:", err);
      alert("Có lỗi khi tạo ảnh: " + err.message);
      const originalBtn = document.getElementById("btn-download-png");
      if (originalBtn) originalBtn.innerText = "📥 Tải Ảnh PNG (Gửi Zalo)";
    }
  }

  /**
   * Tạo văn bản định dạng đẹp để cô giáo sao chép gửi nhanh qua Zalo
   */
  generateZaloText(data, student, className = "Lớp Mẫu Giáo Lớn A1", isMasked = false) {
    const name = isMasked ? (student.nickName || 'Bé') : (student.name || 'Bé');
    const dateStr = data.date ? new Date(data.date).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN');

    return `🌸 NHẬT KÝ TIẾN BỘ CỦA BÉ - TRƯỜNG MN PHÚC SƠN B 🌸
🏫 ${className} | 📅 Ngày: ${dateStr}
👶 Bé: ${name}

🌟 ĐIỂM SÁNG 5 LĨNH VỰC TRONG NGÀY:
🏃‍♂️ Thể chất: ${data.theChat || 'Tốt'}
🧩 Nhận thức: ${data.nhanThuc || 'Tốt'}
🗣️ Ngôn ngữ: ${data.ngonNgu || 'Tốt'}
💖 Tình cảm & KNXH: ${data.tinhCamXH || 'Tốt'}
🎨 Thẩm mỹ: ${data.thamMy || 'Tốt'}

💌 LỜI CÔ NHẮN GỬI:
"${data.parentMessage || 'Bé rất ngoan và tích cực!'}"

🌙 BÍ KÍP CÙNG CON TỐI NAY (10-15 PHÚT):
${data.homeTip || 'Bố mẹ cùng trò chuyện và lắng nghe con nhé!'}

---
✨ Bản tin được tạo tự động bởi Trợ lý KID-CONNECT AI (Giải thưởng Tiên phong Ứng dụng AI trong Giáo dục Việt Nam 2026 - Bộ GD&ĐT & RMIT)`;
  }
}

window.kidConnectCard = new KidConnectCardGenerator();
