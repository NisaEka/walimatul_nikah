import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import Section from './ui/Section';
import FloralDivider from './ui/FloralDivider';
import { WEDDING_DATE, GOOGLE_MAPS_URL } from '../constants';
import { CountdownTime } from '../types';

const EventDetails: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = WEDDING_DATE.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center bg-white/60 backdrop-blur p-3 rounded-lg shadow-sm border border-blue-100 min-w-[70px]">
      <span className="text-2xl font-serif text-royal-blue font-semibold">{value}</span>
      <span className="text-xs text-sage-dark uppercase tracking-wide">{label}</span>
    </div>
  );

  return (
    <Section className="text-center bg-white/40 backdrop-blur-md rounded-2xl shadow-lg border border-white my-10 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 via-royal-blue to-blue-200"></div>

      <h2 className="font-script text-4xl text-royal-blue mb-6">Rangkaian Acara</h2>
      <p className="text-sage-dark mb-8 italic">Insya Allah acara akan diselenggarakan pada:</p>

      <div className="space-y-8">
        {/* Akad Nikah */}
        <div className="bg-gradient-to-br from-white/50 to-blue-50/50 p-6 rounded-xl border border-blue-100">
          <h3 className="font-serif text-2xl text-royal-blue mb-2 font-bold">Akad Nikah & Resepsi</h3>
          <FloralDivider />
          <div className="flex flex-col gap-4 text-sage-dark">
             <div className="flex items-center justify-center gap-2">
                <Calendar className="text-royal-blue" size={20} />
                <span className="font-bold">Minggu, 1 Januari 2026</span>
             </div>
             <div className="flex items-center justify-center gap-2">
                <Clock className="text-royal-blue" size={20} />
                <span>08.00 - 14.00 WIB</span>
             </div>
             <div className="flex items-center justify-center gap-2 text-center">
                <MapPin className="text-royal-blue flex-shrink-0" size={20} />
                <span>
                    <strong>Masjid Nahdjussalam</strong><br/>
                    Jl. Panyawungan, Cileunyi Wetan,<br/>
                    Kabupaten Bandung, Jawa Barat
                </span>
             </div>
          </div>
          
          <a 
            href={GOOGLE_MAPS_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-6 px-6 py-2 border border-royal-blue text-royal-blue rounded-full hover:bg-royal-blue hover:text-white transition-colors text-sm font-semibold tracking-wide"
          >
            Lihat Lokasi
          </a>
        </div>

        {/* Countdown */}
        <div className="pt-4">
            <p className="text-sm uppercase tracking-widest text-sage-dark mb-4">Menuju Hari Bahagia</p>
            <div className="flex justify-center gap-3 md:gap-6 flex-wrap">
                <TimeUnit value={timeLeft.days} label="Hari" />
                <TimeUnit value={timeLeft.hours} label="Jam" />
                <TimeUnit value={timeLeft.minutes} label="Menit" />
                <TimeUnit value={timeLeft.seconds} label="Detik" />
            </div>
        </div>
      </div>
    </Section>
  );
};

export default EventDetails;