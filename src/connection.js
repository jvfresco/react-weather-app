import AppID from './config.js'
const units = 'metric';

export const  getWeather = async (city, country) => {
  //First the app fetches the info for the current day and the coordinates
  try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&units='+ units +'&APPID='+ AppID);
    const todayData = await response.json();
    if (todayData.cod >= 400 && todayData.cod < 600) {
      throw new Error(todayData.message);
    }
    //With the coordinates the app fetches the forecast
    if(todayData.coord){
      const forecast = await fetch ('https://api.openweathermap.org/data/2.5/onecall?lat=' + todayData.coord.lat +'&lon='+ todayData.coord.lon +'&units='+ units +'&exclude=minutely&APPID='+ AppID);
      const forecastData = await forecast.json();
      return  {todayData: todayData, forecastData: forecastData}
    }
  }catch(error) {
    throw new Error(error.message);
  }
}
