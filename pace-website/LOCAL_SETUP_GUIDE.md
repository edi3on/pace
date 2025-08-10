# Pace - AI Track & Field Coach - Local Setup Guide

## 📋 **Overview**

Pace is a complete AI-powered track and field coaching application built with React, featuring:
- ✅ **User onboarding** with athlete profile creation
- ✅ **Training calendar** with weekly workout plans
- ✅ **Training logs** with performance tracking
- ✅ **Nutrition guidance** with personalized recommendations
- ✅ **ElevenLabs voice AI integration** for conversational coaching
- ✅ **Professional UI** with responsive design

## 🛠 **Prerequisites**

Before setting up the application locally, ensure you have:

1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **pnpm** (recommended package manager)
   - Install: `npm install -g pnpm`
   - Verify installation: `pnpm --version`

3. **Git** (for version control)
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

## 🚀 **Quick Start**

### **1. Extract and Navigate**
```bash
# Extract the downloaded archive
tar -xzf pace-complete-local.tar.gz

# Navigate to the project directory
cd pace
```

### **2. Install Dependencies**
```bash
# Install all required packages
pnpm install
```

### **3. Environment Setup**
```bash
# Copy the environment template
cp .env.example .env

# Edit the .env file with your settings (optional)
# The app works with default demo data
```

### **4. Start Development Server**
```bash
# Start the local development server
pnpm run dev
```

The application will be available at: **http://localhost:5173**

## 🎙️ **ElevenLabs Voice Integration Setup**

To enable the voice conversation feature with your ElevenLabs agent:

### **1. Update Agent Configuration**
Edit `src/services/elevenLabsService.js`:
```javascript
// Line 6: Update with your agent ID
this.agentId = 'your_agent_id_here';
```

### **2. Test Voice Integration**
1. Start the development server: `pnpm run dev`
2. Navigate to the **AI Coach** tab
3. Click **"Start Conversation"**
4. Grant microphone permissions when prompted
5. Start speaking with your AI coach!

### **3. Dynamic Variables**
The application automatically passes these variables to your ElevenLabs agent:
- `user_name`: Athlete's name
- `height`: Height in inches
- `weight`: Weight in pounds
- `event`: Track & field event (Sprints, Distance, etc.)
- `time_in_the_season`: Training phase (Pre-Season, In-Season, Off-Season)
- `training_schedule`: Weekly training frequency
- `current_pr`: Current personal record
- `goal_pr`: Target personal record

## 📁 **Project Structure**

```
pace/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── Dashboard.jsx         # Main dashboard
│   │   ├── Onboarding.jsx        # User setup flow
│   │   ├── ConversationPage.jsx  # Voice chat interface
│   │   ├── TrainingCalendar.jsx  # Weekly training plans
│   │   ├── TrainingLogs.jsx      # Performance tracking
│   │   └── NutritionGuide.jsx    # Nutrition recommendations
│   ├── services/          # Business logic
│   │   ├── elevenLabsService.js  # Voice AI integration
│   │   ├── userService.js        # User management
│   │   ├── workoutService.js     # Training logic
│   │   └── nutritionService.js   # Nutrition calculations
│   ├── data/             # Sample data and configurations
│   │   ├── trainingData.js       # Workout templates
│   │   ├── logsData.js           # Sample training logs
│   │   └── nutrition_guidelines.json
│   ├── contexts/         # React context providers
│   └── App.jsx           # Main application component
├── package.json          # Dependencies and scripts
├── .env.example         # Environment template
└── README.md           # Project documentation
```

## 🔧 **Available Scripts**

```bash
# Development
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run preview      # Preview production build

# Linting and Formatting
pnpm run lint         # Check code quality
pnpm run lint:fix     # Fix linting issues
```

## 🎯 **Key Features**

### **1. User Onboarding**
- 4-step guided setup process
- Event group selection (Sprints, Mid-Distance, Long-Distance, Jumps, Throws)
- Training phase selection (Pre-Season, In-Season, Off-Season)
- Physical measurements for personalized recommendations

### **2. Training Calendar**
- Weekly workout plans based on event and training phase
- Detailed exercise descriptions and focus areas
- Progress tracking with completion status
- Intensity levels and duration estimates

### **3. Training Logs**
- Performance tracking and analytics
- Historical workout data
- Progress visualization
- Personal record tracking

### **4. Nutrition Guide**
- Personalized nutrition recommendations
- Pre and post-workout meal suggestions
- Hydration guidelines
- Supplement recommendations

### **5. AI Voice Coach**
- Real-time voice conversations with ElevenLabs AI
- Dynamic variable integration
- Live transcript display
- Professional conversation interface

## 🔒 **Environment Variables**

The application uses these environment variables (optional):

```bash
# .env file
VITE_ELEVENLABS_AGENT_ID=your_agent_id_here
VITE_APP_NAME=Pace
VITE_APP_VERSION=1.0.0
```

## 🐛 **Troubleshooting**

### **Common Issues:**

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

3. **ElevenLabs voice not working**
   - Check microphone permissions in browser
   - Verify agent ID in `src/services/elevenLabsService.js`
   - Test in Chrome/Firefox (better WebRTC support)

4. **Build errors**
   ```bash
   # Clean build
   rm -rf dist
   pnpm run build
   ```

## 📱 **Browser Compatibility**

- ✅ **Chrome** (recommended for voice features)
- ✅ **Firefox** (good compatibility)
- ✅ **Safari** (basic features, limited voice support)
- ✅ **Edge** (good compatibility)

## 🚀 **Deployment**

To deploy the application:

```bash
# Build for production
pnpm run build

# The dist/ folder contains the deployable files
# Upload to your hosting provider (Vercel, Netlify, etc.)
```

## 📞 **Support**

For issues or questions:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Ensure all prerequisites are properly installed
4. Verify ElevenLabs agent configuration

## 🎉 **Getting Started**

1. **Extract the files** and navigate to the project directory
2. **Install dependencies** with `pnpm install`
3. **Start the development server** with `pnpm run dev`
4. **Open your browser** to http://localhost:5173
5. **Complete the onboarding** to set up your athlete profile
6. **Explore the features** and test the voice integration!

The application includes demo data so you can immediately see all features in action. Enjoy building with Pace! 🏃‍♂️

