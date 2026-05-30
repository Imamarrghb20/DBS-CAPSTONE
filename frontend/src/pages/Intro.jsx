import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import StarBackground from '../components/StarBackground';

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden p-8 text-center">
      <StarBackground />
      
      <div className="w-full flex justify-start mt-4 z-10">
        <span className="text-slate-400 font-bold text-lg">welcome</span>
      </div>

      <div className="flex flex-col items-center flex-grow justify-center space-y-10 w-full mt-4 z-10">
        <div className="w-48 h-48 bg-pink-100 rounded-full flex items-center justify-center mb-4 border border-brand-light">
           <div className="text-6xl">🛡️</div>
        </div>
        
        <div className="space-y-4 max-w-xs mx-auto">
          <h2 className="text-3xl font-bold text-brand-dark leading-snug">Perjalanan Kecil Dimulai Hari ini</h2>
          <p className="text-slate-500 text-sm font-medium leading-relaxed px-2">
            Hasil assessment bersifat pribadi dan membantu kamu mengenali kondisi diri, bukan sebagai diagnosis medis.
          </p>
        </div>

        <div className="bg-brand-light/40 w-full p-4 rounded-2xl flex items-center mb-4 border border-brand-light shadow-sm">
          <div className="w-12 h-12 bg-brand/20 rounded-xl flex items-center justify-center mr-3 text-2xl">🔒</div>
          <div className="text-left">
             <h4 className="font-bold text-brand-dark text-sm leading-tight">Data Kamu aman dan</h4>
             <h4 className="font-bold text-brand-dark text-sm leading-tight">tersimpan secara pribadi.</h4>
          </div>
        </div>
      </div>

      <div className="w-full pb-8 space-y-6">
        <button 
          onClick={() => navigate('/login')}
          className="w-full py-4 bg-brand rounded-2xl text-white font-bold text-xl shadow-lg shadow-brand/40 hover:bg-brand-dark transition-all"
        >
          Masuk
        </button>

        <div className="w-full flex items-center justify-between pt-2">
          <button 
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white border border-brand-light rounded-2xl flex items-center justify-center text-brand-dark shadow-sm hover:bg-slate-50 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex space-x-3 pr-12">
             <div className="w-3 h-3 rounded-full bg-brand-light"></div>
             <div className="w-3 h-3 rounded-full bg-brand-light"></div>
             <div className="w-3 h-3 rounded-full bg-brand"></div>
             <div className="w-3 h-3 rounded-full bg-white border border-brand-light"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
