import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import { createDateToday, fetchLoggedInStatus } from '../Helpers/HelperMethods';
import { addUser } from '../../actions/index';

let AppointmentForm = (props) => {

  let cities = ['Kampala', 'Arua', 'Gayaza', 'New York', 'Dehli', 'Lagos'];

  let {myUserObj, massage, handleShowAppForm, setCurrentUser} = props 

  let [localApt, setLocalApt] = useState({
    customer_name: "",
    massage_type: massage.name,
    date: '',
    city: 'Kampala',
  })

  let handleOnChange = (e) => {
    setLocalApt({...localApt, customer_name: myUserObj.user.username, [e.target.name]: e.target.value});
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(localApt);
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
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" placeholder="Preferred Date" onChange={handleOnChange} min={createDateToday()} required />
        <select name="city" onChange={handleOnChange}>
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
