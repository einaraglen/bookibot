import { setDoc, doc, getDoc, Timestamp } from 'firebase/firestore/lite'
import { getTodayKey } from '../utils/tools'
import { db } from './db'

export const post = async (id: string, task: string) => {
  const key = getTodayKey()
  const payload = {
    task,
    created_at: Timestamp.fromDate(new Date()),
  }
  const ref = doc(db, 'will', key)
  const snap = await getDoc(ref)
  const previous = snap.exists() ? snap.data() : {}
  await setDoc(doc(db, 'will', key), {
    ...previous,
    [id]: payload,
  })
}
