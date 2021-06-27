import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

import { createDateToday, fetchLoggedInStatus } from '../Helpers/HelperMethods';
import { addUser } from '../../actions/index';
import { API_URL } from '../Helpers/HelperConstants';

let AppointmentForm = (props) => {

  let cities = ['Kampala', 'Arua', 'Gayaza', 'New York', 'Dehli', 'Lagos'];

  let {myUserObj, massage, handleShowAppForm, setCurrentUser} = props 

  let [localApt, setLocalApt] = useState({
    customer_name: "",
    massage_type: massage.name,
    massage_id: massage.id,
    date: '',
    city: 'Kampala',
  })

  let [errorMessage, setErrorMessage] = useState('');

  let handleOnChange = (e) => {
    setLocalApt({...localApt, customer_name: myUserObj.user.username, [e.target.name]: e.target.value});
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(localApt);

    let {customer_name, massage_type, massage_id, date, city} = localApt;
    axios.post(`${API_URL}/appointments`,{
      customer_name, 
      massage_type, 
      massage_id, 
      date, 
      city
    }, {withCredentials:true})
    .then( response => {
      console.log(response);
      setErrorMessage('');
      setLocalApt({ ...localApt, date: '', city: 'Kampala'});
      props.history.push("/appointments");
    }).catch( e => {
      console.log("Something went wrong, Appointment submission failed", e);
      setErrorMessage("Oops!, Something went wrong, check your network and try again.")
    })
  }

  useEffect( async () => {
    if (myUserObj.loggedInStatus === "NOT LOGGED IN") {
      fetchLoggedInStatus(props, () => {}, setCurrentUser);
    }

    if (myUserObj.loggedInStatus === "LOGGED IN") {
      setLocalApt({...localApt, customer_name: myUserObj.user.username});
    }
  }, []);

  return (
    <div>
      <p>{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" placeholder="Preferred Date" onChange={handleOnChange} min={createDateToday()} required value={localApt.date} />
        <select name="city" onChange={handleOnChange} value={localApt.city} >
          {cities.map( city => <option key={cities.indexOf(city)}>{city}</option>)}
        </select>
        <button type="submit">Create Appointment</button>
      </form>
      <button onClick={handleShowAppForm}>Cancel</button>
    </div>
  )
}

let mapStateToProps = (state) => {
  return ({
    myUserObj: state.userReducer
  })
}

let mapDispatchToProps = (dispatch) => {
  return ({
    setCurrentUser: (userObj) => {
      dispatch(addUser(userObj));
    },
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentForm);
