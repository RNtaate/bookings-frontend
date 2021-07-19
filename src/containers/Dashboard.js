import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Carousel from 'react-elastic-carousel';

import { addUser, addMassageList } from '../actions/index';
import MassageForm from './ModelForms/MassageForm';
import MassageCard from '../components/MassageCard';
import { getMassageTypes, fetchLoggedInStatus } from './Helpers/FetchMethods';
import Sidebar from '../components/Sidebar';
import * as styles from './stylesheets/Dashboard.module.css';
import * as homeStyles from './stylesheets/Home.module.css';

const Dashboard = (props) => {
  const {
    myUserObj, myMassageList, setCurrentUser, setCurrentMassageList,
  } = props;

  const [showMassageForm, setShowMassageForm] = useState(false);

  const [listErrorMessage, setListErrorMessage] = useState('Fetching Massge Types ...');

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
  ];

  const toggleShowMassageForm = () => {
    setShowMassageForm(!showMassageForm);
  };

  const fetchMassageTypes = () => {
    getMassageTypes()
      .then((response) => {
        setCurrentMassageList([...response.data]);
      }).catch(() => {
        setListErrorMessage('Something went wrong, Could not fetch massage types. Please try again later');
      });
  };

  useEffect(() => {
    if (myUserObj.loggedInStatus === 'NOT LOGGED IN') {
      fetchLoggedInStatus(props, fetchMassageTypes, setCurrentUser);
    } else if (myMassageList.length === 0) {
      fetchMassageTypes();
    }
  }, []);

  if (myUserObj.user == null) {
    return (<p>Please wait while we verify your credentials ...</p>);
  }

  return (
    <div className="main-section-div">
      <Sidebar parentProps={props} />
      {
        myUserObj.user ? (
          <div className={styles.dashboard_massages_div}>

            <div className={styles.dashboard_heading_div}>
              <h2>MASSAGE TYPES</h2>
              <p>Please select a massage type</p>
              <div />
            </div>
            {
              myUserObj.user.id === 1
                ? (
                  <button type="button" onClick={toggleShowMassageForm} className={styles.add_massage_button}>
                    <i className="fas fa-plus" />
                  </button>
                )
                : null
            }

            {/** This is the new massage form */}
            <div className={homeStyles.hover_form_div} style={{ visibility: showMassageForm ? 'visible' : 'hidden', opacity: showMassageForm ? 1 : 0 }}>
              {
                showMassageForm
                  ? (
                    <MassageForm
                      handleShowMassageForm={toggleShowMassageForm}
                    />
                  ) : null
              }
            </div>

            {/* These are the dashboard massage cards */}
            {
              myMassageList.length !== 0
                ? (
                  <div className={styles.massage_carousel_div}>
                    <Carousel easing="ease" tiltEasing="ease" breakPoints={breakPoints} pagination={false}>
                      {myMassageList.map((massage) => (
                        <MassageCard massageObj={massage} key={massage.id} />
                      ))}
                    </Carousel>
                  </div>
                )
                : listErrorMessage
            }
          </div>
        )
          : null
      }
    </div>
  );
};

Dashboard.propTypes = {
  myUserObj: PropTypes.instanceOf(Object).isRequired,
  myMassageList: PropTypes.instanceOf(Array).isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  setCurrentMassageList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  myUserObj: state.userReducer,
  myMassageList: state.massageReducer,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (userObj) => {
    dispatch(addUser(userObj));
  },
  setCurrentMassageList: (massageListArray) => {
    dispatch(addMassageList(massageListArray));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
