// Discord-style loading splash
(function () {
  var MIN_MS = 1400;
  var start = Date.now();

  function hide() {
    var el = document.getElementById("loading-screen");
    if (!el) return;
    el.classList.add("hide");
    setTimeout(function () {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }, 500);
  }

  function ready() {
    var left = MIN_MS - (Date.now() - start);
    if (left > 0) setTimeout(hide, left);
    else hide();
  }

  if (document.readyState === "complete") ready();
  else window.addEventListener("load", ready);

  // Safety: never stay forever
  setTimeout(hide, 5000);
})();
