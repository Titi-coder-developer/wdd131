console.log("place.js is connected");

// Footer current year and last modified
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const today = new Date();

currentYear.textContent = today.getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

// Static weather values
const temperature = 8; // Celsius
const windSpeed = 10; // km/h

// Wind chill function (metric formula)
function calculateWindChill(temp, speed) {
    return (
        13.12 +
        0.6215 * temp -
        11.37 * Math.pow(speed, 0.16) +
        0.3965 * temp * Math.pow(speed, 0.16)
    ).toFixed(1);
}

// Display wind chill if conditions are met
const windChill = document.querySelector("#wind-chill");

if (temperature <= 10 && windSpeed > 4.8) {
    windChill.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
} else {
    windChill.textContent = "N/A";
}