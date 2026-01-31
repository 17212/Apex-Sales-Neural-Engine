# 🚀 Apex Sales Neural Engine

<div align="center">

![Apex Sales Neural Engine](https://img.shields.io/badge/Apex%20Sales-Neural%20Engine-6366f1?style=for-the-badge&logo=robot&logoColor=white)

**محرك الذكاء الاصطناعي للمبيعات الآلية**

AI-Powered Sales Bot for Egyptian E-commerce

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js%2015-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini%202.5-8E75B2?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)

</div>

---

## 🌟 Overview

**Apex Sales Neural Engine** هو نظام ذكاء اصطناعي متقدم للمبيعات الآلية، مصمم خصيصاً للسوق المصري والعربي. يتكامل مع WhatsApp, Telegram, Messenger ويستخدم Gemini 2.5 Pro/Flash لتحقيق مبيعات ذكية.

## ⚡ Features

### 🤖 AI Sales Engine
- **Gemini 2.5 Pro/Flash** - ردود ذكية باللهجة المصرية
- **Sentiment Analysis** - تحليل مشاعر العميل فوري
- **Intent Detection** - فهم نية الشراء
- **Smart Upselling** - اقتراحات ذكية

### 📱 Multi-Channel Support
- WhatsApp Business API
- Telegram Bot API
- Facebook Messenger
- Instagram DMs

### 📊 Real-time Dashboard
- Live metrics & analytics
- Revenue & orders tracking
- Customer segmentation
- Bot performance monitoring

### 💳 Payment Integration
- Paymob (Credit/Debit Cards)
- Cash on Delivery
- Installments support

---

## 🏗️ Project Structure

```
IDRISIUM AI SALES BOT/
├── 📂 backend/
│   ├── src/
│   │   ├── api/           # API Routes
│   │   ├── core/          # AI, Config, Realtime
│   │   ├── database/      # Drizzle Schema
│   │   └── middleware/    # Auth Middleware
│   ├── package.json
│   └── vercel.json
│
├── 📂 frontend/
│   ├── src/
│   │   ├── app/           # Next.js 15 App Router
│   │   ├── components/    # React Components
│   │   ├── store/         # Zustand Stores
│   │   └── styles/        # Global CSS
│   └── package.json
│
└── 📂 docs/
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL (Neon recommended)
- Pusher Account
- Gemini API Key

### Backend Setup

```bash
cd backend
npm install

# Create .env from example
cp .env.example .env
# Fill in your credentials

# Run database migrations
npm run db:push

# Start dev server
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# Create .env.local from example
cp .env.example .env.local
# Fill in your credentials

# Start dev server
npm run dev
```

---

## ⚙️ Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://...
GEMINI_API_KEY=your_key
JWT_SECRET=your_secret
PUSHER_APP_ID=...
PUSHER_KEY=...
PUSHER_SECRET=...
PUSHER_CLUSTER=eu
PAYMOB_API_KEY=...
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_PUSHER_KEY=...
NEXT_PUBLIC_PUSHER_CLUSTER=eu
```

---

## 📡 Webhooks Setup

### WhatsApp Business
1. Go to [Meta for Developers](https://developers.facebook.com)
2. Create WhatsApp Business App
3. Set webhook URL: `https://your-domain.vercel.app/webhooks/whatsapp`

### Telegram
1. Talk to [@BotFather](https://t.me/BotFather)
2. Create new bot with `/newbot`
3. Set webhook: `https://api.telegram.org/bot{TOKEN}/setWebhook?url=https://your-domain.vercel.app/webhooks/telegram`

---

## 🎨 Design Philosophy

- **Apple-Level Aesthetics** - Premium dark mode design
- **Glassmorphism** - Modern UI with blur effects
- **Arabic-First** - RTL support & Egyptian dialect
- **Real-time** - Pusher-powered live updates

---

## 👨‍💻 Developer

<div align="center">

**Idris Ghamid | إدريس غامد**

[![GitHub](https://img.shields.io/badge/GitHub-IDRISIUM-181717?style=flat-square&logo=github)](https://github.com/IDRISIUM)
[![TikTok](https://img.shields.io/badge/TikTok-@idris.ghamid-000000?style=flat-square&logo=tiktok)](https://tiktok.com/@idris.ghamid)
[![Telegram](https://img.shields.io/badge/Telegram-@IDRV72-2CA5E0?style=flat-square&logo=telegram)](https://t.me/IDRV72)
[![Email](https://img.shields.io/badge/Email-idris.ghamid@gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:idris.ghamid@gmail.com)

© 2025-2026 IDRISIUM Corp. All rights reserved.

</div>

---

## 📄 License

This project is proprietary software owned by IDRISIUM Corp.
Unauthorized copying, modification, or distribution is prohibited.
