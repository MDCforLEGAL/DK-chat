// Basit sesli sohbet - PeerJS media call
(function () {
  var Voice = {
    stream: null,
    calls: {}, // peerId -> MediaConnection
    inVoice: false,
    muted: false,
    audioEls: {}
  };

  window.RoomVoice = Voice;

  function ensurePeerHandlers() {
    if (!window.RoomChat || !RoomChat.peer) return;
    if (RoomChat.peer._voiceBound) return;
    RoomChat.peer._voiceBound = true;

    RoomChat.peer.on("call", function (call) {
      if (!Voice.inVoice || !Voice.stream) {
        // Auto-join if we have mic ready later - for now answer if in voice
        if (!Voice.stream) return;
      }
      call.answer(Voice.stream);
      setupCall(call);
    });
  }

  function setupCall(call) {
    var pid = call.peer;
    Voice.calls[pid] = call;

    call.on("stream", function (remoteStream) {
      playRemote(pid, remoteStream);
    });

    call.on("close", function () {
      stopRemote(pid);
      delete Voice.calls[pid];
      updateVoiceUI();
    });

    call.on("error", function () {
      stopRemote(pid);
      delete Voice.calls[pid];
      updateVoiceUI();
    });

    updateVoiceUI();
  }

  function playRemote(pid, stream) {
    stopRemote(pid);
    var audio = document.createElement("audio");
    audio.autoplay = true;
    audio.playsInline = true;
    audio.srcObject = stream;
    audio.style.display = "none";
    document.body.appendChild(audio);
    Voice.audioEls[pid] = audio;
    // Some mobile browsers need play()
    var p = audio.play();
    if (p && p.catch) p.catch(function () {});
  }

  function stopRemote(pid) {
    var a = Voice.audioEls[pid];
    if (a) {
      try {
        a.srcObject = null;
        a.remove();
      } catch (e) {}
      delete Voice.audioEls[pid];
    }
  }

  function callAllPeers() {
    if (!RoomChat.peer || !Voice.stream) return;
    Object.keys(RoomChat.connections || {}).forEach(function (pid) {
      if (Voice.calls[pid]) return;
      try {
        var call = RoomChat.peer.call(pid, Voice.stream);
        if (call) setupCall(call);
      } catch (e) {
        console.warn("voice call fail", pid, e);
      }
    });
    // Also try host id for joiners
    if (!RoomChat.isHost && RoomChat.roomCode) {
      var hostId = "dk-" + RoomChat.roomCode;
      if (!Voice.calls[hostId] && hostId !== RoomChat.myId) {
        try {
          var c = RoomChat.peer.call(hostId, Voice.stream);
          if (c) setupCall(c);
        } catch (e) {}
      }
    }
  }

  window.joinVoice = function () {
    if (!RoomChat.roomCode || !RoomChat.peer) {
      alert("Önce bir odaya katıl veya oda oluştur.");
      return;
    }
    if (Voice.inVoice) return;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Bu tarayıcı mikrofon desteklemiyor.");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(function (stream) {
        Voice.stream = stream;
        Voice.inVoice = true;
        Voice.muted = false;
        ensurePeerHandlers();
        callAllPeers();
        // Retry calls after short delay (peers may connect late)
        setTimeout(callAllPeers, 800);
        setTimeout(callAllPeers, 2000);
        updateVoiceUI();
        if (RoomChat.addSystemMessage) {
          RoomChat.addSystemMessage("Sese katıldın 🎤");
        }
      })
      .catch(function (err) {
        console.error(err);
        alert("Mikrofon izni gerekli. Ayarlardan izin ver.");
      });
  };

  window.leaveVoice = function () {
    Object.keys(Voice.calls).forEach(function (pid) {
      try {
        Voice.calls[pid].close();
      } catch (e) {}
      stopRemote(pid);
    });
    Voice.calls = {};

    if (Voice.stream) {
      Voice.stream.getTracks().forEach(function (t) {
        t.stop();
      });
      Voice.stream = null;
    }
    Voice.inVoice = false;
    Voice.muted = false;
    updateVoiceUI();
    if (RoomChat.addSystemMessage) {
      RoomChat.addSystemMessage("Sesten ayrıldın");
    }
  };

  window.toggleVoiceMute = function () {
    if (!Voice.stream) return;
    Voice.muted = !Voice.muted;
    Voice.stream.getAudioTracks().forEach(function (t) {
      t.enabled = !Voice.muted;
    });
    updateVoiceUI();
  };

  function updateVoiceUI() {
    var bar = document.getElementById("voice-bar");
    if (!bar) return;

    var inRoom = !!(window.RoomChat && RoomChat.roomCode);
    bar.style.display = inRoom ? "flex" : "none";

    var joinBtn = document.getElementById("voice-join-btn");
    var leaveBtn = document.getElementById("voice-leave-btn");
    var muteBtn = document.getElementById("voice-mute-btn");
    var status = document.getElementById("voice-status");

    if (joinBtn) joinBtn.style.display = Voice.inVoice ? "none" : "inline-flex";
    if (leaveBtn) leaveBtn.style.display = Voice.inVoice ? "inline-flex" : "none";
    if (muteBtn) muteBtn.style.display = Voice.inVoice ? "inline-flex" : "none";

    if (muteBtn) {
      muteBtn.classList.toggle("muted", Voice.muted);
      muteBtn.title = Voice.muted ? "Sesi aç" : "Sustur";
      muteBtn.innerHTML = Voice.muted
        ? '<span class="icon-svg"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/></svg></span>'
        : '<span class="icon-svg"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/></svg></span>';
    }

    if (status) {
      if (!inRoom) status.textContent = "";
      else if (!Voice.inVoice) status.textContent = "Ses kapalı";
      else status.textContent = Voice.muted ? "Susturuldu" : "Seste · " + Object.keys(Voice.calls).length + " bağlantı";
    }
  }

  // Patch leaveRoom to also leave voice
  function patchLeave() {
    if (!window.RoomChat || RoomChat._voicePatched) return;
    RoomChat._voicePatched = true;
    var orig = RoomChat.leaveRoom.bind(RoomChat);
    RoomChat.leaveRoom = function () {
      window.leaveVoice();
      orig();
      updateVoiceUI();
    };
  }

  // When new data connection opens, try voice call
  function patchSetup() {
    if (!window.RoomChat || RoomChat._voiceSetupPatched) return;
    if (typeof RoomChat.setupConnection !== "function") return;
    RoomChat._voiceSetupPatched = true;
    var orig = RoomChat.setupConnection.bind(RoomChat);
    RoomChat.setupConnection = function (conn) {
      orig(conn);
      conn.on("open", function () {
        if (Voice.inVoice && Voice.stream) {
          setTimeout(function () {
            if (!Voice.calls[conn.peer]) {
              try {
                var call = RoomChat.peer.call(conn.peer, Voice.stream);
                if (call) setupCall(call);
              } catch (e) {}
            }
          }, 400);
        }
      });
    };
  }

  function init() {
    patchLeave();
    patchSetup();
    updateVoiceUI();
    // Re-patch when peer created
    setInterval(function () {
      patchLeave();
      patchSetup();
      ensurePeerHandlers();
      updateVoiceUI();
    }, 1500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
