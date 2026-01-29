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

const DEFAULT_CITY = "Pallejà";
const DEFAULT_LAT = 41.423;
const DEFAULT_LON = 1.995;

function setLoading(isLoading) {
  const cityName = document.getElementById("city-name");
  if (!cityName) return;

  if (isLoading) cityName.classList.add("loading");
  else cityName.classList.remove("loading");

  cityInput.disabled = isLoading;
  searchBtn.disabled = isLoading;
  geoBtn.disabled = isLoading;

  searchBtn.style.opacity = isLoading ? "0.6" : "1";
  geoBtn.style.opacity = isLoading ? "0.6" : "1";
}

function setCityName(name) {
  const cityName = document.getElementById("city-name");
  if (!cityName) return;
  cityName.textContent = name || DEFAULT_CITY;
}

async function loadByCoords(lat, lon, cityLabel) {
  const weatherData = await fetchWeatherData(lat, lon);
  globalWeatherConfig = await getWeatherConfig(
    weatherData.current_weather.weathercode,
  );
  updateDisplay(weatherData, cityLabel, globalWeatherConfig);
  return weatherData;
}

async function loadDefaultCity() {
  setCityName(DEFAULT_CITY);
  await loadByCoords(DEFAULT_LAT, DEFAULT_LON, DEFAULT_CITY);
}

document.addEventListener("DOMContentLoaded", async () => {
  setLoading(true);

  try {
    const { lat, lon } = await geolocate();

    setCityName(DEFAULT_CITY);

    const weatherPromise = loadByCoords(lat, lon, DEFAULT_CITY);

    getCityFromCoordinates(lat, lon)
      .then((city) => setCityName(city))
      .catch(() => setCityName(DEFAULT_CITY));

    await weatherPromise;
  } catch (e) {
    console.error(e);
    await loadDefaultCity();
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
  if (geoBtn.disabled) return;

  if (searchBox.classList.contains("active")) {
    searchBox.classList.remove("active");
    searchBtn.classList.remove("active");
  }

  setLoading(true);

  try {
    const { lat, lon } = await geolocate();

    setCityName(DEFAULT_CITY);

    const weatherPromise = loadByCoords(lat, lon, DEFAULT_CITY);

    getCityFromCoordinates(lat, lon)
      .then((city) => setCityName(city))
      .catch(() => setCityName(DEFAULT_CITY));

    await weatherPromise;
  } catch (e) {
    console.error(e);
    await loadDefaultCity();
  } finally {
    setLoading(false);
  }
});

cityInput.addEventListener("keydown", async (e) => {
  if (e.key !== "Enter") return;

  const raw = cityInput.value.trim();
  if (!raw) return;

  setLoading(true);

  try {
    const { lat, lon, display_name } = await getCoordinatesFromCity(raw);

    const cityLabel = display_name || raw;
    setCityName(cityLabel);

    await loadByCoords(lat, lon, cityLabel);

    searchBox.classList.remove("active");
    searchBtn.classList.remove("active");
    cityInput.classList.remove("error");
    cityInput.value = "";
  } catch (err) {
    console.error(err);
    cityInput.classList.add("error");
  } finally {
    setLoading(false);
  }
});

charContainer.addEventListener("click", () => {
  executeFlash();
});
