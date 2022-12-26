import { initializeApp } from "firebase/app"
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore"

import firebaseConfig from '@/config/firebase'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function getDocById(path, id) {
  const docRef = doc(db, path, id)
  return await getDoc(docRef)
}

export async function getAllDocs(path) {
  return (await getDocs(collection(db, path))).docs;
}
