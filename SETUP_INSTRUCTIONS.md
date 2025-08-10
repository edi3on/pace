# Pace - AI Track & Field Coach - Local Setup Guide

## 📋 Prerequisites

Before you begin, make sure you have the following installed on your machine:

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **pnpm** (preferred package manager)
   - Install: `npm install -g pnpm`
   - Verify installation: `pnpm --version`
   - Alternative: You can use `npm` instead of `pnpm`

## 🚀 Quick Start

### Step 1: Extract and Navigate
```bash
# Extract the downloaded package
tar -xzf pace-complete.tar.gz

# Navigate to the project directory
cd pace
```

### Step 2: Install Dependencies
```bash
# Install all required packages
pnpm install

# Alternative if using npm:
# npm install
```

### Step 3: Environment Setup (Optional)
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your Firebase credentials (optional)
# The app works with localStorage fallback if no Firebase config
```

### Step 4: Start Development Server
```bash
# Start the development server
pnpm run dev

# Alternative if using npm:
# npm run dev
```

### Step 5: Open in Browser
- Open your browser and go to: `http://localhost:5173`
- The application should load with the 4-tab interface
- AI Coach tab will be the default page with ElevenLabs integration

## 🔧 Configuration Options

### Firebase Setup (Optional)
If you want to use Firebase for data persistence:

1. **Create a Firebase project** at https://console.firebase.google.com/
2. **Enable Firestore Database** in your project
3. **Get your config** from Project Settings → General → Your apps
4. **Update `.env` file** with your credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### ElevenLabs Configuration
Your ElevenLabs agent is already configured with ID: `agent_4701k28hw2jvfj79kkypdbhyd93m`

To modify the agent:
1. Open `src/App.jsx`
2. Find the line: `const AGENT_ID = 'agent_4701k28hw2jvfj79kkypdbhyd93m';`
3. Replace with your agent ID

## 📁 Project Structure

```
pace/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── Chatbox.jsx           # Main chat interface
│   │   ├── SettingsPanel.jsx     # User settings
│   │   ├── TrainingCalendar.jsx  # Training calendar
│   │   ├── TrainingLogs.jsx      # Workout logs
│   │   ├── NutritionGuide.jsx    # Nutrition guidance
│   │   └── ui/                   # UI components (shadcn/ui)
│   ├── contexts/          # React contexts
│   │   └── UserContext.jsx       # User state management
│   ├── services/          # API and data services
│   │   ├── firebase.js           # Firebase configuration
│   │   ├── firebaseService.js    # Firebase operations
│   │   ├── elevenLabsIntegration.js # ElevenLabs integration
│   │   └── aiContextService.js   # AI context management
│   ├── data/              # Static data files
│   │   ├── sprints_in_season.json
│   │   ├── distance_in_season.json
│   │   └── nutrition_guidelines.json
│   ├── App.jsx            # Main application component
│   ├── App.css            # Global styles
│   └── main.jsx           # Application entry point
├── .env                   # Environment variables
├── .env.example           # Environment template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── tailwind.config.js     # Tailwind CSS configuration
```

## 🛠 Available Scripts

```bash
# Development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Lint code
pnpm run lint
```

## 🎯 Key Features

### 1. AI Coach Tab
- **ElevenLabs integration** with your agent
- **Text and voice chat** capabilities
- **Dynamic AI briefing** with user context
- **Settings integration** for personalized coaching

### 2. Training Tab
- **Weekly calendar view** with color-coded workouts
- **Progress tracking** and statistics
- **Smart workout scheduling** based on athlete profile
- **Quick actions** for workout management

### 3. Logs Tab
- **Comprehensive workout history** with detailed metrics
- **AI conversation summaries** and analysis
- **Filter and export** capabilities
- **Progress visualization** and trends

### 4. Nutrition Tab
- **Daily nutrition targets** and macro breakdown
- **Pre/post workout guidance** with timing recommendations
- **Sample meal plans** for training and rest days
- **Hydration strategies** and tips

## 🔍 Troubleshooting

### Common Issues:

1. **Port already in use**
   ```bash
   # Kill process on port 5173
   lsof -ti:5173 | xargs kill -9
   ```

2. **Dependencies not installing**
   ```bash
   # Clear cache and reinstall
   pnpm store prune
   rm -rf node_modules
   pnpm install
   ```

3. **ElevenLabs not loading**
   - Check browser console for errors
   - Ensure internet connection for external script
   - Verify agent ID is correct

4. **Firebase errors**
   - Check `.env` file configuration
   - Verify Firebase project settings
   - App works with localStorage fallback if Firebase fails

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Option 2: Netlify
```bash
# Build the project
pnpm run build

# Upload dist/ folder to Netlify
```

### Option 3: Traditional Hosting
```bash
# Build the project
pnpm run build

# Upload contents of dist/ folder to your web server
```

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify all dependencies are installed correctly
3. Ensure your Node.js version is 18 or higher
4. Check that all environment variables are set correctly

## 🎉 You're Ready!

Your Pace AI coaching application should now be running locally with:
- ✅ 4-tab interface (AI Coach, Training, Logs, Nutrition)
- ✅ ElevenLabs AI agent integration
- ✅ Firebase-ready architecture with localStorage fallback
- ✅ Professional UI with responsive design
- ✅ Complete coaching feature set

Enjoy building with Pace! 🏃‍♂️💪

