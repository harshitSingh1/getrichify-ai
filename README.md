# GetRichify 💰

**Live Website:** [https://get-rich-o-matic.lovable.app](https://get-rich-o-matic.lovable.app)

## 🎯 Project Aim

This project was built to explore and demonstrate the capabilities of **Lovable**

## 💡 Website Concept

GetRichify is an AI-powered startup idea generator that transforms ordinary concepts into extraordinary (and hilariously exaggerated) business opportunities. The platform combines humor with creativity to help users brainstorm and explore business ideas in an entertaining way.

The AI acts as an enthusiastic friend who sees money-making potential in everything, turning user inputs into compelling startup pitches complete with valuations, business models, and growth strategies - all delivered with a twist of humor.

## ✨ Key Features

- **AI-Powered Chat**: Interactive conversation with an AI that generates funny yet creative startup pitches using Lovable AI (Google Gemini)
- **Destiny Wheel**: Professional spinning wheel to discover random billion-dollar business fates
- **Patch Notes**: Track your entrepreneurial journey and "level up" moments
- **Richness Calculator**: Calculate and visualize your path to wealth
- **Serious Mode**: Toggle between humorous and professional business consulting
- **About Page**: Learn more about the platform and its purpose
- **Responsive Design**: Professional neon-themed UI that works seamlessly across all devices
- **Real-time AI Responses**: Powered by serverless edge functions for instant feedback

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible component library
- **React Router** - Client-side routing
- **TanStack Query** - Server state management

### Backend (Lovable Cloud)
- **Supabase** - Backend-as-a-Service (via Lovable Cloud)
- **Edge Functions** - Serverless Deno functions for AI integration
- **Lovable AI Gateway** - Managed AI model access (Google Gemini)

### AI Integration
- **Google Gemini 2.5 Flash** - AI model for generating startup ideas
- **Lovable AI** - No API key required, built-in AI capabilities

## 🚀 How to Run Locally

### Prerequisites
- **Node.js** (v18 or higher) - [Install via nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **yarn**
- **Git**

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshitSingh1/Richify.git
   cd Richify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Logo.tsx      # Brand logo
│   │   ├── Navbar.tsx    # Navigation bar
│   │   └── MoneyRain.tsx # Animated background
│   ├── pages/            # Route pages
│   │   ├── Home.tsx      # Landing page
│   │   ├── Chat.tsx      # AI chat interface
│   │   ├── Wheel.tsx     # Fortune wheel
│   │   └── ...
│   ├── integrations/     # External service integrations
│   │   └── supabase/     # Supabase client (auto-generated)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── index.css         # Global styles & design tokens
├── supabase/
│   ├── functions/        # Edge functions (serverless backend)
│   │   ├── chat/         # AI chat endpoint
│   │   └── serious-mode/ # Business consulting endpoint
│   └── config.toml       # Supabase configuration
└── public/               # Static assets
```

## 🎨 Design System

The project uses a professional neon-themed design system with:
- Semantic color tokens (defined in `index.css`)
- Gradient effects and glow shadows
- Custom animations (float, glow, slide-in, etc.)
- Responsive breakpoints
- Dark mode support


## 🔑 Environment Variables

The following environment variables are auto-configured by Lovable Cloud:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon key
- `VITE_SUPABASE_PROJECT_ID` - Supabase project ID

## 🤝 Contributing

This is a demonstration project built with Lovable. Feel free to fork and experiment!

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - AI-powered development platform
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Powered by [Supabase](https://supabase.com) (via Lovable Cloud)
- AI capabilities via Lovable AI Gateway (Google Gemini)

---

**Note:** This project is for entertainment and learning purposes. GetRichify's startup ideas are intentionally exaggerated and humorous. Actual business results may vary wildly! 😄
