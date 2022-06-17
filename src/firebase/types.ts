import { Timestamp } from 'firebase/firestore/lite'

export type Post = {
  task: string
  created_at: Timestamp
}

export type Entry = { [key: string]: Post }
