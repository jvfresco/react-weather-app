import React from 'react';
import classes from './ForecastModalTable.css';
import {getHour, dateLongConversor} from '../../../util/dateConversor';
import Auxiliar from '../../../hoc/Auxiliar/Auxiliar';
import arrow from '../../../assets/arrow.png';

const forecastModalTable = (props) => {
const dayHeader = (day, idx) => {
  return (
    <div key={idx}>
      <hr className={classes.Separator}/>
      <span className={classes.DayHeader}>{day}</span>
      <hr className={classes.Separator}/>
    </div>
  );
}

const rowTableHeader =  (
 
  <div className={classes.TableHeader}>
      <div className={classes.TableCell}>Time</div>
      <div className={classes.TableCell}>Forecast</div>
      <div className={classes.TableCell}>Wind</div>
      <div className={classes.TableCell}>W.Speed</div>
      <div className={classes.TableCell}>Humidity</div>
      <div className={classes.TableCell}>% of Precip.</div>
      <div className={classes.TableCell}>Rain</div>
      <div className={classes.TableCell}>Snow</div>
      <div className={classes.TableCell}>Feels like</div>
    </div>

); 

const hourlyForecastTable = props.forecast.map((hour ,idx) => {
    //When the time is 00.00 insert new header, the new day is created and added to the table
    const header = getHour(hour.dt) === '00:00' ? [dayHeader(dateLongConversor(hour.dt), idx), rowTableHeader] : null;
    return (
      <Auxiliar>
      {header}
      <div className={classes.TableRow}>
        <div className={classes.TableCell}>{getHour(hour.dt)}</div>
        <div className={classes.TableFlex}>
          <img className={classes.icon} src={"https://openweathermap.org/img/wn/" + hour.weather[0].icon + "@2x.png"} alt="icon"/>
          <span className={classes.temp}>{Math.round(hour.temp)} °C</span>
        </div>
        <div className={classes.TableCell}><img className={classes.arrow} src={arrow} alt={hour.wind_deg + "deg"} style={{transform: "rotate("+hour.wind_deg+"deg)"}}/></div>
        <div className={classes.TableCell}>{hour.wind_speed} Km/h</div>
        <div className={classes.TableCell}>{Math.round(hour.humidity)} %</div>
        <div className={classes.TableCell}>{Math.round(hour.pop*100)} %</div>
        <div className={classes.TableCell}>{hour.rain ? Math.round(hour.rain['1h']) : '0'} mm</div>
        <div className={classes.TableCell}>{hour.snow ? Math.round(hour.snow['1h']) : '0'} mm</div>
        <div className={classes.TableCell}>{Math.round(hour.feels_like)} °C</div>
      </div>
      </Auxiliar>
    )
  });



return (
  <Auxiliar>
    <div className={classes.Table}>
      {dayHeader('Today')}
      {rowTableHeader}
      {hourlyForecastTable}
    </div>
  </Auxiliar>
);

}

export default forecastModalTable