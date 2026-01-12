import React, { useState } from 'react';
import Cover from './components/Cover';
import Section from './components/ui/Section';
import FloralDivider from './components/ui/FloralDivider';
import EventDetails from './components/EventDetails';
import RsvpGuestBook from './components/RsvpGuestBook';
import Gift from './components/Gift';
import MusicPlayer from './components/MusicPlayer';
import { BRIDE_NAME, GROOM_NAME } from './constants';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  // When "Open Invitation" is clicked
  const handleOpen = () => {
    setIsOpen(true);
    // Enable scroll
    document.body.style.overflow = 'auto';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lock scroll initially
  React.useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    }
  }, [isOpen]);

  return (
    <div className="min-h-screen font-sans text-royal-blue overflow-x-hidden bg-paper">
      {/* Blue Watercolor Texture Background */}
      <div className="fixed inset-0 bg-watercolor opacity-50 z-[-1] pointer-events-none mix-blend-multiply"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-white via-blue-50 to-white opacity-80 z-[-1] pointer-events-none"></div>

      {/* Landing / Cover Page */}
      {!isOpen && <Cover onOpen={handleOpen} />}

      {/* Main Content (Hidden until opened) */}
      <div className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        
        <MusicPlayer autoPlay={isOpen} />

        {/* Header/Intro */}
        <header className="relative pt-20 pb-10 text-center px-4">
           {/* Soft Blue Gradient Top */}
           <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-100/50 to-transparent z-[-1]"></div>
           
           <Section delay={0.2}>
             <p className="font-serif text-lg text-sage-dark mb-4 tracking-widest uppercase">The Wedding of</p>
             <h1 className="font-script text-5xl md:text-6xl text-royal-blue mb-2">
               {GROOM_NAME.split(' ')[1]} <span className="text-sky-400">&</span> {BRIDE_NAME.split(' ')[1]}
             </h1>
             <p className="text-sm tracking-widest uppercase text-sage-dark mt-4">01 . 01 . 2026</p>
           </Section>
        </header>

        {/* Salam & Verse */}
        <Section className="text-center">
            <FloralDivider />
            <h2 className="font-arabic text-2xl md:text-3xl mb-4 text-royal-blue">السلام عليكم ورحمة الله وبركاته</h2>
            <p className="mb-8 italic text-sage-dark">
                "Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. 
                Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan putra-putri kami:"
            </p>
            
            {/* Couple Profiles */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 my-12">
                <div className="text-center">
                    <h3 className="font-script text-4xl text-royal-blue mb-2">{GROOM_NAME}</h3>
                    <p className="text-sm text-sage-dark">Putra dari Bpk. Fulan & Ibu Fulanah</p>
                </div>
                
                <span className="font-script text-4xl text-sage-green">&</span>

                <div className="text-center">
                    <h3 className="font-script text-4xl text-royal-blue mb-2">{BRIDE_NAME}</h3>
                    <p className="text-sm text-sage-dark">Putri dari Bpk. Alan & Ibu Alana</p>
                </div>
            </div>

            <FloralDivider />
        </Section>

        {/* Quran Verse */}
        <Section className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-blue-100">
             <p className="font-arabic text-xl md:text-2xl leading-loose text-royal-blue mb-4" dir="rtl">
             وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
             </p>
             <p className="text-sm text-slate-500 italic max-w-lg mx-auto">
             "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
             </p>
             <p className="mt-4 font-bold text-sage-dark text-sm uppercase tracking-widest">(QS. Ar-Rum: 21)</p>
        </Section>

        {/* Event Details */}
        <EventDetails />

        {/* Gift */}
        <Gift />

        {/* RSVP */}
        <RsvpGuestBook />

        {/* Footer */}
        <footer className="bg-gradient-to-t from-slate-900 to-slate-800 text-blue-50 py-12 text-center relative overflow-hidden">
            <div className="relative z-10 px-4">
                <h2 className="font-script text-4xl mb-6 text-blue-200">Terima Kasih</h2>
                <p className="text-slate-300 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                    Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
                </p>
                <p className="font-arabic text-xl mb-8">والسلام عليكم ورحمة الله وبركاته</p>
                
                <div className="text-white font-serif text-lg">
                    {GROOM_NAME} & {BRIDE_NAME}
                </div>
                <p className="text-xs text-slate-500 mt-12">
                   Digital Invitation
                </p>
            </div>
             {/* Simple footer florals */}
             <div className="absolute -bottom-10 -left-10 text-royal-blue opacity-10 text-9xl">❀</div>
             <div className="absolute -bottom-10 -right-10 text-royal-blue opacity-10 text-9xl">❀</div>
        </footer>

      </div>
    </div>
  );
}

export default App;