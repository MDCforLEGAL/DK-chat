# Discord Siyah Klon 🖤

Discord'a çok benzeyen, **siyah temalı**, hesap sistemi olan, çok dilli (TR / EN) ve animasyonlu web chat uygulaması.

Pure **HTML + CSS + JavaScript** — Backend yok, her şey tarayıcıda (localStorage) çalışıyor.  
Türkiye'de Discord kapalı olduğu için yerel alternatif olarak kullanılabilir.

## Özellikler

### Hesap Sistemi
- Kayıt ol / Giriş yap
- Kullanıcı adı + şifre (localStorage'da saklanır)
- Oturum açık kalır (sayfa yenilense bile)
- Çıkış yap
- Her hesap kendi mesajlarını ve sunucularını tutar

### Arayüz
- Discord tarzı koyu tema + Daha koyu tema seçeneği
- Sunucu listesi (pill animasyonlu)
- Metin + ses kanalları
- Çalışan sohbet (Enter ile gönder)
- Mesajlar animasyonlu gelir
- Üye listesi (çevrimiçi / çevrimdışı)
- Kompakt mesaj modu

### Ayarlar
- Hesabım (e-posta)
- Kullanıcı profili (görünen ad, avatar harfi, durum)
- Görünüm (tema + kompakt mod)
- Dil seçeneği: **Türkçe** / **English**
- Çıkış yap

### Diğer
- Yeni sunucu oluşturma
- Temel responsive destek
- Smooth animasyonlar (mesaj, modal, server icon, hover)

## Nasıl Çalıştırılır?

1. Repoyu klonla veya dosyaları indir
2. `index.html` dosyasını tarayıcıda aç
3. Kayıt ol → Giriş yap → Sohbete başla

```bash
git clone https://github.com/MDCforLEGAL/discord-siyah-klon.git
cd discord-siyah-klon
```

## GitHub Pages

**Settings → Pages → Source: Deploy from a branch → main** seçerek canlı siteye alabilirsin.

## Not

Bu bir **frontend klon**. Gerçek Discord gibi:
- Gerçek zamanlı çoklu kullanıcı (WebSocket / sunucu)
- Sesli / görüntülü arama
- Gerçek e-posta doğrulama
- Sunucu rolleri & yetkiler

yoktur. Eğitim ve yerel kullanım amaçlıdır. Şifreler basit hash ile saklanır, production için uygun değildir.

---

Yapımcı: Grok (xAI) — 2026
