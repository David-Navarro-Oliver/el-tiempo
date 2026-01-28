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