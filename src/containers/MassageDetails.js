import React, { useEffect, useState } from 'react';

import AppointmentForm from './ModelForms/AppointmentForm';
import { getMassageType } from './Helpers/FetchMethods';

const MassageDetails = (props) => {
  const [localMassage, setLocalMassage] = useState({
    massageData: null,
    errorMessage: 'Fetching Data',
  });

  const [showAppForm, setShowAppForm] = useState(false);

  const toggleShowAppForm = () => {
    setShowAppForm(!showAppForm);
  };

  const fetchSingleMassage = (id = 0) => {
      getMassageType(id)
      .then((response) => {
        setLocalMassage({ ...localMassage, massageData: response.data });
      }).catch(() => {
        setLocalMassage({ ...localMassage, errorMessage: 'Something went wrong, failed to collect massage type. Please try again later' });
      });
  };

  useEffect(() => {
    const myUrl = window.location.href.split('/');
    const myId = myUrl[myUrl.length - 1];
    fetchSingleMassage(myId);
  }, []);

  return (
    localMassage.massageData != null ? (
      <div>
        <div>
          <img src={localMassage.massageData.massage_image.url} alt="" style={{ width: '500px', height: 'auto' }} />
        </div>

        <div>
          <h4>{localMassage.massageData.name}</h4>
          <p>{localMassage.massageData.description}</p>
          <p>
            Duration:
            {localMassage.massageData.duration}
            {' '}
            minutes
          </p>
          <p>
            Price: $
            {localMassage.massageData.price}
          </p>
          <button type="button" onClick={toggleShowAppForm}>Book an appointment</button>
        </div>

        {
        showAppForm
          ? (
            <AppointmentForm
              propsObj={props}
              massage={localMassage.massageData}
              handleShowAppForm={toggleShowAppForm}
            />
          ) : null
      }

      </div>
    ) : <p>{localMassage.errorMessage}</p>
  );
};

export default MassageDetails;
