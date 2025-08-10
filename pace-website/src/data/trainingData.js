export const weeklyTrainingPlan = {
  week: "Week of August 5-11, 2024",
  phase: "In-Season",
  totalWorkouts: 7,
  totalHours: 8.5,
  completionRate: 43,
  workouts: [
    {
      id: 1,
      day: "Monday",
      date: "Aug 5",
      type: "Speed Work",
      duration: "90 min",
      intensity: "High",
      status: "completed",
      exercises: [
        "Warm-up: 15 min easy jog + dynamic stretching",
        "6 x 100m @ 95% effort (3 min rest)",
        "4 x 60m @ 100% effort (5 min rest)",
        "Cool-down: 10 min walk + static stretching"
      ],
      notes: "Focus on acceleration and form"
    },
    {
      id: 2,
      day: "Tuesday",
      date: "Aug 6",
      type: "Recovery Run",
      duration: "45 min",
      intensity: "Low",
      status: "completed",
      exercises: [
        "Easy 30 min jog at conversational pace",
        "Core strengthening: 15 min",
        "Stretching and mobility work"
      ],
      notes: "Active recovery day"
    },
    {
      id: 3,
      day: "Wednesday",
      date: "Aug 7",
      type: "Strength Training",
      duration: "75 min",
      intensity: "Medium",
      status: "completed",
      exercises: [
        "Squats: 4 x 6 @ 85%",
        "Deadlifts: 3 x 5 @ 80%",
        "Plyometric jumps: 3 x 8",
        "Core circuit: 20 min"
      ],
      notes: "Focus on explosive power"
    },
    {
      id: 4,
      day: "Thursday",
      date: "Aug 8",
      type: "Tempo Run",
      duration: "60 min",
      intensity: "Medium",
      status: "scheduled",
      exercises: [
        "Warm-up: 15 min easy jog",
        "3 x 200m @ 85% effort (90 sec rest)",
        "2 x 300m @ 80% effort (2 min rest)",
        "Cool-down: 15 min easy jog"
      ],
      notes: "Maintain consistent pace"
    },
    {
      id: 5,
      day: "Friday",
      date: "Aug 9",
      type: "Rest Day",
      duration: "0 min",
      intensity: "Rest",
      status: "scheduled",
      exercises: [
        "Complete rest or light stretching",
        "Hydration and nutrition focus",
        "Mental preparation for weekend"
      ],
      notes: "Recovery and preparation"
    },
    {
      id: 6,
      day: "Saturday",
      date: "Aug 10",
      type: "Race Simulation",
      duration: "120 min",
      intensity: "High",
      status: "scheduled",
      exercises: [
        "Extended warm-up: 30 min",
        "2 x 100m @ race pace (10 min rest)",
        "1 x 100m @ 102% race pace",
        "Cool-down: 20 min"
      ],
      notes: "Practice race day routine"
    },
    {
      id: 7,
      day: "Sunday",
      date: "Aug 11",
      type: "Long Run",
      duration: "75 min",
      intensity: "Low",
      status: "scheduled",
      exercises: [
        "60 min steady aerobic run",
        "Strides: 4 x 100m",
        "Flexibility session: 15 min"
      ],
      notes: "Build aerobic base"
    }
  ]
};

export const trainingStats = {
  thisWeek: {
    workouts: 7,
    hours: 8.5,
    distance: "12.5 km",
    completion: 43
  },
  thisMonth: {
    workouts: 24,
    hours: 32.5,
    distance: "285 km",
    avgIntensity: "Medium-High"
  },
  season: {
    workouts: 156,
    hours: 234,
    distance: "1,247 km",
    prImprovement: "0.15s"
  }
};

