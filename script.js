const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');
const errorMsg = document.getElementById('errorMsg');

async function getWeather(city) {
  if (!city.trim()) return;

  try {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    const data = await response.json();

    if (!response.ok || (data.cod && data.cod !== 200)) {
      throw new Error(data.message || 'City not found');
    }

    displayWeather(data);
  } catch (err) {
    showError(err.message);
  }
}

function displayWeather(data) {
  errorMsg.classList.add('hidden');
  weatherResult.classList.remove('hidden');

  document.getElementById('cityName').textContent =
    `${data.name}, ${data.sys.country}`;
  document.getElementById('temperature').textContent =
    `${Math.round(data.main.temp)}°C`;
  document.getElementById('description').textContent =
    data.weather[0].description;
  document.getElementById('humidity').textContent =
    `${data.main.humidity}%`;
  document.getElementById('wind').textContent =
    `${data.wind.speed} m/s`;
  document.getElementById('feelsLike').textContent =
    `${Math.round(data.main.feels_like)}°C`;

  const iconCode = data.weather[0].icon;
  document.getElementById('weatherIcon').src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove('hidden');
  weatherResult.classList.add('hidden');
}

searchBtn.addEventListener('click', () => getWeather(cityInput.value));
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') getWeather(cityInput.value);
});