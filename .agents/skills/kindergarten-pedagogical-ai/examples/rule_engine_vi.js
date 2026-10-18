/**
 * Thuật toán Phân tích Sư phạm Mầm non Offline tiếng Việt (Rule-Engine)
 * Giúp phân tích ghi chú thô của giáo viên thành 5 lĩnh vực GDMN chuẩn 0 đồng, không cần API Key, không cần mạng.
 */

class SmartPedagogicalRuleEngine {
  constructor() {
    this.lexicon = {
      theChat: {
        keywords: ["ăn", "cơm", "cháo", "uống", "rau", "ngủ", "chạy", "nhảy", "vận động", "thể dục", "bật", "nhè", "trằn trọc"],
        positive: ["ăn nhanh", "hết suất", "tự xúc", "tự giác", "ngủ say", "ngủ ngon", "nhanh nhẹn", "khỏe mạnh"],
        needsWork: ["kén", "chậm", "nhè", "trằn trọc", "khó ngủ", "mệt"]
      },
      nhanThuc: {
        keywords: ["xếp hình", "lego", "khối gỗ", "lắp ghép", "đếm", "số", "toán", "màu", "hình", "tò mò", "hỏi", "vì sao"],
        positive: ["sáng tạo", "thông minh", "đếm nhanh", "chính xác", "tập trung", "kiên nhẫn"],
        needsWork: ["dễ xao nhãng", "chưa nhớ", "lẫn lộn", "nhanh chán"]
      },
      ngonNgu: {
        keywords: ["nói", "hỏi", "kể", "chuyện", "thưa", "dạ", "chữ", "phát âm", "hát", "trả lời"],
        positive: ["mạch lạc", "rõ ràng", "lễ phép", "tự tin", "vốn từ phong phú"],
        needsWork: ["ngọng", "nói nhỏ", "ngập ngừng", "rụt rè", "chưa rõ"]
      },
      tinhCamXH: {
        keywords: ["bạn", "chia sẻ", "nhường", "chơi cùng", "giúp", "trực nhật", "khóc", "nhớ mẹ", "tranh giành"],
        positive: ["hòa đồng", "nhường nhịn", "chia sẻ", "vui vẻ", "giúp đỡ", "đoàn kết"],
        needsWork: ["tranh giành", "khóc nhè", "chưa quen", "giận hờn", "rụt rè"]
      },
      thamMy: {
        keywords: ["vẽ", "tô màu", "nặn", "xé dán", "hát", "múa", "nhảy", "nhạc", "đẹp"],
        positive: ["khéo léo", "độc đáo", "phối màu đẹp", "thuộc bài", "tự tin múa"],
        needsWork: ["chưa tập trung tô", "lem viền", "ngại lên biểu diễn"]
      }
    };
  }

  analyze(rawNote, studentName = "Bé", ageGroup = "5-6 tuổi") {
    const text = rawNote.toLowerCase();
    const result = {
      summary: "",
      ratings: { theChat: 4, nhanThuc: 4, ngonNgu: 4, tinhCamXH: 4, thamMy: 4 },
      theChat: "",
      nhanThuc: "",
      ngonNgu: "",
      tinhCamXH: "",
      thamMy: "",
      parentMessage: "",
      homeTip: ""
    };

    // 1. Thể chất
    if (text.includes("ăn nhanh") || text.includes("hết suất") || text.includes("tự xúc")) {
      result.theChat = `${studentName} có kỹ năng tự phục vụ rất tốt, tự xúc ăn gọn gàng, ăn hết suất ăn theo định lượng của trường.`;
      result.ratings.theChat = 5;
    } else if (text.includes("rau") || text.includes("kén") || text.includes("chậm") || text.includes("nhè")) {
      result.theChat = `${studentName} vận động linh hoạt; trong giờ ăn còn ăn chậm và hơi kén một số loại rau xanh, cần cô động viên thêm.`;
      result.ratings.theChat = 3;
    } else {
      result.theChat = `${studentName} nhanh nhẹn, khỏe mạnh, tham gia đầy đủ các bài tập vận động thô và nề nếp sinh hoạt trong ngày.`;
      result.ratings.theChat = 4;
    }

    // 2. Nhận thức
    if (text.includes("xếp hình") || text.includes("lego") || text.includes("lắp ghép")) {
      result.nhanThuc = `${studentName} có trí tưởng tượng không gian rất phong phú, tập trung cao độ khi lắp ghép các mô hình sáng tạo.`;
      result.ratings.nhanThuc = 5;
    } else if (text.includes("đếm") || text.includes("toán") || text.includes("số")) {
      result.nhanThuc = `${studentName} làm quen với toán rất nhanh, nhận diện mặt số và đếm số lượng đồ vật chính xác.`;
      result.ratings.nhanThuc = 5;
    } else {
      result.nhanThuc = `${studentName} hào hứng tham gia các hoạt động khám phá khoa học và môi trường xung quanh, có óc quan sát tốt.`;
      result.ratings.nhanThuc = 4;
    }

    // 3. Ngôn ngữ
    if (text.includes("kể chuyện") || text.includes("nói to") || text.includes("tự tin")) {
      result.ngonNgu = `${studentName} diễn đạt gãy gọn, tự tin kể chuyện theo tranh, vốn từ phong phú và phát âm rõ ràng.`;
      result.ratings.ngonNgu = 5;
    } else if (text.includes("ngọng") || text.includes("rụt rè") || text.includes("nói nhỏ")) {
      result.ngonNgu = `${studentName} hiểu tốt hiệu lệnh của cô; khi giao tiếp con còn hơi nhỏ tiếng, cô đang hỗ trợ con rèn luyện phát âm tròn vành rõ chữ.`;
      result.ratings.ngonNgu = 3;
    } else {
      result.ngonNgu = `${studentName} giao tiếp lễ phép, biết dạ thưa khi người lớn hỏi, tích cực tham gia đàm thoại cùng cô và các bạn.`;
      result.ratings.ngonNgu = 4;
    }

    // 4. Tình cảm & KNXH
    if (text.includes("nhường") || text.includes("chia sẻ") || text.includes("giúp")) {
      result.tinhCamXH = `${studentName} giàu lòng nhân ái, biết nhường nhịn đồ chơi cho bạn, chủ động giúp cô thu dọn đồ dùng sau giờ học.`;
      result.ratings.tinhCamXH = 5;
    } else if (text.includes("khóc") || text.includes("nhớ mẹ") || text.includes("tranh")) {
      result.tinhCamXH = `${studentName} còn chút cảm xúc gắn bó người nhà khi vào lớp, con đang dần làm quen với nề nếp sinh hoạt tập thể.`;
      result.ratings.tinhCamXH = 3;
    } else {
      result.tinhCamXH = `${studentName} hòa đồng, vui vẻ, thích chơi cùng nhóm bạn và tuân thủ tốt các quy tắc an toàn trong lớp học.`;
      result.ratings.tinhCamXH = 4;
    }

    // 5. Thẩm mỹ
    if (text.includes("vẽ") || text.includes("tô màu") || text.includes("nặn")) {
      result.thamMy = `${studentName} có hoa tay và thẩm mỹ tốt, biết phối màu hài hòa, đường nét tạo hình ngộ nghĩnh, sáng tạo.`;
      result.ratings.thamMy = 5;
    } else if (text.includes("hát") || text.includes("múa") || text.includes("nhạc")) {
      result.thamMy = `${studentName} cảm thụ âm nhạc tốt, hát đúng giai điệu và biết vận động nhịp nhàng theo bài hát.`;
      result.ratings.thamMy = 5;
    } else {
      result.thamMy = `${studentName} yêu thích các bài hát thiếu nhi, hứng thú với các hoạt động sáng tạo nghệ thuật của lứa tuổi.`;
      result.ratings.thamMy = 4;
    }

    // Tóm tắt & Lời nhắn phụ huynh
    result.summary = `${studentName} có một ngày học tập và vui chơi tràn đầy năng lượng, thể hiện nhiều tiến bộ đáng khen ngợi!`;
    result.parentMessage = `Thưa ba mẹ, hôm nay ${studentName} ở lớp rất ngoan và tích cực. Cô gửi đến gia đình bản nhật ký ngày hôm nay của con để ba mẹ cùng chia sẻ niềm vui với bé nhé!`;

    // Gợi ý hoạt động tại nhà (Home Tip)
    if (result.ratings.theChat <= 3) {
      result.homeTip = `Bố mẹ có thể cùng bé chơi trò 'Gia đình khám phá ẩm thực' vào bữa tối, khuyến khích con nếm thử từng chút rau củ để tạo thói quen ăn uống cân bằng nhé.`;
    } else if (result.ratings.ngonNgu <= 3) {
      result.homeTip = `Tối nay trước giờ đi ngủ, bố mẹ hãy dành 10 phút đọc truyện tranh cùng con và khuyến khích bé tập kể lại các chi tiết nhỏ để tăng vốn từ vựng nhé.`;
    } else {
      result.homeTip = `Bố mẹ có thể dành 10-15 phút tối nay trò chuyện cùng con về hoạt động xếp hình/vẽ tranh ở lớp, để bé rèn luyện kỹ năng diễn đạt tự tin hơn nữa nhé!`;
    }

    return result;
  }
}

if (typeof module !== "undefined") {
  module.exports = { SmartPedagogicalRuleEngine };
}
