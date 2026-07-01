require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('../backend/config/db');

const volunteerRoutes = require('../backend/routes/volunteerRoutes');
const chatRoutes = require('../backend/routes/chatRoutes');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json());

app.use('/api/volunteers', volunteerRoutes);
app.use('/api/chat', chatRoutes);

app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      ok: true,
      message: 'API is healthy',
      time: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Database connection failed' });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'NayePankh API is running' });
});

module.exports = app;
