// MDC = owner only account
(function () {
  var OWNER = "mdc";

  var SARCASTIC_REGISTER = [
    "Yok kardeşim, MDC ismi zaten bir efsaneye ait 🔥",
    "Bu isim rezervli. Başka bir şey dene 😏",
    "MDC sadece bir tane olur. Sen kimsin?",
    "Hesap dolu. MDC makamı boş değil 👑",
    "İsim alınmış... ve alan kişi de sen değilsin 😂"
  ];

  var SARCASTIC_LOGIN = [
    "MDC'nin şifresini mi deniyorsun? Cesur 😂",
    "Yanlış şifre. Bu kapı sana açılmaz 🚪",
    "Olmadı kral, MDC sen değilsin.",
    "Şifre hatalı. Belki başka isim? 🤔"
  ];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function isMdc(name) {
    return String(name || "").trim().toLowerCase() === OWNER;
  }

  function grantPlus() {
    try {
      localStorage.setItem("dc_plus", "true");
      if (typeof state !== "undefined") state.plus = true;
    } catch (e) {}
  }

  function applyRedGlow() {
    var nameEl = document.getElementById("username");
    if (!nameEl) return;
    nameEl.classList.add("mdc-glow");

    var settingsName = document.getElementById("settings-display-name");
    if (settingsName) settingsName.classList.add("mdc-glow");

    // Message authors named MDC
    document.querySelectorAll(".author").forEach(function (el) {
      if (isMdc(el.textContent)) el.classList.add("mdc-glow");
    });
  }

  function ensureOwnerOnUser(user) {
    if (!user || !isMdc(user.username || user.displayName)) return;
    grantPlus();
    user.displayName = user.displayName || "MDC";
    // Prefer keeping username casing MDC
    if (String(user.username).toLowerCase() === OWNER) {
      user.username = "MDC";
    }
    try {
      localStorage.setItem("dc_name_fx", "glow");
      if (typeof state !== "undefined") {
        state.nameEffect = "glow";
        state.plus = true;
      }
    } catch (e) {}
  }

  // Patch register
  function patchAuth() {
    if (typeof window.register !== "function" || window.register._mdc) return;
    var origReg = window.register;
    window.register = function (username, email, password) {
      if (isMdc(username)) {
        var accounts = typeof getAccounts === "function" ? getAccounts() : {};
        if (accounts[OWNER]) {
          return pick(SARCASTIC_REGISTER);
        }
        // First (and only) registration allowed
        var err = origReg(username, email, password);
        if (!err) {
          grantPlus();
          // Normalize account
          try {
            var accs = getAccounts();
            if (accs[OWNER]) {
              accs[OWNER].username = "MDC";
              accs[OWNER].displayName = "MDC";
              accs[OWNER].plus = true;
              accs[OWNER].isOwner = true;
              saveAccounts(accs);
            }
          } catch (e) {}
        }
        return err;
      }
      return origReg(username, email, password);
    };
    window.register._mdc = true;

    if (typeof window.login !== "function" || window.login._mdc) return;
    var origLogin = window.login;
    window.login = function (username, password) {
      if (isMdc(username)) {
        var accounts = typeof getAccounts === "function" ? getAccounts() : {};
        var acc = accounts[OWNER];
        if (!acc) {
          // No account yet — force them to register path message
          return "MDC hesabı yok. Önce kayıt ol (tek seferlik)."
        }
        var err = origLogin(username, password);
        if (err) return pick(SARCASTIC_LOGIN);
        grantPlus();
        return null;
      }
      return origLogin(username, password);
    };
    window.login._mdc = true;
  }

  // Patch enterApp
  function patchEnter() {
    if (typeof window.enterApp !== "function" || window.enterApp._mdc) return;
    var orig = window.enterApp;
    window.enterApp = function (username) {
      orig(username);
      if (isMdc(username) && typeof state !== "undefined" && state.currentUser) {
        ensureOwnerOnUser(state.currentUser);
        grantPlus();
        setTimeout(applyRedGlow, 50);
        setTimeout(applyRedGlow, 300);
        if (typeof updatePlusUI === "function") {
          try { updatePlusUI(); } catch (e) {}
        }
        var plusText = document.getElementById("plus-status-text");
        if (plusText) plusText.textContent = "Plus aktif · Owner 👑";
      } else {
        var nameEl = document.getElementById("username");
        if (nameEl) nameEl.classList.remove("mdc-glow");
      }
    };
    window.enterApp._mdc = true;
  }

  // Patch renderUser for glow
  function patchRender() {
    if (typeof window.renderUser !== "function" || window.renderUser._mdc) return;
    var orig = window.renderUser;
    window.renderUser = function () {
      orig();
      if (typeof state !== "undefined" && state.currentUser && isMdc(state.currentUser.username)) {
        applyRedGlow();
      }
    };
    window.renderUser._mdc = true;
  }

  // Patch RoomChat message author styling
  function patchRoomMessages() {
    if (!window.RoomChat || typeof RoomChat.renderMessages !== "function") return;
    if (RoomChat.renderMessages._mdc) return;
    var orig = RoomChat.renderMessages.bind(RoomChat);
    RoomChat.renderMessages = function () {
      orig();
      document.querySelectorAll(".author").forEach(function (el) {
        if (isMdc(el.textContent)) el.classList.add("mdc-glow");
      });
    };
    RoomChat.renderMessages._mdc = true;
  }

  function boot() {
    patchAuth();
    patchEnter();
    patchRender();
    patchRoomMessages();
    // If already logged in as MDC
    try {
      var session = localStorage.getItem("dc_session");
      if (isMdc(session)) {
        grantPlus();
        setTimeout(applyRedGlow, 200);
      }
    } catch (e) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  setInterval(function () {
    patchAuth();
    patchEnter();
    patchRender();
    patchRoomMessages();
  }, 2000);
})();
