import React from 'react';
import { dateConversor } from '../../../util/dateConversor';
import classes from './ForecastMiniature.css';

const forecastMiniature = (props) => (
//The card flips when hovering the content of div containing front class is the default shown, back class for the other side 
<div className={classes.card}>
  <div className={classes.card__side + ' ' + classes.card__side__front}>
    <span className={classes.date}>{dateConversor(props.forecast.dt)}</span>
    <hr className={classes.Separator}/>
    <img className={classes.icon} src={'https://openweathermap.org/img/wn/' + props.forecast.weather[0].icon + '@2x.png'}  alt="icon"/>
    <hr className={classes.Separator}/>
    <span className={classes.temperature}>{props.forecast.temp.day} °C</span>
  </div>
  <div className={classes.card__side + ' ' + classes.card__side__back}>
    <span>Min: {props.forecast.temp.min} °C</span>
    <hr className={classes.Separator}/>
    <span>Max: {props.forecast.temp.max} °C</span>
    <hr className={classes.Separator}/>
    <span>Humidity: {props.forecast.humidity} %</span>
    <hr className={classes.Separator}/>
    <span>Wind: {props.forecast.wind_speed} Km/h</span>
  </div>
</div>

);

export default forecastMiniature;