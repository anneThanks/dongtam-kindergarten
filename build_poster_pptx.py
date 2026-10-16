# -*- coding: utf-8 -*-
"""
Script tạo Poster Khoa Học Dự Án KID-CONNECT AI (Khổ A0 / 24x36 inch)
Chuẩn thể lệ Diễn đàn Đổi mới Sáng tạo Giáo dục Việt Nam với AI 2026 (Bộ GD&ĐT & ĐH RMIT)
"""
import os
import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def build_poster():
    prs = Presentation()
    prs.slide_width = Inches(24)
    prs.slide_height = Inches(36)
    blank_layout = prs.slide_layouts[6]
    slide = prs.slides.add_slide(blank_layout)

    # Palette
    C_BG = RGBColor(248, 250, 252)        # Slate 50
    C_HEADER_BG = RGBColor(15, 23, 42)    # Slate 900
    C_HEADER_CARD = RGBColor(30, 41, 59)  # Slate 800
    C_WHITE = RGBColor(255, 255, 255)
    C_TEXT = RGBColor(30, 41, 59)         # Slate 800
    C_MUTED = RGBColor(100, 116, 139)     # Slate 500
    C_PRIMARY = RGBColor(2, 132, 199)     # Cyan/Sky 600
    C_BLUE = RGBColor(37, 99, 235)        # Blue 600
    C_NAVY = RGBColor(30, 58, 138)        # Navy 900
    C_AMBER = RGBColor(245, 158, 11)      # Amber 500
    C_ROSE = RGBColor(225, 29, 72)        # Rose 600
    C_GREEN = RGBColor(16, 185, 129)      # Emerald 500
    C_BORDER = RGBColor(226, 232, 240)    # Slate 200

    # 1. Full Background
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(24), Inches(36))
    bg.fill.solid()
    bg.fill.fore_color.rgb = C_BG
    bg.line.color.rgb = C_BG

    # 2. Header Container
    header = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.8), Inches(22.4), Inches(4.3))
    header.fill.solid()
    header.fill.fore_color.rgb = C_HEADER_BG
    header.line.color.rgb = C_PRIMARY
    header.line.width = Pt(3)

    tf_h = header.text_frame
    tf_h.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf_h.word_wrap = True
    tf_h.margin_left = Inches(0.5)
    tf_h.margin_right = Inches(0.5)
    tf_h.margin_top = Inches(0.3)
    tf_h.margin_bottom = Inches(0.3)

    # Header Paragraph 1: Sponsoring Org
    p1 = tf_h.paragraphs[0]
    p1.text = "DIỄN ĐÀN ĐỔI MỚI SÁNG TẠO GIÁO DỤC VIỆT NAM VỚI TRÍ TUỆ NHÂN TẠO 2026  •  BỘ GD&ĐT & ĐẠI HỌC RMIT"
    p1.font.name = "Arial"
    p1.font.size = Pt(15)
    p1.font.bold = True
    p1.font.color.rgb = C_AMBER
    p1.alignment = PP_ALIGN.CENTER
    p1.space_after = Pt(8)

    # Header Paragraph 2: Project Title
    p2 = tf_h.add_paragraph()
    p2.text = "KID-CONNECT AI: TRỢ LÝ TRÍ TUỆ NHÂN TẠO CÁ NHÂN HÓA ĐÁNH GIÁ TRẺ\nVÀ TỐI ƯU HÓA KẾT NỐI NHÀ TRƯỜNG - GIA ĐÌNH"
    p2.font.name = "Arial"
    p2.font.size = Pt(28)
    p2.font.bold = True
    p2.font.color.rgb = C_WHITE
    p2.alignment = PP_ALIGN.CENTER
    p2.space_after = Pt(10)

    # Header Paragraph 3: Slogan
    p3 = tf_h.add_paragraph()
    p3.text = "★ Khẩu hiệu: Công nghệ nâng bước yêu thương — Cá nhân hóa hành trình lớn khôn của bé ★"
    p3.font.name = "Arial"
    p3.font.size = Pt(17)
    p3.font.italic = True
    p3.font.color.rgb = C_PRIMARY
    p3.alignment = PP_ALIGN.CENTER
    p3.space_after = Pt(8)

    # Header Paragraph 4: Metadata
    p4 = tf_h.add_paragraph()
    p4.text = "BẢNG A (MẦM NON & TIỂU HỌC)  |  ĐƠN VỊ: TRƯỜNG MẦM NON PHÚC SƠN B - XÃ PHÚC SƠN  |  TÁC GIẢ: GIÁO VIÊN CHỦ TRÌ"
    p4.font.name = "Arial"
    p4.font.size = Pt(14)
    p4.font.bold = True
    p4.font.color.rgb = RGBColor(203, 213, 225)
    p4.alignment = PP_ALIGN.CENTER

    # Helper function to create section title
    def add_section_box(left, top, width, height, title, subtitle, accent_color):
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        box.fill.solid()
        box.fill.fore_color.rgb = C_WHITE
        box.line.color.rgb = accent_color
        box.line.width = Pt(2.5)

        # Header banner inside box
        h_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, Inches(1.3))
        h_box.fill.solid()
        h_box.fill.fore_color.rgb = accent_color
        h_box.line.fill.background()
        tf = h_box.text_frame
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        tf.word_wrap = True
        tf.margin_left = Inches(0.3)
        p = tf.paragraphs[0]
        p.text = title
        p.font.name = "Arial"
        p.font.size = Pt(18)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        if subtitle:
            p_sub = tf.add_paragraph()
            p_sub.text = subtitle
            p_sub.font.name = "Arial"
            p_sub.font.size = Pt(12)
            p_sub.font.color.rgb = RGBColor(241, 245, 249)
        return box

    # Coordinates
    col_w = Inches(7.13)
    col_gap = Inches(0.5)
    top_cols = Inches(5.4)
    h_cols = Inches(27.4)

    col1_left = Inches(0.8)
    col2_left = Inches(0.8) + col_w + col_gap
    col3_left = col2_left + col_w + col_gap

    # ==================== CỘT 1: BỐI CẢNH & THÁCH THỨC ====================
    add_section_box(col1_left, top_cols, col_w, h_cols, 
                    "1. BỐI CẢNH & NỖI ĐAU THỰC TẾ", 
                    "Thực trạng tại cơ sở & 3 Điểm nghẽn cấp bách", C_ROSE)

    # Column 1 Text Frame
    tb1 = slide.shapes.add_textbox(col1_left + Inches(0.25), top_cols + Inches(1.4), col_w - Inches(0.5), h_cols - Inches(1.6))
    tf1 = tb1.text_frame
    tf1.word_wrap = True
    tf1.margin_left = tf1.margin_right = tf1.margin_top = tf1.margin_bottom = 0

    p = tf1.paragraphs[0]
    p.text = "📍 THỰC TRẠNG CẤP THIẾT TẠI CƠ SỞ:"
    p.font.bold = True
    p.font.size = Pt(15)
    p.font.color.rgb = C_NAVY
    p.space_after = Pt(4)

    p = tf1.add_paragraph()
    p.text = "• Trường Mầm non Phúc Sơn B có hơn 100 học sinh phân bổ tại 4 khối lớp thuộc xã miền núi khó khăn.\n• Quy định Bộ GD&ĐT: Giáo viên phải theo dõi liên tục 5 lĩnh vực phát triển: Thể chất, Nhận thức, Ngôn ngữ, TC-KNXH, Thẩm mỹ.\n• Sĩ số 25 - 35 trẻ/lớp dẫn đến khối lượng đánh giá định tính khổng lồ."
    p.font.size = Pt(13)
    p.font.color.rgb = C_TEXT
    p.space_after = Pt(12)

    p = tf1.add_paragraph()
    p.text = "⚡ 3 ĐIỂM NGHẼN LỚN CỦA GIÁO VIÊN:"
    p.font.bold = True
    p.font.size = Pt(15)
    p.font.color.rgb = C_ROSE
    p.space_after = Pt(6)

    bottlenecks = [
        ("1. Quá tải sổ sách hành chính:", "Giáo viên mất 8 - 12 giờ/tuần ngoài giờ lên lớp chỉ để ghi chép hồ sơ, sổ theo dõi thủ công. Áp lực kéo dài gây kiệt sức và giảm giờ chuẩn bị đồ dùng dạy học."),
        ("2. Nhận xét rập khuôn, chiếu lệ:", "Vì quá tải, lời nhận xét dễ rơi vào chung chung ('bé ngoan, ăn hết suất'), chưa phản ánh đúng sở thích, điểm mạnh và tiến bộ vi mô của từng em."),
        ("3. Giao tiếp một chiều qua Zalo:", "Kênh nhóm lớp dễ trôi thông tin, thiếu tính riêng tư và chưa cung cấp chỉ dẫn sư phạm cụ thể để phụ huynh đồng hành cùng con tại nhà.")
    ]
    for b_title, b_desc in bottlenecks:
        p = tf1.add_paragraph()
        p.text = b_title
        p.font.bold = True
        p.font.size = Pt(13.5)
        p.font.color.rgb = C_NAVY
        p = tf1.add_paragraph()
        p.text = b_desc
        p.font.size = Pt(12.5)
        p.font.color.rgb = C_TEXT
        p.space_after = Pt(8)

    p = tf1.add_paragraph()
    p.text = "🎯 MỤC TIÊU ĐỘT PHÁ CỦA DỰ ÁN:"
    p.font.bold = True
    p.font.size = Pt(15)
    p.font.color.rgb = C_GREEN
    p.space_after = Pt(6)

    goals = [
        "✓ Cắt giảm 80% thời gian sổ sách (từ 12h xuống 2h/tuần).",
        "✓ Cá nhân hóa 100% hồ sơ tiến bộ số cho toàn bộ trẻ.",
        "✓ Kiến tạo kênh đồng hành 2 chiều bền vững Gia đình - Nhà trường.",
        "✓ Vận hành mượt mà trên điện thoại di động với chi phí 0 đồng."
    ]
    for g in goals:
        p = tf1.add_paragraph()
        p.text = g
        p.font.bold = True
        p.font.size = Pt(13)
        p.font.color.rgb = C_NAVY
        p.space_after = Pt(4)

    # ==================== CỘT 2: GIẢI PHÁP & QUY TRÌNH ====================
    add_section_box(col2_left, top_cols, col_w, h_cols, 
                    "2. GIẢI PHÁP KỸ THUẬT & QUY TRÌNH", 
                    "Hệ thống KID-CONNECT AI & Quy trình 3 bước", C_BLUE)

    # Visual Hero Illustration Image (Inserted in Center Column)
    hero_img_path = r"c:\Users\PC\Downloads\MNĐT\poster_hero_illustration.jpg"
    img_top = top_cols + Inches(1.4)
    img_w = col_w - Inches(0.5)
    img_h = Inches(6.2)
    if os.path.exists(hero_img_path):
        slide.shapes.add_picture(hero_img_path, col2_left + Inches(0.25), img_top, img_w, img_h)

    # Column 2 Text Frame
    tb2 = slide.shapes.add_textbox(col2_left + Inches(0.25), img_top + img_h + Inches(0.15), col_w - Inches(0.5), h_cols - img_h - Inches(1.8))
    tf2 = tb2.text_frame
    tf2.word_wrap = True
    tf2.margin_left = tf2.margin_right = tf2.margin_top = tf2.margin_bottom = 0

    p = tf2.paragraphs[0]
    p.text = "🔄 QUY TRÌNH 3 BƯỚC VẬN HÀNH TINH GỌN:"
    p.font.bold = True
    p.font.size = Pt(15)
    p.font.color.rgb = C_BLUE
    p.space_after = Pt(6)

    steps = [
        ("BƯỚC 1: Thu nhận tự nhiên (Voice Input - 30 giây)", 
         "Cô giáo chỉ cần chạm nút micro nói 30s tiếng Việt tự nhiên cuối ngày: 'Bé Nam hôm nay tự xúc cơm gọn gàng, vẽ tranh màu sắc rất tươi, nhưng giờ vận động còn rụt rè.'"),
        ("BƯỚC 2: AI Core Xử lý Sư phạm (5 Lĩnh vực GDMN)", 
         "Prompt Master chuẩn Bộ GD&ĐT bóc tách hành vi vào 5 lĩnh vực, chấm điểm sao và tự động tạo 01 lời khuyên tương tác tại nhà (Home Connection Tip) ấm áp."),
        ("BƯỚC 3: Kết xuất Trực quan (Canva Style Infographic)", 
         "Tự động xuất thẻ ảnh 'Nhật ký tuần của bé' rực rỡ sắc màu, sao chép tin nhắn Zalo gửi riêng cho phụ huynh chỉ với 1 chạm duy nhất.")
    ]
    for s_title, s_desc in steps:
        p = tf2.add_paragraph()
        p.text = s_title
        p.font.bold = True
        p.font.size = Pt(13)
        p.font.color.rgb = C_NAVY
        p = tf2.add_paragraph()
        p.text = s_desc
        p.font.size = Pt(12)
        p.font.color.rgb = C_TEXT
        p.space_after = Pt(6)

    p = tf2.add_paragraph()
    p.text = "⚙️ 3 PHÂN HỆ CÔNG NGHỆ CỐT LÕI (CHI PHÍ 0 ĐỒNG):"
    p.font.bold = True
    p.font.size = Pt(14)
    p.font.color.rgb = C_NAVY
    p.space_after = Pt(4)

    techs = [
        "1. Voice-to-Pedagogical Note: Web Speech API nhận diện giọng nói tiếng Việt chuẩn xác cả giọng địa phương.",
        "2. Pedagogical Rule Engine + Gemini AI: Bộ luật chuẩn hóa 5 lĩnh vực kết hợp AI đa phương tiện.",
        "3. Canva for Education Automation: Kết xuất thẻ đồ họa infographic với 4 chủ đề thiết kế sinh động."
    ]
    for t in techs:
        p = tf2.add_paragraph()
        p.text = t
        p.font.size = Pt(12)
        p.font.color.rgb = C_TEXT
        p.space_after = Pt(4)

    # ==================== CỘT 3: KẾT QUẢ & TÁC ĐỘNG ====================
    add_section_box(col3_left, top_cols, col_w, h_cols, 
                    "3. KẾT QUẢ ĐẠT ĐƯỢC & LAN TỎA", 
                    "Minh chứng thực nghiệm & Trách nhiệm xã hội", C_GREEN)

    # Column 3 Text Frame
    tb3 = slide.shapes.add_textbox(col3_left + Inches(0.25), top_cols + Inches(1.4), col_w - Inches(0.5), h_cols - Inches(1.6))
    tf3 = tb3.text_frame
    tf3.word_wrap = True
    tf3.margin_left = tf3.margin_right = tf3.margin_top = tf3.margin_bottom = 0

    p = tf3.paragraphs[0]
    p.text = "📊 KẾT QUẢ ĐỊNH LƯỢNG THỰC NGHIỆM:"
    p.font.bold = True
    p.font.size = Pt(15)
    p.font.color.rgb = C_GREEN
    p.space_after = Pt(6)

    stats = [
        ("Thời gian ghi sổ theo dõi:", "12h/tuần ➔ 2h/tuần (GIẢM 83.3%)"),
        ("Tỷ lệ trẻ có hồ sơ số:", "0% ➔ 100% toàn bộ trẻ thực nghiệm"),
        ("Tỷ lệ phụ huynh phản hồi:", "38.5% ➔ 94.7% (Tăng gấp 2.5 lần)"),
        ("Phụ huynh đồng hành tại nhà:", "22.0% ➔ 86.3% (Tăng gần 4 lần)")
    ]
    for s_label, s_val in stats:
        p = tf3.add_paragraph()
        p.text = f"• {s_label} {s_val}"
        p.font.bold = True
        p.font.size = Pt(13)
        p.font.color.rgb = C_NAVY
        p.space_after = Pt(5)

    p = tf3.add_paragraph()
    p.text = "💬 TIẾNG NÓI TỪ NGƯỜI TRONG CUỘC:"
    p.font.bold = True
    p.font.size = Pt(15)
    p.font.color.rgb = C_NAVY
    p.space_after = Pt(6)

    quotes = [
        ("“Từ ngày có KID-CONNECT AI, tôi không còn phải thức đến 11 giờ đêm để ghi chép sổ sách. Tôi dành trọn thời gian đó để nghiên cứu phương pháp dạy học sáng tạo!”", 
         "— Cô giáo chủ trì Trường Mầm non Phúc Sơn B"),
        ("“Nhận được nhật ký sắc màu cùng gợi ý của cô giáo, tối nào cả nhà tôi cũng hào hứng cùng con chơi trò chơi chữ cái trước khi ngủ!”", 
         "— Đại diện Ban Phụ huynh học sinh")
    ]
    for q_text, q_author in quotes:
        p = tf3.add_paragraph()
        p.text = q_text
        p.font.italic = True
        p.font.size = Pt(12)
        p.font.color.rgb = C_TEXT
        p = tf3.add_paragraph()
        p.text = q_author
        p.font.bold = True
        p.font.size = Pt(11.5)
        p.font.color.rgb = C_BLUE
        p.space_after = Pt(8)

    p = tf3.add_paragraph()
    p.text = "🛡️ ĐẠO ĐỨC AI & KHẢ NĂNG NHÂN RỘNG:"
    p.font.bold = True
    p.font.size = Pt(15)
    p.font.color.rgb = C_AMBER
    p.space_after = Pt(6)

    responsibles = [
        ("An toàn dữ liệu trẻ em:", "100% tuân thủ Luật Trẻ em 2016, hỗ trợ ẩn danh tên/ảnh học sinh, lưu trữ dữ liệu an toàn."),
        ("Quyền kiểm duyệt tối cao:", "Human-in-the-Loop — Cô giáo là người duyệt và chỉnh sửa cuối cùng trước khi gửi."),
        ("Dễ dàng nhân rộng:", "Không cần máy chủ đắt đỏ, chạy tốt trên điện thoại cá nhân của giáo viên, sẵn sàng chuyển giao cho 100% trường mầm non toàn huyện.")
    ]
    for r_title, r_desc in responsibles:
        p = tf3.add_paragraph()
        p.text = f"★ {r_title} {r_desc}"
        p.font.size = Pt(12)
        p.font.color.rgb = C_TEXT
        p.space_after = Pt(6)

    # ==================== 4. FOOTER BANNER ====================
    footer = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(33.2), Inches(22.4), Inches(2.0))
    footer.fill.solid()
    footer.fill.fore_color.rgb = C_HEADER_BG
    footer.line.color.rgb = C_AMBER
    footer.line.width = Pt(2.5)

    tf_f = footer.text_frame
    tf_f.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf_f.word_wrap = True
    tf_f.margin_left = Inches(0.4)
    tf_f.margin_right = Inches(2.5) # leave room for QR code
    tf_f.margin_top = Inches(0.15)
    tf_f.margin_bottom = Inches(0.15)

    pf1 = tf_f.paragraphs[0]
    pf1.text = "KID-CONNECT AI: CÔNG NGHỆ NÂNG BƯỚC YÊU THƯƠNG — CÙNG BÉ KIẾN TẠO TƯƠNG LAI SỐ"
    pf1.font.name = "Arial"
    pf1.font.size = Pt(17)
    pf1.font.bold = True
    pf1.font.color.rgb = C_AMBER
    pf1.space_after = Pt(4)

    pf2 = tf_f.add_paragraph()
    pf2.text = "Trường Mầm non Phúc Sơn B — Xã Phúc Sơn  |  Cổng thông tin & Nộp bài dự thi: www.ieeai.net/giaithuong\nỨng dụng trực tuyến: https://annethanks.github.io/dongtam-kindergarten/  |  Liên kết Canva BTC: apps.rmit.edu.vn"
    pf2.font.name = "Arial"
    pf2.font.size = Pt(13)
    pf2.font.color.rgb = RGBColor(226, 232, 240)

    # Insert QR Code in Footer
    qr_path = r"c:\Users\PC\Downloads\MNĐT\QR_Code_KID_CONNECT_AI.png"
    if os.path.exists(qr_path):
        slide.shapes.add_picture(qr_path, Inches(21.3), Inches(33.3), Inches(1.7), Inches(1.7))

    output_pptx = r"c:\Users\PC\Downloads\MNĐT\Poster_KID_CONNECT_AI_Canva_Import.pptx"
    prs.save(output_pptx)
    print(f"Poster successfully generated and saved to: {output_pptx}")

if __name__ == '__main__':
    build_poster()
