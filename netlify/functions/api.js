// netlify/functions/api.js
const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

// Weather API route
router.get('/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'ok', keyLoaded: !!process.env.WEATHER_API_KEY });
});

app.use('/api', router);

module.exports.handler = serverless(app);
