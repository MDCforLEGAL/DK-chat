# Discord Siyah Klon 🖤

Discord'a çok benzeyen, **siyah temalı**, hesap sistemi olan, çok dilli (TR / EN) ve animasyonlu web chat uygulaması.

Pure **HTML + CSS + JavaScript** — Backend yok, her şey tarayıcıda (localStorage) çalışıyor.  
Türkiye'de Discord kapalı olduğu için yerel alternatif olarak kullanılabilir.

## Özellikler

### Hesap Sistemi
- Kayıt ol / Giriş yap (ilk açılışta login ekranı)
- Kullanıcı adı + şifre (localStorage'da saklanır)
- Oturum açık kalır
- Çıkış yap
- Her hesap kendi mesajlarını ve sunucularını tutar

### Arayüz
- Discord tarzı koyu tema + Daha koyu tema
- Sunucu listesi (pill animasyonlu)
- Metin + ses kanalları
- Çalışan sohbet
- Mesajlar animasyonlu
- Üye listesi
- Kompakt mesaj modu

### Ayarlar
- Hesabım, profil, görünüm, dil (TR/EN), çıkış

## Nasıl Çalıştırılır?

1. Repoyu klonla veya dosyaları indir
2. `index.html` dosyasını tarayıcıda aç
3. Önce kayıt ol / giriş yap → sonra sohbet

```bash
git clone https://github.com/MDCforLEGAL/discord-siyah-klon.git
```

## Backend Önerisi (7/24 ücretsiz)

Şu an localStorage kullanıyor. Gerçek çoklu kullanıcı için:
- **Cloudflare Workers + D1 + Durable Objects** (en iyi ücretsiz, sınırsıza yakın, 7/24)
- Firebase (Auth + Firestore) free tier
- Appwrite Cloud

Supabase önerilmez (süreli / bozulabiliyor).

---
Yapımcı: Grok (xAI) — 2026
