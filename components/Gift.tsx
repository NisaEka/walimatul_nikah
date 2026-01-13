import React from 'react';
import { Copy, CreditCard, Gift as GiftIcon } from 'lucide-react';
import Section from './ui/Section';
import FloralDivider from './ui/FloralDivider';

const Gift: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Nomor rekening berhasil disalin!');
  };

  return (
    <Section className="text-center">
      <h2 className="font-script text-4xl text-royal-blue mb-2">Wedding Gift</h2>
      <p className="text-sage-dark mb-6 text-sm max-w-md mx-auto">
        Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
        Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
      </p>
      <FloralDivider />

      <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
        {/* Bank 1 */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 w-full md:w-64 transform hover:-translate-y-1 transition-transform relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-royal-blue"></div>
          <div className="flex justify-center mb-4 text-royal-blue">
            <CreditCard size={32} />
          </div>
          <h3 className="font-serif text-lg font-bold text-slate-700">BSI</h3>
          <p className="text-2xl font-mono text-sage-green my-2 tracking-wider">7200937923</p>
          <p className="text-sm text-slate-500 mb-4">a.n Fiqri Rizal Zulmi</p>
          <button
            onClick={() => copyToClipboard('7200937923')}
            className="text-xs flex items-center justify-center gap-2 w-full py-2 bg-slate-50 hover:bg-slate-100 rounded text-slate-600 transition-colors"
          >
            <Copy size={14} /> Salin Nomor
          </button>
        </div>

        {/* Bank 2 / E-Wallet */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-sky-200 w-full md:w-64 transform hover:-translate-y-1 transition-transform relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-sky-400"></div>
          <div className="flex justify-center mb-4 text-sky-400">
             <GiftIcon size={32} />
          </div>
          <h3 className="font-serif text-lg font-bold text-slate-700">Dana / Gopay</h3>
          <p className="text-2xl font-mono text-sage-green my-2 tracking-wider">089637578942</p>
          <p className="text-sm text-slate-500 mb-4">a.n Nisa Eka Juliana</p>
          <button
            onClick={() => copyToClipboard('08123456789')}
            className="text-xs flex items-center justify-center gap-2 w-full py-2 bg-slate-50 hover:bg-slate-100 rounded text-slate-600 transition-colors"
          >
            <Copy size={14} /> Salin Nomor
          </button>
        </div>
      </div>
    </Section>
  );
};

export default Gift;