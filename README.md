# 🌤️ Weather App

A simple, clean weather application built with **vanilla JavaScript**, **Node.js**, and **Express**. It fetches real-time weather data from the [OpenWeatherMap API](https://openweathermap.org/api) using a secure backend proxy — so your API key is never exposed in the browser.

![Weather App Screenshot](screenshot.png)

---

## ✨ Features

- 🔍 Search weather by city name
- 🌡️ Displays temperature, "feels like", humidity, and wind speed
- 🖼️ Dynamic weather icons from OpenWeatherMap
- 🔒 API key safely stored in `.env` and hidden behind a backend proxy
- ⚡ Lightweight — no frameworks, no build tools
- 🎨 Clean, responsive UI

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Node.js, Express |
| API | OpenWeatherMap (Current Weather) |
| Config | dotenv |

---

## 📁 Project Structure

```
weather-app/
├── index.html        # UI structure
├── style.css         # Styling
├── script.js         # Frontend logic (fetches from /api/weather)
├── server.js         # Express server + API proxy
├── .env              # API key (NOT committed to Git)
├── .gitignore        # Ignores .env and node_modules
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get an API key

1. Sign up at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up)
2. Go to [API Keys](https://home.openweathermap.org/api_keys)
3. Copy your key (⚠️ new keys take **10 min – 2 hours** to activate)

### 4. Create `.env`

In the project root, create a file named `.env`:

```env
WEATHER_API_KEY=your_api_key_here
```

> ⚠️ **No quotes. No spaces. No trailing semicolons.**

### 5. Start the server

```bash
node server.js
```

You should see:

```
🔑 API key loaded: ✅ (32 chars)
🌤️  Server running at http://localhost:3000
```

### 6. Open the app

Go to 👉 **[http://localhost:3000](http://localhost:3000)**

Type a city name (e.g., `Chennai`) and click **Search**.

---

## 🔒 How the API Key Stays Safe

Unlike a purely frontend app, this project **never exposes your API key** to the browser:

```
Browser  →  /api/weather?city=Chennai  →  Your Node Server  →  OpenWeatherMap API
   ↑                                            ↑
   No key here                     Uses process.env.WEATHER_API_KEY
```

The key lives only in `.env` on your server. The browser just talks to your own `/api/weather` endpoint.

---

## ⚠️ Important: `.gitignore`

Make sure `.env` is **never** committed. Your `.gitignore` should include:

```
node_modules/
.env
.DS_Store
```

If you accidentally commit `.env`, **regenerate your API key immediately** on the OpenWeatherMap dashboard.

---

## 🧪 Testing the API Directly

Once the server is running, you can test the proxy endpoint in your browser:

```
http://localhost:3000/api/weather?city=Chennai
```

Expected response:

```json
{
  "coord": { "lon": 80.2785, "lat": 13.0878 },
  "weather": [{ "main": "Clouds", "description": "overcast clouds", "icon": "04d" }],
  "main": { "temp": 30.5, "feels_like": 37.5, "humidity": 80 },
  "wind": { "speed": 5.14, "deg": 140 },
  "name": "Chennai",
  "cod": 200
}
```

---

## 🐛 Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `Invalid API key` (401) | Key not activated yet | Wait 10 min – 2 hrs after signup, or regenerate it |
| `Invalid API key` (401) | Typo / quotes / spaces in `.env` | Retype the key manually, no quotes, no spaces |
| `Invalid API key` (401) | Server not restarted after editing `.env` | Stop server (`Ctrl + C`) and run `node server.js` again |
| `City not found` (404) | Misspelled city | Try `Chennai,IN` or check spelling |
| `Failed to fetch weather` | Network / DNS issue on server | Check terminal logs, disable VPN, verify internet |
| `Cannot GET /api/weather` | Missing proxy route | Copy `server.js` from this repo exactly |
| `API key is missing` | Old code using `window.ENV` | Use the proxy setup — no `env.js` needed |

---

## 📜 Available Scripts

```bash
node server.js     # Start the server
npm start          # Same as above (if configured)
```

---

## 🌐 Deploying

This app is ready to deploy to any Node.js host:

- [Render](https://render.com/)
- [Railway](https://railway.app/)
- [Vercel](https://vercel.com/) (with serverless functions)
- [Fly.io](https://fly.io/)

Set the environment variable `WEATHER_API_KEY` in your host's dashboard (do **not** upload `.env`).

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and share.

---

## 🙌 Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for the free weather API
- [Express](https://expressjs.com/) for the lightweight server
- [dotenv](https://www.npmjs.com/package/dotenv) for env handling

---

## ⭐ Show Your Support

If this helped you, give the repo a ⭐ on GitHub!