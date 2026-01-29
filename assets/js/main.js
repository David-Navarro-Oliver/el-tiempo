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

function setLoading(isLoading) {
  const cityName = document.getElementById("city-name");
  if (!cityName) return;

  if (isLoading) {
    cityName.textContent = "Cargando...";
    cityName.classList.add("loading");
  } else {
    cityName.classList.remove("loading");
  }

  cityInput.disabled = isLoading;
  searchBtn.disabled = isLoading;
  geoBtn.disabled = isLoading;

  searchBtn.style.opacity = isLoading ? "0.6" : "1";
  geoBtn.style.opacity = isLoading ? "0.6" : "1";
}

document.addEventListener("DOMContentLoaded", async () => {
  setLoading(true);
  try {
    const { lat, lon } = await geolocate();
    const city = await getCityFromCoordinates(lat, lon);
    const weatherData = await fetchWeatherData(lat, lon);

    globalWeatherConfig = await getWeatherConfig(
      weatherData.current_weather.weathercode,
    );

    updateDisplay(weatherData, city, globalWeatherConfig);
  } catch (e) {
    console.error(e);
  } finally {
    setLoading(false);
  }
});

searchBtn.addEventListener("click", () => {
  if (searchBtn.disabled) return;

  searchBox.classList.toggle("active");
  searchBtn.classList.toggle("active");

  if (searchBox.classList.contains("active")) {
    cityInput.focus();
  }
});

geoBtn.addEventListener("click", async () => {
  if (searchBtn.disabled) return;

  if (searchBox.classList.contains("active")) {
    searchBox.classList.remove("active");
    searchBtn.classList.remove("active");
  }

  setLoading(true);
  try {
    const { lat, lon } = await geolocate();
    const city = await getCityFromCoordinates(lat, lon);
    const data = await fetchWeatherData(lat, lon);

    globalWeatherConfig = await getWeatherConfig(
      data.current_weather.weathercode,
    );

    updateDisplay(data, city, globalWeatherConfig);
  } catch (e) {
    console.error(e);
  } finally {
    setLoading(false);
  }
});

cityInput.addEventListener("keydown", async (e) => {
  if (e.key !== "Enter") return;

  const city = cityInput.value.trim();
  if (!city) return;

  setLoading(true);
  try {
    const { lat, lon, display_name } = await getCoordinatesFromCity(city);
    const data = await fetchWeatherData(lat, lon);

    globalWeatherConfig = await getWeatherConfig(
      data.current_weather.weathercode,
    );

    updateDisplay(data, display_name || city, globalWeatherConfig);

    searchBox.classList.remove("active");
    searchBtn.classList.remove("active");
    cityInput.classList.remove("error");
    cityInput.value = "";
  } catch (e2) {
    console.error(e2);
    cityInput.classList.add("error");
  } finally {
    setLoading(false);
  }
});

charContainer.addEventListener("click", () => {
  executeFlash();
});
