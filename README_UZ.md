# 🎁 GiftSniper Pro - Telegram Sovg'a Bot

![GiftSniper Logo](source-images/image1.png)

## 📖 Tavsifi

**GiftSniper Pro** - Telegram marketplace-dan avtomatik ravishda sovg'alar qidiradi va xarid qiladi. Belgilangan narx chegaralaridan pastroq sovg'alarni topib, sizning akkauntingizga avtomatik yuboradi.

## ✨ Asosiy Xususiyatlari

- 🌐 **Web Dashboard** - Chiroyli va interaktiv boshqaruv paneli
- 🤖 **Avtomatsiya** - Telegram marketplace-ni kuzatib turib sovg'a qidiradi
- 💰 **Narx Chegaralari** - Har bir sovg'a uchun odam pul qo'yishi mumkin
- 🎯 **Filtrlash** - Xohlamagan sovg'alar va backdrop-larni chiqarib tashlash
- 👥 **Ikkita Akkaunt** - "App" va "Buyer" akkaunt sistemasi
- 🔐 **Admin Paneli** - Ko'p foydalanuvchini boshqarish
- 📊 **Jonli Loglar** - Real-time aktivnostni kuzatish
- 🌍 **Proxy Qo'llash** - Rate limit-dan himoya qilish
- 📲 **Web Push Notifikatsiyalari** - Muhim voqealar haqida xabar olish
- 💾 **Doimiy Sessiya** - Server qayta ishga tuguida ham ma'lumot saqlanadi

## 🏗️ Arxitektura

```
┌─ Flask Web Server
│  └─ HTML/CSS/JavaScript UI
│
├─ Pyrogram (Telegram API)
│  └─ 2 ta Telegram akkaunt boshqarish
│
├─ Multi-threaded Bot Engine
│  └─ Sovg'alar avtomatik qidirish
│
├─ User Configuration Manager
│  └─ Har bir foydalanuvchining sozlamalarini saqlash
│
└─ Database (JSON + SQLite)
   └─ Sessiya va tarikh ma'lumotlari
```

## 📋 Talablar

**Tizim Talablari:**
- Python 3.10, 3.11 yoki 3.12 (3.12 tavsiyalangan)
- RAM: Minimum 2GB, optimal 4GB
- Disk: 500MB bo'sh joy
- Internet: Telegram-ga kirish qollanishi kerak

## 🔧 O'rnatish

### 1️⃣ Repository-ni klonlash

```bash
git clone https://github.com/notashur/Telegram-GiftSniper-Web.git
cd Telegram-GiftSniper-Web
```

### 2️⃣ Virtual Environment yaratish

```bash
python3.12 -m venv venv
```

### 3️⃣ Faollashtirish

**Linux / macOS:**
```bash
source venv/bin/activate
```

**Windows:**
```bash
venv\Scripts\activate
```

### 4️⃣ Kutubxonalarni o'rnatish

```bash
pip install -r requirements.txt
```

## ▶️ Ishga Tushirish

```bash
./run.sh  # yoki
python app.py
```

Web brauzer-da `http://localhost:5913` ochib, kirish qiling.

## 🔐 Default Admin Login

```
Foydalanuvchi nomi: ashur
Parol: admin123
```

⚠️ **Muhim:** Production-da default credentials-ni qayta o'zgartirib, yangi parol qo'ying!

## 🔄 Admin Credentials-ni O'zgartirish

Admin foydalanuvchilar quyidagi faylda saqlanadi:

```
data/users.json
```

Faylni tekshiring va kerakli o'zgartirishlarni qilib, serverni qayta ishga tushiring.

## 🖼️ Sovg'a Rasmlari

- Sovg'a rasmlari faqat bir marta yuklanadi
- Qoq saqlanadi: `static/gifts/`
- Avtomatik yangilanadi: faqat yangi sovg'a qo'shilganda

## ⚠️ Mas'uliyat Etazo

Bu loyiha **faqat ta'limiy maqsadlar** uchun! Noto'g'ri foydalanishdan author mas'ul emas.

## 📜 Litsenziya

[Litsenziya faylini ko'ring](LICENSE)

---

## 🚀 Deploy Qilish

Topliq deployment guide-ni ko'rish uchun: [DEPLOYMENT.md](DEPLOYMENT.md)

**Recommended Deployment:**
- 🟢 **Render.com** (Bepul, oson)
- 🟡 **Heroku** (Pulga, sodalashtiruvchi)
- 🔵 **Docker** (O'z server-da)

---

## 📞 Support va Muammolar

Muammo bo'lsa:
1. `data/logs/{username}.log` tekshiring
2. GitHub Issues-da masalani qo'ying
3. Telegram: [@BBBB4](https://t.me/BBBB4)

---

**Muvaffaqiyatli ishlatish! 🎉**

Made with ❤️ by Ashur
