import React, { useState, useEffect } from 'react';
import './App.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  MessageCircle, 
  Calendar, 
  BarChart3, 
  Apple,
  Settings,
  User,
  Phone,
  CheckCircle,
  Mic,
  Volume2,
  Bot,
  Clock,
  Target,
  TrendingUp,
  Star,
  Play,
  Pause
} from 'lucide-react';

// Import components and data
import SettingsPanel from './components/SettingsPanel';
import ConversationPage from './components/ConversationPage';
import { weeklyTrainingPlan, trainingStats } from './data/trainingData';
import { workoutLogs, aiConversations, logsStats } from './data/logsData';

const App = () => {
  const [activeTab, setActiveTab] = useState('coach');
  const [showSettings, setShowSettings] = useState(false);
  const [showConversation, setShowConversation] = useState(false);
  const [athleteSettings, setAthleteSettings] = useState({
    height: '70',
    weight: '160',
    event: 'Sprints',
    time_in_the_season: 'In-Season',
    training_schedule: '5',
    current_pr: '11.25',
    goal_pr: '10.95',
    name: 'Alex Johnson'
  });
  const [activeLogsTab, setActiveLogsTab] = useState('workouts');

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('paceAthleteSettings');
    if (savedSettings) {
      try {
        setAthleteSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error parsing saved settings:', error);
        localStorage.setItem('paceAthleteSettings', JSON.stringify(athleteSettings));
      }
    } else {
      // Save default settings to localStorage
      localStorage.setItem('paceAthleteSettings', JSON.stringify(athleteSettings));
    }
  }, []);

  const handleSettingsSave = (newSettings) => {
    setAthleteSettings(newSettings);
  };

  const startConversation = () => {
    setShowConversation(true);
  };

  const backFromConversation = () => {
    setShowConversation(false);
  };

  // Handle conversation page with error boundary
  if (showConversation) {
    try {
      return <ConversationPage onBack={backFromConversation} />;
    } catch (error) {
      console.error('Error rendering conversation page:', error);
      setShowConversation(false);
      // Fall through to render main app
    }
  }

  const tabs = [
    { id: 'coach', label: 'AI Coach', icon: MessageCircle, badge: null, color: 'blue' },
    { id: 'training', label: 'Training', icon: Calendar, badge: '7', color: 'yellow' },
    { id: 'logs', label: 'Logs', icon: BarChart3, badge: '24', color: 'purple' },
    { id: 'nutrition', label: 'Nutrition', icon: Apple, badge: null, color: 'teal' }
  ];

  const renderTabContent = () => {
    if (activeTab === 'coach') {
      return (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Live AI Coach Status Alert */}
          <Alert className="border-green-200 bg-green-50 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              ✅ 🎉 <strong>Live AI Coach Active!</strong> Your personalized AI coach is ready to help with your training. Click "Start a call" below to begin your voice conversation with Coach Alex.
            </AlertDescription>
          </Alert>

          {/* Main Coach Interface Card */}
          <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <CardContent className="p-6">
              {/* Ready Status Section */}
              <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Ready to start conversation</p>
                    <p className="text-sm text-gray-600">Personalized for {athleteSettings.name}</p>
                  </div>
                </div>
                <Button 
                  onClick={startConversation}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Start Conversation</span>
                </Button>
              </div>

              {/* AI Coach Context */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Bot className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium text-blue-900">AI Coach Context</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-blue-800">Event:</span>
                    <span className="ml-2 text-blue-700">{athleteSettings.event}</span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-800">Phase:</span>
                    <span className="ml-2 text-blue-700">{athleteSettings.time_in_the_season}</span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-800">Current PR:</span>
                    <span className="ml-2 text-blue-700">{athleteSettings.current_pr}</span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-800">Goal PR:</span>
                    <span className="ml-2 text-blue-700">{athleteSettings.goal_pr}</span>
                  </div>
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  Coach Alex has access to your complete profile and training history
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Mic className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium text-gray-900 mb-1">Voice Conversations</h4>
                  <p className="text-xs text-gray-600">Natural speech interaction</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <User className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-medium text-gray-900 mb-1">Personalized Coaching</h4>
                  <p className="text-xs text-gray-600">Based on your profile</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Volume2 className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-medium text-gray-900 mb-1">24/7 Availability</h4>
                  <p className="text-xs text-gray-600">Always ready to help</p>
                </div>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center mt-6">
                By using this AI coach, you agree to our terms of service and privacy policy.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (activeTab === 'training') {
      return (
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Training Stats */}
          <div className="grid grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">{trainingStats.thisWeek.workouts}</div>
                <div className="text-sm text-gray-600">Workouts This Week</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-gray-900">{trainingStats.thisWeek.hours}h</div>
                <div className="text-sm text-gray-600">Training Hours</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-gray-900">{trainingStats.thisWeek.distance}</div>
                <div className="text-sm text-gray-600">Distance Covered</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-gray-900">{trainingStats.thisWeek.completion}%</div>
                <div className="text-sm text-gray-600 mb-2">Week Complete</div>
                <Progress value={trainingStats.thisWeek.completion} className="h-2" />
              </CardContent>
            </Card>
          </div>

          {/* Weekly Training Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>{weeklyTrainingPlan.week}</span>
                <Badge className="bg-blue-100 text-blue-800">{weeklyTrainingPlan.phase}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {weeklyTrainingPlan.workouts.map((workout, index) => (
                  <Card key={workout.id} className={`border-l-4 ${workout.status === 'completed' ? 'border-green-500 bg-green-50' : 'border-blue-500 bg-blue-50'}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{workout.day}</h3>
                          <p className="text-sm text-gray-600">{workout.date}</p>
                        </div>
                        <Badge className={workout.status === 'completed' ? 'bg-green-600' : 'bg-gray-400'}>
                          {workout.status}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{workout.type}</h4>
                      <p className="text-sm text-gray-600 mb-2">{workout.duration} • {workout.intensity}</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {workout.exercises.map((exercise, i) => (
                          <li key={i}>• {exercise}</li>
                        ))}
                      </ul>
                      {workout.notes && (
                        <p className="text-xs text-blue-600 mt-2 italic">{workout.notes}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (activeTab === 'logs') {
      return (
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Logs Stats */}
          <div className="grid grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">{logsStats.totalWorkouts}</div>
                <div className="text-sm text-gray-600">Total Workouts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-gray-900">{logsStats.totalHours}h</div>
                <div className="text-sm text-gray-600">Total Hours</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-gray-900">{logsStats.totalDistance}km</div>
                <div className="text-sm text-gray-600">Total Distance</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Bot className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-gray-900">{logsStats.aiSessions}</div>
                <div className="text-sm text-gray-600">AI Sessions</div>
              </CardContent>
            </Card>
          </div>

          {/* Logs Tabs */}
          <Card>
            <CardHeader>
              <div className="flex space-x-1">
                <Button
                  variant={activeLogsTab === 'workouts' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveLogsTab('workouts')}
                >
                  Workout History
                </Button>
                <Button
                  variant={activeLogsTab === 'conversations' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveLogsTab('conversations')}
                >
                  AI Conversations
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {activeLogsTab === 'workouts' && (
                <div className="space-y-4">
                  {workoutLogs.map((log, index) => (
                    <Card key={index} className="border-l-4 border-blue-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{log.workout}</h3>
                            <p className="text-sm text-gray-600">{log.date}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < log.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">{log.rating}/5</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                          <div>
                            <span className="font-medium">Duration:</span> {log.duration}
                          </div>
                          <div>
                            <span className="font-medium">Distance:</span> {log.distance}
                          </div>
                          <div>
                            <span className="font-medium">Avg Pace:</span> {log.avgPace}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">{log.notes}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeLogsTab === 'conversations' && (
                <div className="space-y-4">
                  {aiConversations.map((conversation, index) => (
                    <Card key={index} className="border-l-4 border-green-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{conversation.topic}</h3>
                            <p className="text-sm text-gray-600">{conversation.date} • {conversation.duration}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            {conversation.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{conversation.summary}</p>
                        <div className="text-xs text-gray-600">
                          <strong>Key Points:</strong> {conversation.keyPoints.join(', ')}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    if (activeTab === 'nutrition') {
      return (
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Daily Nutrition Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Apple className="h-5 w-5" />
                <span>Daily Nutrition Targets</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">2,800</div>
                  <div className="text-sm text-gray-600">Calories</div>
                  <Progress value={75} className="h-2 mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">140g</div>
                  <div className="text-sm text-gray-600">Protein (20%)</div>
                  <Progress value={80} className="h-2 mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">350g</div>
                  <div className="text-sm text-gray-600">Carbs (50%)</div>
                  <Progress value={70} className="h-2 mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">93g</div>
                  <div className="text-sm text-gray-600">Fat (30%)</div>
                  <Progress value={65} className="h-2 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nutrition Guidelines */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pre-Workout Nutrition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">2-3 Hours Before</h4>
                  <p className="text-sm text-blue-700">Balanced meal with carbs, protein, and minimal fat</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900">30-60 Minutes Before</h4>
                  <p className="text-sm text-green-700">Light carb snack (banana, toast) + hydration</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Post-Workout Recovery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900">Within 30 Minutes</h4>
                  <p className="text-sm text-purple-700">3:1 carb to protein ratio for glycogen replenishment</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-900">2 Hours After</h4>
                  <p className="text-sm text-orange-700">Complete meal with quality protein and complex carbs</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hydration Strategy */}
          <Card>
            <CardHeader>
              <CardTitle>Hydration Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">3L</div>
                  <div className="text-sm text-gray-600">Daily Target</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">+500ml</div>
                  <div className="text-sm text-gray-600">Per Hour Training</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-xl font-bold text-purple-600">150%</div>
                  <div className="text-sm text-gray-600">Replace Sweat Loss</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Pace</h1>
                  <p className="text-xs text-gray-600">AI Track & Field Coach</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                AI Ready
              </Badge>
              
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{athleteSettings.name}</p>
                <p className="text-xs text-gray-600">Profile Complete</p>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    isActive
                      ? `border-${tab.color}-500 text-${tab.color}-600`
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  style={{
                    borderBottomColor: isActive ? 
                      (tab.color === 'blue' ? '#3b82f6' : 
                       tab.color === 'yellow' ? '#eab308' : 
                       tab.color === 'purple' ? '#a855f7' : 
                       tab.color === 'teal' ? '#14b8a6' : '#6b7280') : 'transparent',
                    color: isActive ? 
                      (tab.color === 'blue' ? '#2563eb' : 
                       tab.color === 'yellow' ? '#ca8a04' : 
                       tab.color === 'purple' ? '#9333ea' : 
                       tab.color === 'teal' ? '#0f766e' : '#6b7280') : undefined
                  }}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <Badge variant="secondary" className="text-xs bg-white text-gray-700">
                      {tab.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onSave={handleSettingsSave}
          currentSettings={athleteSettings}
        />
      )}
    </div>
  );
};

export default App;

