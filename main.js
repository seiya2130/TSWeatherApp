import axios from './node_modules/axios';
let weatherJson;
const japaneseAreaName = [
    { name: "Tokyo", japanName: "東京" },
    { name: "Nagoya", japanName: "名古屋" },
    { name: "Osaka", japanName: "大阪" }
];
const appIdForm = document.getElementById("#appId");
const placeIdForm = document.getElementById("#placeId");
const placeArea = document.getElementById("#place");
const dateArea = document.getElementById("#date");
function displayTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const todayStr = `${year}/${month}/${day}`;
    if (dateArea !== null) {
        dateArea.innerText = todayStr;
    }
}
function displaySelectedPlaceName() {
    const areaName = japaneseAreaName.filter(area => area.name && weatherJson.name)[0];
    if (placeArea) {
        placeArea.innerText = areaName.japanName;
    }
}
function displayWeatherIcon() {
    var _a;
    const weatherIcon = weatherJson.weather[0].icon;
    const weatherIconImageURL = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    (_a = document.querySelector('#weather > img')) === null || _a === void 0 ? void 0 : _a.setAttribute("src", `${weatherIconImageURL}`);
}
function getWeather() {
    if (appIdForm && placeIdForm) {
        const appId = appIdForm.innerText;
        const placeId = placeIdForm.innerText;
        axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${placeId}&appid=${appId}`).then(response => {
            weatherJson = response;
            displaySelectedPlaceName();
            displayTodayDate();
            displayWeatherIcon();
        });
    }
}
const weatherGetButton = document.getElementById("#getWeatherButton");
if (weatherGetButton) {
    weatherGetButton.addEventListener("click", getWeather);
}
