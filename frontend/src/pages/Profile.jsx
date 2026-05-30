import { useNavigate } from 'react-router-dom';
import { User, LogOut, ChevronLeft, Mail } from 'lucide-react';
import StarBackground from '../components/StarBackground';

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 w-full relative overflow-y-auto overflow-x-hidden">
      <StarBackground />
      
      {/* Top Header */}
      <div className="relative z-10 pt-8 px-6 pb-2 mb-4 w-full flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center text-brand-dark font-bold hover:opacity-75 text-lg transition-opacity bg-white/50 px-4 py-2 rounded-full backdrop-blur-md shadow-sm border border-white/60">
          <ChevronLeft size={20} className="mr-1" /> Kembali
        </button>
      </div>

      <div className="relative z-10 flex-grow px-6 flex flex-col items-center justify-center pb-20">
        
        {/* Profile Card */}
        <div className="w-full max-w-sm bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/80 flex flex-col items-center mt-[-40px]">
           
           {/* Profile Picture with Gradient Ring */}
           <div className="relative w-36 h-36 rounded-full bg-gradient-to-tr from-pink-400 via-purple-400 to-blue-400 p-1.5 shadow-xl mb-6">
             <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-white">
               <User size={64} className="text-slate-300" />
             </div>
             {/* Tiny decorative badge */}
             <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center shadow-sm"></div>
           </div>

           <h2 className="text-3xl font-black text-slate-800 mb-2 text-center tracking-tight">{user.name || 'Pengguna ALIVE'}</h2>
           
           <div className="flex items-center bg-white/80 px-4 py-2 rounded-full shadow-sm mb-8 border border-slate-100">
             <Mail size={16} className="mr-2 text-brand" /> 
             <p className="text-slate-600 font-bold text-sm">{user.email || 'email@contoh.com'}</p>
           </div>
           
           {/* Riwayat Button */}
           <button 
             onClick={() => navigate('/history')}
             className="w-full py-4 mb-3 bg-white hover:bg-blue-50 text-blue-600 border-2 border-blue-100 rounded-2xl font-bold flex items-center justify-center transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
             Riwayat Tes
           </button>

           {/* Logout Button */}
           <button 
             onClick={handleLogout}
             className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-2xl font-extrabold flex items-center justify-center transition-all shadow-lg hover:shadow-red-500/30 hover:-translate-y-1"
           >
             <LogOut size={20} className="mr-2" />
             Keluar dari Akun
           </button>
           
        </div>
      </div>
    </div>
  );
}
