import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { API_URL } from './Helpers/HelperConstants';

import AppointmentForm from './ModelForms/AppointmentForm';

let MassageDetails = (props) => {
  
  let [localMassage, setLocalMassage] = useState({
    massageData: null,
    errorMessage: "Fetching Data"
  })

  let [showAppForm, setShowAppForm] = useState(false);

  let toggleShowAppForm = () => {
    setShowAppForm(!showAppForm);
  }

  let fetchSingleMassage = (id=0) => {
    axios.get(`${API_URL}/massages/${id}`, {withCredentials: true})
    .then(response => {
      console.log(response);
      setLocalMassage({ ...localMassage, massageData: response.data})
    }).catch( error => {
      console.log('Something went wrong when collecting your masage', error);
      setLocalMassage({ ...localMassage, errorMessage: "Something went wrong, please try again later"})
    })
  }

  useEffect(() => {
    let myUrl = window.location.href.split('/');
    let myId = myUrl[myUrl.length - 1];
    fetchSingleMassage(myId);
  }, []);

  return (
    localMassage.massageData != null ? (
    <div>
      <div>
        <img src={localMassage.massageData.massage_image.url} style={{width: "500px", height: "auto"}}/>
      </div>

      <div>
        <h4>{localMassage.massageData.name}</h4>
        <p>{localMassage.massageData.description}</p>
        <p>Duration: {localMassage.massageData.duration} minutes</p>
        <p>Price: ${localMassage.massageData.price}</p>
        <button onClick={toggleShowAppForm}>Book an appointment</button>
      </div>

      {
        showAppForm ? 
        <AppointmentForm {...props} massage={localMassage.massageData} handleShowAppForm={toggleShowAppForm}/> : null
      }

    </div>) : <p>{localMassage.errorMessage}</p>
  )
}

export default MassageDetails