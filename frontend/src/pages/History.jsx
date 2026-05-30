import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, Calendar } from 'lucide-react';

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.id) {
          setError("Sesi pengguna tidak valid.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`http://localhost:5000/api/predict/history/${user.id}`);
        if (res.data.status === 'success') {
          setHistory(res.data.data);
        } else {
          setError("Gagal memuat riwayat.");
        }
      } catch (err) {
        setError("Terjadi kesalahan server saat mengambil riwayat.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const getScorePercentage = (record) => {
    if (record.pss_total_score !== undefined && record.pss_total_score !== null) {
      return Math.round((record.pss_total_score / 60) * 100);
    }
    // Fallback jika tidak ada pss_total_score
    const severityMap = { 0: 15, 1: 35, 2: 55, 3: 75, 4: 90, 5: 98 };
    return Math.round((severityMap[record.stress_level_code] || 50) + ((record.confidence / 100) * 4));
  };

  const getColorClasses = (code) => {
    // Memetakan warna berdasarkan level stres
    switch(code) {
      case 0: return 'bg-green-100 text-green-600';
      case 1: return 'bg-blue-100 text-blue-600';
      case 2: return 'bg-yellow-100 text-yellow-500';
      case 3: return 'bg-purple-100 text-purple-500';
      case 4: 
      case 5: return 'bg-red-100 text-red-500';
      default: return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#FCEEFA] to-[#E9F0FD] w-full relative overflow-y-auto overflow-x-hidden">
      
      {/* Top Header */}
      <div className="pt-8 px-6 pb-2 mb-4 w-full">
        <button onClick={() => navigate(-1)} className="flex items-center text-[#2A238B] font-bold hover:opacity-75 text-sm">
          <ChevronLeft size={20} className="mr-1" strokeWidth={3} /> Kembali
        </button>
      </div>

      <div className="flex-grow px-6 flex flex-col items-center pb-8">
        
        {/* Badge Title */}
        <div className="bg-[#D3D8FF] px-8 py-3 rounded-2xl mb-8">
           <h1 className="text-lg font-extrabold text-[#112349]">Ringkasan Riwayat</h1>
        </div>

        {loading ? (
          <div className="text-slate-500 font-medium animate-pulse mt-10">Memuat riwayat Anda...</div>
        ) : error ? (
          <div className="text-red-500 font-medium mt-10">{error}</div>
        ) : history.length === 0 ? (
          <div className="text-slate-500 font-medium mt-10 text-center">
            Belum ada riwayat tes.<br/>Yuk mulai assessment pertama Anda!
          </div>
        ) : (
          <div className="w-full space-y-4">
            {history.map((record) => (
              <div 
                key={record.id} 
                className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:bg-slate-50 transition"
                onClick={() => {
                   // Opsional: navigasi ke halaman detail jika diperlukan nanti
                   // navigate(`/result`, { state: { result: ... } }) 
                }}
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${getColorClasses(record.stress_level_code)}`}>
                    <Calendar size={24} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[#112349] font-bold text-sm mb-0.5">
                      {formatDate(record.created_at)}
                    </span>
                    <span className="text-[#112349] font-black text-xs">
                      Skor : {getScorePercentage(record)} %
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
