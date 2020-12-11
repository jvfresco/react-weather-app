import React, { Component } from 'react';
import WeatherPanel from './Containers/WheatherPanel/WeatherPanel';


class App extends Component {
  render() {
    return (
      <div className="App">
        <WeatherPanel />
      </div>
    );
  }
}

export default App;
