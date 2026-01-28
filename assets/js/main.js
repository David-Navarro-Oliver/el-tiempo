import { updateDisplay, executeFlash } from "./ui.js";
import { fetchWeatherData, getWeatherConfig } from "./weather.js";
import {
  getCoordinatesFromCity,
  getCityFromCoordinates,
  geolocate,
} from "./location.js";
const cityInput = document.getElementById("city-input");
const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const geoBtn = document.getElementById("geo-btn");
const charContainer = document.getElementById("char-container");
let globalWeatherConfig = null;
document.addEventListener("DOMContentLoaded", async () => {
  const { lat, lon } = await geolocate();

  const city = await getCityFromCoordinates(lat, lon);
  const weatherData = await fetchWeatherData(lat, lon);
  globalWeatherConfig = await getWeatherConfig(
    weatherData.current_weather.weathercode,
  );
  updateDisplay(weatherData, city, globalWeatherConfig);
});
searchBtn.addEventListener("click", () => {
  searchBox.classList.toggle("active");
  searchBtn.classList.toggle("active");
  if (searchBox.classList.contains("active")) {
    cityInput.focus();
  }
});
geoBtn.addEventListener("click", async () => {
  if (searchBox.classList.contains("active")) {
    searchBox.classList.remove("active");
    searchBtn.classList.remove("active");
  }

  const { lat, lon } = await geolocate();

  const city = await getCityFromCoordinates(lat, lon);
  const data = await fetchWeatherData(lat, lon);
  updateDisplay(data, city, globalWeatherConfig);
});