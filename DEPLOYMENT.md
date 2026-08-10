# 🚀 Deployment Guide - GiftSniper Pro

## 📋 Deploy Strategiyasi

Bu loyiha **Python Flask backend** bo'lib, Netlify-ga to'g'ridan-to'g'ri deploy qila olmaymiz.
Quyidagi platform-lardan birini tanlang:

---

## ✅ **Recommended: Render.com** (Bepul va Oson)

### 1. Render.com-da Deploy qilish

1. **Render.com-ga kirib ro'yxatdan o'tish**
   - https://render.com
   - GitHub akkauntingiz bilan kirish

2. **New Web Service yaratish**
   - "New +" → "Web Service"
   - GitHub repository-ni tanlang
   - **Name:** `giftsniper` (istalgan nom)
   - **Runtime:** `Python 3.12`

3. **Environment Variables qo'shish**
   ```
   IS_DOMAIN=true
   FLASK_ENV=production
   ```

4. **Build Command**
   ```
   pip install -r requirements.txt
   ```

5. **Start Command**
   ```
   gunicorn admin_routes:app
   ```

6. **Deploy qilish**
   - "Deploy" tugmasini bosing
   - ~2-3 minut kutib turing

### ✅ URL olasiz: `your-app-name.onrender.com`

---

## 💻 **Alternative: Heroku (Paid)**

1. Heroku CLI o'rnatish
2. `heroku login`
3. `heroku create giftsniper`
4. `git push heroku main`

---

## 🐳 **Docker bilan Local Test**

```bash
# Build
docker build -t giftsniper .

# Run
docker run -p 5913:5913 -e IS_DOMAIN=false giftsniper

# Yoki docker-compose bilan:
docker-compose up
```

---

## 🔧 Netlify (Frontend proxy)

Agar frontend va backend alohida host qilmoqchi bo'lsangiz:

1. **Netlify-da deploy qiling** (`static/` va `templates/`)
2. **Backend-ni Render/Heroku-da host qiling**
3. **netlify.toml** faylida backend URL-ni ko'rsating:
   ```toml
   [[redirects]]
     from = "/*"
     to = "https://your-backend.onrender.com/:splat"
     status = 200
   ```

---

## 🎯 Production Setup Checklist

- [ ] `.env` faylini yaratish (`.env.example` dan)
- [ ] `IS_DOMAIN=true` o'rnatish
- [ ] Admin foydalanuvchisini o'zgartirish (`data/users.json`)
- [ ] HTTPS-ni faollashtirish
- [ ] Domain-ni bog'lash
- [ ] Backup strategy o'rnatish
- [ ] Monitoring setup (Render/Heroku logs)

---

## 📱 Telegram Credentials

Har bir user o'z Telegram API credentials-larini kiritishi kerak:
1. **Settings** sahifasiga kirish
2. **App Account** va **Buyer Account** qo'shish
3. [my.telegram.org](https://my.telegram.org)-dan API ID va Hash olish

---

## ❌ Xatolik xabarlari va Yechim

### Port already in use
```bash
# Boshqa port dan ishga tushiring
FLASK_ENV=production gunicorn admin_routes:app -b 0.0.0.0:8000
```

### Module not found
```bash
pip install -r requirements.txt
```

### Session files yo'q
```bash
mkdir -p data/sessions data/logs data/sent_gifts data/user_configs
```

---

## 🌍 Custom Domain

### Render.com-da
1. Settings → Domains
2. "Add Custom Domain"
3. DNS sozlamalarni o'zgartirib, domain-ni ko'rsating

### Heroku-da
```bash
heroku domains:add yourdomainname.com
```

---

## 📊 Monitoring va Logs

### Render
- Dashboard → Logs tab-ini tekshiring

### Heroku
```bash
heroku logs --tail
```

### Local
```bash
tail -f data/logs/*.log
```

---

## 🔐 Security Tips

1. ✅ Default admin credentials-ni o'zgartirish
2. ✅ HTTPS-ni faollashtirish
3. ✅ `.env` faylida sensitive ma'lumotlar saqlash
4. ✅ Regular backups olish
5. ✅ Strong password qo'llash

---

## 📞 Support

Muammo bo'lsa, quyidagi loglarni tekshiring:
- `data/logs/{username}.log`
- Server console output

---

**Muvaffaqiyat! 🎉**
