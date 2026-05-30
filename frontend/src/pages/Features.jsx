import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StarBackground from '../components/StarBackground';

export default function Features() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full items-center justify-between p-8 text-center relative bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 overflow-hidden">
      <StarBackground />
      
      <div className="w-full flex justify-between mt-4 z-10">
        <span className="text-slate-400 font-bold text-lg">welcome</span>
        <button onClick={() => navigate('/login')} className="text-brand-dark font-bold text-lg tracking-wide hover:opacity-75">Skip</button>
      </div>

      <div className="flex flex-col items-center flex-grow justify-center space-y-8 w-full mt-4 z-10">
        <div className="space-y-4 max-w-xs mx-auto">
          <h2 className="text-3xl font-bold text-brand-dark leading-snug">Pantau Kodisimu Setiap Hari</h2>
          <p className="text-slate-500 text-sm font-medium leading-relaxed px-2">
            Mulai dari assessment kesehatan mental, pola tidur, pola makan, hingga aktivitas fisik untuk membantu memahami kondisi dirimu secara menyeluruh
          </p>
        </div>

        {/* Custom Illustration Card */}
        <div className="w-full bg-white/50 border border-brand-light rounded-3xl p-6 relative h-64 flex items-center justify-center shadow-sm">
           
           {/* Center Character Placeholder */}
           <div className="absolute z-10 text-8xl">👩🏻‍🦰</div>
           
           {/* Floating Cards */}
           <div className="absolute top-4 left-2 bg-white p-2 rounded-xl shadow-md text-left flex items-center space-x-2">
              <div className="text-xl">🌙</div>
              <div>
                 <p className="text-[10px] font-bold text-brand-dark">Pola Tidur</p>
                 <div className="w-12 h-1 bg-brand-light rounded-full mt-1"></div>
              </div>
           </div>
           
           <div className="absolute top-4 right-2 bg-white p-2 rounded-xl shadow-md text-left flex items-center space-x-2">
              <div className="text-xl">😊</div>
              <div>
                 <p className="text-[10px] font-bold text-brand-dark">Pilihan Mood</p>
                 <div className="w-12 h-1 bg-brand-light rounded-full mt-1"></div>
              </div>
           </div>

           <div className="absolute bottom-4 left-2 bg-white p-2 rounded-xl shadow-md text-left flex items-center space-x-2">
              <div className="text-xl">🥗</div>
              <div>
                 <p className="text-[10px] font-bold text-brand-dark">Pola Makan</p>
                 <div className="w-12 h-1 bg-brand-light rounded-full mt-1"></div>
              </div>
           </div>

           <div className="absolute bottom-4 right-2 bg-white p-2 rounded-xl shadow-md text-left flex items-center space-x-2">
              <div className="text-xl">👟</div>
              <div>
                 <p className="text-[10px] font-bold text-brand-dark">Aktivitas Fisik</p>
                 <div className="w-12 h-1 bg-brand-light rounded-full mt-1"></div>
              </div>
           </div>

        </div>
      </div>

      <div className="w-full flex items-center justify-between pb-8 pt-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-white border border-brand-light rounded-2xl flex items-center justify-center text-brand-dark shadow-sm hover:bg-slate-50 transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex space-x-3">
           <div className="w-3 h-3 rounded-full bg-brand-light"></div>
           <div className="w-3 h-3 rounded-full bg-brand"></div>
           <div className="w-3 h-3 rounded-full bg-white border border-brand-light"></div>
           <div className="w-3 h-3 rounded-full bg-white border border-brand-light"></div>
        </div>

        <button 
          onClick={() => navigate('/intro')}
          className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand/40 hover:bg-brand-dark transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
