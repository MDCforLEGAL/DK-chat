# Cloudflare Worker - Discord Klon Backend

## Kurulum (5-10 dakika)

1. Cloudflare hesabı aç (ücretsiz): https://dash.cloudflare.com/sign-up

2. Terminalde:
```bash
npm create cloudflare@latest
# veya mevcut worker klasöründe:
cd worker
npm install -g wrangler
npx wrangler login
```

3. KV oluştur:
```bash
npx wrangler kv namespace create DISCORD_KV
```
Çıkan **id** yi `wrangler.toml` içindeki `YOUR_KV_NAMESPACE_ID_HERE` yerine yaz.

4. Deploy et:
```bash
npx wrangler deploy
```

5. Sana bir URL verecek, örn:
`https://discord-klon-api.xxxxx.workers.dev`

6. Frontend'de `app.js` içinde `API_BASE` değişkenini bu URL ile değiştir.

Hazır! 7/24 ücretsiz çalışır.
