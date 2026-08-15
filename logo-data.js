// DK Logo - SVG path (no base64)
window.DK_LOGO_DATA = "logo.svg";
(function () {
  function apply() {
    document.querySelectorAll("img[data-dk-logo]").forEach(function (el) {
      el.src = "logo.svg";
      el.alt = "";
      el.style.objectFit = "cover";
      el.style.display = "block";
      el.style.width = "100%";
      el.style.height = "100%";
      el.style.background = "#5865f2";
    });
  }
  apply();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply);
  window.addEventListener("load", apply);
  setTimeout(apply, 50);
  setTimeout(apply, 300);
})();
