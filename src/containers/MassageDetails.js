import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AppointmentForm from './ModelForms/AppointmentForm';
import { getMassageType } from './Helpers/FetchMethods';
import Sidebar from '../components/Sidebar';
import * as dashboardStyles from './stylesheets/Dashboard.module.css';
import * as styles from './stylesheets/MassageDetails.module.css';

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
    <div className="main-section-div">
      <Sidebar parentProps={props} />
      {
        localMassage.massageData != null ? (
          <div className={`${dashboardStyles.massage_details_div} ${styles.massage_details_div}`}>
            <div className={styles.massage_image_div} style={{backgroundImage: `url(${localMassage.massageData.massage_image.url})`}}>
            </div>
    
            <div className={styles.massage_description_div}>

              <div className={styles.massage_desc_content_div}>
                <h4>{localMassage.massageData.name}</h4>
                <p>{localMassage.massageData.description}</p>
                <span>
                  <p>Duration in minutes:</p>
                  {localMassage.massageData.duration}
                </span>
                <span className={styles.massage_price}>
                  <p>Price:</p>
                  {`$${localMassage.massageData.price}`}
                </span>
              </div>

              <button type="button" onClick={toggleShowAppForm} className={styles.book_appointment_button}>Book an appointment</button>
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

            <Link to='/' className={styles.back_link}><span><i className="fas fa-chevron-left"></i></span></Link>
    
          </div>
        ) : <p>{localMassage.errorMessage}</p>
      }
    </div>
  );
};

export default MassageDetails;
