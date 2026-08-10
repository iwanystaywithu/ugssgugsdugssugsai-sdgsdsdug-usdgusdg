# Render.com deployment guide

## 🚀 Render.com-ga Deploy Qilish

### 1. GitHub-ga push qiling

```bash
git add .
git commit -m "Add CORS support and fix deployment"
git push origin main
```

### 2. Render.com-da:

1. https://render.com ga kirib ro'yxatdan o'tish
2. GitHub bilan connect qiling
3. **"New Web Service"** bosing
4. Repository tanlang (`Telegram-GiftSniper-Web-main`)

### 3. Sozlamalar:

| Field | Value |
|-------|-------|
| **Name** | `giftsniper-bot` |
| **Runtime** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `gunicorn admin_routes:app` |
| **Region** | `Singapore` yoki `Europe` |

### 4. Environment Variables qo'shing:

```
IS_DOMAIN=true
FLASK_ENV=production
```

### 5. Deploy qiling

**"Deploy"** bosing. 2-3 minut kutib turing.

✅ **Backend URL olasiz:** `https://giftsniper-bot.onrender.com`

### 6. Netlify-da netlify.toml tuzatish

`netlify.toml` faylida `your-backend.onrender.com` o'rniga **o'z Render URL-ingizni** qo'ying:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://giftsniper-bot.onrender.com/api/:splat"
  status = 200
```

---

## 🎯 Final Architecture

```
Netlify Frontend (sayt)
    ↓
    → API calls → https://your-render-url.onrender.com
    ↓
Render Backend (Python Flask)
    ↓
    → Telegram API
```

---

## ✅ URL-lar

- 🌐 Frontend: `your-netlify-site.netlify.app`
- ⚙️ Backend: `giftsniper-bot.onrender.com`

---

**Tayyor! 🎉**
