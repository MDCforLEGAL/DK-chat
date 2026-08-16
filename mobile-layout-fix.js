// Mobile layout cleanup
(function () {
  function cleanProfileSection() {
    var section = document.getElementById("section-profile");
    if (!section) return;

    // Remove frame options block
    section.querySelectorAll(".form-group").forEach(function (g) {
      var label = g.querySelector("label");
      if (label && /frame|çerçeve|cerceve/i.test(label.textContent || "")) {
        g.remove();
      }
      // Also remove if contains frame-options
      if (g.querySelector(".frame-options")) g.remove();
    });
    var fo = section.querySelector("#frame-options");
    if (fo) {
      var parent = fo.closest(".form-group") || fo;
      parent.remove();
    }

    // Remove pencil / edit buttons inside profile section
    section.querySelectorAll(".pe-edit-btn").forEach(function (b) {
      b.remove();
    });

    // Keep a single clear "Profili Düzenle" button instead of pencil in this tab
    if (!section.querySelector(".pe-open-full")) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "auth-btn pe-open-full";
      btn.textContent = "Profili Düzenle";
      btn.style.marginTop = "8px";
      btn.addEventListener("click", function () {
        if (typeof openProfileEditor === "function") openProfileEditor();
      });
      // place before save button if exists
      var save = section.querySelector('button[onclick*="saveProfile"], button.auth-btn');
      if (save) section.insertBefore(btn, save);
      else section.appendChild(btn);
    }
  }

  function swapBottomBar() {
    var bar = document.getElementById("mobile-bottom-bar");
    if (!bar || bar.dataset.swapped === "1") return;

    var buttons = Array.prototype.slice.call(bar.querySelectorAll("button"));
    if (buttons.length < 3) return;

    // Find settings and menu by title/onclick
    var settingsBtn = null;
    var menuBtn = null;
    buttons.forEach(function (b) {
      var t = (b.getAttribute("title") || "").toLowerCase();
      var oc = b.getAttribute("onclick") || "";
      if (t.indexOf("ayar") >= 0 || t.indexOf("setting") >= 0 || oc.indexOf("openSettings") >= 0) {
        settingsBtn = b;
      }
      if (t.indexOf("menü") >= 0 || t.indexOf("menu") >= 0 || oc.indexOf("toggleChannels") >= 0) {
        menuBtn = b;
      }
    });

    if (!settingsBtn || !menuBtn || settingsBtn === menuBtn) return;

    // Desired order: Menu, Room, Settings, Members
    var roomBtn = null;
    var membersBtn = null;
    buttons.forEach(function (b) {
      var t = (b.getAttribute("title") || "").toLowerCase();
      var oc = b.getAttribute("onclick") || "";
      if (t.indexOf("oda") >= 0 || oc.indexOf("openRoomModal") >= 0) roomBtn = b;
      if (t.indexOf("üye") >= 0 || t.indexOf("member") >= 0 || oc.indexOf("toggleMembers") >= 0) membersBtn = b;
    });

    bar.innerHTML = "";
    [menuBtn, roomBtn, settingsBtn, membersBtn].forEach(function (b) {
      if (b) bar.appendChild(b);
    });
    bar.dataset.swapped = "1";
  }

  function hideDuplicateHeaderIcons() {
    // Hide top header-actions (already in bottom bar)
    var style = document.getElementById("mobile-layout-fix-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "mobile-layout-fix-style";
      style.textContent =
        "@media (max-width: 768px) {" +
        "  .header-actions { display: none !important; }" +
        "  .chat-header .mobile-menu-btn { display: none !important; }" +
        "}";
      document.head.appendChild(style);
    }
  }

  // Prevent profile-editor from injecting pencil into profile section
  function patchProfileEditorInject() {
    // Remove pencils that get re-added
    document.querySelectorAll("#section-profile .pe-edit-btn").forEach(function (b) {
      b.remove();
    });
  }

  function boot() {
    cleanProfileSection();
    swapBottomBar();
    hideDuplicateHeaderIcons();
    patchProfileEditorInject();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  // Re-run when settings open
  var origOpen = window.openSettings;
  window.openSettings = function () {
    if (typeof origOpen === "function") origOpen();
    setTimeout(function () {
      cleanProfileSection();
      patchProfileEditorInject();
    }, 100);
  };

  setInterval(function () {
    swapBottomBar();
    hideDuplicateHeaderIcons();
    patchProfileEditorInject();
  }, 2000);
})();
