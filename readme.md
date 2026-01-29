# 🌤️ El Tiempo — Mobile Weather App

Aplicación web **mobile-first** que muestra el tiempo actual, las próximas horas y los próximos días según la ubicación del usuario o una ciudad buscada manualmente.

El proyecto consume datos meteorológicos reales y los combina con una **experiencia visual inspirada en el anime Kimetsu no Yaiba (Demon Slayer)**, utilizando personajes y efectos que representan distintos estados del clima.

---

## 🚀 Demo online (GitHub Pages)

👉 **[Ver demo en GitHub Pages](https://david-navarro-oliver.github.io/el-tiempo/)**

La aplicación está desplegada mediante **GitHub Pages** directamente desde el repositorio, permitiendo probarla sin instalación previa.

---

## 📸 Captura del resultado final

> Vista en dispositivo móvil (diseño mobile-first)

![Captura de la aplicación](assets/img/screenshot.png)

---

## 🧩 Funcionalidades principales

- 📍 **Geolocalización automática** al cargar la página
- 🔍 **Búsqueda manual de ciudades**
- 🌡️ Tiempo actual (temperatura, humedad y viento)
- ⏰ Pronóstico por **próximas horas**
- 📅 Pronóstico por **próximos días**
- 🎨 Animaciones y efectos visuales según el clima
- ⏳ **Estado de carga (loading)** durante las peticiones
- 📱 Diseño **responsive y optimizado para móvil**
- 💡 Código organizado siguiendo principios de **clean code**

---

## 🎨 Inspiración visual: Kimetsu no Yaiba

Las imágenes utilizadas pertenecen al anime **Kimetsu no Yaiba (Demon Slayer)**.

Los personajes se han seleccionado de forma **simbólica**, relacionando su personalidad y técnica de combate con el tipo de clima mostrado:

- 🔥 **Kyojuro Rengoku** (Respiración del Fuego)  
  → Clima soleado o despejado. Representa energía, luz y calor.

- 🌊 **Giyu Tomioka** (Respiración del Agua)  
  → Lluvia y climas húmedos.

- ⚡ **Zenitsu Agatsuma** (Respiración del Rayo)  
  → Tormentas eléctricas y relámpagos.

- ❄️ **Nezuko Kamado**  
  → Nieve y climas fríos.

- 🌥️ **Tanjiro Kamado**  
  → Estados intermedios (nublado, clima variable).

Esta decisión es **puramente estética y de UX**, pensada para hacer la aplicación más visual y atractiva, sin afectar al funcionamiento técnico.

---

## 🧠 Arquitectura y enfoque técnico

El proyecto está desarrollado en **JavaScript modular**, separando responsabilidades:

- `weather.js` → llamadas a la API y configuración del clima
- `location.js` → geolocalización y conversión ciudad ↔ coordenadas
- `ui.js` → renderizado de la interfaz y animaciones
- `main.js` → orquestación general de la aplicación

Este enfoque facilita la **legibilidad**, el **mantenimiento** y la **escalabilidad** del código.

---

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3 (sin frameworks, enfoque custom)
- JavaScript (ES Modules)
- Git & GitHub (ramas y conventional commits)
- GitHub Pages (despliegue)

---

## 🌍 APIs utilizadas

- **Open-Meteo Weather API**  
  https://open-meteo.com  
  (datos meteorológicos)

- **Open-Meteo Geocoding API**  
  (ciudad → coordenadas)

- **BigDataCloud Reverse Geocoding API**  
  (coordenadas → nombre de ciudad)

---

## ▶️ Cómo ejecutar el proyecto en local

### Opción recomendada (VS Code)

1. Instala la extensión **Live Server**
2. Abre el proyecto en VS Code
3. Click derecho sobre `index.html` → **Open with Live Server**

### Alternativa con Node.js

    npx serve .

---

## 🗂️ Estructura del proyecto

    .
    ├── index.html
    └── assets
        ├── css
        ├── js
        ├── img
        └── data

---

## 🤖 Uso de IA (obligatorio)

He utilizado **IA generativa (ChatGPT)** como herramienta de apoyo para:

- Propuesta y revisión de la arquitectura JavaScript
- Separación de responsabilidades (fetch, lógica y UI)
- Mejora del naming y aplicación de clean code
- Detección y corrección de errores lógicos
- Optimización del flujo de datos al cambiar de ciudad
- Ajustes de UX/UI en versión móvil (loading state, refinamientos)
- Revisión del cumplimiento de la rúbrica del proyecto

La IA se ha utilizado **como herramienta de apoyo**, no como sustituto del desarrollo ni de la toma de decisiones técnicas.

---

## ✅ Estado del proyecto

✔ Funcional  
✔ Responsive  
✔ Desplegado en GitHub Pages  
✔ Cumple la rúbrica del ejercicio

---

## 👤 Autor

Proyecto desarrollado de forma individual como práctica de consumo de APIs y diseño de aplicaciones web orientadas a móvil.

