import express from 'express';
import { createPrediction, getHistory } from '../controllers/predictController.js';

const router = express.Router();

router.post('/predict', createPrediction);
router.get('/predict/history/:userId', getHistory);

export default router;
