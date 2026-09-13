require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, JS, images) from the current folder
app.use(express.static(path.join(__dirname)));

// 🔧 FIX: Explicitly serve index.html at the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Weather proxy API route
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

  console.log('🌐 Fetching:', url);

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log('📩 OpenWeatherMap response:', data.cod, data.message || 'OK');

    res.status(response.status).json(data);
  } catch (err) {
    console.error('❌ Fetch error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🌤️  Server running at http://localhost:${PORT}`);
});
