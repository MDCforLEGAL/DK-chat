// Complete i18n — fill missing English + apply to hardcoded UI
(function () {
  var EXTRA = {
    tr: {
      loading: "Yükleniyor...",
      chatSection: "SOHBET",
      room: "Oda",
      roomDesc: "Kod ile arkadaşınla gerçek sohbet.",
      createRoom: "Oda Oluştur",
      orJoinCode: "veya kod ile katıl",
      joinCode: "Koda Katıl",
      codeLabel: "Kod:",
      messagePlaceholder: "Mesaj yaz...",
      joinVoice: "Sese Katıl",
      leaveVoice: "Ayrıl",
      voiceOff: "Ses kapalı",
      voiceOn: "Seste",
      muted: "Susturuldu",
      connections: "bağlantı",
      editProfile: "Profili Düzenle",
      profileEditor: "Profili Düzenle",
      displayName: "Görünen Ad",
      profilePhoto: "Profil Foto",
      pickPhoto: "Foto Seç",
      pickBanner: "Banner Seç",
      remove: "Sil",
      letter: "Harf",
      readyBanners: "Hazır Banner",
      readyThemes: "Hazır Temalar",
      frame: "Çerçeve",
      status: "Durum",
      save: "Kaydet",
      cancel: "İptal",
      saved: "Kaydedildi ✓",
      plusNone: "Plus yok",
      plusActive: "Plus aktif",
      buyPlus: "Plus Satın Al",
      monthly: "Aylık",
      yearly: "Yıllık",
      recommended: "Önerilen",
      buy: "Satın Al →",
      plusHero: "Profilini bir üst seviyeye taşı",
      plusNote: "Ödeme sayfasına yönlendirileceksin · Her Cuma %40 indirim!",
      fridayDeal: "🔥 Cuma Fırsatı — %40 İNDİRİM",
      fridayActive: "Cuma özel: %40 indirim bugün geçerli!",
      perMonth: "/ ay",
      perYear: "/ yıl",
      roomEmpty: "Oda boş. İlk mesajı sen yaz! 🚀",
      roomCreated: "Oda oluşturuldu. Kod: ",
      roomJoined: "Odaya katıldın: ",
      roomLeft: "Odadan ayrıldın. Yeni oda aç veya koda katıl.",
      shareCode: "Bu kodu arkadaşınla paylaş!",
      connecting: "Bağlanıyor...",
      joining: "Katılınıyor...",
      invalidCode: "Geçersiz kod",
      enterCode: "Kod gir",
      codeCopied: "Kod kopyalandı: ",
      roomNotFound: "Oda bulunamadı veya kapalı. Kod doğru mu?",
      peerError: "Bağlantı hatası",
      joined: "katıldı",
      left: "ayrıldı",
      someone: "Birisi",
      you: "(sen)",
      todayAt: "Bugün saat",
      voiceJoined: "Sese katıldın 🎤",
      voiceLeft: "Sesten ayrıldın",
      needRoom: "Önce bir odaya katıl veya oda oluştur.",
      noMic: "Bu tarayıcı mikrofon desteklemiyor.",
      micDenied: "Mikrofon izni gerekli. Ayarlardan izin ver.",
      unmute: "Sesi aç",
      mute: "Sustur",
      settings: "Ayarlar",
      menu: "Menü",
      members: "Üyeler",
      online: "ONLINE",
      offline: "OFFLINE",
      home: "Ana Sayfa",
      noAccountHint: "Oda oluştur veya kod ile katıl — sahte sohbet yok. 🔗",
      imageTooBig: "Görsel çok büyük, daha küçük bir foto dene.",
      avatarFrame: "Avatar çerçevesi",
      animatedBanner: "Animasyonlu profil banner",
      nameEffects: "İsim efektleri",
      plusBadge: "PLUS rozeti",
      plusOwner: "Plus aktif · Owner 👑"
    },
    en: {
      loading: "Loading...",
      chatSection: "CHAT",
      room: "Room",
      roomDesc: "Real chat with friends using a code.",
      createRoom: "Create Room",
      orJoinCode: "or join with a code",
      joinCode: "Join Code",
      codeLabel: "Code:",
      messagePlaceholder: "Message...",
      joinVoice: "Join Voice",
      leaveVoice: "Leave",
      voiceOff: "Voice off",
      voiceOn: "In voice",
      muted: "Muted",
      connections: "connections",
      editProfile: "Edit Profile",
      profileEditor: "Edit Profile",
      displayName: "Display Name",
      profilePhoto: "Profile Photo",
      pickPhoto: "Choose Photo",
      pickBanner: "Choose Banner",
      remove: "Remove",
      letter: "Letter",
      readyBanners: "Banner Presets",
      readyThemes: "Ready Themes",
      frame: "Frame",
      status: "Status",
      save: "Save",
      cancel: "Cancel",
      saved: "Saved ✓",
      plusNone: "No Plus",
      plusActive: "Plus active",
      buyPlus: "Buy Plus",
      monthly: "Monthly",
      yearly: "Yearly",
      recommended: "Recommended",
      buy: "Buy →",
      plusHero: "Take your profile to the next level",
      plusNote: "You will be redirected to payment · 40% off every Friday!",
      fridayDeal: "🔥 Friday Deal — 40% OFF",
      fridayActive: "Friday special: 40% off is active today!",
      perMonth: "/ month",
      perYear: "/ year",
      roomEmpty: "Room is empty. Send the first message! 🚀",
      roomCreated: "Room created. Code: ",
      roomJoined: "Joined room: ",
      roomLeft: "You left the room. Create or join another.",
      shareCode: "Share this code with your friend!",
      connecting: "Connecting...",
      joining: "Joining...",
      invalidCode: "Invalid code",
      enterCode: "Enter a code",
      codeCopied: "Code copied: ",
      roomNotFound: "Room not found or closed. Is the code correct?",
      peerError: "Connection error",
      joined: "joined",
      left: "left",
      someone: "Someone",
      you: "(you)",
      todayAt: "Today at",
      voiceJoined: "Joined voice 🎤",
      voiceLeft: "Left voice",
      needRoom: "Join or create a room first.",
      noMic: "This browser does not support the microphone.",
      micDenied: "Microphone permission required. Allow it in settings.",
      unmute: "Unmute",
      mute: "Mute",
      settings: "Settings",
      menu: "Menu",
      members: "Members",
      online: "ONLINE",
      offline: "OFFLINE",
      home: "Home",
      noAccountHint: "Create a room or join with a code — no fake chat. 🔗",
      imageTooBig: "Image is too large, try a smaller photo.",
      avatarFrame: "Animated avatar frame",
      animatedBanner: "Animated profile banner",
      nameEffects: "Name effects",
      plusBadge: "PLUS badge",
      plusOwner: "Plus active · Owner 👑",
      // ensure base keys exist in en if missing fragments
      invisible: "Invisible",
      theme: "Theme",
      dark: "Dark",
      darker: "Darker"
    }
  };

  function lang() {
    if (typeof state !== "undefined" && state.lang) return state.lang;
    try {
      return localStorage.getItem("dc_lang") || "en";
    } catch (e) {
      return "en";
    }
  }

  window.tt = function (key) {
    var L = lang();
    if (typeof translations !== "undefined") {
      if (translations[L] && translations[L][key]) return translations[L][key];
      if (translations.en && translations.en[key]) return translations.en[key];
    }
    if (EXTRA[L] && EXTRA[L][key]) return EXTRA[L][key];
    if (EXTRA.en && EXTRA.en[key]) return EXTRA.en[key];
    return key;
  };

  function mergeExtras() {
    if (typeof translations === "undefined") return;
    ["tr", "en"].forEach(function (L) {
      if (!translations[L]) translations[L] = {};
      Object.keys(EXTRA[L] || {}).forEach(function (k) {
        if (!translations[L][k]) translations[L][k] = EXTRA[L][k];
      });
    });
  }

  function setText(sel, text) {
    var el = typeof sel === "string" ? document.querySelector(sel) : sel;
    if (el) el.textContent = text;
  }

  function setHtml(sel, html) {
    var el = document.querySelector(sel);
    if (el) el.innerHTML = html;
  }

  function applyAll() {
    mergeExtras();
    var L = lang();

    // Loading
    setText(".loading-sub", tt("loading"));

    // Channel section header
    document.querySelectorAll(".section-header").forEach(function (el) {
      var arrow = el.querySelector(".arrow");
      var a = arrow ? arrow.outerHTML : "";
      el.innerHTML = a + " " + tt("chatSection");
    });

    // Message placeholder
    var mi = document.getElementById("message-input");
    if (mi) mi.placeholder = tt("messagePlaceholder");

    // Room modal
    var rm = document.getElementById("room-modal");
    if (rm) {
      var h2 = rm.querySelector("h2");
      if (h2) h2.textContent = tt("room");
      var desc = rm.querySelector(".room-desc");
      if (desc) desc.textContent = tt("roomDesc");
      var actions = rm.querySelectorAll(".room-actions .auth-btn");
      if (actions[0]) actions[0].textContent = tt("createRoom");
      if (actions[1]) actions[1].textContent = tt("joinCode");
      var div = rm.querySelector(".room-divider");
      if (div) div.textContent = tt("orJoinCode");
      var inp = document.getElementById("join-code-input");
      if (inp) inp.placeholder = L === "tr" ? "KOD" : "CODE";
    }

    // Room code badge label
    var badge = document.getElementById("room-code-badge");
    if (badge) {
      var spans = badge.querySelectorAll("span");
      if (spans[0] && !spans[0].classList.contains("code-text")) {
        spans[0].textContent = tt("codeLabel");
      }
    }

    // Voice bar
    var vj = document.getElementById("voice-join-btn");
    if (vj) vj.textContent = tt("joinVoice");
    var vl = document.getElementById("voice-leave-btn");
    if (vl) vl.textContent = tt("leaveVoice");
    var vs = document.getElementById("voice-status");
    if (vs && /ses|voice|mute|sustur/i.test(vs.textContent || "")) {
      // refreshed by voice.js; set default
      if (!window.RoomVoice || !window.RoomVoice.inVoice) vs.textContent = tt("voiceOff");
    }

    // Bottom bar titles
    var bar = document.getElementById("mobile-bottom-bar");
    if (bar) {
      bar.querySelectorAll("button").forEach(function (b) {
        var oc = b.getAttribute("onclick") || "";
        if (oc.indexOf("openSettings") >= 0) b.title = tt("settings");
        if (oc.indexOf("openRoomModal") >= 0) b.title = tt("room");
        if (oc.indexOf("toggleChannels") >= 0) b.title = tt("menu");
        if (oc.indexOf("toggleMembers") >= 0) b.title = tt("members");
      });
    }

    // Members panel group titles
    document.querySelectorAll(".group-title").forEach(function (el, idx) {
      var count = el.querySelector("span:last-child");
      var c = count ? count.textContent : "0";
      // rebuild
      var label = idx === 0 ? tt("online") : tt("offline");
      el.innerHTML = "<span>" + label + "</span> — <span id=\"" + (idx === 0 ? "online-count" : "offline-count") + "\">" + c + "</span>";
    });

    // Plus section
    var plusStatus = document.getElementById("plus-status-text");
    if (plusStatus) {
      var cur = plusStatus.textContent || "";
      if (/owner/i.test(cur)) plusStatus.textContent = tt("plusOwner");
      else if (/aktif|active/i.test(cur)) plusStatus.textContent = tt("plusActive");
      else plusStatus.textContent = tt("plusNone");
    }
    document.querySelectorAll("#section-plus .auth-btn, button[onclick*=\"openPlusPurchase\"]").forEach(function (b) {
      if ((b.textContent || "").indexOf("Plus") >= 0 || (b.textContent || "").indexOf("Satın") >= 0 || (b.textContent || "").indexOf("Buy") >= 0) {
        if (b.closest(".plus-plan")) return;
        b.textContent = tt("buyPlus");
      }
    });

    // Plus purchase modal
    var ppm = document.getElementById("plus-purchase-modal");
    if (ppm) {
      var heroP = ppm.querySelector(".plus-purchase-hero p");
      if (heroP) heroP.textContent = tt("plusHero");
      var list = ppm.querySelectorAll(".plus-purchase-list li");
      if (list[0]) list[0].textContent = tt("avatarFrame");
      if (list[1]) list[1].textContent = tt("animatedBanner");
      if (list[2]) list[2].textContent = tt("nameEffects");
      if (list[3]) list[3].textContent = tt("plusBadge");
      var mLabel = ppm.querySelector(".plus-plan.monthly .plan-label");
      if (mLabel) mLabel.textContent = tt("monthly");
      var yLabel = ppm.querySelector(".plus-plan.yearly .plan-label");
      if (yLabel) yLabel.textContent = tt("yearly");
      var badge = ppm.querySelector(".plan-badge");
      if (badge) badge.textContent = tt("recommended");
      ppm.querySelectorAll(".plan-cta").forEach(function (el) {
        el.textContent = tt("buy");
      });
      var note = ppm.querySelector(".plus-purchase-note");
      if (note) note.textContent = tt("plusNote");
    }

    // Profile editor button
    document.querySelectorAll(".pe-open-full").forEach(function (b) {
      b.textContent = tt("editProfile");
    });

    // Profile editor modal if open/exists
    var pe = document.getElementById("profile-editor-modal");
    if (pe) {
      var ph = pe.querySelector(".pe-header h2");
      if (ph) ph.textContent = tt("profileEditor");
      var labels = pe.querySelectorAll(".pe-group > label");
      // order roughly: displayName, profilePhoto, banner, readyBanners, readyThemes, frame, status
      var map = [tt("displayName"), null, null, tt("readyBanners"), tt("readyThemes"), tt("frame"), tt("status")];
      // Safer: text match replace
      pe.querySelectorAll("label").forEach(function (lab) {
        var tx = (lab.textContent || "").toLowerCase();
        if (tx.indexOf("görünen") >= 0 || tx.indexOf("display") >= 0) lab.textContent = tt("displayName");
        if (tx.indexOf("profil foto") >= 0 || tx.indexOf("profile photo") >= 0) lab.textContent = tt("profilePhoto");
        if (tx === "banner" || tx.indexOf("banner") === 0) lab.textContent = "Banner";
        if (tx.indexOf("hazır banner") >= 0 || tx.indexOf("banner preset") >= 0) lab.textContent = tt("readyBanners");
        if (tx.indexOf("hazır tema") >= 0 || tx.indexOf("ready theme") >= 0) lab.textContent = tt("readyThemes");
        if (tx.indexOf("çerçeve") >= 0 || tx.indexOf("frame") >= 0) lab.textContent = tt("frame");
        if (tx.indexOf("durum") >= 0 || tx.indexOf("status") >= 0) lab.textContent = tt("status");
      });
      var pickPhoto = document.getElementById("pe-avatar-pick");
      if (pickPhoto) pickPhoto.textContent = tt("pickPhoto");
      var pickBanner = document.getElementById("pe-banner-pick");
      if (pickBanner) pickBanner.textContent = tt("pickBanner");
      document.querySelectorAll("#pe-avatar-clear, #pe-banner-clear").forEach(function (b) {
        b.textContent = tt("remove");
      });
      var save = document.getElementById("pe-save");
      if (save) save.textContent = tt("save");
      var cancel = document.getElementById("pe-cancel");
      if (cancel) cancel.textContent = tt("cancel");
    }

    // data-i18n again
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = tt(key);
      if (val && val !== key) el.textContent = val;
    });
  }

  // Patch setLanguage / applyLanguage
  function patchLang() {
    if (typeof window.setLanguage === "function" && !window.setLanguage._i18n) {
      var orig = window.setLanguage;
      window.setLanguage = function (l) {
        orig(l);
        setTimeout(applyAll, 30);
      };
      window.setLanguage._i18n = true;
    }
    if (typeof window.applyLanguage === "function" && !window.applyLanguage._i18n) {
      var origA = window.applyLanguage;
      window.applyLanguage = function () {
        origA();
        applyAll();
      };
      window.applyLanguage._i18n = true;
    }
  }

  // Patch room system messages to use tt
  function patchRoom() {
    if (!window.RoomChat) return;
    if (RoomChat.addSystemMessage && !RoomChat.addSystemMessage._i18n) {
      // leave as is for dynamic; patch helpers used at create/join
    }
    if (typeof window.createRoomAction === "function" && !window.createRoomAction._i18n) {
      var origC = window.createRoomAction;
      window.createRoomAction = function () {
        var err = document.getElementById("room-error");
        if (err) err.textContent = tt("connecting");
        if (!window.RoomChat) return;
        RoomChat.createRoom(
          function (code) {
            if (err) err.textContent = "";
            if (typeof closeRoomModal === "function") closeRoomModal();
            var ch = document.getElementById("current-channel");
            if (ch) ch.textContent = "oda-" + code;
            alert(tt("roomCreated") + code + "\n\n" + tt("shareCode"));
          },
          function (msg) {
            if (err) err.textContent = msg;
          }
        );
      };
      window.createRoomAction._i18n = true;
    }
    if (typeof window.joinRoomAction === "function" && !window.joinRoomAction._i18n) {
      window.joinRoomAction = function () {
        var code = (document.getElementById("join-code-input") || {}).value || "";
        code = code.trim();
        var err = document.getElementById("room-error");
        if (!code) {
          if (err) err.textContent = tt("enterCode");
          return;
        }
        if (err) err.textContent = tt("joining");
        RoomChat.joinRoom(
          code,
          function (c) {
            if (err) err.textContent = "";
            if (typeof closeRoomModal === "function") closeRoomModal();
            var ch = document.getElementById("current-channel");
            if (ch) ch.textContent = "oda-" + c;
          },
          function (msg) {
            if (err) err.textContent = msg;
          }
        );
      };
      window.joinRoomAction._i18n = true;
    }
    if (typeof window.copyRoomCode === "function" && !window.copyRoomCode._i18n) {
      window.copyRoomCode = function () {
        if (!RoomChat.roomCode) return;
        if (navigator.clipboard) navigator.clipboard.writeText(RoomChat.roomCode);
        alert(tt("codeCopied") + RoomChat.roomCode);
      };
      window.copyRoomCode._i18n = true;
    }
    if (typeof window.leaveRoomAction === "function" && !window.leaveRoomAction._i18n) {
      window.leaveRoomAction = function () {
        RoomChat.leaveRoom();
        var container = document.getElementById("messages");
        if (container) {
          container.innerHTML =
            '<div class="message system"><div class="text">' + tt("roomLeft") + "</div></div>";
        }
        var ch = document.getElementById("current-channel");
        if (ch) ch.textContent = "genel";
      };
      window.leaveRoomAction._i18n = true;
    }

    // Patch render empty room text
    if (RoomChat.renderMessages && !RoomChat.renderMessages._i18nEmpty) {
      var origR = RoomChat.renderMessages.bind(RoomChat);
      // Only wrap if not already replaced by ui-fixes with _plus
      // Re-apply empty string via DOM after render
      var wrapped = function () {
        origR();
        var container = document.getElementById("messages");
        if (!container) return;
        if (!RoomChat.messages || RoomChat.messages.length === 0) {
          var sys = container.querySelector(".message.system .text");
          if (sys) sys.textContent = tt("roomEmpty");
        }
      };
      RoomChat.renderMessages = wrapped;
      RoomChat.renderMessages._i18nEmpty = true;
      RoomChat.renderMessages._plus = origR._plus;
    }
  }

  // Patch voice strings
  function patchVoice() {
    if (typeof window.joinVoice !== "function") return;
    // voice.js uses hardcoded; override update via status text when language changes
  }

  // Patch profile editor toast
  function patchProfileToast() {
    // profile-editor uses Kaydedildi — intercept toast element when shown
    var obs = new MutationObserver(function () {
      var t = document.getElementById("pe-toast");
      if (t && t.classList.contains("show")) {
        t.textContent = tt("saved");
      }
    });
    obs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
  }

  function boot() {
    mergeExtras();
    patchLang();
    applyAll();
    patchRoom();
    patchProfileToast();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  setInterval(function () {
    patchLang();
    patchRoom();
  }, 2000);
})();
