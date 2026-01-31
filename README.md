# 🧠 Apex Sales Neural Engine - Frontend

> واجهة مستخدم حديثة لنظام Apex - من إنتاج IDRISIUM Corp

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 🏗️ Project Structure

```
apex-frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (RTL Arabic)
│   │   ├── page.tsx             # Landing page
│   │   ├── globals.css          # Global styles
│   │   └── dashboard/
│   │       ├── layout.tsx       # Dashboard layout
│   │       └── page.tsx         # Main dashboard
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── LiveDemo.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Footer.tsx
│   │   └── dashboard/
│   │       ├── Sidebar.tsx
│   │       ├── Topbar.tsx
│   │       ├── MetricsGrid.tsx
│   │       ├── RevenueChart.tsx
│   │       └── PulseFeed.tsx
│   └── styles/
│       ├── variables.css        # Design tokens
│       ├── glassmorphism.css    # Glass effects
│       └── animations.css       # Motion library
├── package.json
├── tsconfig.json
├── next.config.ts
└── .env.local
```

## 🎨 Design System

- **Colors**: Psychology-based palette (Trust Blue + Energy Purple)
- **Theme**: Dark mode OLED-friendly with glassmorphism
- **Typography**: Outfit (Display), Inter (Body), Cairo (Arabic)
- **Animations**: Framer Motion + CSS keyframes

## 🔧 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

## 📜 License

© 2024 IDRISIUM Corp. All rights reserved.

Built with ❤️ by [Idris Ghamid](https://github.com/IDRISIUM)
