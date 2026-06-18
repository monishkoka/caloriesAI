import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  QueryConstraint,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { ID } from '@types';
import { createLogger } from '@utils/logger';

import { db } from './config';

const log = createLogger('FirestoreService');

/**
 * Generic, typed Firestore data-access layer.
 *
 * Higher-level repositories (e.g. `userProfileService`) compose these helpers
 * with `collections` path builders. This keeps Firestore SDK usage isolated to
 * a single module and makes the rest of the app testable against an interface.
 *
 * NOTE: Mapping/validation of `DocumentData` into domain types is intentionally
 * left to the calling repositories — scaffolding only.
 */
export const firestoreService = {
  /** Read a single document. Returns null when it does not exist. */
  async getDocument<T>(path: string): Promise<(T & { id: ID }) | null> {
    const snapshot = await getDoc(doc(db, path));
    if (!snapshot.exists()) {
      return null;
    }
    return { id: snapshot.id, ...(snapshot.data() as T) };
  },

  /** Read every document in a collection, with optional query constraints. */
  async listDocuments<T>(
    collectionPath: string,
    constraints: QueryConstraint[] = [],
  ): Promise<(T & { id: ID })[]> {
    const q = query(collection(db, collectionPath), ...constraints);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
  },

  /** Create or fully overwrite a document at a known path. */
  async setDocument(
    path: string,
    data: DocumentData,
    options: { merge?: boolean } = { merge: true },
  ): Promise<void> {
    await setDoc(
      doc(db, path),
      { ...data, updatedAt: serverTimestamp() },
      options,
    );
  },

  /** Partially update an existing document. */
  async updateDocument(path: string, data: DocumentData): Promise<void> {
    await updateDoc(doc(db, path), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  },

  async deleteDocument(path: string): Promise<void> {
    await deleteDoc(doc(db, path));
  },

  /**
   * Subscribe to realtime updates for a single document.
   * Returns an unsubscribe function.
   */
  subscribeDocument<T>(
    path: string,
    onChange: (data: (T & { id: ID }) | null) => void,
  ): () => void {
    return onSnapshot(
      doc(db, path),
      (snapshot) => {
        onChange(
          snapshot.exists()
            ? { id: snapshot.id, ...(snapshot.data() as T) }
            : null,
        );
      },
      (error) => log.error('subscribeDocument failed', error),
    );
  },

  /** Subscribe to realtime updates for a collection query. */
  subscribeCollection<T>(
    collectionPath: string,
    constraints: QueryConstraint[],
    onChange: (data: (T & { id: ID })[]) => void,
  ): () => void {
    const q = query(collection(db, collectionPath), ...constraints);
    return onSnapshot(
      q,
      (snapshot) => {
        onChange(snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as T) })));
      },
      (error) => log.error('subscribeCollection failed', error),
    );
  },
};

export type FirestoreService = typeof firestoreService;
