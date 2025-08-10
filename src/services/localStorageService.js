// Local storage service for managing user profile data
import { testUserData } from '../data/testUserData';

// Initialize localStorage with demo data if it doesn't exist
export const initializeLocalStorage = () => {
  try {
    const existingProfile = localStorage.getItem('userProfile');
    if (!existingProfile) {
      localStorage.setItem('userProfile', JSON.stringify(testUserData));
      console.log('✅ Initialized localStorage with demo athlete profile');
    }
  } catch (error) {
    console.error('Error initializing localStorage:', error);
  }
};

// Get the complete user profile
export const getUserProfile = () => {
  try {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      return JSON.parse(profile);
    } else {
      // Fallback to test data and initialize localStorage
      initializeLocalStorage();
      return testUserData;
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    return testUserData; // Fallback to test data
  }
};

// Update the user profile
export const updateUserProfile = (newProfile) => {
  try {
    localStorage.setItem('userProfile', JSON.stringify(newProfile));
    console.log('✅ Updated user profile in localStorage');
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};

// Get a formatted summary for AI context
export const getProfileSummary = () => {
  const profile = getUserProfile();
  
  return {
    name: profile.profile.name,
    event: profile.profile.primaryEvent,
    personalBest: profile.profile.personalBests["100m"],
    goal: profile.profile.goals.primary,
    nextCompetition: profile.lifestyle.currentStatus.nextCompetition,
    daysUntilCompetition: profile.lifestyle.currentStatus.daysUntilCompetition,
    currentPhase: profile.training.currentPhase,
    lastWorkoutType: profile.training.recentSessions[0]?.type || "No recent workout",
    lastWorkoutRPE: profile.training.recentSessions[0]?.rpe || 0,
    energy: profile.lifestyle.currentStatus.energy,
    motivation: profile.lifestyle.currentStatus.motivation,
    strength: {
      squat: profile.training.strengthStats.backSquat1RM,
      clean: profile.training.strengthStats.powerClean1RM
    }
  };
};

// Update specific sections of the profile
export const updateTrainingData = (trainingData) => {
  const profile = getUserProfile();
  profile.training = { ...profile.training, ...trainingData };
  return updateUserProfile(profile);
};

export const updateLifestyleData = (lifestyleData) => {
  const profile = getUserProfile();
  profile.lifestyle = { ...profile.lifestyle, ...lifestyleData };
  return updateUserProfile(profile);
};

export const updatePersonalBests = (newPBs) => {
  const profile = getUserProfile();
  profile.profile.personalBests = { ...profile.profile.personalBests, ...newPBs };
  return updateUserProfile(profile);
};

// Add a new training session
export const addTrainingSession = (session) => {
  const profile = getUserProfile();
  profile.training.recentSessions.unshift(session);
  
  // Keep only the last 10 sessions
  if (profile.training.recentSessions.length > 10) {
    profile.training.recentSessions = profile.training.recentSessions.slice(0, 10);
  }
  
  return updateUserProfile(profile);
};

// Update current status (energy, motivation, etc.)
export const updateCurrentStatus = (status) => {
  const profile = getUserProfile();
  profile.lifestyle.currentStatus = { ...profile.lifestyle.currentStatus, ...status };
  return updateUserProfile(profile);
};

// Clear all data (for testing)
export const clearLocalStorage = () => {
  try {
    localStorage.removeItem('userProfile');
    console.log('🗑️ Cleared localStorage');
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

// Initialize on import
initializeLocalStorage();

export default {
  getUserProfile,
  updateUserProfile,
  getProfileSummary,
  updateTrainingData,
  updateLifestyleData,
  updatePersonalBests,
  addTrainingSession,
  updateCurrentStatus,
  clearLocalStorage,
  initializeLocalStorage
};
