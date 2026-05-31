import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, EyeOff, Eye, Brain } from 'lucide-react';
import StarBackground from '../components/StarBackground';

import AliveLogo from '../components/AliveLogo';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}/api/auth/login`, formData);
      if (res.data.status === 'success') {
        localStorage.setItem('token', res.data.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.data.user));
        navigate('/predict');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Login gagal. Periksa kembali email dan kata sandi Anda.');
      setTimeout(() => setErrorMsg(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full items-center p-8 bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 relative overflow-y-auto overflow-x-hidden justify-center">
      <StarBackground />
      
      {/* Toast Error Notification */}
      {errorMsg && (
        <div className="absolute top-8 left-4 right-4 z-50 bg-red-100 border-2 border-white text-red-600 px-4 py-4 rounded-2xl shadow-xl animate-fade-in flex items-start justify-between">
          <div className="flex flex-col">
             <span className="font-extrabold text-sm mb-1">Gagal Masuk</span>
             <span className="text-xs font-semibold">{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg('')} className="text-red-400 hover:text-red-600 font-bold ml-2 text-xl">&times;</button>
        </div>
      )}

      <div className="mb-0 w-full flex justify-center z-10 relative">
         <AliveLogo />
      </div>

      <div className="w-full text-left mb-6 z-10 relative">
         <h2 className="text-2xl font-bold text-slate-800 mb-1">Welcome Back !</h2>
         <p className="text-slate-500 font-medium">Yuk lanjutkan perjalananmu.</p>
      </div>

      <form className="w-full space-y-4 z-10 relative" onSubmit={handleSubmit}>
         
         <div className="relative">
            <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
            <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full pl-12 pr-4 py-4 rounded-2xl border-none outline-none shadow-sm focus:ring-2 focus:ring-brand font-medium bg-white" required />
         </div>

         <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
            <input type={showPassword ? "text" : "password"} placeholder="Kata sandi" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full pl-12 pr-12 py-4 rounded-2xl border-none outline-none shadow-sm focus:ring-2 focus:ring-brand font-medium bg-white" required />
            <div onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-slate-400 cursor-pointer">
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </div>
         </div>

         <button type="submit" disabled={loading} className={`w-full py-4 rounded-2xl text-white font-bold text-xl shadow-lg mt-8 ${loading ? 'bg-slate-400' : 'bg-brand'}`}>
            {loading ? 'Memproses...' : 'Masuk'}
         </button>
      </form>

      <div className="flex items-center w-full my-8 z-10 relative">
        <div className="flex-1 border-t border-slate-300"></div>
        <span className="px-4 text-slate-400 text-sm">atau</span>
        <div className="flex-1 border-t border-slate-300"></div>
      </div>

      <p className="text-slate-600 font-medium z-10 relative">
         Belum punya akun? <span onClick={() => navigate('/register')} className="font-bold text-slate-900 cursor-pointer underline">Daftar</span>
      </p>
    </div>
  );
}
