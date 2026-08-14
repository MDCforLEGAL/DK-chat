// Real room chat via PeerJS (P2P)
// Host creates room with code, others join with code

const RoomChat = {
  peer: null,
  connections: {}, // peerId -> DataConnection
  isHost: false,
  roomCode: null,
  peers: {}, // peerId -> { name, avatar, color }
  messages: [],
  myId: null,

  generateCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  },

  getMyInfo() {
    const u = (typeof state !== "undefined" && state.currentUser) ? state.currentUser : null;
    return {
      name: u ? (u.displayName || u.username) : "Anonim",
      avatar: u ? u.avatar : "?",
      color: "#5865f2"
    };
  },

  createRoom(onReady, onError) {
    this.leaveRoom();
    const code = this.generateCode();
    this.roomCode = code;
    this.isHost = true;
    this.messages = [];
    this.peers = {};
    this.connections = {};

    if (typeof Peer === "undefined") {
      if (onError) onError("PeerJS yüklenemedi. İnternet bağlantını kontrol et.");
      return;
    }

    try {
      this.peer = new Peer("dk-" + code, {
        host: "0.peerjs.com",
        port: 443,
        path: "/",
        secure: true,
        debug: 0
      });
    } catch (e) {
      if (onError) onError("Oda açılamadı: " + e.message);
      return;
    }

    this.peer.on("open", (id) => {
      this.myId = id;
      const me = this.getMyInfo();
      this.peers[id] = me;
      this.updateMembersUI();
      this.addSystemMessage("Oda oluşturuldu. Kod: " + code);
      if (onReady) onReady(code);
    });

    this.peer.on("connection", (conn) => {
      this.setupConnection(conn);
    });

    this.peer.on("error", (err) => {
      console.error("Peer error", err);
      if (err.type === "unavailable-id") {
        // Retry with new code
        this.createRoom(onReady, onError);
      } else if (onError) {
        onError("Bağlantı hatası: " + (err.message || err.type || "bilinmiyor"));
      }
    });
  },

  joinRoom(code, onReady, onError) {
    this.leaveRoom();
    code = (code || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (code.length < 4) {
      if (onError) onError("Geçersiz kod");
      return;
    }
    this.roomCode = code;
    this.isHost = false;
    this.messages = [];
    this.peers = {};
    this.connections = {};

    if (typeof Peer === "undefined") {
      if (onError) onError("PeerJS yüklenemedi.");
      return;
    }

    try {
      this.peer = new Peer({
        host: "0.peerjs.com",
        port: 443,
        path: "/",
        secure: true,
        debug: 0
      });
    } catch (e) {
      if (onError) onError("Bağlanılamadı: " + e.message);
      return;
    }

    this.peer.on("open", (id) => {
      this.myId = id;
      const me = this.getMyInfo();
      this.peers[id] = me;

      const conn = this.peer.connect("dk-" + code, { reliable: true });
      this.setupConnection(conn);

      conn.on("open", () => {
        conn.send({ type: "join", user: me });
        this.addSystemMessage("Odaya katıldın: " + code);
        if (onReady) onReady(code);
      });

      conn.on("error", () => {
        if (onError) onError("Oda bulunamadı veya kapalı. Kod doğru mu?");
      });
    });

    this.peer.on("error", (err) => {
      if (onError) onError("Bağlantı hatası: " + (err.message || err.type || ""));
    });
  },

  setupConnection(conn) {
    conn.on("open", () => {
      this.connections[conn.peer] = conn;
      // Host sends current peer list + recent messages
      if (this.isHost) {
        conn.send({
          type: "sync",
          peers: this.peers,
          messages: this.messages.slice(-50)
        });
      }
    });

    conn.on("data", (data) => {
      this.handleData(conn, data);
    });

    conn.on("close", () => {
      const p = this.peers[conn.peer];
      delete this.connections[conn.peer];
      delete this.peers[conn.peer];
      this.updateMembersUI();
      if (p) this.addSystemMessage((p.name || "Birisi") + " ayrıldı");
    });
  },

  handleData(conn, data) {
    if (!data || !data.type) return;

    if (data.type === "join") {
      this.peers[conn.peer] = data.user;
      this.updateMembersUI();
      this.addSystemMessage((data.user.name || "Birisi") + " katıldı");
      // Host broadcasts join to others
      if (this.isHost) {
        this.broadcast({ type: "peer-join", peerId: conn.peer, user: data.user }, conn.peer);
      }
    }

    if (data.type === "sync") {
      if (data.peers) Object.assign(this.peers, data.peers);
      if (data.messages && Array.isArray(data.messages)) {
        this.messages = data.messages;
        this.renderMessages();
      }
      this.updateMembersUI();
    }

    if (data.type === "peer-join") {
      this.peers[data.peerId] = data.user;
      this.updateMembersUI();
      this.addSystemMessage((data.user.name || "Birisi") + " katıldı");
    }

    if (data.type === "chat") {
      this.messages.push(data.msg);
      this.renderMessages();
      // Host relays to other peers
      if (this.isHost) {
        this.broadcast(data, conn.peer);
      }
    }
  },

  broadcast(data, excludePeerId) {
    Object.keys(this.connections).forEach((pid) => {
      if (pid === excludePeerId) return;
      try {
        this.connections[pid].send(data);
      } catch (e) {}
    });
  },

  sendChat(text) {
    if (!text || !this.peer) return false;
    const me = this.getMyInfo();
    const now = new Date();
    const h = now.getHours().toString().padStart(2, "0");
    const m = now.getMinutes().toString().padStart(2, "0");
    const msg = {
      id: Date.now() + Math.random(),
      author: me.name,
      avatar: me.avatar,
      color: me.color,
      text: text,
      time: "Bugün saat " + h + ":" + m,
      peerId: this.myId
    };
    this.messages.push(msg);
    this.renderMessages();

    const payload = { type: "chat", msg: msg };
    if (this.isHost) {
      this.broadcast(payload);
    } else {
      // Send to host only
      const hostId = "dk-" + this.roomCode;
      const conn = this.connections[hostId] || Object.values(this.connections)[0];
      if (conn) {
        try { conn.send(payload); } catch (e) {}
      }
    }
    return true;
  },

  addSystemMessage(text) {
    this.messages.push({
      id: Date.now() + Math.random(),
      system: true,
      text: text,
      time: ""
    });
    this.renderMessages();
  },

  renderMessages() {
    const container = document.getElementById("messages");
    if (!container) return;
    container.innerHTML = "";

    if (this.messages.length === 0) {
      const empty = document.createElement("div");
      empty.className = "message system";
      empty.innerHTML = '<div class="text">Oda boş. İlk mesajı sen yaz! 🚀</div>';
      container.appendChild(empty);
    } else {
      this.messages.forEach((msg) => {
        const div = document.createElement("div");
        if (msg.system) {
          div.className = "message system";
          div.innerHTML = '<div class="text">' + escapeRoomHtml(msg.text) + "</div>";
        } else {
          div.className = "message";
          div.innerHTML =
            '<div class="avatar-msg" style="background:' + (msg.color || "#5865f2") + '">' +
            escapeRoomHtml(msg.avatar || "?") +
            '</div><div class="content"><div class="header-msg"><span class="author">' +
            escapeRoomHtml(msg.author) +
            '</span><span class="timestamp">' +
            escapeRoomHtml(msg.time || "") +
            '</span></div><div class="text">' +
            escapeRoomHtml(msg.text) +
            "</div></div>";
        }
        container.appendChild(div);
      });
    }
    container.scrollTop = container.scrollHeight;
  },

  updateMembersUI() {
    const list = Object.keys(this.peers).map((pid) => ({
      id: pid,
      name: this.peers[pid].name,
      avatar: this.peers[pid].avatar,
      color: this.peers[pid].color || "#5865f2",
      online: true
    }));

    const onlineEl = document.getElementById("online-members");
    const offlineEl = document.getElementById("offline-members");
    const countEl = document.getElementById("member-count");
    const onlineCount = document.getElementById("online-count");
    const offlineCount = document.getElementById("offline-count");

    if (countEl) countEl.textContent = list.length;
    if (onlineCount) onlineCount.textContent = list.length;
    if (offlineCount) offlineCount.textContent = "0";
    if (offlineEl) offlineEl.innerHTML = "";

    if (onlineEl) {
      onlineEl.innerHTML = "";
      list.forEach((m) => {
        const div = document.createElement("div");
        div.className = "member";
        div.innerHTML =
          '<div class="avatar-small online" style="background:' +
          m.color +
          '">' +
          escapeRoomHtml(m.avatar) +
          '</div><div class="name">' +
          escapeRoomHtml(m.name) +
          (m.id === this.myId ? " (sen)" : "") +
          "</div>";
        onlineEl.appendChild(div);
      });
    }

    // Room code badge
    const badge = document.getElementById("room-code-badge");
    if (badge) {
      if (this.roomCode) {
        badge.style.display = "flex";
        badge.querySelector(".code-text").textContent = this.roomCode;
      } else {
        badge.style.display = "none";
      }
    }
  },

  leaveRoom() {
    Object.values(this.connections).forEach((c) => {
      try { c.close(); } catch (e) {}
    });
    if (this.peer) {
      try { this.peer.destroy(); } catch (e) {}
    }
    this.peer = null;
    this.connections = {};
    this.peers = {};
    this.messages = [];
    this.roomCode = null;
    this.isHost = false;
    this.myId = null;
    this.updateMembersUI();
  }
};

function escapeRoomHtml(text) {
  const d = document.createElement("div");
  d.textContent = text == null ? "" : String(text);
  return d.innerHTML;
}

// Hook into sendMessage
(function () {
  const origSend = window.sendMessage;
  window.sendMessage = function () {
    const input = document.getElementById("message-input");
    const text = input ? input.value.trim() : "";
    if (!text) return;

    if (RoomChat.peer && RoomChat.roomCode) {
      RoomChat.sendChat(text);
      if (input) input.value = "";
      return;
    }

    // No room: local only (no fake people)
    if (typeof origSend === "function") origSend();
  };

  // Clear fake members when app starts
  const origEnter = window.enterApp;
  if (typeof origEnter === "function") {
    window.enterApp = function (username) {
      origEnter(username);
      // Clear sample messages
      if (typeof state !== "undefined") {
        state.messages = {};
        try {
          localStorage.setItem("dc_messages_" + username.toLowerCase(), "{}");
        } catch (e) {}
      }
      const container = document.getElementById("messages");
      if (container) {
        container.innerHTML =
          '<div class="message system"><div class="text">Oda oluştur veya kod ile katıl — sahte sohbet yok. 🔗</div></div>';
      }
      // Clear fake members
      const onlineEl = document.getElementById("online-members");
      const offlineEl = document.getElementById("offline-members");
      if (onlineEl) onlineEl.innerHTML = "";
      if (offlineEl) offlineEl.innerHTML = "";
      const mc = document.getElementById("member-count");
      const oc = document.getElementById("online-count");
      const ofc = document.getElementById("offline-count");
      if (mc) mc.textContent = "0";
      if (oc) oc.textContent = "0";
      if (ofc) ofc.textContent = "0";
    };
  }

  window.openRoomModal = function () {
    document.getElementById("room-modal").classList.add("open");
    document.getElementById("room-error").textContent = "";
  };
  window.closeRoomModal = function () {
    document.getElementById("room-modal").classList.remove("open");
  };

  window.createRoomAction = function () {
    const err = document.getElementById("room-error");
    err.textContent = "Bağlanıyor...";
    RoomChat.createRoom(
      function (code) {
        err.textContent = "";
        closeRoomModal();
        const ch = document.getElementById("current-channel");
        if (ch) ch.textContent = "oda-" + code;
        alert("Oda kodun: " + code + "\n\nBu kodu arkadaşınla paylaş!");
      },
      function (msg) {
        err.textContent = msg;
      }
    );
  };

  window.joinRoomAction = function () {
    const code = document.getElementById("join-code-input").value.trim();
    const err = document.getElementById("room-error");
    if (!code) {
      err.textContent = "Kod gir";
      return;
    }
    err.textContent = "Katılınıyor...";
    RoomChat.joinRoom(
      code,
      function (c) {
        err.textContent = "";
        closeRoomModal();
        const ch = document.getElementById("current-channel");
        if (ch) ch.textContent = "oda-" + c;
      },
      function (msg) {
        err.textContent = msg;
      }
    );
  };

  window.copyRoomCode = function () {
    if (!RoomChat.roomCode) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(RoomChat.roomCode);
    }
    alert("Kod kopyalandı: " + RoomChat.roomCode);
  };

  window.leaveRoomAction = function () {
    RoomChat.leaveRoom();
    const container = document.getElementById("messages");
    if (container) {
      container.innerHTML =
        '<div class="message system"><div class="text">Odadan ayrıldın. Yeni oda aç veya koda katıl.</div></div>';
    }
    const ch = document.getElementById("current-channel");
    if (ch) ch.textContent = "genel";
  };
})();
