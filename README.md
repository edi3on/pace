# PACE - AI-Powered Track & Field Training Assistant

A modern React web application that provides AI-powered coaching and training guidance for track & field athletes, featuring ElevenLabs Conversational AI integration.

![PACE Logo](https://img.shields.io/badge/PACE-Track%20%26%20Field-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat&logo=vite)
![ElevenLabs](https://img.shields.io/badge/ElevenLabs-AI%20Coach-orange?style=flat)

## 🏃‍♂️ Overview

PACE is a comprehensive training assistant designed for sprinters and track & field athletes. It combines modern web technologies with AI-powered coaching to provide personalized training guidance, nutrition advice, and performance tracking.

### Key Features

- 🤖 **AI Coach Integration**: Voice-powered conversations with ElevenLabs Conversational AI
- 📊 **Training Analytics**: Track workouts, performance metrics, and progress
- 🍎 **Nutrition Guidance**: Personalized meal planning and nutritional recommendations
- 📅 **Training Calendar**: Structured weekly training plans with periodization
- 👤 **Athlete Profiles**: Comprehensive athlete data management
- 📱 **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/edi3on/pace/
   cd pace
   ```

2. **Install dependencies**
   ```bash
   cd pace-website
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Production Build

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
pace/
├── pace-website/              # Main React application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ui/           # Shadcn/ui components
│   │   │   ├── ConversationPage.jsx
│   │   │   └── SettingsPanel.jsx
│   │   ├── contexts/         # React contexts
│   │   ├── data/            # Static data and models
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility libraries
│   │   ├── services/        # API and data services
│   │   └── utils/           # Helper functions
│   ├── public/              # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── src/                     # Additional components (legacy)
├── docs/                    # Documentation
├── README.md
└── .gitignore
```

## 🧩 Core Components

### Main Application Components

- **App.jsx**: Main application shell with navigation and routing
- **ConversationPage.jsx**: ElevenLabs AI coach integration
- **SettingsPanel.jsx**: User preferences and configuration

### Services Architecture

- **localDataService.js**: localStorage-based data persistence
- **aiContextGenerator.js**: AI context generation for coaching
- **nutritionService.js**: Nutrition calculations and recommendations
- **workoutService.js**: Training session management
- **userService.js**: User profile and athlete data management

### Data Models

The application uses a comprehensive data structure for athlete management:

```javascript
// Demo Athlete Profile
{
  name: "Alex Johnson",
  age: 22,
  event: "100m Sprint",
  personalBest: "10.45s",
  goals: "Break 10.40s this season",
  // ... complete profile data
}
```

## 🤖 AI Coach Features

### ElevenLabs Integration

The AI coach is powered by ElevenLabs Conversational AI with:

- **Voice Conversations**: Natural speech-to-speech interactions
- **Contextual Awareness**: Full access to athlete training data
- **Personalized Guidance**: Training advice based on current phase and goals
- **Real-time Feedback**: Immediate responses to training questions

### Dynamic Context Generation

The AI coach receives comprehensive context including:
- Current training phase and periodization
- Recent workout performance and metrics
- Nutrition targets and adherence
- Energy levels and recovery status
- Upcoming competitions and goals

## 📊 Data Management

### Local Storage Strategy

PACE uses localStorage for data persistence, eliminating the need for external databases:

- **Athlete Profiles**: Complete user data and preferences
- **Training History**: Workout logs and performance metrics
- **Nutrition Data**: Meal plans and dietary tracking
- **AI Context**: Generated context for coaching interactions

### Demo Data

The application includes comprehensive demo data featuring:
- **Alex Johnson**: 22-year-old collegiate sprinter
- **Complete Training Plans**: Periodized training across seasons
- **Nutrition Guidelines**: Sport-specific dietary recommendations
- **Performance Metrics**: Realistic training data and progressions

## 🎨 UI/UX Features

### Design System

- **Tailwind CSS**: Utility-first styling
- **Radix UI**: Accessible component primitives
- **Shadcn/ui**: Pre-built component library
- **Lucide React**: Consistent iconography

### Responsive Design

- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Progressive web app capabilities

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Dependencies
npm install          # Install dependencies
npm update           # Update dependencies
```

### Environment Configuration

Create a `.env.local` file for local development:

```env
# ElevenLabs Configuration
VITE_ELEVENLABS_AGENT_ID=your_agent_id_here

# Development
VITE_APP_ENV=development
```

### Code Style

- ESLint configuration for code quality
- Prettier for consistent formatting
- Component-based architecture
- Functional components with hooks

## 📱 Features Overview

### Training Management
- Weekly training plan visualization
- Workout logging and tracking
- Performance analytics
- Training load monitoring

### Nutrition Support
- Personalized meal planning
- Macro and micronutrient tracking
- Hydration monitoring
- Supplement recommendations

### AI Coaching
- Voice-powered conversations
- Personalized training advice
- Real-time Q&A support
- Motivational coaching

### Analytics
- Performance trend analysis
- Goal tracking and progression
- Training load optimization
- Recovery monitoring

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set build directory to `pace-website`
3. Configure environment variables
4. Deploy automatically on push

### Other Platforms

The application can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions, issues, or feature requests:

1. Check existing [issues](../../issues)
2. Create a new issue with detailed description
3. Include steps to reproduce for bugs
4. Provide system information for compatibility issues

## 🔮 Future Roadmap

- [ ] Mobile app development (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-sport support
- [ ] Team management features
- [ ] Integration with wearable devices
- [ ] Competition scheduling and management

---

**Built with ❤️ for the track & field community**
