/**
 * KID-CONNECT AI - Ứng dụng Quản trị & Điều phối chính
 * Tác giả: Nhóm Dự Án KID-CONNECT AI - Trường Mầm non Phúc Sơn B
 */

document.addEventListener("DOMContentLoaded", () => {
  // Trạng thái ứng dụng (State)
  const state = {
    classes: JSON.parse(localStorage.getItem("kid_classes")) || DEFAULT_CLASSES,
    students: JSON.parse(localStorage.getItem("kid_students")) || DEFAULT_STUDENTS,
    currentClassId: "mg_lon_a1",
    currentStudentId: "psb_01",
    isPrivacyMasked: true, // Mặc định BẬT chế độ đạo đức AI ẩn danh dữ liệu trẻ
    currentTab: "tab-ai-assistant",
    lastAssessment: null,
    isListening: false
  };

  // Khởi tạo giao diện
  initNavigation();
  initClassSelector();
  initStudentSelector();
  initPresets();
  initVoiceFeature();
  initAIAnalysis();
  initCardControls();
  initSettingsModal();
  initResponsibleAIToggle();
  initClassModal();
  initStudentModal();
  initMobileQRModal();
  initAutoResizeFields();
  checkInAppBrowser();
  renderImpactDashboard();

  // Load học sinh đầu tiên
  selectStudent(state.currentStudentId);

  // ===================== NAVIGATION TABS =====================
  function initNavigation() {
    const navButtons = document.querySelectorAll(".nav-tab-btn");
    navButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTabId = btn.getAttribute("data-tab");
        switchTab(targetTabId);
      });
    });
  }

  function switchTab(tabId) {
    state.currentTab = tabId;
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
    });

    document.querySelectorAll(".tab-content-panel").forEach(panel => {
      panel.classList.toggle("active", panel.id === tabId);
    });

    // Nếu chuyển sang tab Card Preview, tự động render thẻ
    if (tabId === "tab-card-preview") {
      updateCardPreview();
    }
  }

  // ===================== CLASS & STUDENT SELECTOR =====================
  function initClassSelector() {
    const classSelect = document.getElementById("select-class");
    if (!classSelect) return;

    classSelect.innerHTML = "";
    state.classes.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = `${c.name} (${c.teacher})`;
      if (c.id === state.currentClassId) opt.selected = true;
      classSelect.appendChild(opt);
    });

    // Thêm tùy chọn tạo lớp mới nhanh ở cuối danh sách chọn
    const addOpt = document.createElement("option");
    addOpt.value = "__ADD_NEW_CLASS__";
    addOpt.textContent = "➕ [Tạo thêm lớp học mới...]";
    addOpt.style.fontWeight = "bold";
    addOpt.style.color = "#4f46e5";
    classSelect.appendChild(addOpt);

    classSelect.onchange = (e) => {
      if (e.target.value === "__ADD_NEW_CLASS__") {
        classSelect.value = state.currentClassId;
        openClassModal();
        return;
      }
      state.currentClassId = e.target.value;
      initStudentSelector();
      // Chọn học sinh đầu tiên của lớp mới hoặc xử lý khi lớp chưa có bé nào
      const firstStudent = state.students.find(s => s.classId === state.currentClassId);
      if (firstStudent) {
        selectStudent(firstStudent.id);
      } else {
        selectStudent(null);
      }
      renderImpactDashboard();
    };
  }

  function initStudentSelector() {
    const studentListEl = document.getElementById("student-cards-grid");
    if (!studentListEl) return;

    studentListEl.innerHTML = "";
    const filteredStudents = state.students.filter(s => s.classId === state.currentClassId);

    // Hiển thị thông báo thân thiện khi lớp mới tạo chưa có học sinh
    if (filteredStudents.length === 0) {
      const emptyCard = document.createElement("div");
      emptyCard.className = "student-list-empty-state";
      emptyCard.innerHTML = `
        <div style="text-align: center; padding: 16px 12px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: var(--radius-md); color: #64748b; font-size: 0.82rem; margin-bottom: 8px;">
          <div style="font-size: 1.6rem; margin-bottom: 4px;">🎒🧸</div>
          <strong style="color: #334155; font-size: 0.88rem; display: block;">Lớp chưa có học sinh</strong>
          <span style="font-size: 0.78rem;">Cô bấm nút bên dưới để thêm các bé vào lớp nhé!</span>
        </div>
      `;
      studentListEl.appendChild(emptyCard);
    } else {
      filteredStudents.forEach(st => {
        const card = document.createElement("div");
        card.className = `student-pill-item ${st.id === state.currentStudentId ? 'selected' : ''}`;
        card.setAttribute("data-id", st.id);

        const shortName = st.nickName || st.name;
        const codeText = state.isPrivacyMasked ? st.code : '';
        const avatarUrl = state.isPrivacyMasked
          ? `https://api.dicebear.com/7.x/bottts/svg?seed=${st.code}&backgroundColor=b6e3f4`
          : (st.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${st.name}&backgroundColor=ffd5dc`);

        const hasAssessed = !!st.latestAssessment;

        card.innerHTML = `
          <div class="pill-avatar-wrap">
            <img src="${avatarUrl}" alt="${shortName}" class="pill-avatar" />
            ${hasAssessed ? '<span class="pill-badge-done">✓</span>' : ''}
          </div>
          <div class="pill-info">
            <span class="pill-name-short">${shortName}</span>
            <span class="pill-name-code">${codeText}</span>
          </div>
        `;

        card.addEventListener("click", () => {
          selectStudent(st.id);
        });

        studentListEl.appendChild(card);
      });
    }

    // Thêm nút Thêm Bé trực tiếp vào cuối băng chuyền
    const addCard = document.createElement("div");
    addCard.className = "student-pill-item add-kid-pill-item";
    addCard.innerHTML = `
      <div class="pill-avatar-wrap add-kid-avatar-wrap">
        <span class="add-kid-plus">➕</span>
      </div>
      <div class="pill-info">
        <span class="pill-name-short" style="color: var(--primary); font-weight: 800;">Thêm Bé</span>
        <span class="pill-name-code">Mới</span>
      </div>
    `;
    addCard.addEventListener("click", () => {
      document.getElementById("student-modal")?.classList.add("open");
    });
    studentListEl.appendChild(addCard);
  }

  function selectStudent(studentId) {
    state.currentStudentId = studentId;
    const student = state.students.find(s => s.id === studentId);

    // Cập nhật thông tin bé trên header form
    const currentNameEl = document.getElementById("current-student-name");
    const currentCodeEl = document.getElementById("current-student-code");
    const currentAvatarEl = document.getElementById("current-student-avatar");
    const currentNotesEl = document.getElementById("current-student-notes");

    if (!student) {
      document.querySelectorAll(".student-pill-item").forEach(item => {
        item.classList.remove("selected");
      });
      const curClass = state.classes.find(c => c.id === state.currentClassId);
      const cName = curClass ? curClass.name : "Lớp Mới";
      const cAge = curClass ? curClass.ageGroup : "";
      
      if (currentNameEl) currentNameEl.textContent = "Chưa có học sinh";
      if (currentCodeEl) currentCodeEl.textContent = `Lớp: ${cName} (${cAge}) | Hãy thêm bé vào lớp`;
      if (currentAvatarEl) currentAvatarEl.src = "https://api.dicebear.com/7.x/bottts/svg?seed=KidConnectNew&backgroundColor=e0e7ff";
      if (currentNotesEl) currentNotesEl.textContent = "Lớp học chưa có học sinh. Cô giáo vui lòng nhấn '➕ Thêm Bé Mới Vào Lớp' ở cột bên trái để bắt đầu thêm các bé vào danh sách lớp nhé!";

      clearAssessmentForm();
      state.lastAssessment = null;
      return;
    }

    // Highlight item được chọn
    document.querySelectorAll(".student-pill-item").forEach(item => {
      item.classList.toggle("selected", item.getAttribute("data-id") === studentId);
    });

    const displayName = state.isPrivacyMasked ? `${student.nickName} (${student.code})` : student.name;
    const avatarUrl = state.isPrivacyMasked
      ? `https://api.dicebear.com/7.x/bottts/svg?seed=${student.code}&backgroundColor=b6e3f4`
      : (student.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${student.name}&backgroundColor=ffd5dc`);

    if (currentNameEl) currentNameEl.textContent = displayName;
    if (currentCodeEl) currentCodeEl.textContent = `Mã bé: ${student.code} | Độ tuổi: ${getClassAge(student.classId)}`;
    if (currentAvatarEl) currentAvatarEl.src = avatarUrl;
    if (currentNotesEl) currentNotesEl.textContent = student.notes || "Chưa có ghi chú đặc biệt.";

    // Nếu bé đã có đánh giá sẵn, nạp vào form
    if (student.latestAssessment) {
      loadAssessmentToForm(student.latestAssessment);
      state.lastAssessment = student.latestAssessment;
    } else {
      clearAssessmentForm();
      state.lastAssessment = null;
    }
  }

  function getClassAge(classId) {
    const c = state.classes.find(cls => cls.id === classId);
    return c ? c.ageGroup : "5-6 tuổi";
  }

  function getClassName(classId) {
    const c = state.classes.find(cls => cls.id === classId);
    return c ? c.name : "Mầm non";
  }

  // ===================== PRESET SAMPLE OBSERVATIONS =====================
  function initPresets() {
    const presetContainer = document.getElementById("preset-chips-wrap");
    if (!presetContainer) return;

    presetContainer.innerHTML = "";
    SAMPLE_PRESETS.forEach(preset => {
      const chip = document.createElement("button");
      chip.className = "preset-chip-btn";
      chip.type = "button";
      chip.innerHTML = preset.title;
      chip.addEventListener("click", () => {
        const inputEl = document.getElementById("raw-observation-input");
        if (inputEl) {
          inputEl.value = preset.text;
          inputEl.focus();
          // Hiệu ứng highlight nhẹ
          inputEl.classList.add("input-pulsing");
          setTimeout(() => inputEl.classList.remove("input-pulsing"), 1000);
        }
      });
      presetContainer.appendChild(chip);
    });
  }

  // ===================== VOICE RECOGNITION =====================
  function initVoiceFeature() {
    const micBtn = document.getElementById("btn-voice-mic");
    const micStatus = document.getElementById("mic-status-text");
    const inputEl = document.getElementById("raw-observation-input");
    const waveEl = document.getElementById("voice-wave-animation");

    if (!micBtn) return;

    let baseObservationText = "";

    micBtn.addEventListener("click", () => {
      if (!window.kidConnectSpeech || !window.kidConnectSpeech.isSupported()) {
        alert("Trình duyệt không hỗ trợ nhận diện giọng nói trực tiếp qua web.\n\n👉 Thầy/cô chỉ cần chạm vào ô ghi chú rồi bấm nút Micro 🎙️ ngay trên bàn phím điện thoại để nói cực tiện nhé!");
        return;
      }

      if (!state.isListening && inputEl) {
        baseObservationText = inputEl.value.trim();
      }

      window.kidConnectSpeech.toggleListening(
        (transcript, isFinal) => {
          if (inputEl) {
            inputEl.value = baseObservationText 
              ? (baseObservationText + " " + transcript) 
              : transcript;
          }
        },
        (isListening) => {
          state.isListening = isListening;
          if (isListening) {
            micBtn.classList.add("listening");
            if (micStatus) micStatus.textContent = "🎙️ Đang lắng nghe cô nói... (Bấm lại để dừng)";
            if (waveEl) waveEl.style.display = "flex";
          } else {
            micBtn.classList.remove("listening");
            if (micStatus) micStatus.textContent = "Bấm để ghi chú bằng giọng nói";
            if (waveEl) waveEl.style.display = "none";
          }
        },
        (error) => {
          // 'aborted' và 'no-speech' là bình thường khi người dùng dừng nói hoặc đổi ứng dụng
          if (error === "aborted" || error === "no-speech") {
            console.log("Speech recognition stopped/aborted cleanly:", error);
            return;
          }

          if (error === "service-not-allowed" || error === "not-allowed") {
            const isZalo = /zalo/i.test(navigator.userAgent);
            const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
            let msg = "Microphone đang bị chặn hoặc chưa được cấp quyền.";
            if (isZalo || isIOS) {
              msg = "⚠️ Trình duyệt chưa được cấp quyền mở Micro.\n\n👉 Cách tiện nhất: Chạm vào ô ghi chú ➔ Bấm nút Micro 🎙️ ngay trên bàn phím điện thoại để nói tiếng Việt cực chuẩn!\n\n👉 Hoặc vào Cài đặt của điện thoại ➔ Cho phép Safari truy cập Micro.";
            } else {
              msg = "Vui lòng cho phép quyền truy cập Micro trên trình duyệt (hoặc dùng nút Micro trên bàn phím điện thoại nhé)!";
            }
            alert(msg);
          } else if (error === "network") {
            console.warn("Speech network error:", error);
          } else {
            console.warn("Lỗi micro không nghiêm trọng:", error);
          }
        }
      );
    });

    // Nút Text-to-Speech đọc kết quả
    const btnSpeakMsg = document.getElementById("btn-speak-message");
    if (btnSpeakMsg) {
      btnSpeakMsg.addEventListener("click", () => {
        const msg = document.getElementById("res-parent-message")?.value;
        const tip = document.getElementById("res-home-tip")?.value;
        if (!msg && !tip) {
          alert("Chưa có nội dung để đọc!");
          return;
        }
        window.kidConnectSpeech.speak(`Lời cô nhắn nhủ: ${msg}. Bí kíp cùng con tại nhà: ${tip}`);
      });
    }
  }

  // ===================== AI ANALYSIS =====================
  function initAIAnalysis() {
    const btnAnalyze = document.getElementById("btn-run-ai");
    const inputEl = document.getElementById("raw-observation-input");
    const loadingEl = document.getElementById("ai-processing-status");
    const resultPanel = document.getElementById("ai-result-panel");

    if (!btnAnalyze) return;

    btnAnalyze.addEventListener("click", async () => {
      const text = inputEl ? inputEl.value.trim() : "";
      if (!text) {
        alert("Thầy/cô ơi, vui lòng nói hoặc nhập vài câu nhận xét về bé trước nhé!");
        inputEl?.focus();
        return;
      }

      const student = state.students.find(s => s.id === state.currentStudentId);
      const ageGroup = getClassAge(state.currentClassId);

      // Hiển thị trạng thái xử lý
      btnAnalyze.disabled = true;
      if (loadingEl) loadingEl.style.display = "flex";
      if (resultPanel) resultPanel.classList.add("analyzing-blur");

      try {
        const assessment = await window.kidConnectAI.analyzeObservation(text, student, ageGroup);
        assessment.input = text;
        state.lastAssessment = assessment;

        // Lưu vào thông tin học sinh
        if (student) {
          student.latestAssessment = assessment;
          saveStudents();
          initStudentSelector(); // Cập nhật lại huy hiệu xong
        }

        loadAssessmentToForm(assessment);

        // Hiệu ứng xong
        setTimeout(() => {
          if (resultPanel) {
            resultPanel.classList.remove("analyzing-blur");
            resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);

      } catch (err) {
        alert("Lỗi phân tích: " + err.message);
      } finally {
        btnAnalyze.disabled = false;
        if (loadingEl) loadingEl.style.display = "none";
      }
    });

    // Nút "Cập nhật Thẻ & Xem Trực Quan"
    const btnGoCard = document.getElementById("btn-view-card");
    if (btnGoCard) {
      btnGoCard.addEventListener("click", () => {
        saveEditedAssessment();
        switchTab("tab-card-preview");
      });
    }
  }

  function loadAssessmentToForm(data) {
    const theChat = document.getElementById("res-the-chat");
    const nhanThuc = document.getElementById("res-nhan-thuc");
    const ngonNgu = document.getElementById("res-ngon-ngu");
    const tinhCamXH = document.getElementById("res-tinh-cam");
    const thamMy = document.getElementById("res-tham-my");
    const parentMsg = document.getElementById("res-parent-message");
    const homeTip = document.getElementById("res-home-tip");
    const engineBadge = document.getElementById("ai-engine-used-badge");

    if (theChat) theChat.value = data.theChat || "";
    if (nhanThuc) nhanThuc.value = data.nhanThuc || "";
    if (ngonNgu) ngonNgu.value = data.ngonNgu || "";
    if (tinhCamXH) tinhCamXH.value = data.tinhCamXH || "";
    if (thamMy) thamMy.value = data.thamMy || "";
    if (parentMsg) parentMsg.value = data.parentMessage || "";
    if (homeTip) homeTip.value = data.homeTip || "";

    if (engineBadge) {
      engineBadge.textContent = `⚡ Được tạo bởi: ${data.engine || 'KID-CONNECT AI'}`;
    }

    // Set ratings
    if (data.ratings) {
      setRatingSelect("rating-the-chat", data.ratings.theChat || 5);
      setRatingSelect("rating-nhan-thuc", data.ratings.nhanThuc || 5);
      setRatingSelect("rating-ngon-ngu", data.ratings.ngonNgu || 5);
      setRatingSelect("rating-tinh-cam", data.ratings.tinhCamXH || 5);
      setRatingSelect("rating-tham-my", data.ratings.thamMy || 5);
    }

    // Tự động điều chỉnh chiều cao vừa khít nội dung, không xuất hiện thanh cuộn
    setTimeout(autoResizeAssessmentFields, 20);
  }

  function autoResizeAssessmentFields() {
    const textareas = document.querySelectorAll(".domain-textarea, .callout-textarea");
    textareas.forEach(el => {
      el.style.height = "auto";
      el.style.height = (el.scrollHeight || 48) + "px";
    });
  }

  function initAutoResizeFields() {
    const textareas = document.querySelectorAll(".domain-textarea, .callout-textarea");
    textareas.forEach(el => {
      el.addEventListener("input", () => {
        el.style.height = "auto";
        el.style.height = (el.scrollHeight || 48) + "px";
      });
    });
  }

  function setRatingSelect(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = String(val);
  }

  function clearAssessmentForm() {
    const ids = ["res-the-chat", "res-nhan-thuc", "res-ngon-ngu", "res-tinh-cam", "res-tham-my", "res-parent-message", "res-home-tip"];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.value = "";
        el.style.height = "auto";
      }
    });
    const inputEl = document.getElementById("raw-observation-input");
    if (inputEl) inputEl.value = "";
    const engineBadge = document.getElementById("ai-engine-used-badge");
    if (engineBadge) engineBadge.textContent = "⚡ Sẵn sàng phân tích";
  }

  function saveEditedAssessment() {
    if (!state.lastAssessment) {
      state.lastAssessment = {
        date: new Date().toISOString().split("T")[0],
        week: "Tuần 7 - Tháng 10/2026"
      };
    }

    state.lastAssessment.theChat = document.getElementById("res-the-chat")?.value || "";
    state.lastAssessment.nhanThuc = document.getElementById("res-nhan-thuc")?.value || "";
    state.lastAssessment.ngonNgu = document.getElementById("res-ngon-ngu")?.value || "";
    state.lastAssessment.tinhCamXH = document.getElementById("res-tinh-cam")?.value || "";
    state.lastAssessment.thamMy = document.getElementById("res-tham-my")?.value || "";
    state.lastAssessment.parentMessage = document.getElementById("res-parent-message")?.value || "";
    state.lastAssessment.homeTip = document.getElementById("res-home-tip")?.value || "";

    state.lastAssessment.ratings = {
      theChat: parseInt(document.getElementById("rating-the-chat")?.value || "5"),
      nhanThuc: parseInt(document.getElementById("rating-nhan-thuc")?.value || "5"),
      ngonNgu: parseInt(document.getElementById("rating-ngon-ngu")?.value || "5"),
      tinhCamXH: parseInt(document.getElementById("rating-tinh-cam")?.value || "5"),
      thamMy: parseInt(document.getElementById("rating-tham-my")?.value || "5")
    };

    const student = state.students.find(s => s.id === state.currentStudentId);
    if (student) {
      student.latestAssessment = state.lastAssessment;
      saveStudents();
    }
  }

  // ===================== CARD GENERATOR TAB =====================
  function initCardControls() {
    // Theme buttons
    const themeButtons = document.querySelectorAll(".theme-selector-btn");
    themeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        themeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const theme = btn.getAttribute("data-theme");
        window.kidConnectCard.setTheme(theme);
      });
    });

    // Nút Tải ảnh PNG
    const btnDownloadPNG = document.getElementById("btn-download-png");
    if (btnDownloadPNG) {
      btnDownloadPNG.addEventListener("click", () => {
        const student = state.students.find(s => s.id === state.currentStudentId);
        const name = state.isPrivacyMasked ? (student?.nickName || "Be") : (student?.name || "Be");
        window.kidConnectCard.downloadCardAsPNG(name);
      });
    }

    // Nút Sao chép Zalo
    const btnCopyZalo = document.getElementById("btn-copy-zalo");
    if (btnCopyZalo) {
      btnCopyZalo.addEventListener("click", () => {
        const student = state.students.find(s => s.id === state.currentStudentId);
        const className = getClassName(state.currentClassId);
        const text = window.kidConnectCard.generateZaloText(state.lastAssessment || {}, student || {}, className, state.isPrivacyMasked);

        navigator.clipboard.writeText(text).then(() => {
          btnCopyZalo.innerText = "✅ Đã sao chép tin nhắn Zalo!";
          setTimeout(() => {
            btnCopyZalo.innerText = "📋 Sao Chép Tin Nhắn Zalo";
          }, 2500);
        }).catch(err => {
          alert("Không thể sao chép tự động: " + err);
        });
      });
    }

    // Nút In Thẻ
    const btnPrint = document.getElementById("btn-print-card");
    if (btnPrint) {
      btnPrint.addEventListener("click", () => {
        window.print();
      });
    }
  }

  function updateCardPreview() {
    saveEditedAssessment();
    const student = state.students.find(s => s.id === state.currentStudentId);
    const className = getClassName(state.currentClassId);

    const fallbackData = {
      date: new Date().toISOString().split("T")[0],
      week: "Tuần 7 - Tháng 10/2026",
      theChat: "Vận động nhanh nhẹn, tự xúc ăn gọn gàng, hoàn thành tốt các bài tập thể chất.",
      nhanThuc: "Sáng tạo trong trò chơi lắp ghép, nhận biết tốt các số lượng và màu sắc cơ bản.",
      ngonNgu: "Diễn đạt lưu loát bằng câu trọn vẹn, hào hứng tham gia các hoạt động đàm thoại.",
      tinhCamXH: "Biết chia sẻ đồ chơi với bạn, lễ phép chào hỏi cô giáo và giữ gìn trật tự lớp.",
      thamMy: "Cảm thụ âm nhạc tốt, múa hát nhịp nhàng theo điệu nhạc mầm non tươi vui.",
      parentMessage: "Bé tuần này rất chăm ngoan và có nhiều tiến bộ vi mô đáng khen ngợi!",
      homeTip: "Tối nay bố mẹ hãy dành 10 phút đọc truyện và ôm bé ngủ thật ngon nhé!",
      ratings: { theChat: 5, nhanThuc: 5, ngonNgu: 5, tinhCamXH: 5, thamMy: 5 }
    };

    const cardData = state.lastAssessment || student?.latestAssessment || fallbackData;
    window.kidConnectCard.renderCard(cardData, student || { name: "Bé Mầm Non", nickName: "Bé", code: "PS-01" }, className, state.isPrivacyMasked);
  }

  // ===================== RESPONSIBLE AI TOGGLE =====================
  function initResponsibleAIToggle() {
    const toggle = document.getElementById("toggle-privacy-mode");
    if (!toggle) return;

    toggle.checked = state.isPrivacyMasked;
    toggle.addEventListener("change", (e) => {
      state.isPrivacyMasked = e.target.checked;
      selectStudent(state.currentStudentId);
      initStudentSelector();
      if (state.currentTab === "tab-card-preview") {
        updateCardPreview();
      }
    });
  }

  // ===================== SETTINGS MODAL =====================
  function initSettingsModal() {
    const openBtn = document.getElementById("btn-open-settings");
    const closeBtn = document.getElementById("btn-close-settings");
    const modal = document.getElementById("settings-modal");
    const saveBtn = document.getElementById("btn-save-settings");
    const keyInput = document.getElementById("input-gemini-key");
    const modelSelect = document.getElementById("select-gemini-model");

    if (openBtn && modal) {
      openBtn.addEventListener("click", () => {
        if (keyInput) keyInput.value = window.kidConnectAI.getApiKey();
        if (modelSelect) modelSelect.value = window.kidConnectAI.modelName;
        modal.classList.add("open");
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    }

    if (saveBtn && modal) {
      saveBtn.addEventListener("click", () => {
        const key = keyInput?.value || "";
        const model = modelSelect?.value || "gemini-2.5-flash";
        window.kidConnectAI.setApiKey(key);
        window.kidConnectAI.modelName = model;
        localStorage.setItem("kid_connect_model", model);
        modal.classList.remove("open");
        alert(key ? "✅ Đã lưu cấu hình Google Gemini API thành công!" : "ℹ️ Đã chuyển sang chế độ Smart Pedagogical Engine Offline.");
      });
    }
  }

  // ===================== CREATE NEW CLASS MODAL =====================
  function openClassModal() {
    const modal = document.getElementById("class-modal");
    if (modal) {
      modal.classList.add("open");
      const nameInput = document.getElementById("new-class-name");
      if (nameInput) {
        nameInput.value = "";
        setTimeout(() => nameInput.focus(), 120);
      }
    }
  }

  function initClassModal() {
    const btnOpen = document.getElementById("btn-open-class-modal");
    const modal = document.getElementById("class-modal");
    const btnClose = document.getElementById("btn-close-class-modal");
    const btnCancel = document.getElementById("btn-cancel-class-modal");
    const btnSave = document.getElementById("btn-save-new-class");

    if (btnOpen) {
      btnOpen.addEventListener("click", () => openClassModal());
    }

    if (btnClose && modal) {
      btnClose.addEventListener("click", () => modal.classList.remove("open"));
    }

    if (btnCancel && modal) {
      btnCancel.addEventListener("click", () => modal.classList.remove("open"));
    }

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("open");
      });
    }

    if (btnSave && modal) {
      btnSave.addEventListener("click", () => {
        const nameInput = document.getElementById("new-class-name");
        const ageSelect = document.getElementById("new-class-age");
        const teacherInput = document.getElementById("new-class-teacher");
        const roomInput = document.getElementById("new-class-room");
        const totalInput = document.getElementById("new-class-total");

        const name = nameInput ? nameInput.value.trim() : "";
        const ageGroup = ageSelect ? ageSelect.value : "5-6 tuổi";
        const teacher = teacherInput && teacherInput.value.trim() ? teacherInput.value.trim() : "Cô giáo phụ trách";
        const room = roomInput && roomInput.value.trim() ? roomInput.value.trim() : "Phòng học Mầm non";
        const totalStudents = totalInput ? (parseInt(totalInput.value) || 30) : 30;

        if (!name) {
          alert("Cô giáo vui lòng nhập tên lớp học!");
          nameInput?.focus();
          return;
        }

        const newId = "cls_" + Date.now();
        const newClass = {
          id: newId,
          name: name,
          ageGroup: ageGroup,
          teacher: teacher,
          totalStudents: totalStudents,
          room: room
        };

        state.classes.push(newClass);
        saveClasses();
        state.currentClassId = newId;

        // Cập nhật lại danh mục lớp và chuyển đến lớp mới
        initClassSelector();
        initStudentSelector();
        selectStudent(null);
        renderImpactDashboard();

        modal.classList.remove("open");

        // Reset ô nhập liệu
        if (nameInput) nameInput.value = "";
        if (teacherInput) teacherInput.value = "";
        if (roomInput) roomInput.value = "";

        alert(`🎉 Chúc mừng cô đã tạo mới "${name}" thành công!\nCô có thể bấm "➕ Thêm Bé Mới Vào Lớp" ở cột bên trái để bắt đầu lập danh sách học sinh.`);
      });
    }
  }

  function saveClasses() {
    localStorage.setItem("kid_classes", JSON.stringify(state.classes));
  }

  // ===================== ADD NEW STUDENT MODAL =====================
  function initStudentModal() {
    const btnOpenAdd = document.getElementById("btn-add-student");
    const modal = document.getElementById("student-modal");
    const btnClose = document.getElementById("btn-close-student-modal");
    const btnSave = document.getElementById("btn-save-new-student");

    if (btnOpenAdd && modal) {
      btnOpenAdd.addEventListener("click", () => modal.classList.add("open"));
    }
    if (btnClose && modal) {
      btnClose.addEventListener("click", () => modal.classList.remove("open"));
    }
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("open");
      });
    }

    if (btnSave && modal) {
      btnSave.addEventListener("click", () => {
        const nameEl = document.getElementById("new-student-name");
        const nickNameEl = document.getElementById("new-student-nickname");
        const notesEl = document.getElementById("new-student-notes");

        const name = nameEl?.value.trim();
        const nickName = nickNameEl?.value.trim() || name;
        const notes = notesEl?.value.trim();

        if (!name) {
          alert("Cô giáo vui lòng nhập tên bé!");
          nameEl?.focus();
          return;
        }

        const newId = "psb_" + Date.now();
        const classStudents = state.students.filter(s => s.classId === state.currentClassId);
        const codeNum = classStudents.length + 1;
        const curClass = state.classes.find(c => c.id === state.currentClassId);
        let prefix = "PS";
        if (curClass) {
          // Trích xuất mã ngắn từ tên lớp (ví dụ A1, A2, B1...)
          const match = curClass.name.match(/[A-D][1-9]?/i);
          prefix = match ? match[0].toUpperCase() : "PS";
        }

        const newStudent = {
          id: newId,
          classId: state.currentClassId,
          name: name,
          nickName: nickName,
          gender: "boy",
          code: `PS-${prefix}-${codeNum < 10 ? '0' + codeNum : codeNum}`,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4`,
          notes: notes,
          latestAssessment: null
        };

        state.students.push(newStudent);
        saveStudents();
        initStudentSelector();
        selectStudent(newId);
        renderImpactDashboard();

        modal.classList.remove("open");

        // Reset các ô nhập
        if (nameEl) nameEl.value = "";
        if (nickNameEl) nickNameEl.value = "";
        if (notesEl) notesEl.value = "";
      });
    }
  }

  function saveStudents() {
    localStorage.setItem("kid_students", JSON.stringify(state.students));
  }

  // ===================== MOBILE QR CODE MODAL =====================
  function initMobileQRModal() {
    const btnOpen = document.getElementById("btn-open-mobile-qr");
    const modal = document.getElementById("qr-modal");
    const btnClose = document.getElementById("btn-close-qr-modal");
    const btnFooterClose = document.getElementById("btn-close-qr-footer");
    const linkText = document.getElementById("qr-link-text");

    if (btnOpen && modal) {
      btnOpen.addEventListener("click", () => {
        if (linkText) {
          linkText.textContent = "https://annethanks.github.io/dongtam-kindergarten/";
        }
        modal.classList.add("open");
      });
    }

    if (btnClose && modal) {
      btnClose.addEventListener("click", () => modal.classList.remove("open"));
    }
    if (btnFooterClose && modal) {
      btnFooterClose.addEventListener("click", () => modal.classList.remove("open"));
    }
  }

  // ===================== IMPACT DASHBOARD METRICS =====================
  function renderImpactDashboard() {
    // Các số liệu thực nghiệm được lấy trực tiếp từ đề án dự thi
    const totalStudentsInClass = state.students.filter(s => s.classId === state.currentClassId).length;
    const assessedCount = state.students.filter(s => s.classId === state.currentClassId && s.latestAssessment).length;
    
    const countEl = document.getElementById("metric-assessed-count");
    if (countEl) countEl.textContent = `${assessedCount} / ${totalStudentsInClass}`;
  }

  // ===================== IN-APP BROWSER (ZALO / FB) DETECTOR =====================
  function checkInAppBrowser() {
    const ua = navigator.userAgent || navigator.vendor || window.opera || "";
    const isZalo = /zalo/i.test(ua);
    const isFB = /fbav|facebook/i.test(ua);
    const isInApp = isZalo || isFB;

    if (isInApp && !sessionStorage.getItem("hide_inapp_banner")) {
      const banner = document.createElement("div");
      banner.className = "inapp-browser-banner";
      banner.innerHTML = `
        <div class="inapp-banner-content">
          <span>💡 Bạn đang mở trong Zalo: Bấm <strong>•••</strong> góc trên ➔ Chọn <strong>"Mở bằng Safari / Chrome"</strong> để dùng trọn vẹn Micro & Tải ảnh! Hoặc bấm nút Micro 🎙️ trên bàn phím để nói nhé.</span>
          <button type="button" class="btn-close-inapp" title="Đóng">&times;</button>
        </div>
      `;
      document.body.prepend(banner);

      banner.querySelector(".btn-close-inapp")?.addEventListener("click", () => {
        banner.remove();
        sessionStorage.setItem("hide_inapp_banner", "1");
      });
    }
  }
});
