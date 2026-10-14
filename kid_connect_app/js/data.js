/**
 * KID-CONNECT AI - Dữ liệu khởi tạo mầm non chuẩn mực
 * Trường Mầm non Phúc Sơn B - Bảng A (Bộ GD&ĐT & RMIT)
 */

const DEFAULT_CLASSES = [
  {
    id: "mg_lon_a1",
    name: "Lớp Mẫu Giáo Lớn A1 (5 - 6 tuổi)",
    ageGroup: "5-6 tuổi",
    teacher: "Cô Đỗ Thị Yến & Cô Nguyễn Thị Lan",
    totalStudents: 32,
    room: "Phòng 201 - Tầng 2"
  },
  {
    id: "mg_nho_b1",
    name: "Lớp Mẫu Giáo Nhỡ B1 (4 - 5 tuổi)",
    ageGroup: "4-5 tuổi",
    teacher: "Cô Lê Thị Hồng & Cô Vũ Phương Thảo",
    totalStudents: 28,
    room: "Phòng 102 - Tầng 1"
  },
  {
    id: "mg_be_c2",
    name: "Lớp Mẫu Giáo Bé C2 (3 - 4 tuổi)",
    ageGroup: "3-4 tuổi",
    teacher: "Cô Trần Thu Hà & Cô Phạm Bích Ngọc",
    totalStudents: 25,
    room: "Phòng 101 - Tầng 1"
  },
  {
    id: "nha_tre_com_a",
    name: "Lớp Nhà Trẻ Cơm A (24 - 36 tháng)",
    ageGroup: "24-36 tháng",
    teacher: "Cô Nguyễn Mai Lan & Cô Hoàng Thị Oanh",
    totalStudents: 20,
    room: "Phòng 001 - Tầng Trệt"
  }
];

const DEFAULT_STUDENTS = [
  {
    id: "psb_01",
    classId: "mg_lon_a1",
    name: "Nguyễn Bảo An",
    nickName: "Bé An",
    gender: "boy",
    code: "PS-A1-01",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=AnBao&backgroundColor=b6e3f4",
    avatarBoyGirl: "boy-1",
    notes: "Rất thông minh, thích lắp ghép lego, thỉnh thoảng hơi bướng khi đến giờ ngủ trưa.",
    latestAssessment: {
      date: "2026-10-14",
      week: "Tuần 7 - Tháng 10/2026",
      input: "Hôm nay bé An biết chia sẻ đồ chơi xếp hình cho bạn Cường, ăn cơm nhanh hết suất nhưng lúc ngủ trưa còn trằn trọc, rất hào hứng khi nghe cô kể truyện cổ tích Thạch Sanh.",
      theChat: "Vận động thô nhanh nhẹn, xúc cơm gọn gàng, tự phục vụ tốt; cần hỗ trợ thư giãn trước giờ ngủ trưa.",
      nhanThuc: "Tư duy không gian tốt, biết sáng tạo mô hình cầu vượt từ khối gỗ, nhận biết số lượng trong phạm vi 10.",
      ngonNgu: "Vốn từ phong phú, biết dùng câu ghép kể lại chi tiết truyện Thạch Sanh rành mạch, diễn cảm.",
      tinhCamXH: "Tiến bộ vượt bậc về tinh thần chia sẻ: chủ động nhường khối hình cho bạn, hợp tác vui vẻ trong nhóm.",
      thamMy: "Cảm thụ câu chuyện cổ tích sâu sắc, biết nhận xét hành động dũng cảm, yêu thích tranh minh họa đẹp.",
      parentMessage: "Bé An tuần này có bước tiến rất đáng khen về tinh thần sẻ chia với bạn bè và ăn uống tự giác. Cô gửi lời khen ngợi đặc biệt tới con!",
      homeTip: "Tối nay trước khi ngủ, bố mẹ hãy dành 10 phút đọc cho bé nghe một mẩu chuyện ngắn nhẹ nhàng và xoa lưng để bé thư giãn, dễ chìm vào giấc ngủ ngon nhé!",
      ratings: { theChat: 4, nhanThuc: 5, ngonNgu: 5, tinhCamXH: 5, thamMy: 4 }
    }
  },
  {
    id: "psb_02",
    classId: "mg_lon_a1",
    name: "Trần Minh Châu",
    nickName: "Bé Châu",
    gender: "girl",
    code: "PS-A1-02",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=MinhChau&backgroundColor=ffd5dc",
    avatarBoyGirl: "girl-1",
    notes: "Ngoan ngoãn, múa hát dẻo, hơi nhút nhát trước đám đông.",
    latestAssessment: {
      date: "2026-10-13",
      week: "Tuần 7 - Tháng 10/2026",
      input: "Bé Châu hát đúng giai điệu bài Cháu vẽ ông mặt trời, múa dẻo nhưng khi cô mời lên biểu diễn cá nhân thì còn e thẹn níu tay bạn. Giờ ăn ăn ngoan, sạch sẽ.",
      theChat: "Kỹ năng vận động dẻo dai, giữ thăng bằng tốt theo nhịp nhạc; ăn uống sạch sẽ, biết tự lau miệng.",
      nhanThuc: "Ghi nhớ nhanh lời bài hát và động tác múa minh họa; nhận biết các biểu tượng màu sắc rõ ràng.",
      ngonNgu: "Giọng nói trong trẻo, trả lời đủ câu; cần thêm sự tự tin khi phát biểu một mình trước lớp.",
      tinhCamXH: "Gắn bó thân thiết với bạn cùng bàn; cần được khích lệ để tự tin khẳng định bản thân trước tập thể.",
      thamMy: "Năng khiếu âm nhạc nổi trội, cảm nhận nhịp điệu bài hát tinh tế, động tác biểu cảm duyên dáng.",
      parentMessage: "Bé Châu như một nốt nhạc ngọt ngào của lớp! Con múa hát rất hay, chỉ cần thêm một chút dũng cảm nữa là con sẽ tỏa sáng rực rỡ.",
      homeTip: "Tối nay bố mẹ hãy làm 'khán giả đặc biệt' để bé làm 'ca sĩ nhí' biểu diễn bài hát ở lớp nhé. Tiếng vỗ tay của bố mẹ là liều thuốc tự tin tuyệt vời nhất cho con!",
      ratings: { theChat: 4, nhanThuc: 4, ngonNgu: 4, tinhCamXH: 3, thamMy: 5 }
    }
  },
  {
    id: "psb_03",
    classId: "mg_lon_a1",
    name: "Phạm Hải Đăng",
    nickName: "Bé Đăng",
    gender: "boy",
    code: "PS-A1-03",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=HaiDang&backgroundColor=c0aede",
    avatarBoyGirl: "boy-2",
    notes: "Hiếu động, thích khám phá thiên nhiên, chạy nhảy nhiều.",
    latestAssessment: null
  },
  {
    id: "psb_04",
    classId: "mg_lon_a1",
    name: "Hoàng Linh Đan",
    nickName: "Bé Đan",
    gender: "girl",
    code: "PS-A1-04",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=LinhDan&backgroundColor=ffdfbf",
    avatarBoyGirl: "girl-2",
    notes: "Rất khéo tay tô màu và gấp giấy origami, ăn hơi chậm.",
    latestAssessment: null
  },
  {
    id: "psb_05",
    classId: "mg_nho_b1",
    name: "Lê Quốc Bảo",
    nickName: "Bé Bảo",
    gender: "boy",
    code: "PS-B1-01",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=QuocBao&backgroundColor=d1f4d9",
    avatarBoyGirl: "boy-3",
    notes: "Thích xe cảnh sát, tự cất giày dép gọn gàng, kén ăn rau.",
    latestAssessment: null
  },
  {
    id: "psb_06",
    classId: "mg_nho_b1",
    name: "Vũ Mai Phương",
    nickName: "Bé Phương",
    gender: "girl",
    code: "PS-B1-02",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=MaiPhuong&backgroundColor=fed0ee",
    avatarBoyGirl: "girl-3",
    notes: "Nói năng lễ phép, thích chơi trò bác sĩ khám bệnh cho gấu bông.",
    latestAssessment: null
  },
  {
    id: "psb_07",
    classId: "mg_be_c2",
    name: "Đỗ Tuấn Khang",
    nickName: "Bé Khang",
    gender: "boy",
    code: "PS-C2-01",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=TuanKhang&backgroundColor=b6e3f4",
    avatarBoyGirl: "boy-4",
    notes: "Mới đi học bớt khóc nhè, biết tự xúc thìa, thích nghe nhạc thiếu nhi.",
    latestAssessment: null
  },
  {
    id: "psb_08",
    classId: "nha_tre_com_a",
    name: "Bùi Ngọc Hân",
    nickName: "Bé Hân Hân",
    gender: "girl",
    code: "PS-NT-01",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=NgocHan&backgroundColor=ffd5dc",
    avatarBoyGirl: "girl-4",
    notes: "28 tháng tuổi, biết bập bẹ gọi cô, ăn ngoan hết bát cháo.",
    latestAssessment: null
  }
];

// Các kịch bản mẫu đời sống mầm non để cô giáo test nhanh với 1 chạm
const SAMPLE_PRESETS = [
  {
    title: "🌟 Bé biết sẻ chia & hào hứng truyện kể",
    text: "Hôm nay bé biết chia sẻ đồ chơi xếp hình cho bạn, ăn cơm nhanh hết suất nhưng lúc ngủ trưa còn trằn trọc, rất hào hứng khi nghe cô kể truyện cổ tích."
  },
  {
    title: "🎨 Năng khiếu tạo hình, hơi nhút nhát biểu diễn",
    text: "Bé vẽ tranh đàn gà con rất sinh động, phối màu hài hòa, nhưng khi cô mời lên giới thiệu tranh trước cả lớp thì bé còn bẽn lẽn níu tay bạn. Giờ ăn tự giác."
  },
  {
    title: "🏃‍♂️ Vận động nhanh nhẹn, kén ăn rau xanh",
    text: "Giờ thể dục bé nhảy bật qua vòng rất chuẩn xác, nhanh nhẹn, hào hứng chơi đuổi bắt cùng các bạn. Tuy nhiên trong bữa ăn bé còn nhè rau xào, chưa chịu thử món mới."
  },
  {
    title: "🗣️ Vốn từ phong phú, thỉnh thoảng tranh giành đồ chơi",
    text: "Bé kể chuyện rành mạch, dùng nhiều câu ghép phức tạp khiến cô ngạc nhiên. Lúc chơi góc phân vai còn tranh giành búp bê với bạn, sau khi cô nhắc nhở đã biết xin lỗi."
  },
  {
    title: "🧸 Kỹ năng tự phục vụ tốt, thích khám phá thiên nhiên",
    text: "Bé tự biết cởi áo khoác, xếp giày dép lên giá ngay ngắn. Giờ dạo chơi sân trường bé tò mò quan sát đàn kiến tha mồi và đặt rất nhiều câu hỏi vì sao cho cô giáo."
  },
  {
    title: "🌙 Mới đi học bớt quấy khóc, thích nghe hát ru",
    text: "Hôm nay bé đã không còn khóc khi bố mẹ chào tạm biệt, biết vẫy tay chào cô. Buổi trưa nghe cô vỗ về hát ru thì ngủ say ngoan ngoãn cả giấc."
  }
];
