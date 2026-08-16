// Her Cuma DK Plus %40 indirim + MDC owner loader
(function () {
  // Load MDC owner module
  if (!document.querySelector('script[src="extra-load.js"]')) {
    var s = document.createElement("script");
    s.src = "extra-load.js";
    (document.body || document.documentElement).appendChild(s);
  }

  var MONTHLY = 2.5;
  var ANNUAL = 6.6;
  var DISCOUNT = 0.4;

  function isFriday() {
    return new Date().getDay() === 5;
  }

  function formatPrice(n) {
    return "$" + n.toFixed(2);
  }

  function applyDeal() {
    var monthlyEl = document.querySelector(".plus-plan.monthly .plan-price");
    var annualEl = document.querySelector(".plus-plan.yearly .plan-price");
    var badgeHost = document.querySelector(".plus-purchase-hero");
    var note = document.querySelector(".plus-purchase-note");

    document.querySelectorAll(".friday-deal-badge").forEach(function (el) {
      el.remove();
    });

    if (isFriday()) {
      var mDisc = MONTHLY * (1 - DISCOUNT);
      var aDisc = ANNUAL * (1 - DISCOUNT);

      if (monthlyEl) {
        monthlyEl.innerHTML =
          '<span style="text-decoration:line-through;opacity:0.6;font-size:14px;margin-right:6px;">' +
          formatPrice(MONTHLY) +
          "</span> " +
          formatPrice(mDisc) +
          " / ay";
      }
      if (annualEl) {
        annualEl.innerHTML =
          '<span style="text-decoration:line-through;opacity:0.6;font-size:14px;margin-right:6px;">' +
          formatPrice(ANNUAL) +
          "</span> " +
          formatPrice(aDisc) +
          " / yıl";
      }

      if (badgeHost && !badgeHost.querySelector(".friday-deal-badge")) {
        var b = document.createElement("div");
        b.className = "friday-deal-badge";
        b.textContent = "🔥 Cuma Fırsatı — %40 İNDİRİM";
        b.style.cssText =
          "margin:10px auto 0;display:inline-block;background:linear-gradient(90deg,#f47fff,#5865f2);color:#fff;font-size:12px;font-weight:700;padding:6px 12px;border-radius:20px;";
        badgeHost.appendChild(b);
      }

      if (note) {
        note.textContent = "Cuma özel: %40 indirim bugün geçerli!";
        note.style.color = "#f47fff";
      }
    } else {
      if (monthlyEl) monthlyEl.textContent = formatPrice(MONTHLY) + " / ay";
      if (annualEl) annualEl.textContent = formatPrice(ANNUAL) + " / yıl";
      if (note) {
        note.textContent = "Ödeme sayfasına yönlendirileceksin · Her Cuma %40 indirim!";
        note.style.color = "";
      }
    }
  }

  var origOpen = window.openPlusPurchase;
  window.openPlusPurchase = function () {
    if (typeof origOpen === "function") origOpen();
    else {
      var m = document.getElementById("plus-purchase-modal");
      if (m) m.classList.add("open");
    }
    setTimeout(applyDeal, 50);
  };

  function init() {
    applyDeal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  setTimeout(init, 800);
})();
