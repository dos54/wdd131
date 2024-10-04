const windSpeedElement = document.querySelector('#wind-speed');
const temperatureElement = document.querySelector('#temperature');
const windChillElement = document.querySelector('#wind-chill')

let windSpeed = windSpeedElement.innerText;
let temperature = temperatureElement.innerText;

const calculateWindChill = (temperature, windSpeed) => {
    if (temperature <= 10 && windSpeed > 4.8) {
        return -Math.round(100*(13.12 + (.6215 * temperature) - ((11.37 * ( windSpeed * .16)) + (.3965 * temperature * ( windSpeed * .16))))) / 100;
    } else {
        return "N/A";
    }
};

windChillElement.innerText = calculateWindChill(temperature, windSpeed);