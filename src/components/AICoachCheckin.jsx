import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bot, 
  Mic, 
  Phone,
  Calendar,
  Target,
  Activity,
  Heart,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle,
  MicOff,
  MessageCircle
} from 'lucide-react';
import { testUserData, getUserContextForAI } from '../data/testUserData';
import { getProfileSummary, getUserProfile } from '../services/localStorageService';
import ElevenLabsIntegration from '../services/elevenLabsIntegration.js';
import LocalDataService from '../services/localDataService.js';

const AICoachCheckin = () => {
  console.log('🚀 AICoachCheckin component loading...');
  
  const [isAgentReady, setIsAgentReady] = useState(false);
  const [contextSent, setContextSent] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [athlete, setAthlete] = useState(null);
  const [dynamicVariables, setDynamicVariables] = useState(null);
  const audioRef = useRef(null);
  const streamRef = useRef(null);
  
  // Services
  const dataService = new LocalDataService();
  const elevenLabsService = new ElevenLabsIntegration();
  
  // Your ElevenLabs agent ID
  const AGENT_ID = 'agent_4701k28hw2jvfj79kkypdbhyd93m';

  console.log('✅ State variables initialized successfully');

  // Initialize the component
  useEffect(() => {
    console.log('🎯 Initializing AI Coach component...');
    loadAthleteAndGenerateVariables();
  }, []);

  // Load athlete data and generate dynamic variables
  const loadAthleteAndGenerateVariables = async () => {
    try {
      // Load athlete profile from test data for now
      const athleteProfile = testUserData;
      setAthlete(athleteProfile);
      
      if (athleteProfile) {
        // Generate dynamic variables
        const variables = elevenLabsService.getDynamicVariables(athleteProfile);
        setDynamicVariables(variables);
        
        console.log('Generated dynamic variables:', variables);
      }
      
      setIsAgentReady(true);
      setContextSent(true);
    } catch (error) {
      console.error('Error loading athlete data:', error);
    }
  };

  // Load the ElevenLabs script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(script);
    };
  }, []);

  // Function to start the daily check-in
  const startDailyCheckin = async () => {
    try {
      console.log('🎙️ Starting daily check-in...');
      
      // Try to access the ElevenLabs widget
      const widget = document.querySelector('elevenlabs-convai');
      if (widget) {
        console.log('✅ Found ElevenLabs widget, starting conversation...');
        
        // Set dynamic variables if supported
        if (dynamicVariables) {
          Object.entries(dynamicVariables).forEach(([key, value]) => {
            widget.setAttribute(`data-${key}`, value);
          });
        }
        
        // Trigger the conversation start
        widget.dispatchEvent(new CustomEvent('start-conversation'));
        setIsListening(true);
        setConnectionStatus('connected');
      } else {
        console.log('⚠️ ElevenLabs widget not found, falling back to service method');
        const result = await elevenLabsService.startConversation('demo-user', 'voice', athlete);
        console.log('Conversation started:', result);
        setIsListening(true);
        setConnectionStatus('connected');
      }
    } catch (error) {
      console.error('❌ Error starting daily check-in:', error);
      setConnectionStatus('error');
    }
  };

  // Generate comprehensive briefing about the athlete
  const generateComprehensiveBriefing = (profile) => {
    try {
      const { profile: basicInfo, training, lifestyle, seasonProgress } = profile;
      
      return `**ATHLETE BRIEFING FILE**

**ATHLETE OVERVIEW:**
- Name: ${basicInfo.name}
- Age: ${basicInfo.age} years old, ${basicInfo.gender}
- Physical: ${basicInfo.height}, ${basicInfo.weight}
- Primary Event: ${basicInfo.primaryEvent} (specialist in ${basicInfo.primaryEventGroup})
- Experience: ${basicInfo.experienceLevel} level, currently competing at ${basicInfo.currentLevel}

**PERSONAL RECORDS:**
${Object.entries(basicInfo.personalBests).map(([event, time]) => `- ${event}: ${time}`).join('\n')}

**CURRENT GOALS:**
- Primary: ${basicInfo.goals.primary}
- Secondary: ${basicInfo.goals.secondary}  
- Long-term: ${basicInfo.goals.longTerm}

**TRAINING STATUS:**
- Current Phase: ${training.currentPhase}
- Training Cycle: ${training.currentCycle} (Week ${training.weeksInCycle} of season)
- Weekly Volume: ${training.weeklyVolume}
- Total weeks this season: ${training.totalWeeksThisSeason}

**WEEKLY TRAINING SCHEDULE:**
${Object.entries(training.weeklySchedule).map(([day, workout]) => `- ${day.charAt(0).toUpperCase() + day.slice(1)}: ${workout}`).join('\n')}

**RECENT TRAINING SESSIONS:**
${training.recentSessions.slice(0, 3).map((session, i) => `
${i + 1}. ${session.date} - ${session.type}
   Workout: ${session.workoutDetails}
   Times: ${session.times ? session.times.join(', ') : 'N/A'}
   Feeling: ${session.feeling}, RPE: ${session.rpe}/10
   Notes: ${session.notes}`).join('\n')}

**STRENGTH NUMBERS:**
- Back Squat 1RM: ${training.strengthStats.backSquat1RM}
- Power Clean 1RM: ${training.strengthStats.powerClean1RM}
- Bench Press 1RM: ${training.strengthStats.benchPress1RM}
- Bodyweight Ratios: Squat ${training.strengthStats.bodyweightRatio.squat}x, Clean ${training.strengthStats.bodyweightRatio.clean}x

**NUTRITION & LIFESTYLE:**
- Daily Calories: ${lifestyle.nutrition.dailyCalories}
- Macro Split: ${lifestyle.nutrition.macroSplit}
- Meals per day: ${lifestyle.nutrition.meals}
- Hydration: ${lifestyle.nutrition.hydration}
- Current Supplements: ${lifestyle.nutrition.supplements.join(', ')}
- Current Weight: ${lifestyle.nutrition.currentWeight}

**RECOVERY PROFILE:**
- Sleep: ${lifestyle.recovery.sleepAverage} (${lifestyle.recovery.sleepQuality} quality)
- Resting HR: ${lifestyle.recovery.restingHR}
- HRV Range: ${lifestyle.recovery.hrv}
- Stress Level: ${lifestyle.recovery.stressLevel}
- Recovery Methods: ${lifestyle.recovery.recoveryMethods.join(', ')}

**CURRENT STATUS (as of today):**
- Energy Level: ${lifestyle.currentStatus.energy}
- Motivation: ${lifestyle.currentStatus.motivation}
- Physical State: ${lifestyle.currentStatus.soreness}
- Stress Level: ${lifestyle.currentStatus.stress}
- Confidence: ${lifestyle.currentStatus.confidence}

**COMPETITION SCHEDULE:**
- Next Competition: ${lifestyle.currentStatus.nextCompetition}
- Days Until: ${lifestyle.currentStatus.daysUntilCompetition}
- Last Competition Result: ${lifestyle.currentStatus.lastCompetition}

**SEASON PROGRESS:**
- Season Start: ${seasonProgress.startDate}
- Current Season Best 100m: ${seasonProgress.improvements['100m'].seasonBest}
- Improvement from last season: ${seasonProgress.improvements['100m'].improvement}
- Consistency: ${seasonProgress.improvements['100m'].consistency}
- Strength Gains: Squat +${seasonProgress.improvements.strength.squatImprovement}, Clean +${seasonProgress.improvements.strength.powerCleanImprovement}

**UPCOMING GOALS:**
- Immediate: ${seasonProgress.upcomingGoals.immediate}
- Mid-term: ${seasonProgress.upcomingGoals.midTerm}
- End of Season: ${seasonProgress.upcomingGoals.endOfSeason}

**COACHING NOTES:**
- This athlete is ${lifestyle.currentStatus.daysUntilCompetition} days away from their next competition
- They need to run ${basicInfo.goals.primary} to achieve their main goal
- Current training phase is ${training.currentPhase} - adjust advice accordingly
- Last training session was ${training.recentSessions[0].type} with RPE ${training.recentSessions[0].rpe}/10
- They felt "${training.recentSessions[0].feeling}" in their last session

**TODAY'S CHECK-IN CONTEXT:**
Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. You are Coach Alex, an experienced track and field coach. You have just received this complete briefing about ${basicInfo.name}. You know EVERYTHING about their training, stats, and goals.

Start this conversation by:
1. Greeting ${basicInfo.name} warmly by name 
2. Briefly acknowledge their current training situation (you know they're in ${training.currentPhase} phase, ${lifestyle.currentStatus.daysUntilCompetition} days from competition)
3. Ask how they're feeling today and if they're ready for today's scheduled training: ${training.weeklySchedule[new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()]}
4. Reference their recent performance or training when appropriate

Be conversational and supportive. Since you have their complete profile, you can provide specific, personalized advice without asking for basic information you already know.`;
    } catch (error) {
      console.error('Error generating briefing:', error);
      return 'Error generating athlete briefing.';
    }
  };

  // Start the audio conversation with proper context briefing
  const startBriefedAudioCall = async () => {
    try {
      setConnectionStatus('connecting');
      console.log('🎤 Starting briefed audio call with Coach Alex...');
      
      // Get the current user profile
      const currentProfile = getUserProfile();
      
      // Generate the comprehensive briefing context
      const briefingContext = generateComprehensiveBriefing(currentProfile);
      
      console.log('📊 Generated briefing context:', briefingContext.substring(0, 200) + '...');

      // Make the API call to start the audio stream with context
      const response = await fetch(
        `https://api.elevenlabs.io/v1/agents/${AGENT_ID}/stream`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": API_KEY,
          },
          body: JSON.stringify({
            // Pass the formatted briefing data here
            "context": briefingContext,
            
            // The message history starts empty, as the user will speak first
            "messages": [], 
            
            // Optional: specify voice and other settings
            "voice_id": "21m00Tcm4TlvDq8ikWAM", // Example voice ID
          }),
        }
      );

      if (response.ok) {
        console.log('✅ Agent connection successful. Ready for user to speak.');
        setIsConnected(true);
        setConnectionStatus('connected');
        setIsListening(true);
        
        // Store the stream reference for later use
        streamRef.current = response;
        
        // Handle the incoming audio stream
        const reader = response.body.getReader();
        // Process the audio stream here...
        
      } else {
        console.error('❌ Failed to connect to agent:', response.status, response.statusText);
        setConnectionStatus('error');
      }
    } catch (error) {
      console.error('❌ Error starting audio call:', error);
      setConnectionStatus('error');
    }
  };

  // Disconnect from the agent
  const disconnectCall = () => {
    if (streamRef.current) {
      streamRef.current = null;
    }
    setIsConnected(false);
    setIsListening(false);
    setConnectionStatus('disconnected');
    console.log('📞 Disconnected from Coach Alex');
  };

  // Get current training day info
  let today, todaysTraining, daysUntilCompetition;
  try {
    today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    todaysTraining = testUserData.training.weeklySchedule[today] || 'Rest Day';
    daysUntilCompetition = testUserData.lifestyle.currentStatus.daysUntilCompetition;
  } catch (error) {
    console.error('Error getting training info:', error);
    today = 'monday';
    todaysTraining = 'Training';
    daysUntilCompetition = 30;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {testUserData.profile.name}!
        </h1>
        <p className="text-lg text-gray-600">
          Ready for your daily check-in with Coach Alex?
        </p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Next Competition</p>
                <p className="font-semibold text-blue-900">{daysUntilCompetition} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Season Best</p>
                <p className="font-semibold text-green-900">{testUserData.seasonProgress.improvements['100m'].seasonBest}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Activity className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Today's Training</p>
                <p className="font-semibold text-purple-900 text-xs">{todaysTraining}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Goal Progress</p>
                <p className="font-semibold text-orange-900 text-xs">0.05s to target</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main AI Coach Interface */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-3 rounded-xl">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Coach Alex</h2>
                <p className="text-sm text-gray-600 font-normal">
                  Your AI Sprint Coach • Briefed with your complete training profile
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={isAgentReady && contextSent ? "default" : "secondary"} 
                     className={isAgentReady && contextSent ? 'bg-green-600' : ''}>
                <div className={`w-2 h-2 rounded-full mr-2 ${isAgentReady && contextSent ? 'bg-white animate-pulse' : 'bg-gray-400'}`}></div>
                {isAgentReady && contextSent ? 'Ready for Check-in' : 'Loading Profile...'}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Pre-Check-in Context */}
            <Alert className="border-blue-200 bg-blue-50">
              <Heart className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                <strong>✅ AI Coach Fully Briefed!</strong> Coach Alex has your complete athlete profile including:
                personal records ({testUserData.profile.personalBests['100m']} 100m PB), recent training sessions, 
                strength numbers (Squat: {testUserData.training.strengthStats.backSquat1RM}), nutrition plan, 
                upcoming competition in {daysUntilCompetition} days, and your goal to {testUserData.profile.goals.primary}. 
                No need to re-explain your background - the coach knows everything!
              </AlertDescription>
            </Alert>

            {/* Training Context Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-600" />
                    Recent Training
                  </h4>
                  <p className="text-sm text-gray-600">
                    Last session: {testUserData.training.recentSessions[0].type} • 
                    RPE {testUserData.training.recentSessions[0].rpe}/10 • 
                    {testUserData.training.recentSessions[0].feeling}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-gray-600" />
                    Current Status
                  </h4>
                  <p className="text-sm text-gray-600">
                    Energy: {testUserData.lifestyle.currentStatus.energy} • 
                    Motivation: {testUserData.lifestyle.currentStatus.motivation} • 
                    {testUserData.lifestyle.currentStatus.soreness}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Audio Call Interface */}
            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 min-h-[400px] p-6">
              <div className="text-center">
                <div className="mb-6">
                  <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 
                    connectionStatus === 'connecting' ? 'bg-yellow-500 animate-spin' :
                    connectionStatus === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`}>
                    {connectionStatus === 'connected' ? 
                      <Mic className="h-12 w-12 text-white" /> :
                      connectionStatus === 'connecting' ? 
                      <Zap className="h-12 w-12 text-white" /> :
                      connectionStatus === 'error' ? 
                      <MicOff className="h-12 w-12 text-white" /> :
                      <Phone className="h-12 w-12 text-white" />
                    }
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {connectionStatus === 'connected' ? 'Connected to Coach Alex' :
                     connectionStatus === 'connecting' ? 'Connecting to Coach Alex...' :
                     connectionStatus === 'error' ? 'Connection Error' :
                     'Ready to Connect'}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6">
                    {connectionStatus === 'connected' ? 'Speak now - Coach Alex is listening and ready to help!' :
                     connectionStatus === 'connecting' ? 'Sending your complete training profile to Coach Alex...' :
                     connectionStatus === 'error' ? 'Failed to connect. Please check your API key and try again.' :
                     'Click below to start your audio conversation with Coach Alex'}
                  </p>
                </div>

                {!isConnected && connectionStatus !== 'connecting' && (
                  <Button
                    onClick={startBriefedAudioCall}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                    disabled={connectionStatus === 'error'}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Start Audio Check-in with Coach Alex
                  </Button>
                )}

                {isConnected && (
                  <div className="space-y-4">
                    <div className="flex justify-center space-x-4">
                      <Badge variant="outline" className={`px-4 py-2 ${isListening ? 'bg-green-50 border-green-300' : 'bg-gray-50'}`}>
                        {isListening ? '🎤 Listening...' : '🔇 Muted'}
                      </Badge>
                      <Badge variant="outline" className="px-4 py-2 bg-blue-50 border-blue-300">
                        📞 Connected
                      </Badge>
                    </div>
                    
                    <Button
                      onClick={disconnectCall}
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <MicOff className="h-4 w-4 mr-2" />
                      End Call
                    </Button>
                  </div>
                )}

                {connectionStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">
                      <strong>Connection Failed:</strong> Make sure your ElevenLabs API key is configured properly.
                      {API_KEY === 'your-api-key-here' && (
                        <span className="block mt-2">
                          ⚠️ API key not configured. Please set REACT_APP_ELEVENLABS_API_KEY in your environment.
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
              <Badge variant="outline" className="text-xs">
                💪 Ready to discuss today's {todaysTraining.toLowerCase()}
              </Badge>
              <Badge variant="outline" className="text-xs">
                🎯 {daysUntilCompetition} days until competition
              </Badge>
              <Badge variant="outline" className="text-xs">
                📊 Current PB: {testUserData.profile.personalBests['100m']}
              </Badge>
              <Badge variant="outline" className="text-xs">
                🥇 Goal: {testUserData.profile.goals.primary}
              </Badge>
              <Badge variant="outline" className="text-xs">
                🏋️ Squat: {testUserData.training.strengthStats.backSquat1RM}
              </Badge>
              <Badge variant="outline" className="text-xs">
                📈 Last session: {testUserData.training.recentSessions[0].type} (RPE {testUserData.training.recentSessions[0].rpe}/10)
              </Badge>
            </div>

            {/* Briefing Status */}
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Comprehensive Briefing Ready ✅
              </h4>
              <p className="text-sm text-green-700 mb-3">
                When you start the call, Coach Alex will receive your complete briefing including:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-green-600">
                <div>✓ Personal Records</div>
                <div>✓ Recent Training</div>
                <div>✓ Strength Numbers</div>
                <div>✓ Weekly Schedule</div>
                <div>✓ Nutrition Plan</div>
                <div>✓ Recovery Data</div>
                <div>✓ Competition Timeline</div>
                <div>✓ Current Goals</div>
              </div>
            </div>

            {/* AI Coach Check-in Button */}
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={startDailyCheckin}
                  className="flex items-center gap-2 h-16 bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  disabled={!isAgentReady}
                >
                  <Mic className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-semibold">Start Daily Check-in</div>
                    <div className="text-xs opacity-90">
                      {isListening ? 'Connected to AI Coach' : 'Talk to your AI coach'}
                    </div>
                  </div>
                </Button>

                <Button 
                  variant="outline"
                  className="flex items-center gap-2 h-16"
                  size="lg"
                  disabled
                >
                  <MessageCircle className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-semibold">Text Chat</div>
                    <div className="text-xs opacity-90">Coming soon</div>
                  </div>
                </Button>
              </div>

              {/* Connection Status */}
              {connectionStatus !== 'disconnected' && (
                <Alert>
                  <Bot className="h-4 w-4" />
                  <AlertDescription>
                    Status: {connectionStatus === 'connected' ? 'Connected to AI Coach' : 
                             connectionStatus === 'error' ? 'Connection error' : 'Connecting...'}
                    {dynamicVariables && ` • ${Object.keys(dynamicVariables).length} context variables loaded`}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* ElevenLabs Widget Embed */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-600" />
                AI Coach Chat Interface
              </h3>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Your AI coach has been loaded with {dynamicVariables ? Object.keys(dynamicVariables).length : 0} context variables 
                    about your training, goals, and performance.
                  </p>
                  <Badge variant="outline" className="text-xs">
                    Ready to chat with full athlete context
                  </Badge>
                </div>
                
                {/* ElevenLabs Conversational AI Widget */}
                <elevenlabs-convai 
                  agent-id={AGENT_ID}
                  style={{ height: '500px', width: '100%', borderRadius: '8px' }}
                ></elevenlabs-convai>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AICoachCheckin;
