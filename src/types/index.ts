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
  currentWeight?: number;
  notes?: string;
  achieved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  userId: string;
  name: string;
  date: Date;
  type: 'local' | 'regional' | 'national' | 'international';
  location?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompetitionPrep {
  id: string;
  userId: string;
  title: string;
  items: CompetitionPrepItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CompetitionPrepItem {
  id: string;
  task: string;
  completed: boolean;
  category: 'mental' | 'physical' | 'equipment' | 'nutrition';
}

export interface DailyTracking {
  id: string;
  userId: string;
  date: Date;
  sleep: {
    hours: number;
    quality: 1 | 2 | 3 | 4 | 5;
  };
  hydration: {
    liters: number;
  };
  energy: 1 | 2 | 3 | 4 | 5;
  mood: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

export interface TechniqueNote {
  id: string;
  userId: string;
  movement: 'bench' | 'squat' | 'deadlift' | 'general';
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MotivationEntry {
  id: string;
  userId: string;
  type: 'why' | 'quote' | 'mantra' | 'goal';
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 3. Configuration Firebase

### lib/firebase.ts
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Remplacez par votre configuration Firebase
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;