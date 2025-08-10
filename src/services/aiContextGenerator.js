// AI Context Generator - creates comprehensive briefing for ElevenLabs AI
import localDataService from './localDataService.js';

class AIContextGenerator {
  
  // Generate a comprehensive context string for the AI coach
  generateFullContext() {
    const athleteData = localDataService.getAthleteProfile();
    if (!athleteData) {
      throw new Error('No athlete data available for AI context');
    }

    const summary = localDataService.generateAISummary();
    const recentTraining = this.getRecentTrainingContext();
    const nutritionStatus = this.getNutritionContext();
    
    return this.formatContextString({
      athlete: athleteData,
      summary,
      recentTraining,
      nutritionStatus,
      timestamp: new Date().toISOString()
    });
  }

  // Generate context specifically for daily check-ins
  generateCheckInContext() {
    const athleteData = localDataService.getAthleteProfile();
    const basicInfo = localDataService.generateAISummary();
    
    return this.formatCheckInString({
      name: basicInfo.basicInfo.name,
      primaryEvent: basicInfo.basicInfo.primaryEvent,
      currentGoal: basicInfo.currentGoals.primary,
      trainingPhase: basicInfo.trainingPhase,
      recentPerformance: this.getPerformanceHighlights(athleteData)
    });
  }

  // Get recent training context
  getRecentTrainingContext() {
    const logs = localDataService.getTrainingLogs();
    const recentSessions = logs.slice(-5); // Last 5 sessions
    
    if (recentSessions.length === 0) {
      return "No recent training data logged.";
    }

    return recentSessions.map(session => 
      `${session.date}: ${session.type} - ${session.focus} (${session.duration}min, ${session.intensity} intensity)`
    ).join('; ');
  }

  // Get nutrition context
  getNutritionContext() {
    const nutritionLogs = localDataService.getNutritionLogs();
    const recent = nutritionLogs.slice(-3); // Last 3 days
    
    if (recent.length === 0) {
      return "No recent nutrition data logged.";
    }

    const avgCalories = recent.reduce((sum, log) => sum + (log.totalCalories || 0), 0) / recent.length;
    return `Recent nutrition: averaging ${Math.round(avgCalories)} calories/day over ${recent.length} days`;
  }

  // Get performance highlights
  getPerformanceHighlights(athleteData) {
    const pbs = athleteData.athletics.personalBests.outdoor;
    const primaryEvent = athleteData.athletics.primaryEvent;
    const primaryPB = pbs[primaryEvent];
    
    return {
      primaryEventPB: primaryPB ? `${primaryPB.time} (${primaryPB.date})` : 'No PB recorded',
      trainingConsistency: `${athleteData.training.recentPerformance.trainingConsistency}%`,
      currentPhase: athleteData.training.currentPhase
    };
  }

  // Format complete context string for AI
  formatContextString({ athlete, summary, recentTraining, nutritionStatus, timestamp }) {
    return `
ATHLETE PROFILE BRIEFING FOR AI COACH
Generated: ${timestamp}

BASIC INFORMATION:
- Name: ${athlete.profile.name}
- Age: ${athlete.profile.age}
- Height: ${athlete.profile.height.display}
- Weight: ${athlete.profile.weight.display}
- Body Fat: ${athlete.profile.bodyComposition.bodyFatPercentage}%
- Resting HR: ${athlete.health.vitalSigns.restingHeartRate} bpm

ATHLETICS PROFILE:
- Primary Event: ${athlete.athletics.primaryEvent}
- Event Group: ${athlete.athletics.eventGroup}
- Competition Level: ${athlete.athletics.experience.level}
- Years Competing: ${athlete.athletics.experience.yearsCompeting}
- Team: ${athlete.athletics.experience.teamAffiliation}

PERSONAL BESTS:
- ${athlete.athletics.primaryEvent}: ${athlete.athletics.personalBests.outdoor[athlete.athletics.primaryEvent]?.time || 'N/A'}
- 100m: ${athlete.athletics.personalBests.outdoor['100m']?.time || 'N/A'}
- 200m: ${athlete.athletics.personalBests.outdoor['200m']?.time || 'N/A'}

CURRENT GOALS:
- Primary: ${athlete.athletics.goals.shortTerm.primary}
- Secondary: ${athlete.athletics.goals.shortTerm.secondary}
- Long-term: ${athlete.athletics.goals.longTerm.primary}

TRAINING STATUS:
- Current Phase: ${athlete.training.currentPhase}
- Phase Duration: ${athlete.training.phaseStartDate} to ${athlete.training.phaseEndDate}
- Coach: ${athlete.training.coach}
- Training Consistency: ${athlete.training.recentPerformance.trainingConsistency}%
- Average Intensity: ${athlete.training.recentPerformance.averageIntensity}/10
- Weekly Volume: ${athlete.training.recentPerformance.weeklyVolume}
- Injury Status: ${athlete.training.recentPerformance.injuryStatus}
- Sleep Quality: ${athlete.training.recentPerformance.sleepQuality}/10
- Stress Level: ${athlete.training.recentPerformance.stressLevel}/10

WEEKLY TRAINING SCHEDULE:
${Object.entries(athlete.training.weeklySchedule).map(([day, session]) => 
  `- ${day.charAt(0).toUpperCase() + day.slice(1)}: ${session.session} (${session.focus}, ${session.duration}min, ${session.intensity} intensity)`
).join('\n')}

NUTRITION TARGETS:
- Daily Calories: ${athlete.nutrition.dailyTargets.calories}
- Protein: ${athlete.nutrition.dailyTargets.protein.grams}g (${athlete.nutrition.dailyTargets.protein.percentage}%)
- Carbohydrates: ${athlete.nutrition.dailyTargets.carbohydrates.grams}g (${athlete.nutrition.dailyTargets.carbohydrates.percentage}%)
- Fats: ${athlete.nutrition.dailyTargets.fats.grams}g (${athlete.nutrition.dailyTargets.fats.percentage}%)
- Water: ${athlete.nutrition.dailyTargets.water.liters}L

SUPPLEMENTS:
${athlete.nutrition.supplements.map(supp => `- ${supp.name}: ${supp.dosage} (${supp.purpose})`).join('\n')}

RECOVERY PROTOCOL:
- Sleep Target: ${athlete.recovery.sleepTargets.duration} hours (${athlete.recovery.sleepTargets.bedtime} - ${athlete.recovery.sleepTargets.wakeTime})
- Recovery Methods: ${athlete.recovery.recoveryMethods.map(method => method.method).join(', ')}

COMMUNICATION PREFERENCES:
- Style: ${athlete.preferences.communicationStyle}
- Learning: ${athlete.preferences.learningStyle}
- Motivation: ${athlete.preferences.motivationFactors.join(', ')}
- Concerns: ${athlete.preferences.concernAreas.join(', ')}

RECENT ACTIVITY:
- Training: ${recentTraining}
- Nutrition: ${nutritionStatus}

COACHING INSTRUCTIONS:
You are an expert track and field coach specializing in ${athlete.athletics.eventGroup}. Provide personalized, actionable advice based on this athlete's specific profile, goals, and current training phase. Be motivational but realistic, and always prioritize injury prevention and long-term development. Consider their ${athlete.athletics.experience.level} level when giving advice.
    `.trim();
  }

  // Format check-in specific context
  formatCheckInString({ name, primaryEvent, currentGoal, trainingPhase, recentPerformance }) {
    return `
Daily Check-in Context for ${name}:
- ${primaryEvent} specialist in ${trainingPhase} phase
- Primary goal: ${currentGoal}
- Recent PB: ${recentPerformance.primaryEventPB}
- Training consistency: ${recentPerformance.trainingConsistency}
- Current phase: ${recentPerformance.currentPhase}

Conduct a supportive daily check-in focusing on today's training, recovery status, and motivation. Ask about sleep, nutrition, any concerns, and provide encouragement toward their goal.
    `.trim();
  }

  // Generate context for specific scenarios
  generateScenarioContext(scenario) {
    const athleteData = localDataService.getAthleteProfile();
    const baseContext = this.generateCheckInContext();
    
    const scenarioContexts = {
      'pre-workout': `${baseContext}\n\nFocus: Pre-workout preparation, energy levels, and training readiness.`,
      'post-workout': `${baseContext}\n\nFocus: Workout reflection, recovery planning, and performance feedback.`,
      'nutrition-advice': `${baseContext}\n\nFocus: Personalized nutrition guidance based on training demands and goals.`,
      'goal-setting': `${baseContext}\n\nFocus: Goal refinement, progress assessment, and motivation.`,
      'injury-prevention': `${baseContext}\n\nFocus: Injury prevention strategies, movement quality, and recovery optimization.`
    };

    return scenarioContexts[scenario] || baseContext;
  }

  // Get context summary for UI display
  getContextSummary() {
    const athleteData = localDataService.getAthleteProfile();
    if (!athleteData) return null;

    return {
      athleteName: athleteData.profile.name,
      primaryEvent: athleteData.athletics.primaryEvent,
      trainingPhase: athleteData.training.currentPhase,
      primaryGoal: athleteData.athletics.goals.shortTerm.primary,
      lastUpdated: new Date().toISOString(),
      dataCompleteness: this.calculateDataCompleteness(athleteData)
    };
  }

  // Calculate how complete the athlete data is
  calculateDataCompleteness(athleteData) {
    const requiredFields = [
      'profile.name',
      'profile.age',
      'profile.weight.lbs',
      'profile.height.cm',
      'athletics.primaryEvent',
      'athletics.goals.shortTerm.primary',
      'training.currentPhase'
    ];

    const completedFields = requiredFields.filter(field => {
      const value = field.split('.').reduce((obj, key) => obj?.[key], athleteData);
      return value !== null && value !== undefined && value !== '';
    });

    return Math.round((completedFields.length / requiredFields.length) * 100);
  }
}

// Create and export singleton instance
const aiContextGenerator = new AIContextGenerator();
export default aiContextGenerator;
