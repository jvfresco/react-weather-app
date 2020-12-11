export const dateConversor = (unixTimestamp) => {
  const miliseconds = unixTimestamp * 1000;
  const dateObject = new Date(miliseconds);
  
  const dateTimeFormat = { month: 'short', day: '2-digit', weekday:'long'}; 
  const humanDateFormat = dateObject.toLocaleDateString("en-US", dateTimeFormat);
  //Returned Format: Monday, Sept, 02
  return humanDateFormat;
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export const getHour = (unixTimestamp) => {
  const miliseconds = unixTimestamp * 1000;
  const dateObject = new Date(miliseconds);
  //Function addZero is used to have always 2 digits
  const hour = addZero(dateObject.getHours()) + ':' + addZero(dateObject.getMinutes());
  return hour;
}

export const dateLongConversor = (unixTimestamp) => {
  const miliseconds = unixTimestamp * 1000;
  const dateObject = new Date(miliseconds);
  
  const dateTimeFormat = { month: 'long', day: '2-digit', weekday:'long'}; 
  const humanDateFormat = dateObject.toLocaleDateString("en-US", dateTimeFormat);
  //Returned Format: Monday, September, 02
  return humanDateFormat;
}