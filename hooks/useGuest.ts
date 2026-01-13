import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getGuestById = async (guestId: string) => {
  if (!guestId) return null;

  const ref = doc(db, "guests", guestId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return { id: snap.id, ...snap.data() };
};
