export async function fetchWeatherData(lat, lon) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`,
  );

  if (!response.ok) throw new Error("Open-Meteo no respondió OK");
  return await response.json();
}

export async function getWeatherConfig(code) {
  const config = await loadConfig();

  let info = config.find((item) => item.weatherCode === code);
  if (!info) info = config.find((item) => item.weatherCode === -1);
  return info;
}

async function loadConfig() {
  const url = new URL("assets/data/weather-config.json", window.location.href);
  const response = await fetch(url.toString(), { cache: "no-store" });

  if (!response.ok) throw new Error("No se pudo cargar weather-config.json");
  return await response.json();
}
