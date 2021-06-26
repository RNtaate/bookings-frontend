import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {API_URL} from './Helpers/HelperConstants';

let Appointments = () => {

  let [localAppointments, setLocalAppointmnets] = useState({
    appsList: [],
    errorMessage: ''
  })

  let fetchAppointmentsList = () => {
    axios.get(`${API_URL}/appointments`, {withCredentials: true})
    .then( res => {
      console.log(res);
    }).catch (e => {
      console.log('Something is wrong buddy', e);
    })
  }

  useEffect(() => {
    fetchAppointmentsList();
  }, []);

  return (
    <div>
      <p>This is going to be the appointments page</p>
    </div>
  )
}

let mapStateToProps = (state) => {
  return ({
    myUserObj: state.userReducer
  })
}

export default connect(mapStateToProps, null)(Appointments);