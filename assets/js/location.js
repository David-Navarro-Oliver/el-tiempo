export async function getCityFromCoordinates(lat, lon) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2500);

  try {
    const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=es`;
    const geoRes = await fetch(geoUrl, { signal: controller.signal });

    if (!geoRes.ok) return "Tu ubicación";

    const geoData = await geoRes.json();
    return geoData.city || geoData.locality || "Tu ubicación";
  } catch {
    return "Tu ubicación";
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getCoordinatesFromCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city,
  )}&count=1&language=es&format=json&t=${Date.now()}`;

  const response = await fetch(url);
  const result = await response.json();

  if (!result?.results?.length) {
    throw new Error("Ciudad no encontrada");
  }

  const first = result.results[0];

  if (
    typeof first.latitude !== "number" ||
    typeof first.longitude !== "number"
  ) {
    throw new Error("Coordenadas inválidas");
  }

  return {
    lat: first.latitude,
    lon: first.longitude,
    display_name: first.name,
  };
}

export function geolocate() {
  return new Promise((resolve) => {
    const latMadrid = 40.416782;
    const lonMadrid = -3.703507;

    if (!navigator.geolocation) {
      resolve({ lat: latMadrid, lon: lonMadrid });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        resolve({ lat: latMadrid, lon: lonMadrid });
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 60000,
      },
    );
  });
}
