import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, EyeOff, Eye, Brain } from 'lucide-react';
import AliveLogo from '../components/AliveLogo';
import StarBackground from '../components/StarBackground';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Kata sandi dan konfirmasi tidak cocok!');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }
    
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}/api/auth/register`, formData);
      if (res.data.status === 'success') {
        setSuccessMsg('Registrasi berhasil! Mengalihkan ke halaman masuk...');
        setTimeout(() => navigate('/login'), 2500);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Registrasi gagal. Email mungkin sudah terdaftar.');
      setTimeout(() => setErrorMsg(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full items-center p-8 bg-gradient-to-b from-purple-50 via-pink-50 to-blue-50 relative overflow-y-auto overflow-x-hidden">
      <StarBackground />
      
      {/* Toast Error Notification */}
      {errorMsg && (
        <div className="absolute top-8 left-4 right-4 z-50 bg-red-100 border-2 border-white text-red-600 px-4 py-4 rounded-2xl shadow-xl animate-fade-in flex items-start justify-between">
          <div className="flex flex-col">
             <span className="font-extrabold text-sm mb-1">Pendaftaran Gagal</span>
             <span className="text-xs font-semibold">{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg('')} className="text-red-400 hover:text-red-600 font-bold ml-2 text-xl">&times;</button>
        </div>
      )}

      {/* Toast Success Notification */}
      {successMsg && (
        <div className="absolute top-8 left-4 right-4 z-50 bg-green-100 border-2 border-white text-green-700 px-4 py-4 rounded-2xl shadow-xl animate-fade-in flex items-start justify-between">
          <div className="flex flex-col">
             <span className="font-extrabold text-sm mb-1">Berhasil!</span>
             <span className="text-xs font-semibold">{successMsg}</span>
          </div>
        </div>
      )}

      <div className="mt-0 mb-0 w-full flex justify-center z-10 relative">
         <AliveLogo />
      </div>

      <div className="w-full text-left mb-6">
         <h2 className="text-2xl font-bold text-slate-800">Buat Akun</h2>
      </div>

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
         
         <div className="relative">
            <User className="absolute left-4 top-4 text-slate-400" size={20} />
            <input type="text" placeholder="Nama lengkap" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full pl-12 pr-4 py-4 rounded-2xl border-none outline-none shadow-sm focus:ring-2 focus:ring-brand font-medium" required />
         </div>

         <div className="relative">
            <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
            <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full pl-12 pr-4 py-4 rounded-2xl border-none outline-none shadow-sm focus:ring-2 focus:ring-brand font-medium" required />
         </div>

         <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
            <input type={showPassword ? "text" : "password"} placeholder="Kata sandi" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full pl-12 pr-12 py-4 rounded-2xl border-none outline-none shadow-sm focus:ring-2 focus:ring-brand font-medium" required />
            <div onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-slate-400 cursor-pointer">
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </div>
         </div>

         <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
            <input type={showPassword ? "text" : "password"} placeholder="Konfirmasi kata sandi" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} className="w-full pl-12 pr-12 py-4 rounded-2xl border-none outline-none shadow-sm focus:ring-2 focus:ring-brand font-medium" required />
            <div onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-slate-400 cursor-pointer">
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </div>
         </div>

         <div className="flex items-center space-x-3 mt-6 mb-6 px-1">
            <input type="checkbox" required className="w-5 h-5 rounded border-slate-300 text-brand focus:ring-brand" />
            <span className="text-sm text-slate-600 font-medium">Saya setuju dengan syarat & kebijakan privasi</span>
         </div>

         <button type="submit" disabled={loading} className={`w-full py-4 rounded-2xl text-white font-bold text-xl shadow-lg mt-4 ${loading ? 'bg-slate-400' : 'bg-brand'}`}>
            {loading ? 'Memproses...' : 'Buat Akun'}
         </button>
      </form>

      <div className="flex items-center w-full my-6">
        <div className="flex-1 border-t border-slate-300"></div>
        <span className="px-4 text-slate-400 text-sm">atau</span>
        <div className="flex-1 border-t border-slate-300"></div>
      </div>

      <p className="text-slate-600 font-medium">
         Sudah punya akun? <span onClick={() => navigate('/login')} className="font-bold text-slate-900 cursor-pointer underline">Masuk</span>
      </p>
    </div>
  );
}
