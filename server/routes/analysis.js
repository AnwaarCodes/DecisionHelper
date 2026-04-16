import express from 'express';
import { analyzeDecision } from '../controllers/analysisController.js';
import { validateAnalysisInput } from '../middleware/validateInput.js';

const router = express.Router();

router.post('/analyze', validateAnalysisInput, analyzeDecision);

export default router;
