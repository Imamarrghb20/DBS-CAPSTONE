import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import predictRoutes from './routes/predictRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Endpoint Dasar (Health Check)
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'healthy', message: 'Main Express API is running smoothly.' });
});

// Routes
app.use('/api', predictRoutes);
app.use('/api/auth', authRoutes);

// Penanganan Route Not Found (404)
app.use((_req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Endpoint tidak ditemukan.'
    });
});

// Global Error Handler
app.use((err, _req, res, _next) => {
    console.error('Unhandled Error:', err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Terjadi kesalahan sistem yang tidak terduga.'
    });
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`[Backend Express] Server berjalan di http://localhost:${PORT}`);
    });
}

export default app;
