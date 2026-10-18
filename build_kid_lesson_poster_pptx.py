# -*- coding: utf-8 -*-
"""
Script tạo Poster Khoa Học Dự Án Sáng Kiến KID-LESSON AI 2026 (Khổ A0 / 24x36 inch)
Chuẩn thể lệ Diễn đàn Đổi mới Sáng tạo Giáo dục Việt Nam với AI (Bộ GD&ĐT & ĐH RMIT)
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

def build_poster(filename="Poster_KID_LESSON_AI_A0.pptx"):
    prs = Presentation()
    prs.slide_width = Inches(24)
    prs.slide_height = Inches(36)
    blank_layout = prs.slide_layouts[6]
    slide = prs.slides.add_slide(blank_layout)

    # Color Palette
    C_BG = RGBColor(248, 250, 252)        # Slate 50
    C_HEADER_BG = RGBColor(15, 23, 42)    # Slate 900
    C_WHITE = RGBColor(255, 255, 255)
    C_TEXT = RGBColor(30, 41, 59)         # Slate 800
    C_MUTED = RGBColor(100, 116, 139)     # Slate 500
    C_PRIMARY = RGBColor(2, 132, 199)     # Sky/Cyan 600
    C_BLUE = RGBColor(2, 132, 199)        # Sky/Cyan 600
    C_AMBER = RGBColor(245, 158, 11)      # Amber 500
    C_GREEN = RGBColor(16, 185, 129)      # Emerald 500
    C_CARD_BG = RGBColor(255, 255, 255)   # Trắng

    # 1. Background
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(24), Inches(36))
    bg.fill.solid()
    bg.fill.fore_color.rgb = C_BG
    bg.line.color.rgb = C_BG

    # 2. Header Box
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

    p1 = tf_h.paragraphs[0]
    p1.text = "DIỄN ĐÀN ĐỔI MỚI SÁNG TẠO GIÁO DỤC VIỆT NAM VỚI TRÍ TUỆ NHÂN TẠO 2026  •  BỘ GD&ĐT & ĐẠI HỌC RMIT"
    p1.font.name = "Arial"
    p1.font.size = Pt(14)
    p1.font.bold = True
    p1.font.color.rgb = C_AMBER
    p1.alignment = PP_ALIGN.CENTER
    p1.space_after = Pt(8)

    p2 = tf_h.add_paragraph()
    p2.text = "KID-LESSON AI: HỆ THỐNG TRỢ LÝ TRÍ TUỆ NHÂN TẠO TẠO SINH TRONG XÂY DỰNG\nKẾ HOẠCH BÀI DẠY (GIÁO ÁN) ĐIỆN TỬ VÀ KHO HỌC LIỆU SỐ ĐA PHƯƠNG TIỆN"
    p2.font.name = "Arial"
    p2.font.size = Pt(26)
    p2.font.bold = True
    p2.font.color.rgb = C_WHITE
    p2.alignment = PP_ALIGN.CENTER
    p2.space_after = Pt(8)

    p3 = tf_h.add_paragraph()
    p3.text = "★ GIẢI PHÓNG SỨC LAO ĐỘNG NHÀ GIÁO  •  KHƠI NGUỒN SÁNG TẠO BÀI GIẢNG MẦM NON ★"
    p3.font.name = "Arial"
    p3.font.size = Pt(15)
    p3.font.color.rgb = C_PRIMARY
    p3.alignment = PP_ALIGN.CENTER
    p3.space_after = Pt(8)

    p4 = tf_h.add_paragraph()
    p4.text = "Đơn vị: Trường Mầm non Phúc Sơn B  |  Tác giả: Giáo viên chủ trì & Tổ Chuyên môn  |  Phân bảng A: Mầm non & Tiểu học"
    p4.font.name = "Arial"
    p4.font.size = Pt(13)
    p4.font.color.rgb = C_MUTED
    p4.alignment = PP_ALIGN.CENTER

    # 3. Ba Cột Bố Cục A0
    col_w = Inches(7.2)
    col_gap = Inches(0.4)
    top_y = Inches(5.4)
    col_h = Inches(29.6)

    # CỘT 1: BỐI CẢNH & THÁCH THỨC
    c1 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top_y, col_w, col_h)
    c1.fill.solid()
    c1.fill.fore_color.rgb = C_CARD_BG
    c1.line.color.rgb = RGBColor(226, 232, 240)
    tf1 = c1.text_frame
    tf1.word_wrap = True
    tf1.margin_left = Inches(0.4)
    tf1.margin_right = Inches(0.4)
    tf1.margin_top = Inches(0.4)

    p = tf1.paragraphs[0]
    p.text = "I. BỐI CẢNH & NỖI ĐAU SƯ PHẠM"
    p.font.name = "Arial"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY
    p.space_after = Pt(14)

    items_c1 = [
        ("• Quá tải thời gian soạn bài:", " Giáo viên mầm non mất 12-15h mỗi tuần chỉ để gõ 10-15 giáo án chi tiết và tự chuẩn bị đồ dùng dạy học thủ công."),
        ("• Giáo án rập khuôn, sao chép:", " Do áp lực thời gian, nhiều giáo viên phải tải giáo án cũ trên mạng với câu từ sáo rỗng, không phù hợp tâm lý trẻ em địa phương."),
        ("• Thiếu thốn học liệu trực quan:", " Trường mầm non nông thôn thiếu kinh phí mua sắm đồ dùng số; trẻ học thụ động, dễ phân tán chú ý và nhanh chán."),
        ("• Mục tiêu sáng kiến:", " Giảm 80% thời gian soạn bài, cung cấp kho học liệu tranh ảnh và thơ ca 0 đồng, nâng cao chất lượng bài giảng lấy trẻ làm trung tâm.")
    ]
    for bold_txt, normal_txt in items_c1:
        p_item = tf1.add_paragraph()
        p_item.space_after = Pt(12)
        r_b = p_item.add_run()
        r_b.text = bold_txt
        r_b.font.bold = True
        r_b.font.name = "Arial"
        r_b.font.size = Pt(13)
        r_b.font.color.rgb = C_TEXT
        r_n = p_item.add_run()
        r_n.text = normal_txt
        r_n.font.name = "Arial"
        r_n.font.size = Pt(13)
        r_n.font.color.rgb = C_TEXT

    # CỘT 2: GIẢI PHÁP & ĐỘT PHÁ SÁNG TẠO
    c2 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8) + col_w + col_gap, top_y, col_w, col_h)
    c2.fill.solid()
    c2.fill.fore_color.rgb = C_CARD_BG
    c2.line.color.rgb = C_PRIMARY
    c2.line.width = Pt(2.5)
    tf2 = c2.text_frame
    tf2.word_wrap = True
    tf2.margin_left = Inches(0.4)
    tf2.margin_right = Inches(0.4)
    tf2.margin_top = Inches(0.4)

    p = tf2.paragraphs[0]
    p.text = "II. GIẢI PHÁP CÔNG NGHỆ KID-LESSON AI"
    p.font.name = "Arial"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY
    p.space_after = Pt(14)

    items_c2 = [
        ("★ Phân hệ 1: Soạn Kế hoạch bài dạy 5 bước:", " Tự động tạo giáo án chuẩn mực 3 Mục tiêu (Kiến thức - Kỹ năng - Thái độ) và Tiến trình 3 bước lôi cuốn bám sát Thông tư 51/2020/TT-BGDĐT."),
        ("★ Phân hệ 2: Sáng tác Thơ & Câu đố mới:", " Sáng tác tức thì các bài thơ 4 chữ, 5 chữ gieo vần vui tươi theo chủ đề và câu đố tư duy giúp tiết học hấp dẫn ngay từ phút đầu tiên."),
        ("★ Phân hệ 3: Tự động hóa Thiết kế Đồ dùng số:", " Ứng dụng Prompt AI tạo sinh thẻ tranh Flashcard sắc nét, tranh tô màu và trò chơi tương tác đa điểm chạm trên Canva với chi phí 0 đồng."),
        ("★ Quy trình 3 bước siêu tốc:", " Nhập chủ đề/độ tuổi -> AI sinh trọn bộ bài dạy trong 30 giây -> Giáo viên duyệt và trình chiếu lên màn hình lớp học.")
    ]
    for bold_txt, normal_txt in items_c2:
        p_item = tf2.add_paragraph()
        p_item.space_after = Pt(12)
        r_b = p_item.add_run()
        r_b.text = bold_txt
        r_b.font.bold = True
        r_b.font.name = "Arial"
        r_b.font.size = Pt(13)
        r_b.font.color.rgb = C_BLUE if "★" in bold_txt else C_TEXT
        r_n = p_item.add_run()
        r_n.text = normal_txt
        r_n.font.name = "Arial"
        r_n.font.size = Pt(13)
        r_n.font.color.rgb = C_TEXT

    # CỘT 3: TÁC ĐỘNG & NHÂN RỘNG BỀN VỮNG
    c3 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8) + (col_w + col_gap) * 2, top_y, col_w, col_h)
    c3.fill.solid()
    c3.fill.fore_color.rgb = C_CARD_BG
    c3.line.color.rgb = RGBColor(226, 232, 240)
    tf3 = c3.text_frame
    tf3.word_wrap = True
    tf3.margin_left = Inches(0.4)
    tf3.margin_right = Inches(0.4)
    tf3.margin_top = Inches(0.4)

    p = tf3.paragraphs[0]
    p.text = "III. TÁC ĐỘNG THỰC TẾ & NHÂN RỘNG"
    p.font.name = "Arial"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = C_GREEN
    p.space_after = Pt(14)

    items_c3 = [
        ("✓ Giảm 80% thời gian soạn bài:", " Thời gian chuẩn bị bài giảng của giáo viên giảm từ 14h/tuần xuống chỉ còn 2.8h/tuần."),
        ("✓ 100% tiết dạy có học liệu số trực quan:", " Trẻ được tiếp cận tranh ảnh sắc nét, thơ ca mới lạ mỗi ngày."),
        ("✓ 95.8% trẻ hào hứng, tập trung:", " Tiết học sinh động giúp trẻ phát triển ngôn ngữ và tư duy vượt bậc."),
        ("✓ Chi phí 0 đồng - Nhân rộng dễ dàng:", " Vận hành trên phiên bản giáo dục miễn phí của Gemini và Canva; tập huấn 30 phút là giáo viên dùng được ngay."),
        ("✓ Cam kết Đạo đức AI (Responsible AI):", " Thực hiện nguyên tắc Human-in-the-Loop, giáo viên là người duyệt cuối cùng, kiểm soát tuyệt đối an toàn nội dung cho trẻ em.")
    ]
    for bold_txt, normal_txt in items_c3:
        p_item = tf3.add_paragraph()
        p_item.space_after = Pt(12)
        r_b = p_item.add_run()
        r_b.text = bold_txt
        r_b.font.bold = True
        r_b.font.name = "Arial"
        r_b.font.size = Pt(13)
        r_b.font.color.rgb = C_GREEN if "✓" in bold_txt else C_TEXT
        r_n = p_item.add_run()
        r_n.text = normal_txt
        r_n.font.name = "Arial"
        r_n.font.size = Pt(13)
        r_n.font.color.rgb = C_TEXT

    prs.save(filename)
    print(f"Đã xuất thành công poster PPTX: {filename}")
    return filename

if __name__ == "__main__":
    build_poster()
