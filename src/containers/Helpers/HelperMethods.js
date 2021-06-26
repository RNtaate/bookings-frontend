import axios from 'axios';
import { API_URL } from './HelperConstants';

export let createDateToday = () => {
  let some = new Date(Date.now());
  let dateString = [];
  let hold = ""
  dateString.push(`${some.getFullYear()}`);
  hold = some.getMonth();
  hold < 10 ? hold = `0${hold}` : `${hold}`;
  dateString.push(hold);
  

  hold = some.getDate();
  hold < 10 ? hold = `0${hold}` : `${hold}`;
  dateString.push(hold);
  dateString = dateString.join('-');
  
  return dateString;
}

export let redirectToHome = (props) => {
  props.history.push("/home");
}

export let fetchLoggedInStatus = (props, funcInResponse= () => {}, setUserStateFunc) => {
  axios.get(`${API_URL}/logged_in`, {withCredentials: true})
  .then( response => {
    console.log("From the Dashboard: ",response)
    if(response.data.logged_in) {
      setUserStateFunc(response.data.user);
      funcInResponse();
    }
    else {
      console.log('You are not logged in!, so I am taking you to the login/sign up page.');
      redirectToHome(props);
    }
  }).catch( error => {
    console.log('Something went wrong', error)
    console.log('So I am kindly going to redirect you to the home page.')
    redirectToHome(props);
  })
}