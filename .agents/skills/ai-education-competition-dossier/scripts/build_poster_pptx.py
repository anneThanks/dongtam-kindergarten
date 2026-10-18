# -*- coding: utf-8 -*-
"""
Script Tự Động Hóa Tạo Poster Khoa Học Khổ Lớn (A0 / 24x36 inch) bằng python-pptx
Dành cho các Hội thi Sáng kiến Giáo dục, Diễn đàn Đổi mới Sáng tạo & Ngày hội AI.
"""

import os
import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

try:
    from pptx import Presentation
    from pptx.util import Inches, Pt
    from pptx.dml.color import RGBColor
    from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
    from pptx.enum.shapes import MSO_SHAPE
except ImportError:
    print("Vui lòng cài đặt python-pptx trước: pip install python-pptx")
    sys.exit(1)

def build_competition_poster(output_file="Poster_AI_Education_A0.pptx", project_data=None):
    if project_data is None:
        project_data = {
            "org": "BỘ GIÁO DỤC VÀ ĐÀO TẠO & ĐẠI HỌC RMIT VIỆT NAM",
            "event": "DIỄN ĐÀN ĐỔI MỚI SÁNG TẠO GIÁO DỤC VỚI TRÍ TUỆ NHÂN TẠO 2026",
            "title": "TRỢ LÝ TRÍ TUỆ NHÂN TẠO CÁ NHÂN HÓA TRONG GIÁO DỤC",
            "slogan": "Giảm tải hành chính - Cá nhân hóa học tập - Kết nối gia đình & nhà trường",
            "author": "Giáo viên / Cán bộ Quản lý",
            "unit": "Trường Mầm non / Tiểu học",
            "track": "BẢNG A: KHỐI MẦM NON & TIỂU HỌC"
        }

    prs = Presentation()
    # Khổ chuẩn 24x36 inch (tương đương khổ dọc A0 triển lãm khoa học)
    prs.slide_width = Inches(24)
    prs.slide_height = Inches(36)
    blank_layout = prs.slide_layouts[6]
    slide = prs.slides.add_slide(blank_layout)

    # Bảng màu chuyên nghiệp
    C_BG = RGBColor(248, 250, 252)        # Slate 50
    C_HEADER_BG = RGBColor(15, 23, 42)    # Slate 900
    C_WHITE = RGBColor(255, 255, 255)
    C_TEXT = RGBColor(30, 41, 59)         # Slate 800
    C_MUTED = RGBColor(100, 116, 139)     # Slate 500
    C_PRIMARY = RGBColor(2, 132, 199)     # Cyan/Sky 600
    C_AMBER = RGBColor(245, 158, 11)      # Amber 500
    C_GREEN = RGBColor(16, 185, 129)      # Emerald 500
    C_CARD_BG = RGBColor(255, 255, 255)   # Trắng

    # 1. Nền tổng thể
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(24), Inches(36))
    bg.fill.solid()
    bg.fill.fore_color.rgb = C_BG
    bg.line.color.rgb = C_BG

    # 2. Header Container
    header = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.8), Inches(22.4), Inches(4.2))
    header.fill.solid()
    header.fill.fore_color.rgb = C_HEADER_BG
    header.line.color.rgb = C_PRIMARY
    header.line.width = Pt(3)

    tf_h = header.text_frame
    tf_h.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf_h.word_wrap = True

    # Header P1: Cơ quan tổ chức
    p1 = tf_h.paragraphs[0]
    p1.text = f"{project_data['event']}  •  {project_data['org']}"
    p1.font.name = "Arial"
    p1.font.size = Pt(14)
    p1.font.bold = True
    p1.font.color.rgb = C_AMBER
    p1.alignment = PP_ALIGN.CENTER
    p1.space_after = Pt(8)

    # Header P2: Tiêu đề dự án
    p2 = tf_h.add_paragraph()
    p2.text = project_data['title']
    p2.font.name = "Arial"
    p2.font.size = Pt(26)
    p2.font.bold = True
    p2.font.color.rgb = C_WHITE
    p2.alignment = PP_ALIGN.CENTER
    p2.space_after = Pt(8)

    # Header P3: Slogan
    p3 = tf_h.add_paragraph()
    p3.text = f"★ {project_data['slogan']} ★"
    p3.font.name = "Arial"
    p3.font.size = Pt(15)
    p3.font.color.rgb = C_PRIMARY
    p3.alignment = PP_ALIGN.CENTER
    p3.space_after = Pt(8)

    # Header P4: Tác giả
    p4 = tf_h.add_paragraph()
    p4.text = f"Tác giả: {project_data['author']}  |  Đơn vị: {project_data['unit']}  |  {project_data['track']}"
    p4.font.name = "Arial"
    p4.font.size = Pt(13)
    p4.font.color.rgb = C_MUTED
    p4.alignment = PP_ALIGN.CENTER

    # 3. Ba Cột Nội Dung (Left, Center, Right)
    col_w = Inches(7.2)
    col_gap = Inches(0.4)
    top_y = Inches(5.4)
    col_h = Inches(29.6)

    # Cột 1: Bối Cảnh & Thách Thức
    c1 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top_y, col_w, col_h)
    c1.fill.solid()
    c1.fill.fore_color.rgb = C_CARD_BG
    c1.line.color.rgb = RGBColor(226, 232, 240)
    tf1 = c1.text_frame
    tf1.word_wrap = True
    p = tf1.paragraphs[0]
    p.text = "CỘT 1: BỐI CẢNH & THÁCH THỨC THỰC TIỄN"
    p.font.name = "Arial"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY

    # Cột 2: Giải Pháp & Đột Phá AI
    c2 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8) + col_w + col_gap, top_y, col_w, col_h)
    c2.fill.solid()
    c2.fill.fore_color.rgb = C_CARD_BG
    c2.line.color.rgb = C_PRIMARY
    c2.line.width = Pt(2)
    tf2 = c2.text_frame
    tf2.word_wrap = True
    p = tf2.paragraphs[0]
    p.text = "CỘT 2: GIẢI PHÁP CÔNG NGHỆ & ĐỘT PHÁ SÁNG TẠO"
    p.font.name = "Arial"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY

    # Cột 3: Tác Động, Minh Chứng & Bền Vững
    c3 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8) + (col_w + col_gap) * 2, top_y, col_w, col_h)
    c3.fill.solid()
    c3.fill.fore_color.rgb = C_CARD_BG
    c3.line.color.rgb = RGBColor(226, 232, 240)
    tf3 = c3.text_frame
    tf3.word_wrap = True
    p = tf3.paragraphs[0]
    p.text = "CỘT 3: TÁC ĐỘNG, MINH CHỨNG & TÍNH BỀN VỮNG"
    p.font.name = "Arial"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = C_GREEN

    prs.save(output_file)
    print(f"Đã xuất thành công poster PPTX: {output_file}")
    return output_file

if __name__ == "__main__":
    build_competition_poster()
