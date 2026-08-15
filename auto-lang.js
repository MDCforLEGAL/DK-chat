// Otomatik dil tespiti: tarayıcı dili + ülke (IP)
(function () {
  var STORAGE_KEY = "dc_lang";
  var MANUAL_KEY = "dc_lang_manual"; // kullanıcı elle seçtiyse bir daha zorla değişme

  // Ülke kodu → dil
  var countryToLang = {
    TR: "tr",
    CY: "tr", // KKTC / Kıbrıs Türkçe ağırlıklı
    AZ: "tr",
    // diğerleri İngilizce
    US: "en",
    GB: "en",
    AU: "en",
    CA: "en",
    DE: "en",
    FR: "en",
    NL: "en",
    SE: "en",
    NO: "en",
    FI: "en",
    PL: "en",
    IT: "en",
    ES: "en",
    PT: "en",
    BR: "en",
    RU: "en",
    UA: "en",
    JP: "en",
    KR: "en",
    CN: "en",
    IN: "en",
    SA: "en",
    AE: "en",
    EG: "en"
  };

  function browserLang() {
    var list = navigator.languages || [navigator.language || navigator.userLanguage || "en"];
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i] || "").toLowerCase();
      if (code.indexOf("tr") === 0) return "tr";
    }
    return "en";
  }

  function applyLang(lang) {
    if (lang !== "tr" && lang !== "en") lang = "en";
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    if (typeof window.setLanguage === "function") {
      window.setLanguage(lang);
    } else if (typeof state !== "undefined") {
      state.lang = lang;
      if (typeof applyLanguage === "function") applyLanguage();
    }

    // Ayarlardaki dil butonlarını güncelle
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  function detectFromIP(fallback) {
    // Ücretsiz, CORS açık API
    var urls = [
      "https://ipapi.co/json/",
      "https://ip-api.com/json/?fields=status,countryCode"
    ];

    function tryUrl(i) {
      if (i >= urls.length) {
        applyLang(fallback);
        return;
      }
      var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
      var timer = setTimeout(function () {
        if (ctrl) ctrl.abort();
      }, 2500);

      fetch(urls[i], ctrl ? { signal: ctrl.signal } : undefined)
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          clearTimeout(timer);
          var cc = (data.country_code || data.countryCode || "").toUpperCase();
          if (cc && countryToLang[cc]) {
            applyLang(countryToLang[cc]);
          } else if (cc === "TR") {
            applyLang("tr");
          } else {
            applyLang(fallback);
          }
        })
        .catch(function () {
          clearTimeout(timer);
          tryUrl(i + 1);
        });
    }

    tryUrl(0);
  }

  function run() {
    // Kullanıcı daha önce elle dil seçtiyse dokunma
    try {
      if (localStorage.getItem(MANUAL_KEY) === "1") return;
    } catch (e) {}

    var fromBrowser = browserLang();

    // Önce tarayıcı dilini uygula (anında), sonra ülke ile doğrula
    applyLang(fromBrowser);
    detectFromIP(fromBrowser);
  }

  // setLanguage'i sarmala: elle seçim = manual
  function patchSetLanguage() {
    if (typeof window.setLanguage !== "function") return;
    if (window.setLanguage._autoPatched) return;
    var orig = window.setLanguage;
    window.setLanguage = function (lang) {
      try {
        localStorage.setItem(MANUAL_KEY, "1");
      } catch (e) {}
      return orig(lang);
    };
    window.setLanguage._autoPatched = true;
  }

  function init() {
    patchSetLanguage();
    run();
    // app.js geç yüklenebilir
    setTimeout(patchSetLanguage, 500);
    setTimeout(function () {
      patchSetLanguage();
      // Hâlâ manual değilse ve dil set edilmediyse tekrar dene
      try {
        if (localStorage.getItem(MANUAL_KEY) !== "1") run();
      } catch (e) {}
    }, 1500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
