# QUY TRÌNH XUẤT DOM THÀNH ẢNH PNG ĐỘ NÉT CAO (CANVA INFOGRAPHIC PIPELINE)

Để biến một thẻ HTML/CSS động thành ảnh PNG sắc nét gửi qua Zalo/Facebook cho phụ huynh, ta sử dụng thư viện `html2canvas`.

---

## 1. THIẾT LẬP HTML2CANVAS CHUẨN

Khi xuất ảnh trên màn hình di động hoặc màn hình thường, ảnh xuất ra thường bị mờ (nhòe chữ) hoặc lỗi font tiếng Việt nếu không thiết lập đúng các thông số:

```javascript
async function exportCardToPNG(cardElementId, fileName = "Nhat_Ky_Cua_Be.png") {
  const cardEl = document.getElementById(cardElementId);
  if (!cardEl) throw new Error("Không tìm thấy thẻ DOM cần xuất ảnh");

  // 1. Cấu hình html2canvas tối ưu chất lượng cao
  const options = {
    scale: 2.5, // Tăng scale lên 2.5x để nét chuẩn Retina/In ấn
    useCORS: true, // Cho phép tải avatar từ CDN (DiceBear, Cloudinary)
    allowTaint: false,
    backgroundColor: null, // Giữ gradient trong suốt hoặc nền bo góc
    logging: false,
    onclone: (clonedDoc) => {
      // Đảm bảo phần tử trong bản sao không bị co kéo do màn hình di động
      const clonedCard = clonedDoc.getElementById(cardElementId);
      if (clonedCard) {
        clonedCard.style.maxWidth = "650px";
        clonedCard.style.width = "650px";
        clonedCard.style.boxShadow = "none"; // Tránh viền đổ bóng bị cắt góc
      }
    }
  };

  try {
    const canvas = await html2canvas(cardEl, options);
    
    // 2. Chuyển canvas thành DataURL dạng PNG
    const imageURL = canvas.toDataURL("image/png", 1.0);

    // 3. Tự động kích hoạt tải xuống file
    const downloadLink = document.createElement("a");
    downloadLink.href = imageURL;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    return imageURL;
  } catch (error) {
    console.error("Lỗi khi kết xuất ảnh:", error);
    throw error;
  }
}
```

---

## 2. XỬ LÝ FONT TIẾNG VIỆT VÀ CÁC THƯ VIỆN ĐỒ HỌA BÊN NGOÀI

1. **Font chữ:** Khuyến nghị dùng hệ font hệ thống hoặc Google Font hỗ trợ tiếng Việt trọn vẹn (Be Vietnam Pro, Quicksand, Nunito, Inter).
2. **Avatar CORS:** Khi sử dụng ảnh đại diện từ CDN (như `api.dicebear.com`), CDN đó bắt buộc phải có header `Access-Control-Allow-Origin: *`.
3. **Cắt góc bo viền (Border Radius Clipping):** Thẻ mẹ phải có `overflow: hidden` và không dùng `filter: drop-shadow()` trực tiếp trên thẻ mẹ được chụp, vì `html2canvas` có thể làm lem góc bo.
