// ========== I18N ==========
const translations = {
  tr: {
    welcomeBack: "Tekrar hoş geldin!",
    weMissedYou: "Seni özledik!",
    createAccount: "Hesap Oluştur",
    login: "Giriş Yap",
    register: "Kayıt Ol",
    username: "KULLANICI ADI",
    email: "E-POSTA",
    password: "ŞİFRE",
    noAccount: "Hesabın yok mu?",
    haveAccount: "Zaten hesabın var mı?",
    textChannels: "METİN KANALLARI",
    voiceChannels: "SES KANALLARI",
    general: "Genel",
    music: "Müzik",
    online: "Çevrimiçi",
    offline: "Çevrimdışı",
    members: "Üyeler",
    searchPlaceholder: "Ara...",
    myAccount: "Hesabım",
    userProfile: "Kullanıcı Profili",
    appearance: "Görünüm",
    language: "Dil",
    logOut: "Çıkış Yap",
    saveChanges: "Değişiklikleri Kaydet",
    displayName: "Görünen Ad",
    avatarLetter: "Avatar Harfi",
    status: "Durum",
    idle: "Boşta",
    dnd: "Rahatsız Etme",
    invisible: "Görünmez",
    theme: "Tema",
    dark: "Koyu",
    darker: "Daha Koyu",
    messageDisplay: "Mesaj Görünümü",
    compactMode: "Kompakt Mod",
    createServer: "Sunucu Oluştur",
    createServerDesc: "Sunucun, sen ve arkadaşlarının takıldığı yerdir.",
    serverName: "Sunucu Adı",
    cancel: "İptal",
    create: "Oluştur",
    emptyChannel: "Bu kanalda henüz mesaj yok. İlk mesajı sen yaz! 🚀",
    invalidLogin: "Kullanıcı adı veya şifre hatalı.",
    userExists: "Bu kullanıcı adı zaten alınmış.",
    passwordShort: "Şifre en az 4 karakter olmalı.",
    fillFields: "Lütfen tüm alanları doldur.",
    welcomeMsg: "Merhaba! Bu Discord klonuna hoş geldin 👋",
    msgSaved: "Mesajlar tarayıcıda saklanıyor.",
    today: "Bugün saat"
  },
  en: {
    welcomeBack: "Welcome back!",
    weMissedYou: "We're so excited to see you again!",
    createAccount: "Create an account",
    login: "Log In",
    register: "Register",
    username: "USERNAME",
    email: "EMAIL",
    password: "PASSWORD",
    noAccount: "Need an account?",
    haveAccount: "Already have an account?",
    textChannels: "TEXT CHANNELS",
    voiceChannels: "VOICE CHANNELS",
    general: "General",
    music: "Music",
    online: "Online",
    offline: "Offline",
    members: "Members",
    searchPlaceholder: "Search",
    myAccount: "My Account",
    userProfile: "User Profile",
    appearance: "Appearance",
    language: "Language",
    logOut: "Log Out",
    saveChanges: "Save Changes",
    displayName: "Display Name",
    avatarLetter: "Avatar Letter",
    status: "Status",
    idle: "Idle",
    dnd: "Do Not Disturb",
    invisible: "Invisible",
    theme: "Theme",
    dark: "Dark",
    darker: "Darker",
    messageDisplay: "Message Display",
    compactMode: "Compact Mode",
    createServer: "Create a Server",
    createServerDesc: "Your server is where you and your friends hang out.",
    serverName: "Server Name",
    cancel: "Cancel",
    create: "Create",
    emptyChannel: "This channel is empty. Be the first to send a message! 🚀",
    invalidLogin: "Invalid username or password.",
    userExists: "This username is already taken.",
    passwordShort: "Password must be at least 4 characters.",
    fillFields: "Please fill in all fields.",
    welcomeMsg: "Hello! Welcome to this Discord clone 👋",
    msgSaved: "Messages are stored in your browser.",
    today: "Today at"
  }
};

// ========== DATA ==========
const defaultServers = {
  home: {
    name: { tr: "Ana Sayfa", en: "Home" },
    channels: [
      { id: "hosgeldin", name: { tr: "hoşgeldin", en: "welcome" }, type: "text" },
      { id: "duyurular", name: { tr: "duyurular", en: "announcements" }, type: "text" },
      { id: "genel", name: { tr: "genel", en: "general" }, type: "text" }
    ]
  },
  oyun: {
    name: { tr: "Oyun Dünyası", en: "Gaming" },
    channels: [
      { id: "genel", name: { tr: "genel", en: "general" }, type: "text" },
      { id: "fps", name: { tr: "fps-oyunlar", en: "fps-games" }, type: "text" },
      { id: "moba", name: { tr: "moba", en: "moba" }, type: "text" },
      { id: "lol", name: { tr: "league-of-legends", en: "league-of-legends" }, type: "text" }
    ]
  },
  muzik: {
    name: { tr: "Müzik & Sohbet", en: "Music & Chat" },
    channels: [
      { id: "genel", name: { tr: "genel", en: "general" }, type: "text" },
      { id: "oneri", name: { tr: "şarkı-önerileri", en: "song-suggestions" }, type: "text" },
      { id: "playlist", name: { tr: "playlist", en: "playlist" }, type: "text" }
    ]
  },
  kod: {
    name: { tr: "Kod & Teknoloji", en: "Coding & Tech" },
    channels: [
      { id: "genel", name: { tr: "genel", en: "general" }, type: "text" },
      { id: "js", name: { tr: "javascript", en: "javascript" }, type: "text" },
      { id: "python", name: { tr: "python", en: "python" }, type: "text" },
      { id: "yardim", name: { tr: "yardım", en: "help" }, type: "text" }
    ]
  }
};

const defaultMembers = [
  { id: 1, name: "Grok", avatar: "G", online: true, color: "#5865f2" },
  { id: 2, name: "Ayşe", avatar: "A", online: true, color: "#eb459e" },
  { id: 3, name: "Mehmet", avatar: "M", online: true, color: "#57f287" },
  { id: 4, name: "Zeynep", avatar: "Z", online: true, color: "#fee75c" },
  { id: 5, name: "Can", avatar: "C", online: false, color: "#ed4245" },
  { id: 6, name: "Elif", avatar: "E", online: false, color: "#9b59b6" },
  { id: 7, name: "Burak", avatar: "B", online: true, color: "#3498db" },
  { id: 8, name: "Selin", avatar: "S", online: false, color: "#e67e22" }
];

function getSampleMessages(lang) {
  const t = translations[lang];
  return {
    "home-genel": [
      { id: 1, author: "Grok", avatar: "G", color: "#5865f2", text: t.welcomeMsg, time: t.today + " 14:20" },
      { id: 2, author: "Ayşe", avatar: "A", color: "#eb459e", text: lang === "tr" ? "Harika görünüyor! Siyah tema çok güzel." : "Looks amazing! Love the dark theme.", time: t.today + " 14:22" },
      { id: 3, author: "Mehmet", avatar: "M", color: "#57f287", text: t.msgSaved, time: t.today + " 14:25" }
    ],
    "home-hosgeldin": [
      { id: 1, author: "Grok", avatar: "G", color: "#5865f2", text: lang === "tr" ? "Sunucuya hoş geldin! Kuralları oku ve eğlen 🎉" : "Welcome to the server! Read the rules and have fun 🎉", time: lang === "tr" ? "Dün saat 10:00" : "Yesterday at 10:00" }
    ],
    "oyun-genel": [
      { id: 1, author: "Burak", avatar: "B", color: "#3498db", text: lang === "tr" ? "Bu akşam Valorant var mı?" : "Anyone up for Valorant tonight?", time: t.today + " 18:00" },
      { id: 2, author: "Zeynep", avatar: "Z", color: "#fee75c", text: lang === "tr" ? "Ben varım!" : "I'm in!", time: t.today + " 18:05" }
    ],
    "kod-genel": [
      { id: 1, author: "Grok", avatar: "G", color: "#5865f2", text: lang === "tr" ? "JavaScript ile Discord klonu yapmak eğlenceli 😄" : "Building a Discord clone with JS is fun 😄", time: t.today + " 12:00" }
    ]
  };
}

// ========== STATE ==========
let state = {
  lang: localStorage.getItem("dc_lang") || "tr",
  currentServer: "home",
  currentChannel: "genel",
  currentUser: null,
  muted: false,
  deafened: false,
  membersVisible: true,
  theme: localStorage.getItem("dc_theme") || "dark",
  compact: localStorage.getItem("dc_compact") === "true",
  servers: null,
  messages: null,
  authMode: "login"
};

// ========== ACCOUNT SYSTEM ==========
function getAccounts() {
  return JSON.parse(localStorage.getItem("dc_accounts") || "{}");
}

function saveAccounts(accounts) {
  localStorage.setItem("dc_accounts", JSON.stringify(accounts));
}

function getCurrentSession() {
  return localStorage.getItem("dc_session");
}

function setSession(username) {
  localStorage.setItem("dc_session", username);
}

function clearSession() {
  localStorage.removeItem("dc_session");
}

function hashPass(pass) {
  let h = 0;
  for (let i = 0; i < pass.length; i++) {
    h = ((h << 5) - h) + pass.charCodeAt(i);
    h |= 0;
  }
  return "h" + Math.abs(h).toString(36);
}

function register(username, email, password) {
  const t = translations[state.lang];
  if (!username || !password) return t.fillFields;
  if (password.length < 4) return t.passwordShort;
  const accounts = getAccounts();
  const key = username.toLowerCase();
  if (accounts[key]) return t.userExists;

  accounts[key] = {
    username: username,
    email: email || "",
    password: hashPass(password),
    avatar: username.charAt(0).toUpperCase(),
    displayName: username,
    status: "online",
    tag: String(Math.floor(Math.random() * 9999)).padStart(4, "0"),
    createdAt: Date.now()
  };
  saveAccounts(accounts);
  return null;
}

function login(username, password) {
  const t = translations[state.lang];
  const accounts = getAccounts();
  const key = username.toLowerCase();
  const acc = accounts[key];
  if (!acc || acc.password !== hashPass(password)) return t.invalidLogin;
  return null;
}

function getUserData(username) {
  return getAccounts()[username.toLowerCase()] || null;
}

function updateUserData(username, data) {
  const accounts = getAccounts();
  const key = username.toLowerCase();
  if (accounts[key]) {
    Object.assign(accounts[key], data);
    saveAccounts(accounts);
  }
}

// ========== I18N APPLY ==========
function t(key) {
  return translations[state.lang][key] || key;
}

function applyLanguage() {
  const lang = state.lang;
  document.documentElement.lang = lang;

  document.getElementById("auth-title").textContent = state.authMode === "login" ? t("welcomeBack") : t("createAccount");
  document.getElementById("auth-subtitle").textContent = state.authMode === "login" ? t("weMissedYou") : "";
  document.getElementById("tab-login").textContent = t("login");
  document.getElementById("tab-register").textContent = t("register");
  document.getElementById("label-username").textContent = t("username");
  document.getElementById("label-email").textContent = t("email");
  document.getElementById("label-password").textContent = t("password");
  document.getElementById("auth-submit").textContent = state.authMode === "login" ? t("login") : t("register");
  document.getElementById("auth-switch-text").textContent = state.authMode === "login" ? t("noAccount") : t("haveAccount");
  document.getElementById("auth-switch-link").textContent = state.authMode === "login" ? t("register") : t("login");

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang][key]) el.placeholder = translations[lang][key];
  });

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  if (state.currentUser) {
    renderChannels();
    renderMessages();
    renderUser();
  }
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem("dc_lang", lang);
  applyLanguage();
}

// ========== RENDER ==========
function getServerName(server) {
  if (!server) return "";
  if (typeof server.name === "object") return server.name[state.lang] || server.name.en;
  return server.name;
}

function getChannelName(ch) {
  if (typeof ch.name === "object") return ch.name[state.lang] || ch.name.en;
  return ch.name;
}

function renderChannels() {
  const server = state.servers[state.currentServer];
  if (!server) return;
  document.getElementById("server-name").textContent = getServerName(server);

  const list = document.getElementById("text-channels");
  list.innerHTML = "";

  server.channels.forEach(ch => {
    const div = document.createElement("div");
    div.className = "channel" + (ch.id === state.currentChannel ? " active" : "");
    div.innerHTML = `<span class="icon">#</span> ${getChannelName(ch)}`;
    div.onclick = () => switchChannel(ch.id);
    list.appendChild(div);
  });
}

function renderMessages() {
  const key = `${state.currentServer}-${state.currentChannel}`;
  const msgs = state.messages[key] || [];
  const container = document.getElementById("messages");
  container.innerHTML = "";

  if (msgs.length === 0) {
    const empty = document.createElement("div");
    empty.className = "message system";
    empty.innerHTML = `<div class="text">${t("emptyChannel")}</div>`;
    container.appendChild(empty);
  } else {
    msgs.forEach(msg => {
      const div = document.createElement("div");
      div.className = "message";
      div.innerHTML = `
        <div class="avatar-msg" style="background:${msg.color || '#5865f2'}">${msg.avatar}</div>
        <div class="content">
          <div class="header-msg">
            <span class="author">${msg.author}</span>
            <span class="timestamp">${msg.time}</span>
          </div>
          <div class="text">${escapeHtml(msg.text)}</div>
        </div>
      `;
      container.appendChild(div);
    });
  }

  container.scrollTop = container.scrollHeight;
  const ch = state.servers[state.currentServer]?.channels.find(c => c.id === state.currentChannel);
  document.getElementById("current-channel").textContent = ch ? getChannelName(ch) : state.currentChannel;
  document.getElementById("message-input").placeholder = `#${document.getElementById("current-channel").textContent}`;
}

function renderMembers() {
  const online = defaultMembers.filter(m => m.online);
  const offline = defaultMembers.filter(m => !m.online);

  document.getElementById("member-count").textContent = defaultMembers.length;
  document.getElementById("online-count").textContent = online.length;
  document.getElementById("offline-count").textContent = offline.length;

  const onlineEl = document.getElementById("online-members");
  const offlineEl = document.getElementById("offline-members");
  onlineEl.innerHTML = "";
  offlineEl.innerHTML = "";

  online.forEach(m => onlineEl.appendChild(createMemberEl(m)));
  offline.forEach(m => offlineEl.appendChild(createMemberEl(m)));
}

function createMemberEl(m) {
  const div = document.createElement("div");
  div.className = "member";
  div.innerHTML = `
    <div class="avatar-small ${m.online ? 'online' : ''}" style="background:${m.color}">${m.avatar}</div>
    <div class="name">${m.name}</div>
  `;
  return div;
}

function renderUser() {
  if (!state.currentUser) return;
  const u = state.currentUser;
  document.getElementById("username").textContent = u.displayName || u.username;
  document.getElementById("user-avatar").textContent = u.avatar;
  document.getElementById("user-status-text").textContent = t(u.status || "online");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ========== ACTIONS ==========
function switchServer(serverId) {
  if (!state.servers[serverId]) return;
  state.currentServer = serverId;
  state.currentChannel = state.servers[serverId].channels[0].id;

  document.querySelectorAll(".server-icon").forEach(el => {
    el.classList.toggle("active", el.dataset.server === serverId);
  });

  renderChannels();
  renderMessages();
}

function switchChannel(channelId) {
  state.currentChannel = channelId;
  renderChannels();
  renderMessages();
}

function sendMessage() {
  const input = document.getElementById("message-input");
  const text = input.value.trim();
  if (!text || !state.currentUser) return;

  const key = `${state.currentServer}-${state.currentChannel}`;
  if (!state.messages[key]) state.messages[key] = [];

  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");

  const msg = {
    id: Date.now(),
    author: state.currentUser.displayName || state.currentUser.username,
    avatar: state.currentUser.avatar,
    color: "#5865f2",
    text: text,
    time: `${t("today")} ${h}:${m}`
  };

  state.messages[key].push(msg);
  localStorage.setItem("dc_messages_" + state.currentUser.username.toLowerCase(), JSON.stringify(state.messages));
  input.value = "";
  renderMessages();
}

function toggleSection(el) {
  el.classList.toggle("collapsed");
  const list = el.nextElementSibling;
  list.style.display = list.style.display === "none" ? "flex" : "none";
}

function toggleMute(btn) {
  state.muted = !state.muted;
  btn.classList.toggle("muted", state.muted);
  btn.textContent = state.muted ? "🔇" : "🎤";
}

function toggleDeafen(btn) {
  state.deafened = !state.deafened;
  btn.classList.toggle("muted", state.deafened);
  btn.textContent = state.deafened ? "🔇" : "🎧";
  if (state.deafened && !state.muted) {
    const mic = document.getElementById("btn-mute");
    toggleMute(mic);
  }
}

function toggleMembers() {
  state.membersVisible = !state.membersVisible;
  document.getElementById("members-panel").classList.toggle("hidden", !state.membersVisible);
}

// ========== SETTINGS ==========
function openSettings() {
  if (!state.currentUser) return;
  const u = state.currentUser;
  document.getElementById("settings-username").value = u.username;
  document.getElementById("settings-email").value = u.email || "";
  document.getElementById("settings-displayname").value = u.displayName || u.username;
  document.getElementById("settings-avatar").value = u.avatar;
  document.getElementById("settings-status").value = u.status || "online";
  document.getElementById("settings-display-name").textContent = u.displayName || u.username;
  document.getElementById("settings-tag").textContent = "#" + (u.tag || "0001");
  document.getElementById("settings-avatar-preview").textContent = u.avatar;
  document.getElementById("compact-mode").checked = state.compact;

  document.querySelectorAll(".theme-card").forEach(c => {
    c.classList.toggle("active", c.dataset.theme === state.theme);
  });

  showSettingsSection("account");
  document.getElementById("settings-modal").classList.add("open");
}

function closeSettings() {
  document.getElementById("settings-modal").classList.remove("open");
}

function showSettingsSection(section) {
  document.querySelectorAll(".settings-section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-item[data-section]").forEach(n => n.classList.remove("active"));
  document.getElementById("section-" + section)?.classList.add("active");
  document.querySelector(`.nav-item[data-section="${section}"]`)?.classList.add("active");
}

function saveAccountSettings() {
  if (!state.currentUser) return;
  const email = document.getElementById("settings-email").value.trim();
  updateUserData(state.currentUser.username, { email });
  state.currentUser.email = email;
  closeSettings();
}

function saveProfileSettings() {
  if (!state.currentUser) return;
  const displayName = document.getElementById("settings-displayname").value.trim() || state.currentUser.username;
  const avatar = (document.getElementById("settings-avatar").value.trim() || "U").charAt(0).toUpperCase();
  const status = document.getElementById("settings-status").value;

  updateUserData(state.currentUser.username, { displayName, avatar, status });
  state.currentUser.displayName = displayName;
  state.currentUser.avatar = avatar;
  state.currentUser.status = status;

  renderUser();
  document.getElementById("settings-display-name").textContent = displayName;
  document.getElementById("settings-avatar-preview").textContent = avatar;
  closeSettings();
}

function setTheme(theme) {
  state.theme = theme;
  localStorage.setItem("dc_theme", theme);
  document.body.classList.toggle("theme-darker", theme === "darker");
  document.querySelectorAll(".theme-card").forEach(c => {
    c.classList.toggle("active", c.dataset.theme === theme);
  });
}

function toggleCompact() {
  state.compact = document.getElementById("compact-mode").checked;
  localStorage.setItem("dc_compact", state.compact);
  document.body.classList.toggle("compact", state.compact);
}

// ========== AUTH ==========
function switchAuthTab(mode) {
  state.authMode = mode;
  document.querySelectorAll(".auth-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.tab === mode);
  });
  const emailGroup = document.getElementById("email-group");
  if (emailGroup) {
    emailGroup.style.display = mode === "register" ? "block" : "none";
  }
  const errorEl = document.getElementById("auth-error");
  if (errorEl) errorEl.textContent = "";
  applyLanguage();
  const link = document.getElementById("auth-switch-link");
  if (link) {
    link.onclick = (e) => {
      e.preventDefault();
      switchAuthTab(mode === "login" ? "register" : "login");
    };
  }
}

function handleAuth(e) {
  e.preventDefault();
  const username = document.getElementById("auth-username").value.trim();
  const password = document.getElementById("auth-password").value;
  const email = document.getElementById("auth-email").value.trim();
  const errorEl = document.getElementById("auth-error");

  let err = null;
  if (state.authMode === "register") {
    err = register(username, email, password);
  } else {
    err = login(username, password);
  }

  if (err) {
    errorEl.textContent = err;
    return false;
  }

  setSession(username);
  enterApp(username);
  return false;
}

function enterApp(username) {
  const user = getUserData(username);
  if (!user) return;

  state.currentUser = user;
  state.servers = JSON.parse(localStorage.getItem("dc_servers_" + username.toLowerCase())) || JSON.parse(JSON.stringify(defaultServers));
  state.messages = JSON.parse(localStorage.getItem("dc_messages_" + username.toLowerCase())) || getSampleMessages(state.lang);

  document.getElementById("auth-screen").style.display = "none";
  document.getElementById("main-app").style.display = "flex";

  setTheme(state.theme);
  document.body.classList.toggle("compact", state.compact);

  applyLanguage();
  renderUser();
  renderChannels();
  renderMessages();
  renderMembers();
}

function logout() {
  clearSession();
  state.currentUser = null;
  document.getElementById("settings-modal").classList.remove("open");
  document.getElementById("main-app").style.display = "none";
  document.getElementById("auth-screen").style.display = "flex";
  document.getElementById("auth-username").value = "";
  document.getElementById("auth-password").value = "";
  document.getElementById("auth-error").textContent = "";
  switchAuthTab("login");
}

// ========== SERVER ==========
function openAddServer() {
  document.getElementById("new-server-name").value = "";
  document.getElementById("add-server-modal").classList.add("open");
}

function closeAddServer() {
  document.getElementById("add-server-modal").classList.remove("open");
}

function createServer() {
  const name = document.getElementById("new-server-name").value.trim();
  if (!name || !state.currentUser) return;

  const id = "s" + Date.now();
  state.servers[id] = {
    name: { tr: name, en: name },
    channels: [
      { id: "genel", name: { tr: "genel", en: "general" }, type: "text" },
      { id: "sohbet", name: { tr: "sohbet", en: "chat" }, type: "text" }
    ]
  };
  localStorage.setItem("dc_servers_" + state.currentUser.username.toLowerCase(), JSON.stringify(state.servers));

  const serversEl = document.querySelector(".servers");
  const addBtn = document.getElementById("add-server-btn");
  const icon = document.createElement("div");
  icon.className = "server-icon";
  icon.dataset.server = id;
  icon.title = name;
  icon.style.background = getRandomColor();
  icon.textContent = name.charAt(0).toUpperCase();
  icon.onclick = () => switchServer(id);
  serversEl.insertBefore(icon, addBtn);

  closeAddServer();
  switchServer(id);
}

function getRandomColor() {
  const colors = ["#5865f2", "#eb459e", "#57f287", "#fee75c", "#ed4245", "#9b59b6", "#3498db", "#e67e22"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".auth-tab").forEach(tab => {
    tab.onclick = () => switchAuthTab(tab.dataset.tab);
  });

  document.querySelectorAll(".server-icon[data-server]").forEach(el => {
    el.onclick = () => switchServer(el.dataset.server);
  });
  document.getElementById("add-server-btn").onclick = openAddServer;

  document.getElementById("message-input").addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", e => {
      if (e.target === modal) modal.classList.remove("open");
    });
  });

  document.body.classList.toggle("theme-darker", state.theme === "darker");
  document.body.classList.toggle("compact", state.compact);

  applyLanguage();
  switchAuthTab("login");

  const session = getCurrentSession();
  if (session && getUserData(session)) {
    enterApp(session);
  }
});
