import { initializeApp } from "firebase/app"
import { collection, doc, getDoc, getDocs, getFirestore, writeBatch } from "firebase/firestore"

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

export function getDocRef(path, id) {
  if (id) {
    return doc(db, path, id)
  } else {
    return doc(collection(db, path))
  }
}

export function batch() {
  return writeBatch(db)
}

export { arrayUnion } from "firebase/firestore"
