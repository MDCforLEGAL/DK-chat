// Robust settings open/close + no text select on buttons
(function () {
  function $(id) {
    return document.getElementById(id);
  }

  function setVal(id, val) {
    var el = $(id);
    if (!el) return;
    if (el.tagName === "INPUT" || el.tagName === "SELECT" || el.tagName === "TEXTAREA") {
      if (el.type === "checkbox") el.checked = !!val;
      else el.value = val == null ? "" : val;
    } else {
      el.textContent = val == null ? "" : val;
    }
  }

  window.openSettings = function () {
    var modal = $("settings-modal");
    if (!modal) {
      alert("Ayarlar bulunamadı");
      return;
    }

    try {
      var u = typeof state !== "undefined" ? state.currentUser : null;
      if (u) {
        setVal("settings-username", u.username);
        setVal("settings-email", u.email || "");
        setVal("settings-displayname", u.displayName || u.username);
        setVal("settings-avatar", u.avatar);
        setVal("settings-status", u.status || "online");
        setVal("settings-display-name", u.displayName || u.username);
        setVal("settings-tag", "#" + (u.tag || "0001"));
        setVal("settings-avatar-preview", u.avatar);
      }
      if (typeof state !== "undefined") {
        var compact = $("compact-mode");
        if (compact) compact.checked = !!state.compact;
        document.querySelectorAll(".theme-card").forEach(function (c) {
          c.classList.toggle("active", c.dataset.theme === state.theme);
        });
      }
      if (typeof showSettingsSection === "function") {
        showSettingsSection("account");
      } else {
        document.querySelectorAll(".settings-section").forEach(function (s) {
          s.classList.remove("active");
        });
        var acc = $("section-account");
        if (acc) acc.classList.add("active");
      }
    } catch (e) {
      console.warn("settings fill", e);
    }

    modal.classList.add("open");
    // Ensure visible on mobile
    modal.style.display = "flex";
  };

  window.closeSettings = function () {
    var modal = $("settings-modal");
    if (modal) {
      modal.classList.remove("open");
      modal.style.display = "";
    }
  };

  window.showSettingsSection = function (section) {
    document.querySelectorAll(".settings-section").forEach(function (s) {
      s.classList.remove("active");
    });
    document.querySelectorAll(".nav-item[data-section]").forEach(function (n) {
      n.classList.remove("active");
    });
    var sec = $("section-" + section);
    if (sec) sec.classList.add("active");
    var nav = document.querySelector('.nav-item[data-section="' + section + '"]');
    if (nav) nav.classList.add("active");
  };

  function bindSettingsButtons() {
    // Bottom bar settings (3rd button often)
    var bar = $("mobile-bottom-bar");
    if (bar) {
      var btns = bar.querySelectorAll("button");
      btns.forEach(function (btn) {
        var t = (btn.getAttribute("title") || "").toLowerCase();
        if (t.indexOf("ayar") >= 0 || t.indexOf("setting") >= 0 || btn.textContent.indexOf("⚙") >= 0) {
          btn.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            window.openSettings();
          };
        }
      });
    }

    // Header + user panel
    document.querySelectorAll('button[title="Settings"], #btn-settings').forEach(function (btn) {
      btn.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.openSettings();
      };
    });

    document.querySelectorAll(".settings-close").forEach(function (btn) {
      btn.onclick = function (e) {
        e.preventDefault();
        var modal = btn.closest(".modal");
        if (modal) {
          modal.classList.remove("open");
          modal.style.display = "";
        }
      };
    });

    // Backdrop
    var sm = $("settings-modal");
    if (sm) {
      sm.addEventListener("click", function (e) {
        if (e.target === sm) window.closeSettings();
      });
    }
  }

  function init() {
    bindSettingsButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  setTimeout(init, 600);
  setTimeout(init, 1500);
})();
