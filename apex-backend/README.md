# 🧠 Apex Sales Neural Engine - Backend

> نظام ذكاء اصطناعي متكامل لإدارة المبيعات والتجارة الإلكترونية

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Start development server
npm run dev
```

## 🏗️ Project Structure

```
apex-backend/
├── src/
│   ├── app.ts                    # Express application entry
│   ├── config/
│   │   ├── database.ts           # Prisma client singleton
│   │   ├── gemini.ts             # Google Gemini AI config
│   │   └── constants.ts          # App constants
│   ├── controllers/
│   │   ├── auth.controller.ts    # Authentication endpoints
│   │   ├── chat.controller.ts    # AI chat & conversations
│   │   └── analytics.controller.ts # Dashboard metrics
│   ├── middleware/
│   │   ├── auth.middleware.ts    # JWT authentication
│   │   ├── rate-limiter.middleware.ts
│   │   └── error-handler.middleware.ts
│   ├── services/ai/
│   │   ├── gemini.service.ts     # Main AI response service
│   │   ├── intent-recognition.service.ts
│   │   └── sentiment-analysis.service.ts
│   ├── routes/api/v1/
│   │   └── index.ts              # API routes
│   ├── socket/
│   │   └── index.ts              # Socket.IO real-time
│   ├── prisma/
│   │   └── schema.prisma         # Database schema
│   └── types/
│       ├── api.types.ts
│       └── ai.types.ts
├── package.json
├── tsconfig.json
├── .env
└── vercel.json
```

## 🔧 Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your-gemini-api-key
PORT=3001
```

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new tenant
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/profile` - Get current user
- `POST /api/v1/auth/logout` - Logout

### Chat (AI)
- `POST /api/v1/chat/send` - Send message (AI responds)
- `GET /api/v1/chat/conversations` - List conversations
- `GET /api/v1/chat/conversations/:id` - Get conversation
- `POST /api/v1/chat/conversations/:id/handoff` - Escalate to human

### Analytics
- `GET /api/v1/analytics/dashboard` - Dashboard metrics
- `GET /api/v1/analytics/revenue` - Revenue chart data
- `GET /api/v1/analytics/pulse` - Live activity feed

## 🤖 AI Features

- **Arabic Language Support** - Understands Egyptian, Saudi, Gulf, and MSA dialects
- **Intent Recognition** - Detects customer intent (buying, browsing, complaining, etc.)
- **Sentiment Analysis** - Real-time mood detection with escalation triggers
- **Persona System** - Professional, Witty, Friendly, Formal, Urgent modes

## 🚀 Deployment

### Vercel
```bash
vercel deploy
```

## 📜 License

© 2024 IDRISIUM Corp. All rights reserved.

Built with ❤️ by [Idris Ghamid](https://github.com/IDRISIUM)
