// UI fixes: frames + message MDC glow + Plus badge
(function () {
  function isMdcName(name) {
    return String(name || "").trim().toLowerCase() === "mdc";
  }

  function hasPlus() {
    try {
      if (typeof state !== "undefined" && state.plus) return true;
      return localStorage.getItem("dc_plus") === "true";
    } catch (e) {
      return false;
    }
  }

  function getFrame() {
    try {
      if (typeof state !== "undefined" && state.avatarFrame) return state.avatarFrame;
      return localStorage.getItem("dc_frame") || "none";
    } catch (e) {
      return "none";
    }
  }

  // ===== FRAME SELECTION =====
  window.selectFrame = function (frame) {
    frame = frame || "none";
    // Plus required for premium frames
    var premium = ["glow", "rainbow", "pulse", "gold", "fire"];
    if (premium.indexOf(frame) >= 0 && !hasPlus() && !isMdcName((state && state.currentUser && state.currentUser.username) || "")) {
      if (typeof openPlusPurchase === "function") openPlusPurchase();
      return;
    }
    try {
      localStorage.setItem("dc_frame", frame);
      if (typeof state !== "undefined") state.avatarFrame = frame;
      if (state && state.currentUser) {
        state.currentUser.frame = frame;
        if (typeof updateUserData === "function") {
          updateUserData(state.currentUser.username, { frame: frame });
        }
      }
    } catch (e) {}

    document.querySelectorAll(".frame-option").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-frame") === frame);
    });
    applyFrameToAvatars(frame);
  };

  function applyFrameToAvatars(frame) {
    frame = frame || getFrame();
    var wraps = document.querySelectorAll("#user-avatar-wrap, #settings-avatar-wrap, .avatar-wrap");
    wraps.forEach(function (w) {
      w.classList.remove("frame-none", "frame-glow", "frame-rainbow", "frame-pulse", "frame-gold", "frame-fire");
      w.classList.add("frame-" + (frame || "none"));
    });
  }

  // Hook saveProfileSettings to also save frame
  function patchSaveProfile() {
    if (typeof window.saveProfileSettings !== "function" || window.saveProfileSettings._frame) return;
    var orig = window.saveProfileSettings;
    window.saveProfileSettings = function () {
      orig();
      var frame = getFrame();
      if (state && state.currentUser) {
        state.currentUser.frame = frame;
        if (typeof updateUserData === "function") {
          updateUserData(state.currentUser.username, { frame: frame });
        }
      }
      applyFrameToAvatars(frame);
    };
    window.saveProfileSettings._frame = true;
  }

  // When opening settings, highlight current frame
  function patchOpenSettings() {
    if (typeof window.openSettings !== "function" || window.openSettings._frame) return;
    var orig = window.openSettings;
    window.openSettings = function () {
      orig();
      setTimeout(function () {
        var frame = getFrame();
        document.querySelectorAll(".frame-option").forEach(function (el) {
          el.classList.toggle("active", el.getAttribute("data-frame") === frame);
        });
        // Ensure click handlers
        document.querySelectorAll(".frame-option").forEach(function (el) {
          if (el._frameBound) return;
          el._frameBound = true;
          el.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var f = el.getAttribute("data-frame") || "none";
            selectFrame(f);
          });
        });
      }, 80);
    };
    window.openSettings._frame = true;
  }

  // ===== MESSAGE RENDER: MDC glow + PLUS badge =====
  function authorHtml(name, isPlus, isOwner) {
    var cls = "author";
    if (isOwner || isMdcName(name)) cls += " mdc-glow";
    var html = '<span class="' + cls + '">' + escapeFx(name) + "</span>";
    if (isPlus || isOwner || isMdcName(name)) {
      html += '<span class="plus-badge msg-plus">PLUS</span>';
    }
    return html;
  }

  function escapeFx(text) {
    var d = document.createElement("div");
    d.textContent = text == null ? "" : String(text);
    return d.innerHTML;
  }

  function patchRoomChat() {
    if (!window.RoomChat) return;

    // Enrich getMyInfo
    if (typeof RoomChat.getMyInfo === "function" && !RoomChat.getMyInfo._plus) {
      var origInfo = RoomChat.getMyInfo.bind(RoomChat);
      RoomChat.getMyInfo = function () {
        var info = origInfo();
        info.plus = hasPlus() || isMdcName(info.name);
        info.owner = isMdcName(info.name);
        info.frame = getFrame();
        if (isMdcName(info.name)) info.name = "MDC";
        return info;
      };
      RoomChat.getMyInfo._plus = true;
    }

    // Enrich sendChat payload
    if (typeof RoomChat.sendChat === "function" && !RoomChat.sendChat._plus) {
      var origSend = RoomChat.sendChat.bind(RoomChat);
      RoomChat.sendChat = function (text) {
        if (!text || !this.peer) return false;
        var me = this.getMyInfo();
        var now = new Date();
        var h = now.getHours().toString().padStart(2, "0");
        var m = now.getMinutes().toString().padStart(2, "0");
        var msg = {
          id: Date.now() + Math.random(),
          author: me.name,
          avatar: me.avatar,
          color: me.color,
          text: text,
          time: "Bugün saat " + h + ":" + m,
          peerId: this.myId,
          plus: !!me.plus,
          owner: !!me.owner,
          frame: me.frame || "none"
        };
        this.messages.push(msg);
        this.renderMessages();

        var payload = { type: "chat", msg: msg };
        if (this.isHost) {
          this.broadcast(payload);
        } else {
          var hostId = "dk-" + this.roomCode;
          var conn = this.connections[hostId] || Object.values(this.connections)[0];
          if (conn) {
            try {
              conn.send(payload);
            } catch (e) {}
          }
        }
        return true;
      };
      RoomChat.sendChat._plus = true;
    }

    // Custom render with glow + badge
    if (typeof RoomChat.renderMessages === "function" && !RoomChat.renderMessages._plus) {
      RoomChat.renderMessages = function () {
        var container = document.getElementById("messages");
        if (!container) return;
        container.innerHTML = "";

        if (!this.messages || this.messages.length === 0) {
          var empty = document.createElement("div");
          empty.className = "message system";
          empty.innerHTML = '<div class="text">Oda boş. İlk mesajı sen yaz! 🚀</div>';
          container.appendChild(empty);
        } else {
          this.messages.forEach(function (msg) {
            var div = document.createElement("div");
            if (msg.system) {
              div.className = "message system";
              div.innerHTML = '<div class="text">' + escapeFx(msg.text) + "</div>";
            } else {
              var owner = !!msg.owner || isMdcName(msg.author);
              var plus = !!msg.plus || owner;
              var frameClass = msg.frame && msg.frame !== "none" ? " frame-" + msg.frame : "";
              div.className = "message";
              div.innerHTML =
                '<div class="avatar-msg' +
                frameClass +
                '" style="background:' +
                (msg.color || "#5865f2") +
                '">' +
                escapeFx(msg.avatar || "?") +
                '</div><div class="content"><div class="header-msg">' +
                authorHtml(msg.author, plus, owner) +
                '<span class="timestamp">' +
                escapeFx(msg.time || "") +
                '</span></div><div class="text">' +
                escapeFx(msg.text) +
                "</div></div>";
            }
            container.appendChild(div);
          });
        }
        container.scrollTop = container.scrollHeight;
      };
      RoomChat.renderMessages._plus = true;
    }
  }

  // Also patch local app.js renderMessages if used outside room
  function patchAppMessages() {
    if (typeof window.renderMessages !== "function" || window.renderMessages._plus) return;
    var orig = window.renderMessages;
    window.renderMessages = function () {
      orig();
      // Enhance authors in DOM
      document.querySelectorAll(".message .author").forEach(function (el) {
        var name = el.textContent.trim();
        if (isMdcName(name)) {
          el.classList.add("mdc-glow");
          if (!el.parentNode.querySelector(".msg-plus")) {
            var b = document.createElement("span");
            b.className = "plus-badge msg-plus";
            b.textContent = "PLUS";
            el.insertAdjacentElement("afterend", b);
          }
        }
      });
    };
    window.renderMessages._plus = true;
  }

  function boot() {
    if (typeof state !== "undefined") {
      state.avatarFrame = getFrame();
      if (hasPlus()) state.plus = true;
    }
    patchSaveProfile();
    patchOpenSettings();
    patchRoomChat();
    patchAppMessages();
    applyFrameToAvatars(getFrame());

    // Bind frame options even without settings open
    document.querySelectorAll(".frame-option").forEach(function (el) {
      if (el._frameBound) return;
      el._frameBound = true;
      el.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        selectFrame(el.getAttribute("data-frame") || "none");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  setInterval(function () {
    patchSaveProfile();
    patchOpenSettings();
    patchRoomChat();
    patchAppMessages();
  }, 1500);
})();
