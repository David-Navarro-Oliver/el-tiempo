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