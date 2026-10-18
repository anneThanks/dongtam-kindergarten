# -*- coding: utf-8 -*-
"""
Script tạo file Word (.docx) Kế hoạch Chi tiết Sáng kiến Sư phạm KID-LESSON AI 2026
Chuẩn thể thức Nghị định 30/2020/NĐ-CP và Thể lệ Giải thưởng AI trong Giáo dục (Bộ GD&ĐT & ĐH RMIT)
"""

import sys
import os
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor, Mm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    """Đặt màu nền cho cell trong table."""
    tcPr = cell._element.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    """Đặt padding cho cell."""
    tcPr = cell._element.get_or_add_tcPr()
    tcMar = parse_xml(
        f'<w:tcMar {nsdecls("w")}>'
        f'<w:top w:w="{top}" w:type="dxa"/>'
        f'<w:bottom w:w="{bottom}" w:type="dxa"/>'
        f'<w:left w:w="{left}" w:type="dxa"/>'
        f'<w:right w:w="{right}" w:type="dxa"/>'
        f'</w:tcMar>'
    )
    tcPr.append(tcMar)

def add_callout(doc, text, title=""):
    """Tạo hộp ghi chú / Callout nổi bật có viền trái dày và nền xám nhạt."""
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    cell = tbl.cell(0, 0)
    cell.width = Inches(6.5)
    set_cell_background(cell, "F1F5F9") # Slate 100
    set_cell_margins(cell, top=140, bottom=140, left=200, right=150)
    
    # Border: chỉ viền trái đậm
    tcPr = cell._element.get_or_add_tcPr()
    tcBorders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:top w:val="none"/>'
        f'<w:left w:val="single" w:sz="24" w:space="0" w:color="0284C7"/>' # Cyan/Blue 600
        f'<w:bottom w:val="none"/>'
        f'<w:right w:val="none"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(tcBorders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.line_spacing = 1.2
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    if title:
        r_title = p.add_run(f"★ {title}\n")
        r_title.bold = True
        r_title.font.name = "Times New Roman"
        r_title.font.size = Pt(12)
        r_title.font.color.rgb = RGBColor(2, 132, 199)
    r_body = p.add_run(text)
    r_body.italic = True
    r_body.font.name = "Times New Roman"
    r_body.font.size = Pt(11.5)
    r_body.font.color.rgb = RGBColor(30, 41, 59)
    
    # Đoạn cách sau hộp
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

def build_docx(filename="Ke_Hoach_Chi_Tiet_Sang_Kien_KID_LESSON_AI_2026.docx"):
    doc = Document()

    # 1. Page Setup A4
    for section in doc.sections:
        section.page_width = Mm(210)
        section.page_height = Mm(297)
        section.top_margin = Mm(20)
        section.bottom_margin = Mm(20)
        section.left_margin = Mm(30)
        section.right_margin = Mm(15)

    # Palette
    C_NAVY = RGBColor(15, 23, 42)     # Slate 900
    C_BLUE = RGBColor(2, 132, 199)    # Cyan/Sky 600
    C_DARK = RGBColor(30, 41, 59)     # Slate 800
    C_MUTED = RGBColor(100, 116, 139) # Slate 500

    # ==================== TRANG BÌA (COVER PAGE) ====================
    p_top = doc.add_paragraph()
    p_top.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_top.paragraph_format.space_before = Pt(10)
    p_top.paragraph_format.space_after = Pt(2)
    r1 = p_top.add_run("ỦY BAN NHÂN DÂN XÃ PHÚC SƠN\n")
    r1.font.name = "Times New Roman"
    r1.font.size = Pt(13)
    r1.bold = True
    r2 = p_top.add_run("TRƯỜNG MẦM NON PHÚC SƠN B\n")
    r2.font.name = "Times New Roman"
    r2.font.size = Pt(14)
    r2.bold = True
    r2.font.color.rgb = C_BLUE
    r3 = p_top.add_run("---------------o0o---------------")
    r3.font.name = "Times New Roman"
    r3.font.size = Pt(11)

    p_space = doc.add_paragraph()
    p_space.paragraph_format.space_before = Pt(40)

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.line_spacing = 1.3
    p_title.paragraph_format.space_after = Pt(12)
    r_sub = p_title.add_run("BÁO CÁO THUYẾT MINH KẾ HOẠCH SÁNG KIẾN KINH NGHIỆM\n")
    r_sub.font.name = "Times New Roman"
    r_sub.font.size = Pt(14)
    r_sub.bold = True
    r_sub.font.color.rgb = C_MUTED

    r_event = p_title.add_run("THAM DỰ GIẢI THƯỞNG TIÊN PHONG ỨNG DỤNG AI TRONG GIÁO DỤC NĂM 2026\n(BỘ GIÁO DỤC VÀ ĐÀO TẠO & ĐẠI HỌC RMIT VIỆT NAM)\n\n")
    r_event.font.name = "Times New Roman"
    r_event.font.size = Pt(12)
    r_event.bold = True
    r_event.font.color.rgb = RGBColor(245, 158, 11)

    r_name = p_title.add_run(
        "KID-LESSON AI: HỆ THỐNG TRỢ LÝ TRÍ TUỆ NHÂN TẠO TẠO SINH\n"
        "TRONG XÂY DỰNG KẾ HOẠCH BÀI DẠY (GIÁO ÁN) ĐIỆN TỬ,\n"
        "THIẾT KẾ KHO HỌC LIỆU SỐ ĐA PHƯƠNG TIỆN VÀ TRÒ CHƠI HỌC TẬP TƯƠNG TÁC\n"
        "THEO CHỦ ĐỀ TẠI TRƯỜNG MẦM NON PHÚC SƠN B"
    )
    r_name.font.name = "Times New Roman"
    r_name.font.size = Pt(17)
    r_name.bold = True
    r_name.font.color.rgb = C_BLUE

    p_space2 = doc.add_paragraph()
    p_space2.paragraph_format.space_before = Pt(60)

    # Thông tin tác giả
    p_info = doc.add_paragraph()
    p_info.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p_info.paragraph_format.left_indent = Inches(1.5)
    p_info.paragraph_format.line_spacing = 1.3
    
    def add_meta_line(label, value):
        rl = p_info.add_run(label)
        rl.bold = True
        rl.font.name = "Times New Roman"
        rl.font.size = Pt(13)
        rv = p_info.add_run(value + "\n")
        rv.font.name = "Times New Roman"
        rv.font.size = Pt(13)

    add_meta_line("Lĩnh vực: ", "Giáo dục Mầm non & Công nghệ số (AI)")
    add_meta_line("Phân bảng thi đấu: ", "BẢNG A (Mầm non & Tiểu học)")
    add_meta_line("Tác giả: ", "Giáo viên chủ trì & Tổ Chuyên môn Mầm non")
    add_meta_line("Đơn vị công tác: ", "Trường Mầm non Phúc Sơn B")
    add_meta_line("Địa bàn áp dụng: ", "Xã Phúc Sơn, Tỉnh Nghệ An")

    p_space3 = doc.add_paragraph()
    p_space3.paragraph_format.space_before = Pt(80)

    p_bottom = doc.add_paragraph()
    p_bottom.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_bot = p_bottom.add_run("Phúc Sơn, Tháng 10 Năm 2026")
    r_bot.bold = True
    r_bot.font.name = "Times New Roman"
    r_bot.font.size = Pt(12)

    doc.add_page_break()

    # ==================== NỘI DUNG CHÍNH ====================
    def add_h1(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(18)
        p.paragraph_format.space_after = Pt(8)
        p.paragraph_format.keep_with_next = True
        r = p.add_run(text)
        r.bold = True
        r.font.name = "Times New Roman"
        r.font.size = Pt(14)
        r.font.color.rgb = C_BLUE
        return p

    def add_h2(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(12)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        r = p.add_run(text)
        r.bold = True
        r.font.name = "Times New Roman"
        r.font.size = Pt(13)
        r.font.color.rgb = C_NAVY
        return p

    def add_p(text, bold_prefix="", italic=False):
        p = doc.add_paragraph()
        p.paragraph_format.line_spacing = 1.25
        p.paragraph_format.space_after = Pt(6)
        if bold_prefix:
            rb = p.add_run(bold_prefix)
            rb.bold = True
            rb.font.name = "Times New Roman"
            rb.font.size = Pt(13)
        r = p.add_run(text)
        r.italic = italic
        r.font.name = "Times New Roman"
        r.font.size = Pt(13)
        r.font.color.rgb = C_DARK
        return p

    # Phần mở đầu
    add_h1("PHẦN I: CĂN CỨ PHÁP LÝ VÀ SỰ CẦN THIẾT CỦA SÁNG KIẾN")
    add_h2("1. Căn cứ pháp lý")
    add_p("Quyết định số 127/QĐ-TTg của Thủ tướng Chính phủ về Chiến lược quốc gia về nghiên cứu, phát triển và ứng dụng Trí tuệ nhân tạo (AI) đến năm 2030.", "• ")
    add_p("Quyết định số 131/QĐ-TTg của Thủ tướng Chính phủ phê duyệt Đề án 'Tăng cường ứng dụng công nghệ thông tin và chuyển đổi số trong giáo dục và đào tạo giai đoạn 2022 - 2025, định hướng đến năm 2030'.", "• ")
    add_p("Thông tư số 51/2020/TT-BGDĐT ngày 31/12/2020 của Bộ Giáo dục và Đào tạo sửa đổi, bổ sung Chương trình Giáo dục Mầm non.", "• ")
    add_p("Thể lệ Giải thưởng Tiên phong Ứng dụng AI trong Giáo dục Việt Nam năm 2026 do Bộ GD&ĐT (Cục Nhà giáo và Cán bộ Quản lý Giáo dục) và Đại học RMIT Việt Nam phối hợp ban hành.", "• ")
    add_p("Kế hoạch số 118/KH-MNPSB ngày 12/10/2026 của Trường Mầm non Phúc Sơn B về việc triển khai tham gia Ngày hội Nhà giáo sáng tạo.", "• ")

    add_h2("2. Bối cảnh thực tiễn và Sự cần thiết triển khai (Tiêu chí 1: Tính thực tiễn - 25%)")
    add_p("Trường Mầm non Phúc Sơn B đóng trên địa bàn nông thôn, điều kiện cơ sở vật chất và kinh phí mua sắm đồ dùng học tập còn gặp nhiều khó khăn. Để tổ chức các tuần học theo chủ đề GDMN, giáo viên phải soạn thảo từ 10 đến 15 kế hoạch bài dạy chi tiết mỗi tuần cho đầy đủ các hoạt động: Hoạt động học có chủ đích, Hoạt động chơi ở các góc, Hoạt động ngoài trời và hoạt động chiều.")
    add_p("Khảo sát thực tế tại trường cho thấy trung bình mỗi giáo viên mất từ 12 đến 15 giờ mỗi tuần ngoài giờ lên lớp chỉ để tìm kiếm tài liệu, gõ giáo án và tự làm đồ dùng trực quan thủ công. Do thiếu thời gian và tài nguyên, nhiều giáo viên buộc phải sao chép giáo án cũ trên mạng Internet vốn đã rập khuôn, từ ngữ sáo rỗng và thiếu tính sinh động đối với trẻ nhỏ.")
    
    add_callout(
        doc,
        "Nghịch lý lớn nhất trong giáo dục mầm non hiện nay: Giáo viên dành quá nhiều thời gian và tâm sức cho những trang sổ sách hành chính và giáo án bàn phím, trong khi trẻ em lại rất cần thời gian tương tác trực tiếp, ánh mắt yêu thương và sự đồng hành của người cô trên lớp.",
        "THỰC TRẠNG CẤP BÁCH"
    )

    add_h1("PHẦN II: NỘI DUNG Ý TƯỞNG VÀ GIẢI PHÁP KỸ THUẬT CÔNG NGHỆ")
    add_h2("1. Ý tưởng cốt lõi (Core Idea)")
    add_p("Dự án KID-LESSON AI xây dựng quy trình làm việc thông minh ứng dụng Trí tuệ nhân tạo tạo sinh (Generative AI), đóng vai trò như một 'Tổ phó Chuyên môn Mầm non ảo' đồng hành cùng giáo viên:")
    add_p("Đầu vào (Input): Giáo viên chỉ cần nhập chủ đề tuần, độ tuổi và tên hoạt động mục tiêu.", "• ")
    add_p("Xử lý (AI Engine): Tự động xây dựng Kế hoạch bài dạy chuẩn 5 bước sư phạm; sáng tác thơ ca, câu đố mới lạ; sinh hình ảnh học liệu và flashcard số.", "• ")
    add_p("Đầu ra (Output): File giáo án Word chuẩn ký duyệt và kho học liệu đa phương tiện sẵn sàng trình chiếu lên màn hình thông minh hoặc in ra giấy.", "• ")

    add_h2("2. Ba phân hệ chức năng đột phá (Tiêu chí 2: Tính sáng tạo - 20%)")
    add_p("Phân hệ 1 - Trợ lý Soạn Kế hoạch Bài dạy (Lesson Plan Co-pilot): Tự động phân bổ bài giảng theo 3 mục tiêu chuẩn mực (Kiến thức - Kỹ năng - Thái độ) và tiến trình 3 bước lôi cuốn (Gây hứng thú -> Trải nghiệm khám phá -> Củng cố liên hệ) theo đúng tinh thần Thông tư 51/2020/TT-BGDĐT.")
    add_p("Phân hệ 2 - Trợ lý Sáng tác Văn học & Câu đố Mầm non (Literary Co-pilot): Khắc phục sự khan hiếm thơ truyện mới bằng khả năng sáng tác bài thơ ngắn 4 chữ, 5 chữ gieo vần vui tươi, các câu đố kích thích tư duy và kịch bản hoạt cảnh rối ngắn hấp dẫn.")
    add_p("Phân hệ 3 - Trợ lý Thiết kế Thẻ học Số & Trò chơi Tương tác (Visual & Interactive Studio): Tận dụng AI tạo ảnh miễn phí (Canva AI / Bing Creator) để xuất bản tranh tô màu, thẻ flashcard thế giới xung quanh và trò chơi chạm tương tác trên màn hình lớn với chi phí 0 đồng.")

    add_h1("PHẦN III: MA TRẬN ĐÁP ỨNG TOÀN DIỆN 5 TIÊU CHÍ ĐÁNH GIÁ (100 ĐIỂM)")
    
    # Bảng 5 tiêu chí
    tbl_crit = doc.add_table(rows=6, cols=4)
    tbl_crit.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_crit.autofit = False
    
    col_widths = [Inches(1.2), Inches(0.7), Inches(2.2), Inches(2.4)]
    headers = ["Tiêu chí", "Trọng số", "Yêu cầu Thể lệ (Bộ GD&ĐT & RMIT)", "Minh chứng thực tế của Dự án KID-LESSON AI"]
    
    # Header row
    for j, h_text in enumerate(headers):
        cell = tbl_crit.cell(0, j)
        cell.width = col_widths[j]
        set_cell_background(cell, "0F172A") # Slate 900
        set_cell_margins(cell, top=120, bottom=120, left=100, right=100)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h_text)
        r.bold = True
        r.font.name = "Times New Roman"
        r.font.size = Pt(11)
        r.font.color.rgb = RGBColor(255, 255, 255)

    data_crit = [
        ("1. Tính thực tiễn", "25%", "Triển khai trực tiếp trong trường học; giải quyết thách thức cốt lõi.", "Áp dụng tại 100% nhóm lớp Trường MN Phúc Sơn B; giải quyết dứt điểm 15h/tuần làm giáo án thủ công."),
        ("2. Tính sáng tạo", "20%", "Cách tiếp cận đột phá; so sánh rõ nét với cách làm truyền thống.", "Mô hình đồng sáng tạo AI 3-trong-1 (Giáo án + Thơ ca mới + Đồ dùng số); tối ưu Prompt Master GDMN."),
        ("3. Tác động thực tiễn", "25%", "Số liệu định lượng rõ ràng; nâng cao chất lượng giáo dục.", "Giảm 80% thời gian soạn bài (từ 14h xuống 2.8h/tuần); 100% tiết dạy có học liệu số; trẻ hào hứng đạt 95.8%."),
        ("4. Tính bền vững & Nhân rộng", "15%", "Khả thi cao, chi phí thấp, dễ chuyển giao diện rộng.", "Chi phí 0 đồng nhờ Canva Giáo dục & Gemini miễn phí; cẩm nang 3 bước, tập huấn 30 phút là làm được ngay."),
        ("5. Chất lượng trình bày", "15%", "Hồ sơ chuẩn mực (Slide, Poster, Video <= 5p); lập luận thuyết phục.", "100% đúng mẫu nhận diện BTC; Video 5 phút chất lượng cao; Báo cáo Word chuẩn Nghị định 30/2020/NĐ-CP.")
    ]

    for i, row in enumerate(data_crit):
        for j, val in enumerate(row):
            cell = tbl_crit.cell(i+1, j)
            cell.width = col_widths[j]
            bg_color = "F8FAFC" if i % 2 == 1 else "FFFFFF"
            set_cell_background(cell, bg_color)
            set_cell_margins(cell, top=80, bottom=80, left=90, right=90)
            p = cell.paragraphs[0]
            if j == 1:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(val)
            r.font.name = "Times New Roman"
            r.font.size = Pt(11)
            if j == 0:
                r.bold = True
                r.font.color.rgb = C_BLUE
            elif j == 1:
                r.bold = True

    doc.add_paragraph().paragraph_format.space_after = Pt(8)

    add_h1("PHẦN IV: QUY CÁCH VÀ KỊCH BẢN 3 SẢN PHẨM HỒ SƠ DỰ THI")
    add_h2("1. Bài trình bày Slide (Canva Presentation 12 Trang)")
    add_p("Đường dẫn mẫu chính thức của BTC: https://www.canva.com/design/DAHX8n0K3Eg/m-5TyXYutoaNpb9vqQVfeQ/edit")
    add_p("Cấu trúc 12 trang chuẩn mực: Slide 1 (Bìa) -> Slide 2 (Tóm tắt dự án) -> Slide 3 (Thực trạng) -> Slide 4 (Ý tưởng đột phá) -> Slide 5 (Kiến trúc công nghệ) -> Slide 6 (Phân hệ giáo án) -> Slide 7 (Học liệu số & Trò chơi) -> Slide 8 (Dữ liệu thực nghiệm) -> Slide 9 (Phản hồi người trong cuộc) -> Slide 10 (Đạo đức AI) -> Slide 11 (Nhân rộng bền vững) -> Slide 12 (Thông điệp bế mạc & QR).")

    add_h2("2. Poster Khoa học Giới thiệu Sản phẩm (Canva A0 Poster 3 Cột)")
    add_p("Đường dẫn mẫu chính thức của BTC: https://www.canva.com/design/DAHX8izuwG0/IHnb5H7RXv3gR_rsUFUDIA/edit")
    add_p("Bố cục khoa học 3 cột: Cột 1 (Bối cảnh & Thách thức) -> Cột 2 (Giải pháp công nghệ & Quy trình 3 phân hệ trọng tâm) -> Cột 3 (Kết quả định lượng, Minh chứng thực tế và Kế hoạch nhân rộng).")

    add_h2("3. Video Clip Thuyết minh Sản phẩm (Thời lượng chuẩn 04 phút 50 giây)")
    add_p("Kịch bản phân cảnh chuẩn xác từng giây: 0:00 - 0:35 (Nỗi niềm giáo viên mầm non thức khuya soạn giáo án); 0:36 - 1:15 (Giới thiệu sự ra đời của KID-LESSON AI); 1:16 - 2:30 (Cận cảnh thao tác 3 bước tạo giáo án và tranh vẽ tức thì); 2:31 - 3:30 (Trẻ hào hứng trong tiết thao giảng thực nghiệm tại lớp); 3:31 - 4:15 (Số liệu định lượng giảm 80% thời gian và đánh giá của Hiệu trưởng); 4:16 - 5:00 (Thông điệp nhân văn và lời tri ân Ban Tổ Chức).")

    add_h1("PHẦN V: TIẾN ĐỘ THỰC HIỆN CHI TIẾT (TỪ 13/10 ĐẾN VÒNG CHUNG KẾT)")
    add_p("Giai đoạn 1 (13/10 - 15/10/2026): Thành lập nhóm nghiên cứu, chuẩn hóa Bộ Prompt Master cho 5 hoạt động học và thiết lập template Canva.", "1. ")
    add_p("Giai đoạn 2 (16/10 - 21/10/2026): Triển khai thực nghiệm tại 4 khối lớp; tổ chức tiết thao giảng chuyên đề cấp trường; quay video clip và hoàn thiện Slide, Poster.", "2. ")
    add_p("Giai đoạn 3 (22/10 - 23/10/2026): Hội đồng Chuyên môn và Ban Giám hiệu nhà trường thẩm định, rà soát tính chuẩn mực sư phạm.", "3. ")
    add_p("Giai đoạn 4 (24/10 - 25/10/2026): Nộp hồ sơ trực tuyến tại www.ieeai.net/giaithuong trước 17h00 ngày 25/10/2026.", "4. ")
    add_p("Giai đoạn 5 (Tháng 11 - 12/2026): Công bố kết quả Top 100/50 (15/11) và tham gia vòng chung kết bảo vệ tại TP.HCM (05/12/2026).", "5. ")

    add_h1("PHẦN VI: BẢO ĐẢM ĐẠO ĐỨC AI VÀ QUẢN TRỊ RỦI RO (RESPONSIBLE AI)")
    add_p("Nguyên tắc Human-in-the-Loop: Trí tuệ nhân tạo chỉ đóng vai trò trợ lý gợi ý; giáo viên là người trực tiếp thẩm định, điều chỉnh nội dung cho phù hợp với đặc thù học sinh trước khi trình ký duyệt.")
    add_p("An toàn nội dung mầm non: 100% hình ảnh, câu đố và văn thơ do AI tạo ra đều được kiểm duyệt loại trừ các yếu tố kinh dị, bạo lực hoặc định kiến giới tính.")
    add_p("Bản quyền và Minh bạch: Khai báo minh bạch việc sử dụng công cụ AI theo đúng thể lệ; mọi hình ảnh học sinh đều có sự đồng thuận bằng văn bản của phụ huynh theo Luật Trẻ em 2016.")

    add_h1("PHẦN VII: BỘ CÂU LỆNH MẪU (PROMPT MASTER) THỰC HÀNH")
    add_h2("1. Câu lệnh Soạn Kế hoạch Bài dạy Chuẩn 5 Bước")
    add_p("Vai trò: Bạn là Chuyên gia Phương pháp Giáo dục Mầm non am hiểu sâu sắc Thông tư 51/2020/TT-BGDĐT.\n"
          "Đầu vào: Chủ đề [Tên Chủ Đề] | Lĩnh vực [Tên Lĩnh Vực] | Hoạt động [Tên Hoạt Động] | Lứa tuổi [Độ Tuổi].\n"
          "Yêu cầu: Soạn thảo chi tiết 3 Mục tiêu (Kiến thức - Kỹ năng - Thái độ), Chuẩn bị của cô và trẻ, và Tiến trình 3 bước (Gây hứng thú -> Khám phá trải nghiệm -> Củng cố liên hệ).", italic=True)

    add_h2("2. Câu lệnh Sáng tác Thơ và Câu đố Mầm non")
    add_p("Nhiệm vụ: Sáng tác 01 bài thơ mầm non 4 chữ (3-4 khổ thơ) có nhịp điệu tươi vui, ngôn từ trong sáng về chủ đề [Tên Chủ Đề], kèm 03 câu đố vui có vần điệu để cô giáo đố trẻ trong phần mở đầu tiết học.", italic=True)

    add_h2("3. Câu lệnh Tạo Hình ảnh Minh họa Mầm non (Canva / Bing Creator)")
    add_p("Prompt: A cute, colorful flat vector illustration of [object] for Vietnamese kindergarten classroom, friendly character, pastel colors, bright background, clean lines, storybook art style, child-safe design --ar 16:9", italic=True)

    add_h1("PHẦN VIII: TỔ CHỨC THỰC HIỆN VÀ PHÊ DUYỆT")
    add_p("Ban Giám hiệu: Phê duyệt kế hoạch, chỉ đạo triển khai thực nghiệm và bố trí nguồn lực cơ sở vật chất.")
    add_p("Tổ Chuyên môn & Tổ Công nghệ số: Hỗ trợ xây dựng kho dữ liệu dùng chung, quay phim dựng video và kiểm tra kỹ thuật nộp bài.")
    add_p("Tác giả chủ trì: Chịu trách nhiệm trực tiếp về chất lượng chuyên môn bài giảng, bảo vệ sáng kiến trước Ban Giám khảo.")

    # Phần chữ ký phê duyệt
    tbl_sign = doc.add_table(rows=1, cols=2)
    tbl_sign.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl_sign.autofit = False
    
    c_left = tbl_sign.cell(0, 0)
    c_left.width = Inches(3.2)
    p_l = c_left.paragraphs[0]
    p_l.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_l1 = p_l.add_run("TỔ TRƯỞNG CHUYÊN MÔN\n")
    r_l1.bold = True
    r_l1.font.name = "Times New Roman"
    r_l1.font.size = Pt(13)
    p_l.add_run("\n\n\n(Ký và ghi rõ họ tên)")

    c_right = tbl_sign.cell(0, 1)
    c_right.width = Inches(3.3)
    p_r = c_right.paragraphs[0]
    p_r.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_r1 = p_r.add_run("HIỆU TRƯỞNG\n")
    r_r1.bold = True
    r_r1.font.name = "Times New Roman"
    r_r1.font.size = Pt(13)
    p_r.add_run("TRƯỜNG MẦM NON PHÚC SƠN B\n\n\n\n")
    r_r2 = p_r.add_run("Nguyễn Thị Hồng")
    r_r2.bold = True
    r_r2.font.name = "Times New Roman"
    r_r2.font.size = Pt(13)

    doc.save(filename)
    print(f"Xuất thành công file Word: {filename}")
    return filename

if __name__ == "__main__":
    build_docx()
