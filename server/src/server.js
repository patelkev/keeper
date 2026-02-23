// Load environment variables FIRST - this must be the first import
import './config/env.js';

// Now import other modules (they can safely use process.env)
import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import './config/passport.js'; // Initialize passport strategies
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use.`);
    console.error(`Please either:`);
    console.error(`  1. Stop the process using port ${PORT}`);
    console.error(`  2. Change the PORT in your .env file`);
    console.error(`\nTo find and kill the process: lsof -ti:${PORT} | xargs kill -9\n`);
    process.exit(1);
  } else {
    throw err;
  }
});
