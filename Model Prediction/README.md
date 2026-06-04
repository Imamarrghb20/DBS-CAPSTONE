# 🧠 Model Prediction - Student Stress Detection

Folder ini berisi model Deep Learning dan artefak pendukung untuk sistem deteksi tingkat stres mahasiswa.

---

## 📁 Struktur File
Model Prediction/
├── app.py # FastAPI backend service
├── stress_prediction_model.keras # Model Deep Learning
├── scaler.joblib # StandardScaler
├── label_encoder.joblib # LabelEncoder
└── requirements.txt # Dependencies

---

## Cara Menjalankan API

```bash
pip install -r requirements.txt
uvicorn app:app --reload --host 0.0.0.0 --port 8000

📡 Endpoint API

Method	Endpoint	    Deskripsi
POST	/api/predict	Deteksi tingkat stres
GET	    /api/health	    Cek status server


📊 Output Prediksi
Kode	Label Stres
0	LOW
1	MODERATE
2	HIGH

📦 Dependencies
fastapi
uvicorn
tensorflow
numpy
pandas
joblib
scikit-learn