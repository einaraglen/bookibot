import { setDoc, doc, getDoc, Timestamp } from 'firebase/firestore/lite'
import { db } from './db'

export const addUser = async (id: string, username: string): Promise<void> => {
  await setDoc(doc(db, "users", id), {
    username,
    created_at: Timestamp.fromDate(new Date()),
  });
}

export const isUser = async (id: string): Promise<boolean> => {
  const docRef = doc(db, 'users', id)
  const docSnap = await getDoc(docRef)
  return docSnap.exists()
}
