import express from 'express';
import cors from 'cors';
import nowRouter from './routes/now.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/now', nowRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(Backend listening on ${PORT}));
