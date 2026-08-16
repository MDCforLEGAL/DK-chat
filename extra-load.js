// Load MDC owner styles + script
(function () {
  if (!document.querySelector('link[href="mdc-owner.css"]')) {
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "mdc-owner.css";
    document.head.appendChild(l);
  }
  if (!document.querySelector('script[src="mdc-owner.js"]')) {
    var s = document.createElement("script");
    s.src = "mdc-owner.js";
    document.body.appendChild(s);
  }
})();
