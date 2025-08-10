// Nutrition service using demo athlete data as defaults
import localDataService from './localDataService.js';

class NutritionService {
  constructor() {
    this.macronutrientRatios = {
      sprints: { protein: 0.21, carbs: 0.50, fats: 0.29 },
      endurance: { protein: 0.15, carbs: 0.65, fats: 0.20 },
      power: { protein: 0.25, carbs: 0.45, fats: 0.30 }
    };
    
    this.activityMultipliers = {
      'rest': 1.2,
      'low': 1.375,
      'moderate': 1.55,
      'high': 1.725,
      'extreme': 1.9
    };
  }

  // Get personalized nutrition plan using demo athlete as default
  getPersonalizedNutritionPlan() {
    const athlete = localDataService.getAthleteProfile();
    if (!athlete) {
      throw new Error('Demo athlete profile not loaded');
    }

    // Use the demo athlete's pre-configured nutrition data
    const nutritionPlan = athlete.nutrition;
    
    return {
      athlete: {
        name: athlete.profile.name,
        weight: athlete.profile.weight.display,
        primaryEvent: athlete.athletics.primaryEvent,
        trainingPhase: athlete.training.currentPhase
      },
      dailyTargets: nutritionPlan.dailyTargets,
      mealPlan: nutritionPlan.mealPlan,
      supplements: nutritionPlan.supplements,
      hydrationPlan: nutritionPlan.hydrationPlan,
      tips: this.getNutritionTips(athlete),
      lastUpdated: new Date().toISOString()
    };
  }

  // Get nutrition tips based on athlete profile
  getNutritionTips(athlete) {
    const tips = [
      'Eat a variety of colorful fruits and vegetables for micronutrients',
      'Time your largest carbohydrate intake around training sessions',
      'Stay consistently hydrated throughout the day',
      'Include lean protein with every meal'
    ];

    // Add specific tips based on event type
    if (athlete.athletics.eventGroup === 'sprints') {
      tips.push('Focus on powerful, explosive foods: lean meats, nuts, and quick-digesting carbs before training');
      tips.push('Creatine supplementation can significantly benefit sprint performance');
    }

    // Add tips based on training phase
    if (athlete.training.currentPhase === 'pre-season') {
      tips.push('Focus on building a solid nutritional foundation during base training');
      tips.push('This is a good time to experiment with race-day nutrition strategies');
    }

    return tips;
  }

  // Log daily nutrition intake (demo data)
  logNutritionIntake(intake) {
    const nutritionLog = {
      date: new Date().toISOString().split('T')[0],
      meals: intake.meals || [],
      totalCalories: intake.totalCalories || 0,
      macros: intake.macros || {},
      hydration: intake.hydration || 0,
      supplements: intake.supplements || [],
      notes: intake.notes || ''
    };

    return localDataService.addNutritionLog(nutritionLog);
  }

  // Get demo nutrition progress (shows example data)
  getNutritionProgress(days = 7) {
    const athlete = localDataService.getAthleteProfile();
    const targetCalories = athlete.nutrition.dailyTargets.calories;
    
    // Demo progress data for testing
    const demoProgress = {
      period: `${days} days`,
      averageCalories: Math.round(targetCalories * 0.95), // 95% of target
      targetCalories: targetCalories,
      compliance: '95%',
      trend: 'On track',
      recommendations: [
        'Excellent consistency with nutrition targets!',
        'Continue current meal planning approach',
        'Consider adding more variety to post-workout meals'
      ]
    };

    return demoProgress;
  }
}

// Create and export singleton instance
const nutritionService = new NutritionService();
export default nutritionService;
