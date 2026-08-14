// Prevent home/channel switch from wiping room chat
(function () {
  window.goHome = function () {
    // Just highlight home — do NOT clear room messages
    document.querySelectorAll(".server-icon").forEach(function (el) {
      el.classList.toggle("active", el.dataset.server === "home");
    });
    if (typeof RoomChat !== "undefined" && RoomChat.roomCode) {
      RoomChat.renderMessages();
      RoomChat.updateMembersUI();
      var ch = document.getElementById("current-channel");
      if (ch) ch.textContent = "oda-" + RoomChat.roomCode;
      return;
    }
    // Not in room — show empty prompt, don't invent fake chat
    var container = document.getElementById("messages");
    if (container) {
      container.innerHTML =
        '<div class="message system"><div class="text">🔗 Oda oluştur veya koda katıl</div></div>';
    }
  };

  // Override switchServer so it never wipes active room
  var tries = 0;
  function patch() {
    if (typeof window.switchServer === "function") {
      var orig = window.switchServer;
      window.switchServer = function (id) {
        if (typeof RoomChat !== "undefined" && RoomChat.roomCode) {
          goHome();
          return;
        }
        try {
          orig(id);
        } catch (e) {}
        goHome();
      };
    } else if (tries++ < 20) {
      setTimeout(patch, 100);
    }

    if (typeof window.renderMessages === "function") {
      var origRM = window.renderMessages;
      window.renderMessages = function () {
        if (typeof RoomChat !== "undefined" && RoomChat.roomCode) {
          RoomChat.renderMessages();
          return;
        }
        origRM();
      };
    }

    if (typeof window.renderMembers === "function") {
      var origMem = window.renderMembers;
      window.renderMembers = function () {
        if (typeof RoomChat !== "undefined" && RoomChat.roomCode) {
          RoomChat.updateMembersUI();
          return;
        }
        // No fake members
        var onlineEl = document.getElementById("online-members");
        var offlineEl = document.getElementById("offline-members");
        if (onlineEl) onlineEl.innerHTML = "";
        if (offlineEl) offlineEl.innerHTML = "";
        var mc = document.getElementById("member-count");
        var oc = document.getElementById("online-count");
        var ofc = document.getElementById("offline-count");
        if (mc) mc.textContent = "0";
        if (oc) oc.textContent = "0";
        if (ofc) ofc.textContent = "0";
      };
    }

    // Disable server icon clicks that call switchServer on non-home
    document.querySelectorAll(".server-icon[data-server]").forEach(function (el) {
      el.onclick = function () {
        goHome();
      };
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", patch);
  } else {
    patch();
  }
})();
