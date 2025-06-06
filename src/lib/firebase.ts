import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD-aUOXU9Y58rfNXYwoOzx2ENraV1nfSgI",
  authDomain: "roadtoarnold-856c0.firebaseapp.com",
  projectId: "roadtoarnold-856c0",
  storageBucket: "roadtoarnold-856c0.firebasestorage.app",
  messagingSenderId: "554029807640",
  appId: "1:554029807640:web:843e7a4bce6874bada2b6d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;