import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";


// helper: format nama dari guestId
const formatGuestName = (guestId: string) => {
  return guestId
    .replace(/[-_]/g, " ")        // ganti - dan _ jadi spasi
    .split(" ")
    .filter(Boolean)
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
};

export const getOrCreateGuest = async (guestId: string) => {
  if (!guestId) return null;

  const ref = doc(db, "guests", guestId);
  const snap = await getDoc(ref);

  // ✅ jika sudah ada
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  }

  // 🆕 jika belum ada → buat otomatis
  const newGuest = {
    name: formatGuestName(guestId),
    createdAt: serverTimestamp(),
    source: "url",
  };

  await setDoc(ref, newGuest);

  return { id: guestId, ...newGuest };
};
