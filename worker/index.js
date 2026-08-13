// Cloudflare Worker - Discord Klon Backend
// Deploy: npx wrangler deploy
// Free tier, 7/24, very generous limits

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // ===== REGISTER =====
      if (path === "/api/register" && request.method === "POST") {
        const body = await request.json();
        const { username, password, email } = body;
        if (!username || !password || password.length < 4) {
          return json({ error: "Invalid data" }, 400, corsHeaders);
        }
        const key = "user:" + username.toLowerCase();
        const existing = await env.KV.get(key);
        if (existing) return json({ error: "Username taken" }, 409, corsHeaders);

        const user = {
          username,
          email: email || "",
          password: await hash(password),
          avatar: username[0].toUpperCase(),
          displayName: username,
          status: "online",
          tag: String(Math.floor(Math.random() * 9999)).padStart(4, "0"),
          createdAt: Date.now()
        };
        await env.KV.put(key, JSON.stringify(user));
        return json({ ok: true, user: sanitize(user) }, 200, corsHeaders);
      }

      // ===== LOGIN =====
      if (path === "/api/login" && request.method === "POST") {
        const body = await request.json();
        const { username, password } = body;
        const key = "user:" + username.toLowerCase();
        const raw = await env.KV.get(key);
        if (!raw) return json({ error: "Invalid credentials" }, 401, corsHeaders);
        const user = JSON.parse(raw);
        if (user.password !== await hash(password)) {
          return json({ error: "Invalid credentials" }, 401, corsHeaders);
        }
        // Simple token
        const token = btoa(username + ":" + Date.now());
        await env.KV.put("session:" + token, username, { expirationTtl: 60 * 60 * 24 * 30 }); // 30 days
        return json({ ok: true, token, user: sanitize(user) }, 200, corsHeaders);
      }

      // ===== GET MESSAGES =====
      if (path === "/api/messages" && request.method === "GET") {
        const channel = url.searchParams.get("channel") || "home-genel";
        const raw = await env.KV.get("messages:" + channel);
        const messages = raw ? JSON.parse(raw) : [];
        return json({ messages }, 200, corsHeaders);
      }

      // ===== POST MESSAGE =====
      if (path === "/api/messages" && request.method === "POST") {
        const body = await request.json();
        const { channel, text, author, avatar } = body;
        if (!channel || !text) return json({ error: "Missing fields" }, 400, corsHeaders);

        const key = "messages:" + channel;
        const raw = await env.KV.get(key);
        const messages = raw ? JSON.parse(raw) : [];
        const msg = {
          id: Date.now(),
          author: author || "User",
          avatar: avatar || "U",
          color: "#5865f2",
          text,
          time: new Date().toLocaleString("tr-TR", { hour: "2-digit", minute: "2-digit" })
        };
        messages.push(msg);
        // Keep last 200 messages
        if (messages.length > 200) messages.splice(0, messages.length - 200);
        await env.KV.put(key, JSON.stringify(messages));
        return json({ ok: true, message: msg }, 200, corsHeaders);
      }

      return json({ error: "Not found" }, 404, corsHeaders);
    } catch (e) {
      return json({ error: e.message }, 500, corsHeaders);
    }
  }
};

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...headers }
  });
}

function sanitize(user) {
  const { password, ...safe } = user;
  return safe;
}

async function hash(str) {
  const data = new TextEncoder().encode(str + "discord-klon-salt");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}
