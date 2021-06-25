import React, { useEffect, useState } from 'react';
import axios from 'axios';

let MassageDetails = (props) => {
  
  let [localMassage, setLocalMassage] = useState({
    massageData: null,
    errorMessage: "Fetching Data"
  })

  let fetchSingleMassage = (id=0) => {
    axios.get(`http://localhost:3001/massages/${id}`, {withCredentials: true})
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
        <img src={localMassage.massageData.massage_image.url} />
      </div>

      <div>
        <h4>{localMassage.massageData.name}</h4>
        <p>{localMassage.massageData.description}</p>
        <p>Duration: {localMassage.massageData.duration} minutes</p>
        <p>Price: ${localMassage.massageData.price}</p>
      </div>
    </div>) : <p>{localMassage.errorMessage}</p>
  )
}

export default MassageDetails