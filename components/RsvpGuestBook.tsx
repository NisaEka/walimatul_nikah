import React, { useState, useEffect } from 'react';
import { Send, User, MessageCircle } from 'lucide-react';
import Section from './ui/Section';
import FloralDivider from './ui/FloralDivider';
import { GuestMessage } from '../types';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";


const RsvpGuestBook: React.FC = () => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [message, setMessage] = useState('');
  const [guests, setGuests] = useState<GuestMessage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
  const q = query(
    collection(db, "rsvps"),
    orderBy("createdAt", "desc")
  );

  const unsub = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as GuestMessage[];

    setGuests(data);
  });

  return () => unsub();
}, []);


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!name || !message) return;

  setIsSubmitting(true);

  try {
    await addDoc(collection(db, "rsvps"), {
      name,
      message,
      attendance,
      createdAt: serverTimestamp(),
    });

    setName('');
    setMessage('');
    setAttendance('hadir');

    alert("Terima kasih atas konfirmasi dan doa restunya 💙");
  } catch (error) {
    console.error(error);
    alert("Gagal mengirim RSVP");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <Section className="mb-20">
      <h2 className="font-script text-4xl text-center text-royal-blue mb-2">RSVP & Ucapan</h2>
      <p className="text-center text-sage-dark text-sm mb-6">Mohon konfirmasi kehadiran dan berikan doa restu</p>
      <FloralDivider />

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border-t-4 border-royal-blue">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-sage-dark mb-1">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-slate-300" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-blue-100 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent outline-none bg-slate-50"
                  placeholder="Masukkan nama Anda"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-sage-dark mb-1">Kehadiran</label>
              <select
                value={attendance}
                onChange={(e) => setAttendance(e.target.value as any)}
                className="w-full px-4 py-2 border border-blue-100 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent outline-none bg-slate-50 text-slate-600"
              >
                <option value="hadir">Hadir</option>
                <option value="tidak_hadir">Maaf, Tidak Bisa Hadir</option>
                <option value="ragu">Masih Ragu</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-sage-dark mb-1">Ucapan & Doa</label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-3 text-slate-300" size={18} />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-blue-100 rounded-lg focus:ring-2 focus:ring-royal-blue focus:border-transparent outline-none bg-slate-50 h-32 resize-none"
                  placeholder="Tuliskan ucapan dan doa untuk mempelai..."
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-royal-blue text-white py-2.5 rounded-lg font-serif tracking-wide hover:bg-blue-900 transition-colors flex justify-center items-center gap-2 shadow-md"
            >
              {isSubmitting ? 'Mengirim...' : (
                <>
                  <Send size={16} /> Kirim Konfirmasi
                </>
              )}
            </button>
          </form>
        </div>

        {/* Guest List */}
        <div className="bg-blue-50/50 p-6 rounded-xl border border-white max-h-[500px] overflow-y-auto">
          <h3 className="font-serif text-xl mb-4 text-royal-blue border-b border-blue-200 pb-2">Doa Restu ({guests.length})</h3>
          
          {guests.length === 0 ? (
            <p className="text-center text-slate-400 italic py-10">Belum ada ucapan. Jadilah yang pertama!</p>
          ) : (
            <div className="space-y-4">
              {guests.map((guest) => (
                <div key={guest.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-royal-blue">{guest.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      guest.attendance === 'hadir' ? 'bg-blue-100 text-blue-700' :
                      guest.attendance === 'tidak_hadir' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {guest.attendance === 'hadir' ? 'Hadir' : guest.attendance === 'tidak_hadir' ? 'Berhalangan' : 'Ragu'}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm italic">"{guest.message}"</p>
                  <p className="text-xs text-slate-400 mt-2 text-right">
                    {guest.createdAt?.toDate?.().toLocaleDateString("id-ID")}
                  </p>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default RsvpGuestBook;