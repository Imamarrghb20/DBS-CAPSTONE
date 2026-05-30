import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_alive_key_123';

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ status: 'error', message: 'Harap lengkapi semua field' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Simpan ke Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password_hash }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique violation
        return res.status(400).json({ status: 'error', message: 'Email sudah terdaftar' });
      }
      throw error;
    }

    // Generate Token
    const token = jwt.sign({ id: data.id, email: data.email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      status: 'success',
      message: 'Registrasi berhasil',
      data: {
        user: { id: data.id, name: data.name, email: data.email },
        token
      }
    });

  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Email dan password harus diisi' });
    }

    // Cari user di Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(400).json({ status: 'error', message: 'Email atau kata sandi salah' });
    }

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ status: 'error', message: 'Email atau kata sandi salah' });
    }

    // Generate Token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      status: 'success',
      message: 'Login berhasil',
      data: {
        user: { id: user.id, name: user.name, email: user.email },
        token
      }
    });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server' });
  }
});

export default router;
