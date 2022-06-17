import { setDoc, doc, getDoc, Timestamp } from 'firebase/firestore/lite'
import { getTodayKey } from '../utils/tools'
import { db } from './db'
import { Entry, Post } from './types'

export const post = async (type: "will" | "did", id: string, task: string) => {
  const key = getTodayKey()
  const payload: Post = {
    task,
    created_at: Timestamp.fromDate(new Date()),
  }
  const ref = doc(db, type, key)
  const snap = await getDoc(ref)
  const previous = snap.exists() ? snap.data() : {}
  await setDoc(doc(db, type, key), {
    ...previous,
    [id]: payload,
  })
}

export const getToday = async (type: "will" | "did"): Promise<Entry | undefined> => {
  const key = getTodayKey()
  const ref = doc(db, type, key)
  const snap = await getDoc(ref)
  if (snap.exists()) return snap.data()
}

export const getPost = async (type: "will" | "did", id: string): Promise<Post | undefined> => {
  const key = getTodayKey()
  const ref = doc(db, type, key)
  const snap = await getDoc(ref)
  if (snap.exists()) {
    const payload: Entry = snap.data()
    const post: Post | undefined = payload[id]
    if (post) return post
  }
}