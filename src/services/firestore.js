import { initializeApp } from "firebase/app"
import { doc, getDoc, getFirestore } from "firebase/firestore"

import firebaseConfig from '@/config/firebase'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function queryDocById(docName, id) {
  const docRef = doc(db, docName, id)
  return await getDoc(docRef)
}
