// Mobile UI - ensure all buttons work with touch
(function () {
  function safe(fn) {
    return function (e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      try {
        fn();
      } catch (err) {
        console.error(err);
      }
    };
  }

  // Ensure global functions exist
  if (typeof window.openSettings !== "function") {
    window.openSettings = function () {
      var m = document.getElementById("settings-modal");
      if (m) m.classList.add("open");
    };
  }
  if (typeof window.closeSettings !== "function") {
    window.closeSettings = function () {
      var m = document.getElementById("settings-modal");
      if (m) m.classList.remove("open");
    };
  }
  if (typeof window.openRoomModal !== "function") {
    window.openRoomModal = function () {
      var m = document.getElementById("room-modal");
      if (m) m.classList.add("open");
    };
  }
  if (typeof window.closeRoomModal !== "function") {
    window.closeRoomModal = function () {
      var m = document.getElementById("room-modal");
      if (m) m.classList.remove("open");
    };
  }
  if (typeof window.openPlusPurchase !== "function") {
    window.openPlusPurchase = function () {
      var m = document.getElementById("plus-purchase-modal");
      if (m) m.classList.add("open");
    };
  }
  if (typeof window.closePlusPurchase !== "function") {
    window.closePlusPurchase = function () {
      var m = document.getElementById("plus-purchase-modal");
      if (m) m.classList.remove("open");
    };
  }

  window.toggleChannels = function () {
    var panel = document.getElementById("channels-panel");
    var overlay = document.getElementById("channels-overlay");
    var members = document.getElementById("members-panel");
    if (!panel) return;
    var open = panel.classList.toggle("open");
    if (overlay) overlay.classList.toggle("open", open);
    if (members) members.classList.remove("open");
  };

  window.toggleMembers = function () {
    var panel = document.getElementById("members-panel");
    var overlay = document.getElementById("channels-overlay");
    var channels = document.getElementById("channels-panel");
    if (!panel) return;
    panel.classList.remove("hidden");
    var open = panel.classList.toggle("open");
    if (overlay) overlay.classList.toggle("open", open);
    if (channels) channels.classList.remove("open");
  };

  window.closeMobileMenus = function () {
    var ch = document.getElementById("channels-panel");
    var mem = document.getElementById("members-panel");
    var ov = document.getElementById("channels-overlay");
    if (ch) ch.classList.remove("open");
    if (mem) mem.classList.remove("open");
    if (ov) ov.classList.remove("open");
  };

  function bindBar() {
    var bar = document.getElementById("mobile-bottom-bar");
    if (!bar) return;

    // Re-bind with touch-friendly handlers
    var buttons = bar.querySelectorAll("button");
    if (buttons.length >= 4) {
      buttons[0].onclick = safe(function () {
        window.toggleChannels();
      });
      buttons[1].onclick = safe(function () {
        window.openRoomModal();
      });
      buttons[2].onclick = safe(function () {
        window.openSettings();
      });
      buttons[3].onclick = safe(function () {
        window.toggleMembers();
      });
    }
  }

  function bindHeader() {
    document.querySelectorAll(".header-actions button").forEach(function (btn) {
      var title = (btn.getAttribute("title") || "").toLowerCase();
      if (title.indexOf("oda") >= 0 || title.indexOf("room") >= 0) {
        btn.onclick = safe(function () {
          window.openRoomModal();
        });
      } else if (title.indexOf("plus") >= 0) {
        btn.onclick = safe(function () {
          window.openPlusPurchase();
        });
      } else if (title.indexOf("setting") >= 0 || title.indexOf("ayar") >= 0) {
        btn.onclick = safe(function () {
          window.openSettings();
        });
      } else if (title.indexOf("member") >= 0 || title.indexOf("üye") >= 0) {
        btn.onclick = safe(function () {
          window.toggleMembers();
        });
      }
    });

    var menuBtn = document.querySelector(".mobile-menu-btn");
    if (menuBtn) {
      menuBtn.onclick = safe(function () {
        window.toggleChannels();
      });
    }

    var setBtn = document.getElementById("btn-settings");
    if (setBtn) {
      setBtn.onclick = safe(function () {
        window.openSettings();
      });
    }
  }

  function init() {
    bindBar();
    bindHeader();

    // Modal backdrop close
    document.querySelectorAll(".modal").forEach(function (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) modal.classList.remove("open");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  // Re-bind after enterApp might rewrite DOM
  setTimeout(init, 800);
  setTimeout(init, 2000);
})();
