import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  User, 
  Calendar,
  FileText,
  Apple,
  CheckCircle,
  Settings
} from 'lucide-react';
import localDataService from './services/localDataService.js';
import ProfileEditor from './components/ProfileEditor.jsx';
import AICoachCheckin from './components/AICoachCheckin.jsx';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('ai-coach');
  const [showProfile, setShowProfile] = useState(false);
  const [athleteData, setAthleteData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load athlete data on component mount
  useEffect(() => {
    try {
      const data = localDataService.getAthleteProfile();
      setAthleteData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading athlete data:', error);
      setLoading(false);
    }
  }, []);

  // Handle profile updates
  const handleProfileSave = (updatedProfile) => {
    setAthleteData(updatedProfile);
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Show error state if no athlete data
  if (!athleteData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading athlete profile</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  // Tab configuration with icons
  const tabs = [
    { id: 'ai-coach', label: 'Daily Check-in', icon: MessageCircle },
    { id: 'training', label: 'Training', icon: Calendar },
    { id: 'logs', label: 'Logs', icon: FileText },
    { id: 'nutrition', label: 'Nutrition', icon: Apple }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Pace</h1>
                <p className="text-xs text-gray-500">AI Track & Field Coach</p>
              </div>
            </div>

            {/* Status and User Info */}
            <div className="flex items-center space-x-4">
              {/* AI Status Badge */}
              <div className="flex items-center space-x-2">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  AI Ready
                </div>
              </div>

              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">
                    {athleteData ? athleteData.profile.name : 'Loading...'}
                  </p>
                  <p className="text-gray-500">
                    {athleteData ? `${athleteData.athletics.primaryEvent} Specialist` : ''}
                  </p>
                </div>
              </div>

              {/* Profile Button */}
              <div>
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Settings className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Tab Navigation */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-gray-200">
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
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Enhanced Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'ai-coach' ? (
          <AICoachCheckin />
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              {tabs.find(tab => tab.id === activeTab) && (
                <div className="bg-blue-100 p-3 rounded-lg">
                  {React.createElement(tabs.find(tab => tab.id === activeTab).icon, {
                    className: "h-6 w-6 text-blue-600"
                  })}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {tabs.find(tab => tab.id === activeTab)?.label || 'Dashboard'}
                </h2>
                <p className="text-gray-500">
                  {activeTab === 'ai-coach' && 'Connect with your AI coach for personalized guidance'}
                  {activeTab === 'training' && 'View and manage your training schedule'}
                  {activeTab === 'logs' && 'Track your progress and performance'}
                  {activeTab === 'nutrition' && 'Get personalized nutrition recommendations'}
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {React.createElement(tabs.find(tab => tab.id === activeTab).icon, {
                    className: "h-8 w-8 text-gray-400"
                  })}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {tabs.find(tab => tab.id === activeTab)?.label} Coming Soon
                </h3>
                <p className="text-gray-500">
                  This section is under development. Check back soon for updates!
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Profile Editor Modal */}
      <ProfileEditor
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        onSave={handleProfileSave}
      />
    </div>
  );
}

export default App;
