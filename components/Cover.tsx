import React from 'react';
import { motion } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { BRIDE_NAME, GROOM_NAME } from '../constants';

interface CoverProps {
  onOpen: () => void;
}

// Reusable Floral Cluster Component for Corners
const FloralCorner: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({ position }) => {
  
  // Base rotation/position classes based on corner
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 scale-x-[-1]', // Mirror horizontally for right side
    'bottom-left': 'bottom-0 left-0 scale-y-[-1]', // Mirror vertically
    'bottom-right': 'bottom-0 right-0 scale-[-1]', // Mirror both
  };

  return (
    <div className={`absolute ${positionClasses[position]} w-48 h-48 pointer-events-none z-20`}>
      {/* Leaves (Sage Green) */}
      <motion.div 
        className="absolute top-[-20px] left-[-20px] text-sage-green opacity-60 text-[8rem] font-serif leading-none"
        animate={{ rotate: [0, 2, 0] }} transition={{ duration: 5, repeat: Infinity }}
      >
        ❧
      </motion.div>
      <div className="absolute top-[20px] left-[60px] text-sage-dark opacity-40 text-[5rem] font-serif rotate-45">❧</div>

      {/* Blue Flowers (Layered for depth) */}
      <motion.div 
        className="absolute top-[-10px] left-[-10px] text-watercolor-blue opacity-80 text-[7rem] leading-none"
        animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }}
      >
        ❀
      </motion.div>
      <div className="absolute top-[30px] left-[40px] text-sky-400 opacity-60 text-[5rem]">❀</div>
      <div className="absolute top-[10px] left-[80px] text-royal-blue opacity-40 text-[3rem]">❀</div>
      
      {/* Accent buds */}
      <div className="absolute top-[90px] left-[10px] text-blue-300 text-4xl">.</div>
      <div className="absolute top-[10px] left-[120px] text-blue-300 text-4xl">.</div>
    </div>
  );
};

const Cover: React.FC<CoverProps> = ({ onOpen }) => {
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
        <p className="font-script text-3xl text-sage-dark opacity-80 mt-12">The Wedding of</p>
        
        {/* Names */}
        <div className="space-y-1">
          <h1 className="font-serif text-5xl md:text-6xl text-royal-blue font-bold tracking-tight">
            {GROOM_NAME.split(' ')[0]} {GROOM_NAME.split(' ')[1]}
          </h1>
          <p className="font-script text-4xl text-royal-blue opacity-60 my-2">&</p>
          <h1 className="font-serif text-5xl md:text-6xl text-royal-blue font-bold tracking-tight">
             {BRIDE_NAME.split(' ')[0]} {BRIDE_NAME.split(' ')[1]}
          </h1>
        </div>

        {/* Date & Location (Clean Sans/Serif mix) */}
        <div className="mt-8 space-y-2">
            <p className="text-slate-500 font-serif text-xl tracking-wide">
            Minggu, 1 Januari 2026
            </p>
            <p className="text-slate-400 font-sans text-sm tracking-widest uppercase">
            Masjid Nahdjussalam, Bandung
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