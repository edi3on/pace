// Local data service - replaces Firebase with localStorage
import athleteData from '../data/athleteData.json';

const LOCAL_STORAGE_KEYS = {
  ATHLETE_PROFILE: 'pace_athlete_profile',
  TRAINING_LOGS: 'pace_training_logs',
  NUTRITION_LOGS: 'pace_nutrition_logs',
  USER_PREFERENCES: 'pace_user_preferences',
  CONVERSATION_HISTORY: 'pace_conversations',
  PERFORMANCE_DATA: 'pace_performance'
};

class LocalDataService {
  constructor() {
    this.initializeData();
  }

  // Initialize with demo data if no existing data
  initializeData() {
    if (!this.getAthleteProfile()) {
      this.setAthleteProfile(athleteData.athlete);
    }
    
    if (!this.getTrainingLogs()) {
      this.setTrainingLogs([]);
    }
    
    if (!this.getNutritionLogs()) {
      this.setNutritionLogs([]);
    }
    
    if (!this.getUserPreferences()) {
      this.setUserPreferences({
        theme: 'light',
        notifications: true,
        units: 'imperial',
        language: 'en'
      });
    }
  }

  // Athlete Profile Management
  getAthleteProfile() {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEYS.ATHLETE_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading athlete profile:', error);
      return null;
    }
  }

  setAthleteProfile(profile) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ATHLETE_PROFILE, JSON.stringify(profile));
      return true;
    } catch (error) {
      console.error('Error saving athlete profile:', error);
      return false;
    }
  }

  updateAthleteProfile(updates) {
    const currentProfile = this.getAthleteProfile();
    if (currentProfile) {
      const updatedProfile = { ...currentProfile, ...updates };
      return this.setAthleteProfile(updatedProfile);
    }
    return false;
  }

  // Training Logs Management
  getTrainingLogs() {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEYS.TRAINING_LOGS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading training logs:', error);
      return [];
    }
  }

  setTrainingLogs(logs) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TRAINING_LOGS, JSON.stringify(logs));
      return true;
    } catch (error) {
      console.error('Error saving training logs:', error);
      return false;
    }
  }

  addTrainingLog(log) {
    const logs = this.getTrainingLogs();
    const newLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...log
    };
    logs.push(newLog);
    return this.setTrainingLogs(logs);
  }

  // Nutrition Logs Management
  getNutritionLogs() {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEYS.NUTRITION_LOGS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading nutrition logs:', error);
      return [];
    }
  }

  setNutritionLogs(logs) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.NUTRITION_LOGS, JSON.stringify(logs));
      return true;
    } catch (error) {
      console.error('Error saving nutrition logs:', error);
      return false;
    }
  }

  addNutritionLog(log) {
    const logs = this.getNutritionLogs();
    const newLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...log
    };
    logs.push(newLog);
    return this.setNutritionLogs(logs);
  }

  // User Preferences Management
  getUserPreferences() {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_PREFERENCES);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading user preferences:', error);
      return null;
    }
  }

  setUserPreferences(preferences) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
      return true;
    } catch (error) {
      console.error('Error saving user preferences:', error);
      return false;
    }
  }

  updateUserPreferences(updates) {
    const currentPreferences = this.getUserPreferences();
    if (currentPreferences) {
      const updatedPreferences = { ...currentPreferences, ...updates };
      return this.setUserPreferences(updatedPreferences);
    }
    return false;
  }

  // Conversation History Management
  getConversationHistory() {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEYS.CONVERSATION_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading conversation history:', error);
      return [];
    }
  }

  addConversation(conversation) {
    const conversations = this.getConversationHistory();
    const newConversation = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...conversation
    };
    conversations.push(newConversation);
    
    // Keep only last 50 conversations to prevent storage bloat
    if (conversations.length > 50) {
      conversations.splice(0, conversations.length - 50);
    }
    
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CONVERSATION_HISTORY, JSON.stringify(conversations));
      return true;
    } catch (error) {
      console.error('Error saving conversation:', error);
      return false;
    }
  }

  clearConversationHistory() {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CONVERSATION_HISTORY);
      return true;
    } catch (error) {
      console.error('Error clearing conversation history:', error);
      return false;
    }
  }

  // Performance Data Management
  getPerformanceData() {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEYS.PERFORMANCE_DATA);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading performance data:', error);
      return [];
    }
  }

  addPerformanceData(performance) {
    const performanceData = this.getPerformanceData();
    const newPerformance = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...performance
    };
    performanceData.push(newPerformance);
    
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.PERFORMANCE_DATA, JSON.stringify(performanceData));
      return true;
    } catch (error) {
      console.error('Error saving performance data:', error);
      return false;
    }
  }

  // Utility Methods
  exportAllData() {
    return {
      athleteProfile: this.getAthleteProfile(),
      trainingLogs: this.getTrainingLogs(),
      nutritionLogs: this.getNutritionLogs(),
      userPreferences: this.getUserPreferences(),
      conversationHistory: this.getConversationHistory(),
      performanceData: this.getPerformanceData(),
      exportDate: new Date().toISOString()
    };
  }

  clearAllData() {
    try {
      Object.values(LOCAL_STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      this.initializeData(); // Reinitialize with demo data
      return true;
    } catch (error) {
      console.error('Error clearing all data:', error);
      return false;
    }
  }

  // Get formatted data for AI context
  getAIContextData() {
    const profile = this.getAthleteProfile();
    const recentLogs = this.getTrainingLogs().slice(-10); // Last 10 training sessions
    const recentNutrition = this.getNutritionLogs().slice(-7); // Last 7 days nutrition
    
    return {
      athlete: profile,
      recentTraining: recentLogs,
      recentNutrition: recentNutrition,
      preferences: this.getUserPreferences(),
      lastUpdated: new Date().toISOString()
    };
  }

  // Generate summary for AI briefing
  generateAISummary() {
    const profile = this.getAthleteProfile();
    if (!profile) return null;

    return {
      basicInfo: {
        name: profile.profile.name,
        age: profile.profile.age,
        height: profile.profile.height.display,
        weight: profile.profile.weight.display,
        primaryEvent: profile.athletics.primaryEvent,
        level: profile.athletics.experience.level
      },
      currentGoals: profile.athletics.goals.shortTerm,
      personalBests: profile.athletics.personalBests.outdoor,
      trainingPhase: profile.training.currentPhase,
      nutritionTargets: profile.nutrition.dailyTargets,
      keyStats: {
        bodyFat: profile.profile.bodyComposition.bodyFatPercentage,
        restingHR: profile.health.vitalSigns.restingHeartRate,
        trainingConsistency: profile.training.recentPerformance.trainingConsistency
      }
    };
  }
}

// Create and export singleton instance
const localDataService = new LocalDataService();
export default localDataService;
