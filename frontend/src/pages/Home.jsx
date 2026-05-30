import { useNavigate } from 'react-router-dom';
import { ChevronRight, Brain } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full items-center justify-between p-8 text-center relative">
      {/* Decorative stars can be added as absolute positioned SVG/Divs here */}
      
      <div className="w-full flex justify-end mt-4">
        <button onClick={() => navigate('/predict')} className="text-brand-dark font-bold text-lg tracking-wide hover:opacity-75">Skip</button>
      </div>

      <div className="flex flex-col items-center flex-grow justify-center space-y-10 w-full">
        {/* Placeholder Logo ALIVE */}
        <div className="relative w-48 h-48 flex items-center justify-center">
           <div className="absolute inset-0 rounded-full border-t-4 border-l-4 border-pink-400 opacity-50 transform -rotate-45"></div>
           <div className="absolute inset-2 rounded-full border-r-4 border-b-4 border-brand opacity-80 transform rotate-12"></div>
           <div className="flex flex-col items-center justify-center z-10 text-brand">
              <Brain size={64} className="text-pink-500 mb-2" />
              <h1 className="text-4xl font-extrabold text-blue-500 tracking-wider">ALIVE</h1>
           </div>
        </div>
        
        <div className="space-y-4 max-w-xs mx-auto">
          <h2 className="text-2xl font-bold text-brand-dark">Selamat Datang di ALIVE</h2>
          <p className="text-slate-500 text-sm font-medium leading-relaxed px-2">
            Ruang aman untuk memahami diri, menjaga kesehatan mental, dan membangun kebiasaan hidup yang lebih baik
          </p>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pb-8">
        <div className="flex space-x-3 pl-2">
           <div className="w-3 h-3 rounded-full bg-brand"></div>
           <div className="w-3 h-3 rounded-full bg-white border border-brand-light"></div>
           <div className="w-3 h-3 rounded-full bg-white border border-brand-light"></div>
           <div className="w-3 h-3 rounded-full bg-white border border-brand-light"></div>
        </div>
        <button 
          onClick={() => navigate('/predict')}
          className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand/40 hover:bg-brand-dark transition-all"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
