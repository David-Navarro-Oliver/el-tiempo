export async function getCityFromCoordinates(lat, lon) {
  try {
    const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=es`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    console.log("Datos de ciudad recibidos:", geoData);
    const cityName = geoData.city || geoData.locality || "Tu ubicación";
    return cityName;
  } catch (error) {
    console.error("Error obteniendo la ciudad:", error);
    return "Ubicación desconocida";
  }
}
export async function getCoordinatesFromCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=es&format=json&t=${new Date().getTime()}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    if (result.results[0].latitude && result.results[0].longitude) {
      const lat = result.results[0].latitude;
      const lon = result.results[0].longitude;
      const display_name = result.results[0].name;
      return { lat, lon, display_name };
    }
  } catch (error) {
    console.error("Error obteniendo las coordenadas de la ciudad" + city, error);
  }
}
export function geolocate() {
  return new Promise((resolve, reject) => {
    const latMadrid = 40.416782;
    const lonMadrid = -3.703507;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log(`Ubicación detectada: ${lat}, ${lon}`);

          resolve({ lat, lon });
        },
        (error) => {
          console.warn("Error/Denegado. Usando Pallejá por defecto.");

          resolve({ lat: latMadrid, lon: lonMadrid });
        },
      );
    } else {
      console.error("No soportado.");
      resolve({ lat: latMadrid, lon: lonMadrid });
    }
  });
}
