import React from 'react';
import classes from './Input.css';

const input = (props) => (
  <div>
    <label>{props.label}</label>
    <input type={props.type} className={classes.Datafield} onChange={props.change}/>
  </div>
);

export default input;