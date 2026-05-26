import os
import numpy as np
import pandas as pd
import joblib
import tensorflow as tf
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Inisialisasi Aplikasi FastAPI
app = FastAPI(
    title="IPB Student Stress Detection API",
    description="Backend Service berbasis Deep Learning untuk mendeteksi tingkat stres mahasiswa.",
    version="1.0.0"
)

# Mengizinkan CORS agar Frontend (React/Vue/HTML biasa) bisa mengakses API ini
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ubah ke domain frontend spesifik saat production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# LOAD ARTIFAK MODEL & PREPROCESSING
# ==========================================
MODEL_PATH = "stress_prediction_model.keras"
SCALER_PATH = "scaler.joblib"
ENCODER_PATH = "label_encoder.joblib"

# Daftarkan Custom Layer agar Keras tidak bingung saat me-load file .keras
from stress_feature_extractor_module import StressFeatureExtractor # jika dipisah, atau definisikan ulang di atas

# Definisikan kembali kelas kustom agar Keras mengenalinya saat load
@tf.keras.utils.register_keras_serializable(package="CustomLayers")
class StressFeatureExtractor(tf.keras.layers.Layer):
    def __init__(self, units=32, **kwargs):
        super(StressFeatureExtractor, self).__init__(**kwargs)
        self.units = units

    def build(self, input_shape):
        self.w = self.add_weight(shape=(input_shape[-1], self.units),
                                 initializer='random_normal', trainable=True, name='w_custom')
        self.b = self.add_weight(shape=(self.units,),
                                 initializer='zeros', trainable=True, name='b_custom')
        super(StressFeatureExtractor, self).build(input_shape)

    def call(self, inputs):
        return tf.nn.relu(tf.matmul(inputs, self.w) + self.b)

    def get_config(self):
        config = super(StressFeatureExtractor, self).get_config()
        config.update({"units": self.units})
        return config

# Load semua komponen pendukung produksi
if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH) and os.path.exists(ENCODER_PATH):
    model = tf.keras.models.load_model(MODEL_PATH, custom_objects={'StressFeatureExtractor': StressFeatureExtractor})
    scaler = joblib.load(SCALER_PATH)
    label_encoder = joblib.load(ENCODER_PATH)
    print("✓ Semua komponen AI berhasil dimuat secara optimal.")
else:
    print("🚨 GAGAL: Pastikan berkas model.keras, scaler.joblib, dan label_encoder.joblib ada di direktori!")

# ==========================================
# DEFINISI SKEMA INPUT REQUEST (PYDANTIC)
# ==========================================
class StressAssessmentRequest(BaseModel):
    gender: int = Field(..., description="1 = Male, 0 = Female")
    q1_focus_difficulty: float; q2_overthinking: float; q3_overwhelmed: float
    q4_anxious: float; q5_restless: float; q6_depressed: float
    q7_sleep_problem: float; q8_fatigue: float; q9_headache_tension: float
    q10_responsibility_difficulty: float; q11_irritable: float; q12_social_withdrawal: float
    q13_control_stress: float; q14_calm_self: float; q15_handle_problem: float
    pss_total_score: float = Field(..., description="Total skor kuesioner PSS")
    quality_of_sleep: int = Field(..., description="Skala kualitas tidur 1-10")
    physical_activity_level: int = Field(..., description="Menit aktivitas fisik per minggu")
    heart_rate: int = Field(..., description="Detak jantung (BPM)")
    daily_steps: int = Field(..., description="Jumlah langkah kaki harian")
    screen_time_hours: float; study_hours: float
    daily_pressure: str = Field(..., description="Nilai berupa string: 'Low', 'Medium', atau 'High'")
    bmi_category: int = Field(..., description="Kategori BMI: 0=Underweight, 1=Normal, 2=Overweight, 3=Obese")

# ==========================================
# ENDPOINT UTAMA DETEKSI STRES
# ==========================================
@app.post("/api/predict")
def predict_stress(payload: StressAssessmentRequest):
    try:
        # 1. Konversi data request (Pydantic object) menjadi Python dictionary
        input_dict = payload.model_dump()
        
        # 2. Tangani pemetaan teks 'daily_pressure' ke bentuk numerik persis seperti saat training
        pressure_mapping = {'Low': 0, 'Medium': 1, 'High': 2}
        if input_dict['daily_pressure'] not in pressure_mapping:
            raise HTTPException(status_code=400, detail="daily_pressure harus bernilai 'Low', 'Medium', atau 'High'")
        
        input_dict['daily_pressure'] = pressure_mapping[input_dict['daily_pressure']]
        
        # 3. Susun data menjadi DataFrame untuk menjaga urutan dan nama kolom tetap konsisten dengan Scaler
        feature_order = [
            'gender', 'q1_focus_difficulty', 'q2_overthinking', 'q3_overwhelmed', 'q4_anxious', 
            'q5_restless', 'q6_depressed', 'q7_sleep_problem', 'q8_fatigue', 'q9_headache_tension', 
            'q10_responsibility_difficulty', 'q11_irritable', 'q12_social_withdrawal', 
            'q13_control_stress', 'q14_calm_self', 'q15_handle_problem', 'pss_total_score', 
            'quality_of_sleep', 'physical_activity_level', 'heart_rate', 'daily_steps', 
            'screen_time_hours', 'study_hours', 'daily_pressure', 'bmi_category'
        ]
        
        # Konversi ke array 2D sesuai urutan fitur training
        ordered_values = [float(input_dict[feature]) for feature in feature_order]
        input_array = np.array([ordered_values])
        
        # 4. Standarisasi menggunakan scaler latih
        scaled_input = scaler.transform(input_array)
        
        # 5. Lakukan inferensi dengan model Deep Learning
        predictions = model.predict(scaled_input, verbose=0)
        predicted_class_idx = np.argmax(predictions, axis=1)[0]
        
        # 6. Balikkan indeks kelas menjadi label teks asli menggunakan Label Encoder
        predicted_label = label_encoder.inverse_transform([predicted_class_idx])[0]
        confidence_score = np.max(predictions) * 100
        
        # 7. Logika Rekomendasi Sederhana berbasis Rule 
        olahraga = "Yoga atau Jalan Santai" if predicted_class_idx == 0 else "Jogging / Bersepeda" if predicted_class_idx == 2 else "Kardio Intensif / Bebas"
        kalori = "Fokus asupan bernutrisi penurun kortisol" if predicted_class_idx == 0 else "Pola makan gizi seimbang harian"
        
        return {
            "status": "success",
            "data": {
                "stress_level_code": int(predicted_class_idx),
                "stress_level_prediction": str(predicted_label).upper(),
                "confidence": round(float(confidence_score), 2)
            },
            "recommendations": {
                "suggested_activity": olahraga,
                "nutrition_focus": kalori
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Terjadi kesalahan internal: {str(e)}")

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "model_loaded": model is not None}