# Pace - Your AI Track & Field Coach

A complete AI-powered track and field coaching application with voice conversation capabilities.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start development server:**
   ```bash
   pnpm run dev
   ```

3. **Open your browser:**
   Navigate to http://localhost:5173

## 📋 Features

- ✅ **User Onboarding** - Complete athlete profile setup
- ✅ **Training Calendar** - Weekly workout plans
- ✅ **Training Logs** - Performance tracking
- ✅ **Nutrition Guide** - Personalized recommendations
- ✅ **AI Voice Coach** - ElevenLabs integration for conversations
- ✅ **Responsive Design** - Works on desktop and mobile

## 🎙️ Voice Integration

To enable voice conversations:
1. Update your agent ID in `src/services/elevenLabsService.js`
2. Grant microphone permissions when prompted
3. Start talking with Coach Alex!

## 📁 Project Structure

- `src/components/` - React components
- `src/services/` - Business logic and API integrations
- `src/data/` - Sample data and configurations
- `src/contexts/` - React context providers

## 🔧 Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build

For detailed setup instructions, see `LOCAL_SETUP_GUIDE.md`.

