import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Star } from 'lucide-react';
import StarBackground from '../components/StarBackground';
import AliveLogo from '../components/AliveLogo';

export default function Welcome() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  const handleNext = () => {
    if (slide < 2) setSlide(slide + 1);
  };

  const handlePrev = () => {
    if (slide > 0) setSlide(slide - 1);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      <StarBackground />
      
      {/* Top Header - Fixed */}
      <div className="flex justify-end p-6 z-20 h-16 shrink-0">
        <button onClick={() => navigate('/login')} className="text-brand font-bold text-lg hover:text-brand-dark transition-colors">
          Skip
        </button>
      </div>

      {/* Main Content Area - Flexible and centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 z-10 w-full pb-8">
        
        {slide === 0 && (
          <div className="flex flex-col items-center animate-fade-in w-full max-w-sm">
             <div className="mb-10 w-full flex justify-center scale-110">
                <AliveLogo />
             </div>
             <h2 className="text-[28px] font-extrabold text-brand-dark leading-tight text-left w-full mb-4">
                Selamat Datang di<br/>ALIVE
             </h2>
             <p className="text-slate-600 text-sm font-medium leading-relaxed text-left w-full pr-4">
                Ruang aman untuk memahami diri, menjaga kesehatan mental, dan membangun kebiasaan hidup yang lebih baik
             </p>
          </div>
        )}

        {slide === 1 && (
          <div className="flex flex-col items-center animate-fade-in w-full max-w-sm">
             <h2 className="text-[28px] font-extrabold text-brand-dark leading-tight text-center mb-6">
                Pantau Kodisimu<br/>Setiap Hari
             </h2>
             <p className="text-slate-600 text-sm font-medium leading-relaxed text-center mb-8 px-2">
                Mulai dari assessment kesehatan mental, pola tidur, pola makan, hingga aktivitas fisik untuk membantu memahami kondisi dirimu secara menyeluruh
             </p>
             <div className="relative w-full max-w-[360px] h-[400px] bg-white rounded-[2rem] shadow-xl flex items-center justify-center p-4 mx-auto mb-4">
                 <img src="/229d91c7-316c-4efb-96d2-231f764887f8%202.png" alt="Karakter" className="w-48 h-auto drop-shadow-md z-10" onError={(e) => e.target.style.display='none'} />
                 
                 {/* Top Left - Pola Tidur */}
                 <div className="absolute left-3 top-6 bg-white shadow-[0_8px_20px_rgb(0,0,0,0.08)] rounded-2xl p-3 flex flex-col w-[110px] z-20">
                    <img src="/pola tidur.png" alt="Tidur" className="w-14 h-14 self-center mb-2 object-contain" onError={(e) => e.target.style.display='none'} />
                    <span className="text-[11px] text-indigo-400 font-medium leading-tight mb-0.5 text-left">Pola Tidur</span>
                    <span className="text-[12px] text-slate-700 font-bold leading-tight mb-2 text-left">6jam 30m</span>
                    <div className="w-full h-2 bg-slate-200 rounded-full"><div className="w-[70%] h-full bg-indigo-800 rounded-full"></div></div>
                 </div>

                 {/* Top Right - Pilihan Mood */}
                 <div className="absolute right-3 top-6 bg-white shadow-[0_8px_20px_rgb(0,0,0,0.08)] rounded-2xl p-3 flex flex-col w-[110px] z-20">
                    <img src="/kesehatan mental.png" alt="Mood" className="w-14 h-14 self-center mb-2 object-contain" onError={(e) => e.target.style.display='none'} />
                    <span className="text-[11px] text-indigo-400 font-medium leading-tight mb-0.5 text-left">Pilihan Mood</span>
                    <span className="text-[12px] text-slate-700 font-bold leading-tight mb-2 text-left">Hari ini</span>
                    <div className="w-full h-2 bg-slate-200 rounded-full"><div className="w-[50%] h-full bg-indigo-800 rounded-full"></div></div>
                 </div>

                 {/* Bottom Left - Pola Makan */}
                 <div className="absolute left-3 bottom-6 bg-white shadow-[0_8px_20px_rgb(0,0,0,0.08)] rounded-2xl p-3 flex flex-col w-[110px] z-20">
                    <img src="/pola makan.png" alt="Makan" className="w-14 h-14 self-center mb-2 object-contain" onError={(e) => e.target.style.display='none'} />
                    <span className="text-[11px] text-indigo-400 font-medium leading-tight mb-0.5 text-left">Pola Makan</span>
                    <span className="text-[12px] text-slate-700 font-bold leading-tight mb-2 text-left">Seimbang</span>
                    <div className="w-full h-2 bg-slate-200 rounded-full"><div className="w-[85%] h-full bg-indigo-800 rounded-full"></div></div>
                 </div>

                 {/* Bottom Right - Aktivitas Fisik */}
                 <div className="absolute right-3 bottom-6 bg-white shadow-[0_8px_20px_rgb(0,0,0,0.08)] rounded-2xl p-3 flex flex-col w-[110px] z-20">
                    <img src="/aktivitas fisik.png" alt="Fisik" className="w-14 h-14 self-center mb-2 object-contain" onError={(e) => e.target.style.display='none'} />
                    <span className="text-[11px] text-indigo-400 font-medium leading-tight mb-0.5 text-left">Aktivitas Fisik</span>
                    <span className="text-[12px] text-slate-700 font-bold leading-tight mb-2 text-left">Yang Baik</span>
                    <div className="w-full h-2 bg-slate-200 rounded-full"><div className="w-[75%] h-full bg-indigo-800 rounded-full"></div></div>
                 </div>
             </div>
          </div>
        )}

        {slide === 2 && (
          <div className="flex flex-col items-center animate-fade-in w-full max-w-sm">
             <div className="relative w-56 h-56 bg-pink-100/50 rounded-full flex items-center justify-center mb-12 shadow-inner border border-pink-200">
                <img src="/Gembok Intro.png" alt="Privacy" className="w-24 h-auto drop-shadow-xl" onError={(e) => e.target.style.display='none'} />
             </div>
             <h2 className="text-[28px] font-extrabold text-brand-dark leading-tight text-center mb-4 px-4">
                Perjalanan Kecil Dimulai Hari ini
             </h2>
             <p className="text-slate-600 text-sm font-medium leading-relaxed text-center mb-10 px-4">
                Hasil assessment bersifat pribadi dan membantu kamu mengenali kondisi diri, bukan sebagai diagnosis medis.
             </p>

             <div className="w-full bg-brand-light/30 border border-brand-light/50 p-4 rounded-2xl flex items-center shadow-sm mb-12">
                <div className="w-12 h-12 bg-pink-200 rounded-xl flex items-center justify-center mr-4 text-xl shadow-inner shrink-0">🔒</div>
                <p className="font-bold text-brand-dark text-sm leading-tight">Data Kamu aman dan tersimpan secara pribadi.</p>
             </div>

             <button 
               onClick={() => navigate('/login')}
               className="w-full py-4 bg-brand rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand/40 hover:bg-brand-dark transition-all"
             >
               Masuk <Star size={20} className="ml-2 text-yellow-300 fill-yellow-300" />
             </button>
          </div>
        )}

      </div>

      {/* Bottom Navigation - Fixed Height Container */}
      <div className="h-28 shrink-0 w-full px-6 flex items-center justify-between pb-6 z-20">
        
        <button 
          onClick={handlePrev}
          className={`w-12 h-12 bg-white border border-brand-light rounded-2xl flex items-center justify-center text-brand-dark shadow-sm hover:bg-slate-50 transition-all ${slide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex space-x-2 absolute left-1/2 transform -translate-x-1/2">
           <div className={`w-2.5 h-2.5 rounded-full transition-all ${slide === 0 ? 'bg-brand scale-125' : 'bg-brand-light/50 border border-brand-light/30'}`}></div>
           <div className={`w-2.5 h-2.5 rounded-full transition-all ${slide === 1 ? 'bg-brand scale-125' : 'bg-brand-light/50 border border-brand-light/30'}`}></div>
           <div className={`w-2.5 h-2.5 rounded-full transition-all ${slide === 2 ? 'bg-brand scale-125' : 'bg-brand-light/50 border border-brand-light/30'}`}></div>
           <div className="w-2.5 h-2.5 rounded-full bg-brand-light/50 border border-brand-light/30"></div>
        </div>

        <div className="w-12 h-12 flex items-center justify-center">
          {slide < 2 && (
            <button 
              onClick={handleNext}
              className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand/40 hover:bg-brand-dark transition-all"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
