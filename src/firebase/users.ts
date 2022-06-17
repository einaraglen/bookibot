import { setDoc, doc, getDoc, getDocs, Timestamp, collection, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore/lite'
import { db } from './db'

export const addUser = async (id: string, username: string): Promise<void> => {
  await setDoc(doc(db, "users", id), {
    username,
    created_at: Timestamp.fromDate(new Date()),
  });
}

export const getUsers = async (): Promise<string[] | undefined> => {
  const ref = collection(db, 'users')
  const query = await getDocs(ref)
  return query.docs.map((snap: QueryDocumentSnapshot<DocumentData>) => snap.id)
}

export const getUsername = async (id: string): Promise<string | undefined> => {
  const ref = doc(db, 'users', id)
  const snap = await getDoc(ref)
  return snap.exists() && snap.data().username
}

export const isUser = async (id: string): Promise<boolean> => {
  const ref = doc(db, 'users', id)
  const snap = await getDoc(ref)
  return snap.exists()
}
