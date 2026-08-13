# Cloudflare Kurulum Rehberi (7/24 Ücretsiz)

## 1. Cloudflare hesabı aç
https://dash.cloudflare.com/sign-up  (ücretsiz)

## 2. Worker'i deploy et

Terminal aç ve şunları yaz:

```bash
git clone https://github.com/MDCforLEGAL/discord-siyah-klon.git
cd discord-siyah-klon/worker
npm install -g wrangler
npx wrangler login
npx wrangler kv namespace create DISCORD_KV
```

Çıkan **id** değerini kopyala.

`wrangler.toml` dosyasını aç, şu satırı değiştir:

```toml
id = "BURAYA_ID_YAZ"
```

Sonra:

```bash
npx wrangler deploy
```

Sana şöyle bir URL verecek:
`https://discord-klon-api.senin-subdomain.workers.dev`

## 3. Frontend'e bağla

`app.js` dosyasının en üstüne şunu ekle / değiştir:

```js
const API_BASE = "https://discord-klon-api.senin-subdomain.workers.dev"; // kendi URL'in
// localStorage kullanmak istersen: const API_BASE = null;
```

## Özellikler
- Kayıt / Giriş (gerçek sunucuda)
- Mesaj gönderme & çekme
- 7/24 çalışır
- Cloudflare Free Tier çok cömert (günlük yüz binlerce istek)

Sorun olursa söyle, yardım ederim.
