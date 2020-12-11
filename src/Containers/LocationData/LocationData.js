import React, { Component } from 'react';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import { getWeather } from '../../connection';
import classes from './LocationData.css';
import Spinner from '../../Components/UI/Spinner/Spinner';

class LocationData extends Component {

  state = {
    location: {
      city: '',
      country:''
    },
    error: {
      errorStatus : false,
      errorMessage: ''
    },
    loading: false
  }
  //Handle save changes
      //success
      //error city country not found
      //error conection problems
  inputChangedHandler(event, location){
    let updatedLocation = {...this.state.location[location]};
    updatedLocation = event.target.value;    
    this.setState(
    { 
      location:{
        ...this.state.location,
        [location]: updatedLocation
      }
    } 
    );
  }

  onCancelHandler = (event) => {
    event.preventDefault();
    this.setState({...this.state, error:{errorStatus: false}});
    this.props.close();
  }
  
  onSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({...this.state, loading:true});
    getWeather(this.state.location.city, this.state.location.country)
      .then(data => {
          // LOAD DATA IN PANEL
          this.props.locationSaved(data.todayData, this.state.location, data.forecastData);
          // Close the modal
          this.props.close();
          this.setState({...this.state, loading:false});
      })
      .catch(err => {
        this.setState({...this.state, error:{errorStatus: true, errorMessage: err.message}, loading:false});
        setTimeout(() => {this.setState({...this.state, error:{errorStatus: false}});}, 5000);
      });
  }

  render(){
    let header = (
      <h3 className={classes.Header1}>Choose Location</h3>
    );
    if(this.state.error.errorStatus){
      header = <h3 className={classes.Header2}>{this.state.error.errorMessage}</h3>
    }

    let inputPanel = (
      <div>
        {header}
        <hr className={classes.Separator}/>
        <form className={classes.Form} onSubmit={this.onSubmitHandler}>
          <div className={classes.Inputs}>
            <Input type='text' label='City' change={(event) => this.inputChangedHandler(event, 'city')}/>
            <Input type='text' label='Country' change={(event) => this.inputChangedHandler(event, 'country')}/>
          </div>
          <hr className={classes.Separator}/>
          <div className={classes.Buttons}>
            <Button clicked={this.onCancelHandler} btnType='Secondary'>Close</Button>
            <Button btnType='Primary'>Save changes</Button>
          </div>
        </form>
      </div>
    );

    if (this.state.loading){
      inputPanel = <Spinner />;
    }
    return inputPanel;
  }

}

export default LocationData;

