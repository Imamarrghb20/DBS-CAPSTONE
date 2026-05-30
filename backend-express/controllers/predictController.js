import axios from 'axios';
import { supabase } from '../config/supabase.js';
import dotenv from 'dotenv';

dotenv.config();

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000/api/predict';

export const createPrediction = async (req, res) => {
    try {
        const payload = req.body;
        
        // 1. Forward request to ML Service
        let mlResponse;
        try {
            mlResponse = await axios.post(ML_SERVICE_URL, payload);
        } catch (mlError) {
            console.error("Error from ML Service:", mlError.message);
            return res.status(502).json({
                status: "error",
                message: "Gagal terhubung ke ML Service atau ML Service mengembalikan error.",
                details: mlError.response?.data || mlError.message
            });
        }
        
        const predictionData = mlResponse.data;

        // 2. Prepare data for Supabase mapping
        // Menggabungkan input payload dengan output ML Service
        const insertData = {
            user_id: payload.user_id || null, // Assuming user_id can be sent from frontend if logged in
            gender: payload.gender,
            q1_focus_difficulty: payload.q1_focus_difficulty,
            q2_overthinking: payload.q2_overthinking,
            q3_overwhelmed: payload.q3_overwhelmed,
            q4_anxious: payload.q4_anxious,
            q5_restless: payload.q5_restless,
            q6_depressed: payload.q6_depressed,
            q7_sleep_problem: payload.q7_sleep_problem,
            q8_fatigue: payload.q8_fatigue,
            q9_headache_tension: payload.q9_headache_tension,
            q10_responsibility_difficulty: payload.q10_responsibility_difficulty,
            q11_irritable: payload.q11_irritable,
            q12_social_withdrawal: payload.q12_social_withdrawal,
            q13_control_stress: payload.q13_control_stress,
            q14_calm_self: payload.q14_calm_self,
            q15_handle_problem: payload.q15_handle_problem,
            pss_total_score: payload.pss_total_score,
            quality_of_sleep: payload.quality_of_sleep,
            physical_activity_level: payload.physical_activity_level,
            heart_rate: payload.heart_rate,
            daily_steps: payload.daily_steps,
            screen_time_hours: payload.screen_time_hours,
            study_hours: payload.study_hours,
            daily_pressure: payload.daily_pressure,
            bmi_category: payload.bmi_category,
            stress_level_code: predictionData.data.stress_level_code,
            stress_level_prediction: predictionData.data.stress_level_prediction,
            confidence: predictionData.data.confidence
        };

        // 3. Insert ke Supabase PostgreSQL
        const { data: dbData, error: dbError } = await supabase
            .from('assessments')
            .insert([insertData])
            .select();
        
        if (dbError) {
            console.error("Error inserting to Supabase:", dbError.message);
            // Tetap kembalikan hasil prediksi ke user meskipun database gagal menyimpan (Resilience)
            return res.status(200).json({
                status: "success",
                warning: "Gagal merekam ke database riwayat.",
                pss_score: payload.pss_total_score,
                ml_result: predictionData
            });
        }

        // 4. Return Final Response to Frontend
        return res.status(200).json({
            status: "success",
            message: "Prediksi berhasil dilakukan dan disimpan.",
            record_id: dbData ? dbData[0].id : null,
            pss_score: payload.pss_total_score,
            ml_result: predictionData
        });

    } catch (error) {
        console.error("Internal Express Server Error:", error.message);
        return res.status(500).json({
            status: "error",
            message: "Terjadi kesalahan internal pada server utama."
        });
    }
};

export const getHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId || userId === 'null' || userId === 'undefined') {
            return res.status(400).json({ status: 'error', message: 'User ID tidak valid' });
        }

        const { data, error } = await supabase
            .from('assessments')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Supabase fetch history error:", error.message);
            throw error;
        }

        return res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (error) {
        console.error("Error fetching history:", error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Gagal mengambil riwayat.'
        });
    }
};
