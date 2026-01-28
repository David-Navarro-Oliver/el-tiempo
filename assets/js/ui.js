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
async function weatherAnimation(type, intensity) {
    console.log(type, intensity)

    const rainEffect = document.querySelector('.rain-container');
    const snowEffect = document.querySelector('.snow-container');
    const sunEffect = document.querySelector('.sun-container');
    const thunderEffect = document.querySelector('.thunder-container');
    const cloudyEffect = document.querySelector('.cloud-container');
    const cloud1 = document.querySelector('.c1');
    const cloud2 = document.querySelector('.c2');
    const cloud3 = document.querySelector('.c3');
    const cloud4 = document.querySelector('.c4');
    const cloud5 = document.querySelector('.c5');
    if (rainEffect) rainEffect.classList.remove('active');
    if (snowEffect) snowEffect.classList.remove('active');
    if (sunEffect) sunEffect.classList.remove('active');
    if (thunderEffect) thunderEffect.classList.remove('active');
    if (cloudyEffect) {
        cloudyEffect.classList.remove('active');
    }
switch (type) {
        case 'rainy':
            rainEffect.classList.add('active', type + '-' + intensity);
            break;
        case 'snowy':
            snowEffect.classList.add('active', type + '-' + intensity);
            break;
        case 'stormy':
            rainEffect.classList.add('active', type + '-' + intensity);
            thunderEffect.classList.add('active');
            break;
        case 'sunny':
            sunEffect.classList.add('active');
            weatherCard.classList.add('sunny');
            break;
        case 'cloudy':
            cloudyEffect.classList.add('active');
            if(intensity === 'low') {
                cloud4.classList.add('oculto');
                cloud5.classList.add('oculto');
            } else {

            cloud4.classList.remove('oculto');
            cloud5.classList.remove('oculto');
            }
    }
}
