// src/hooks/useFirestore.ts
import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  onSnapshot,
  DocumentData 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// STATIC USER ID - POUR SIMULATION SANS AUTH
const STATIC_USER_ID = 'beast-mode-user';

export const useFirestore = <T extends DocumentData>(collectionName: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(`🔥 useFirestore: Setting up listener for ${collectionName}`);
    
    const q = query(collection(db, collectionName));

    console.log(`🔥 useFirestore: Creating listener for ${collectionName}`);

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        console.log(`🔥 useFirestore: Received ${snapshot.docs.length} documents for ${collectionName}`);
        
        const items = snapshot.docs.map(doc => {
          const data = doc.data();
          console.log(`📄 Document ${doc.id}:`, data);
          return {
            id: doc.id,
            ...data
          } as unknown as T;
        });

        // Tri côté client par createdAt desc (le plus récent en premier)
        const sortedItems = items.sort((a: any, b: any) => {
          const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
          const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
          return dateB.getTime() - dateA.getTime();
        });
        
        console.log(`🔥 useFirestore: Setting ${sortedItems.length} items for ${collectionName}`, sortedItems);
        setData(sortedItems);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(`❌ useFirestore: Error for ${collectionName}:`, err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => {
      console.log(`🔥 useFirestore: Cleaning up listener for ${collectionName}`);
      unsubscribe();
    };
  }, [collectionName]);

  const add = async (item: Omit<T, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    console.log(`➕ useFirestore: Adding item to ${collectionName}:`, item);
    
    try {
      const docData = {
        ...item,
        userId: STATIC_USER_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      console.log(`➕ useFirestore: Document data to add:`, docData);
      
      const docRef = await addDoc(collection(db, collectionName), docData);
      console.log(`✅ useFirestore: Successfully added document ${docRef.id} to ${collectionName}`);
      
      return docRef;
    } catch (err) {
      console.error(`❌ useFirestore: Error adding to ${collectionName}:`, err);
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ajout');
      throw err;
    }
  };

  const update = async (id: string, updates: Partial<T>) => {
    console.log(`🔄 useFirestore: Updating document ${id} in ${collectionName}:`, updates);
    
    try {
      const updateData = {
        ...updates,
        updatedAt: new Date()
      };
      
      await updateDoc(doc(db, collectionName, id), updateData);
      console.log(`✅ useFirestore: Successfully updated document ${id} in ${collectionName}`);
    } catch (err) {
      console.error(`❌ useFirestore: Error updating ${id} in ${collectionName}:`, err);
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
      throw err;
    }
  };

  const remove = async (id: string) => {
    console.log(`🗑️ useFirestore: Removing document ${id} from ${collectionName}`);
    
    try {
      await deleteDoc(doc(db, collectionName, id));
      console.log(`✅ useFirestore: Successfully removed document ${id} from ${collectionName}`);
    } catch (err) {
      console.error(`❌ useFirestore: Error removing ${id} from ${collectionName}:`, err);
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
      throw err;
    }
  };

  return { data, loading, error, add, update, remove };
};