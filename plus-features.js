// Plus features extension
(function(){
  const PLUS_URL = "https://mdcforlegal.github.io/personal-links/";
  if (typeof state !== "undefined") {
    state.nameEffect = localStorage.getItem("dc_name_fx") || "none";
    state.bannerStyle = localStorage.getItem("dc_banner") || "default";
  }

  window.openPlusPurchase = function() {
    const m = document.getElementById("plus-purchase-modal");
    if (m) m.classList.add("open");
  };
  window.closePlusPurchase = function() {
    const m = document.getElementById("plus-purchase-modal");
    if (m) m.classList.remove("open");
  };

  window.setNameEffect = function(fx) {
    if (typeof state === "undefined") return;
    if (!state.plus && fx !== "none") { openPlusPurchase(); return; }
    state.nameEffect = fx;
    localStorage.setItem("dc_name_fx", fx);
    document.querySelectorAll(".name-fx-btn").forEach(b => b.classList.toggle("active", b.dataset.fx === fx));
    if (typeof renderUser === "function") renderUser();
    applyNameEffectDOM();
  };

  window.setBannerStyle = function(style) {
    if (typeof state === "undefined") return;
    if (!state.plus && style !== "default") { openPlusPurchase(); return; }
    state.bannerStyle = style;
    localStorage.setItem("dc_banner", style);
    document.querySelectorAll(".banner-fx-btn").forEach(b => b.classList.toggle("active", b.dataset.banner === style));
    applyBannerDOM();
  };

  function applyNameEffectDOM() {
    const nameEl = document.getElementById("username");
    if (!nameEl || typeof state === "undefined") return;
    let span = nameEl.querySelector(".name-text");
    if (!span) {
      const text = (state.currentUser && (state.currentUser.displayName || state.currentUser.username)) || nameEl.textContent.replace(/PLUS/g,"").trim();
      nameEl.innerHTML = "";
      span = document.createElement("span");
      span.className = "name-text";
      span.textContent = text;
      nameEl.appendChild(span);
      if (state.plus) {
        const badge = document.createElement("span");
        badge.className = "plus-badge";
        badge.textContent = "PLUS";
        nameEl.appendChild(badge);
      }
    }
    span.className = "name-text";
    if (state.plus && state.nameEffect && state.nameEffect !== "none") {
      span.classList.add("name-fx-" + state.nameEffect);
    }
  }

  function applyBannerDOM() {
    if (typeof state === "undefined") return;
    const style = state.plus ? state.bannerStyle : "default";
    document.querySelectorAll(".account-banner, .profile-banner").forEach(el => {
      const base = el.classList.contains("profile-banner") ? "profile-banner" : "account-banner";
      el.className = base;
      if (style && style !== "default") el.classList.add("banner-" + style);
      else el.classList.add("banner-wave");
    });
  }

  // Enhance renderUser if exists
  const _origRender = window.renderUser;
  if (typeof _origRender === "function") {
    window.renderUser = function() {
      _origRender();
      applyNameEffectDOM();
      applyBannerDOM();
    };
  }

  // Activate plus after returning from purchase (demo: long-press or query)
  window.activatePlusDemo = function() {
    if (typeof state === "undefined") return;
    state.plus = true;
    localStorage.setItem("dc_plus", "true");
    if (typeof updatePlusUI === "function") updatePlusUI();
    if (typeof renderUser === "function") renderUser();
    applyBannerDOM();
    alert("DK Plus aktif! ✨");
  };

  document.addEventListener("DOMContentLoaded", function() {
    // Default animated banner for account cards
    document.querySelectorAll(".account-banner").forEach(el => {
      if (!el.className.includes("banner-")) el.classList.add("banner-wave");
    });
    // Close purchase modal on backdrop
    const pm = document.getElementById("plus-purchase-modal");
    if (pm) pm.addEventListener("click", function(e) {
      if (e.target === pm) closePlusPurchase();
    });
    // Hook Plus buttons
    document.querySelectorAll("[onclick*='openPlusPurchase'], .plus-buy-open").forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        openPlusPurchase();
      });
    });
    setTimeout(function() {
      if (typeof state !== "undefined" && state.plus) {
        applyNameEffectDOM();
        applyBannerDOM();
      } else {
        applyBannerDOM();
      }
    }, 500);
  });
})();
