# Uzbek translation dictionary
UZ_TRANSLATIONS = {
    # Login page
    "Sign In": "Kirish",
    "Please enter your username and password": "Foydalanuvchi nomi va parolni kiriting",
    "Username": "Foydalanuvchi nomi",
    "Enter your username": "Foydalanuvchi nomini kiriting",
    "Password": "Parol",
    "Enter your password": "Parolni kiriting",
    "Want an account?": "Akkaunt ochish uchun?",
    "Contact us on Telegram": "Telegram-da yozing",
    
    # Dashboard
    "Gift Sniper Dashboard": "GiftSniper Boshqaruvi",
    "Home": "Bosh sahifa",
    "Settings": "Sozlamalar",
    "Admin Dashboard": "Admin Boshqaruvi",
    "Logout": "Chiqish",
    "Back to Dashboard": "Bosh sahifaga qaytish",
    
    # Bot controls
    "Start Bot": "Botni Ishga Tushirish",
    "Stop Bot": "Botni To'xtatish",
    "Bot Status": "Bot Holati",
    "Running": "Ishlayapti",
    "Stopped": "To'xtagan",
    
    # Gifts section
    "Gift Limits": "Sovg'a Chegaralari",
    "Gift Prices": "Sovg'a Narxlari",
    "Max Price": "Maksimal Narx",
    "Exclude Gifts": "Sovg'alarni Chetlashtirish",
    
    # Logs
    "Logs": "Jurnallar",
    "Real-time Logs": "Jonli Jurnallar",
    "Clear Logs": "Jurnallarni Tozalash",
    
    # Settings
    "Configure your Gift Sniper preferences": "GiftSniper-ni sozlang",
    "API Configuration": "API Konfiguratsiyasi",
    "API ID": "API ID",
    "API Hash": "API Hash",
    "Phone Number": "Telefon Raqami",
    "App Account": "Asosiy Akkaunt",
    "Buyer Account": "Xarid Qiluvchi Akkaunt",
    "Save Settings": "Sozlamalarni Saqlash",
    "Settings saved successfully": "Sozlamalar muvaffaqiyatli saqlandi",
    
    # Admin panel
    "Manage all Gift Sniper users": "Barcha foydalanuvchilarni boshqarish",
    "Create User": "Foydalanuvchi Yaratish",
    "Edit User": "Foydalanuvchini O'zgartirish",
    "Delete User": "Foydalanuvchini O'chirish",
    "Expiry Date": "Muddati Tugish Sanasi",
    "Days Left": "Qolgan Kunlar",
    "Status": "Holati",
    
    # Messages
    "Settings saved successfully!": "Sozlamalar muvaffaqiyatli saqlandi!",
    "Error": "Xatolik",
    "Success": "Muvaffaqiyat",
    "Warning": "Ogohlantirish",
    "Loading...": "Yuklanmoqda...",
    "Please wait": "Iltimos, kutib turing",
}

def translate(text):
    """Translate English text to Uzbek"""
    return UZ_TRANSLATIONS.get(text, text)
