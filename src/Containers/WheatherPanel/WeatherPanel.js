import React, { Component } from 'react';
import classes from './WeatherPanel.css';
import Button from '../../Components/UI/Button/Button';
import Auxiliar from '../../hoc/Auxiliar/Auxiliar';
import Modal from '../../Components/UI/Modal/Modal';
import LocationData from '../LocationData/LocationData';
import { getWeather } from '../../connection';
import ForecastMiniature from '../../Components/Forecast/ForecastMiniature/ForecastMiniature';
import ForecastModalTable from '../../Components/Forecast/ForecastModalTable/ForecastModalTable';


class WeatherPanel extends Component {
//Initial state
  state= {
    location: {
      city: 'city',
      country: 'country',
      countryAbbr: ''
    },
    weather:{
      description: 'description',
      temperature: 'temperature',
      humidity: 'humidity',
      minTemp: 'minTemp',
      maxTemp: 'maxTemp',
      feeling: 'feeling',
      windSpeed: 'windSpeed',
      icon: null
    },
    dataForecast: null,
    changingLocation: false,
    forecastTableModal: false
  }

  componentDidMount() {
    //First thing when loading is to check if we have a location saved in localStorage, if not, open modal
    const city = localStorage.getItem('city');
    const country= localStorage.getItem('country');
    if (city && country){
      getWeather(city, country).then(data => {
        // LOCATION FOUND, LOAD DATA IN PANEL
        this.locationSavedHandler(data.todayData, {city: city, country: country}, data.forecastData);
      })
      .catch(err => {
        // IF ERROR SHOW MODAL
        this.setState(...this.state, {changingLocation: true});
      });
    } else {
      this.setState(...this.state, {changingLocation: true});
    }
  }


  changeLocationHandler = () => {
    this.setState({changingLocation: true});
  }

  changeLocationCanceled = () => {
    this.setState({changingLocation: false});
  }

  forecastTableModalOpen = () => {
    this.setState({forecastTableModal: true});
  }

  forecastTableModalClose = () => {
    this.setState({forecastTableModal: false});
  }

  locationSavedHandler = (weather, location, dataForecast) => {
    this.setState(
      {
        location: {
          city: weather.name,
          countryAbbr: weather.sys.country
        },
       weather: {
          description: weather.weather[0].description,
          temperature: weather.main.temp,
          humidity: weather.main.humidity,
          minTemp: weather.main.temp_min,
          maxTemp: weather.main.temp_max,
          feeling: weather.main.feels_like,
          windSpeed: weather.wind.speed,
          icon: weather.weather[0].icon
       },
       dataForecast
      }
    );
    localStorage.setItem('city', location.city);
    localStorage.setItem('country', location.country);
  }

  render(){
    let forecastPanel;
    let forecastModalTable;
    if (this.state.dataForecast){
      //Creating the daily forecast for 5 days
      let fiveDaysForecast = this.state.dataForecast.daily.filter((day, idx) => idx > 0 && idx <= 5).map((day, idx) => {
        return <ForecastMiniature key={idx} forecast={day} />;
      });
      forecastPanel = (
        <div className={classes.ForecastPanel}>
          {fiveDaysForecast}
        </div>
      );
      //Creating the hourly forecast
      forecastModalTable = (<ForecastModalTable close={this.forecastTableModalClose} forecast={this.state.dataForecast.hourly}/>);
    } 

    let panel = (
      <div className={classes.Container}>
        <div>
          <h1>{this.state.location.city} {this.state.location.countryAbbr}</h1>
          <h3>{this.state.weather.description.toUpperCase()}</h3>
          <h3 className={classes.temp}>{this.state.weather.temperature} °C</h3>
          <img className={classes.icon} src={this.state.weather.icon ? "https://openweathermap.org/img/wn/" + this.state.weather.icon + "@2x.png" : null} alt=""></img>
          <ul>
            <li>Relative Humidity: {this.state.weather.humidity} %</li>
            <li>Temp Min: {this.state.weather.minTemp} °C - Temp Max: {this.state.weather.maxTemp} °C</li>
            <li>Feels like: {this.state.weather.feeling} °C</li>
            <li>Wind Speed: {this.state.weather.windSpeed} Km/h</li>
          </ul>
          <Button btnType='Primary' clicked={this.forecastTableModalOpen}>See detailed forecast</Button>
          <hr />
          {forecastPanel}
          <hr />
          <Button btnType='Primary' clicked={this.changeLocationHandler}>Change Location</Button>
        </div>
      </div>
    );

    const locationData = (<LocationData close={this.changeLocationCanceled} locationSaved={this.locationSavedHandler}/>);
    
    return(
      <Auxiliar>
        <Modal show={this.state.changingLocation} modalClosed={this.changeLocationCanceled} >
          {locationData}
        </Modal>
        <Modal show={this.state.forecastTableModal} modalClosed={this.forecastTableModalClose}>
          {forecastModalTable}
        </Modal>
        {panel}
      </Auxiliar>
    );
  }
}

export default WeatherPanel;