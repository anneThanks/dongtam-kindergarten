/**
 * KID-CONNECT AI - Bộ Máy Trí Tuệ Nhân Tạo Sư Phạm Mầm Non
 * Chuẩn hóa theo Chương trình GDMN - Bộ Giáo dục và Đào tạo Việt Nam
 */

class KidConnectAIEngine {
  constructor() {
    this.apiKey = localStorage.getItem("kid_connect_gemini_key") || "";
    this.modelName = localStorage.getItem("kid_connect_model") || "gemini-2.5-flash";
    this.useOnlineGemini = !!this.apiKey;
  }

  setApiKey(key) {
    this.apiKey = (key || "").trim();
    localStorage.setItem("kid_connect_gemini_key", this.apiKey);
    this.useOnlineGemini = !!this.apiKey;
  }

  getApiKey() {
    return this.apiKey;
  }

  /**
   * Phân tích ghi chú thô của cô giáo thành nhận xét chuẩn 5 lĩnh vực GDMN
   * @param {string} rawNote - Ghi chú bằng giọng nói hoặc gõ phím
   * @param {object} student - Thông tin bé
   * @param {string} ageGroup - Nhóm tuổi (ví dụ: "5-6 tuổi")
   * @returns {Promise<object>} Kết quả chuẩn hóa sư phạm
   */
  async analyzeObservation(rawNote, student, ageGroup = "5-6 tuổi") {
    if (!rawNote || !rawNote.trim()) {
      throw new Error("Vui lòng nhập hoặc nói một đoạn ghi chú về biểu hiện của bé!");
    }

    // Nếu người dùng có cấu hình Gemini API Key và muốn dùng online
    if (this.useOnlineGemini && this.apiKey) {
      try {
        const geminiResult = await this.callGeminiAPI(rawNote, student, ageGroup);
        if (geminiResult) return geminiResult;
      } catch (err) {
        console.warn("Gọi Gemini API không thành công, tự động chuyển sang Smart Pedagogical Engine offline:", err);
      }
    }

    // Mặc định hoặc Fallback: Dùng Smart Pedagogical Rule-Engine offline (chạy tức thì, 0 đồng, không cần internet)
    return this.smartOfflineAnalysis(rawNote, student, ageGroup);
  }

  /**
   * Bộ quy tắc sư phạm chuyên sâu phân tích ngữ nghĩa mầm non Việt Nam
   */
  smartOfflineAnalysis(rawNote, student, ageGroup) {
    const text = rawNote.toLowerCase();
    const name = student?.nickName || student?.name || "Bé";

    // Phân tích từ khóa cho 5 lĩnh vực
    let theChat = "";
    let nhanThuc = "";
    let ngonNgu = "";
    let tinhCamXH = "";
    let thamMy = "";
    let parentMessage = "";
    let homeTip = "";

    let rTheChat = 4;
    let rNhanThuc = 4;
    let rNgonNgu = 4;
    let rTinhCamXH = 4;
    let rThamMy = 4;

    // 1. Phân tích Thể chất (Ăn, ngủ, vận động, vệ sinh)
    if (text.includes("ăn") || text.includes("cơm") || text.includes("cháo") || text.includes("uống") || text.includes("nhè") || text.includes("rau")) {
      if (text.includes("ăn nhanh") || text.includes("hết suất") || text.includes("tự xúc") || text.includes("tự giác")) {
        theChat = `${name} có kỹ năng tự phục vụ rất tốt, tự xúc ăn gọn gàng, ăn hết suất ăn theo định lượng của trường.`;
        rTheChat = 5;
      } else if (text.includes("rau") || text.includes("kén") || text.includes("chậm") || text.includes("nhè")) {
        theChat = `${name} vận động linh hoạt; trong giờ ăn còn ăn chậm và hơi kén một số loại rau xanh, cần cô động viên thêm.`;
        rTheChat = 3;
      } else {
        theChat = `${name} đảm bảo chế độ dinh dưỡng trong ngày, ăn uống đúng giờ quy định.`;
      }
    }
    if (text.includes("ngủ") || text.includes("trằn trọc") || text.includes("khó ngủ") || text.includes("ngủ say")) {
      if (text.includes("trằn trọc") || text.includes("khó ngủ") || text.includes("thao thức")) {
        theChat += (theChat ? " " : "") + `Giờ ngủ trưa con còn trằn trọc, cần cô xoa lưng vỗ về để vào giấc.`;
        if (rTheChat > 3) rTheChat = 4;
      } else {
        theChat += (theChat ? " " : "") + `Giấc ngủ trưa ngon, thức dậy vui vẻ, tỉnh táo.`;
      }
    }
    if (text.includes("chạy") || text.includes("nhảy") || text.includes("thể dục") || text.includes("bật") || text.includes("vận động")) {
      theChat = `${name} tham gia tích cực các bài tập vận động thô, phản xạ nhanh nhẹn, giữ thăng bằng tốt.` + (theChat ? ` ${theChat}` : "");
      rTheChat = 5;
    }
    if (!theChat) {
      theChat = `${name} nhanh nhẹn, khỏe mạnh, tham gia đầy đủ các hoạt động thể chất và nề nếp sinh hoạt trong ngày.`;
    }

    // 2. Phân tích Nhận thức (Xếp hình, đếm số, tò mò, khám phá, lego, giải đố)
    if (text.includes("xếp hình") || text.includes("lego") || text.includes("khối gỗ") || text.includes("lắp ghép")) {
      nhanThuc = `${name} thể hiện tư duy không gian và khả năng tưởng tượng phong phú khi sáng tạo các mô hình lắp ghép chi tiết.`;
      rNhanThuc = 5;
    } else if (text.includes("đếm") || text.includes("số") || text.includes("to nhỏ") || text.includes("màu sắc")) {
      nhanThuc = `${name} nhận biết chính xác các biểu tượng cơ bản, phân biệt nhanh màu sắc và số lượng trong hoạt động làm quen với toán.`;
      rNhanThuc = 5;
    } else if (text.includes("tò mò") || text.includes("hỏi") || text.includes("khám phá") || text.includes("quan sát") || text.includes("kiến")) {
      nhanThuc = `${name} có tinh thần khám phá thế giới xung quanh rất cao, say sưa quan sát và biết đặt câu hỏi nguyên nhân - kết quả.`;
      rNhanThuc = 5;
    } else {
      nhanThuc = `${name} tập trung chú ý trong các giờ học, tiếp thu tốt các kiến thức khám phá khoa học và môi trường xung quanh.`;
    }

    // 3. Phân tích Ngôn ngữ (Kể chuyện, nói, phát âm, từ vựng, rụt rè, bập bẹ)
    if (text.includes("kể chuyện") || text.includes("câu ghép") || text.includes("rành mạch") || text.includes("từ vựng") || text.includes("thơ")) {
      ngonNgu = `${name} có vốn từ ngữ phong phú, diễn đạt ý nghĩ bằng câu trọn vẹn, phát âm tròn vành rõ chữ.`;
      rNgonNgu = 5;
    } else if (text.includes("rụt rè") || text.includes("nhút nhát") || text.includes("bẽn lẽn") || text.includes("ngại nói") || text.includes("níu tay")) {
      ngonNgu = `${name} hiểu tốt lời cô dặn; khi giao tiếp cá nhân trước đám đông con còn hơi bẽn lẽn, nói nhỏ nhẹ.`;
      rNgonNgu = 3;
    } else if (text.includes("bập bẹ") || text.includes("nói sõi") || text.includes("gọi cô")) {
      ngonNgu = `${name} đang phát triển ngôn ngữ rất tích cực, bắt chước phát âm theo cô nhanh và biết dùng từ chỉ nhu cầu cơ bản.`;
      rNgonNgu = 4;
    } else {
      ngonNgu = `${name} biết lắng nghe cô và bạn bè, trả lời rõ ràng các câu hỏi đàm thoại trong giờ học.`;
    }

    // 4. Phân tích Tình cảm - Kỹ năng xã hội (Chia sẻ, chào hỏi, tranh giành, xin lỗi, tự phục vụ, kết bạn)
    if (text.includes("chia sẻ") || text.includes("nhường") || text.includes("giúp đỡ") || text.includes("hợp tác")) {
      tinhCamXH = `Điểm sáng nổi bật: ${name} có tinh thần sẻ chia rất đáng quý, biết nhường đồ chơi cho bạn và chơi hòa đồng cùng nhóm.`;
      rTinhCamXH = 5;
    } else if (text.includes("tranh giành") || text.includes("khóc") || text.includes("bướng") || text.includes("đánh bạn")) {
      tinhCamXH = `${name} giàu cảm xúc; trong lúc tương tác đôi lúc còn muốn giành đồ chơi, sau khi được cô hướng dẫn đã biết nhận lỗi và làm hòa.`;
      rTinhCamXH = 3;
    } else if (text.includes("chào") || text.includes("cất giày") || text.includes("gọn gàng") || text.includes("lễ phép")) {
      tinhCamXH = `${name} lễ phép, vâng lời cô giáo, có ý thức giữ gìn trật tự và tự cất đồ dùng cá nhân đúng nơi quy định.`;
      rTinhCamXH = 5;
    } else {
      tinhCamXH = `${name} thể hiện cảm xúc vui vẻ, cởi mở khi đến lớp, thân thiện và gắn bó với các bạn cùng trang lứa.`;
    }

    // 5. Phân tích Thẩm mỹ (Hát, múa, vẽ, tô màu, nặn, âm nhạc)
    if (text.includes("hát") || text.includes("múa") || text.includes("âm nhạc") || text.includes("nhịp")) {
      thamMy = `${name} có năng khiếu cảm thụ âm nhạc tốt, thuộc bài hát nhanh, vận động nhịp nhàng theo giai điệu mầm non.`;
      rThamMy = text.includes("múa dẻo") || text.includes("hát hay") ? 5 : 4;
    } else if (text.includes("vẽ") || text.includes("tô màu") || text.includes("nặn") || text.includes("tạo hình") || text.includes("xé dán")) {
      thamMy = `${name} khéo léo trong giờ tạo hình, biết lựa chọn phối màu sắc hài hòa và thể hiện trí tưởng tượng độc đáo qua nét vẽ.`;
      rThamMy = 5;
    } else if (text.includes("truyện cổ tích") || text.includes("cổ tích") || text.includes("thơ")) {
      thamMy = `${name} biết rung cảm trước cái đẹp trong nghệ thuật ngôn từ, say mê lắng nghe những hình tượng nhân văn trong truyện cổ tích.`;
      rThamMy = 4;
    } else {
      thamMy = `${name} biết yêu quý cái đẹp trong lớp học, giữ gìn sản phẩm tạo hình và hào hứng tham gia các góc nghệ thuật.`;
    }

    // Lời nhắn gửi phụ huynh (Ấm áp, tích cực)
    if (rTinhCamXH === 5 && text.includes("chia sẻ")) {
      parentMessage = `Tuần này ${name} đã có bước tiến tuyệt vời về lòng nhân ái và kỹ năng giao tiếp! Việc con chủ động nhường đồ chơi cho bạn là dấu hiệu của một em bé có trí tuệ cảm xúc (EQ) rất cao. Cô giáo rất tự hào về con!`;
    } else if (text.includes("rụt rè") || text.includes("nhút nhát")) {
      parentMessage = `${name} như một nụ hoa nhỏ đang dần bung nở. Con rất thông minh và khéo léo, chỉ cần thêm một chút khích lệ nhẹ nhàng mỗi ngày để con tự tin cất cao tiếng nói của mình trước đám đông!`;
    } else if (text.includes("ăn nhanh") || text.includes("tự xúc")) {
      parentMessage = `${name} hôm nay là "chiến sĩ nhí dũng cảm" của lớp! Con ăn uống tự giác, gọn gàng và luôn tươi cười rạng rỡ. Bố mẹ cùng cô dành tặng con một tràng pháo tay thật lớn nhé!`;
    } else {
      parentMessage = `Mỗi ngày đến trường cùng ${name} là một ngày tràn ngập niềm vui. Con luôn chăm chỉ học hỏi, ngoan ngoãn và mang lại năng lượng tích cực cho cả lớp học!`;
    }

    // Home Connection Tip (Lời khuyên đồng hành gia đình 10-15 phút tại nhà)
    if (text.includes("ngủ") || text.includes("trằn trọc")) {
      homeTip = `🌙 Tối nay trước giờ đi ngủ, bố mẹ hãy dành 10 phút đọc cho ${name} nghe một mẩu chuyện ngắn nhẹ nhàng, kết hợp xoa lưng và thì thầm lời yêu thương để giúp bé thả lỏng cơ thể, dễ chìm vào giấc ngủ thật say nhé!`;
    } else if (text.includes("rụt rè") || text.includes("nhút nhát") || text.includes("hát")) {
      homeTip = `⭐ Bố mẹ hãy cùng ${name} chơi trò "Sân khấu gia đình": bố mẹ làm khán giả vỗ tay cổ vũ để bé tự tin đứng biểu diễn bài hát mầm non con vừa học ở lớp. Sự khích lệ của gia đình là chiếc chìa khóa vàng giúp con bứt phá!`;
    } else if (text.includes("kén ăn") || text.includes("rau")) {
      homeTip = `🥦 Trong bữa tối, bố mẹ có thể biến việc ăn rau thành trò chơi "Bác nông dân tí hon tìm vitamin siêu nhân", cùng đố vui về màu sắc của rau củ để tạo hứng thú tự nhiên cho ${name} thử món mới nhé!`;
    } else if (text.includes("xếp hình") || text.includes("lego")) {
      homeTip = `🧩 Tối nay bố mẹ hãy rủ bé cùng chơi trò "Kỹ sư nhí xây cầu vượt": để ${name} làm trưởng nhóm chỉ huy bố mẹ đặt từng viên gạch. Hoạt động này giúp rèn luyện tư duy lãnh đạo và ngôn ngữ diễn đạt cho con.`;
    } else {
      homeTip = `💬 Bố mẹ hãy dành 15 phút tâm sự cùng ${name} với câu hỏi: "Hôm nay ở trường có điều gì làm con cười nhiều nhất?". Hãy lắng nghe trọn vẹn và ôm con thật chặt để thắt chặt sợi dây gắn kết gia đình!`;
    }

    return {
      success: true,
      engine: "Smart Pedagogical Rules Engine (GDMN Chuẩn Bộ GD&ĐT)",
      date: new Date().toISOString().split("T")[0],
      theChat,
      nhanThuc,
      ngonNgu,
      tinhCamXH,
      thamMy,
      parentMessage,
      homeTip,
      ratings: {
        theChat: rTheChat,
        nhanThuc: rNhanThuc,
        ngonNgu: rNgonNgu,
        tinhCamXH: rTinhCamXH,
        thamMy: rThamMy
      }
    };
  }

  /**
   * Gọi Gemini API theo đúng Prompt Master trong đề án dự thi
   */
  async callGeminiAPI(rawNote, student, ageGroup) {
    const studentName = student?.nickName || student?.name || "Bé";
    const promptMaster = `
Vai trò: Bạn là Chuyên gia Đánh giá Giáo dục Mầm non am hiểu sâu sắc Chương trình GDMN của Bộ Giáo dục và Đào tạo Việt Nam.
Nhiệm vụ: Chuyển đổi đoạn ghi chú thô của cô giáo thành bản nhận xét sư phạm chuẩn mực theo 5 lĩnh vực phát triển và tạo lời khuyên kết nối gia đình (Home Connection Tip).

Thông tin đầu vào:
- Độ tuổi của trẻ: ${ageGroup}
- Tên/Mã trẻ: ${studentName}
- Ghi chú thô của cô giáo: "${rawNote}"

Yêu cầu trả về DUY NHẤT một chuỗi JSON hợp lệ (không kèm markdown \`\`\`json) với cấu trúc các trường sau:
{
  "theChat": "Nhận xét sư phạm về thể chất (vận động thô/tinh, ăn, ngủ, vệ sinh - 1-2 câu chuẩn mực)",
  "nhanThuc": "Nhận xét sư phạm về nhận thức (khám phá, toán, tư duy, sự chú ý - 1-2 câu)",
  "ngonNgu": "Nhận xét sư phạm về ngôn ngữ (vốn từ, diễn đạt, tiền đọc viết, giao tiếp - 1-2 câu)",
  "tinhCamXH": "Nhận xét sư phạm về tình cảm - kỹ năng xã hội (chia sẻ, tự phục vụ, hợp tác, cảm xúc - 1-2 câu)",
  "thamMy": "Nhận xét sư phạm về thẩm mỹ (âm nhạc, tạo hình, vẽ, cảm thụ cái đẹp - 1-2 câu)",
  "parentMessage": "Lời nhắn gửi ngắn gọn, ấm áp, truyền cảm hứng từ cô giáo tới cha mẹ (khoảng 40-50 từ)",
  "homeTip": "Bí kíp cùng con tại nhà (Home Connection Tip): 01 trò chơi hoặc hoạt động tương tác cụ thể 10-15 phút tại nhà để phụ huynh đồng hành cùng con",
  "ratings": {
    "theChat": 5,
    "nhanThuc": 5,
    "ngonNgu": 5,
    "tinhCamXH": 5,
    "thamMy": 5
  }
}
Lưu ý: Đánh giá ratings theo thang điểm từ 3 đến 5 sao dựa trên mức độ biểu hiện tích cực trong ghi chú.
`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${this.apiKey}`;
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptMaster }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1024
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: HTTP ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) throw new Error("Không nhận được nội dung trả về từ Gemini API");

    // Làm sạch JSON
    let cleaned = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return {
      success: true,
      engine: `Google Gemini AI (${this.modelName})`,
      date: new Date().toISOString().split("T")[0],
      ...parsed
    };
  }
}

// Khởi tạo global instance
window.kidConnectAI = new KidConnectAIEngine();
