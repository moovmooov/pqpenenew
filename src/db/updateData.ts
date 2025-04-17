import { docRef } from "../lib/firebase"
import { updateDoc } from "firebase/firestore"

const updateData = async (data: any) => {
  await updateDoc(docRef, data)
}

export default updateData
