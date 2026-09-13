require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname)));

// Debug: print the key once at startup
const key = process.env.WEATHER_API_KEY;
console.log('🔑 API key loaded:', key ? `✅ (${key.length} chars)` : '❌ MISSING');
console.log('🔑 First 8 chars:', key ? key.slice(0, 8) : 'N/A');

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: 'City is required' });

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

  console.log('🌐 Fetching:', url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('📩 Response cod:', data.cod, '| message:', data.message || 'OK');
    res.status(response.status).json(data);
  } catch (err) {
    console.error('❌ Fetch error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🌤️  Server running at http://localhost:${PORT}`);
});