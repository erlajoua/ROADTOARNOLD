// src/types/index.ts
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface TrainingGoal {
  id: string;
  userId: string;
  movement: 'bench' | 'squat' | 'deadlift';
  targetWeight: number;
  targetDate: Date;
  currentWeight?: number; // Nouveau champ pour la progression
  notes?: string;
  achieved: boolean;
  achievedDate?: Date; // Nouvelle date d'achievement
  priority?: 'low' | 'medium' | 'high'; // Nouvelle priorité
  category?: 'competition' | 'training' | 'personal'; // Nouvelle catégorie
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  userId: string;
  name: string;
  date: Date;
  type: 'local' | 'regional' | 'national';
  location?: string;
  notes?: string;
  registrationDeadline?: Date; // Nouvelle deadline d'inscription
  cost?: number; // Nouveau coût
  status?: 'planned' | 'registered' | 'completed' | 'cancelled'; // Nouveau statut
  results?: { // Nouveaux résultats
    bench?: number;
    squat?: number;
    deadlift?: number;
    total?: number;
    placing?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CompetitionPrep {
  id: string;
  userId: string;
  title: string;
  eventId?: string; // Lié à un événement spécifique
  items: CompetitionPrepItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CompetitionPrepItem {
  id: string;
  task: string;
  completed: boolean;
  category: 'mental' | 'physical' | 'equipment' | 'nutrition' | 'administrative';
  priority?: 'low' | 'medium' | 'high'; // Nouvelle priorité
  estimatedTime?: number; // Temps estimé en minutes
  dueDate?: Date; // Date d'échéance
}

export interface DailyTracking {
  id: string;
  userId: string;
  date: Date;
  sleep: {
    hours: number;
    quality: 1 | 2 | 3 | 4 | 5;
    bedTime?: string; // Nouveau: heure de coucher
    wakeTime?: string; // Nouveau: heure de réveil
  };
  hydration: {
    liters: number;
    target?: number; // Nouveau: objectif hydratation
  };
  energy: 1 | 2 | 3 | 4 | 5;
  mood: 1 | 2 | 3 | 4 | 5;
  stress?: 1 | 2 | 3 | 4 | 5; // Nouveau: niveau de stress
  nutrition?: {
    quality: 1 | 2 | 3 | 4 | 5;
    calories?: number;
    protein?: number;
  };
  training?: { // Nouveau: données d'entraînement
    completed: boolean;
    intensity: 1 | 2 | 3 | 4 | 5;
    duration?: number; // en minutes
    focus?: 'bench' | 'squat' | 'deadlift' | 'accessory' | 'cardio';
  };
  bodyWeight?: number; // Nouveau: poids corporel
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TechniqueNote {
  id: string;
  userId: string;
  movement: 'bench' | 'squat' | 'deadlift' | 'general';
  title: string;
  content: string;
  tags: string[];
  category?: 'setup' | 'execution' | 'troubleshooting' | 'warmup' | 'recovery'; // Nouvelle catégorie
  priority?: 'low' | 'medium' | 'high'; // Nouvelle priorité
  source?: string; // Nouvelle source (coach, vidéo, livre, etc.)
  mediaUrls?: string[]; // Nouveaux liens média
  lastReviewed?: Date; // Dernière révision
  effectiveness?: 1 | 2 | 3 | 4 | 5; // Efficacité de la technique
  createdAt: Date;
  updatedAt: Date;
}

export interface MotivationEntry {
  id: string;
  userId: string;
  type: 'why' | 'quote' | 'mantra' | 'goal' | 'reminder' | 'affirmation'; // Nouveaux types
  title: string;
  content: string;
  author?: string; // Nouveau: auteur de la citation
  context?: string; // Nouveau: contexte d'utilisation
  frequency?: 'daily' | 'weekly' | 'before_training' | 'before_competition'; // Fréquence d'utilisation
  effectiveness?: 1 | 2 | 3 | 4 | 5; // Efficacité ressentie
  tags?: string[]; // Nouveaux tags
  isFavorite?: boolean; // Nouveau: favori
  timesUsed?: number; // Nombre d'utilisations
  lastUsed?: Date; // Dernière utilisation
  createdAt: Date;
  updatedAt: Date;
}

// Nouveaux types pour les fonctionnalités avancées

export interface PersonalRecord {
  id: string;
  userId: string;
  movement: 'bench' | 'squat' | 'deadlift';
  weight: number;
  date: Date;
  eventId?: string; // Si établi en compétition
  videoUrl?: string; // Lien vers une vidéo
  notes?: string;
  validated?: boolean; // Si le record est validé/officiel
  witnesses?: string[]; // Témoins du record
  createdAt: Date;
  updatedAt: Date;
}

export interface WeeklyPlan {
  id: string;
  userId: string;
  weekStartDate: Date;
  goals: string[];
  trainingDays: {
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    focus: 'bench' | 'squat' | 'deadlift' | 'accessory' | 'cardio' | 'rest';
    intensity: 1 | 2 | 3 | 4 | 5;
    duration?: number;
    notes?: string;
    completed?: boolean;
  }[];
  nutrition: {
    calorieTarget?: number;
    proteinTarget?: number;
    notes?: string;
  };
  recovery: {
    sleepTarget: number;
    hydrationTarget: number;
    stressManagement?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CoachNote {
  id: string;
  userId: string;
  coachName: string;
  date: Date;
  session?: {
    movement: 'bench' | 'squat' | 'deadlift' | 'general';
    feedback: string;
    improvements: string[];
    nextFocus: string[];
  };
  generalFeedback?: string;
  recommendations?: string[];
  nextAppointment?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MentalPrep {
  id: string;
  userId: string;
  type: 'visualization' | 'meditation' | 'affirmation' | 'breathing' | 'routine';
  title: string;
  description: string;
  duration?: number; // en minutes
  steps?: string[];
  frequency: 'daily' | 'before_training' | 'before_competition' | 'weekly';
  effectiveness?: 1 | 2 | 3 | 4 | 5;
  timesUsed?: number;
  lastUsed?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgressPhoto {
  id: string;
  userId: string;
  imageUrl: string;
  date: Date;
  bodyWeight?: number;
  notes?: string;
  tags?: string[];
  isPrivate?: boolean;
  bodyPart?: 'full' | 'upper' | 'lower' | 'side' | 'back';
  createdAt: Date;
  updatedAt: Date;
}

export interface Supplement {
  id: string;
  userId: string;
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
  cost?: number;
  effectiveness?: 1 | 2 | 3 | 4 | 5;
  sideEffects?: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Types pour les statistiques et analyses
export interface ProgressAnalytics {
  period: 'week' | 'month' | 'quarter' | 'year';
  trainingConsistency: number; // pourcentage
  averageMood: number;
  averageEnergy: number;
  averageSleep: number;
  weightProgression: {
    movement: 'bench' | 'squat' | 'deadlift';
    startWeight: number;
    endWeight: number;
    progression: number;
  }[];
  goalsAchieved: number;
  totalGoals: number;
}

// Types pour l'import/export
export interface ExportData {
  goals: TrainingGoal[];
  events: Event[];
  dailyTracking: DailyTracking[];
  techniqueNotes: TechniqueNote[];
  motivationEntries: MotivationEntry[];
  personalRecords: PersonalRecord[];
  exportDate: Date;
  version: string;
}