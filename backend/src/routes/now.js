import express from 'express';
import { getAccurateTime } from '../lib/ntpClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const t = await getAccurateTime();
    res.json({ timestamp: t.iso, epoch: t.epochMs, accuracy_ms: t.accuracyMs, source: t.source });
  } catch (err) {
    res.status(500).json({ error: 'time_unavailable' });
  }
});

export default router;
