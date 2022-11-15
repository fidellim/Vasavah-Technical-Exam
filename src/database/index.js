import { db } from '../library/firebaseConfig'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    orderBy,
} from 'firebase/firestore'

export const queryLogs = (path) => {
    // Sort logs by date and time in descending order
    return query(collection(db, path), orderBy('clockIn', 'desc'))
}

export const getLogs = (path) => {
    return getDocs(collection(db, path))
}

export const addLog = async (data, path) => {
    return await addDoc(collection(db, path), data)
}

export const deleteLog = (id, path) => {
    return deleteDoc(doc(db, path, id))
}
