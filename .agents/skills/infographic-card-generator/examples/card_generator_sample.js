/**
 * Lớp điều khiển hiển thị Thẻ Báo Cáo Sư Phạm Đa Chủ Đề (Canva Style)
 */

class KidConnectCardRenderer {
  constructor(containerId = "growth-card-preview") {
    this.container = document.getElementById(containerId);
    this.currentTheme = "theme-rainbow";
  }

  setTheme(themeName) {
    this.currentTheme = themeName;
    if (this.container) {
      this.container.className = `growth-card ${this.currentTheme}`;
    }
  }

  renderStars(count = 5) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += i <= count ? `<span class="star filled">★</span>` : `<span class="star empty">☆</span>`;
    }
    return stars;
  }

  render(data, student, className = "Lớp Mẫu Giáo A1", isMasked = false) {
    if (!this.container) return;

    const displayName = isMasked
      ? `${student.nickName || 'Bé'} (Mã: ${student.code || 'PSB-01'})`
      : `${student.name} (${student.nickName || 'Bé Yêu'})`;

    const avatarUrl = isMasked
      ? `https://api.dicebear.com/7.x/bottts/svg?seed=${student.code || 'mask'}&backgroundColor=b6e3f4`
      : (student.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${student.name}&backgroundColor=ffd5dc`);

    const dateStr = data.date ? new Date(data.date).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN');
    const r = data.ratings || { theChat: 5, nhanThuc: 5, ngonNgu: 5, tinhCamXH: 5, thamMy: 5 };

    this.container.className = `growth-card ${this.currentTheme}`;
    this.container.innerHTML = `
      <div class="card-inner-frame">
        <div class="card-deco deco-tl">🌸</div>
        <div class="card-deco deco-tr">⭐</div>
        <div class="card-deco deco-bl">🎈</div>
        <div class="card-deco deco-br">🌈</div>

        <div class="card-header" style="text-align: center; margin-bottom: 16px;">
          <div style="font-size: 13px; font-weight: bold; color: var(--card-primary); text-transform: uppercase;">
            ${className}
          </div>
          <h2 style="margin: 4px 0 8px 0; font-size: 20px; color: var(--card-title-color);">
            NHẬT KÝ TIẾN BỘ CỦA BÉ
          </h2>
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 8px;">
            <img src="${avatarUrl}" alt="Avatar" style="width: 48px; height: 48px; border-radius: 50%; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.1);" />
            <div style="text-align: left;">
              <div style="font-size: 16px; font-weight: bold;">${displayName}</div>
              <div style="font-size: 12px; opacity: 0.8;">Ngày: ${dateStr}</div>
            </div>
          </div>
        </div>

        <div class="card-body" style="display: flex; flex-direction: column; gap: 10px;">
          <!-- 5 lĩnh vực -->
          <div style="background: rgba(255,255,255,0.7); border-radius: 12px; padding: 10px;">
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 13px;">
              <span>🏃 Thể chất</span>
              <span>${this.renderStars(r.theChat)}</span>
            </div>
            <div style="font-size: 12px; margin-top: 4px; line-height: 1.4;">${data.theChat || "Bé vận động khỏe khoắn, ăn ngoan."}</div>
          </div>

          <div style="background: rgba(255,255,255,0.7); border-radius: 12px; padding: 10px;">
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 13px;">
              <span>🧠 Nhận thức</span>
              <span>${this.renderStars(r.nhanThuc)}</span>
            </div>
            <div style="font-size: 12px; margin-top: 4px; line-height: 1.4;">${data.nhanThuc || "Bé tập trung, tò mò khám phá đồ vật."}</div>
          </div>

          <div style="background: rgba(255,255,255,0.7); border-radius: 12px; padding: 10px;">
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 13px;">
              <span>🗣️ Ngôn ngữ</span>
              <span>${this.renderStars(r.ngonNgu)}</span>
            </div>
            <div style="font-size: 12px; margin-top: 4px; line-height: 1.4;">${data.ngonNgu || "Bé nói rõ ràng, biết dạ thưa cô."}</div>
          </div>

          <div style="background: rgba(255,255,255,0.7); border-radius: 12px; padding: 10px;">
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 13px;">
              <span>🤝 Tình cảm & KNXH</span>
              <span>${this.renderStars(r.tinhCamXH)}</span>
            </div>
            <div style="font-size: 12px; margin-top: 4px; line-height: 1.4;">${data.tinhCamXH || "Bé hòa đồng, chia sẻ đồ chơi cùng bạn."}</div>
          </div>

          <div style="background: rgba(255,255,255,0.7); border-radius: 12px; padding: 10px;">
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 13px;">
              <span>🎨 Thẩm mỹ</span>
              <span>${this.renderStars(r.thamMy)}</span>
            </div>
            <div style="font-size: 12px; margin-top: 4px; line-height: 1.4;">${data.thamMy || "Bé hào hứng múa hát và tô màu tranh."}</div>
          </div>

          <!-- Lời nhắn & Mẹo tại nhà -->
          <div style="border-left: 4px solid var(--card-primary); background: #ffffff; padding: 10px 14px; border-radius: 8px;">
            <div style="font-size: 13px; font-weight: bold; color: var(--card-title-color);">💌 Lời nhắn cô giáo:</div>
            <div style="font-size: 12px; font-style: italic; margin-top: 2px;">"${data.parentMessage || "Bé hôm nay ở lớp rất ngoan!"}"</div>
          </div>

          <div style="background: #fffbe6; border: 1px dashed #faad14; padding: 10px 14px; border-radius: 8px;">
            <div style="font-size: 13px; font-weight: bold; color: #d46b08;">💡 Hoạt động đồng hành 10 phút tối nay:</div>
            <div style="font-size: 12px; margin-top: 2px;">${data.homeTip || "Bố mẹ cùng con đọc một câu chuyện ngắn trước khi ngủ nhé!"}</div>
          </div>
        </div>
      </div>
    `;
  }
}
