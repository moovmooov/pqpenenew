import { docRef } from "../lib/firebase"
import { getDoc } from "firebase/firestore"
import { DatabaseData } from "../services/matchService"

const getMatchFromDatabase = async (): Promise<DatabaseData> => {
  const docSnap = await getDoc(docRef)
  return docSnap.data() as DatabaseData
}

export default getMatchFromDatabase
