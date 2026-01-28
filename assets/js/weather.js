export async function fetchWeatherData(lat, lon) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,weathercode&timezone=auto`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error cargando datos:", err);
    }
}
async function loadConfig() {
    const response = await fetch('../assets/data/weather-config.json');
    return await response.json();
}