/**
 * ElevenLabs Integration Service
 * Handles dynamic variables, conversation setup, and agent integration
 */

import LocalDataService from './localDataService.js';

class ElevenLabsIntegration {
  constructor() {
    this.dataService = new LocalDataService();
    this.agentId = 'agent_4701k28hw2jvfj79kkypdbhyd93m';
  }

  /**
   * Generate comprehensive dynamic variables for the AI agent
   */
  getDynamicVariables(athlete) {
    if (!athlete) return {};

    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    // Calculate days until competition
    const nextCompDate = new Date(athlete.competitions?.upcoming?.[0]?.date || '2024-06-15');
    const daysUntilComp = Math.ceil((nextCompDate - now) / (1000 * 60 * 60 * 24));

    return {
      // Basic Profile
      athlete_name: athlete.profile?.name || 'Athlete',
      athlete_age: athlete.profile?.age || 20,
      athlete_event: athlete.athletics?.primaryEvent || '100m',
      athlete_level: athlete.athletics?.competitionLevel || 'collegiate',
      
      // Personal Bests
      pb_100m: athlete.profile?.personalBests?.['100m'] || '10.80',
      pb_200m: athlete.profile?.personalBests?.['200m'] || '22.50',
      pb_400m: athlete.profile?.personalBests?.['400m'] || '50.00',
      
      // Current Training
      current_phase: athlete.training?.currentPhase || 'competition',
      training_week: athlete.training?.weeklySchedule?.length || 6,
      current_energy: athlete.wellness?.currentEnergy || 7,
      current_motivation: athlete.wellness?.motivation || 8,
      
      // Recent Performance
      last_session_type: athlete.training?.recentSessions?.[0]?.type || 'speed',
      last_session_rpe: athlete.training?.recentSessions?.[0]?.rpe || 7,
      last_session_date: athlete.training?.recentSessions?.[0]?.date || today,
      
      // Goals & Competition
      primary_goal: athlete.profile?.goals?.primary || 'Run sub-10.70 in 100m',
      next_competition: athlete.competitions?.upcoming?.[0]?.name || 'Conference Championships',
      days_until_comp: daysUntilComp,
      target_time: athlete.profile?.goals?.targetTimes?.['100m'] || '10.65',
      
      // Strength & Power
      strength_focus: athlete.training?.strengthFocus || 'power development',
      squat_1rm: athlete.training?.strengthStats?.backSquat1RM || '140kg',
      clean_1rm: athlete.training?.strengthStats?.powerClean1RM || '110kg',
      
      // Today's Context
      today_date: today,
      today_workout: this.getTodaysWorkout(athlete),
      week_focus: athlete.training?.weeklyFocus || 'race preparation',
      
      // Recovery & Wellness
      sleep_quality: athlete.wellness?.sleepQuality || 7,
      stress_level: athlete.wellness?.stressLevel || 4,
      injury_status: athlete.wellness?.injuryStatus || 'healthy',
      
      // Nutrition
      nutrition_plan: athlete.nutrition?.plan || 'competition prep',
      hydration_status: athlete.wellness?.hydrationLevel || 8,
      
      // Technical Focus
      tech_focus: athlete.training?.technicalFocus || 'start mechanics',
      recent_splits: athlete.training?.recentSplits || '0-30m: 3.95s, 30-60m: 2.85s',
      
      // Mental State
      confidence_level: athlete.wellness?.confidence || 8,
      race_readiness: athlete.athletics?.raceReadiness || 85
    };
  }

  /**
   * Get today's planned workout
   */
  getTodaysWorkout(athlete) {
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const schedule = athlete.training?.weeklySchedule || [];
    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = dayNames[today];
    
    const todaysSession = schedule.find(session => session.day === todayName);
    return todaysSession?.type || 'Recovery';
  }

  /**
   * Generate Talk-to URL with dynamic variables
   */
  generateTalkToURL(agentId, athlete) {
    const variables = this.getDynamicVariables(athlete);
    const baseURL = `https://elevenlabs.io/convai/conversation/${agentId}`;
    
    // Create URL with dynamic variables as query parameters
    const params = new URLSearchParams();
    Object.entries(variables).forEach(([key, value]) => {
      params.append(`var_${key}`, value);
    });
    
    const fullURL = `${baseURL}?${params.toString()}`;
    
    return {
      baseURL,
      fullURL,
      variables,
      variableCount: Object.keys(variables).length
    };
  }

  /**
   * Initialize conversation with context
   */
  async startConversation(userId, mode = 'voice', athlete = null) {
    try {
      if (!athlete) {
        athlete = this.dataService.getAthleteProfile();
      }

      const variables = this.getDynamicVariables(athlete);
      
      console.log('Starting ElevenLabs conversation with variables:', variables);
      
      // Return success response
      return {
        success: true,
        mode,
        variables,
        message: 'Conversation started with full athlete context'
      };
    } catch (error) {
      console.error('Error starting conversation:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Test dynamic variables generation
   */
  testDynamicVariables(athlete) {
    const variables = this.getDynamicVariables(athlete);
    
    return {
      success: true,
      variableCount: Object.keys(variables).length,
      sampleVariables: Object.fromEntries(Object.entries(variables).slice(0, 10)),
      allVariables: variables,
      timestamp: new Date().toISOString()
    };
  }
}

export default ElevenLabsIntegration;
