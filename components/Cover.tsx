import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { BRIDE_NAME, GROOM_NAME } from '../constants';
import { getGuestById } from "../hooks/useGuest";

import { getOrCreateGuest } from "../services/guestService";

interface CoverProps {
  onOpen: () => void;
}

const params =
  typeof window !== "undefined"
    ? new URLSearchParams(window.location.search)
    : null;

const guestId = params?.get("guest");

const FloralCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}> = ({ position }) => {

  const positionClasses = {
    // TOP sekarang pakai transform kebalikan
    'top-left': 'bottom-0 left-0 scale-y-[1]',
    'top-right': 'bottom-0 right-0 scale-y-[1] scale-x-[-1]',

    // BOTTOM sekarang di atas
    'bottom-left': 'top-0 left-0 scale-y-[-1]',
    'bottom-right': 'top-0 right-0 scale-x-[-1] scale-y-[-1]',
  };

  return (
    <img
      src="/walimatul_nikah/images/floral-corner.svg"
      alt=""
      className={`
        absolute
        ${positionClasses[position]}
        w-48 md:w-64
        opacity-70
        pointer-events-none
        mix-blend-multiply
        z-20
      `}
    />
  );
};



const Cover: React.FC<CoverProps> = ({ onOpen }) => {
  const [guest, setGuest] = useState<any>(null);

  // useEffect(() => {
  //   if (!guestId) return;

  //   getOrCreateGuest(guestId)
  //     .then((guest) => {
  //       console.log("Guest aktif:", guest);
  //     })
  //     .catch(console.error);

  //   getGuestById(guestId).then((data) => {
  //     console.log("Guest loaded:", data);
  //     setGuest(data);
  //   });

  // }, []);

  useEffect(() => {
    if (!guestId) return;

    getOrCreateGuest(guestId)
      .then((guest) => {
        console.log("Guest aktif:", guest);
        setGuest(guest); // ✅ WAJIB
      })
      .catch(console.error);
  }, [guestId]);


  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center p-6 bg-paper overflow-hidden">

      {/* Background: Soft Blue Watercolor Clouds */}
      <div className="absolute inset-0 bg-watercolor opacity-30"></div>

      {/* CSS Gradients to mimic the cloudy blue watercolor edges */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-blue-100 opacity-80 pointer-events-none"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute top-1/2 right-[-100px] w-64 h-64 bg-sky-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>

      {/* Floral Corners */}
      <FloralCorner position="top-left" />
      <FloralCorner position="top-right" />
      <FloralCorner position="bottom-left" />
      <FloralCorner position="bottom-right" />

      {/* Main Content - Centered & Clean (No Box) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="relative z-30 flex flex-col items-center gap-6 max-w-lg w-full px-4"
      >
        {/* Intro */}
        <p className="font-script text-3xl text-sage-dark opacity-80 mt-12">Walimatul nikah</p>

        {/* Names */}
        <div className="space-y-1">
          <h1 className="font-serif text-4xl md:text-5xl text-royal-blue font-bold tracking-tight">
            {GROOM_NAME}
          </h1>
          <p className="font-script text-4xl text-royal-blue opacity-60 my-2">&</p>
          <h1 className="font-serif text-4xl md:text-5xl text-royal-blue font-bold tracking-tight">
            {BRIDE_NAME}
          </h1>
        </div>

        {/* Date & Location (Clean Sans/Serif mix) */}
        <div className="mt-8 space-y-2">
          <p className="text-slate-500 font-serif text-xl tracking-wide">
            Kepada
          </p>
          <p className="text-slate-400 font-sans text-sm tracking-widest uppercase">
            {guest ? `${guest.title ?? ""} ${guest.name}` : ""}
          </p>

        </div>

        {/* Button */}
        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-10 py-3 bg-royal-blue/90 hover:bg-royal-blue text-white rounded-full font-serif tracking-widest uppercase text-xs shadow-lg hover:shadow-blue-200 transition-all flex items-center gap-3"
        >
          <MailOpen size={16} />
          Buka Undangan
        </motion.button>

      </motion.div>
    </div>
  );
};

export default Cover;