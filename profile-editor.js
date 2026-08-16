// Profile editor: pencil -> edit menu + live preview
(function () {
  var THEMES = [
    { id: "midnight", name: "Midnight", banner: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)", accent: "#5865f2" },
    { id: "sunset", name: "Sunset", banner: "linear-gradient(135deg,#f12711,#f5af19)", accent: "#f5af19" },
    { id: "ocean", name: "Ocean", banner: "linear-gradient(135deg,#2193b0,#6dd5ed)", accent: "#6dd5ed" },
    { id: "forest", name: "Forest", banner: "linear-gradient(135deg,#134e5e,#71b280)", accent: "#71b280" },
    { id: "candy", name: "Candy", banner: "linear-gradient(135deg,#f953c6,#b91d73)", accent: "#f953c6" },
    { id: "fire", name: "Fire", banner: "linear-gradient(135deg,#c31432,#240b36)", accent: "#ff4d4d" },
    { id: "aurora", name: "Aurora", banner: "linear-gradient(135deg,#00c6ff,#0072ff,#7b2ff7)", accent: "#7b2ff7" },
    { id: "gold", name: "Gold", banner: "linear-gradient(135deg,#f7971e,#ffd200)", accent: "#ffd200" }
  ];

  var BANNERS = [
    { id: "default", css: "linear-gradient(90deg,#5865f2,#7289da)" },
    { id: "wave", css: "linear-gradient(120deg,#1a1a2e,#16213e,#0f3460)" },
    { id: "neon", css: "linear-gradient(90deg,#ff00cc,#333399)" },
    { id: "emerald", css: "linear-gradient(90deg,#0f9b0f,#000000)" },
    { id: "crimson", css: "linear-gradient(90deg,#8e0e00,#1f1c18)" },
    { id: "sky", css: "linear-gradient(90deg,#2980b9,#6dd5fa,#ffffff)" }
  ];

  var draft = {
    displayName: "",
    avatarLetter: "U",
    avatarImage: null,
    bannerImage: null,
    bannerCss: null,
    themeId: null,
    frame: "none",
    status: "online"
  };

  function $(id) {
    return document.getElementById(id);
  }

  function loadProfileExtras() {
    try {
      return JSON.parse(localStorage.getItem("dc_profile_extras") || "{}");
    } catch (e) {
      return {};
    }
  }

  function saveProfileExtras(data) {
    try {
      localStorage.setItem("dc_profile_extras", JSON.stringify(data));
    } catch (e) {
      alert("Görsel çok büyük, daha küçük bir foto dene.");
    }
  }

  function currentUser() {
    return typeof state !== "undefined" ? state.currentUser : null;
  }

  function isMdc() {
    var u = currentUser();
    return u && String(u.username || "").toLowerCase() === "mdc";
  }

  function ensureModal() {
    if ($("profile-editor-modal")) return;

    var modal = document.createElement("div");
    modal.id = "profile-editor-modal";
    modal.className = "pe-modal";
    modal.innerHTML =
      '<div class="pe-panel">' +
      '  <div class="pe-header">' +
      '    <h2>Profili Düzenle</h2>' +
      '    <button type="button" class="pe-close" id="pe-close">✕</button>' +
      "  </div>" +
      '  <div class="pe-preview" id="pe-preview">' +
      '    <div class="pe-banner" id="pe-banner"></div>' +
      '    <div class="pe-avatar-row">' +
      '      <div class="pe-avatar-wrap" id="pe-avatar-wrap"><div class="pe-avatar" id="pe-avatar">U</div></div>' +
      '      <div class="pe-preview-info">' +
      '        <div class="pe-name" id="pe-name">User</div>' +
      '        <div class="pe-tag" id="pe-tag">#0001</div>' +
      "      </div>" +
      "    </div>" +
      "  </div>" +
      '  <div class="pe-body">' +
      '    <div class="pe-group">' +
      "      <label>Görünen Ad</label>" +
      '      <input type="text" id="pe-displayname" maxlength="32" />' +
      "    </div>" +
      '    <div class="pe-group pe-row">' +
      '      <div class="pe-col">' +
      "        <label>Profil Foto</label>" +
      '        <div class="pe-upload-row">' +
      '          <button type="button" class="pe-btn-secondary" id="pe-avatar-pick">Foto Seç</button>' +
      '          <button type="button" class="pe-btn-ghost" id="pe-avatar-clear">Sil</button>' +
      '          <input type="file" id="pe-avatar-file" accept="image/*" hidden />' +
      "        </div>" +
      '        <input type="text" id="pe-avatar-letter" maxlength="1" placeholder="Harf" />' +
      "      </div>" +
      '      <div class="pe-col">' +
      "        <label>Banner</label>" +
      '        <div class="pe-upload-row">' +
      '          <button type="button" class="pe-btn-secondary" id="pe-banner-pick">Banner Seç</button>' +
      '          <button type="button" class="pe-btn-ghost" id="pe-banner-clear">Sil</button>' +
      '          <input type="file" id="pe-banner-file" accept="image/*" hidden />' +
      "        </div>" +
      "      </div>" +
      "    </div>" +
      '    <div class="pe-group">' +
      "      <label>Hazır Banner</label>" +
      '      <div class="pe-banner-presets" id="pe-banner-presets"></div>' +
      "    </div>" +
      '    <div class="pe-group">' +
      "      <label>Hazır Temalar</label>" +
      '      <div class="pe-themes" id="pe-themes"></div>' +
      "    </div>" +
      '    <div class="pe-group">' +
      "      <label>Çerçeve</label>" +
      '      <div class="frame-options" id="pe-frames">' +
      '        <div class="frame-option active" data-frame="none">A</div>' +
      '        <div class="frame-option frame-glow" data-frame="glow">A</div>' +
      '        <div class="frame-option frame-rainbow" data-frame="rainbow">A</div>' +
      '        <div class="frame-option frame-pulse" data-frame="pulse">A</div>' +
      '        <div class="frame-option frame-gold" data-frame="gold">A</div>' +
      '        <div class="frame-option frame-fire" data-frame="fire">A</div>' +
      "      </div>" +
      "    </div>" +
      '    <div class="pe-group">' +
      "      <label>Durum</label>" +
      '      <select id="pe-status">' +
      '        <option value="online">Online</option>' +
      '        <option value="idle">Idle</option>' +
      '        <option value="dnd">Rahatsız Etme</option>' +
      '        <option value="invisible">Görünmez</option>' +
      "      </select>" +
      "    </div>" +
      "  </div>" +
      '  <div class="pe-footer">' +
      '    <button type="button" class="pe-btn-ghost" id="pe-cancel">İptal</button>' +
      '    <button type="button" class="pe-btn-primary" id="pe-save">Kaydet</button>' +
      "  </div>" +
      "</div>";

    document.body.appendChild(modal);

    // Build presets
    var bp = $("pe-banner-presets");
    BANNERS.forEach(function (b) {
      var el = document.createElement("button");
      el.type = "button";
      el.className = "pe-banner-preset";
      el.style.background = b.css;
      el.dataset.id = b.id;
      el.title = b.id;
      el.addEventListener("click", function () {
        draft.bannerImage = null;
        draft.bannerCss = b.css;
        draft.themeId = null;
        updatePreview();
        highlightPresets();
      });
      bp.appendChild(el);
    });

    var th = $("pe-themes");
    THEMES.forEach(function (t) {
      var el = document.createElement("button");
      el.type = "button";
      el.className = "pe-theme";
      el.dataset.id = t.id;
      el.innerHTML =
        '<span class="pe-theme-swatch" style="background:' +
        t.banner +
        '"></span><span class="pe-theme-name">' +
        t.name +
        "</span>";
      el.addEventListener("click", function () {
        draft.themeId = t.id;
        draft.bannerCss = t.banner;
        draft.bannerImage = null;
        updatePreview();
        highlightPresets();
      });
      th.appendChild(el);
    });

    // Frames
    $("pe-frames").querySelectorAll(".frame-option").forEach(function (el) {
      el.addEventListener("click", function () {
        draft.frame = el.getAttribute("data-frame") || "none";
        $("pe-frames").querySelectorAll(".frame-option").forEach(function (x) {
          x.classList.toggle("active", x === el);
        });
        updatePreview();
      });
    });

    // Inputs
    $("pe-displayname").addEventListener("input", function () {
      draft.displayName = this.value;
      updatePreview();
    });
    $("pe-avatar-letter").addEventListener("input", function () {
      draft.avatarLetter = (this.value || "U").charAt(0).toUpperCase();
      if (!draft.avatarImage) updatePreview();
    });
    $("pe-status").addEventListener("change", function () {
      draft.status = this.value;
    });

    $("pe-avatar-pick").addEventListener("click", function () {
      $("pe-avatar-file").click();
    });
    $("pe-banner-pick").addEventListener("click", function () {
      $("pe-banner-file").click();
    });
    $("pe-avatar-clear").addEventListener("click", function () {
      draft.avatarImage = null;
      updatePreview();
    });
    $("pe-banner-clear").addEventListener("click", function () {
      draft.bannerImage = null;
      draft.bannerCss = BANNERS[0].css;
      updatePreview();
      highlightPresets();
    });

    $("pe-avatar-file").addEventListener("change", function (e) {
      readImage(e.target.files[0], 256, function (data) {
        draft.avatarImage = data;
        updatePreview();
      });
      e.target.value = "";
    });
    $("pe-banner-file").addEventListener("change", function (e) {
      readImage(e.target.files[0], 800, function (data) {
        draft.bannerImage = data;
        draft.bannerCss = null;
        draft.themeId = null;
        updatePreview();
        highlightPresets();
      });
      e.target.value = "";
    });

    $("pe-close").addEventListener("click", closeEditor);
    $("pe-cancel").addEventListener("click", closeEditor);
    $("pe-save").addEventListener("click", saveEditor);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeEditor();
    });
  }

  function readImage(file, maxSide, cb) {
    if (!file || !file.type || file.type.indexOf("image") !== 0) return;
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var w = img.width;
        var h = img.height;
        var scale = Math.min(1, maxSide / Math.max(w, h));
        var cw = Math.round(w * scale);
        var ch = Math.round(h * scale);
        var canvas = document.createElement("canvas");
        canvas.width = cw;
        canvas.height = ch;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, cw, ch);
        var quality = 0.72;
        var data = canvas.toDataURL("image/jpeg", quality);
        // shrink if still large (~400kb)
        while (data.length > 400000 && quality > 0.4) {
          quality -= 0.1;
          data = canvas.toDataURL("image/jpeg", quality);
        }
        cb(data);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  function updatePreview() {
    var nameEl = $("pe-name");
    var tagEl = $("pe-tag");
    var av = $("pe-avatar");
    var wrap = $("pe-avatar-wrap");
    var banner = $("pe-banner");
    if (!nameEl) return;

    nameEl.textContent = draft.displayName || "User";
    nameEl.classList.toggle("mdc-glow", isMdc());

    var u = currentUser();
    if (tagEl) tagEl.textContent = "#" + ((u && u.tag) || "0001");

    if (draft.avatarImage) {
      av.style.backgroundImage = "url(" + draft.avatarImage + ")";
      av.style.backgroundSize = "cover";
      av.style.backgroundPosition = "center";
      av.textContent = "";
    } else {
      av.style.backgroundImage = "";
      av.textContent = draft.avatarLetter || "U";
    }

    wrap.className = "pe-avatar-wrap";
    if (draft.frame && draft.frame !== "none") wrap.classList.add("frame-" + draft.frame);

    if (draft.bannerImage) {
      banner.style.backgroundImage = "url(" + draft.bannerImage + ")";
      banner.style.backgroundSize = "cover";
      banner.style.backgroundPosition = "center";
    } else {
      banner.style.backgroundImage = "";
      banner.style.background = draft.bannerCss || BANNERS[0].css;
    }
  }

  function highlightPresets() {
    document.querySelectorAll(".pe-banner-preset").forEach(function (el) {
      var b = BANNERS.filter(function (x) {
        return x.id === el.dataset.id;
      })[0];
      el.classList.toggle("active", !draft.bannerImage && b && b.css === draft.bannerCss);
    });
    document.querySelectorAll(".pe-theme").forEach(function (el) {
      el.classList.toggle("active", el.dataset.id === draft.themeId);
    });
  }

  function openEditor() {
    ensureModal();
    var u = currentUser();
    if (!u) return;
    var extras = loadProfileExtras();

    draft.displayName = u.displayName || u.username || "User";
    draft.avatarLetter = (u.avatar || "U").charAt(0).toUpperCase();
    draft.avatarImage = extras.avatarImage || null;
    draft.bannerImage = extras.bannerImage || null;
    draft.bannerCss = extras.bannerCss || BANNERS[0].css;
    draft.themeId = extras.themeId || null;
    draft.frame = localStorage.getItem("dc_frame") || u.frame || "none";
    draft.status = u.status || "online";

    $("pe-displayname").value = draft.displayName;
    $("pe-avatar-letter").value = draft.avatarLetter;
    $("pe-status").value = draft.status;

    $("pe-frames").querySelectorAll(".frame-option").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-frame") === draft.frame);
    });

    updatePreview();
    highlightPresets();

    var modal = $("profile-editor-modal");
    modal.classList.add("open");
  }

  function closeEditor() {
    var modal = $("profile-editor-modal");
    if (modal) modal.classList.remove("open");
  }

  function saveEditor() {
    var u = currentUser();
    if (!u) return;

    var displayName = (draft.displayName || u.username).trim().slice(0, 32);
    var avatarLetter = (draft.avatarLetter || "U").charAt(0).toUpperCase();
    var status = draft.status || "online";
    var frame = draft.frame || "none";

    if (typeof updateUserData === "function") {
      updateUserData(u.username, {
        displayName: displayName,
        avatar: avatarLetter,
        status: status,
        frame: frame
      });
    }
    u.displayName = displayName;
    u.avatar = avatarLetter;
    u.status = status;
    u.frame = frame;

    try {
      localStorage.setItem("dc_frame", frame);
      if (typeof state !== "undefined") state.avatarFrame = frame;
    } catch (e) {}

    saveProfileExtras({
      avatarImage: draft.avatarImage,
      bannerImage: draft.bannerImage,
      bannerCss: draft.bannerCss,
      themeId: draft.themeId
    });

    if (typeof selectFrame === "function") selectFrame(frame);
    if (typeof renderUser === "function") renderUser();
    applyProfileToUI();

    closeEditor();
    showSavedToast();
  }

  function showSavedToast() {
    var t = $("pe-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "pe-toast";
      t.className = "pe-toast";
      document.body.appendChild(t);
    }
    t.textContent = "Kaydedildi ✓";
    t.classList.add("show");
    setTimeout(function () {
      t.classList.remove("show");
    }, 1800);
  }

  function applyProfileToUI() {
    var extras = loadProfileExtras();
    var u = currentUser();

    // Main user avatar
    var av = $("user-avatar");
    if (av) {
      if (extras.avatarImage) {
        av.style.backgroundImage = "url(" + extras.avatarImage + ")";
        av.style.backgroundSize = "cover";
        av.style.backgroundPosition = "center";
        av.textContent = "";
      } else if (u) {
        av.style.backgroundImage = "";
        av.textContent = u.avatar || "U";
      }
    }

    // Settings preview avatar
    var sav = $("settings-avatar-preview");
    if (sav) {
      if (extras.avatarImage) {
        sav.style.backgroundImage = "url(" + extras.avatarImage + ")";
        sav.style.backgroundSize = "cover";
        sav.style.backgroundPosition = "center";
        sav.textContent = "";
      } else if (u) {
        sav.style.backgroundImage = "";
        sav.textContent = u.avatar || "U";
      }
    }

    // Account banner in settings
    var banner = document.querySelector("#section-account .account-banner");
    if (banner) {
      if (extras.bannerImage) {
        banner.style.backgroundImage = "url(" + extras.bannerImage + ")";
        banner.style.backgroundSize = "cover";
        banner.style.backgroundPosition = "center";
      } else if (extras.bannerCss) {
        banner.style.backgroundImage = "";
        banner.style.background = extras.bannerCss;
      }
    }

    // Name
    var nameEl = $("username");
    if (nameEl && u) {
      var span = nameEl.querySelector(".name-text");
      if (span) span.textContent = u.displayName || u.username;
      else nameEl.textContent = u.displayName || u.username;
      if (isMdc()) nameEl.classList.add("mdc-glow");
    }
    var sdn = $("settings-display-name");
    if (sdn && u) {
      sdn.textContent = u.displayName || u.username;
      if (isMdc()) sdn.classList.add("mdc-glow");
    }
  }

  function injectEditButton() {
    // Profile section header button
    var section = $("section-profile");
    if (section && !section.querySelector(".pe-edit-btn")) {
      var h2 = section.querySelector("h2");
      if (h2) {
        var row = document.createElement("div");
        row.className = "pe-section-head";
        h2.parentNode.insertBefore(row, h2);
        row.appendChild(h2);
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "pe-edit-btn";
        btn.title = "Profili düzenle";
        btn.innerHTML =
          '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>';
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          openEditor();
        });
        row.appendChild(btn);
      }
    }

    // Also on account card
    var acc = document.querySelector("#section-account .account-info");
    if (acc && !acc.querySelector(".pe-edit-btn")) {
      var btn2 = document.createElement("button");
      btn2.type = "button";
      btn2.className = "pe-edit-btn pe-edit-inline";
      btn2.title = "Profili düzenle";
      btn2.innerHTML =
        '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>';
      btn2.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        openEditor();
      });
      acc.appendChild(btn2);
    }
  }

  // Patch enterApp / openSettings
  function patch() {
    if (typeof window.enterApp === "function" && !window.enterApp._pe) {
      var orig = window.enterApp;
      window.enterApp = function (username) {
        orig(username);
        setTimeout(function () {
          applyProfileToUI();
          injectEditButton();
        }, 100);
      };
      window.enterApp._pe = true;
    }
    if (typeof window.openSettings === "function" && !window.openSettings._pe) {
      var origS = window.openSettings;
      window.openSettings = function () {
        origS();
        setTimeout(function () {
          injectEditButton();
          applyProfileToUI();
        }, 80);
      };
      window.openSettings._pe = true;
    }
    if (typeof window.renderUser === "function" && !window.renderUser._pe) {
      var origR = window.renderUser;
      window.renderUser = function () {
        origR();
        applyProfileToUI();
      };
      window.renderUser._pe = true;
    }
  }

  window.openProfileEditor = openEditor;

  function boot() {
    ensureModal();
    injectEditButton();
    applyProfileToUI();
    patch();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  setInterval(patch, 2000);
})();
