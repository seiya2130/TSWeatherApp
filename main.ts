import axios from './node_modules/axios';

let weatherJson: any;

const japaneseAreaName = [
  {name: "Tokyo", japanName: "東京"},
  {name: "Nagoya", japanName: "名古屋"},
  {name: "Osaka", japanName: "大阪"}
]

const appIdForm: HTMLElement | null = document.getElementById("#appId");
const placeIdForm: HTMLElement | null = document.getElementById("#placeId");

const placeArea: HTMLElement | null = document.getElementById("#place");
const dateArea: HTMLElement | null = document.getElementById("#date");

function displayTodayDate(): void {
    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: number = today.getMonth() + 1;
    const day: number = today.getDate();

    const todayStr: string = `${year}/${month}/${day}`;
    if(dateArea !== null){
        dateArea.innerText = todayStr;  
    }
}

function displaySelectedPlaceName(): void {
    const areaName: any = japaneseAreaName.filter(area => area.name && weatherJson.name)[0];
    if(placeArea){
      placeArea.innerText = areaName.japanName;
    }
}

function displayWeatherIcon(): void{
  const weatherIcon: any = weatherJson.weather[0].icon;
    const weatherIconImageURL: string = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    document.querySelector('#weather > img')?.setAttribute("src", `${weatherIconImageURL}`);
}


function getWeather(): void{

  if(appIdForm && placeIdForm){
    const appId: string = appIdForm.innerText;
    const placeId: string = placeIdForm.innerText;

    axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${placeId}&appid=${appId}`).then(response => {

      weatherJson = response;
  
      displaySelectedPlaceName();
      displayTodayDate();
      displayWeatherIcon();
    })
  }
}

const weatherGetButton = document.getElementById("#getWeatherButton");
if(weatherGetButton){
  weatherGetButton.addEventListener("click", getWeather);
}
