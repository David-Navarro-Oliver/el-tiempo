import { getWeatherConfig } from './weather.js';
const flash = document.getElementById('flash');
const charImg = document.getElementById('icon');

const flashColors = {
    'rengoku': '#FF4500',
    'zenitsu': '#FFFF00',
    'tomioka': '#00BFFF',
    'tanjiro': '#00FF7F',
    'kocho': '#9370DB',
    'nezuko': '#FF1493'
};
export function executeFlash(){
    let color = 'white';
    const src = charImg.src.toLowerCase();
    Object.keys(flashColors).forEach(name => {
        if (src.includes(name)) {
            color = flashColors[name];
        }
    });
    flash.style.setProperty('--flash-color', color);
    flash.classList.remove('flash-active');
    void flash.offsetWidth;
    flash.classList.add('flash-active');
}