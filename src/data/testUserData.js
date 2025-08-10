// Demo athlete data for testing and development
export const testUserData = {
  profile: {
    name: "Jordan Smith",
    age: 20,
    gender: "Male",
    height: "5'10\"",
    weight: "160 lbs",
    primaryEvent: "100m Sprint",
    primaryEventGroup: "Sprints",
    experienceLevel: "Collegiate",
    currentLevel: "Division II",
    personalBests: {
      "100m": "10.42s",
      "200m": "21.18s",
      "60m": "6.85s",
      "Long Jump": "7.25m"
    },
    goals: {
      primary: "Break 10.35s in the 100m",
      secondary: "Qualify for conference championships",
      longTerm: "Make nationals in senior year"
    }
  },
  training: {
    currentPhase: "Competition Phase",
    currentCycle: "Peak",
    weeksInCycle: 3,
    totalWeeksThisSeason: 12,
    weeklyVolume: "4,500m total volume",
    weeklySchedule: {
      monday: "Speed Development - 3x30m, 3x60m",
      tuesday: "Strength Training - Lower Body Power",
      wednesday: "Tempo - 6x100m at 75%",
      thursday: "Strength Training - Upper Body",
      friday: "Competition Prep - Block Starts + Accelerations",
      saturday: "Competition or Time Trial",
      sunday: "Active Recovery - Light Movement"
    },
    recentSessions: [
      {
        date: "2025-08-08",
        type: "Speed Development",
        workoutDetails: "3x30m (3.95, 3.92, 3.90), 3x60m (6.85, 6.82, 6.80)",
        times: ["3.95", "3.92", "3.90", "6.85", "6.82", "6.80"],
        feeling: "Strong and explosive",
        rpe: 7,
        notes: "Great acceleration pattern, felt smooth through transition"
      },
      {
        date: "2025-08-06",
        type: "Strength Training",
        workoutDetails: "Back Squat 5x3 @ 85%, Power Clean 4x2 @ 90%",
        feeling: "Powerful",
        rpe: 8,
        notes: "Hit all lifts, feeling strong in the weight room"
      },
      {
        date: "2025-08-05",
        type: "Tempo",
        workoutDetails: "6x100m @ 75% with 90s rest",
        times: ["12.8", "12.7", "12.9", "12.8", "12.6", "12.7"],
        feeling: "Controlled and relaxed",
        rpe: 6,
        notes: "Good rhythm and relaxation at tempo pace"
      }
    ],
    strengthStats: {
      backSquat1RM: "315 lbs",
      powerClean1RM: "235 lbs",
      benchPress1RM: "185 lbs",
      bodyweightRatio: {
        squat: 1.97,
        clean: 1.47
      }
    }
  },
  lifestyle: {
    nutrition: {
      dailyCalories: "3,200-3,400",
      macroSplit: "50% Carbs, 25% Protein, 25% Fat",
      meals: 5,
      hydration: "3-4 liters daily",
      supplements: ["Creatine", "Whey Protein", "Magnesium", "Vitamin D"],
      currentWeight: "160 lbs"
    },
    recovery: {
      sleepAverage: "8-9 hours",
      sleepQuality: "Good",
      restingHR: "52 bpm",
      hrv: "45-55ms",
      stressLevel: "Low-Moderate",
      recoveryMethods: ["Ice baths", "Massage", "Stretching", "Meditation"]
    },
    currentStatus: {
      energy: "High",
      motivation: "Very High",
      soreness: "Minimal soreness in calves",
      stress: "Low",
      confidence: "High",
      nextCompetition: "Conference Championships",
      daysUntilCompetition: 14,
      lastCompetition: "Dual Meet - 10.45s (wind +1.2)"
    }
  },
  seasonProgress: {
    startDate: "March 1, 2025",
    improvements: {
      "100m": {
        seasonBest: "10.42s",
        improvement: "-0.08s from last season",
        consistency: "85% of races under 10.50s"
      },
      strength: {
        squatImprovement: "25 lbs",
        powerCleanImprovement: "15 lbs"
      }
    },
    upcomingGoals: {
      immediate: "Run 10.38s at conference meet",
      midTerm: "Qualify for regionals",
      endOfSeason: "Break 10.35s and set new school record"
    }
  }
};

// Function to get user context formatted for AI
export const getUserContextForAI = () => {
  return {
    athleteName: testUserData.profile.name,
    event: testUserData.profile.primaryEvent,
    personalBest: testUserData.profile.personalBests["100m"],
    currentGoal: testUserData.profile.goals.primary,
    nextCompetition: testUserData.lifestyle.currentStatus.nextCompetition,
    daysUntilCompetition: testUserData.lifestyle.currentStatus.daysUntilCompetition,
    currentPhase: testUserData.training.currentPhase,
    lastWorkout: testUserData.training.recentSessions[0],
    currentStatus: testUserData.lifestyle.currentStatus
  };
};

export default testUserData;
