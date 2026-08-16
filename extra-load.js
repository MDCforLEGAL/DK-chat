// Load extras
(function () {
  function loadCss(href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    document.head.appendChild(l);
  }
  function loadJs(src) {
    if (document.querySelector('script[src="' + src + '"]')) return;
    var s = document.createElement("script");
    s.src = src;
    (document.body || document.documentElement).appendChild(s);
  }
  loadCss("mdc-owner.css");
  loadCss("ui-fixes.css");
  loadCss("profile-editor.css");
  loadJs("mdc-owner.js");
  loadJs("ui-fixes.js");
  loadJs("profile-editor.js");
  loadJs("mobile-layout-fix.js");
})();
