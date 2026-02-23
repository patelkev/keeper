// Load environment variables FIRST - this must be the first import
import './config/env.js';

import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import './config/passport.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

// Connect to database
connectDB();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;
