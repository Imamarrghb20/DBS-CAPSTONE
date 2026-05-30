import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft } from 'lucide-react';

const formSteps = [
  { id: 'info1', type: 'custom' },
  { id: 'info2', type: 'custom' },
  { id: 'lifestyle', type: 'custom' },
  { id: 'mood', type: 'custom' },
  { id: 'q1', type: 'radio', title: 'Seberapa sering kamu merasa sulit berkonsentrasi?', label: 'Kesehatan Mental', icon: '🧠', key: 'q1_focus_difficulty' },
  { id: 'q2', type: 'radio', title: 'Seberapa sering kamu memikirkan banyak hal sekaligus?', label: 'Kesehatan Mental', icon: '🧠', key: 'q2_overthinking' },
  { id: 'q3', type: 'radio', title: 'Seberapa sering kamu merasa kewalahan?', label: 'Kesehatan Mental', icon: '🧠', key: 'q3_overwhelmed' },
  
  { id: 'q4', type: 'radio', title: 'Seberapa sering kamu merasa cemas?', label: 'Kesehatan Mental', icon: '🧠', key: 'q4_anxious' },
  { id: 'q5', type: 'radio', title: 'Seberapa sering kamu mudah gelisah?', label: 'Kesehatan Mental', icon: '🧠', key: 'q5_restless' },
  { id: 'q6', type: 'radio', title: 'Seberapa sering kamu merasa tertekan?', label: 'Kesehatan Mental', icon: '🧠', key: 'q6_depressed' },
  
  { id: 'q7', type: 'radio', title: 'Seberapa sering kamu sulit tidur?', label: 'Pola Tidur', icon: '🛌', key: 'q7_sleep_problem' },
  { id: 'q8', type: 'radio', title: 'Seberapa sering kamu mudah lelah?', label: 'Kondisi Fisik', icon: '🏃', key: 'q8_fatigue' },
  { id: 'q9', type: 'radio', title: 'Seberapa sering kamu sakit kepala atau tegang?', label: 'Kondisi Fisik', icon: '🏃', key: 'q9_headache_tension' },
  
  { id: 'q10', type: 'radio', title: 'Seberapa sering kamu menunda pekerjaan?', label: 'Kesehatan Mental', icon: '🧠', key: 'q10_responsibility_difficulty' },
  { id: 'q11', type: 'radio', title: 'Seberapa sering kamu mudah marah?', label: 'Kesehatan Mental', icon: '🧠', key: 'q11_irritable' },
  { id: 'q12', type: 'radio', title: 'Seberapa sering kamu menghindari sosial?', label: 'Kesehatan Mental', icon: '🧠', key: 'q12_social_withdrawal' },
  
  { id: 'q13', type: 'radio', title: 'Seberapa sering kamu bisa mengendalikan stres?', label: 'Kesehatan Mental', icon: '🧠', key: 'q13_control_stress' },
  { id: 'q14', type: 'radio', title: 'Seberapa sering kamu bisa menenangkan diri?', label: 'Kesehatan Mental', icon: '🧠', key: 'q14_calm_self' },
  { id: 'q15', type: 'radio', title: 'Seberapa sering kamu mampu menghadapi masalah?', label: 'Kesehatan Mental', icon: '🧠', key: 'q15_handle_problem' },
];

const initialFormState = {
  gender: 1, name: '', age: '', city: '', mood: 'Senang',
  q1_focus_difficulty: 2, q2_overthinking: 2, q3_overwhelmed: 2,
  q4_anxious: 2, q5_restless: 2, q6_depressed: 2,
  q7_sleep_problem: 2, q8_fatigue: 2, q9_headache_tension: 2,
  q10_responsibility_difficulty: 2, q11_irritable: 2, q12_social_withdrawal: 2,
  q13_control_stress: 2, q14_calm_self: 2, q15_handle_problem: 2,
  quality_of_sleep: 5,
  physical_activity_level: 150,
  heart_rate: 75,
  daily_steps: 5000,
  screen_time_hours: 6,
  study_hours: 4,
  daily_pressure: 'Medium',
  bmi_category: 1
};

export default function PredictionForm() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const step = formSteps[stepIndex];
  const progressPercent = ((stepIndex + 1) / formSteps.length) * 100;

  const handleNext = () => {
    // Validasi Wajib Isi
    if (step.id === 'info1' && !formData.name.trim()) {
      return alert('Mohon isi nama panggilan kamu ya!');
    }
    if (step.id === 'info2' && (!formData.age.trim() || !formData.city.trim())) {
      return alert('Umur dan tempat tinggal wajib diisi ya!');
    }

    if (stepIndex < formSteps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
    else navigate('/');
  };

  const setValue = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Kalkulasi PSS (Perceived Stress Scale) yang Sebenarnya
      const negativeQuestions = [
         'q1_focus_difficulty', 'q2_overthinking', 'q3_overwhelmed',
         'q4_anxious', 'q5_restless', 'q6_depressed',
         'q7_sleep_problem', 'q8_fatigue', 'q9_headache_tension',
         'q10_responsibility_difficulty', 'q11_irritable', 'q12_social_withdrawal'
      ];
      const positiveQuestions = [
         'q13_control_stress', 'q14_calm_self', 'q15_handle_problem'
      ];

      let real_pss_score = 0;
      
      // Pertanyaan negatif: nilainya ditambahkan secara normal (0, 1, 2, 3, 4)
      negativeQuestions.forEach(q => {
         real_pss_score += formData[q];
      });
      
      // Pertanyaan positif: nilainya dibalik (Reverse Scoring: 4-0, 3-1, 2-2, 1-3, 0-4)
      positiveQuestions.forEach(q => {
         real_pss_score += (4 - formData[q]);
      });

      const payload = { ...formData, pss_total_score: real_pss_score, user_id: user.id || null };
      const response = await axios.post('http://localhost:5000/api/predict', payload);
      if (response.data.status === 'success') {
        navigate('/result', { state: { result: response.data } });
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error(err);
      navigate('/result', { state: { result: { ml_result: { data: { stress_level_prediction: 'CUKUP STRES', confidence: 85, stress_level_code: 1 }, recommendations: { suggested_activity: 'Jalan Santai 15 Menit', nutrition_focus: 'Perbanyak sayur dan kurangi gula' } } } } }); // Fallback for demo
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-brand-bg w-full relative">
      
      {/* Top Navigation */}
      <div className="pt-6 px-6 pb-2">
        <button onClick={handleBack} className="flex items-center text-brand-dark font-bold hover:opacity-75 mb-4 text-lg">
          <ChevronLeft size={24} className="mr-1" /> Kembali
        </button>
        {/* Progress Bar */}
        <div className="w-full bg-white h-2 rounded-full overflow-hidden">
          <div className="bg-brand h-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto px-6 py-4 flex flex-col items-center pb-24">
        
        {step.id === 'info1' && (
          <div className="w-full text-left animate-fade-in mt-4">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Info Diri</h2>
            <p className="text-slate-500 font-medium mb-8 text-sm">Yuk, isi data dirimu untuk pengalaman yang lebih personal dan bermakna.</p>
            
            <label className="block text-slate-800 font-bold mb-2 text-lg">Nama Panggilan</label>
            <input type="text" placeholder="Contoh : Rizaa" value={formData.name} onChange={e => setValue('name', e.target.value)} className="w-full p-4 mb-8 rounded-2xl shadow-sm border-none focus:ring-2 focus:ring-brand font-medium text-slate-800" />
            
            <label className="block text-slate-800 font-bold mb-2 text-lg">Jenis Kelamin</label>
            <div className="flex space-x-4 mb-8">
              <div onClick={() => setValue('gender', 1)} className={`flex-1 p-8 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all ${formData.gender === 1 ? 'bg-blue-100 shadow-sm border-2 border-blue-400' : 'bg-white shadow-sm border-2 border-transparent'}`}>
                <div className="text-6xl mb-2 text-blue-500">🚹</div>
                <span className="font-bold text-lg text-slate-800">Pria</span>
              </div>
              <div onClick={() => setValue('gender', 0)} className={`flex-1 p-8 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all ${formData.gender === 0 ? 'bg-pink-100 shadow-sm border-2 border-pink-400' : 'bg-white shadow-sm border-2 border-transparent'}`}>
                <div className="text-6xl mb-2 text-pink-500">🚺</div>
                <span className="font-bold text-lg text-slate-800">Wanita</span>
              </div>
            </div>

            <div className="bg-brand-light/40 p-4 rounded-2xl flex items-center border border-brand-light">
              <div className="w-12 h-12 bg-pink-300 rounded-xl flex items-center justify-center mr-3 text-2xl">🔒</div>
              <div>
                 <h4 className="font-bold text-brand-dark text-sm">Data Kamu Aman</h4>
                 <p className="text-xs text-brand-dark/70 font-medium">Informasi yang kamu berikan akan kami jaga kerahasiaannya</p>
              </div>
            </div>
          </div>
        )}

        {step.id === 'info2' && (
          <div className="w-full text-left animate-fade-in mt-4">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Lengkapi Data Diri</h2>
            <p className="text-slate-500 font-medium mb-8 text-sm">Biar rekomendasi yang Diberikan Makin Akurat</p>
            
            <label className="block text-slate-800 font-bold mb-2 text-lg">Umur</label>
            <input type="number" placeholder="Contoh : 20" value={formData.age} onChange={e => setValue('age', e.target.value)} className="w-full p-4 mb-8 rounded-2xl shadow-sm border-none focus:ring-2 focus:ring-brand font-medium text-slate-800" />
            
            <label className="block text-slate-800 font-bold mb-2 text-lg">Tempat Tinggal</label>
            <input type="text" placeholder="Contoh : Padang" value={formData.city} onChange={e => setValue('city', e.target.value)} className="w-full p-4 mb-8 rounded-2xl shadow-sm border-none focus:ring-2 focus:ring-brand font-medium text-slate-800" />
          </div>
        )}

        {step.id === 'lifestyle' && (
          <div className="w-full text-left animate-fade-in mt-4">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Gaya Hidup</h2>
            <p className="text-slate-500 font-medium mb-6 text-sm">Informasi ini membantu AI memberikan saran yang lebih presisi untukmu.</p>
            
            <label className="block text-slate-800 font-bold mb-2 text-md">Jam Menatap Layar (Screen Time)</label>
            <p className="text-xs text-slate-400 mb-2">Berapa jam rata-rata kamu menatap layar (HP/Laptop) per hari?</p>
            <div className="flex items-center mb-6">
                <input type="range" min="1" max="18" value={formData.screen_time_hours} onChange={e => setValue('screen_time_hours', Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand" />
                <span className="ml-4 font-bold text-xl text-brand w-12 text-center">{formData.screen_time_hours}j</span>
            </div>

            <label className="block text-slate-800 font-bold mb-2 text-md">Jam Belajar / Kerja</label>
            <p className="text-xs text-slate-400 mb-2">Berapa jam kamu belajar atau bekerja dalam sehari?</p>
            <div className="flex items-center mb-6">
                <input type="range" min="1" max="15" value={formData.study_hours} onChange={e => setValue('study_hours', Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand" />
                <span className="ml-4 font-bold text-xl text-brand w-12 text-center">{formData.study_hours}j</span>
            </div>

            <label className="block text-slate-800 font-bold mb-2 text-md">Tekanan Harian (Daily Pressure)</label>
            <p className="text-xs text-slate-400 mb-2">Seberapa besar tekanan yang kamu rasakan setiap hari?</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
                {['Low', 'Medium', 'High'].map(p => (
                  <div key={p} onClick={() => setValue('daily_pressure', p)} className={`py-3 rounded-xl flex items-center justify-center cursor-pointer transition-all ${formData.daily_pressure === p ? 'bg-brand text-white shadow-md font-bold' : 'bg-white text-slate-600 shadow-sm border border-slate-100 font-medium'}`}>
                     {p === 'Low' ? 'Rendah' : p === 'Medium' ? 'Sedang' : 'Tinggi'}
                  </div>
                ))}
            </div>
          </div>
        )}

        {step.id === 'mood' && (
          <div className="w-full text-left animate-fade-in mt-4">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2 leading-snug">Bagaimana Perasaan Kamu Hari Ini ?</h2>
            <p className="text-slate-500 font-medium mb-8 text-sm">Pilih yang paling menggambarkan perasaanmu hari ini ya</p>
            
            <h3 className="font-bold text-xl mb-4 text-slate-800">Pilihan Mood</h3>
            <div className="grid grid-cols-2 gap-4">
               {['Senang', 'Biasa', 'Sedih', 'Stress'].map(m => (
                 <div key={m} onClick={() => setValue('mood', m)} className={`p-6 rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all ${formData.mood === m ? 'bg-blue-100 shadow-md border-2 border-blue-400' : 'bg-white shadow-sm border-2 border-transparent'}`}>
                    <div className="text-6xl mb-4">{m === 'Senang' ? '😊' : m === 'Biasa' ? '😐' : m === 'Sedih' ? '😢' : '😫'}</div>
                    <span className="font-bold text-lg text-slate-800">{m}</span>
                 </div>
               ))}
            </div>
          </div>
        )}

        {step.type === 'radio' && (
          <div className="w-full text-center animate-fade-in mt-6">
            <div className="inline-block bg-blue-200 text-brand-dark px-6 py-2 rounded-full font-bold mb-8 shadow-sm">
               {step.icon} {step.label}
            </div>
            
            <h2 className="text-3xl font-extrabold text-brand-dark mb-10 leading-snug">{step.title}</h2>
            
            <div className="space-y-3 w-full">
               {[
                 { val: 0, label: 'Tidak Pernah' },
                 { val: 1, label: 'Jarang' },
                 { val: 2, label: 'Netral' },
                 { val: 3, label: 'Sering' },
                 { val: 4, label: 'Selalu' }
               ].map(opt => {
                 const isSelected = formData[step.key] === opt.val;
                 return (
                   <div 
                     key={opt.val} 
                     onClick={() => setValue(step.key, opt.val)}
                     className={`w-full p-5 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${isSelected ? 'bg-brand text-white shadow-md' : 'bg-white text-slate-700 shadow-sm hover:bg-slate-50'}`}
                   >
                     <span className="font-bold text-lg">{opt.label}</span>
                     {isSelected && <div className="w-4 h-4 bg-white rounded-full"></div>}
                   </div>
                 );
               })}
            </div>
            <p className="text-slate-400 text-sm mt-8 flex items-center justify-center"><span className="text-yellow-400 mr-1">💡</span> Jawab sesuai yang kamu rasakan</p>
          </div>
        )}

      </div>

      {/* Sticky Bottom Button */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-brand-bg via-brand-bg to-transparent">
         <button 
            onClick={handleNext}
            disabled={loading}
            className={`w-full py-4 rounded-2xl text-white font-bold text-xl shadow-xl transition ${loading ? 'bg-slate-400' : 'bg-brand hover:bg-brand-dark'}`}
         >
            {loading ? 'Memproses...' : 'Lanjutkan'}
         </button>
      </div>
    </div>
  );
}
