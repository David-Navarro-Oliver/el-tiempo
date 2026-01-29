export async function fetchWeatherData(lat, lon) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error cargando datos:", err);
    }
}
export async function getWeatherConfig(code) {

    let globalWeatherConfig = [];
    globalWeatherConfig = await loadConfig();

    let info = globalWeatherConfig.find(item => item.weatherCode === code);

    if (!info) {
        info = globalWeatherConfig.find(item => item.weatherCode === -1);
    }
    return info;
}
async function loadConfig() {
  const url = new URL("../data/weather-config.json", import.meta.url);
  const response = await fetch(url);
  if (!response.ok) throw new Error("No se pudo cargar weather-config.json");
  return await response.json();
}
