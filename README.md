# 🌟 ALIVE (Capstone Project DBS Foundation)

ALIVE adalah sebuah aplikasi berbasis web yang bertujuan untuk menjadi ruang aman bagi pengguna dalam memahami diri, menjaga kesehatan mental, dan membangun kebiasaan hidup yang lebih baik. Aplikasi ini memonitor berbagai aspek gaya hidup seperti pola tidur, pola makan, dan aktivitas fisik, lalu menggunakan kemampuan **Machine Learning (AI)** untuk memprediksi tingkat stres pengguna (Stress Level Prediction).

## 🚀 Fitur Utama

- **Autentikasi Aman:** Sistem pendaftaran dan login menggunakan JWT dan Supabase.
- **Assessment Gaya Hidup & Mental:** Formulir interaktif untuk menilai kualitas tidur, tingkat kecemasan, porsi makan, dll.
- **Prediksi Tingkat Stres (ML):** Menggunakan model AI terlatih untuk memprediksi tingkat stres pengguna berdasarkan jawaban assessment (terintegrasi lewat *Machine Learning API*).
- **Riwayat & Pantauan Berkala:** Fitur riwayat (History) untuk memantau perubahan kondisi mental pengguna dari waktu ke waktu secara visual.
- **Desain UI/UX Responsif & Menenangkan:** Tampilan *mobile-first* yang dirancang indah dengan warna-warna pastel (Pink/Purple) yang menenangkan pikiran.

## 🛠️ Tech Stack (Teknologi yang Digunakan)

Proyek ini menggunakan arsitektur **Microservices** sederhana, yang dibagi menjadi tiga bagian utama:

### 1. Frontend (Antarmuka Pengguna)
- **Framework:** React.js (menggunakan Vite untuk *build tool* yang lebih cepat)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Ikon:** Lucide React

### 2. Backend (RESTful API & Database)
- **Framework:** Express.js (Node.js)
- **Database:** Supabase (PostgreSQL)
- **Keamanan:** Bcrypt.js (Hashing Password) & JSON Web Tokens (JWT)
- **Fitur API:** Konvensi standar RESTful, lengkap dengan *Global Error Handler*.

### 3. Machine Learning Service
- **Bahasa:** Python
- **Model Training:** Scikit-Learn (dengan *Label Encoder* dan *Standard Scaler* `.joblib`)
- **API Framework:** Flask / FastAPI (sebagai endpoint independen)

## 📁 Struktur Direktori

```text
DBS-CAPSTONE/
├── frontend/             # Aplikasi React (Vite)
├── backend-express/      # Server API utama (Express.js)
├── ml-service/           # Layanan prediksi Machine Learning (Python API)
├── Model Prediction/     # Berkas eksperimen & dataset ML (dari tim Data)
└── final_stress_dataset.csv # Dataset asli untuk pelatihan model
```

## 💻 Cara Menjalankan Proyek Secara Lokal

Untuk menjalankan aplikasi ini di komputer lokal Anda, pastikan Anda telah menginstal **Node.js**, **Python**, dan memiliki akun **Supabase**.

### Langkah 1: Persiapan Database (Supabase)
1. Buat proyek baru di Supabase.
2. Buat tabel `users` dan `assessments`.
3. Salin `URL` dan `Anon Key` dari Supabase.

### Langkah 2: Menjalankan Backend Express
1. Buka terminal baru dan masuk ke folder backend:
   ```bash
   cd backend-express
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Buat file `.env` dan tambahkan variabel lingkungan:
   ```env
   SUPABASE_URL=url_supabase_anda
   SUPABASE_ANON_KEY=key_supabase_anda
   JWT_SECRET=rahasia_jwt_anda
   ML_SERVICE_URL=http://localhost:8000/api/predict
   ```
4. Jalankan server:
   ```bash
   node server.js
   ```
   *Backend akan berjalan di port 5000.*

### Langkah 3: Menjalankan Machine Learning Service
1. Buka terminal baru dan masuk ke folder ML:
   ```bash
   cd ml-service
   ```
2. Buat *virtual environment* dan aktifkan:
   ```bash
   python -m venv venv
   source venv/bin/activate  # (Untuk Linux/Mac)
   venv\Scripts\activate     # (Untuk Windows)
   ```
3. Instal pustaka yang dibutuhkan:
   ```bash
   pip install -r requirements.txt
   ```
4. Jalankan API ML:
   ```bash
   python app.py
   ```
   *Service ML akan berjalan biasanya di port 8000.*

### Langkah 4: Menjalankan Frontend
1. Buka terminal baru dan masuk ke folder frontend:
   ```bash
   cd frontend
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan Vite:
   ```bash
   npm run dev
   ```
   *Frontend akan berjalan di port 5173.* Buka `http://localhost:5173` di browser Anda.

---
*Dibangun dengan ❤️ oleh Tim Capstone DBS Foundation.*