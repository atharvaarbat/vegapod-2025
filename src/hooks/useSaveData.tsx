import { useEffect, useCallback } from 'react';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

// Define the structure of our database
interface SaveDataDB extends DBSchema {
  runs: {
    key: string; // RunId
    value: {
      tt: string; // Timestamp
      data: Record<string, any>; // JSON Data
      profileName: string;
    };
  };
}

// Hook function
const useSaveData = () => {
  let db: IDBPDatabase<SaveDataDB> | null = null;

  // Initialize IndexedDB database connection
  const initializeDB = async () => {
    db = await openDB<SaveDataDB>('SaveDataDB', 1, {
      upgrade(database) {
        if (!database.objectStoreNames.contains('runs')) {
          database.createObjectStore('runs', { keyPath: 'tt' });
        }
      },
    });
  };

  // Ensure database is initialized on hook mount
  useEffect(() => {
    initializeDB();
  }, []);

  // Save data entry with IndexedDB
  const saveData = useCallback(
    async (tt: string, data: Record<string, any>, runId: string, profileName: string) => {
      if (!db) return;

      const tx = db.transaction('runs', 'readwrite');
      const store = tx.objectStore('runs');
      await store.add({ tt, data, profileName });
      await tx.done;
    },
    [db]
  );

//   // Retrieve all entries by RunId
//   const getEntriesByRunId = useCallback(
//     async (runId: string) => {
//       if (!db) return [];
//       const tx = db.transaction('runs', 'readonly');
//       const store = tx.objectStore('runs');

//       const allEntries = await store.getAll(); // Get all entries
//       return allEntries.filter((entry) => entry.runId === runId);
//     },
//     [db]
//   );

  return { saveData };
};

export default useSaveData;
