import { useLocation, useNavigate } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state?.result;

  if (!resultData) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Data Tidak Ditemukan</h2>
        <button onClick={() => navigate('/predict')} className="px-6 py-3 bg-brand text-white rounded-xl">Isi Form Lagi</button>
      </div>
    );
  }

  const { ml_result, pss_score } = resultData;
  const prediction = ml_result.data;
  const recommendations = ml_result.recommendations;

  const isHighStress = prediction.stress_level_code > 1;
  
  // Mengkalkulasi persentase keparahan stres murni berdasarkan Skor PSS asli (maksimal 60)
  let score = 0;
  if (pss_score !== undefined) {
     score = Math.round((pss_score / 60) * 100);
  } else {
     // Fallback jika data pss_score gagal dimuat
     const severityMap = { 0: 15, 1: 35, 2: 55, 3: 75, 4: 90, 5: 98 };
     const baseSeverity = severityMap[prediction.stress_level_code] || 50;
     score = Math.round(baseSeverity + ((prediction.confidence / 100) * 4));
  }
  
  const stressLabels = {
    0: 'TIDAK STRES / NORMAL',
    1: 'STRES RINGAN',
    2: 'STRES SEDANG',
    3: 'STRES BERAT',
    4: 'SANGAT BERAT',
    5: 'EKSTREM'
  };
  
  // Jika dari Python ternyata mengembalikan angka (misal "2"), kita ubah jadi teks
  let displayLabel = prediction.stress_level_prediction;
  if (!isNaN(displayLabel)) {
    displayLabel = stressLabels[prediction.stress_level_code] || `TINGKAT ${prediction.stress_level_code}`;
  }
  
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-brand-bg px-4 py-8 relative">
      
      {/* Tombol Profile di Kanan Atas */}
      <button 
        onClick={() => navigate('/profile')} 
        className="absolute top-8 right-4 w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-brand"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </button>

      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-brand-dark mb-1">Hallo, Sahabat!</h2>
        <p className="text-slate-600 text-sm">Terima kasih sudah menyelesaikan assessment hari ini.</p>
        <p className="text-brand font-semibold text-sm mt-1">Yuk, lihat ringkasan kondisi kamu</p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
         <div className="flex justify-between items-start mb-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl mr-4 flex-shrink-0">
               {isHighStress ? '🌧️' : '🌤️'}
            </div>
            <div>
               <h3 className="text-brand-dark font-bold text-sm">Kondisi Mental Kamu</h3>
               <h4 className={`text-xl font-black ${isHighStress ? 'text-red-500' : 'text-blue-500'}`}>
                  {displayLabel}
               </h4>
               <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  {isHighStress 
                     ? 'Kamu sedang mengalami tekanan. Yuk, istirahat sejenak dan perhatikan kesehatan mentalmu!' 
                     : 'Kamu sudah melakukan hal baik untuk dirimu. Yuk, pertahankan dan tingkatkan lagi!'}
               </p>
            </div>
         </div>
         <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
            <div className="flex items-center">
               <div className="w-14 h-14 rounded-full border-4 border-blue-200 flex items-center justify-center font-bold text-brand-dark mr-3">
                  {score}%
               </div>
               <div>
                  <p className="font-bold text-sm text-slate-800">Tingkat Keparahan Stres</p>
                  <span className={`text-xs px-2 py-0.5 rounded ${isHighStress ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'}`}>
                     {isHighStress ? 'Perlu Perhatian' : 'Cukup Baik'}
                  </span>
               </div>
            </div>
         </div>
      </div>

      {/* Ringkasan Untuk Kamu */}
      <h3 className="font-bold text-slate-800 text-lg mb-3">Ringkasan Untuk Kamu</h3>
      
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-4 mb-8">
         <div className="flex items-start">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mr-3 flex-shrink-0">💤</div>
            <div>
               <h4 className="font-bold text-slate-800 text-sm">Perbaiki Pola Tidur Kamu</h4>
               <p className="text-xs text-slate-500 mt-1 leading-relaxed">{recommendations.sleep_recommendation || "Tidur sebelum jam 11 malam. Hindari screen time 1 jam sebelum tidur."}</p>
            </div>
         </div>
         <div className="flex items-start">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl mr-3 flex-shrink-0">🥗</div>
            <div>
               <h4 className="font-bold text-slate-800 text-sm">Fokus Nutrisi</h4>
               <p className="text-xs text-slate-500 mt-1 leading-relaxed">{recommendations.nutrition_focus || "Pertahankan pola makan gizi seimbang."}</p>
            </div>
         </div>
         <div className="flex items-start">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl mr-3 flex-shrink-0">🏃</div>
            <div>
               <h4 className="font-bold text-slate-800 text-sm">Aktivitas Disarankan</h4>
               <p className="text-xs text-slate-500 mt-1 leading-relaxed">{recommendations.suggested_activity || "Berolahraga ringan 3x seminggu."}</p>
            </div>
         </div>
         <div className="flex items-start">
            <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-2xl mr-3 flex-shrink-0">🧠</div>
            <div>
               <h4 className="font-bold text-slate-800 text-sm">Jaga Kesehatan Mental Kamu Ya!</h4>
               <p className="text-xs text-slate-500 mt-1 leading-relaxed">{recommendations.mental_health_advice || "Luangkan waktumu untuk me-time, dan ceritakan perasaanmu ke orang yang kamu percaya."}</p>
            </div>
         </div>
      </div>

      <div className="bg-red-50 rounded-2xl p-4 flex items-center mb-6">
         <div className="text-3xl mr-3">❤️</div>
         <div>
            <h4 className="font-bold text-red-600 text-sm">Kamu Hebat!</h4>
            <p className="text-xs text-red-500 mt-1">Setiap langkah kecil yang kamu lakukan berarti besar untuk dirimu.</p>
         </div>
      </div>

      <button 
        onClick={() => navigate('/predict')}
        className="w-full py-4 bg-brand hover:bg-brand-dark text-white rounded-2xl font-bold flex items-center justify-center shadow-lg transition"
      >
        <RotateCcw size={20} className="mr-2" />
        Mulai Assessment kembali
      </button>

    </div>
  );
}
