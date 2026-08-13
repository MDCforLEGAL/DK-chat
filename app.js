// ========== DATA ==========
const defaultServers = {
  home: {
    name: "Ana Sayfa",
    channels: [
      { id: "hosgeldin", name: "hoşgeldin", type: "text" },
      { id: "duyurular", name: "duyurular", type: "text" },
      { id: "genel", name: "genel", type: "text" }
    ]
  },
  oyun: {
    name: "Oyun Dünyası",
    channels: [
      { id: "genel", name: "genel", type: "text" },
      { id: "fps", name: "fps-oyunlar", type: "text" },
      { id: "moba", name: "moba", type: "text" },
      { id: "lol", name: "league-of-legends", type: "text" }
    ]
  },
  muzik: {
    name: "Müzik & Sohbet",
    channels: [
      { id: "genel", name: "genel", type: "text" },
      { id: "oneri", name: "şarkı-önerileri", type: "text" },
      { id: "playlist", name: "playlist", type: "text" }
    ]
  },
  kod: {
    name: "Kod & Teknoloji",
    channels: [
      { id: "genel", name: "genel", type: "text" },
      { id: "js", name: "javascript", type: "text" },
      { id: "python", name: "python", type: "text" },
      { id: "yardim", name: "yardım", type: "text" }
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

const sampleMessages = {
  "home-genel": [
    { id: 1, author: "Grok", avatar: "G", color: "#5865f2", text: "Merhaba! Bu Discord klonuna hoş geldiniz 👋", time: "Bugün saat 14:20" },
    { id: 2, author: "Ayşe", avatar: "A", color: "#eb459e", text: "Harika görünüyor! Siyah tema çok güzel.", time: "Bugün saat 14:22" },
    { id: 3, author: "Mehmet", avatar: "M", color: "#57f287", text: "Mesajlar localStorage'da saklanıyor, sayfayı yenilesen bile kalıyor.", time: "Bugün saat 14:25" }
  ],
  "home-hosgeldin": [
    { id: 1, author: "Grok", avatar: "G", color: "#5865f2", text: "Sunucuya hoş geldin! Kuralları oku ve eğlen 🎉", time: "Dün saat 10:00" }
  ],
  "oyun-genel": [
    { id: 1, author: "Burak", avatar: "B", color: "#3498db", text: "Bu akşam Valorant var mı?", time: "Bugün saat 18:00" },
    { id: 2, author: "Zeynep", avatar: "Z", color: "#fee75c", text: "Ben varım!", time: "Bugün saat 18:05" }
  ],
  "kod-genel": [
    { id: 1, author: "Grok", avatar: "G", color: "#5865f2", text: "JavaScript ile Discord klonu yapmak eğlenceli 😄", time: "Bugün saat 12:00" }
  ]
};

// ========== STATE ==========
let state = {
  currentServer: "home",
  currentChannel: "genel",
  username: localStorage.getItem("dc_username") || "Kullanıcı",
  avatar: localStorage.getItem("dc_avatar") || "U",
  muted: false,
  deafened: false,
  membersVisible: true,
  servers: JSON.parse(localStorage.getItem("dc_servers")) || structuredClone(defaultServers),
  messages: JSON.parse(localStorage.getItem("dc_messages")) || structuredClone(sampleMessages)
};

// ========== HELPERS ==========
function saveMessages() {
  localStorage.setItem("dc_messages", JSON.stringify(state.messages));
}

function saveServers() {
  localStorage.setItem("dc_servers", JSON.stringify(state.servers));
}

function getKey() {
  return `${state.currentServer}-${state.currentChannel}`;
}

function formatTime() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  return `Bugün saat ${h}:${m}`;
}

// ========== RENDER ==========
function renderChannels() {
  const server = state.servers[state.currentServer];
  document.getElementById("server-name").textContent = server.name;

  const list = document.getElementById("text-channels");
  list.innerHTML = "";

  server.channels.forEach(ch => {
    const div = document.createElement("div");
    div.className = "channel" + (ch.id === state.currentChannel ? " active" : "");
    div.innerHTML = `<span class="icon">#</span> ${ch.name}`;
    div.onclick = () => switchChannel(ch.id);
    list.appendChild(div);
  });
}

function renderMessages() {
  const key = getKey();
  const msgs = state.messages[key] || [];
  const container = document.getElementById("messages");
  container.innerHTML = "";

  if (msgs.length === 0) {
    const empty = document.createElement("div");
    empty.className = "message system";
    empty.innerHTML = `<div class="text">Bu kanalda henüz mesaj yok. İlk mesajı sen yaz! 🚀</div>`;
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
  document.getElementById("current-channel").textContent = state.currentChannel;
  document.getElementById("message-input").placeholder = `#${state.currentChannel} kanalına mesaj gönder`;
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

  online.forEach(m => {
    onlineEl.appendChild(createMemberEl(m));
  });
  offline.forEach(m => {
    offlineEl.appendChild(createMemberEl(m));
  });
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
  document.getElementById("username").textContent = state.username;
  document.getElementById("user-avatar").textContent = state.avatar;
  document.getElementById("user-avatar").style.background = "#5865f2";
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
  if (!text) return;

  const key = getKey();
  if (!state.messages[key]) state.messages[key] = [];

  const msg = {
    id: Date.now(),
    author: state.username,
    avatar: state.avatar,
    color: "#5865f2",
    text: text,
    time: formatTime()
  };

  state.messages[key].push(msg);
  saveMessages();
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
  if (state.deafened) {
    // also mute
    const mic = document.querySelector(".user-controls button");
    if (!state.muted) toggleMute(mic);
  }
}

function toggleMembers() {
  state.membersVisible = !state.membersVisible;
  document.getElementById("members-panel").classList.toggle("hidden", !state.membersVisible);
}

function openSettings() {
  document.getElementById("settings-username").value = state.username;
  document.getElementById("settings-avatar").value = state.avatar;
  document.getElementById("settings-modal").classList.add("open");
}

function closeSettings() {
  document.getElementById("settings-modal").classList.remove("open");
}

function saveSettings() {
  const name = document.getElementById("settings-username").value.trim() || "Kullanıcı";
  const av = (document.getElementById("settings-avatar").value.trim() || "U").charAt(0).toUpperCase();
  state.username = name;
  state.avatar = av;
  localStorage.setItem("dc_username", name);
  localStorage.setItem("dc_avatar", av);
  renderUser();
  closeSettings();
}

function openAddServer() {
  document.getElementById("new-server-name").value = "";
  document.getElementById("add-server-modal").classList.add("open");
}

function closeAddServer() {
  document.getElementById("add-server-modal").classList.remove("open");
}

function createServer() {
  const name = document.getElementById("new-server-name").value.trim();
  if (!name) return;

  const id = "s" + Date.now();
  state.servers[id] = {
    name: name,
    channels: [
      { id: "genel", name: "genel", type: "text" },
      { id: "sohbet", name: "sohbet", type: "text" }
    ]
  };
  saveServers();

  // Add icon to UI
  const serversEl = document.querySelector(".servers");
  const addBtn = document.querySelector(".server-icon.add");
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
  // Server clicks
  document.querySelectorAll(".server-icon[data-server]").forEach(el => {
    el.onclick = () => switchServer(el.dataset.server);
  });

  // Add server
  document.querySelector(".server-icon.add").onclick = openAddServer;

  // Enter to send
  document.getElementById("message-input").addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Close modals on outside click
  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", e => {
      if (e.target === modal) {
        modal.classList.remove("open");
      }
    });
  });

  renderUser();
  renderChannels();
  renderMessages();
  renderMembers();
});
