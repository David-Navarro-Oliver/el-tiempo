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

  const { lat, lon } = await geolocate();
  const city = await getCityFromCoordinates(lat, lon);
  const weatherData = await fetchWeatherData(lat, lon);

  globalWeatherConfig = await getWeatherConfig(
    weatherData.current_weather.weathercode,
  );

  updateDisplay(weatherData, city, globalWeatherConfig);
  setLoading(false);
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

  setLoading(true);

  const { lat, lon } = await geolocate();
  const city = await getCityFromCoordinates(lat, lon);
  const data = await fetchWeatherData(lat, lon);

  globalWeatherConfig = await getWeatherConfig(
    data.current_weather.weathercode,
  );
  updateDisplay(data, city, globalWeatherConfig);

  setLoading(false);
});

cityInput.addEventListener("keydown", async (e) => {
  if (e.key !== "Enter") return;
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    const formattedCity =
      city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    console.log("city " + city);
    try {
      const { lat, lon } = await getCoordinatesFromCity(city);
      setLoading(true);

      const data = await fetchWeatherData(lat, lon);
      globalWeatherConfig = await getWeatherConfig(
        data.current_weather.weathercode,
      );
      updateDisplay(data, formattedCity, globalWeatherConfig);

      setLoading(false);
      searchBox.classList.remove("active");
      searchBtn.classList.remove("active");
      cityInput.classList.remove("error");
    } catch (error) {
      console.log("city no encontrado");
      setLoading(false);
      cityInput.classList.add("error");
    }
    cityInput.value = "";
  }
});
charContainer.addEventListener("click", () => {
  executeFlash();
});
